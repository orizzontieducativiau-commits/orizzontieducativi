import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/db";
import { inviaEmailCVUtente, inviaEmailCVAdmin } from "@/lib/email-servizi";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 600000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Troppe richieste. Riprova tra qualche minuto." },
      { status: 429 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Dati non validi." },
      { status: 400 }
    );
  }

  const nome = (formData.get("nome") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const testo = (formData.get("testo") as string)?.trim();
  const file = formData.get("file") as File | null;

  // Validazione
  if (!nome || !email || !testo) {
    return NextResponse.json(
      { error: "Tutti i campi obbligatori devono essere compilati." },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "L'indirizzo email non è valido." },
      { status: 400 }
    );
  }

  // Conteggio parole
  const wordCount = testo.split(/\s+/).filter(Boolean).length;
  if (wordCount > 200) {
    return NextResponse.json(
      { error: "Il testo non può superare le 200 parole." },
      { status: 400 }
    );
  }

  if (!file) {
    return NextResponse.json(
      { error: "Il curriculum è obbligatorio." },
      { status: 400 }
    );
  }

  // Validazione file
  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return NextResponse.json(
      { error: "Formato file non valido. Sono accettati solo PDF, DOC e DOCX." },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Il file è troppo grande. Dimensione massima: 5MB." },
      { status: 400 }
    );
  }

  // Sanitizzazione
  const nomeClean = nome.slice(0, 100);
  const emailClean = email.slice(0, 200);
  const testoClean = testo.slice(0, 5000);
  const filename = file.name.slice(0, 200);

  // Salvataggio nel database
  const supabase = getServiceClient();
  const { error: dbError } = await supabase
    .from("cv_submissions")
    .insert({
      nome: nomeClean,
      email: emailClean,
      testo: testoClean,
      filename,
    });

  if (dbError) {
    console.error("Errore salvataggio CV:", dbError);
    return NextResponse.json(
      { error: "Si è verificato un errore. Riprova tra poco." },
      { status: 500 }
    );
  }

  // Leggi il file come Buffer per l'allegato email
  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  // Invio email (best effort)
  try {
    await Promise.all([
      inviaEmailCVUtente({ nome: nomeClean, email: emailClean }),
      inviaEmailCVAdmin({
        nome: nomeClean,
        email: emailClean,
        testo: testoClean,
        filename,
        fileBuffer,
      }),
    ]);
  } catch (emailError) {
    console.error("Errore invio email CV:", emailError);
  }

  return NextResponse.json({ success: true });
}

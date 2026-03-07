import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/db";
import { inviaEmailMentorship, inviaEmailMentorshipAdmin } from "@/lib/email-servizi";

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

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dati non validi." }, { status: 400 });
  }

  const { nome, email, telefono } = body as {
    nome: string;
    email: string;
    telefono?: string;
  };

  if (!nome || !email) {
    return NextResponse.json(
      { error: "Nome e email sono obbligatori." },
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

  const nomeClean = nome.trim().slice(0, 100);
  const emailClean = email.trim().toLowerCase().slice(0, 200);
  const telefonoClean = telefono?.trim().slice(0, 30) || null;

  // Salvataggio nel database
  const supabase = getServiceClient();
  const { error: dbError } = await supabase
    .from("mentorship_submissions")
    .insert({
      nome: nomeClean,
      email: emailClean,
      telefono: telefonoClean,
    });

  if (dbError) {
    console.error("Errore salvataggio mentorship:", dbError);
    return NextResponse.json(
      { error: "Si è verificato un errore. Riprova tra poco." },
      { status: 500 }
    );
  }

  // Invio email (best effort)
  try {
    await Promise.all([
      inviaEmailMentorship({ nome: nomeClean, email: emailClean }),
      inviaEmailMentorshipAdmin({
        nome: nomeClean,
        email: emailClean,
        telefono: telefonoClean || undefined,
      }),
    ]);
  } catch (emailError) {
    console.error("Errore invio email mentorship:", emailError);
  }

  return NextResponse.json({ success: true });
}

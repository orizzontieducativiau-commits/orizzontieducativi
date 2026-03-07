import { NextRequest, NextResponse } from "next/server";
import { inviaEmailMockInterviewCV } from "@/lib/email-servizi";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

export async function POST(request: NextRequest) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Dati non validi." }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const nome = (formData.get("nome") as string)?.trim() || "Utente";
  const email = (formData.get("email") as string)?.trim() || "";

  if (!file) {
    return NextResponse.json(
      { error: "Nessun file selezionato." },
      { status: 400 }
    );
  }

  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return NextResponse.json(
      { error: "Formato non valido. Solo PDF, DOC o DOCX." },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Il file è troppo grande. Dimensione massima: 5MB." },
      { status: 400 }
    );
  }

  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  try {
    await inviaEmailMockInterviewCV({
      nome,
      email,
      filename: file.name,
      fileBuffer,
    });
  } catch (err) {
    console.error("Errore invio CV mock interview:", err);
    return NextResponse.json(
      { error: "Qualcosa è andato storto. Riprova." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/db";
import { isDataPrenotabile, getOrariPerGiorno, formattaData } from "@/lib/availability";
import { getConsulenzaBySlug } from "@/lib/consulenze";
import { inviaEmailConferma } from "@/lib/email";
import { inviaEmailMockInterview } from "@/lib/email-servizi";

// Rate limiting in-memory (per IP, 5 req in 10 min)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 10 * 60 * 1000; // 10 minuti

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Troppe richieste. Riprova tra qualche minuto." },
      { status: 429 }
    );
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Dati non validi." },
      { status: 400 }
    );
  }

  const { slug, data, orario, nome, email, telefono, orarioLocale, fusoLocale } = body as {
    slug: string;
    data: string;
    orario: string;
    nome: string;
    email: string;
    telefono?: string;
    orarioLocale?: string;
    fusoLocale?: string;
  };

  // Validazione campi
  if (!slug || !data || !orario || !nome || !email) {
    return NextResponse.json(
      { error: "Tutti i campi obbligatori devono essere compilati." },
      { status: 400 }
    );
  }

  // Validazione email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "L'indirizzo email non è valido." },
      { status: 400 }
    );
  }

  // Sanitizzazione
  const nomeClean = nome.trim().slice(0, 100);
  const emailClean = email.trim().toLowerCase().slice(0, 200);
  const telefonoClean = telefono?.trim().slice(0, 30) || null;

  // Verifica consulenza
  const consulenza = getConsulenzaBySlug(slug);
  if (!consulenza) {
    return NextResponse.json(
      { error: "Tipologia di consulenza non trovata." },
      { status: 400 }
    );
  }

  // Validazione data
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    return NextResponse.json(
      { error: "Formato data non valido." },
      { status: 400 }
    );
  }

  const date = new Date(data + "T00:00:00");
  if (isNaN(date.getTime()) || !isDataPrenotabile(date)) {
    return NextResponse.json(
      { error: "La data selezionata non è disponibile." },
      { status: 400 }
    );
  }

  // Validazione orario
  const orariValidi = getOrariPerGiorno(date.getDay());
  if (!orariValidi.includes(orario)) {
    return NextResponse.json(
      { error: "L'orario selezionato non è disponibile per questa data." },
      { status: 400 }
    );
  }

  // Salvataggio nel database (con check race condition via unique index)
  const supabase = getServiceClient();
  const { data: prenotazione, error } = await supabase
    .from("prenotazioni")
    .insert({
      tipo_consulenza: consulenza.nome,
      tipo_consulenza_slug: consulenza.slug,
      data,
      orario,
      nome: nomeClean,
      email: emailClean,
      telefono: telefonoClean,
      stato: "in_attesa_pagamento",
      reminder_inviato: false,
    })
    .select("id")
    .single();

  if (error) {
    // Unique constraint violation = slot già prenotato
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Questo slot è stato appena prenotato da qualcun altro. Scegli un altro orario." },
        { status: 409 }
      );
    }
    console.error("Errore salvataggio prenotazione:", error);
    return NextResponse.json(
      { error: "Si è verificato un errore. Riprova tra poco." },
      { status: 500 }
    );
  }

  // Invio email di conferma (best effort, non blocca la risposta)
  // Invio email di conferma (template diverso per mock interview)
  try {
    if (consulenza.emailCustom && consulenza.slug === "mock-interview") {
      await inviaEmailMockInterview({
        nome: nomeClean,
        email: emailClean,
        data: formattaData(date),
        orario,
        durata: `${consulenza.durataMinuti} minuti`,
        orarioLocale: orarioLocale || undefined,
        fusoLocale: fusoLocale || undefined,
      });
    } else {
      await inviaEmailConferma({
        nome: nomeClean,
        email: emailClean,
        tipoConsulenza: consulenza.nome,
        data: formattaData(date),
        orario,
        prezzo: consulenza.prezzoLabel,
        durata: `${consulenza.durataMinuti} minuti`,
        orarioLocale: orarioLocale || undefined,
        fusoLocale: fusoLocale || undefined,
      });
    }
  } catch (emailError) {
    console.error("Errore invio email conferma:", emailError);
  }

  return NextResponse.json({
    success: true,
    prenotazione: {
      id: prenotazione.id,
      tipoConsulenza: consulenza.nome,
      data: formattaData(date),
      orarioIT: orario,
      orarioLocale: orarioLocale || orario,
      fusoLocale: fusoLocale || "",
      durata: `${consulenza.durataMinuti} minuti`,
    },
  });
}

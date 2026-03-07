import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/db";
import { getOrariPerGiorno, isDataPrenotabile } from "@/lib/availability";

type Params = { params: Promise<{ data: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { data } = await params;

  // Validazione formato data (YYYY-MM-DD)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    return NextResponse.json(
      { error: "Formato data non valido. Usa YYYY-MM-DD." },
      { status: 400 }
    );
  }

  const date = new Date(data + "T00:00:00");
  if (isNaN(date.getTime())) {
    return NextResponse.json(
      { error: "Data non valida." },
      { status: 400 }
    );
  }

  if (!isDataPrenotabile(date)) {
    return NextResponse.json({ slots: [], disponibili: [] });
  }

  const dayOfWeek = date.getDay();
  const tuttiOrari = getOrariPerGiorno(dayOfWeek);

  // Cerca prenotazioni esistenti per questa data (non annullate)
  const supabase = getServiceClient();
  const { data: prenotazioni, error } = await supabase
    .from("prenotazioni")
    .select("orario")
    .eq("data", data)
    .neq("stato", "annullata");

  if (error) {
    console.error("Supabase slots error:", error.message);
    return NextResponse.json(
      { error: "Errore nel recupero degli slot." },
      { status: 500 }
    );
  }

  const orariOccupati = new Set(prenotazioni?.map((p) => p.orario) ?? []);

  const slots = tuttiOrari.map((orario) => ({
    orario,
    disponibile: !orariOccupati.has(orario),
  }));

  return NextResponse.json({ slots });
}

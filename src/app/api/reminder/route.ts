import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/db";
import { inviaEmailReminder } from "@/lib/email";
import { formattaData } from "@/lib/availability";

export async function POST(request: NextRequest) {
  // Verifica cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Non autorizzato." }, { status: 401 });
  }

  const supabase = getServiceClient();

  // Calcola la data di domani
  const domani = new Date();
  domani.setDate(domani.getDate() + 1);
  const domaniISO = domani.toISOString().split("T")[0];

  // Cerca prenotazioni confermate per domani con reminder non inviato
  const { data: prenotazioni, error } = await supabase
    .from("prenotazioni")
    .select("*")
    .eq("data", domaniISO)
    .eq("stato", "confermata")
    .eq("reminder_inviato", false);

  if (error) {
    console.error("Errore query reminder:", error);
    return NextResponse.json(
      { error: "Errore nel recupero prenotazioni." },
      { status: 500 }
    );
  }

  if (!prenotazioni || prenotazioni.length === 0) {
    return NextResponse.json({ sent: 0, message: "Nessun reminder da inviare." });
  }

  let sent = 0;
  const errors: string[] = [];

  for (const p of prenotazioni) {
    try {
      const dataFormattata = formattaData(new Date(p.data + "T00:00:00"));

      await inviaEmailReminder({
        nome: p.nome,
        email: p.email,
        tipoConsulenza: p.tipo_consulenza,
        data: dataFormattata,
        orario: p.orario,
        prezzo: "",
        durata: "",
      });

      // Aggiorna reminder_inviato
      await supabase
        .from("prenotazioni")
        .update({ reminder_inviato: true })
        .eq("id", p.id);

      sent++;
    } catch (err) {
      console.error(`Errore reminder per ${p.email}:`, err);
      errors.push(p.email);
    }
  }

  return NextResponse.json({
    sent,
    total: prenotazioni.length,
    errors: errors.length > 0 ? errors : undefined,
  });
}

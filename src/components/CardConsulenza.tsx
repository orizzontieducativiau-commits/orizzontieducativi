import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Consulenza } from "@/lib/consulenze";

type Props = {
  consulenza: Consulenza;
};

export function CardConsulenza({ consulenza }: Props) {
  return (
    <Card
      className={`relative ${
        consulenza.popular ? "border-2 border-black" : "border border-gray-200"
      }`}
    >
      {consulenza.popular && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white rounded-full px-4">
          Consigliato
        </Badge>
      )}
      <CardHeader className="pb-4">
        {consulenza.durataMinuti != null && consulenza.durataMinuti > 0 && (
          <p className="text-xs text-gray-500 mb-1">
            {consulenza.durataMinuti} min
          </p>
        )}
        <CardTitle className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">{consulenza.prezzoLabel}</span>
        </CardTitle>
        <p className="text-sm font-semibold mt-1">{consulenza.nome}</p>
        <p className="text-sm text-gray-500 mt-2">{consulenza.descrizione}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {consulenza.features.map((feature) => (
          <div key={feature} className="flex items-start gap-2">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 mt-0.5">
              <Check className="h-3 w-3 text-emerald-600" />
            </div>
            <span className="text-sm text-gray-700">{feature}</span>
          </div>
        ))}
        <Link href={consulenza.ctaHref ?? `/prenota/${consulenza.slug}`}>
          <Button
            className={`w-full mt-4 rounded-full group ${
              consulenza.popular
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-white text-black border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {consulenza.ctaLabel ?? "Prenota"}
            <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

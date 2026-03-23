
"use client";

import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export function MarketingBanner({ theme }: { theme: string }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-card to-background text-white p-6 rounded-xl shadow-2xl border border-primary/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-xl md:text-2xl font-black italic uppercase leading-none tracking-tighter text-primary">
            Garanta seu Kit Alpha com Desconto Exclusivo
          </h3>
          <p className="text-muted-foreground text-xs md:text-sm font-medium uppercase tracking-[0.2em]">
            Oferta Especial: Economize pagando no PIX
          </p>
        </div>
        <Badge variant="secondary" className="bg-secondary text-secondary-foreground font-black px-4 py-2 text-sm uppercase italic animate-pulse shadow-lg self-start md:self-center shrink-0">
          Últimas Unidades!
        </Badge>
      </div>
      <Sparkles className="absolute -top-2 -right-2 w-16 h-16 text-primary/10 rotate-12" />
    </div>
  );
}

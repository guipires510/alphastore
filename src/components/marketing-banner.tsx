
"use client";

import { useEffect, useState } from "react";
import { generateMarketingCopy, type GenerateMarketingCopyOutput } from "@/ai/flows/generate-marketing-copy-flow";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles } from "lucide-react";

export function MarketingBanner({ theme }: { theme: string }) {
  const [copy, setCopy] = useState<GenerateMarketingCopyOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCopy() {
      try {
        const result = await generateMarketingCopy({ theme });
        setCopy(result);
      } catch (error) {
        console.error("Failed to generate marketing copy", error);
      } finally {
        setLoading(false);
      }
    }
    loadCopy();
  }, [theme]);

  if (loading) {
    return (
      <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg flex items-center justify-between gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4 bg-primary/20" />
          <Skeleton className="h-3 w-1/2 bg-primary/20" />
        </div>
        <Skeleton className="h-6 w-20 bg-primary/20" />
      </div>
    );
  }

  if (!copy) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-white p-6 rounded-xl shadow-2xl border-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-xl md:text-2xl font-black italic uppercase leading-none tracking-tighter">
            {copy.promotionalMessage}
          </h3>
          <p className="text-white/80 text-xs md:text-sm font-medium uppercase tracking-[0.2em]">
            Oferta Especial Gerada por IA
          </p>
        </div>
        <Badge variant="secondary" className="bg-white text-primary font-black px-4 py-2 text-sm uppercase italic animate-pulse shadow-lg self-start md:self-center shrink-0">
          {copy.urgencyMessage}
        </Badge>
      </div>
      <Sparkles className="absolute -top-2 -right-2 w-16 h-16 text-white/10 rotate-12" />
    </div>
  );
}

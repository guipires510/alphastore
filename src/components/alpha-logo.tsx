
"use client";

import { cn } from "@/lib/utils";

export function AlphaLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-baseline gap-2 select-none", className)}>
      <span className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-primary leading-none">AlphaFlow</span>
      <span className="text-[8px] md:text-[10px] font-medium uppercase tracking-[0.4em] text-foreground leading-none">Underwear</span>
    </div>
  );
}

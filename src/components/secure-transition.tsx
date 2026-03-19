
"use client";

import { ShieldCheck, Loader2 } from "lucide-react";

export function SecureTransition() {
  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center animate-in fade-in duration-300">
      <div className="max-w-xs w-full text-center space-y-8 p-6">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary border border-primary/20">
            <ShieldCheck className="w-12 h-12" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-background p-1 rounded-full">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">
            Indo para um ambiente <span className="text-primary">seguro...</span>
          </h2>
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground italic">
              Conexão criptografada de ponta a ponta
            </p>
            <div className="w-full bg-muted h-0.5 mt-4 overflow-hidden rounded-full">
              <div className="bg-primary h-full animate-progress-fast" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

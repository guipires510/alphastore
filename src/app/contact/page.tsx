
"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensagem Enviada!",
      description: "Nossa equipe Alpha entrará em contato em breve.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-12">
      <Navbar />
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-12">
          <span className="text-primary font-black uppercase italic tracking-widest text-xs">Suporte ao Cliente</span>
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mt-2 leading-none">Fale com a <span className="text-primary">AlphaFlow</span></h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <p className="text-muted-foreground uppercase tracking-widest font-medium text-sm leading-relaxed">
              Dúvidas sobre seu pedido, trocas ou parcerias? <br />
              Nossa equipe está pronta para te atender com agilidade.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black italic uppercase text-sm mb-1">WhatsApp Alpha</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">(11) 98765-4321</p>
                  <p className="text-[10px] text-primary font-bold uppercase mt-1">Atendimento Instantâneo</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black italic uppercase text-sm mb-1">E-mail</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">contato@alphaflow.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black italic uppercase text-sm mb-1">Centro de Distribuição</h4>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">São Paulo, SP - Brasil</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-card border border-border rounded-2xl">
              <h4 className="font-black italic uppercase text-xs tracking-widest mb-4">Horário de Operação</h4>
              <ul className="space-y-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <li className="flex justify-between"><span>Segunda - Sexta</span> <span>09:00 - 18:00</span></li>
                <li className="flex justify-between"><span>Sábado</span> <span>09:00 - 13:00</span></li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6 shadow-2xl">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Nome Completo</Label>
                <Input required className="bg-muted/50 border-border h-12 uppercase font-bold text-xs" placeholder="COMO PODEMOS TE CHAMAR?" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">E-mail</Label>
                <Input required type="email" className="bg-muted/50 border-border h-12 uppercase font-bold text-xs" placeholder="SEU MELHOR E-MAIL" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Mensagem</Label>
                <Textarea required className="bg-muted/50 border-border min-h-[150px] uppercase font-bold text-xs p-4" placeholder="ESCREVA SUA DÚVIDA AQUI..." />
              </div>
            </div>
            <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black italic uppercase tracking-[0.2em] text-lg cta-button">
              <Send className="w-5 h-5 mr-2" /> Enviar Mensagem
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

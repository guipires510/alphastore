
"use client";

import { useCartStore } from "@/lib/store";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { CheckCircle2, QrCode, Copy, Wallet } from "lucide-react";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h2 className="text-2xl font-black italic uppercase mb-4">Seu carrinho está vazio</h2>
        <Button onClick={() => router.push("/catalog")} className="bg-primary uppercase font-bold italic tracking-widest">
          Ir para Loja
        </Button>
      </div>
    );
  }

  const cartTotal = total();
  const pixDiscount = cartTotal * 0.05;
  const finalTotal = cartTotal - pixDiscount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call to Firebase
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
      toast({
        title: "Pedido Gerado!",
        description: "Aguardando pagamento via PIX.",
      });
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="flex flex-col min-h-screen pt-24 pb-12">
        <Navbar />
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl space-y-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">Pedido <span className="text-primary">Recebido!</span></h1>
            <p className="text-muted-foreground uppercase tracking-widest font-medium text-sm">
              Seu pedido #FLOW-{Math.floor(Math.random() * 99999)} foi gerado. <br />
              Pague agora via PIX para garantir o envio imediato.
            </p>

            <div className="bg-white p-6 rounded-xl inline-block shadow-inner mx-auto">
              <div className="w-48 h-48 bg-muted relative flex items-center justify-center">
                <QrCode className="w-40 h-40 text-background" strokeWidth={1.5} />
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="font-black text-4xl italic uppercase -rotate-45">PIX</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg flex items-center justify-between gap-4">
                <code className="text-[10px] md:text-xs font-mono break-all text-left">
                  00020126360014br.gov.bcb.pix0114alphaflowstore27300508FLOW123
                </code>
                <Button variant="ghost" size="icon" className="shrink-0" onClick={() => {
                  navigator.clipboard.writeText("00020126360014br.gov.bcb.pix0114alphaflowstore27300508FLOW123");
                  toast({ title: "Copiado!", description: "Chave PIX copiada para a área de transferência." });
                }}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary">Copie e cole a chave acima no seu app do banco</p>
            </div>

            <div className="pt-8 border-t flex flex-col gap-4">
              <div className="flex justify-between font-black italic uppercase">
                <span>Total a Pagar:</span>
                <span className="text-primary text-2xl">R$ {finalTotal.toFixed(2)}</span>
              </div>
              <Button onClick={() => router.push("/")} className="w-full bg-foreground text-background font-black italic uppercase tracking-widest h-14 cta-button">
                Voltar para Início
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-12">
      <Navbar />
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-12">Finalizar <span className="text-primary">Compra</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-black italic uppercase tracking-widest mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary" /> Dados de Entrega
              </h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Nome Completo</Label>
                    <Input required className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="EX: JOÃO SILVA" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">WhatsApp</Label>
                    <Input required className="bg-muted/50 border-border h-12 text-xs font-bold" placeholder="(00) 00000-0000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">E-mail</Label>
                  <Input required type="email" className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="E-MAIL@EXEMPLO.COM" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Endereço Completo</Label>
                  <Input required className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="RUA, NÚMERO, BAIRRO" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Cidade</Label>
                    <Input required className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="CIDADE" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">CEP</Label>
                    <Input required className="bg-muted/50 border-border h-12 text-xs font-bold" placeholder="00000-000" />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-black italic uppercase tracking-widest mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary" /> Método de Pagamento
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="border-2 border-primary bg-primary/5 p-6 rounded-xl flex items-center justify-between cursor-pointer shadow-lg shadow-primary/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black italic uppercase text-lg leading-none">PIX</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">5% de Desconto Real</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-4 border-primary bg-white shadow-inner" />
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-2xl">
              <h2 className="text-xl font-black italic uppercase tracking-widest mb-8 border-b pb-4">Resumo do <span className="text-primary">Pedido</span></h2>
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between items-center text-sm">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="font-bold uppercase tracking-tight truncate italic">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Tam: {item.size} • Qtd: {item.quantity}</p>
                    </div>
                    <span className="font-black italic shrink-0">R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 border-t pt-6 mb-8 font-bold uppercase tracking-widest text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-primary font-black">
                  <span>Desconto PIX (5%):</span>
                  <span>- R$ {pixDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete:</span>
                  <span className="text-accent">GRÁTIS</span>
                </div>
                <div className="flex justify-between text-xl font-black italic pt-4 border-t border-border/50 text-foreground">
                  <span className="uppercase tracking-tighter">Total:</span>
                  <span className="text-primary">R$ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                form="checkout-form"
                type="submit"
                disabled={isProcessing}
                className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black italic uppercase tracking-[0.2em] text-lg cta-button"
              >
                {isProcessing ? "PROCESSANDO..." : "PAGAR COM PIX AGORA"}
              </Button>
              <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-[0.2em] font-medium italic">
                Compra 100% Segura • Checkout AlphaFlow
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

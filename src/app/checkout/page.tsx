"use client";

import { useCartStore } from "@/lib/store";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { CircleCheck, QrCode, Copy, Wallet, Loader2, Search, Sparkles, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS } from "@/lib/products";
import { doc, setDoc } from "firebase/firestore";
import { initializeFirebase } from "@/firebase/index";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { processTrexPayment } from "@/ai/flows/create-trex-payment-flow";

export default function CheckoutPage() {
  const { items, total, clearCart, addItem } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [pixData, setPixData] = useState({ payload: "", qrCode: "" });
  const { toast } = useToast();
  const router = useRouter();

  // Address State
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    numero: "",
    complemento: ""
  });
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    whatsapp: ""
  });
  const [isFetchingCep, setIsFetchingCep] = useState(false);

  const orderBumps = useMemo(() => {
    return PRODUCTS.filter(p => p.category === 'single').slice(0, 2);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 8);
    setCep(value);

    if (value.length === 8) {
      setIsFetchingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
        const data = await response.json();
        
        if (data.erro) {
          toast({
            title: "CEP não encontrado",
            description: "Verifique o número e tente novamente.",
            variant: "destructive",
          });
        } else {
          setAddress(prev => ({
            ...prev,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf
          }));
        }
      } catch (error) {} finally {
        setIsFetchingCep(false);
      }
    }
  };

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

  const finalTotal = total();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const newOrderId = `ALPHA-${Math.floor(Math.random() * 99999)}`;
    const { firestore } = initializeFirebase();

    try {
      // 1. Criar o pagamento na Trex Pay via Flow Genkit
      const trexResponse = await processTrexPayment({
        amount: finalTotal,
        customer: customer,
        orderId: newOrderId,
      });

      if (!trexResponse.success) {
        throw new Error(trexResponse.error || "Erro ao gerar PIX");
      }

      // 2. Salvar pedido no Firestore
      const orderData = {
        customer: { ...customer, address: { ...address, cep } },
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, size: i.size, color: i.color })),
        total: finalTotal,
        status: "pending",
        pixPayload: trexResponse.pixPayload,
        paymentId: trexResponse.paymentId,
        createdAt: new Date().toISOString()
      };

      const orderRef = doc(firestore, 'orders', newOrderId);
      setDoc(orderRef, orderData).catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: orderRef.path,
          operation: 'create',
          requestResourceData: orderData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });

      // 3. Atualizar UI
      setOrderId(newOrderId);
      setPixData({ payload: trexResponse.pixPayload, qrCode: trexResponse.qrCodeUrl });
      setOrderComplete(true);
      clearCart();
      
      toast({
        title: "PIX Gerado com Sucesso!",
        description: "Aguardando pagamento para envio.",
      });
    } catch (error: any) {
      toast({
        title: "Erro no Pagamento",
        description: error.message || "Não foi possível gerar seu PIX. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddBump = (product: any) => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1, size: "G", color: "Sortidas" });
    toast({ title: "Oferta Ativada!", description: "Item adicionado ao seu carrinho Alpha." });
  };

  if (orderComplete) {
    return (
      <div className="flex flex-col min-h-screen pt-24 pb-12">
        <Navbar />
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl space-y-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <CircleCheck className="w-12 h-12" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">Pedido <span className="text-primary">Recebido!</span></h1>
            <p className="text-muted-foreground uppercase tracking-widest font-medium text-sm">
              Seu pedido {orderId} foi gerado via <span className="text-primary font-bold">Trex Pay</span>. <br />
              Pague agora para garantir seu envio Alpha.
            </p>

            <div className="bg-white p-6 rounded-xl inline-block shadow-inner mx-auto">
              <div className="w-48 h-48 relative flex items-center justify-center">
                {pixData.qrCode ? (
                  <img src={pixData.qrCode} alt="QR Code PIX" className="w-40 h-40" />
                ) : (
                  <QrCode className="w-40 h-40 text-black" strokeWidth={1.5} />
                )}
              </div>
              <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest mt-2">Aponte a câmera do banco</p>
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">PIX Copia e Cola</Label>
              <div className="bg-muted p-4 rounded-lg flex items-center justify-between gap-4 border border-primary/20">
                <code className="text-[10px] font-mono break-all text-left line-clamp-2">
                  {pixData.payload}
                </code>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="shrink-0 hover:bg-primary/20 text-primary" 
                  onClick={() => {
                    navigator.clipboard.writeText(pixData.payload);
                    toast({ title: "Copiado!", description: "Código PIX copiado." });
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
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
          <div className="space-y-8">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-black italic uppercase tracking-widest mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary" /> Dados de Entrega
              </h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Nome Completo</Label>
                    <Input required value={customer.name} onChange={(e) => setCustomer({...customer, name: e.target.value})} className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="EX: JOÃO SILVA" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">WhatsApp</Label>
                    <Input required value={customer.whatsapp} onChange={(e) => setCustomer({...customer, whatsapp: e.target.value})} className="bg-muted/50 border-border h-12 text-xs font-bold" placeholder="(00) 00000-0000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">E-mail</Label>
                  <Input required type="email" value={customer.email} onChange={(e) => setCustomer({...customer, email: e.target.value})} className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="E-MAIL@EXEMPLO.COM" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      CEP {isFetchingCep && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
                    </Label>
                    <div className="relative">
                      <Input required value={cep} onChange={handleCepChange} className="bg-muted/50 border-border h-12 text-xs font-bold pr-10" placeholder="00000-000" />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Rua / Logradouro</Label>
                    <Input required value={address.logradouro} onChange={(e) => setAddress({...address, logradouro: e.target.value})} className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="RUA..." />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Número</Label>
                    <Input required value={address.numero} onChange={(e) => setAddress({...address, numero: e.target.value})} className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="123" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Bairro</Label>
                    <Input required value={address.bairro} onChange={(e) => setAddress({...address, bairro: e.target.value})} className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="BAIRRO" />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-black italic uppercase tracking-widest mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary" /> Pagamento Seguro via <span className="text-primary italic">Trex Pay</span>
              </h2>
              <div className="border-2 border-primary bg-primary/5 p-6 rounded-xl flex items-center justify-between shadow-lg shadow-primary/10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black italic uppercase text-lg leading-none">PIX</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">Aprovação Imediata • Envio Prioritário</p>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-full border-4 border-primary bg-white" />
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit space-y-8">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-2xl">
              <h2 className="text-xl font-black italic uppercase tracking-widest mb-8 border-b pb-4">Resumo do <span className="text-primary">Pedido</span></h2>
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold uppercase tracking-tight truncate italic text-sm">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Tam: {item.size} • Qtd: {item.quantity}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-black italic text-sm">R$ {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-primary/5 border-2 border-dashed border-primary/30 rounded-xl p-4 mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Oferta Relâmpago Alpha</span>
                </div>
                <div className="space-y-3">
                  {orderBumps.map((product) => {
                    if (items.some(i => i.id === product.id)) return null;
                    return (
                      <div key={product.id} className="flex items-center justify-between gap-4 p-3 rounded-lg border bg-background/50 border-border">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded border overflow-hidden">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase truncate w-32">{product.name}</p>
                            <p className="text-[10px] font-black text-primary">R$ {product.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <Button onClick={() => handleAddBump(product)} size="sm" className="h-8 px-3 bg-foreground text-background font-black italic uppercase text-[9px]">ADICIONAR</Button>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="space-y-3 border-t pt-6 mb-8 font-bold uppercase tracking-widest text-[10px]">
                <div className="flex justify-between text-xl font-black italic pt-4 border-t border-border/50 text-foreground">
                  <span>Total Final:</span>
                  <span className="text-primary">R$ {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  form="checkout-form"
                  type="submit"
                  disabled={isProcessing}
                  className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black italic uppercase tracking-[0.2em] text-lg cta-button"
                >
                  {isProcessing ? <Loader2 className="animate-spin" /> : "FINALIZAR PAGAMENTO PIX"}
                </Button>
                <p className="text-[9px] text-center font-bold uppercase text-muted-foreground flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-primary" /> Pagamento processado com segurança pela Trex Pay
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

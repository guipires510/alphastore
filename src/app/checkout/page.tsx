
"use client";

import { useCartStore } from "@/lib/store";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { CircleCheck, QrCode, Copy, Wallet, Loader2, Search, ShieldCheck, Truck, Plus, Flame, Clock, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useFirebase } from "@/firebase/provider";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { createPixPayment } from "@/lib/trex-pay";
import { PRODUCTS } from "@/lib/products";

const SHIPPING_OPTIONS = [
  { id: 'transportadora', name: 'Transportadora', days: '10-15 dias úteis', price: 0 },
  { id: 'pac', name: 'PAC', days: '8-12 dias úteis', price: 24.90 },
  { id: 'sedex', name: 'SEDEX', days: '3-5 dias úteis', price: 42.90 },
];

export default function CheckoutPage() {
  const { items, total, addItem, clearCart, updateQuantity, removeItem } = useCartStore();
  const { firestore } = useFirebase();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [pixData, setPixData] = useState({ payload: "", qrCode: "" });
  const [finalValue, setFinalValue] = useState(0);
  const [selectedShippingId, setSelectedShippingId] = useState('transportadora');
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
    whatsapp: "",
    document: ""
  });
  const [isFetchingCep, setIsFetchingCep] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const upsellProducts = useMemo(() => {
    if (!mounted) return [];
    return PRODUCTS.filter(p => p.id !== 'teste-alpha' && !items.find(item => item.id === p.id)).slice(0, 2);
  }, [mounted, items]);

  const currentTotal = useMemo(() => {
    if (!mounted) return 0;
    return total();
  }, [mounted, items, total]);

  const selectedShipping = useMemo(() => {
    return SHIPPING_OPTIONS.find(opt => opt.id === selectedShippingId) || SHIPPING_OPTIONS[0];
  }, [selectedShippingId]);

  const totalWithShipping = useMemo(() => {
    return currentTotal + selectedShipping.price;
  }, [currentTotal, selectedShipping]);

  const isCepValid = cep.replace(/\D/g, "").length === 8;

  useEffect(() => {
    if (orderComplete && orderId && firestore) {
      const orderRef = doc(firestore, 'orders', orderId);
      
      const unsubscribe = onSnapshot(orderRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data.status === 'paid') {
            setIsPaid(true);
            toast({
              title: "Pagamento Confirmado!",
              description: "Sua compra foi aprovada e já está em processamento.",
            });
          }
        }
      });
      
      return () => unsubscribe();
    }
  }, [orderComplete, orderId, toast, firestore]);

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
            logradouro: data.logradouro || "",
            bairro: data.bairro || "",
            cidade: data.localidade || "",
            uf: data.uf || ""
          }));
        }
      } catch (error) {} finally {
        setIsFetchingCep(false);
      }
    }
  };

  const handleAddUpsell = (product: any) => {
    const discountedPrice = product.price * 0.95;
    addItem({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.image,
      quantity: 1,
      size: "M",
      color: "Sortidas",
    });
    toast({
      title: "Oferta Ativada!",
      description: `${product.name} adicionado com 5% de desconto extra!`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const documentClean = customer.document.replace(/\D/g, "");
    if (documentClean.length !== 11) {
      toast({
        title: "CPF Inválido",
        description: "Por favor, insira um CPF válido.",
        variant: "destructive",
      });
      return;
    }

    if (!firestore) return;

    setIsProcessing(true);
    
    const newOrderId = `ALPHA-${Math.floor(Math.random() * 99999)}`;
    const checkoutValue = totalWithShipping;

    try {
      // Chamada direta para a API de pagamentos
      const paymentResponse = await createPixPayment({
        amount: checkoutValue,
        customer: {
          name: customer.name,
          email: customer.email,
          phone: customer.whatsapp,
          document: documentClean
        },
        orderId: newOrderId,
      });

      if (!paymentResponse.success) {
        throw new Error(paymentResponse.error || "Erro ao gerar PIX");
      }

      const orderData = {
        customer: { ...customer, document: documentClean, address: { ...address, cep } },
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, size: i.size, color: i.color })),
        shipping: {
          name: selectedShipping.name,
          price: selectedShipping.price,
          days: selectedShipping.days
        },
        total: checkoutValue,
        status: "pending",
        pixPayload: paymentResponse.pixPayload,
        paymentId: paymentResponse.paymentId,
        createdAt: new Date().toISOString()
      };

      const orderRef = doc(firestore, 'orders', newOrderId);
      try {
        const setDocPromise = setDoc(orderRef, orderData);
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("firebase_timeout")), 5000));
        await Promise.race([setDocPromise, timeoutPromise]);
      } catch (error: any) {
        if (error.message === "firebase_timeout") {
          console.warn("A conexão com o banco de dados falhou por timeout (chaves do Firebase incorretas?). Simulação continuará offline para exibição na UI.");
        } else {
          const permissionError = new FirestorePermissionError({
            path: orderRef.path,
            operation: 'create',
            requestResourceData: orderData,
          });
          errorEmitter.emit('permission-error', permissionError);
        }
      }

      setOrderId(newOrderId);
      setPixData({ payload: paymentResponse.pixPayload, qrCode: paymentResponse.qrCodeUrl });
      setFinalValue(checkoutValue);
      setOrderComplete(true);
      clearCart();
      
      toast({
        title: "PIX Gerado!",
        description: "Pague para garantir seu envio Alpha.",
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

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen pt-24">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="flex flex-col min-h-screen pt-24">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <h2 className="text-2xl font-black italic uppercase mb-4">Seu carrinho está vazio</h2>
          <Button onClick={() => router.push("/catalog")} className="bg-primary uppercase font-bold italic tracking-widest">
            Ir para Loja
          </Button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="flex flex-col min-h-screen pt-24 pb-12">
        <Navbar />
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl space-y-8">
            {isPaid ? (
              <div className="space-y-6 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-600/10 rounded-full flex items-center justify-center mx-auto text-green-600 border-2 border-green-600">
                  <CircleCheck className="w-12 h-12" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">Pagamento <span className="text-green-600">Aprovado!</span></h1>
                <p className="text-muted-foreground uppercase tracking-widest font-medium text-sm">
                  Sua compra foi confirmada com sucesso. <br />
                  Seu pedido <span className="text-foreground font-black">{orderId}</span> já está em separação para envio imediato.
                </p>
                <div className="bg-green-600/10 border border-green-600/30 p-4 rounded-xl inline-block">
                  <p className="text-[10px] text-green-600 font-black uppercase tracking-[0.2em] italic">Status: Preparando para envio</p>
                </div>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  <Wallet className="w-12 h-12" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">Pedido <span className="text-primary">Recebido!</span></h1>
                <p className="text-muted-foreground uppercase tracking-widest font-medium text-sm">
                  Seu pedido {orderId} foi gerado. <br />
                  Pague agora via <span className="text-primary font-bold">PIX</span> para garantir seu envio prioritário.
                </p>

                <div className="bg-white p-6 rounded-xl inline-block shadow-inner mx-auto">
                  <div className="w-48 h-48 relative flex items-center justify-center">
                    {pixData.qrCode ? (
                      <Image 
                        src={pixData.qrCode} 
                        alt="QR Code PIX" 
                        width={160} 
                        height={160}
                        className="w-40 h-40" 
                        unoptimized
                      />
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
              </>
            )}

            <div className="pt-8 border-t flex flex-col gap-4">
              <div className="flex justify-between font-black italic uppercase">
                <span>Total Final:</span>
                <span className="text-primary text-2xl">R$ {finalValue.toFixed(2).replace('.', ',')}</span>
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
                <div className="w-1.5 h-6 bg-primary" /> Dados do Cliente
              </h2>
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Nome Completo</Label>
                    <Input required value={customer.name} onChange={(e) => setCustomer({...customer, name: e.target.value})} className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="EX: JOÃO SILVA" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">CPF</Label>
                    <Input required maxLength={11} value={customer.document} onChange={(e) => setCustomer({...customer, document: e.target.value.replace(/\D/g, "")})} className="bg-muted/50 border-border h-12 text-xs font-bold" placeholder="000.000.000-00" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">E-mail</Label>
                    <Input required type="email" value={customer.email} onChange={(e) => setCustomer({...customer, email: e.target.value})} className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="E-MAIL@EXEMPLO.COM" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">WhatsApp</Label>
                    <Input required value={customer.whatsapp} onChange={(e) => setCustomer({...customer, whatsapp: e.target.value})} className="bg-muted/50 border-border h-12 text-xs font-bold" placeholder="(00) 00000-0000" />
                  </div>
                </div>
                
                <h2 className="text-xl font-black italic uppercase tracking-widest mt-12 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-primary" /> Endereço de Entrega
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-2">
                    <div className="h-4 flex items-center">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        CEP {isFetchingCep && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
                      </Label>
                    </div>
                    <div className="relative">
                      <Input required value={cep} onChange={handleCepChange} className={`bg-muted/50 border-border h-12 text-xs font-bold pr-10 transition-all ${isCepValid ? 'ring-2 ring-green-600/30 border-green-600/30' : ''}`} placeholder="00000-000" />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <div className="h-4 flex items-center">
                      <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Rua / Logradouro</Label>
                    </div>
                    <Input required value={address.logradouro} onChange={(e) => setAddress({...address, logradouro: e.target.value})} className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="NOME DA RUA..." />
                  </div>
                  <div className="md:col-span-3">
                    {isCepValid && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Opções de Envio</Label>
                        <div className="grid grid-cols-1 gap-3">
                          {SHIPPING_OPTIONS.map((option) => (
                            <div 
                              key={option.id}
                              onClick={() => setSelectedShippingId(option.id)}
                              className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer group ${
                                selectedShippingId === option.id 
                                ? 'border-primary bg-primary/5 shadow-md' 
                                : 'border-border bg-card hover:border-primary/30'
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                  selectedShippingId === option.id 
                                  ? 'border-primary' 
                                  : 'border-muted-foreground group-hover:border-primary/50'
                                }`}>
                                  {selectedShippingId === option.id && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                                </div>
                                <div>
                                  <p className="font-black italic uppercase text-sm leading-none">{option.name}</p>
                                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{option.days}</p>
                                </div>
                              </div>
                              <span className="font-black italic text-sm">
                                {option.price === 0 ? 'Grátis' : `R$ ${option.price.toFixed(2).replace('.', ',')}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="md:col-span-1 space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Número</Label>
                    <Input required value={address.numero} onChange={(e) => setAddress({...address, numero: e.target.value})} className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="123" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Bairro</Label>
                    <Input required value={address.bairro} onChange={(e) => setAddress({...address, bairro: e.target.value})} className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="BAIRRO" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Cidade</Label>
                    <Input required value={address.cidade} onChange={(e) => setAddress({...address, cidade: e.target.value})} className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="SUA CIDADE" />
                  </div>
                  <div className="md:col-span-1 space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Estado (UF)</Label>
                    <Input required maxLength={2} value={address.uf} onChange={(e) => setAddress({...address, uf: e.target.value.toUpperCase()})} className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" placeholder="SP" />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-black italic uppercase tracking-widest mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary" /> Pagamento Seguro
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
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 items-center pb-4 border-b border-border/30 last:border-0 last:pb-0">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border bg-muted shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold uppercase tracking-tight truncate italic text-sm">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Tam: {item.size} • Cor: {item.color}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-border rounded-md overflow-hidden h-7">
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                            className="px-2 hover:bg-muted text-muted-foreground transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-[10px] font-black italic">{item.quantity}</span>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            className="px-2 hover:bg-muted text-muted-foreground transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          type="button"
                          onClick={() => removeItem(item.id, item.size, item.color)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          title="Remover item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-black italic text-sm">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-6 mb-8 font-bold uppercase tracking-widest text-[10px]">
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Subtotal:</span>
                  <span>R$ {currentTotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between items-center text-muted-foreground">
                  <span>Frete ({selectedShipping.name}):</span>
                  {selectedShipping.price === 0 ? (
                    <span className="text-green-600 font-black italic">GRÁTIS</span>
                  ) : (
                    <span className="font-black italic text-foreground">R$ {selectedShipping.price.toFixed(2).replace('.', ',')}</span>
                  )}
                </div>
                <div className="flex justify-between text-xl font-black italic pt-4 border-t border-border/50 text-foreground">
                  <span>Total Final:</span>
                  <span className="text-primary">R$ {totalWithShipping.toFixed(2).replace('.', ',')}</span>
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
                <div className="text-[9px] text-center font-bold uppercase text-muted-foreground flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-primary" /> Pagamento processado com segurança
                </div>
              </div>
            </div>

            {!isPaid && upsellProducts.length > 0 && (
              <div className="bg-card border-2 border-primary/30 rounded-xl p-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2">
                  <Badge className="bg-secondary text-white font-black italic text-[8px] uppercase tracking-widest animate-pulse">
                    OFERTA RELÂMPAGO
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <Flame className="w-5 h-5 text-secondary animate-bounce" />
                  <h3 className="font-black italic uppercase text-sm tracking-tighter">
                    ADICIONE E <span className="text-primary">ECONOMIZE +5%</span>
                  </h3>
                </div>

                <div className="space-y-4">
                  {upsellProducts.map((product) => (
                    <div key={product.id} className="flex gap-4 p-3 bg-muted/30 rounded-lg border border-border/50 hover:border-primary/50 transition-all">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold uppercase text-[10px] leading-tight line-clamp-2 italic mb-1">{product.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-muted-foreground line-through">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                          <span className="text-sm font-black text-primary italic">R$ {(product.price * 0.95).toFixed(2).replace('.', ',')}</span>
                        </div>
                        <Button 
                          onClick={() => handleAddUpsell(product)}
                          variant="ghost" 
                          className="h-7 w-full mt-2 bg-primary/10 text-primary hover:bg-primary hover:text-white font-black uppercase italic text-[9px] tracking-widest p-0 rounded"
                        >
                          <Plus className="w-3 h-3 mr-1" /> Adicionar Agora
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 py-2 bg-secondary rounded-lg">
                  <span className="text-[10px] font-black uppercase text-white tracking-widest flex items-center gap-2">
                    <Clock className="w-3 h-3 text-white" /> VÁLIDO SOMENTE PARA ESTA COMPRA
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

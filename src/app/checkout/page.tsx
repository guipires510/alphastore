"use client";

import { useCartStore } from "@/lib/store";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { CircleCheckBig, QrCode, Copy, Wallet, Trash2, CreditCard, Search, Loader2, Plus, Sparkles } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { PRODUCTS } from "@/lib/products";

export default function CheckoutPage() {
  const { items, total, clearCart, removeItem, addItem } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
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
  const [isFetchingCep, setIsFetchingCep] = useState(false);

  const OFFICIAL_PIX_CODE = "CONFIGURAR_CHAVE_PIX_NO_PAINEL_ADMIN";

  // Order Bumps Selection
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
          toast({
            title: "Endereço Encontrado",
            description: `${data.logradouro}, ${data.localidade} - ${data.uf}`,
          });
        }
      } catch (error) {
        // Silently handle fetch errors as per guidelines
      } finally {
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

  const cartTotal = total();
  // Check if any order bump (single item) is in the cart to apply extra discount
  const hasOrderBump = items.some(item => item.id === '4' || item.id === '5');
  const comboDiscount = hasOrderBump ? cartTotal * 0.10 : 0; // 10% extra if bump added
  const pixDiscount = (cartTotal - comboDiscount) * 0.05;
  const finalTotal = cartTotal - comboDiscount - pixDiscount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    const newOrderId = `FLOW-${Math.floor(Math.random() * 99999)}`;
    
    setTimeout(() => {
      setIsProcessing(false);
      setOrderId(newOrderId);
      setOrderComplete(true);
      clearCart();
      toast({
        title: "Pedido Gerado!",
        description: "Aguardando pagamento via PIX.",
      });
    }, 1500);
  };

  const handleAddBump = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: "G", // Default for bump
      color: "Sortidas", // Default for bump
    });
    toast({
      title: "Oferta Ativada!",
      description: "Desconto Alpha de 10% aplicado ao seu carrinho.",
    });
  };

  if (orderComplete) {
    return (
      <div className="flex flex-col min-h-screen pt-24 pb-12">
        <Navbar />
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl space-y-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <CircleCheckBig className="w-12 h-12" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">Pedido <span className="text-primary">Recebido!</span></h1>
            <p className="text-muted-foreground uppercase tracking-widest font-medium text-sm">
              Seu pedido {orderId} foi gerado. <br />
              Pague agora via PIX para garantir o envio imediato.
            </p>

            <div className="bg-white p-6 rounded-xl inline-block shadow-inner mx-auto">
              <div className="w-48 h-48 bg-muted relative flex items-center justify-center">
                <QrCode className="w-40 h-40 text-background" strokeWidth={1.5} />
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="font-black text-4xl italic uppercase -rotate-45 text-black">PIX</span>
                </div>
              </div>
              <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest mt-2">Aponte a câmera do banco</p>
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">PIX Copia e Cola</Label>
              <div className="bg-muted p-4 rounded-lg flex items-center justify-between gap-4 border border-primary/20">
                <code className="text-[10px] font-mono break-all text-left line-clamp-2">
                  {OFFICIAL_PIX_CODE}
                </code>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="shrink-0 hover:bg-primary/20 text-primary" 
                  onClick={() => {
                    navigator.clipboard.writeText(OFFICIAL_PIX_CODE);
                    toast({ 
                      title: "Copiado!", 
                      description: "Código PIX copiado para a área de transferência.",
                    });
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
                
                {/* Endereço com CEP Automático */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                      CEP {isFetchingCep && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
                    </Label>
                    <div className="relative">
                      <Input 
                        required 
                        value={cep}
                        onChange={handleCepChange}
                        className="bg-muted/50 border-border h-12 text-xs font-bold pr-10" 
                        placeholder="00000-000" 
                      />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Rua / Logradouro</Label>
                    <Input 
                      required 
                      value={address.logradouro}
                      onChange={(e) => setAddress({...address, logradouro: e.target.value})}
                      className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" 
                      placeholder="EX: RUA DAS FLORES" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Número</Label>
                    <Input 
                      required 
                      value={address.numero}
                      onChange={(e) => setAddress({...address, numero: e.target.value})}
                      className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" 
                      placeholder="123" 
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Bairro</Label>
                    <Input 
                      required 
                      value={address.bairro}
                      onChange={(e) => setAddress({...address, bairro: e.target.value})}
                      className="bg-muted/50 border-border h-12 uppercase text-xs font-bold" 
                      placeholder="BAIRRO" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Cidade</Label>
                    <Input 
                      required 
                      value={address.cidade}
                      readOnly
                      className="bg-muted/20 border-border h-12 uppercase text-xs font-bold cursor-not-allowed" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Estado (UF)</Label>
                    <Input 
                      required 
                      value={address.uf}
                      readOnly
                      className="bg-muted/20 border-border h-12 uppercase text-xs font-bold cursor-not-allowed" 
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-black italic uppercase tracking-widest mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-primary" /> Método de Pagamento
              </h2>
              
              <div className="space-y-4">
                {/* PIX Option - Active */}
                <div className="border-2 border-primary bg-primary/5 p-6 rounded-xl flex items-center justify-between shadow-lg shadow-primary/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black italic uppercase text-lg leading-none">PIX</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">Aprovação Imediata • 5% de Desconto</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border-4 border-primary bg-white shadow-inner" />
                </div>

                {/* Credit Card Option - Disabled */}
                <div className="border border-border bg-muted/30 p-6 rounded-xl flex items-center justify-between opacity-60 grayscale cursor-not-allowed relative overflow-hidden group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-black italic uppercase text-lg leading-none">CARTÃO DE CRÉDITO</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-destructive mt-1">Indisponível no momento</p>
                    </div>
                  </div>
                  <Badge variant="destructive" className="absolute top-2 right-2 text-[8px] font-black uppercase italic tracking-widest px-2 py-0.5">
                    DESATIVADO TEMPORARIAMENTE
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Column */}
          <div className="lg:sticky lg:top-24 h-fit space-y-8">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-2xl">
              <h2 className="text-xl font-black italic uppercase tracking-widest mb-8 border-b pb-4">Resumo do <span className="text-primary">Pedido</span></h2>
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 items-center group">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border shrink-0 bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 pr-2">
                      <p className="font-bold uppercase tracking-tight truncate italic text-sm">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Tam: {item.size} • Cor: {item.color} • Qtd: {item.quantity}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-black italic shrink-0 text-sm">R$ {(item.price * item.quantity).toFixed(2)}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        onClick={() => {
                          removeItem(item.id, item.size, item.color);
                          toast({
                            title: "Item removido",
                            description: "Seu resumo de pedido foi atualizado.",
                          });
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Bump Section */}
              <div className="bg-primary/5 border-2 border-dashed border-primary/30 rounded-xl p-4 mb-8 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary italic">Oferta Relâmpago Alpha</span>
                </div>
                <h4 className="text-xs font-black uppercase italic tracking-tighter">Adicione e ganhe +10% de desconto em todo o pedido!</h4>
                
                <div className="space-y-3">
                  {orderBumps.map((product) => {
                    const isAlreadyInCart = items.some(i => i.id === product.id);
                    return (
                      <div key={product.id} className={`flex items-center justify-between gap-4 p-3 rounded-lg border transition-all ${isAlreadyInCart ? 'bg-primary/20 border-primary' : 'bg-background/50 border-border hover:border-primary/50'}`}>
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded border border-border overflow-hidden">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase truncate w-32">{product.name}</p>
                            <p className="text-[10px] font-black text-primary">R$ {product.price.toFixed(2)}</p>
                          </div>
                        </div>
                        {isAlreadyInCart ? (
                          <Badge className="bg-primary text-white text-[8px] font-black italic uppercase">ADICIONADO</Badge>
                        ) : (
                          <Button 
                            onClick={() => handleAddBump(product)}
                            size="sm" 
                            className="h-8 px-3 bg-foreground text-background font-black italic uppercase text-[9px] hover:bg-primary hover:text-white"
                          >
                            <Plus className="w-3 h-3 mr-1" /> ADICIONAR
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="space-y-3 border-t pt-6 mb-8 font-bold uppercase tracking-widest text-[10px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                {hasOrderBump && (
                  <div className="flex justify-between text-green-500 font-black italic">
                    <span>Desconto Combo Alpha (-10%):</span>
                    <span>- R$ {comboDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-primary font-black italic">
                  <span>Desconto PIX (-5%):</span>
                  <span>- R$ {pixDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-black italic pt-4 border-t border-border/50 text-foreground">
                  <span className="uppercase tracking-tighter">Total Final:</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
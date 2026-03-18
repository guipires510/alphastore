"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Package, User, LogOut, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock Orders updated to reflect new prices
  const orders = [
    {
      id: "FLOW-98212",
      date: "12/05/2026",
      total: 59.90,
      status: "paid",
      items: "Kit 10 Cuecas Boxer Lupo Performance"
    },
    {
      id: "FLOW-97103",
      date: "05/04/2026",
      total: 89.90,
      status: "delivered",
      items: "Kit 10 Cuecas Boxer CK Premium"
    }
  ];

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen pt-24">
        <Navbar />
        <div className="container mx-auto px-4 max-w-md flex-1 flex flex-col justify-center pb-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Entrar na <span className="text-primary">AlphaFlow</span></h1>
            <p className="text-muted-foreground uppercase tracking-widest font-medium text-xs italic">Acesse seus pedidos e ofertas exclusivas.</p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted h-12 p-1 mb-8 rounded-xl">
              <TabsTrigger value="login" className="font-black uppercase italic tracking-widest text-xs rounded-lg">Login</TabsTrigger>
              <TabsTrigger value="register" className="font-black uppercase italic tracking-widest text-xs rounded-lg">Cadastro</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">E-mail</Label>
                  <Input className="bg-muted/50 border-border h-12 uppercase font-bold text-xs" placeholder="SEU E-MAIL" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Senha</Label>
                    <button className="text-[10px] font-black uppercase text-primary italic">Esqueceu?</button>
                  </div>
                  <Input type="password" className="bg-muted/50 border-border h-12 text-xs" placeholder="••••••••" />
                </div>
              </div>
              <Button onClick={() => setIsLoggedIn(true)} className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black italic uppercase tracking-[0.2em] text-lg cta-button">
                Entrar
              </Button>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Nome Completo</Label>
                  <Input className="bg-muted/50 border-border h-12 uppercase font-bold text-xs" placeholder="NOME COMPLETO" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">E-mail</Label>
                  <Input className="bg-muted/50 border-border h-12 uppercase font-bold text-xs" placeholder="E-MAIL" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Senha</Label>
                  <Input type="password" className="bg-muted/50 border-border h-12 text-xs" placeholder="••••••••" />
                </div>
              </div>
              <Button onClick={() => setIsLoggedIn(true)} className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black italic uppercase tracking-[0.2em] text-lg cta-button">
                Criar Conta Alpha
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-12">
      <Navbar />
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-primary font-black uppercase italic tracking-widest text-xs">Área do Membro</span>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mt-2 leading-none">Minha <span className="text-primary">Conta</span></h1>
          </div>
          <Button variant="outline" onClick={() => setIsLoggedIn(false)} className="h-10 border-border font-bold uppercase tracking-widest text-xs italic hover:text-destructive hover:border-destructive transition-all">
            <LogOut className="w-4 h-4 mr-2" /> Sair
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <aside className="lg:col-span-1 space-y-2">
            <Button variant="ghost" className="w-full justify-start h-12 bg-primary/10 text-primary font-black italic uppercase tracking-widest text-xs rounded-xl">
              <Package className="w-4 h-4 mr-3" /> Meus Pedidos
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 hover:bg-muted font-bold italic uppercase tracking-widest text-xs rounded-xl transition-all">
              <User className="w-4 h-4 mr-3" /> Meus Dados
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12 hover:bg-muted font-bold italic uppercase tracking-widest text-xs rounded-xl transition-all">
              <Clock className="w-4 h-4 mr-3" /> Histórico
            </Button>
          </aside>

          <main className="lg:col-span-3 space-y-8">
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="p-6 bg-muted/50 border-b border-border">
                <h3 className="font-black italic uppercase tracking-widest text-sm">Pedidos Recentes</h3>
              </div>
              <div className="divide-y divide-border">
                {orders.map((order) => (
                  <div key={order.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/20 transition-colors">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-lg italic tracking-tighter uppercase">{order.id}</span>
                        <Badge className={`${
                          order.status === 'paid' ? 'bg-primary text-white' : 'bg-green-600 text-white'
                        } font-black uppercase italic text-[10px] px-3 py-0.5 tracking-widest`}>
                          {order.status === 'paid' ? 'PAGO' : 'ENTREGUE'}
                        </Badge>
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{order.items}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Realizado em {order.date}</p>
                    </div>
                    <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                      <span className="text-xl font-black italic tracking-tighter text-primary">R$ {order.total.toFixed(2)}</span>
                      <Button variant="link" className="text-xs font-black uppercase tracking-widest italic p-0 h-auto">Ver Detalhes</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <User className="w-5 h-5" />
                  </div>
                  <h4 className="font-black italic uppercase tracking-widest text-sm">Dados Alpha</h4>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">NOME</p>
                  <p className="text-xs font-bold uppercase">JOÃO DA SILVA ALFA</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">E-MAIL</p>
                  <p className="text-xs font-bold uppercase">ALFA@EXEMPLO.COM</p>
                </div>
                <Button variant="link" className="text-[10px] font-black uppercase p-0 h-auto italic tracking-widest">Editar Perfil</Button>
              </div>

              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white flex flex-col justify-between relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="font-black italic uppercase tracking-widest text-lg mb-2">Alpha Club</h4>
                  <p className="text-white/80 text-[10px] uppercase tracking-widest font-bold leading-relaxed mb-6">
                    Você já economizou <br />
                    <span className="text-2xl font-black italic">R$ 145,00</span> <br />
                    em compras este ano.
                  </p>
                </div>
                <Button variant="secondary" className="relative z-10 w-fit bg-white text-primary font-black italic uppercase tracking-widest text-[10px] group-hover:scale-105 transition-transform">
                  Ver Mais Vantagens
                </Button>
                <Package className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 rotate-12" />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

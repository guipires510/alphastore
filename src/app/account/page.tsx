"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Package, User, LogOut, Clock, CircleCheck, CircleAlert, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { currentUser, login, register, logout } = useUserStore();
  const { toast } = useToast();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('pedidos');

  // States do Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // States do Cadastro
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regCpf, setRegCpf] = useState("");
  const [regPhone, setRegPhone] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({ title: "Erro", description: "Preencha e-mail e senha.", variant: "destructive" });
      return;
    }
    
    const res = login(loginEmail, loginPassword);
    if (!res.success) {
      toast({ title: "Acesso Negado", description: res.message, variant: "destructive" });
    } else {
      toast({ title: "Bem-vindo de volta!", description: res.message });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!regName || !regEmail || !regPassword || !regCpf || !regPhone) {
      toast({ title: "Erro de Validação", description: "Todos os campos do cadastro são obrigatórios.", variant: "destructive" });
      return;
    }

    const cleanCpf = regCpf.replace(/\D/g, "");
    if (cleanCpf.length !== 11) {
      toast({ title: "CPF Inválido", description: "O CPF deve conter 11 dígitos.", variant: "destructive" });
      return;
    }

    const res = register({
      id: "",
      name: regName,
      email: regEmail,
      cpf: cleanCpf,
      phone: regPhone,
      password: regPassword,
    });

    if (!res.success) {
      toast({ title: "Falha no Cadastro", description: res.message, variant: "destructive" });
    } else {
      toast({ title: "Conta Criada!", description: "Seu cadastro na AlphaFlow foi finalizado, boas compras!" });
    }
  };

  // Lista vazia pois o usuário acabou de se cadastrar na demo
  const orders: any[] = [];

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

  if (!currentUser) {
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
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">E-mail</Label>
                  <Input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required className="bg-muted/50 border-border h-12 uppercase font-bold text-xs" placeholder="SEU E-MAIL" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Senha</Label>
                    <button type="button" className="text-[10px] font-black uppercase text-primary italic">Esqueceu?</button>
                  </div>
                  <Input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required className="bg-muted/50 border-border h-12 text-xs" placeholder="••••••••" />
                </div>
                <Button type="submit" className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black italic uppercase tracking-[0.2em] text-lg cta-button">
                  Entrar
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Nome Completo</Label>
                  <Input value={regName} onChange={e => setRegName(e.target.value)} required className="bg-muted/50 border-border h-12 uppercase font-bold text-xs" placeholder="NOME E SOBRENOME" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">CPF</Label>
                    <Input maxLength={14} value={regCpf} onChange={e => setRegCpf(e.target.value)} required className="bg-muted/50 border-border h-12 font-bold text-xs" placeholder="000.000.000-00" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Celular/WhatsApp</Label>
                    <Input value={regPhone} onChange={e => setRegPhone(e.target.value)} required className="bg-muted/50 border-border h-12 font-bold text-xs" placeholder="(11) 99999-9999" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">E-mail</Label>
                  <Input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} required className="bg-muted/50 border-border h-12 uppercase font-bold text-xs" placeholder="E-MAIL DE ACESSO" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Senha de Acesso</Label>
                  <Input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} required className="bg-muted/50 border-border h-12 text-xs" placeholder="SUA SENHA FORTE" />
                </div>
                <Button type="submit" className="w-full h-14 bg-foreground hover:bg-foreground/90 text-background font-black italic uppercase tracking-[0.2em] text-lg cta-button pt-4">
                  Criar Conta Alpha
                </Button>
              </form>
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
            <span className="text-primary font-black uppercase italic tracking-widest text-xs">Área do Membro VIP</span>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mt-2 leading-none">Minha <span className="text-primary">Conta</span></h1>
          </div>
          <Button variant="outline" onClick={() => logout()} className="h-10 border-border font-bold uppercase tracking-widest text-xs italic hover:text-destructive hover:border-destructive transition-all">
            <LogOut className="w-4 h-4 mr-2" /> Sair da Conta
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <aside className="lg:col-span-1 space-y-2">
            <Button onClick={() => setActiveTab('pedidos')} variant="ghost" className={`w-full justify-start h-12 ${activeTab === 'pedidos' ? 'bg-primary/10 text-primary font-black' : 'hover:bg-muted font-bold'} italic uppercase tracking-widest text-xs rounded-xl transition-all`}>
              <Package className="w-4 h-4 mr-3" /> Meus Pedidos
            </Button>
            <Button onClick={() => setActiveTab('dados')} variant="ghost" className={`w-full justify-start h-12 ${activeTab === 'dados' ? 'bg-primary/10 text-primary font-black' : 'hover:bg-muted font-bold'} italic uppercase tracking-widest text-xs rounded-xl transition-all`}>
              <User className="w-4 h-4 mr-3" /> Meus Dados
            </Button>
            <Button onClick={() => setActiveTab('historico')} variant="ghost" className={`w-full justify-start h-12 ${activeTab === 'historico' ? 'bg-primary/10 text-primary font-black' : 'hover:bg-muted font-bold'} italic uppercase tracking-widest text-xs rounded-xl transition-all`}>
              <Clock className="w-4 h-4 mr-3" /> Histórico
            </Button>
          </aside>

          <main className="lg:col-span-3 space-y-8">
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl">
               <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center font-black text-3xl text-primary italic border-4 border-background shadow-lg">
                 {currentUser.name.charAt(0).toUpperCase()}
               </div>
               <div className="flex-1 text-center md:text-left">
                 <h2 className="text-2xl font-black italic uppercase tracking-wide">Olá, {currentUser.name}!</h2>
                 <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mt-1">Status: Membro Verificado</p>
               </div>
               <Badge className="bg-green-600 px-4 py-1.5 uppercase tracking-widest text-[10px] font-black italic">
                 Conta Ativa
               </Badge>
            </div>

            {activeTab === 'dados' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <User className="w-5 h-5" />
                    </div>
                    <h4 className="font-black italic uppercase tracking-widest text-sm">Dados de Contato</h4>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">NOME COMPLETO</p>
                    <p className="text-xs font-bold uppercase">{currentUser.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">E-MAIL REGISTRADO</p>
                    <p className="text-xs font-bold uppercase lowercase">{currentUser.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">DOCUMENTO (CPF)</p>
                    <p className="text-xs font-bold uppercase">{currentUser.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">TELEFONE/WHATSAPP</p>
                    <p className="text-xs font-bold uppercase">{currentUser.phone}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white flex flex-col justify-between relative overflow-hidden group shadow-primary/20 shadow-xl">
                  <div className="relative z-10">
                    <h4 className="font-black italic uppercase tracking-widest text-lg mb-2">Alpha Club</h4>
                    <p className="text-white/80 text-[10px] uppercase tracking-widest font-bold leading-relaxed mb-6">
                      A cada compra com seu e-mail<br />
                      <span className="text-white bg-black/20 px-1 py-0.5 rounded align-middle mx-1 lowercase font-mono">{currentUser.email}</span> <br />
                      você junta pontos e troca por novos Kits.
                    </p>
                  </div>
                  <Button variant="secondary" onClick={() => router.push('/catalog')} className="relative z-10 w-fit bg-white text-primary font-black italic uppercase tracking-widest text-[10px] group-hover:scale-105 transition-transform">
                    Ver Recompensas
                  </Button>
                  <Package className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 rotate-12" />
                </div>
              </div>
            )}

            {activeTab === 'pedidos' && (
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 bg-muted/50 border-b border-border">
                  <h3 className="font-black italic uppercase tracking-widest text-sm">Pedidos Recentes</h3>
                </div>
                <div className="divide-y divide-border">
                  {orders.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground font-black italic tracking-widest uppercase text-xs">
                      <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      Nenhum pedido encontrado nesta conta.
                    </div>
                  ) : (
                    orders.map((order) => (
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
                          <span className="text-xl font-black italic tracking-tighter text-primary">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                          <Button variant="link" className="text-xs font-black uppercase tracking-widest italic p-0 h-auto">Ver Detalhes</Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'historico' && (
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm p-12 text-center text-muted-foreground font-black italic tracking-widest uppercase text-xs">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                Histórico de atividades vazio.
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
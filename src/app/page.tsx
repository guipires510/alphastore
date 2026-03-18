
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { MarketingBanner } from "@/components/marketing-banner";
import { PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Truck, Zap } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const featuredProducts = PRODUCTS.slice(0, 3);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-banner')?.imageUrl || '';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src={heroImage}
          alt="AlphaFlow Hero"
          fill
          priority
          className="object-cover brightness-50"
          data-ai-hint="male model underwear"
        />
        <div className="container relative z-10 px-4 text-center">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary font-black px-4 py-1 text-sm uppercase tracking-[0.3em] italic backdrop-blur-sm">
            Coleção Premium 2024
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black text-white italic mb-6 leading-none tracking-tighter uppercase drop-shadow-2xl">
            Redefina seu <br />
            <span className="text-primary">Conforto.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium uppercase tracking-widest">
            Cuecas de alto padrão projetadas para o homem moderno que não abre mão de estilo e durabilidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 bg-primary hover:bg-primary/90 text-white font-black italic uppercase tracking-widest text-lg cta-button shadow-2xl shadow-primary/20" asChild>
              <Link href="/catalog">Ver Catálogo</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 border-white text-white hover:bg-white hover:text-black font-black italic uppercase tracking-widest text-lg backdrop-blur-sm transition-all" asChild>
              <Link href="/catalog?filter=kit">Kits Promocionais</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-muted/50 py-12 border-y">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase italic">Entrega Flash</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Enviamos em até 24h úteis.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase italic">Qualidade Alpha</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Garantia total de satisfação.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase italic">Pagamento PIX</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Desconto imediato no checkout.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-primary font-black uppercase italic tracking-widest">Seleção do Mês</span>
            <h2 className="text-4xl md:text-5xl font-black italic leading-none tracking-tighter uppercase">Destaques da <span className="text-primary">Temporada</span></h2>
          </div>
          <Button variant="link" className="text-primary font-black uppercase italic tracking-widest hover:translate-x-2 transition-transform" asChild>
            <Link href="/catalog" className="flex items-center">
              Ver Tudo <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Marketing Section */}
      <section className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <MarketingBanner theme="Kit 10 cuecas por R$199,90 hoje no PIX com frete grátis" />
        </div>
      </section>

      {/* Category Callout */}
      <section className="py-24 bg-card border-y">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src="https://picsum.photos/seed/alphaflow2/800/600"
              alt="Kits AlphaFlow"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              data-ai-hint="underwear box"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter">Kits de Renovação</h3>
                <p className="text-white/70 text-sm font-medium uppercase tracking-widest">Economize até 40% em nossos kits de 5 e 10 unidades.</p>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-black italic uppercase leading-none tracking-tighter">Renove sua gaveta <br /> sem <span className="text-primary">complicações.</span></h2>
            <p className="text-muted-foreground leading-relaxed uppercase tracking-widest font-medium text-sm">
              Desenvolvemos kits pensados para a sua praticidade. Cuecas boxer e slip com tecidos tecnológicos que não enrolam na perna e mantêm a temperatura ideal.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-bold text-xs uppercase tracking-widest">Algodão Pima e Microfibra Premium</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-bold text-xs uppercase tracking-widest">Modelagem exclusiva AlphaFit</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-bold text-xs uppercase tracking-widest">Cós que não aperta nem enrola</span>
              </li>
            </ul>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black italic uppercase tracking-widest cta-button" asChild>
              <Link href="/catalog?filter=kit">Explorar Kits</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-black italic uppercase mb-4 tracking-tighter">Faça parte do <span className="text-primary">Clã Alpha</span></h2>
          <p className="text-muted-foreground uppercase tracking-widest font-medium text-sm mb-8">Receba ofertas exclusivas, lançamentos antecipados e 10% OFF na sua primeira compra.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="SEU MELHOR E-MAIL"
              className="flex-1 bg-card border border-border px-6 h-12 rounded-lg font-bold uppercase tracking-widest text-xs focus:ring-2 focus:ring-primary outline-none"
            />
            <Button className="h-12 px-8 bg-primary hover:bg-primary/90 font-black italic uppercase tracking-widest cta-button">Cadastrar</Button>
          </div>
        </div>
      </section>

      <footer className="bg-card py-16 border-t">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-primary italic uppercase leading-none">AlphaFlow</span>
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase">Underwear</span>
            </Link>
            <p className="text-muted-foreground text-xs uppercase tracking-widest leading-relaxed">
              Elevando o padrão do underwear masculino brasileiro desde 2024.
            </p>
          </div>
          <div>
            <h4 className="font-black text-sm uppercase italic mb-6 tracking-widest">Shop</h4>
            <ul className="space-y-4">
              <li><Link href="/catalog" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors font-medium">Todos os Produtos</Link></li>
              <li><Link href="/catalog?filter=kit" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors font-medium">Kits Promocionais</Link></li>
              <li><Link href="/catalog" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors font-medium">Lançamentos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-sm uppercase italic mb-6 tracking-widest">Suporte</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors font-medium">Rastrear Pedido</Link></li>
              <li><Link href="#" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors font-medium">Política de Troca</Link></li>
              <li><Link href="#" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors font-medium">Fale Conosco</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-sm uppercase italic mb-6 tracking-widest">Siga-nos</h4>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                <span className="text-[10px] font-black group-hover:text-white">IG</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                <span className="text-[10px] font-black group-hover:text-white">FB</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                <span className="text-[10px] font-black group-hover:text-white">TK</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-border/50 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            © 2024 AlphaFlow Underwear. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </div>
  );
}

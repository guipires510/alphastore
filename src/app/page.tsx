import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { MarketingBanner } from "@/components/marketing-banner";
import { PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Truck, Zap } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-banner')?.imageUrl || '';
  const highlightImage = PlaceHolderImages.find(img => img.id === 'featured-highlight')?.imageUrl || '';
  const featuredProduct = PRODUCTS.find(p => p.id === '3') || PRODUCTS[0];

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
            Coleção Premium 2026
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

      {/* Alpha Highlight Section - 16:9 Proportion */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-primary font-black uppercase italic tracking-widest">Seleção do Mês</span>
            <h2 className="text-4xl md:text-5xl font-black italic leading-none tracking-tighter uppercase">Destaque da <span className="text-primary">Temporada</span></h2>
          </div>
        </div>

        <div className="group relative bg-card border border-border rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-primary/30">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[16/9] lg:aspect-auto h-[400px] lg:h-[650px] overflow-hidden">
              <Image
                src={highlightImage}
                alt="Destaque AlphaFlow"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                data-ai-hint="men underwear luxury"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent lg:hidden" />
            </div>
            <div className="p-8 lg:p-16 flex flex-col justify-center gap-8">
              <div className="space-y-4">
                <Badge className="bg-primary text-white font-black italic px-4 py-1 uppercase tracking-widest text-xs">Best Seller Premium</Badge>
                <h3 className="text-4xl lg:text-6xl font-black italic uppercase leading-[0.9] tracking-tighter">
                  {featuredProduct.name.split('-')[0]} <br />
                  <span className="text-primary">{featuredProduct.name.split('-')[1] || 'Performance'}</span>
                </h3>
                <p className="text-muted-foreground uppercase tracking-widest font-medium text-sm lg:text-base max-w-lg leading-relaxed">
                  {featuredProduct.description} Nossa modelagem AlphaFit garante que a cueca não enrole e mantenha o frescor o dia todo.
                </p>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-5xl lg:text-6xl font-black italic text-primary">R$ {featuredProduct.price.toFixed(2)}</span>
                {featuredProduct.originalPrice && (
                  <span className="text-2xl text-muted-foreground line-through italic decoration-primary/50">
                    R$ {featuredProduct.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-16 px-12 bg-primary hover:bg-primary/90 text-white font-black italic uppercase tracking-widest text-lg cta-button shadow-2xl shadow-primary/20" asChild>
                  <Link href={`/product/${featuredProduct.id}`}>Garantir o Meu</Link>
                </Button>
                <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-xl border border-border/50">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">5% OFF NO PIX</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="h-16 px-12 border-border font-black italic uppercase tracking-widest text-lg hover:bg-foreground hover:text-background transition-all duration-300" asChild>
            <Link href="/catalog" className="flex items-center gap-3">
              Ver Todos os Produtos <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Marketing Section */}
      <section className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <MarketingBanner theme="Kit 10 cuecas por R$199,90 hoje no PIX com frete grátis" />
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
              Elevando o padrão do underwear masculino brasileiro desde 2026.
            </p>
          </div>
          <div>
            <h4 className="font-black text-sm uppercase italic mb-6 tracking-widest">Shop</h4>
            <ul className="space-y-4">
              <li><Link href="/catalog" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors font-medium">Todos os Produtos</Link></li>
              <li><Link href="/catalog?filter=kit" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors font-medium">Kits Promocionais</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-sm uppercase italic mb-6 tracking-widest">Suporte</h4>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors font-medium">Fale Conosco</Link></li>
              <li><Link href="#" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest transition-colors font-medium">Trocas e Devoluções</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-sm uppercase italic mb-6 tracking-widest">Social</h4>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                <span className="text-[10px] font-black group-hover:text-white">IG</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary transition-colors cursor-pointer group">
                <span className="text-[10px] font-black group-hover:text-white">TK</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-border/50 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            © 2026 AlphaFlow Underwear • Shopify Headless Ready
          </p>
        </div>
      </footer>
    </div>
  );
}


"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { MarketingBanner } from "@/components/marketing-banner";
import { PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Truck, Zap, ShoppingCart, CircleAlert, Sparkles, Loader2 } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { AlphaLogo } from "@/components/alpha-logo";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [navLoading, setNavLoading] = useState<string | null>(null);

  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-banner')?.imageUrl || '';
  const featuredProduct = PRODUCTS.find(p => p.id === 'lupo-10') || PRODUCTS[0];
  const weeklyProduct = PRODUCTS.find(p => p.id === 'lupo-6') || PRODUCTS[3];
  
  const featuredImage = "https://i.imgur.com/6SKXG9B.jpeg";
  const weeklyImage = "https://i.imgur.com/cLPh42r.jpeg";

  const handleNav = (id: string, path: string) => {
    setNavLoading(id);
    router.push(path);
  };

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
          sizes="100vw"
          className="object-cover brightness-50"
          data-ai-hint="male model underwear"
        />
        <div className="container relative z-10 px-4 text-center">
          <Badge className="mb-6 bg-primary/20 text-primary border-primary font-black px-4 py-1 text-sm uppercase tracking-[0.3em] italic backdrop-blur-sm">
            Nova Coleção Alpha 2026
          </Badge>
          <h1 className="text-5xl md:text-8xl font-black text-white italic mb-6 leading-none tracking-tighter uppercase drop-shadow-2xl">
            Redefina seu <br />
            <span className="text-primary">Conforto.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium uppercase tracking-widest">
            Cuecas de alto padrão projetadas para o homem moderno que não abre mão de estilo e durabilidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              disabled={navLoading === 'catalog'}
              onClick={() => handleNav('catalog', '/catalog')}
              className="h-14 px-10 bg-primary hover:bg-primary/90 text-white font-black italic uppercase tracking-widest text-lg cta-button shadow-2xl shadow-primary/20"
            >
              {navLoading === 'catalog' ? <Loader2 className="animate-spin" /> : "Ver Catálogo"}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              disabled={navLoading === 'featured'}
              onClick={() => handleNav('featured', `/product/${featuredProduct.id}`)}
              className="h-14 px-10 border-white text-white hover:bg-white hover:text-black font-black italic uppercase tracking-widest text-lg backdrop-blur-sm transition-all"
            >
              {navLoading === 'featured' ? <Loader2 className="animate-spin" /> : "Kits Promocionais"}
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
              <h4 className="font-black text-sm uppercase italic">Entrega Rápida</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Enviamos para todo o Brasil.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase italic">Qualidade Garantida</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Materiais premium de alta durabilidade.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-black text-sm uppercase italic">Pagamento Seguro</h4>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Transações rápidas via PIX.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta Mais Vendida Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-black italic leading-none tracking-tighter uppercase mt-2">Oferta mais <span className="text-primary">vendida</span></h2>
        </div>

        <div className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl product-card-hover transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[16/9] lg:aspect-auto h-full overflow-hidden bg-muted">
              <Image
                src={featuredImage}
                alt={featuredProduct.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-ai-hint="luxury underwear"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <Badge className="bg-secondary text-white font-black italic px-4 py-1 uppercase tracking-widest text-xs animate-pulse">
                  MELHOR OFERTA DO DIA
                </Badge>
                {featuredProduct.originalPrice && (
                  <Badge className="bg-orange-600 text-white font-black italic px-3 py-1 uppercase tracking-widest text-[10px] flex items-center gap-1">
                    <CircleAlert className="w-3 h-3" /> ÚLTIMAS UNIDADES!
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="p-8 md:p-12 flex flex-col justify-center gap-6">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tight leading-none">
                  {featuredProduct.name}
                </h3>
                <p className="text-muted-foreground uppercase tracking-widest font-medium text-sm leading-relaxed max-w-md">
                  {featuredProduct.description}
                </p>
              </div>

              <div className="flex items-end gap-4">
                <div className="flex flex-col">
                  {featuredProduct.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through decoration-primary/50 font-bold">
                      DE R$ {featuredProduct.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  <span className="text-4xl md:text-6xl font-black text-primary italic leading-none">
                    R$ {featuredProduct.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <Button 
                  disabled={navLoading === 'cta-featured'}
                  onClick={() => handleNav('cta-featured', `/product/${featuredProduct.id}`)}
                  size="lg" 
                  className="w-full md:w-fit h-16 px-12 bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase tracking-widest italic text-lg transition-all cta-button animate-gold-pulse"
                >
                  {navLoading === 'cta-featured' ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-3" />
                      Compre Agora
                    </>
                  )}
                </Button>
                <div className="flex flex-wrap gap-4">
                  {featuredProduct.features.slice(0, 3).map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-primary" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Section */}
      <section className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <MarketingBanner theme="Alpha Promo" />
        </div>
      </section>

      <footer className="bg-card py-16 border-t">
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-border/50 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            © 2026 AlphaFlow Underwear • Estilo e Performance
          </p>
        </div>
      </footer>
    </div>
  );
}

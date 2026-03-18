"use client";

import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";
import { SlidersHorizontal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";

export default function CatalogPage() {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const brandMatch = !activeBrand || product.brand === activeBrand;
      const categoryMatch = !activeCategory || product.category === activeCategory;
      return brandMatch && categoryMatch;
    });
  }, [activeBrand, activeCategory]);

  const brands = ["Lupo", "Calvin Klein", "Polo Wear"];

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-12">
      <Navbar />
      
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
            Catálogo <span className="text-primary">Alpha</span>
          </h1>
          <p className="text-muted-foreground uppercase tracking-[0.2em] font-medium text-sm">
            Toda a coleção de cuecas premium em um só lugar.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-8">
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <h3 className="font-black uppercase italic tracking-widest text-sm">Filtros Alpha</h3>
            </div>

            {/* General Filter Reset */}
            <Button 
              variant={!activeBrand && !activeCategory ? "secondary" : "ghost"}
              onClick={() => { setActiveBrand(null); setActiveCategory(null); }}
              className="w-full justify-start h-10 font-black text-xs uppercase tracking-widest italic"
            >
              Todos os Produtos
            </Button>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Categorias</h4>
              <div className="flex flex-col gap-2">
                <Button 
                  variant={activeCategory === 'kit' ? "outline" : "ghost"}
                  onClick={() => setActiveCategory(activeCategory === 'kit' ? null : 'kit')}
                  className={`justify-between h-9 font-bold text-xs uppercase tracking-widest italic transition-all ${activeCategory === 'kit' ? 'border-primary text-primary bg-primary/5' : 'hover:bg-muted'}`}
                >
                  Kits Promocionais
                  {activeCategory === 'kit' && <Check className="w-3 h-3" />}
                </Button>
                <Button 
                  variant={activeCategory === 'single' ? "outline" : "ghost"}
                  onClick={() => setActiveCategory(activeCategory === 'single' ? null : 'single')}
                  className={`justify-between h-9 font-bold text-xs uppercase tracking-widest italic transition-all ${activeCategory === 'single' ? 'border-primary text-primary bg-primary/5' : 'hover:bg-muted'}`}
                >
                  Cuecas Avulsas
                  {activeCategory === 'single' && <Check className="w-3 h-3" />}
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Marcas</h4>
              <div className="flex flex-col gap-2">
                {brands.map((brand) => (
                  <Button 
                    key={brand}
                    variant={activeBrand === brand ? "outline" : "ghost"}
                    onClick={() => setActiveBrand(activeBrand === brand ? null : brand)}
                    className={`justify-between h-9 font-bold text-xs uppercase tracking-widest italic transition-all ${activeBrand === brand ? 'border-primary text-primary bg-primary/5' : 'hover:bg-muted'}`}
                  >
                    {brand}
                    {activeBrand === brand && <Check className="w-3 h-3" />}
                  </Button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8 pb-4 border-b">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                Exibindo {filteredProducts.length} resultados
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ordenar por:</span>
                <select className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-primary italic outline-none cursor-pointer">
                  <option>Destaques</option>
                  <option>Menor Preço</option>
                  <option>Maior Preço</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="text-muted-foreground font-black uppercase italic tracking-widest">Nenhum produto encontrado.</p>
                <Button variant="link" onClick={() => { setActiveBrand(null); setActiveCategory(null); }} className="mt-4 uppercase text-xs font-black italic text-primary">Limpar filtros</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

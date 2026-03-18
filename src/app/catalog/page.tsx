
import { Navbar } from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CatalogPage() {
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
          {/* Sidebar Filters - Simplified for MVP */}
          <aside className="lg:w-64 space-y-8">
            <div className="flex items-center gap-2 pb-4 border-b border-border">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <h3 className="font-black uppercase italic tracking-widest text-sm">Filtros</h3>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em]">Categorias</h4>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="justify-start border-primary/20 bg-primary/5 text-primary h-9 font-bold text-xs uppercase tracking-widest italic">Todos</Button>
                <Button variant="ghost" className="justify-start h-9 font-bold text-xs uppercase tracking-widest italic hover:bg-muted">Kits Promocionais</Button>
                <Button variant="ghost" className="justify-start h-9 font-bold text-xs uppercase tracking-widest italic hover:bg-muted">Cuecas Avulsas</Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em]">Preço</h4>
              <div className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start h-9 font-bold text-xs uppercase tracking-widest italic hover:bg-muted text-left">Até R$ 50,00</Button>
                <Button variant="ghost" className="justify-start h-9 font-bold text-xs uppercase tracking-widest italic hover:bg-muted text-left">R$ 50 - R$ 150</Button>
                <Button variant="ghost" className="justify-start h-9 font-bold text-xs uppercase tracking-widest italic hover:bg-muted text-left">Acima de R$ 150</Button>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8 pb-4 border-b">
              <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                Exibindo {PRODUCTS.length} resultados
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest">Ordenar por:</span>
                <select className="bg-transparent border-none text-xs font-black uppercase tracking-widest text-primary italic outline-none cursor-pointer">
                  <option>Destaques</option>
                  <option>Menor Preço</option>
                  <option>Maior Preço</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

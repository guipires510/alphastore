
"use client";

import { useParams, useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { Navbar } from "@/components/navbar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { Check, ShieldCheck, Truck, Zap, Star } from "lucide-react";
import { generateProductDescription } from "@/ai/flows/generate-product-description-flow";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const addItem = useCartStore((state) => state.addItem);
  
  const product = PRODUCTS.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    if (product) {
      setLoadingAi(true);
      generateProductDescription({
        material: product.material,
        style: product.category === 'kit' ? 'boxer brief' : 'brief',
        features: product.features
      })
      .then(res => setAiDescription(res.description))
      .catch(err => console.error("AI error", err))
      .finally(() => setLoadingAi(false));
    }
  }, [product]);

  if (!product) return <div>Produto não encontrado</div>;

  const sizes = ["P", "M", "G", "GG"];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Atenção",
        description: "Selecione um tamanho antes de adicionar ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize,
    });

    toast({
      title: "Sucesso!",
      description: `${product.name} adicionado ao seu carrinho.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-12">
      <Navbar />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
                data-ai-hint="male underwear kit"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <Badge className="bg-primary text-white font-black italic px-4 py-1 uppercase tracking-widest text-xs">Best Seller</Badge>
                {product.originalPrice && (
                  <Badge variant="outline" className="bg-background/80 text-foreground border-border font-bold px-4 py-1 uppercase tracking-widest text-xs backdrop-blur-sm">PROMOÇÃO</Badge>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden bg-card border border-border cursor-pointer hover:border-primary transition-colors opacity-60 hover:opacity-100">
                  <Image
                    src={product.image}
                    alt={`${product.name} thumbnail ${i}`}
                    width={150}
                    height={150}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-accent mb-4">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-current" />)}
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">(127 avaliações)</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black italic uppercase leading-none tracking-tighter mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-black text-primary italic">R$ {product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through decoration-primary/50">
                  R$ {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4">Selecione o Tamanho</h3>
              <div className="flex gap-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-lg border-2 flex items-center justify-center font-black transition-all ${
                      selectedSize === size
                        ? "border-primary bg-primary text-white shadow-lg shadow-primary/20 scale-110"
                        : "border-border bg-card text-muted-foreground hover:border-muted hover:text-foreground"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full h-16 bg-primary hover:bg-primary/90 text-white font-black italic uppercase tracking-[0.2em] text-lg cta-button shadow-2xl shadow-primary/20"
              >
                Adicionar ao Carrinho
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-16 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-black italic uppercase tracking-[0.2em] text-lg transition-all"
                onClick={() => {
                  handleAddToCart();
                  router.push("/checkout");
                }}
              >
                Comprar Agora no PIX
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-12 p-6 bg-card rounded-xl border border-border">
              <div className="text-center space-y-2">
                <Truck className="w-6 h-6 text-primary mx-auto" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-tight">Frete Rápido Brasil</p>
              </div>
              <div className="text-center space-y-2 border-x">
                <ShieldCheck className="w-6 h-6 text-primary mx-auto" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-tight">Garantia Alpha</p>
              </div>
              <div className="text-center space-y-2">
                <Zap className="w-6 h-6 text-primary mx-auto" />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-tight">PIX c/ Desconto</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] italic border-b pb-2">Descrição Detalhada</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground uppercase tracking-widest font-medium text-sm leading-relaxed mb-4">
                  {product.description}
                </p>
                {loadingAi ? (
                  <div className="space-y-2">
                    <div className="h-3 bg-muted animate-pulse rounded w-full" />
                    <div className="h-3 bg-muted animate-pulse rounded w-4/5" />
                    <div className="h-3 bg-muted animate-pulse rounded w-5/6" />
                  </div>
                ) : (
                  <p className="text-foreground uppercase tracking-widest font-bold text-xs leading-relaxed italic border-l-2 border-primary pl-4">
                    {aiDescription}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-y-3 pt-4">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

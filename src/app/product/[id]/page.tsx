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
import { ShieldCheck, Truck, Zap, Star } from "lucide-react";
import { generateProductDescription } from "@/ai/flows/generate-product-description-flow";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const addItem = useCartStore((state) => state.addItem);
  
  const product = PRODUCTS.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string>("");
  const [aiDescription, setAiDescription] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const colors = [
    { name: "Brancas", hex: "#FFFFFF" },
    { name: "Pretas", hex: "#000000" },
    { name: "Azul Escuro", hex: "#00008B" },
    { name: "Cinza", hex: "#808080" },
    { name: "Sortidas", hex: "linear-gradient(45deg, #000, #808080, #fff, #00008b)" },
  ];

  const reviews = [
    {
      id: 1,
      name: "RICARDO S.",
      date: "Há 2 dias",
      rating: 5,
      comment: "MELHOR CUSTO BENEFÍCIO QUE JÁ ENCONTREI. O MATERIAL É REALMENTE PREMIUM E NÃO ENROLA NA PERNA. COMPREI O KIT DE 10 E VALE CADA CENTAVO.",
      verified: true
    },
    {
      id: 2,
      name: "MARCOS A.",
      date: "Há 1 semana",
      rating: 5,
      comment: "ENTREGA MUITO RÁPIDA! O SUPORTE NO WHATSAPP FOI NOTA 10. AS CUECAS SÃO EXTREMAMENTE CONFORTÁVEIS PARA TREINAR.",
      verified: true
    },
    {
      id: 3,
      name: "FELIPE T.",
      date: "Há 2 semanas",
      rating: 4,
      comment: "CONFORTO ABSURDO. RECOMENDO PRA QUEM BUSCA QUALIDADE DE VERDADE. O TAMANHO G FICOU PERFEITO.",
      verified: true
    }
  ];

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setLoadingAi(true);
      generateProductDescription({
        material: product.material,
        style: product.category === 'kit' ? 'boxer brief' : 'brief',
        features: product.features
      })
      .then(res => setAiDescription(res.description))
      .catch(err => {
        // Silently handle error as per guidelines
      })
      .finally(() => setLoadingAi(false));

      // Auto-select color if only one is available
      if (product.availableColors && product.availableColors.length === 1) {
        setSelectedColor(product.availableColors[0]);
      }
    }
  }, [product]);

  if (!product) return <div>Produto não encontrado</div>;

  const sizes = ["P", "M", "G", "GG", "XG"];
  const hasPromotion = !!product.originalPrice;
  const productImages = product.images || [product.image];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Seleção Obrigatória",
        description: "Por favor, escolha o TAMANHO antes de continuar.",
        variant: "destructive",
      });
      return false;
    }

    if (selectedSize === "XG") {
      toast({
        title: "Tamanho Esgotado",
        description: "Infelizmente o tamanho XG não está disponível no momento.",
        variant: "destructive",
      });
      return false;
    }

    if (!selectedColor) {
      toast({
        title: "Seleção Obrigatória",
        description: "Por favor, escolha a COR antes de continuar.",
        variant: "destructive",
      });
      return false;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
    });

    toast({
      title: "Sucesso!",
      description: `${product.name} (${selectedColor}) adicionado ao seu carrinho.`,
    });
    return true;
  };

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-12">
      <Navbar />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-card border border-border group">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute top-6 left-6 flex flex-col items-start gap-2">
                {hasPromotion && (
                  <>
                    <Badge className="bg-primary text-white font-black italic px-3 py-1 uppercase tracking-widest text-[10px] shadow-lg flex items-center justify-center text-center">
                      CAMPEÃO DE VENDAS
                    </Badge>
                    <Badge variant="secondary" className="bg-secondary text-white font-black italic px-2 py-0.5 uppercase tracking-widest text-[8px] animate-pulse shadow-lg flex items-center justify-center text-center">
                      POUCAS UNIDADES NO ESTOQUE
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {productImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "relative w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all",
                      activeImage === img ? "border-primary shadow-lg shadow-primary/20 scale-105" : "border-border hover:border-muted"
                    )}
                  >
                    <Image src={img} alt={`${product.name} view ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-6 pt-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] italic border-b pb-2">Descrição Detalhada</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground uppercase tracking-widest font-medium text-sm leading-relaxed mb-4">
                  {product.description}
                </p>
                {loadingAi ? (
                  <div className="space-y-2">
                    <div className="h-3 bg-muted animate-pulse rounded w-full" />
                    <div className="h-3 bg-muted animate-pulse rounded w-4/5" />
                  </div>
                ) : (
                  <p className="text-foreground uppercase tracking-widest font-bold text-xs leading-relaxed italic border-l-2 border-primary pl-4">
                    {aiDescription}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-accent mb-4">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3 h-3 fill-current" />)}
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">(127 avaliações)</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black italic uppercase leading-none tracking-tighter mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex flex-col">
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through decoration-primary/50 font-bold mb-1">
                    DE R$ {product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-4xl md:text-5xl font-black text-primary italic leading-none">R$ {product.price.toFixed(2)}</span>
              </div>
              <div className="bg-primary/10 border border-primary/20 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest text-primary">
                OFERTA EXCLUSIVA
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4">
                Selecione o Tamanho <span className="text-primary italic font-black">(Obrigatório)</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => {
                  const isSoldOut = size === "XG";
                  return (
                    <button
                      key={size}
                      disabled={isSoldOut}
                      onClick={() => setSelectedSize(size)}
                      className={`relative min-w-[3rem] h-12 px-3 rounded-lg border-2 flex flex-col items-center justify-center font-black transition-all ${
                        isSoldOut 
                          ? "border-muted/30 bg-muted/10 text-muted-foreground/40 cursor-not-allowed overflow-hidden" 
                          : selectedSize === size
                            ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                            : "border-border bg-card text-muted-foreground hover:border-muted hover:text-foreground"
                      }`}
                    >
                      <span className={isSoldOut ? "opacity-50 line-through" : ""}>{size}</span>
                      {isSoldOut && (
                        <span className="absolute inset-0 flex items-center justify-center bg-background/60">
                          <span className="text-[8px] font-black uppercase italic tracking-tighter text-secondary rotate-[-15deg]">ESGOTADO</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4">
                Selecione a Cor <span className="text-primary italic font-black">(Obrigatório)</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => {
                  const isUnavailable = product.availableColors && !product.availableColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      disabled={isUnavailable}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative px-4 h-11 rounded-lg border-2 flex items-center gap-2 transition-all group ${
                        isUnavailable
                          ? "border-muted/30 opacity-40 grayscale cursor-not-allowed"
                          : selectedColor === color.name
                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/5"
                            : "border-border bg-card hover:border-muted"
                      }`}
                    >
                      <div 
                        className="w-4 h-4 rounded-full border border-border/50" 
                        style={{ background: color.hex }}
                      />
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        selectedColor === color.name ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                      }`}>
                        {color.name}
                      </span>
                      {isUnavailable && (
                        <div className="absolute inset-0 bg-background/20 flex items-center justify-center">
                           <span className="text-[7px] font-black text-secondary rotate-[-10deg] uppercase">OFF</span>
                        </div>
                      )}
                    </button>
                  );
                })}
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
                  if (handleAddToCart()) {
                    router.push("/checkout");
                  }
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
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-tight">Pagamento Seguro</p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-12 pt-12 border-t border-border">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-primary font-black uppercase italic tracking-widest text-xs">Prova Social</span>
              <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mt-2">O que dizem os <span className="text-primary">Alphas</span></h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-card border border-border p-8 rounded-2xl space-y-4 hover:border-primary/30 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{review.date}</span>
                </div>
                <p className="text-xs md:text-sm font-bold uppercase tracking-tight italic leading-relaxed">
                  "{review.comment}"
                </p>
                <div className="flex items-center gap-3 pt-4">
                  <Avatar className="w-10 h-10 border border-primary/20">
                    <AvatarFallback className="bg-muted text-[10px] font-black uppercase">{review.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest">{review.name}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

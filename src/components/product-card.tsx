
"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ProductCard({ product }: { product: Product }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNavigate = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="group relative bg-card border border-border rounded-xl overflow-hidden product-card-hover flex flex-col">
      <Link href={`/product/${product.id}`} onClick={handleNavigate} className="block relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint="male underwear"
        />
        {product.originalPrice && (
          <Badge className="absolute top-4 left-4 bg-primary text-white font-black italic">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </Badge>
        )}
      </Link>
      
      <div className="p-4 flex-1 flex flex-col gap-2">
        <Link href={`/product/${product.id}`} onClick={handleNavigate}>
          <h3 className="text-sm font-black uppercase tracking-tight italic group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-auto">
          <span className="text-xl font-black text-primary italic">R$ {product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through decoration-primary/50">
              R$ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
          {product.material} • Kit c/ {product.quantity}
        </p>
      </div>
      
      <div className="p-4 pt-0">
        <Button 
          disabled={isLoading}
          onClick={handleNavigate}
          className="w-full bg-foreground text-background hover:bg-primary hover:text-white font-bold uppercase tracking-widest italic text-xs h-9 transition-all cta-button"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Comprar
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

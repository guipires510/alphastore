
"use client";

import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingCart as ShoppingCartIcon, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SecureTransition } from "./secure-transition";

export function CartDrawer({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart, total } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  const cartTotal = total();

  const handleCheckoutClick = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      router.push("/checkout");
    }, 800);
  };

  return (
    <>
      {isRedirecting && <SecureTransition />}
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="w-full sm:max-w-md bg-background flex flex-col p-0 border-l border-border">
          <SheetHeader className="p-6 border-b border-border flex flex-row items-center justify-between space-y-0">
            <SheetTitle className="flex items-center gap-2 uppercase tracking-widest font-black italic">
              Meu Carrinho
            </SheetTitle>
            {items.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearCart}
                className="text-[10px] font-black uppercase tracking-widest italic hover:text-destructive p-0 h-auto"
              >
                Limpar Tudo
              </Button>
            )}
          </SheetHeader>

          <ScrollArea className="flex-1 p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <ShoppingCartIcon className="w-12 h-12 text-muted-foreground opacity-20" />
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Vazio.</p>
                <SheetTrigger asChild>
                  <Button variant="outline" className="border-primary text-primary font-black italic uppercase text-xs tracking-widest">
                    Ver Produtos
                  </Button>
                </SheetTrigger>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 items-start pb-6 border-b border-border/50 last:border-0">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0 border border-border">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-black text-sm truncate uppercase tracking-tight italic flex-1">{item.name}</h4>
                        <button
                          onClick={() => removeItem(item.id, item.size, item.color)}
                          className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                          aria-label="Remover item"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                        Tam: {item.size} • Cor: {item.color}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-border rounded-lg overflow-hidden h-8">
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                            className="px-2 hover:bg-muted text-muted-foreground"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-black italic">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            className="px-2 hover:bg-muted text-muted-foreground"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-black italic text-primary">
                          R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {items.length > 0 && (
            <SheetFooter className="p-6 border-t border-border flex-col gap-4 sm:flex-col">
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-muted-foreground uppercase text-[10px] font-black tracking-[0.2em]">Total</span>
                <span className="text-2xl font-black text-primary italic">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <Button 
                onClick={handleCheckoutClick}
                className="w-full bg-primary hover:bg-primary/90 text-white font-black h-14 uppercase tracking-widest italic cta-button"
              >
                Finalizar Compra
              </Button>
            </SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}

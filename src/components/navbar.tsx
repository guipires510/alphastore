
"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartDrawer } from "./cart-drawer";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItemsCount = useCartStore((state) => state.items.length);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background border-r">
              <SheetHeader>
                <SheetTitle className="text-left">AlphaFlow</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">Home</Link>
                <Link href="/catalog" className="text-lg font-medium hover:text-primary transition-colors">Produtos</Link>
                <Link href="/account" className="text-lg font-medium hover:text-primary transition-colors">Minha Conta</Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tighter text-primary italic uppercase">AlphaFlow</span>
            <span className="text-xs font-medium tracking-[0.2em] uppercase hidden sm:inline-block">Underwear</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors">Home</Link>
          <Link href="/catalog" className="text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors">Produtos</Link>
          <Link href="/account" className="text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors">Minha Conta</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/account">
            <Button variant="ghost" size="icon" className="hover:text-primary">
              <User className="w-5 h-5" />
            </Button>
          </Link>
          
          <CartDrawer>
            <Button variant="ghost" size="icon" className="relative hover:text-primary">
              <ShoppingCart className="w-5 h-5" />
              {mounted && cartItemsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-primary">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </CartDrawer>
        </div>
      </div>
    </header>
  );
}


"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu, Phone, ShieldCheck } from "lucide-react";
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
import { AlphaLogo } from "./alpha-logo";

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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Produtos", href: "/catalog" },
    { name: "Contato", href: "/contact" },
    { name: "Minha Conta", href: "/account" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Trust Bar */}
      <div className="bg-primary text-primary-foreground py-1.5 px-4 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 italic">
          <ShieldCheck className="w-3 h-3" />
          Revendedor Autorizado: LUPO • CALVIN KLEIN • POLO WEAR
        </p>
      </div>
      
      <header
        className={`transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-foreground">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background border-r">
                <SheetHeader>
                  <SheetTitle className="text-left font-black italic uppercase tracking-tighter text-primary">AlphaFlow</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 mt-12">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      className="text-lg font-black uppercase italic tracking-widest hover:text-primary transition-colors text-foreground"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/">
              <AlphaLogo />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-xs font-black uppercase italic tracking-[0.2em] hover:text-primary transition-colors text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="hidden sm:inline-block">
              <Button variant="ghost" size="icon" className="hover:text-primary text-foreground">
                <Phone className="w-5 h-5" />
              </Button>
            </Link>
            
            <Link href="/account">
              <Button variant="ghost" size="icon" className="hover:text-primary text-foreground">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            
            <CartDrawer>
              <Button variant="ghost" size="icon" className="relative hover:text-primary text-foreground">
                <ShoppingCart className="w-5 h-5" />
                {mounted && cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-primary border-none text-white">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </CartDrawer>
          </div>
        </div>
      </header>
    </div>
  );
}

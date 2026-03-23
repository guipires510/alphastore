
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { MessageCircle } from "lucide-react";
import { FirebaseClientProvider } from '@/firebase/index';

export const metadata: Metadata = {
  title: 'AlphaFlow Underwear | Estilo e Conforto Masculino',
  description: 'A melhor loja de cuecas masculinas premium. Kits exclusivos com entrega rápida.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen">
        <FirebaseClientProvider>
          {children}
          <a
            href="https://wa.me/5511987654321"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 flex items-center justify-center"
            aria-label="Contato via WhatsApp"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
          </a>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}


import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { MessageCircle } from "lucide-react";
import { FirebaseClientProvider } from '@/firebase/index';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'AlphaFlow Underwear | Estilo e Conforto Masculino',
  description: 'A melhor loja de cuecas masculinas premium. Kits exclusivos com entrega rápida.',
  openGraph: {
    title: 'AlphaFlow Underwear | Estilo e Conforto Masculino',
    description: 'A melhor loja de cuecas masculinas premium. Kits exclusivos com entrega rápida.',
    url: 'https://alphaflow-underwear.vercel.app',
    siteName: 'AlphaFlow',
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlphaFlow Underwear | Estilo e Conforto Masculino',
    description: 'A melhor loja de cuecas masculinas premium.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`font-body antialiased bg-background text-foreground min-h-screen ${inter.variable} ${inter.className}`}>
        {/* INICIALIZAÇÃO PRIORITÁRIA DO UTMFY */}
        <Script id="utmfy-pixel-config" strategy="beforeInteractive">
          {`window.pixelId = "69c616aa6b3a11cb813def57";`}
        </Script>
        <Script 
          src="https://cdn.utmify.com.br/scripts/pixel/pixel.js" 
          strategy="beforeInteractive"
        />
        <Script 
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-xcod-sck=""
          data-utmify-prevent-subids=""
          strategy="beforeInteractive"
        />
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

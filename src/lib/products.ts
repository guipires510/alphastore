
import { PlaceHolderImages } from './placeholder-images';

export interface Product {
  id: string;
  shopifyId?: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: 'kit' | 'single';
  brand: 'Lupo' | 'Calvin Klein' | 'Polo Wear' | 'Alpha';
  quantity: number;
  material: string;
  features: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'lupo-10',
    name: 'Kit 10 Cuecas Boxer Lupo Performance',
    price: 59.90,
    originalPrice: 169.90,
    description: 'Kit com 10 cuecas boxer Lupo em algodão premium com elastano. Toque suave, ajuste anatômico perfeito e alta durabilidade para o dia a dia masculino. Design moderno que não enrola na perna e garante total liberdade de movimentos. Qualidade Lupo reconhecida com o melhor custo-benefício Alpha.',
    image: PlaceHolderImages.find(img => img.id === 'kit-lupo-10')?.imageUrl || 'https://picsum.photos/seed/lupo/600/600',
    category: 'kit',
    brand: 'Lupo',
    quantity: 10,
    material: 'Algodão/Elastano/Poliéster',
    features: ['Modelo 00523-952', 'Toque Suave', 'Alta Durabilidade']
  },
  {
    id: 'lupo-6-microfibra',
    name: 'Kit 6 Cuecas Boxer Lupo Microfibra Sem Costura',
    price: 230.00,
    description: 'Atenção: O kit será composto com 6 cuecas que serão enviadas de acordo com a sua escolha. Cueca boxer masculina Lupo. O kit é composto por cuecas masculinas para adultos, modelo boxer confeccionado em microfibra da marca Lupo. Cueca boxer para homens que gostam de estilo. Com formato anatômico, muito mais conforto, malha com elasticidade para ajuste perfeito. Para garantir leveza e suavidade a cada movimento, invista no bem-estar que a cueca sem costura proporciona no dia a dia, escolha certa para acompanhar homens modernos e sofisticados.',
    image: PlaceHolderImages.find(img => img.id === 'kit-lupo-6')?.imageUrl || 'https://picsum.photos/seed/lupo6/600/600',
    category: 'kit',
    brand: 'Lupo',
    quantity: 6,
    material: 'Microfibra Premium',
    features: ['Sem Costura', 'Formato Anatômico', 'Leveza e Suavidade']
  },
  {
    id: 'ck-premium',
    name: 'Kit 3 Cuecas Boxer Calvin Klein Cotton',
    price: 89.90,
    originalPrice: 249.90,
    description: 'Eleve seu conforto com o Kit 3 cuecas boxer Calvin Klein em algodão de alta qualidade. Design minimalista icônico com cós logotipado e ajuste preciso que valoriza o corpo. Sofisticação e maciez extrema para o uso diário ou momentos de performance. O toque de luxo essencial que todo homem Alpha merece ter.',
    image: PlaceHolderImages.find(img => img.id === 'kit-ck-premium')?.imageUrl || 'https://picsum.photos/seed/ck_alpha/600/600',
    category: 'kit',
    brand: 'Calvin Klein',
    quantity: 3,
    material: 'Algodão Premium',
    features: ['Cós Logotipado CK', 'Toque Macio', 'Luxo e Conforto']
  },
  {
    id: 'polo-wear-10',
    name: 'Kit 10 Cuecas Boxer Polo Wear Comfort',
    price: 49.90,
    originalPrice: 229.90,
    description: 'Kit exclusivo com 10 cuecas boxer Polo Wear em tecido confortável e resistente. Modelagem clássica com elastano que se adapta perfeitamente ao corpo do homem moderno. Ideal para quem busca praticidade sem abrir mão do estilo e da qualidade da marca Polo. Aproveite a oferta limitada com desconto especial no PIX.',
    image: PlaceHolderImages.find(img => img.id === 'kit-polo-wear')?.imageUrl || 'https://picsum.photos/seed/polo_alpha/600/600',
    category: 'kit',
    brand: 'Polo Wear',
    quantity: 10,
    material: 'Algodão/Elastano',
    features: ['Durabilidade Reforçada', 'Cores Variadas', 'Conforto Alpha']
  },
  {
    id: 'lupo-4',
    name: 'Kit 4 Cuecas Boxer Microfibra sem Costura Lupo',
    price: 199.00,
    description: 'Kit 4 Cuecas Boxer Microfibra sem Costura Lupo\nModelo: 00436-926\n\nDesenvolvida para oferecer máximo conforto, ajuste preciso e alta durabilidade, esta peça é produzida com a avançada tecnologia SEAMLESS, que elimina costuras, evitando atritos e proporcionando um encaixe anatômico perfeito ao corpo. O resultado é uma experiência de uso extremamente confortável, mesmo em longos períodos.\n\nO punho comfortable foi projetado para se adaptar naturalmente ao corpo, sem apertar ou marcar a pele, garantindo liberdade de movimento, toque suave e sensação constante de bem-estar. Ideal para quem busca conforto aliado à performance.\n\nConfeccionada em microfibra de alta qualidade, a peça oferece excelente resistência, flexibilidade e leveza. Seu tecido possui secagem rápida, auxiliando no controle da umidade e mantendo a pele sempre seca e fresca. Além disso, o toque macio e sedoso eleva o nível de conforto, tornando a peça perfeita para uso diário, prática esportiva ou uso prolongado.\n\nUma combinação completa de tecnologia, conforto e funcionalidade, pensada para quem valoriza qualidade em cada detalhe.\n\nCaracterísticas Principais:\n- Tecnologia Seamless (sem costura).\n- Punho confortável.\n- Microfibra de alta qualidade.\n- Secagem rápida.\n- Alta elasticidade.\n- Ajuste anatômico.\n- Conforto prolongado.\n\nFicha Técnica:\n- Material: Microfibra.\n- Tecnologia: Seamless.\n- Elasticidade: Alta.\n- Modelagem: Anatômica.\n- Uso indicado: Diário / Esportivo.\n- Costuras: Não.\n\nGarantia de fábrica: 30 dias',
    image: PlaceHolderImages.find(img => img.id === 'kit-lupo-4')?.imageUrl || 'https://picsum.photos/seed/lupo4/600/600',
    category: 'kit',
    brand: 'Lupo',
    quantity: 4,
    material: 'Microfibra',
    features: ['Tecnologia Seamless', 'Punho Confortável', 'Secagem Rápida', 'Modelo 00436-926']
  },
  {
    id: 'lupo-5-slip',
    name: 'Kit 5 Cuecas Slip Lupo Microfibra Seamless',
    price: 185.00,
    description: 'PRODUTO ORIGINAL!!! LOJA FÍSICA DESDE 1977\nCOMPRE COM CONFIANÇA! COM NOTA FISCAL\n\n5 CUECAS SLIP LUPO REF:691-002 MICROFIBRA\n\nDescrição:\n- Kit com 5 cuecas slip, confeccionadas em microfibra de toque extremamente suave e macio.\n- Desenvolvidas com a tecnologia sem costura, não marca sob a roupa e proporciona muito mais conforto.\n- Parte frontal com formato anatômico para ajuste perfeito.\n- Cintura com elástico reforçado, personalizado com o nome da marca.\n- Ideal para o dia a dia, com conforto e segurança, com tecido antimicrobial (Evita proliferação de bactérias).\n\nTamanhos:\nP: 38/40\nM: 42/44\nG: 46/48\nGG: 50/52\nXG: 54/56\n\nComposição: 93% Poliamida, 4% Elastano e 3% Poliester.\n\nGarantia de Autenticidade AlphaFlow.',
    image: PlaceHolderImages.find(img => img.id === 'kit-lupo-5-slip')?.imageUrl || 'https://picsum.photos/seed/luposlip5/600/600',
    category: 'kit',
    brand: 'Lupo',
    quantity: 5,
    material: 'Microfibra (Poliamida/Elastano)',
    features: ['Modelo REF:691-002', 'Tecnologia Antimicrobial', 'Sem Costura', 'Ajuste Anatômico']
  },
  {
    id: '4',
    name: 'Cueca Slip Algodão Clássica',
    price: 29.90,
    description: 'O corte clássico que nunca sai de moda. 100% algodão.',
    image: PlaceHolderImages.find(img => img.id === 'single-brief')?.imageUrl || 'https://picsum.photos/seed/4/600/600',
    category: 'single',
    brand: 'Alpha',
    quantity: 1,
    material: 'Algodão',
    features: ['100% Algodão', 'Suporte Firme', 'Design Clássico']
  },
  {
    id: '5',
    name: 'Cueca Boxer Modal Ultra Soft',
    price: 49.90,
    description: 'O ápice da tecnologia em tecidos. Toque frio e conforto inigualável.',
    image: PlaceHolderImages.find(img => img.id === 'modal-boxer')?.imageUrl || 'https://picsum.photos/seed/5/600/600',
    category: 'single',
    brand: 'Alpha',
    quantity: 1,
    material: 'Modal',
    features: ['Toque Frio', 'Sustentável', 'Alta Elasticidade']
  }
];

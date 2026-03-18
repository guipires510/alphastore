import { PlaceHolderImages } from './placeholder-images';

export interface Product {
  id: string;
  shopifyId?: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  images?: string[]; // Suporte para galeria
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
    description: 'Kit com 10 cuecas em algodão premium e elastano. Design anatômico com tecnologia Seamless para conforto absoluto. Durabilidade superior para o uso diário com ajuste perfeito ao corpo. A escolha ideal para quem busca qualidade Alpha.',
    image: 'https://http2.mlstatic.com/D_NQ_NP_2X_930502-MLB79243674706_092024-F-kit-com-10-cuecas-boxer-adulto-algodo-lupo.webp',
    images: [
      'https://http2.mlstatic.com/D_NQ_NP_2X_930502-MLB79243674706_092024-F-kit-com-10-cuecas-boxer-adulto-algodo-lupo.webp',
      'https://picsum.photos/seed/lupo_detail_1/800/800',
      'https://picsum.photos/seed/lupo_detail_2/800/800'
    ],
    category: 'kit',
    brand: 'Lupo',
    quantity: 10,
    material: 'Algodão/Elastano/Poliéster',
    features: ['Modelo 00523-952', 'Toque Suave', 'Alta Durabilidade']
  },
  {
    id: 'ck-premium',
    name: 'Kit 3 Cuecas Masculinas Boxer Cotton Calvin Klein',
    price: 89.90,
    originalPrice: 249.90,
    description: 'Kit 3 cuecas Calvin Klein em algodão de alta qualidade. Cós elástico icônico com logo CK e design minimalista. Conforto extremo com caimento perfeito para rotinas casuais ou treinos. Sofisticação e luxo para o seu dia a dia.',
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
    description: 'Kit exclusivo com 10 cuecas Polo Wear em algodão e elastano. Modelagem clássica Alpha que se adapta perfeitamente ao corpo masculino. Alta resistência e praticidade com o melhor custo-benefício. Garanta estilo e durabilidade.',
    image: 'https://i.imgur.com/qEpA80D.png',
    category: 'kit',
    brand: 'Polo Wear',
    quantity: 10,
    material: 'Algodão/Elastano',
    features: ['Durabilidade Reforçada', 'Cores Variadas', 'Conforto Alpha']
  },
  {
    id: 'lupo-6',
    name: 'Kit 6 Cuecas Boxer Lupo Microfibra',
    price: 49.90,
    originalPrice: 149.00,
    description: 'Kit 6 cuecas Lupo em microfibra com tecnologia sem costura. Conforto térmico e secagem ultra rápida para uso esportivo ou intenso. Ajuste anatômico total que não enrola na perna. Performance e qualidade garantidas.',
    image: PlaceHolderImages.find(img => img.id === 'kit-lupo-6')?.imageUrl || 'https://picsum.photos/seed/lupo_6_micro/800/800',
    category: 'kit',
    brand: 'Lupo',
    quantity: 6,
    material: 'Microfibra',
    features: ['Tecnologia Sem Costura', 'Secagem Rápida', 'Conforto Térmico']
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

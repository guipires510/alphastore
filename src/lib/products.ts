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
    description: 'Kit com 10 unidades em algodão premium e elastano. Design anatômico com tecnologia Seamless que garante conforto absoluto e durabilidade superior para o dia a dia.',
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
    description: 'Aposte no Kit 3 Cotton Calvin Klein para elevar seu conforto. Confeccionadas em algodão de alta qualidade, possuem cós elástico com logo icônico, design boxer com ajuste perfeito e o minimalismo clássico da grife nova-iorquina.',
    image: PlaceHolderImages.find(img => img.id === 'kit-ck-premium')?.imageUrl || 'https://picsum.photos/seed/ck_alpha/600/600',
    images: [
      PlaceHolderImages.find(img => img.id === 'kit-ck-premium')?.imageUrl || 'https://picsum.photos/seed/ck_alpha/600/600',
      'https://picsum.photos/seed/ck_detail_1/800/800'
    ],
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
    description: 'Kit exclusivo com 10 unidades em algodão e elastano. Modelagem clássica Alpha que se adapta perfeitamente ao corpo masculino, unindo resistência e praticidade com o melhor custo-benefício.',
    image: 'https://i.imgur.com/qEpA80D.png',
    images: [
      'https://i.imgur.com/qEpA80D.png',
      'https://i.imgur.com/5vcGwdE.png'
    ],
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
    description: 'Kit 6 unidades em microfibra com tecnologia sem costura. Conforto térmico e secagem rápida para uso intenso ou esportivo, com ajuste anatômico total que não enrola na perna.',
    image: PlaceHolderImages.find(img => img.id === 'kit-lupo-6')?.imageUrl || 'https://picsum.photos/seed/lupo_6_micro/800/800',
    images: [
      PlaceHolderImages.find(img => img.id === 'kit-lupo-6')?.imageUrl || 'https://picsum.photos/seed/lupo_6_micro/800/800',
      'https://picsum.photos/seed/lupo_micro_detail/800/800'
    ],
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
    description: 'O corte clássico que nunca sai de moda. 100% algodão premium para suporte firme e conforto tradicional no dia a dia.',
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
    description: 'O ápice da tecnologia em tecidos. Toque frio e conforto inigualável com fibra modal sustentável de alta elasticidade.',
    image: PlaceHolderImages.find(img => img.id === 'modal-boxer')?.imageUrl || 'https://picsum.photos/seed/5/600/600',
    category: 'single',
    brand: 'Alpha',
    quantity: 1,
    material: 'Modal',
    features: ['Toque Frio', 'Sustentável', 'Alta Elasticidade']
  }
];

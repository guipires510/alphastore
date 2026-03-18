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
  availableColors?: string[]; // Cores permitidas para este produto
}

export const PRODUCTS: Product[] = [
  {
    id: 'lupo-10',
    name: 'Kit Com 10 Cuecas Boxer Algodão Lupo',
    price: 59.90,
    originalPrice: 169.90,
    description: 'Kit com 10 unidades em algodão premium e elastano. Design anatômico com tecnologia Seamless que garante conforto absoluto e durabilidade superior para o dia a dia.',
    image: 'https://i.imgur.com/A2PO69a.png',
    images: [
      'https://i.imgur.com/A2PO69a.png',
      'https://i.imgur.com/JG3lDmj.png',
      'https://i.imgur.com/T2I3qTf.png',
      'https://i.imgur.com/6STz7KM.png',
      'https://i.imgur.com/nGdxJLl.png'
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
    description: 'Aposte no Kit 3 Cotton Calvin Klein para elevar seu conforto. Confeccionadas em algodão de alta qualidade, possuem cós elástico com logo icônico e minimalismo clássico.',
    image: 'https://i.imgur.com/2TET2bx.png',
    images: [
      'https://i.imgur.com/2TET2bx.png'
    ],
    category: 'kit',
    brand: 'Calvin Klein',
    quantity: 3,
    material: 'Algodão Premium',
    features: ['Cós Logotipado CK', 'Toque Macio', 'Luxo e Conforto'],
    availableColors: ['Pretas']
  },
  {
    id: 'polo-wear-10',
    name: 'Kit 10 Cuecas Boxer Polo Wear Comfort',
    price: 49.90,
    originalPrice: 229.90,
    description: 'Kit exclusivo com 10 unidades em algodão e elastano. Modelagem clássica Alpha que se adapta perfeitamente ao corpo masculino, unindo resistência e praticidade.',
    image: 'https://i.imgur.com/iSm6PZu.png',
    images: [
      'https://i.imgur.com/iSm6PZu.png',
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
    description: 'Aproveite o Kit com 6 unidades em microfibra com tecnologia sem costura. Conforto térmico e secagem rápida para uso intenso ou esportivo com ajuste total.',
    image: 'https://picsum.photos/seed/lupo_6_micro/800/800',
    images: [
      'https://picsum.photos/seed/lupo_6_micro/800/800',
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
    image: 'https://picsum.photos/seed/brief_alpha/800/800',
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
    image: 'https://picsum.photos/seed/modal_alpha/800/800',
    category: 'single',
    brand: 'Alpha',
    quantity: 1,
    material: 'Modal',
    features: ['Toque Frio', 'Sustentável', 'Alta Elasticidade']
  }
];
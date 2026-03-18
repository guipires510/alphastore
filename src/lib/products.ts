
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
    description: 'Kit com 10 cuecas em algodão premium e elastano. Design anatômico que garante conforto absoluto, durabilidade superior e ajuste perfeito para o dia a dia do homem moderno.',
    image: PlaceHolderImages.find(img => img.id === 'kit-lupo-10')?.imageUrl || 'https://picsum.photos/seed/lupo/600/600',
    category: 'kit',
    brand: 'Lupo',
    quantity: 10,
    material: 'Algodão/Elastano/Poliéster',
    features: ['Modelo 00523-952', 'Toque Suave', 'Alta Durabilidade']
  },
  {
    id: 'ck-premium',
    name: 'Kit 3 Cuecas Boxer Cotton Calvin Klein',
    price: 89.90,
    originalPrice: 249.90,
    description: 'Sofisticação em algodão de alta qualidade com o icônico cós logotipado CK. Design minimalista com ajuste impecável, ideal para elevar o nível de conforto e estilo em qualquer ocasião.',
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
    description: 'Kit exclusivo de 10 unidades com modelagem clássica Alpha. Tecido resistente com elastano que se adapta ao corpo, oferecendo o melhor custo-benefício e praticidade do mercado.',
    image: PlaceHolderImages.find(img => img.id === 'kit-polo-wear')?.imageUrl || 'https://picsum.photos/seed/polo_alpha/600/600',
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
    description: 'Kit promocional de microfibra com tecnologia sem costura. Oferece conforto térmico, secagem ultra rápida e ajuste anatômico total, sendo a escolha ideal para uso intenso e esportivo.',
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

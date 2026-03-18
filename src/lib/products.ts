
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
    description: 'Kit com 10 cuecas boxer Lupo em algodão premium com elastano. Toque suave, ajuste anatômico perfeito e alta durabilidade para o dia a dia masculino. Design moderno que não enrola na perna e garante total liberdade de movimentos.',
    image: PlaceHolderImages.find(img => img.id === 'kit-lupo-10')?.imageUrl || 'https://picsum.photos/seed/lupo/600/600',
    category: 'kit',
    brand: 'Lupo',
    quantity: 10,
    material: 'Algodão/Elastano/Poliéster',
    features: ['Modelo 00523-952', 'Toque Suave', 'Alta Durabilidade']
  },
  {
    id: 'ck-premium',
    name: 'Kit 3 Cuecas Boxer Calvin Klein Cotton',
    price: 89.90,
    originalPrice: 249.90,
    description: 'Confeccionadas em algodão de alta qualidade, as peças possuem cós em elástico com logo Calvin Klein, acabamento e costura no mesmo tom, design boxer com ótimo ajuste e caimento perfeito a todo tipo de corpo.',
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
    description: 'Kit exclusivo com 10 cuecas boxer Polo Wear em tecido confortável e resistente. Modelagem clássica com elastano que se adapta perfeitamente ao corpo do homem moderno. Ideal para quem busca praticidade e qualidade Alpha.',
    image: PlaceHolderImages.find(img => img.id === 'kit-polo-wear')?.imageUrl || 'https://picsum.photos/seed/polo_alpha/600/600',
    category: 'kit',
    brand: 'Polo Wear',
    quantity: 10,
    material: 'Algodão/Elastano',
    features: ['Durabilidade Reforçada', 'Cores Variadas', 'Conforto Alpha']
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

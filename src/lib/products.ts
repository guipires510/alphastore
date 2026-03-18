import { PlaceHolderImages } from './placeholder-images';

export interface Product {
  id: string;
  shopifyId?: string; // Campo para ID real do Shopify
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: 'kit' | 'single';
  quantity: number;
  material: string;
  features: string[];
}

// Estes produtos agora servem como Mock de dados que viriam do Shopify
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Kit 3 Cuecas Boxer Algodão Premium',
    price: 89.90,
    originalPrice: 119.90,
    description: 'Conforto absoluto para o dia a dia. Algodão de alta qualidade que respira.',
    image: PlaceHolderImages.find(img => img.id === 'kit-3-boxer')?.imageUrl || 'https://picsum.photos/seed/1/600/600',
    category: 'kit',
    quantity: 3,
    material: 'Algodão',
    features: ['Respirável', 'Cós Elástico Macio', 'Sem Costuras Laterais']
  },
  {
    id: '2',
    name: 'Kit 5 Cuecas Boxer Microfibra Confort',
    price: 129.90,
    originalPrice: 159.90,
    description: 'Ideal para praticantes de esportes. Secagem rápida e ajuste perfeito ao corpo.',
    image: PlaceHolderImages.find(img => img.id === 'kit-5-boxer')?.imageUrl || 'https://picsum.photos/seed/2/600/600',
    category: 'kit',
    quantity: 5,
    material: 'Microfibra',
    features: ['Secagem Rápida', 'Ajuste Anatômico', 'Antiodor']
  },
  {
    id: '3',
    name: 'Kit 10 Cuecas Boxer Performance - Oferta PIX',
    price: 49.90,
    originalPrice: 299.90,
    description: 'NOSSA MELHOR OFERTA. 10 CUECAS PREMIUM PARA RENOVAR SUA GAVETA DE VEZ. NOSSA MODELAGEM ALPHAFIT GARANTE QUE A CUECA NÃO ENROLE E MANTENHA O FRESCOR O DIA TODO.',
    image: PlaceHolderImages.find(img => img.id === 'kit-10-boxer')?.imageUrl || 'https://picsum.photos/seed/3/600/600',
    category: 'kit',
    quantity: 10,
    material: 'Mista',
    features: ['Durabilidade', 'Variedade de Cores', 'Toque Sedoso']
  },
  {
    id: '4',
    name: 'Cueca Slip Algodão Clássica',
    price: 29.90,
    description: 'O corte clássico que nunca sai de moda. 100% algodão.',
    image: PlaceHolderImages.find(img => img.id === 'single-brief')?.imageUrl || 'https://picsum.photos/seed/4/600/600',
    category: 'single',
    quantity: 1,
    material: 'Algodão',
    features: ['100% Algodão', 'Suporte Firme', 'Design Clássico']
  },
  {
    id: '5',
    name: 'Cueca Boxer Modal Ultra Soft',
    price: 49.90,
    originalPrice: 59.90,
    description: 'O ápice da tecnologia em tecidos. Toque frio e conforto inigualável.',
    image: PlaceHolderImages.find(img => img.id === 'modal-boxer')?.imageUrl || 'https://picsum.photos/seed/5/600/600',
    category: 'single',
    quantity: 1,
    material: 'Modal',
    features: ['Toque Frio', 'Sustentável', 'Alta Elasticidade']
  }
];

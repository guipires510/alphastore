
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
    description: 'Descubra o conforto e a qualidade das cuecas boxer da marca Lupo, especialmente desenvolvidas para o homem moderno. Composto por 77% algodão, 17% elastano e 6% poliéster, este modelo proporciona um toque suave à pele e uma elasticidade que acompanha cada movimento, garantindo liberdade e conforto ao longo do dia. O design boxer é ideal para quem busca toda a praticidade e proteção, com um corte que se ajusta perfeitamente ao corpo. Além disso, a facilidade de dobrar as cuecas torna o armazenamento simples e eficiente, ideal para a rotina do dia a dia. Cada peça foi pensada para oferecer durabilidade e resistência, permitindo que você desfrute de um produto que mantém sua forma e conforto mesmo após várias lavagens. Ideal para homens que valorizam estilo e funcionalidade, o modelo 00523-952 é perfeito para todas as ocasiões, seja no trabalho ou em momentos de lazer.',
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
    price: 39.90,
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
    description: 'O ícone do estilo masculino. Algodão premium com o elástico clássico Calvin Klein em um kit exclusivo de 3 unidades.',
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
    description: 'Qualidade Polo Wear em um kit de alto valor. Conforto garantido para todas as ocasiões.',
    image: PlaceHolderImages.find(img => img.id === 'kit-polo-wear')?.imageUrl || 'https://picsum.photos/seed/polo_alpha/600/600',
    category: 'kit',
    brand: 'Polo Wear',
    quantity: 10,
    material: 'Algodão/Elastano',
    features: ['Durabilidade Reforçada', 'Cores Variadas', 'Conforto Alpha']
  },
  {
    id: 'lupo-4',
    name: 'Kit 4 Cuecas Boxer Lupo Performance',
    price: 34.90,
    description: 'Kit essencial com 4 cuecas boxer Lupo. Conforto e durabilidade para o seu dia a dia com a qualidade reconhecida Lupo.',
    image: PlaceHolderImages.find(img => img.id === 'kit-lupo-4')?.imageUrl || 'https://picsum.photos/seed/lupo4/600/600',
    category: 'kit',
    brand: 'Lupo',
    quantity: 4,
    material: 'Algodão Premium',
    features: ['Ajuste Perfeito', 'Algodão Respirável', 'Cós Elástico']
  },
  {
    id: 'lupo-5-slip',
    name: 'Kit 5 Cuecas Slip Lupo Algodão',
    price: 39.90,
    description: 'Kit com 5 cuecas modelo Slip da Lupo. Desenvolvidas em algodão de alta qualidade para proporcionar o máximo de conforto e liberdade de movimento.',
    image: PlaceHolderImages.find(img => img.id === 'kit-lupo-5-slip')?.imageUrl || 'https://picsum.photos/seed/luposlip5/600/600',
    category: 'kit',
    brand: 'Lupo',
    quantity: 5,
    material: '100% Algodão',
    features: ['Modelo Slip Clássico', 'Toque Macio', 'Conforto Tradicional']
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

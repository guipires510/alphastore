
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
    description: 'IDEAL PARA ELEVAR O SEU NÍVEL DE CONFORTO!\n\nAposte no Kit 3 Cuecas Masculinas Cotton Calvin Klein e se surpreenda com todo o conforto e estilo que este modelo tem para oferecer. Elas são perfeitas para acompanhar o seu ritmo, seja ele mais casual ou na rotina de exercícios!\n\nConfeccionadas em algodão de alta qualidade, as peças possuem cós em elástico com logo Calvin Klein, acabamento e costura no mesmo tom, design boxer with ótimo ajuste e caimento perfeito a todo tipo de corpo! É o kit ideal para acertar na escolha da peça íntima. Não fique de fora e garanta já o seu!\n--------------------------------------------------------------------------\nSOBRE A MARCA:\nNova Iorque, 1968. Nasce pelas mãos do estilista Calvin Klein uma das maiores grifes que o mundo já conheceu. A marca escolheu o caminho do minimalismo e da sofisticação para caminhar pelo concorrido universo da moda, as roupas de linhas simples e sofisticadas colocaram a Calvin Klein entre as marcas de moda mais importantes e influentes do mercado, conquistando seguidores pelos quatro cantos do mundo.',
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
    name: 'Kit 4 Cuecas Boxer Microfibra sem Costura Lupo',
    price: 199.00,
    description: 'Kit 4 Cuecas Boxer Microfibra sem Costura Lupo\nModelo: 00436-926\n\nDesenvolvida para oferecer máximo conforto, ajuste preciso e alta durabilidade, esta peça é produzida com a avançada tecnologia SEAMLESS, que elimina costuras, evitando atritos e proporcionando um encaixe anatômico perfeito ao corpo. O resultado é uma experiência de uso extremamente confortável, mesmo em longos períodos.\n\nO punho comfortable foi projetado para se adaptar naturalmente ao corpo, sem apertar ou marcar a pele, garantindo liberdade de movimento, toque suave e sensação constante de bem-estar. Ideal para quem busca conforto aliado à performance.\n\nConfeccionada em microfibra de alta qualidade, a peça oferece excelente resistência, flexibilidade e leveza. Seu tecido possui secagem rápida, auxiliando no controle da umidade e mantendo a pele sempre seca e fresca. Além disso, o toque macio e sedoso eleva o nível de conforto, tornando a peça perfeita para uso diário, prática esportiva ou uso prolongado.\n\nUma combinação completa de tecnologia, conforto e funcionalidade, pensada para quem valoriza qualidade em cada detalhe.\n\nCaracterísticas Principais:\n- Tecnologia Seamless (sem costura).\n- Punho confortável.\n- Microfibra de alta qualidade.\n- Secagem rápida.\n- Alta elasticidade.\n- Ajuste anatômico.\n- Conforto prolongado.\n\nFicha Técnica:\n- Material: Microfibra.\n- Tecnologia: Seamless.\n- Elasticidade: Alta.\n- Modelagem: Anatômica.\n- Uso indicado: Diário / Esportivo.\n- Costuras: Não.\n\nO Kit 4 Cuecas Boxer Microfibra sem Costura Lupo pode ser encontrado aqui na AlphaFlow!\n\nGarantia de fábrica: 30 dias',
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
    price: 39.90,
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

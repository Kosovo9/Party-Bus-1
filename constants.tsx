
import { ServicePackage, Testimonial, FaqItem } from './types';

export interface ExtendedService extends ServicePackage {
  aiPrompt: string;
  negativePromptAddon?: string;
}

export const SERVICES: ExtendedService[] = [
  {
    id: 'renta-hora',
    title: 'Renta por Hora (Zapopan & GDL)',
    description: 'La opción flexible para moverte con estilo por la ciudad. Ideal para traslados VIP y fiestas espontáneas.',
    priceFrom: 'MX$4,500',
    duration: 'Mínimo 1 hora',
    features: ['Lunes a Jueves: $5,000/hr', 'Viernes a Domingo: $5,500/hr', 'Chofer Certificado', 'Hielera con Hielo'],
    image: 'https://images.unsplash.com/photo-1541339905195-062d55707a0a?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1514525253344-781f7a712627?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'renta',
    aiPrompt: 'Ultra realistic night photograph of a modern party bus driving through Guadalajara and Zapopan city streets, interior LEDs glowing purple and pink through the windows, group of friends laughing and holding drinks inside, reflections of city lights on the bus, safe and private transportation feeling, cinematic night lighting, wide angle exterior view, horizontal composition, 16:9 aspect ratio.'
  },
  {
    id: 'xv-anos',
    title: 'Limo PartyBus / XV Años',
    description: 'Mejor que una limusina convencional. ¡Sube a todos tus amigos y familiares en una sola unidad!',
    priceFrom: 'MX$5,000',
    duration: 'Desde 1 hora',
    features: ['Recolección en casa/iglesia', 'Sonido profesional', 'Pantalla Smart TV', 'Staff de apoyo'],
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'evento',
    aiPrompt: 'Ultra realistic photograph of a quinceañera in a modern pastel dress stepping into a luxury party bus in Guadalajara at sunset, friends and family smiling around her, bus door open with neon purple and pink lights, elegant yet fun atmosphere, horizontal wide shot, 16:9 aspect ratio.',
    negativePromptAddon: 'no iglesia específica reconocible, no marcas visibles en vestidos o trajes, no símbolos religiosos muy explícitos'
  },
  {
    id: 'tequila-tour',
    title: 'Tour a Tequila Experience',
    description: '10 horas de fiesta, campos de agave y los mejores cantaritos de la región.',
    priceFrom: 'Cotización por Grupo',
    duration: '10 Horas',
    features: ['Barra libre de Tequila Cristalino', 'Cerveza de bienvenida', 'Visita a 2 tequileras', 'Barman animador'],
    image: 'https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516746826332-dfc00a1b5022?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'especial',
    aiPrompt: 'Ultra realistic photograph of a luxury party bus parked next to blue agave fields in Tequila, Jalisco, group of friends stepping out of the bus with drinks and hats, traditional tequila town and distillery buildings in the background, bright blue sky, horizontal wide landscape shot, 16:9 aspect ratio.',
    negativePromptAddon: 'no etiquetas de marcas de tequila, cerveza o refresco'
  },
  {
    id: 'bachelorette',
    title: 'Despedida de Soltera VIP',
    description: 'Ambiente privado, seguro y personalizado para la última noche de soltera del crew.',
    priceFrom: 'MX$10,000',
    duration: 'Paquete completo',
    features: ['Decoración temática', 'Juegos y dinámicas', 'Bebidas personalizadas', 'Show opcional'],
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1496024840928-4c41702d1c3a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'evento',
    aiPrompt: 'Ultra realistic interior photograph of a bachelorette party inside a luxury party bus in Guadalajara, group of young women in stylish night-out dresses, bride wearing a white veil or sash, all holding drinks and laughing, neon pink and purple lighting, horizontal medium wide shot, 16:9 aspect ratio.'
  },
  {
    id: 'cumple-peques',
    title: 'Cumpleaños Peques (-18)',
    description: 'Diversión sana con ambiente de antro seguro para los más jóvenes de la casa.',
    priceFrom: 'MX$4,500',
    duration: '2 Horas',
    features: ['Bebidas sin alcohol', 'Botana incluida', 'Playlist personalizada', 'Supervisión total'],
    image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1481162853355-2f032212bebb?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'evento',
    aiPrompt: 'Ultra realistic photograph of a kids birthday party inside a party bus during the day, children aged 8–13 wearing colorful party hats, balloons and ribbons decorating the interior, soft colorful LED lights, bright and safe family atmosphere, natural daylight, horizontal medium wide shot, 16:9 aspect ratio.',
    negativePromptAddon: 'no maquillaje de adulto, no ropa inapropiada, no consumo de alcohol por menores, no poses sugerentes'
  },
  {
    id: 'cumple-adultos',
    title: 'Cumpleaños Adultos',
    description: 'Celebra tu cumpleaños con el mejor ambiente VIP y barra libre opcional.',
    priceFrom: 'MX$8,500',
    duration: 'Desde 3 horas',
    features: ['Cumpleañero VIP', 'Personalización total', 'Hielo y Mezcladores', 'Staff de animación'],
    image: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1496333039240-42118e448b29?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'evento',
    aiPrompt: 'Ultra realistic interior photograph of a birthday party inside a luxury party bus, mixed group of men and women aged 25–35, birthday cake with candles on a small table, metallic balloons, people toasting with transparent cups, neon purple, blue and pink club lights, horizontal medium wide shot, 16:9 aspect ratio.'
  },
  {
    id: 'lucha-libre',
    title: 'Martes de Lucha Libre',
    description: 'Shots, Arena Coliseo y After Party en el Centro Histórico de GDL.',
    priceFrom: 'MX$699/persona',
    duration: '4-5 Horas',
    features: ['Entrada a Luchas incluida', 'Recorrido animado', '2 Cervezas + Shots', 'Ingreso a After Party'],
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'especial',
    aiPrompt: 'Ultra realistic interior photograph of a group of friends inside a party bus on the way to a lucha libre show in Guadalajara, one person wearing a colorful lucha libre mask, everyone holding beer cans and laughing, neon lights inside the bus, horizontal medium wide shot, 16:9 aspect ratio.',
    negativePromptAddon: 'no nombres de arenas reales, no logos de marcas de cerveza'
  },
  {
    id: 'bodas',
    title: 'PartyBus para Bodas',
    description: 'Traslado seguro y divertido para tus invitados entre la ceremonia y la recepción.',
    priceFrom: 'MX$5,000',
    duration: 'Por evento',
    features: ['Traslado de invitados', 'Entretenimiento a bordo', 'Hielera equipada', 'Música ambiental'],
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'evento',
    aiPrompt: 'Ultra realistic photograph of a just-married couple boarding a luxury party bus, bride in white wedding dress holding bouquet, groom in elegant suit, wedding guests visible inside the bus with soft warm lights and subtle neon accents, horizontal wide shot, 16:9 aspect ratio.',
    negativePromptAddon: 'no iglesia específica reconocible, no marcas visibles'
  },
  {
    id: 'cantina-tour',
    title: 'Tour de Cantinas',
    description: 'Excursión cantinera para fiesteros de verdad por los barrios icónicos.',
    priceFrom: 'MX$8,000',
    duration: '5 Horas',
    features: ['Ruta de cantinas icónicas', 'Seguridad privada', 'Música & Animación', 'Descorche incluido'],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1525268323446-0505b6fe5bb8?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'especial',
    aiPrompt: 'Ultra realistic night photograph of a party bus parked on a historic street in downtown Guadalajara, traditional Mexican cantina signs glowing with warm light, group of adults getting on and off the bus, horizontal wide shot, 16:9 aspect ratio.',
    negativePromptAddon: 'no logos de bares o cantinas reales'
  },
  {
    id: 'extras-upsell',
    title: 'Extras & Add-ons',
    description: 'Sube de nivel tu fiesta con servicios adicionales premium.',
    priceFrom: 'Variables',
    duration: 'N/A',
    features: ['Barman / Animador', 'Decoración especial', 'Bebidas premium', 'Juegos y dinámicas'],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1516714819001-8ee7a13b71d7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'especial',
    aiPrompt: 'Ultra realistic close-up photograph of a premium party bus bar counter, bartender hands preparing a colorful cocktail, rows of tequila shots, neon party accessories like glowing glasses, hats and necklaces, horizontal close-up shot, 16:9 aspect ratio.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Valeria R.", event: "XV Años", text: "¡Increíble! Mis amigas y yo nos divertimos muchísimo. El camión está mejor que cualquier antro.", rating: 5 },
  { id: 2, name: "Diego S.", event: "Tour Tequila", text: "La mejor forma de ir a Tequila. La barra libre de cristalino vale cada centavo. ¡Súper recomendado!", rating: 5 },
  { id: 3, name: "Mariana G.", event: "Despedida", text: "Súper seguro y el staff muy atento. Nos olvidamos de manejar y solo nos dedicamos a disfrutar.", rating: 5 }
];

export const FAQS: FaqItem[] = [
  { question: "¿Cuál es el mínimo de personas?", answer: "No tenemos un mínimo, pero el PartyBus está diseñado para grupos de hasta 35-40 personas dependiendo de la unidad." },
  { question: "¿Podemos llevar nuestro propio alcohol?", answer: "Sí, contamos con descorche sin costo en la mayoría de nuestros paquetes privados. Nosotros ponemos el hielo y los vasos." },
  { question: "¿Qué zonas cubren?", answer: "Nuestra base es Guadalajara y Zapopan. Servicios a Tlajomulco, Tonalá o El Salto tienen un cargo extra por traslado." },
  { question: "¿Cómo se reserva?", answer: "Con un anticipo del 30% vía transferencia o depósito para asegurar tu fecha. El resto se liquida al abordar." }
];

export const WHATSAPP_NUMBER = "+523311620543";

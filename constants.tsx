
import { ServicePackage, Testimonial, FaqItem } from './types';

export interface ExtendedService extends ServicePackage {
  aiPrompt: string;
  negativePromptAddon?: string;
  translations: {
    en: {
      title: string;
      description: string;
      features: string[];
    };
    es: {
      title: string;
      description: string;
      features: string[];
    };
  };
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
    aiPrompt: 'Ultra realistic night photograph of a modern party bus driving through Guadalajara and Zapopan city streets, interior LEDs glowing purple and pink through the windows, group of friends laughing and holding drinks inside, reflections of city lights on the bus, safe and private transportation feeling, cinematic night lighting, wide angle exterior view, horizontal composition, 16:9 aspect ratio.',
    translations: {
      es: {
        title: 'Renta por Hora (Zapopan & GDL)',
        description: 'La opción flexible para moverte con estilo por la ciudad. Ideal para traslados VIP y fiestas espontáneas.',
        features: ['Lunes a Jueves: $5,000/hr', 'Viernes a Domingo: $5,500/hr', 'Chofer Certificado', 'Hielera con Hielo']
      },
      en: {
        title: 'Hourly Rental (Zapopan & GDL)',
        description: 'The flexible option to move around the city in style. Ideal for VIP transfers and spontaneous parties.',
        features: ['Mon to Thu: $5,000/hr', 'Fri to Sun: $5,500/hr', 'Certified Driver', 'Ice Chest included']
      }
    }
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
    negativePromptAddon: 'no iglesia específica reconocible, no marcas visibles en vestidos o trajes, no símbolos religiosos muy explícitos',
    translations: {
      es: {
        title: 'Limo PartyBus / XV Años',
        description: 'Mejor que una limusina convencional. ¡Sube a todos tus amigos y familiares en una sola unidad!',
        features: ['Recolección en casa/iglesia', 'Sonido profesional', 'Pantalla Smart TV', 'Staff de apoyo']
      },
      en: {
        title: 'Limo PartyBus / Quinceañera',
        description: 'Better than a conventional limo. Bring all your friends and family in one single luxury unit!',
        features: ['Home/Church pickup', 'Professional sound system', 'Smart TV Screen', 'Support Staff']
      }
    }
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
    negativePromptAddon: 'no etiquetas de marcas de tequila, cerveza o refresco',
    translations: {
      es: {
        title: 'Tour a Tequila Experience',
        description: '10 horas de fiesta, campos de agave y los mejores cantaritos de la región.',
        features: ['Barra libre de Tequila Cristalino', 'Cerveza de bienvenida', 'Visita a 2 tequileras', 'Barman animador']
      },
      en: {
        title: 'Tequila Experience Tour',
        description: '10 hours of non-stop party, agave fields, and the region\'s best cantaritos.',
        features: ['Open bar: Cristalino Tequila', 'Welcome beers', '2 Distillery visits', 'MC Bartender']
      }
    }
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
    aiPrompt: 'Ultra realistic interior photograph of a bachelorette party inside a luxury party bus in Guadalajara, group of young women in stylish night-out dresses, bride wearing a white veil or sash, all holding drinks and laughing, neon pink and purple lighting, horizontal medium wide shot, 16:9 aspect ratio.',
    translations: {
      es: {
        title: 'Despedida de Soltera VIP',
        description: 'Ambiente privado, seguro y personalizado para la última noche de soltera del crew.',
        features: ['Decoración temática', 'Juegos y dinámicas', 'Bebidas personalizadas', 'Show opcional']
      },
      en: {
        title: 'VIP Bachelorette Party',
        description: 'Private, safe, and personalized environment for the crew\'s last night out.',
        features: ['Themed decoration', 'Party games', 'Custom drinks', 'Optional show']
      }
    }
  }
];

export const TESTIMONIALS_BILINGUAL = {
  es: [
    { id: 1, name: "Valeria R.", event: "XV Años", text: "¡Increíble! Mis amigas y yo nos divertimos muchísimo. El camión está mejor que cualquier antro.", rating: 5 },
    { id: 2, name: "Diego S.", event: "Tour Tequila", text: "La mejor forma de ir a Tequila. La barra libre de cristalino vale cada centavo. ¡Súper recomendado!", rating: 5 }
  ],
  en: [
    { id: 1, name: "Valeria R.", event: "Quinceañera", text: "Amazing! My friends and I had so much fun. The bus is better than any club in the city.", rating: 5 },
    { id: 2, name: "Diego S.", event: "Tequila Tour", text: "The best way to visit Tequila. The open bar is worth every penny. Highly recommended!", rating: 5 }
  ]
};

export const FAQS_BILINGUAL = {
  es: [
    { question: "¿Cuál es el mínimo de personas?", answer: "No tenemos un mínimo, pero el PartyBus está diseñado para grupos de hasta 35-40 personas." },
    { question: "¿Podemos llevar nuestro propio alcohol?", answer: "Sí, contamos con descorche sin costo en la mayoría de nuestros paquetes." }
  ],
  en: [
    { question: "What is the minimum group size?", answer: "We don't have a minimum, but our PartyBuses are designed for groups of up to 35-40 people." },
    { question: "Can we bring our own alcohol?", answer: "Yes, we offer free corkage on most of our private party packages." }
  ]
};

export const WHATSAPP_NUMBER = "+523311620543";
export const PHONE_NUMBER = "+523311620543";

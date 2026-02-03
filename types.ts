
export interface ServicePackage {
  id: string;
  title: string;
  description: string;
  priceFrom: string;
  duration?: string;
  features: string[];
  image: string; // Featured image
  gallery?: string[]; // Additional gallery images
  category: 'renta' | 'especial' | 'evento';
}

export interface Testimonial {
  id: number;
  name: string;
  event: string;
  text: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}


import React, { useState, useEffect, useRef } from 'react';
import { SERVICES, TESTIMONIALS, FAQS, WHATSAPP_NUMBER, ExtendedService } from './constants';
import AIAgents from './components/AIAgents';
import { generateServiceVisual } from './services/geminiService';

const ServiceCard: React.FC<{
  service: ExtendedService;
  visualizingId: string | null;
  previews: Record<string, string>;
  onVisualize: (service: ExtendedService) => void;
}> = ({ service, visualizingId, previews, onVisualize }) => {
  const images = [previews[service.id] || service.image, ...(service.gallery || [])];
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="group bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 hover:border-purple-500/50 transition-all duration-500 shadow-xl flex flex-col">
      <div className="relative h-64 overflow-hidden bg-slate-900 group/carousel">
        <img 
          src={images[currentIdx]} 
          className={`w-full h-full object-cover transition-opacity duration-500 ${visualizingId === service.id ? 'opacity-30 blur-sm' : 'opacity-100'}`} 
          alt={service.title} 
        />
        
        {visualizingId === service.id && (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-black uppercase tracking-tighter text-purple-400 animate-pulse">Generando Realidad VIP...</p>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && !visualizingId && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-purple-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/40 rounded-full text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-purple-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIdx ? 'bg-purple-500 w-3' : 'bg-white/40'}`} 
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-4 left-4 bg-purple-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">{service.category}</div>
        
        <button 
          onClick={() => onVisualize(service)}
          className="absolute bottom-4 right-4 bg-black/60 hover:bg-purple-600 text-white p-3 rounded-full backdrop-blur-md border border-white/20 transition-all transform hover:scale-110 active:scale-95 group/btn"
          title="Generar visualización de este paquete con IA"
        >
          <svg className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.547 2.188a2 2 0 001.312 2.413 2 2 0 002.387-.477l.547-.547a2 2 0 00.547-1.022l.547-2.387a2 2 0 00-.547-1.96zM4.5 4.5l3.5 3.5m0 0L4.5 11.5m3.5-3.5h10M11 21a9 9 0 110-18 9 9 0 010 18z"/></svg>
        </button>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className="text-2xl font-bold leading-tight">{service.title}</h3>
        </div>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">{service.description}</p>
        <div className="space-y-2 mb-8">
          {service.features.map((f, i) => (
            <div key={i} className="flex items-center text-xs text-slate-300">
              <svg className="w-3 h-3 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              {f}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-black block tracking-widest">Desde</span>
            <span className="text-xl font-black text-white">{service.priceFrom}</span>
          </div>
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola! Me interesa cotizar el paquete de ${service.title}`}
            className="px-5 py-3 bg-purple-600 rounded-2xl font-bold text-xs hover:bg-white hover:text-purple-600 transition-all shadow-lg uppercase tracking-wider"
          >
            COTIZAR
          </a>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visualizingId, setVisualizingId] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVisualize = async (service: ExtendedService) => {
    const aistudio = (window as any).aistudio;
    const hasKey = await aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await aistudio.openSelectKey();
    }

    setVisualizingId(service.id);
    const result = await generateServiceVisual(service.aiPrompt, service.negativePromptAddon);
    
    if (result === "KEY_ERROR") {
      await aistudio.openSelectKey();
    } else if (result) {
      setPreviews(prev => ({ ...prev, [service.id]: result }));
    } else {
      alert("Hubo un problema generando tu vista previa de lujo. Intenta de nuevo.");
    }
    setVisualizingId(null);
  };

  return (
    <div className="min-h-screen text-white bg-slate-950">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center font-black text-xl italic shadow-lg">P</div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">PartyBus<span className="text-purple-500">GDL</span></span>
          </div>
          <div className="hidden md:flex space-x-8 font-semibold text-sm uppercase tracking-widest">
            <a href="#paquetes" className="hover:text-purple-400 transition">Paquetes</a>
            <a href="#ai-planner" className="hover:text-purple-400 transition text-pink-400">AI Planner</a>
            <a href="#incluye" className="hover:text-purple-400 transition">El Bus</a>
            <a href="#faq" className="hover:text-purple-400 transition">Preguntas</a>
          </div>
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-purple-500 hover:text-white transition-all shadow-lg"
          >
            RESERVAR
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339905195-062d55707a0a?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-40 scale-105 animate-pulse"
            alt="Party Bus Night"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-400 font-bold text-sm mb-6 border border-purple-500/30 backdrop-blur-sm uppercase tracking-widest">
              The #1 VIP Experience in Guadalajara
            </span>
            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-tight tracking-tighter">
              TU NOCHE <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 neon-glow-purple">VIP</span> SOBRE RUEDAS
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed font-light">
              Tours a Tequila, XV Años, Bodas y Despedidas. La fiesta privada más exclusiva de Zapopan y Guadalajara.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-black text-lg shadow-2xl hover:scale-105 transition-all text-center"
              >
                RESERVAR POR WHATSAPP
              </a>
              <a 
                href="#paquetes"
                className="px-10 py-5 bg-slate-800/80 rounded-full font-black text-lg border border-slate-700 hover:bg-slate-700 transition-all text-center backdrop-blur-md"
              >
                VER PAQUETES
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Services Grid with AI Visualizer and Carousel */}
      <section id="paquetes" className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 uppercase">EXPERIENCIAS <span className="text-purple-500">EXCLUSIVAS</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">Personaliza tu evento con nuestra IA y visualiza cada ángulo de tu noche.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                visualizingId={visualizingId} 
                previews={previews} 
                onVisualize={handleVisualize} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Community Gallery Integration */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">COMUNIDAD <span className="text-pink-500">#PARTYBUSGDL</span></h2>
            <p className="text-slate-400">Lo que pasa en el PartyBus... se queda en nuestras mejores memorias.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden group relative">
                <img 
                  src={`https://picsum.photos/seed/party${i}/600/600`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt="Party memory"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-bold uppercase text-white/80">User Moment VIP</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive AI Features */}
      <AIAgents />

      {/* Features Showcase */}
      <section id="incluye" className="py-24 overflow-hidden bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative order-2 md:order-1">
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-purple-600/20 blur-[120px]" />
              <img 
                src="https://images.unsplash.com/photo-1541339905195-062d55707a0a?auto=format&fit=crop&q=80&w=1200" 
                className="relative z-10 rounded-3xl border border-slate-800 shadow-2xl neon-border rotate-1 hover:rotate-0 transition-transform duration-500"
                alt="Inside Bus"
              />
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter">EQUIPADO PARA LA <br/><span className="text-pink-500">MEJOR FIESTA</span></h2>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                {[
                  "Sonido de Competencia", "Iluminación Inteligente", "Asientos Piel Luxury", 
                  "Pantalla 4K 55\"", "Wi-Fi 6 Starlink", "Aire Acondicionado", 
                  "Efectos de Láser", "Staff de Seguridad", "Barra Equipada", "Decoración VIP"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3 text-slate-300 font-semibold list-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </div>
              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 backdrop-blur-sm">
                <p className="text-xs font-black text-purple-300 mb-2 uppercase tracking-[0.2em]">Upgrade Tu Noche</p>
                <p className="text-slate-400 italic text-sm leading-relaxed">"Pregunta por nuestro servicio de Barman Animador, Shots de Bienvenida y Open Bar Premium."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900/20">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-5xl font-black mb-16 uppercase tracking-tighter">VOCES DE <span className="text-purple-500">NUESTRAS FIESTAS</span></h2>
           <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="p-10 rounded-3xl bg-slate-950 border border-slate-800 text-left hover:border-purple-500/30 transition shadow-2xl">
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-slate-300 italic mb-8 leading-relaxed text-lg">"{t.text}"</p>
                <div className="flex items-center space-x-4">
                   <div className="w-12 h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center font-bold text-purple-400 border border-slate-700">{t.name[0]}</div>
                   <div>
                    <p className="font-bold text-sm">{t.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{t.event}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-black text-center mb-16 uppercase">RESOLVEMOS <span className="text-pink-500">TUS DUDAS</span></h2>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="group bg-slate-900/50 rounded-2xl border border-slate-800 open:border-pink-500/40 transition-all duration-300">
                <summary className="p-6 cursor-pointer font-bold flex justify-between items-center text-lg list-none group-open:text-pink-400 transition-colors">
                  {faq.question}
                  <span className="transform group-open:rotate-180 transition-transform duration-300 text-slate-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                  </span>
                </summary>
                <div className="p-6 pt-0 text-slate-400 border-t border-slate-800/50 leading-relaxed text-sm">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-900 bg-slate-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-12 md:mb-0">
             <div className="flex items-center space-x-2 mb-6 justify-center md:justify-start">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center font-black text-xl italic shadow-xl">P</div>
              <span className="text-2xl font-black uppercase italic tracking-tighter">PartyBus<span className="text-purple-500">GDL</span></span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              La experiencia fiestera #1 de Guadalajara. Zapopan, Tlajomulco y Tequila. 
              Transporte privado, seguro y con el mejor ambiente.
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-20">
            <div>
              <h4 className="font-black text-xs uppercase mb-4 tracking-widest text-slate-300">Reserva</h4>
              <p className="text-slate-500 text-sm mb-2 font-medium">WA: {WHATSAPP_NUMBER}</p>
              <p className="text-slate-500 text-sm font-medium">hola@partybusgdl.com</p>
            </div>
             <div>
              <h4 className="font-black text-xs uppercase mb-4 tracking-widest text-slate-300">Síguenos</h4>
              <a href="https://instagram.com/partybusgdl" className="text-slate-500 text-sm hover:text-pink-500 transition block mb-2 font-medium">@partybusgdl</a>
              <a href="#" className="text-slate-500 text-sm hover:text-purple-500 transition block font-medium">Facebook</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-16 pt-8 border-t border-slate-900 text-center">
            <p className="text-slate-600 text-[10px] uppercase font-black tracking-[0.3em]">© {new Date().getFullYear()} PartyBus Guadalajara — Zapopan, México.</p>
        </div>
      </footer>

      {/* Floating WhatsApp for Desktop */}
      <div className="fixed bottom-8 right-8 z-[100] hidden md:block group">
        <div className="absolute right-full mr-4 bottom-2 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-2xl pointer-events-none">
          ¡Platícanos tu plan! 🥂
        </div>
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:bg-green-500 hover:scale-110 active:scale-95 transition-all"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 w-full p-4 z-[100] md:hidden bg-slate-950/90 backdrop-blur-md border-t border-slate-800">
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 w-full py-4 bg-green-600 rounded-2xl font-black shadow-2xl active:scale-95 transition-transform"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="uppercase tracking-widest text-sm">Reserva por WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default App;

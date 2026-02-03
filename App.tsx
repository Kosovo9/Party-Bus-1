
import React, { useState, useEffect, useRef } from 'react';
import { SERVICES, TESTIMONIALS_BILINGUAL, FAQS_BILINGUAL, WHATSAPP_NUMBER, PHONE_NUMBER, ExtendedService } from './constants.tsx';
import AIAgents from './components/AIAgents.tsx';
import { generateServiceVisual, validateCommunityPhoto } from './services/geminiService.ts';

type Language = 'es' | 'en';

const ServiceCard: React.FC<{
  service: ExtendedService;
  visualizingId: string | null;
  previews: Record<string, string>;
  lang: Language;
  onVisualize: (service: ExtendedService) => void;
  onOpenLightbox: (images: string[], index: number) => void;
}> = ({ service, visualizingId, previews, lang, onVisualize, onOpenLightbox }) => {
  const content = service.translations[lang];
  const images = [previews[service.id] || service.image, ...(service.gallery || [])];
  const [currentIdx, setCurrentIdx] = useState(0);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = lang === 'es' 
      ? `¡Mira esta experiencia VIP en PartyBus GDL! 🚌✨\n\n🔥 *${content.title}*\n💰 Desde: ${service.priceFrom}\n\nMás info: ${window.location.href}`
      : `Check out this VIP experience at PartyBus GDL! 🚌✨\n\n🔥 *${content.title}*\n💰 From: ${service.priceFrom}\n\nMore info: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="group bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 hover:border-purple-500/50 transition-all duration-500 shadow-xl flex flex-col">
      <div 
        className="relative h-64 overflow-hidden bg-slate-900 group/carousel cursor-pointer"
        onClick={() => onOpenLightbox(images, currentIdx)}
      >
        <img 
          src={images[currentIdx]} 
          className={`w-full h-full object-cover transition-opacity duration-500 ${visualizingId === service.id ? 'opacity-30 blur-sm' : 'opacity-100'}`} 
          alt={content.title} 
        />
        
        {visualizingId === service.id && (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/40">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] font-black uppercase tracking-tighter text-purple-400 animate-pulse">
              {lang === 'es' ? 'Generando Realidad VIP...' : 'Generating VIP Reality...'}
            </p>
          </div>
        )}

        <div className="absolute top-4 left-4 bg-purple-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-10">
          {service.category}
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onVisualize(service); }}
          className="absolute bottom-4 right-4 bg-black/60 hover:bg-purple-600 text-white p-3 rounded-full backdrop-blur-md border border-white/20 transition-all transform hover:scale-110 active:scale-95 group/btn z-10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.547 2.188a2 2 0 001.312 2.413 2 2 0 002.387-.477l.547-.547a2 2 0 00.547-1.022l.547-2.387a2 2 0 00-.547-1.96zM4.5 4.5l3.5 3.5m0 0L4.5 11.5m3.5-3.5h10M11 21a9 9 0 110-18 9 9 0 010 18z"/></svg>
        </button>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold leading-tight mb-3">{content.title}</h3>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">{content.description}</p>
        
        <div className="space-y-2 mb-8">
          {content.features.map((f, i) => (
            <div key={i} className="flex items-center text-xs text-slate-300">
              <svg className="w-3 h-3 mr-2 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              {f}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto space-x-2">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-black block tracking-widest">{lang === 'es' ? 'Desde' : 'From'}</span>
            <span className="text-xl font-black text-white">{service.priceFrom}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleShare} className="p-3 bg-slate-800 rounded-2xl text-slate-400 hover:text-white border border-slate-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
            </button>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola! Quiero cotizar ${content.title}`}
              className="px-5 py-3 bg-purple-600 rounded-2xl font-bold text-xs hover:bg-white hover:text-purple-600 transition-all uppercase tracking-wider"
            >
              {lang === 'es' ? 'COTIZAR' : 'BOOK NOW'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('es');
  const [isScrolled, setIsScrolled] = useState(false);
  const [visualizingId, setVisualizingId] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [lightbox, setLightbox] = useState<{ images: string[], index: number } | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVisualize = async (service: ExtendedService) => {
    const aistudio = (window as any).aistudio;
    if (!aistudio) return;
    const hasKey = await aistudio.hasSelectedApiKey();
    if (!hasKey) await aistudio.openSelectKey();
    setVisualizingId(service.id);
    const result = await generateServiceVisual(service.aiPrompt, service.negativePromptAddon);
    if (result === "KEY_ERROR") await aistudio.openSelectKey();
    else if (result) setPreviews(prev => ({ ...prev, [service.id]: result }));
    setVisualizingId(null);
  };

  return (
    <div className="min-h-screen text-white bg-slate-950 font-sans selection:bg-purple-500/30">
      {lightbox && (
        <div className="fixed inset-0 z-[1000] bg-black/95 flex flex-col items-center justify-center p-4">
          <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 p-4 text-white hover:text-purple-500"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
          <img src={lightbox.images[lightbox.index]} className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center font-black text-xl italic shadow-lg">P</div>
            <span className="text-xl font-black tracking-tighter uppercase italic hidden sm:block">PartyBus<span className="text-purple-500">GDL</span></span>
          </div>
          
          <div className="flex items-center space-x-6 lg:space-x-10">
            {/* Language Toggle */}
            <div className="flex bg-slate-900/50 p-1 rounded-full border border-slate-700 backdrop-blur-sm">
              <button 
                onClick={() => setLang('es')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all ${lang === 'es' ? 'bg-purple-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                ESP
              </button>
              <button 
                onClick={() => setLang('en')}
                className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest transition-all ${lang === 'en' ? 'bg-purple-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                ENG
              </button>
            </div>

            <div className="hidden lg:flex space-x-8 font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400">
              <a href="#paquetes" className="hover:text-white transition-colors">{lang === 'es' ? 'Paquetes' : 'Packages'}</a>
              <a href="#ai-planner" className="hover:text-white transition-colors">AI Planner</a>
              <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            </div>

            <div className="flex items-center space-x-3">
              <a href={`tel:${PHONE_NUMBER}`} className="hidden md:flex p-3 bg-slate-800 rounded-full text-white border border-slate-700 hover:bg-slate-700 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </a>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="px-6 py-3 bg-white text-black rounded-full font-black text-[10px] hover:bg-purple-600 hover:text-white transition-all shadow-xl uppercase tracking-widest"
              >
                {lang === 'es' ? 'RESERVAR' : 'RESERVE'}
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1541339905195-062d55707a0a?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
            {lang === 'es' ? (
              <>LA FIESTA <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 neon-glow-purple">QUE NUNCA</span><br/>SE DETIENE</>
            ) : (
              <>THE PARTY <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 neon-glow-purple">THAT NEVER</span><br/>STOPS</>
            )}
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 mb-12 max-w-2xl font-light">
            {lang === 'es' 
              ? 'Vive la exclusividad de un antro privado sobre ruedas en Guadalajara y Zapopan. VIP Nights, Tours y más.'
              : 'Experience the exclusivity of a private club on wheels in Guadalajara and Zapopan. VIP Nights, Tours, and more.'}
          </p>
          <div className="flex space-x-4">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl">
              {lang === 'es' ? 'COTIZAR AHORA' : 'GET A QUOTE'}
            </a>
            <a href={`tel:${PHONE_NUMBER}`} className="px-10 py-5 bg-slate-800 rounded-full font-black text-xs uppercase tracking-widest border border-slate-700 flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span>{lang === 'es' ? 'LLAMAR' : 'CALL NOW'}</span>
            </a>
          </div>
        </div>
      </header>

      {/* Services */}
      <section id="paquetes" className="py-32 bg-slate-900/20">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black mb-20 uppercase tracking-tighter">
            {lang === 'es' ? 'EXPERIENCIAS ' : 'VIP '}
            <span className="text-purple-500">{lang === 'es' ? 'A TU MEDIDA' : 'EXPERIENCES'}</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                visualizingId={visualizingId} 
                previews={previews} 
                lang={lang}
                onVisualize={handleVisualize}
                onOpenLightbox={(imgs, i) => setLightbox({ images: imgs, index: i })}
              />
            ))}
          </div>
        </div>
      </section>

      <AIAgents />

      {/* Testimonials */}
      <section className="py-32 bg-slate-950">
        <div className="container mx-auto px-6">
           <h2 className="text-5xl font-black mb-20 uppercase tracking-tighter text-center">
            {lang === 'es' ? 'LA VOZ DE NUESTRA ' : 'HEAR OUR '}
            <span className="text-purple-500">{lang === 'es' ? 'TRIBU' : 'TRIBE'}</span>
           </h2>
           <div className="grid md:grid-cols-2 gap-10">
            {TESTIMONIALS_BILINGUAL[lang].map(t => (
              <div key={t.id} className="p-12 rounded-3xl bg-slate-900/30 border border-slate-800 shadow-2xl">
                <p className="text-slate-300 italic mb-8 text-xl leading-relaxed">"{t.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center font-bold">{t.name[0]}</div>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t.event}</p>
                  </div>
                </div>
              </div>
            ))}
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 bg-slate-900/10">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-5xl font-black text-center mb-20 uppercase tracking-tighter">
            {lang === 'es' ? 'RESOLVEMOS TUS ' : 'YOUR QUESTIONS '}
            <span className="text-pink-500">{lang === 'es' ? 'DUDAS' : 'ANSWERED'}</span>
          </h2>
          <div className="space-y-4">
            {FAQS_BILINGUAL[lang].map((faq, idx) => (
              <details key={idx} className="group bg-slate-900/50 rounded-2xl border border-slate-800 p-6">
                <summary className="cursor-pointer font-bold flex justify-between items-center text-lg list-none">
                  {faq.question}
                  <span className="transform group-open:rotate-180 transition-transform"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg></span>
                </summary>
                <div className="mt-4 text-slate-400 text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-slate-900 bg-slate-950 text-center md:text-left">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-12 md:mb-0">
            <div className="flex items-center space-x-3 mb-6 justify-center md:justify-start">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center font-black text-xl italic">P</div>
              <span className="text-2xl font-black uppercase italic tracking-tighter">PartyBus<span className="text-purple-500">GDL</span></span>
            </div>
            <p className="text-slate-500 text-xs max-w-sm leading-relaxed">
              {lang === 'es' 
                ? 'Líderes en transporte VIP y eventos privados en Guadalajara, Zapopan y Tequila Tour Experience.'
                : 'Leaders in VIP transportation and private events in Guadalajara, Zapopan, and Tequila Tour Experience.'}
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12">
            <a href={`tel:${PHONE_NUMBER}`} className="px-8 py-4 bg-slate-900 border border-slate-700 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span>{lang === 'es' ? 'LLAMAR AHORA' : 'CALL NOW'}</span>
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="px-8 py-4 bg-green-600 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-500 flex items-center space-x-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <span>WHATSAPP</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

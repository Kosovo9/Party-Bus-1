
import React, { useState, useEffect, useRef } from 'react';
import { SERVICES, TESTIMONIALS, FAQS, WHATSAPP_NUMBER, ExtendedService } from './constants';
import AIAgents from './components/AIAgents';
import { generateServiceVisual, validateCommunityPhoto } from './services/geminiService';

const ServiceCard: React.FC<{
  service: ExtendedService;
  visualizingId: string | null;
  previews: Record<string, string>;
  onVisualize: (service: ExtendedService) => void;
  onOpenLightbox: (images: string[], index: number) => void;
}> = ({ service, visualizingId, previews, onVisualize, onOpenLightbox }) => {
  const images = [previews[service.id] || service.image, ...(service.gallery || [])];
  const [currentIdx, setCurrentIdx] = useState(0);
  const touchStart = useRef<number | null>(null);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart.current - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
    touchStart.current = null;
  };

  return (
    <div className="group bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 hover:border-purple-500/50 transition-all duration-500 shadow-xl flex flex-col">
      <div 
        className="relative h-64 overflow-hidden bg-slate-900 group/carousel cursor-pointer"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => onOpenLightbox(images, currentIdx)}
      >
        <img 
          src={images[currentIdx]} 
          className={`w-full h-full object-cover transition-opacity duration-500 ${visualizingId === service.id ? 'opacity-30 blur-sm' : 'opacity-100'}`} 
          alt={service.title} 
        />
        
        {visualizingId === service.id && (
          <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-black/40">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-black uppercase tracking-tighter text-purple-400 animate-pulse">Generando Realidad VIP...</p>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && !visualizingId && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 rounded-full text-white opacity-100 md:opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-purple-600 z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/60 rounded-full text-white opacity-100 md:opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-purple-600 z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
              {images.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIdx ? 'bg-purple-500 w-3' : 'bg-white/40'}`} 
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute top-4 left-4 bg-purple-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest z-10">
          {service.category}
        </div>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onVisualize(service); }}
          className="absolute bottom-4 right-4 bg-black/60 hover:bg-purple-600 text-white p-3 rounded-full backdrop-blur-md border border-white/20 transition-all transform hover:scale-110 active:scale-95 group/btn z-10"
          title="Generar visualización de este paquete con IA"
        >
          <svg className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.547 2.188a2 2 0 001.312 2.413 2 2 0 002.387-.477l.547-.547a2 2 0 00.547-1.022l.547-2.387a2 2 0 00-.547-1.96zM4.5 4.5l3.5 3.5m0 0L4.5 11.5m3.5-3.5h10M11 21a9 9 0 110-18 9 9 0 010 18z"/>
          </svg>
        </button>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold leading-tight mb-3">{service.title}</h3>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">{service.description}</p>
        <div className="space-y-2 mb-8">
          {service.features.map((f, i) => (
            <div key={i} className="flex items-center text-xs text-slate-300">
              <svg className="w-3 h-3 mr-2 text-purple-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
              </svg>
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

const Lightbox: React.FC<{
  images: string[];
  initialIndex: number;
  onClose: () => void;
}> = ({ images, initialIndex, onClose }) => {
  const [idx, setIdx] = useState(initialIndex);

  return (
    <div className="fixed inset-0 z-[1000] bg-black/95 flex flex-col items-center justify-center p-4">
      <button onClick={onClose} className="absolute top-6 right-6 p-4 text-white hover:text-purple-500 transition-colors">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
      <div className="relative w-full max-w-5xl aspect-video overflow-hidden rounded-2xl shadow-2xl">
        <img src={images[idx]} className="w-full h-full object-contain" alt="Lightbox view" />
        
        {images.length > 1 && (
          <>
            <button onClick={() => setIdx((prev) => (prev - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/40 rounded-full text-white hover:bg-purple-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button onClick={() => setIdx((prev) => (prev + 1) % images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/40 rounded-full text-white hover:bg-purple-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </>
        )}
      </div>
      <div className="mt-6 flex space-x-2">
        {images.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === idx ? 'bg-purple-500' : 'bg-white/20'}`} />
        ))}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visualizingId, setVisualizingId] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [lightbox, setLightbox] = useState<{ images: string[], index: number } | null>(null);
  const [communityPhotos, setCommunityPhotos] = useState<string[]>([
    'https://picsum.photos/seed/party1/600/600',
    'https://picsum.photos/seed/party2/600/600',
    'https://picsum.photos/seed/party3/600/600',
    'https://picsum.photos/seed/party4/600/600',
    'https://picsum.photos/seed/party5/600/600',
    'https://picsum.photos/seed/party6/600/600',
    'https://picsum.photos/seed/party7/600/600',
    'https://picsum.photos/seed/party8/600/600',
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const communityInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVisualize = async (service: ExtendedService) => {
    const aistudio = (window as any).aistudio;
    if (!aistudio) {
      alert("Configurando servicios de IA... Por favor espera un momento.");
      return;
    }

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

  const handleCommunityUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const isValid = await validateCommunityPhoto(base64);
      if (isValid) {
        setCommunityPhotos(prev => [reader.result as string, ...prev]);
        alert("¡Tu foto ha sido aprobada por nuestro curador AI y agregada a la galería!");
      } else {
        alert("Lo sentimos, esta foto no coincide con el vibe VIP de PartyBus GDL. ¡Intenta con otra!");
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen text-white bg-slate-950 font-sans selection:bg-purple-500/30">
      {lightbox && (
        <Lightbox 
          images={lightbox.images} 
          initialIndex={lightbox.index} 
          onClose={() => setLightbox(null)} 
        />
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 shadow-2xl border-b border-slate-800/50' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center font-black text-2xl italic shadow-lg group-hover:scale-110 transition-transform">P</div>
            <span className="text-2xl font-black tracking-tighter uppercase italic hidden sm:block">PartyBus<span className="text-purple-500">GDL</span></span>
          </div>
          <div className="hidden lg:flex space-x-10 font-bold text-[11px] uppercase tracking-[0.2em] text-slate-400">
            <a href="#paquetes" className="hover:text-white transition-colors">Paquetes</a>
            <a href="#ai-planner" className="hover:text-white transition-colors">AI Planner</a>
            <a href="#incluye" className="hover:text-white transition-colors">Equipamiento</a>
            <a href="#galeria" className="hover:text-white transition-colors">Galería</a>
            <a href="#faq" className="hover:text-white transition-colors">Dudas</a>
          </div>
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="px-8 py-3 bg-white text-black rounded-full font-black text-xs hover:bg-purple-600 hover:text-white transition-all shadow-xl uppercase tracking-widest"
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
            className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
            alt="Party Bus Night"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 font-bold text-xs mb-8 border border-purple-500/20 backdrop-blur-md uppercase tracking-[0.2em]">
              <span className="w-2 h-2 rounded-full bg-purple-500 mr-3 animate-pulse"></span>
              The #1 VIP Experience in Jalisco
            </div>
            <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter">
              LA FIESTA <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 neon-glow-purple">QUE NUNCA</span><br/>
              SE DETIENE
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 mb-12 leading-relaxed font-light max-w-2xl">
              Vive la exclusividad de un antro privado sobre ruedas en Guadalajara. Tours, XV, Bodas y más con el sello VIP de PartyBus GDL.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-5 sm:space-y-0 sm:space-x-8">
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-black text-sm shadow-[0_10px_40px_rgba(168,85,247,0.4)] hover:scale-105 transition-all text-center uppercase tracking-widest"
              >
                RESERVAR AHORA
              </a>
              <a 
                href="#paquetes"
                className="px-12 py-6 bg-slate-800/60 rounded-full font-black text-sm border border-slate-700 hover:bg-slate-700 transition-all text-center backdrop-blur-md uppercase tracking-widest"
              >
                VER PAQUETES
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Services Grid */}
      <section id="paquetes" className="py-32 bg-slate-900/20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-tighter leading-none">EXPERIENCIAS <br/><span className="text-purple-500">A TU MEDIDA</span></h2>
              <p className="text-slate-400 text-lg leading-relaxed">Nuestra flota y servicios están diseñados para elevar cualquier celebración al nivel de leyenda.</p>
            </div>
            <div className="hidden md:block">
              <div className="flex space-x-4">
                <div className="px-6 py-3 rounded-full border border-slate-800 bg-slate-950 font-bold text-xs uppercase tracking-widest">+1000 Eventos</div>
                <div className="px-6 py-3 rounded-full border border-slate-800 bg-slate-950 font-bold text-xs uppercase tracking-widest">100% Seguro</div>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES.map(service => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                visualizingId={visualizingId} 
                previews={previews} 
                onVisualize={handleVisualize}
                onOpenLightbox={(imgs, i) => setLightbox({ images: imgs, index: i })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Interactive AI Planner Section */}
      <AIAgents />

      {/* Features Showcase */}
      <section id="incluye" className="py-32 overflow-hidden bg-slate-950 border-y border-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" />
              <div className="relative z-10 grid grid-cols-2 gap-4 rotate-2">
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1541339905195-062d55707a0a?auto=format&fit=crop&q=80&w=600" className="rounded-3xl border border-slate-800 shadow-2xl" alt="Bus detail 1" />
                  <img src="https://images.unsplash.com/photo-1514525253344-781f7a712627?auto=format&fit=crop&q=80&w=600" className="rounded-3xl border border-slate-800 shadow-2xl" alt="Bus detail 2" />
                </div>
                <div className="space-y-4 pt-12">
                  <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600" className="rounded-3xl border border-slate-800 shadow-2xl" alt="Bus detail 3" />
                  <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=600" className="rounded-3xl border border-slate-800 shadow-2xl" alt="Bus detail 4" />
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-5xl md:text-7xl font-black mb-10 uppercase tracking-tighter leading-[0.9]">EL CLUB <br/><span className="text-pink-500">SOBRE RUEDAS</span></h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: "Audio Master", desc: "Sistema competition de 10k watts." },
                  { title: "Vibe Neon", desc: "Iluminación inteligente rítmica." },
                  { title: "VIP Lounge", desc: "Asientos de piel premium ultra cómodos." },
                  { title: "4K Media", desc: "Pantallas de 55\" con streaming y clips." },
                  { title: "High-Speed", desc: "Wi-Fi 6 Starlink siempre conectado." },
                  { title: "Total Safety", desc: "Choferes certificados y staff de apoyo." }
                ].map((item, idx) => (
                  <div key={idx} className="group p-6 rounded-2xl bg-slate-900/40 border border-slate-800/50 hover:border-pink-500/30 transition-all">
                    <h4 className="font-black text-xs uppercase tracking-widest text-pink-400 mb-2">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Gallery Integration */}
      <section id="galeria" className="py-32 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter">MOMENTOS <span className="text-purple-500">VIP</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-10">Únete a nuestra galería exclusiva. Sube tu mejor recuerdo en el PartyBus y deja que nuestra IA lo apruebe.</p>
            
            <input 
              type="file" 
              ref={communityInputRef} 
              onChange={handleCommunityUpload} 
              className="hidden" 
              accept="image/*"
            />
            <button 
              onClick={() => communityInputRef.current?.click()}
              disabled={isUploading}
              className="px-10 py-5 bg-slate-900 border border-slate-700 rounded-full font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center mx-auto space-x-3 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Validando Vibe...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                  <span>SUBIR MI FOTO</span>
                </>
              )}
            </button>
          </div>
          
          <div className="columns-2 md:columns-4 gap-6 space-y-6">
            {communityPhotos.map((img, i) => (
              <div 
                key={i} 
                className="break-inside-avoid rounded-2xl overflow-hidden group relative cursor-pointer shadow-2xl"
                onClick={() => setLightbox({ images: communityPhotos, index: i })}
              >
                <img 
                  src={img} 
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={`Community moment ${i}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                   <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[10px] font-bold">✓</div>
                      <span className="text-[10px] font-black uppercase text-white/90 tracking-widest">Aprobado por AI</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-slate-900/10">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-5xl font-black mb-20 uppercase tracking-tighter leading-none">LA VOZ DE <br/><span className="text-purple-500">NUESTRA TRIBU</span></h2>
           <div className="grid md:grid-cols-3 gap-10">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="p-12 rounded-[2.5rem] bg-slate-950 border border-slate-800/50 text-left hover:border-purple-500/30 transition-all duration-500 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg className="w-20 h-20 text-purple-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1 21L1 18C1 16.8954 1.89543 16 3 16H6C6.55228 16 7 15.5523 7 15V9C7 8.44772 6.55228 8 6 8H3C1.89543 8 1 7.10457 1 6V5C1 3.89543 1.89543 3 3 3H6C8.20914 3 10 4.79086 10 7V15C10 18.3137 7.31371 21 4 21H1Z"/></svg>
                </div>
                <div className="flex mb-8 space-x-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  ))}
                </div>
                <p className="text-slate-300 italic mb-10 leading-relaxed text-xl relative z-10">"{t.text}"</p>
                <div className="flex items-center space-x-5 relative z-10">
                   <div className="w-14 h-14 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl flex items-center justify-center font-bold text-xl text-purple-400 border border-slate-700">{t.name[0]}</div>
                   <div>
                    <p className="font-bold text-base">{t.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{t.event}</p>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-5xl font-black text-center mb-20 uppercase tracking-tighter">RESOLVEMOS <br/><span className="text-pink-500">TUS DUDAS</span></h2>
          <div className="space-y-6">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="group bg-slate-900/30 rounded-3xl border border-slate-800/50 open:border-pink-500/40 transition-all duration-500">
                <summary className="p-8 cursor-pointer font-bold flex justify-between items-center text-xl list-none group-open:text-pink-400 transition-colors">
                  {faq.question}
                  <span className="transform group-open:rotate-180 transition-transform duration-500 text-slate-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                  </span>
                </summary>
                <div className="px-8 pb-8 text-slate-400 border-t border-slate-800/30 pt-6 leading-relaxed text-base">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-slate-900 bg-slate-950">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-16 md:mb-0">
             <div className="flex items-center space-x-3 mb-8 justify-center md:justify-start">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center font-black text-2xl italic shadow-2xl">P</div>
              <span className="text-3xl font-black uppercase italic tracking-tighter">PartyBus<span className="text-purple-500">GDL</span></span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed mx-auto md:mx-0">
              Transformamos traslados en experiencias inolvidables. Líderes en transporte VIP y eventos privados en Guadalajara, Zapopan y Tequila.
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-24">
            <div>
              <h4 className="font-black text-xs uppercase mb-6 tracking-[0.2em] text-slate-300">Reserva tu Noche</h4>
              <p className="text-slate-500 text-sm mb-3 font-semibold transition-colors hover:text-white cursor-pointer">WhatsApp: {WHATSAPP_NUMBER}</p>
              <p className="text-slate-500 text-sm font-semibold transition-colors hover:text-white cursor-pointer">hola@partybusgdl.com</p>
            </div>
             <div>
              <h4 className="font-black text-xs uppercase mb-6 tracking-[0.2em] text-slate-300">Conecta</h4>
              <a href="https://instagram.com/partybusgdl" className="text-slate-500 text-sm hover:text-pink-500 transition-colors block mb-3 font-semibold uppercase">@partybusgdl</a>
              <a href="#" className="text-slate-500 text-sm hover:text-purple-500 transition-colors block font-semibold uppercase">Facebook Fan Page</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-24 pt-12 border-t border-slate-900/50 text-center">
            <p className="text-slate-600 text-[10px] uppercase font-black tracking-[0.5em]">© {new Date().getFullYear()} PartyBus Guadalajara — Zapopan, México. Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* PULSING WHATSAPP CTA - Desktop & Mobile Combined Strategy */}
      {/* Desktop Floating Button */}
      <div className="fixed bottom-10 right-10 z-[200] hidden md:block group">
        <div className="absolute right-full mr-6 bottom-4 bg-white text-black px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 shadow-2xl pointer-events-none whitespace-nowrap">
          ¡Platícanos tu evento! 🥂
        </div>
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-20 h-20 bg-green-600 rounded-full shadow-[0_0_50px_rgba(22,163,74,0.5)] hover:bg-green-500 hover:scale-110 active:scale-95 transition-all"
        >
          {/* Pulse Rings */}
          <div className="absolute inset-0 rounded-full animate-ping-slow bg-green-500 opacity-20"></div>
          <div className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-10"></div>
          
          <svg className="w-10 h-10 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>

      {/* Mobile Sticky CTA - Enhanced Bubble for better reachability and style */}
      <div className="fixed bottom-6 right-6 z-[200] md:hidden">
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-16 h-16 bg-green-600 rounded-full shadow-[0_0_40px_rgba(22,163,74,0.6)] active:scale-90 transition-transform"
        >
          <div className="absolute inset-0 rounded-full animate-ping bg-green-500 opacity-30"></div>
          <svg className="w-8 h-8 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </div>

    </div>
  );
};

export default App;
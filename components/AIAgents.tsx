
import React, { useState, useRef } from 'react';
import { analyzeGroupPhoto, editPartyPhoto } from '../services/geminiService';

const AIAgents: React.FC = () => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      const result = await analyzeGroupPhoto(base64);
      setAnalysis(result || "No pude analizar la imagen.");
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <section id="ai-planner" className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4 neon-glow-purple">
          AI PARTY PLANNER
        </h2>
        <p className="text-slate-300 mb-8 text-lg">
          Sube una foto con tu grupo y deja que nuestra Inteligencia Artificial te diga qué unidad necesitan.
        </p>

        <div className="bg-slate-800/50 p-8 rounded-3xl border border-purple-500/30 backdrop-blur-sm">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            className="hidden" 
            accept="image/*"
          />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-white shadow-xl hover:scale-105 transition-transform disabled:opacity-50"
          >
            {loading ? "Analizando Grupo..." : "Subir Foto del Crew"}
          </button>

          {analysis && (
            <div className="mt-8 p-6 bg-slate-900 rounded-2xl border border-pink-500/20 text-left animate-fade-in">
              <p className="text-pink-400 font-bold mb-2 uppercase text-xs tracking-widest">Recomendación AI:</p>
              <p className="text-white whitespace-pre-line leading-relaxed">{analysis}</p>
              <div className="mt-4 flex justify-end">
                <a 
                  href="https://wa.me/523311620543" 
                  className="text-purple-400 font-semibold hover:underline"
                >
                  Confirmar disponibilidad →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AIAgents;
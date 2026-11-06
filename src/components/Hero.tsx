import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Layers, 
  Printer, 
  Truck,
  MessageCircle,
  ExternalLink,
  Zap,
  Flame,
  Star
} from 'lucide-react';

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSection }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-feast-blue text-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b-3 border-black">
      {/* Feastables Halftone / comic dot overlay */}
      <div className="absolute inset-0 bg-dots-white pointer-events-none opacity-20"></div>

      {/* Playful background decorative shapes */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-feast-yellow rounded-full border-4 border-black pointer-events-none"></div>
      <div className="absolute bottom-4 -right-16 w-64 h-64 bg-feast-pink rounded-full border-4 border-black pointer-events-none opacity-70"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Big Feastables Headlines & Punchy CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Sticker Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-feast-yellow text-black border-3 border-black font-display font-black text-xs uppercase tracking-wider shadow-brutal -rotate-1 hover:rotate-0 transition-transform">
              <Zap className="w-4 h-4 fill-black" />
              <span>¡DISEÑA TUS SUEÑOS! HECHO 🇦🇷 EN BELGRANO</span>
              <span className="bg-black text-feast-yellow text-[10px] px-1.5 py-0.5 rounded font-black">CABA</span>
            </div>

            {/* Giant Title */}
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[1.05] drop-shadow-[3px_3px_0px_#000]">
              GRÁFICA, VINILOS & <br />
              <span className="inline-block bg-feast-yellow text-black px-3 py-0.5 rounded-xl border-3 border-black shadow-brutal-md rotate-1 my-1">
                LIBRERÍA TÉCNICA
              </span>
            </h1>

            {/* High-energy subtitle */}
            <p className="text-base sm:text-lg font-bold text-white max-w-2xl mx-auto lg:mx-0 leading-snug drop-shadow-sm">
              Equipamiento pro para <span className="underline decoration-feast-yellow decoration-4">estudiantes de arquitectura, diseñadores y empresas</span>. Ploteos al instante, stickers troquelados, esmerilados, tableros Plantec y envíos a todo el país.
            </p>

            {/* Feastables Feature Stickers */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 bg-black text-feast-lime font-display font-black text-xs uppercase px-3 py-1.5 rounded-xl border-2 border-white shadow-brutal-sm">
                <CheckCircle2 className="w-4 h-4 text-feast-lime stroke-[3]" />
                <span>Atención en el día</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white text-black font-display font-black text-xs uppercase px-3 py-1.5 rounded-xl border-2 border-black shadow-brutal-sm">
                <Star className="w-4 h-4 text-feast-yellow fill-feast-yellow" />
                <span>Ploteos CAD hasta A0</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-feast-pink text-white font-display font-black text-xs uppercase px-3 py-1.5 rounded-xl border-2 border-black shadow-brutal-sm">
                <Truck className="w-4 h-4 text-white stroke-[2.5]" />
                <span>Envíos CABA & País</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-feast-yellow text-black font-display font-black text-xs uppercase px-3 py-1.5 rounded-xl border-2 border-black shadow-brutal-sm">
                <span>📍 Juramento 1614</span>
              </span>
            </div>

            {/* Chunky Feastables CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <button
                onClick={() => onScrollToSection('cotizador')}
                className="w-full sm:w-auto btn-brutal-yellow px-7 py-4 text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2 shadow-brutal-lg"
              >
                <Zap className="w-5 h-5 fill-black" />
                <span>Cotizar Trabajo Online</span>
                <ArrowRight className="w-5 h-5 stroke-[3]" />
              </button>

              <a
                href="https://wa.me/5491125809266?text=Hola%20Akimpress!%20Quisiera%20consultar%20un%20presupuesto."
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto btn-brutal-lime px-6 py-4 text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2 shadow-brutal-lg"
              >
                <MessageCircle className="w-5 h-5 fill-black text-feast-lime" />
                <span>Pedir por WhatsApp</span>
              </a>

              <a
                href="https://akimpressvinilos.mercadoshops.com.ar/"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto btn-brutal-white px-5 py-4 text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-1.5 shadow-brutal"
              >
                <span>Tienda Oficial</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Feastables Candy-Box Showcase */}
          <div className="lg:col-span-5 relative">
            
            {/* Pop Card Wrapper */}
            <div className="bg-[#FFFDEB] text-black border-4 border-black rounded-3xl p-6 shadow-brutal-xl relative">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b-3 border-black">
                <span className="font-display font-black text-sm uppercase tracking-wider flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded-full bg-feast-pink border-2 border-black animate-ping"></span>
                  ESPECIALIDADES TOP
                </span>
                <span className="bg-feast-yellow text-black font-display font-black text-xs uppercase px-2.5 py-1 rounded-lg border-2 border-black -rotate-2">
                  Belgrano • CABA
                </span>
              </div>

              {/* 4 Chunky Feature Cards */}
              <div className="grid grid-cols-2 gap-3.5">
                
                {/* 1. Librería Técnica */}
                <div 
                  onClick={() => onScrollToSection('catalogo')}
                  className="bg-feast-yellow/30 hover:bg-feast-yellow p-4 rounded-2xl border-3 border-black cursor-pointer transition-all hover:-translate-y-1 hover:shadow-brutal group flex flex-col justify-between"
                >
                  <div className="w-11 h-11 rounded-xl bg-feast-yellow text-black border-2 border-black shadow-brutal-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Compass className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm uppercase leading-tight text-black mb-1">
                      Librería Técnica
                    </h4>
                    <p className="text-[11px] font-bold text-black/80 leading-snug">
                      Tableros Plantec, escalímetros, estilógrafos y papel vegetal FADU.
                    </p>
                  </div>
                </div>

                {/* 2. Vinilos & Stickers */}
                <div 
                  onClick={() => onScrollToSection('catalogo')}
                  className="bg-feast-pink/20 hover:bg-feast-pink/40 p-4 rounded-2xl border-3 border-black cursor-pointer transition-all hover:-translate-y-1 hover:shadow-brutal group flex flex-col justify-between"
                >
                  <div className="w-11 h-11 rounded-xl bg-feast-pink text-white border-2 border-black shadow-brutal-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Layers className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm uppercase leading-tight text-black mb-1">
                      Vinilos & Stickers
                    </h4>
                    <p className="text-[11px] font-bold text-black/80 leading-snug">
                      Esmerilados, microperforados y calcos con troquel a medida.
                    </p>
                  </div>
                </div>

                {/* 3. Imprenta & Planos */}
                <div 
                  onClick={() => onScrollToSection('catalogo')}
                  className="bg-feast-cyan/30 hover:bg-feast-cyan/50 p-4 rounded-2xl border-3 border-black cursor-pointer transition-all hover:-translate-y-1 hover:shadow-brutal group flex flex-col justify-between"
                >
                  <div className="w-11 h-11 rounded-xl bg-feast-cyan text-black border-2 border-black shadow-brutal-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Printer className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm uppercase leading-tight text-black mb-1">
                      Imprenta & Planos
                    </h4>
                    <p className="text-[11px] font-bold text-black/80 leading-snug">
                      Tarjetas 350g, flyers, carpetas y ploteo CAD en el día.
                    </p>
                  </div>
                </div>

                {/* 4. Envíos Express */}
                <div 
                  onClick={() => onScrollToSection('catalogo')}
                  className="bg-feast-lime/30 hover:bg-feast-lime/60 p-4 rounded-2xl border-3 border-black cursor-pointer transition-all hover:-translate-y-1 hover:shadow-brutal group flex flex-col justify-between"
                >
                  <div className="w-11 h-11 rounded-xl bg-feast-lime text-black border-2 border-black shadow-brutal-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Truck className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="font-display font-black text-sm uppercase leading-tight text-black mb-1">
                      Envíos Flash
                    </h4>
                    <p className="text-[11px] font-bold text-black/80 leading-snug">
                      Motos en CABA y encomiendas protegidas a todo el país.
                    </p>
                  </div>
                </div>

              </div>

              {/* Instagram community sticker badge */}
              <div className="mt-4 p-3.5 bg-black text-white border-3 border-black rounded-2xl flex items-center justify-between shadow-brutal-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📸</span>
                  <div>
                    <div className="font-display font-black text-xs uppercase text-feast-yellow tracking-wider">
                      @akimpressgrafica
                    </div>
                    <div className="text-[11px] font-bold text-zinc-300">
                      +500 seguidores • Fotos y trabajos reales
                    </div>
                  </div>
                </div>
                <a 
                  href="https://www.instagram.com/akimpressgrafica/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-brutal bg-feast-pink text-white text-[11px] px-3 py-1.5 rounded-xl flex items-center gap-1"
                >
                  <span>Ver Insta</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

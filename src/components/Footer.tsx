import React from 'react';
import { 
  Printer, 
  MapPin, 
  Phone, 
  Mail, 
  ShoppingBag, 
  ExternalLink,
  Zap
} from 'lucide-react';

const InstagramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection }) => {
  return (
    <footer className="bg-black text-white text-xs border-t-4 border-black">
      {/* Feastables Bottom Ticker Bar */}
      <div className="bg-feast-yellow text-black border-b-3 border-black py-2 overflow-hidden whitespace-nowrap select-none">
        <div className="inline-flex animate-marquee text-black font-display font-black text-xs tracking-wider uppercase items-center gap-6">
          <span>⚡ AKIMPRESS GRÁFICA & VINILOS</span>
          <span>★</span>
          <span>📍 JURAMENTO 1614 BELGRANO</span>
          <span>★</span>
          <span>📦 ENVÍOS A TODO EL PAÍS</span>
          <span>★</span>
          <span>💬 WHATSAPP: 11 2580-9266</span>
          <span>★</span>
          <span>🔥 HECHO EN ARGENTINA 🇦🇷</span>
          <span>★</span>
          {/* Repeated */}
          <span>⚡ AKIMPRESS GRÁFICA & VINILOS</span>
          <span>★</span>
          <span>📍 JURAMENTO 1614 BELGRANO</span>
          <span>★</span>
          <span>📦 ENVÍOS A TODO EL PAÍS</span>
          <span>★</span>
          <span>💬 WHATSAPP: 11 2580-9266</span>
          <span>★</span>
          <span>🔥 HECHO EN ARGENTINA 🇦🇷</span>
          <span>★</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-feast-yellow text-black border-2 border-white shadow-brutal-white flex items-center justify-center">
                <Printer className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white uppercase">
                AK<span className="text-feast-yellow">IMPRESS</span>
              </span>
            </div>

            <p className="text-zinc-300 text-xs font-bold leading-relaxed max-w-sm">
              Imprenta gráfica de alta resolución, corte de vinilos por plotter, ploteos CAD y librería técnica & escolar en el corazón de Belgrano, CABA.
            </p>

            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 text-feast-yellow font-display font-black text-xs uppercase px-3 py-1.5 rounded-xl shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-feast-yellow" />
              <span>¡Diseña tus sueños! Hecho 🇦🇷</span>
            </div>

            {/* Instagram pill */}
            <div className="pt-2">
              <a
                href="https://www.instagram.com/akimpressgrafica/"
                target="_blank"
                rel="noreferrer"
                className="btn-brutal bg-feast-pink text-white text-xs px-3.5 py-2 rounded-xl flex items-center gap-2 inline-flex"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
                <span>@akimpressgrafica</span>
                <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded font-black">+500 seg.</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-display font-black text-feast-yellow uppercase tracking-wider text-xs">
              SECCIONES
            </h5>
            <ul className="space-y-2 font-display font-bold uppercase text-xs">
              <li>
                <button onClick={() => onScrollToSection('hero')} className="hover:text-feast-yellow transition-colors">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('servicios')} className="hover:text-feast-yellow transition-colors">
                  Servicios Gráficos
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('catalogo')} className="hover:text-feast-yellow transition-colors">
                  Catálogo
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('cotizador')} className="text-feast-lime font-black hover:underline flex items-center gap-1">
                  <span>Cotizador Online</span>
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('subir-archivos')} className="hover:text-feast-yellow transition-colors">
                  Subir Archivos
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection('contacto')} className="hover:text-feast-yellow transition-colors">
                  Ubicación & Local
                </button>
              </li>
            </ul>
          </div>

          {/* Specialities */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-display font-black text-feast-yellow uppercase tracking-wider text-xs">
              ESPECIALIDADES
            </h5>
            <ul className="space-y-2 text-zinc-300 font-bold text-xs">
              <li>• Tableros y Útiles de Dibujo Plantec</li>
              <li>• Vinilos Esmerilados & Microperforados</li>
              <li>• Stickers Troquelados por m²</li>
              <li>• Ploteo de Planos CAD (A0, A1, A2)</li>
              <li>• Tarjetas Personales 350g & Flyers</li>
              <li>• Artículos de Librería Escolar y Universitaria</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-display font-black text-feast-yellow uppercase tracking-wider text-xs">
              CONTACTO BELGRANO
            </h5>
            <div className="space-y-2.5 font-bold text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-feast-pink shrink-0 mt-0.5 stroke-[2.5]" />
                <span className="text-zinc-200">Juramento 1614, Belgrano - CABA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-feast-lime shrink-0 stroke-[2.5]" />
                <a href="https://wa.me/5491125809266" className="text-white hover:text-feast-lime font-display font-black">
                  11 2580-9266
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-feast-cyan shrink-0 stroke-[2.5]" />
                <a href="mailto:Akimpressbelgrano@gmail.com" className="text-zinc-300 hover:text-white break-all">
                  Akimpressbelgrano@gmail.com
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="https://akimpressvinilos.mercadoshops.com.ar/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-brutal bg-feast-yellow text-black text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 inline-flex"
                >
                  <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Tienda MercadoShops</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-400 font-bold text-xs">
          <p>© {new Date().getFullYear()} Akimpress Gráfica • Belgrano CABA • Estilo Feastables</p>
          <p className="flex items-center gap-1 text-[11px] text-zinc-400">
            <span>Hecho con ⚡ en Buenos Aires, Argentina 🇦🇷</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

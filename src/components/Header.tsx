import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShoppingBag, 
  FileText, 
  Menu, 
  X, 
  Sparkles, 
  ExternalLink,
  Printer,
  Zap,
  Flame
} from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onScrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDEB] border-b-3 border-black">
      {/* Top Feastables Marquee Ticker */}
      <div className="bg-feast-yellow text-black border-b-3 border-black py-1.5 px-4 overflow-hidden whitespace-nowrap select-none">
        <div className="flex justify-between items-center max-w-7xl mx-auto text-xs font-display font-black uppercase tracking-wider">
          <div className="inline-flex animate-marquee items-center gap-6">
            <span className="flex items-center gap-1.5 bg-black text-feast-yellow px-2 py-0.5 rounded-md -rotate-1">
              <Zap className="w-3.5 h-3.5 fill-feast-yellow" />
              ¡DISEÑA TUS SUEÑOS!
            </span>
            <span className="flex items-center gap-1">📍 JURAMENTO 1614 • BELGRANO CABA</span>
            <span>★</span>
            <span className="flex items-center gap-1 text-feast-blue font-extrabold">📦 ENVÍOS A TODO EL PAÍS</span>
            <span>★</span>
            <span className="flex items-center gap-1 bg-feast-pink text-white px-2 py-0.5 rounded-md rotate-1">
              🔥 PLOTEOS EN EL DÍA FADU
            </span>
            <span>★</span>
            <span className="flex items-center gap-1">💬 WHATSAPP: 11 2580-9266</span>
            <span>★</span>
            {/* Repeated for loop */}
            <span className="flex items-center gap-1.5 bg-black text-feast-yellow px-2 py-0.5 rounded-md -rotate-1">
              <Zap className="w-3.5 h-3.5 fill-feast-yellow" />
              ¡DISEÑA TUS SUEÑOS!
            </span>
            <span className="flex items-center gap-1">📍 JURAMENTO 1614 • BELGRANO CABA</span>
            <span>★</span>
            <span className="flex items-center gap-1 text-feast-blue font-extrabold">📦 ENVÍOS A TODO EL PAÍS</span>
            <span>★</span>
            <span className="flex items-center gap-1 bg-feast-pink text-white px-2 py-0.5 rounded-md rotate-1">
              🔥 PLOTEOS EN EL DÍA FADU
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0 pl-4 border-l-2 border-black">
            <a 
              href="https://wa.me/5491125809266?text=Hola%20Akimpress!%20Vengo%20de%20la%20web."
              target="_blank"
              rel="noreferrer"
              className="bg-black hover:bg-zinc-800 text-white px-3 py-1 rounded-full text-[11px] font-black tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3 h-3 text-feast-lime" />
              <span>11 2580-9266</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand in Feastables Pop Style */}
          <div 
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-13 h-13 p-2.5 rounded-2xl bg-feast-blue text-white border-3 border-black shadow-brutal transition-transform duration-150 group-hover:-rotate-3 group-hover:scale-105 active:translate-x-1 active:translate-y-1 active:shadow-none">
              <Printer className="w-7 h-7 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-black uppercase">
                  AK<span className="text-feast-blue">IMPRESS</span>
                </span>
                <span className="font-display font-black text-[10px] uppercase tracking-wider bg-feast-yellow text-black px-2 py-0.5 rounded-md border-2 border-black rotate-2 shadow-brutal-sm">
                  Gráfica
                </span>
              </div>
              <p className="text-[11px] font-black uppercase tracking-wider text-black/70">
                Vinilos • Imprenta • Librería Técnica
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-display font-black uppercase text-xs tracking-wider">
            <button 
              onClick={() => handleNavClick('servicios')}
              className="px-3.5 py-2 rounded-xl text-black hover:bg-feast-yellow hover:border-2 hover:border-black transition-all"
            >
              Servicios
            </button>
            <button 
              onClick={() => handleNavClick('catalogo')}
              className="px-3.5 py-2 rounded-xl text-black hover:bg-feast-yellow hover:border-2 hover:border-black transition-all"
            >
              Catálogo
            </button>
            <button 
              onClick={() => handleNavClick('cotizador')}
              className="px-3.5 py-2 rounded-xl bg-feast-yellow border-2 border-black shadow-brutal-sm text-black hover:bg-yellow-300 transition-all flex items-center gap-1.5 -rotate-1 hover:rotate-0"
            >
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>Cotizador Online</span>
            </button>
            <button 
              onClick={() => handleNavClick('subir-archivos')}
              className="px-3.5 py-2 rounded-xl text-black hover:bg-feast-yellow hover:border-2 hover:border-black transition-all"
            >
              Subir Archivos
            </button>
            <button 
              onClick={() => handleNavClick('contacto')}
              className="px-3.5 py-2 rounded-xl text-black hover:bg-feast-yellow hover:border-2 hover:border-black transition-all"
            >
              Ubicación
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="https://akimpressvinilos.mercadoshops.com.ar/" 
              target="_blank" 
              rel="noreferrer"
              className="btn-brutal bg-white hover:bg-slate-50 text-black px-3.5 py-2 text-xs rounded-xl flex items-center gap-1.5"
              title="Visitar tienda oficial en MercadoShops"
            >
              <ShoppingBag className="w-4 h-4 text-feast-blue" />
              <span>Tienda Online</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <button 
              onClick={onOpenCart}
              className="btn-brutal-blue px-4 py-2 text-xs rounded-xl flex items-center gap-2 relative"
            >
              <FileText className="w-4 h-4" />
              <span>Presupuesto</span>
              {cartCount > 0 && (
                <span className="bg-feast-yellow text-black border-2 border-black text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center animate-bounce -mr-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl border-2 border-black bg-feast-yellow shadow-brutal-sm text-black"
              aria-label="Abrir presupuesto"
            >
              <FileText className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-feast-pink text-white border-2 border-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border-2 border-black bg-white shadow-brutal-sm text-black"
              aria-label="Menú principal"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile dropdown menu with Feastables flair */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-3 border-black bg-feast-yellow p-5 space-y-3 font-display font-black uppercase text-sm">
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => handleNavClick('servicios')}
              className="w-full text-left py-3 px-4 rounded-xl bg-white border-2 border-black shadow-brutal-sm hover:bg-slate-50 transition-all"
            >
              📌 Servicios Principales
            </button>
            <button 
              onClick={() => handleNavClick('catalogo')}
              className="w-full text-left py-3 px-4 rounded-xl bg-white border-2 border-black shadow-brutal-sm hover:bg-slate-50 transition-all"
            >
              📦 Catálogo de Productos
            </button>
            <button 
              onClick={() => handleNavClick('cotizador')}
              className="w-full text-left py-3 px-4 rounded-xl bg-feast-pink text-white border-2 border-black shadow-brutal-sm hover:bg-pink-600 transition-all flex items-center justify-between"
            >
              <span>⚡ Cotizador Online Express</span>
              <span className="bg-feast-yellow text-black text-[10px] px-2 py-0.5 rounded border border-black">¡CALCULAR!</span>
            </button>
            <button 
              onClick={() => handleNavClick('subir-archivos')}
              className="w-full text-left py-3 px-4 rounded-xl bg-white border-2 border-black shadow-brutal-sm hover:bg-slate-50 transition-all"
            >
              📁 Enviar / Preparar Archivos
            </button>
            <button 
              onClick={() => handleNavClick('contacto')}
              className="w-full text-left py-3 px-4 rounded-xl bg-white border-2 border-black shadow-brutal-sm hover:bg-slate-50 transition-all"
            >
              📍 Local en Belgrano & Contacto
            </button>
          </div>

          <div className="pt-3 border-t-2 border-black flex flex-col gap-2.5">
            <a 
              href="https://akimpressvinilos.mercadoshops.com.ar/" 
              target="_blank" 
              rel="noreferrer"
              className="btn-brutal bg-white text-black py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-feast-blue" />
              <span>Tienda MercadoShops</span>
            </a>
            <a 
              href="https://wa.me/5491125809266?text=Hola%20Akimpress!%20Vengo%20de%20la%20página%20web."
              target="_blank"
              rel="noreferrer"
              className="btn-brutal-lime py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-black" />
              <span>WhatsApp: 11 2580-9266</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

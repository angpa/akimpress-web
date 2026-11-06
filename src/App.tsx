import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesOverview } from './components/ServicesOverview';
import { CatalogSection } from './components/CatalogSection';
import { QuoteCalculator } from './components/QuoteCalculator';
import { FileUploadSection } from './components/FileUploadSection';
import { LocationAndHours } from './components/LocationAndHours';
import { Footer } from './components/Footer';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Product } from './data/catalog';
import { Sparkles, Zap, Flame, Check } from 'lucide-react';

export function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          categoryLabel: product.categoryLabel,
          details: product.features.slice(0, 2).join(' • '),
          priceEstimate: product.priceEstimate,
          quantity: 1,
        }
      ];
    });
    showToast(`¡SUMADO AL PEDIDO! ⚡ ${product.name}`);
  };

  const handleAddCustomQuoteToCart = (quote: {
    id: string;
    name: string;
    categoryLabel: string;
    details: string;
    priceEstimate: string;
  }) => {
    setCartItems(prev => [
      ...prev,
      {
        id: quote.id,
        name: quote.name,
        categoryLabel: quote.categoryLabel,
        details: quote.details,
        priceEstimate: quote.priceEstimate,
        quantity: 1
      }
    ]);
    showToast(`¡COTIZACIÓN GUARDADA EN TU BOLSA! 🚀`);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDEB] text-black relative selection:bg-feast-yellow selection:text-black">
      {/* Toast popup in Feastables sticker style */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 bg-feast-yellow border-3 border-black text-black text-xs sm:text-sm font-display font-black px-4 py-3 rounded-2xl shadow-brutal-lg animate-bounce-slight flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* Feastables Middle Ticker Tape 1 */}
        <div className="bg-feast-pink border-y-3 border-black py-2.5 overflow-hidden whitespace-nowrap shadow-brutal-sm">
          <div className="inline-flex animate-marquee text-white font-display font-black text-sm tracking-wider uppercase items-center gap-8">
            <span className="flex items-center gap-2">💥 ¡100% HECHO EN 🇦🇷!</span>
            <span>★</span>
            <span className="flex items-center gap-2">⚡ VINILOS TROQUELADOS & ESMERILADOS</span>
            <span>★</span>
            <span className="flex items-center gap-2">📐 TABLEROS PLANTEC & DIBUJO TÉCNICO FADU</span>
            <span>★</span>
            <span className="flex items-center gap-2">🚀 PLOTEO DE PLANOS EN EL ACTO</span>
            <span>★</span>
            <span className="flex items-center gap-2">📦 ENVÍOS A TODO EL PAÍS</span>
            <span>★</span>
            <span className="flex items-center gap-2">📍 JURAMENTO 1614 • BELGRANO CABA</span>
            <span>★</span>
            <span className="flex items-center gap-2">💥 ¡DISEÑA TUS SUEÑOS AL MANGO!</span>
            <span>★</span>
            {/* Repeated for continuous scroll */}
            <span className="flex items-center gap-2">💥 ¡100% HECHO EN 🇦🇷!</span>
            <span>★</span>
            <span className="flex items-center gap-2">⚡ VINILOS TROQUELADOS & ESMERILADOS</span>
            <span>★</span>
            <span className="flex items-center gap-2">📐 TABLEROS PLANTEC & DIBUJO TÉCNICO FADU</span>
            <span>★</span>
            <span className="flex items-center gap-2">🚀 PLOTEO DE PLANOS EN EL ACTO</span>
            <span>★</span>
            <span className="flex items-center gap-2">📦 ENVÍOS A TODO EL PAÍS</span>
            <span>★</span>
            <span className="flex items-center gap-2">📍 JURAMENTO 1614 • BELGRANO CABA</span>
            <span>★</span>
          </div>
        </div>

        {/* 4 Pillars Services Overview */}
        <ServicesOverview
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onScrollToSection={handleScrollToSection}
        />

        {/* Catalog Section */}
        <CatalogSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          cartProductIds={cartItems.map(i => i.id)}
        />

        {/* Feastables Contrast Ticker Tape 2 */}
        <div className="bg-feast-lime border-y-3 border-black py-2.5 overflow-hidden whitespace-nowrap shadow-brutal-sm">
          <div className="inline-flex animate-marquee-reverse text-black font-display font-black text-sm tracking-wider uppercase items-center gap-8">
            <span className="flex items-center gap-2">🔥 COTIZÁ ONLINE AL TOQUE</span>
            <span>✦</span>
            <span className="flex items-center gap-2">💸 PRECIOS TRANSPARENTES EN EL ACTO</span>
            <span>✦</span>
            <span className="flex items-center gap-2">💬 ATENCIÓN DIRECTA POR WHATSAPP</span>
            <span>✦</span>
            <span className="flex items-center gap-2">📦 MOTOMENSAJERÍA EN CABA Y GBA</span>
            <span>✦</span>
            <span className="flex items-center gap-2">⭐ LIBRERÍA TÉCNICA Y ESCOLAR COMPLETA</span>
            <span>✦</span>
            {/* Repeated */}
            <span className="flex items-center gap-2">🔥 COTIZÁ ONLINE AL TOQUE</span>
            <span>✦</span>
            <span className="flex items-center gap-2">💸 PRECIOS TRANSPARENTES EN EL ACTO</span>
            <span>✦</span>
            <span className="flex items-center gap-2">💬 ATENCIÓN DIRECTA POR WHATSAPP</span>
            <span>✦</span>
            <span className="flex items-center gap-2">📦 MOTOMENSAJERÍA EN CABA Y GBA</span>
            <span>✦</span>
            <span className="flex items-center gap-2">⭐ LIBRERÍA TÉCNICA Y ESCOLAR COMPLETA</span>
            <span>✦</span>
          </div>
        </div>

        {/* Interactive Instant Quote Calculator */}
        <QuoteCalculator
          onAddCustomQuoteToCart={handleAddCustomQuoteToCart}
        />

        {/* File Pre-flight & Upload Section */}
        <FileUploadSection />

        {/* Location, Hours, Interactive Map & FAQ */}
        <LocationAndHours />
      </main>

      {/* Footer */}
      <Footer onScrollToSection={handleScrollToSection} />

      {/* Cart / Presupuesto Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;

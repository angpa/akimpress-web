import React, { useState, useMemo } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Plus, 
  Check, 
  MessageCircle, 
  ExternalLink,
  Layers,
  Zap,
  Sparkles
} from 'lucide-react';
import { Product, CATEGORIES, PRODUCTS } from '../data/catalog';

interface CatalogSectionProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onAddToCart: (product: Product) => void;
  cartProductIds: string[];
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  cartProductIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = 
        selectedCategory === 'all' || product.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.categoryLabel.toLowerCase().includes(q) ||
        product.features.some(f => f.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="catalogo" className="py-20 bg-[#FFFDEB] border-b-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header in Feastables Pop Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-feast-pink text-white border-2 border-black font-display font-black text-xs uppercase tracking-wider shadow-brutal-sm mb-3 -rotate-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CATÁLOGO DESTACADO & LIBRERÍA</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black">
              PRODUCTOS, VINILOS & HERRAMIENTAS
            </h2>
            <p className="mt-2 text-black font-semibold text-sm sm:text-base">
              Elegí lo que necesitás, sumalo a tu pedido y mandanos la lista lista a WhatsApp con un solo clic.
            </p>
          </div>

          {/* Search bar brutalist */}
          <div className="w-full md:w-88 relative">
            <Search className="w-5 h-5 text-black absolute left-4 top-1/2 -translate-y-1/2 stroke-[2.5]" />
            <input
              type="text"
              placeholder="BUSCAR TABLEROS, VINILOS, PLANOS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl border-3 border-black bg-white text-black font-display font-bold text-xs uppercase placeholder:text-black/40 focus:outline-none focus:bg-feast-yellow/20 shadow-brutal transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-black uppercase text-black hover:text-feast-pink"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Feastables Style */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl font-display font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all border-3 border-black select-none ${
                  isActive
                    ? 'bg-feast-yellow text-black shadow-brutal -translate-y-0.5'
                    : 'bg-white text-black hover:bg-slate-100 shadow-brutal-sm'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border-3 border-black shadow-brutal p-8">
            <span className="text-4xl block mb-2">🔍</span>
            <p className="text-black font-display font-black text-lg uppercase mb-3">
              No se encontraron productos para "{searchQuery}".
            </p>
            <button
              onClick={() => { setSearchQuery(''); onSelectCategory('all'); }}
              className="btn-brutal-yellow px-5 py-2.5 rounded-xl text-xs"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p, pIdx) => {
              const isInCart = cartProductIds.includes(p.id);

              return (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl border-3 border-black shadow-brutal-md hover:shadow-brutal-xl hover:-translate-y-2 transition-all duration-200 overflow-hidden flex flex-col justify-between group"
                >
                  {/* Card Image Container with Comic border */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100 border-b-3 border-black">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                    
                    {p.badge && (
                      <span className="absolute top-3 left-3 bg-feast-yellow text-black font-display font-black text-[11px] uppercase px-3 py-1 rounded-full border-2 border-black shadow-brutal-sm rotate-1">
                        {p.badge}
                      </span>
                    )}

                    <span className="absolute bottom-3 left-3 bg-black text-white font-display font-black text-[10px] uppercase px-2.5 py-1 rounded-lg border-2 border-white shadow-brutal-sm">
                      {p.categoryLabel}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-black text-xl uppercase text-black mb-2 leading-tight group-hover:text-feast-blue transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-xs font-semibold text-black/80 mb-4 leading-relaxed">
                        {p.description}
                      </p>

                      <ul className="space-y-1.5 mb-5">
                        {p.features.map((f, i) => (
                          <li key={i} className="text-xs font-bold text-black flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-feast-blue border border-black shrink-0"></span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t-2 border-black space-y-3">
                      {/* Price Badge in Feastables Style */}
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-wider text-black/60">Estimado / Medida:</span>
                        <span className="font-display font-black text-xs uppercase bg-feast-yellow text-black px-3 py-1 rounded-lg border-2 border-black shadow-brutal-sm">
                          {p.priceEstimate}
                        </span>
                      </div>

                      {/* Action buttons with brutalist press effect */}
                      <div className="grid grid-cols-2 gap-2.5 pt-1">
                        <button
                          onClick={() => onAddToCart(p)}
                          className={`btn-brutal py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 ${
                            isInCart
                              ? 'bg-feast-lime text-black'
                              : 'bg-black text-white hover:bg-zinc-800'
                          }`}
                        >
                          {isInCart ? (
                            <>
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span>¡En Lista!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 stroke-[3]" />
                              <span>Sumar</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`https://wa.me/5491125809266?text=Hola%20Akimpress!%20Quisiera%20consultar%20por:%20${encodeURIComponent(p.name)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-brutal bg-feast-cyan hover:bg-cyan-300 text-black py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5"
                        >
                          <MessageCircle className="w-4 h-4 fill-black text-feast-cyan" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* MercadoShops Footer Banner in Feastables Style */}
        <div className="mt-14 bg-feast-yellow text-black border-4 border-black rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-brutal-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border-3 border-black shadow-brutal flex items-center justify-center text-black shrink-0 -rotate-3">
              <ShoppingBag className="w-8 h-8 stroke-[2.5] text-feast-blue" />
            </div>
            <div>
              <div className="inline-block bg-black text-feast-yellow font-display font-black text-[10px] uppercase px-2 py-0.5 rounded border border-black mb-1">
                COMPRA SEGURA CON MERCADO PAGO 💳
              </div>
              <h4 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-black">
                ¿QUERÉS COMPRAR DIRECTO CON CUOTAS Y ENVÍO?
              </h4>
              <p className="text-black font-semibold text-xs sm:text-sm mt-0.5">
                Entrá a nuestra tienda oficial en MercadoShops con stock al día y envíos a todo el país.
              </p>
            </div>
          </div>

          <a
            href="https://akimpressvinilos.mercadoshops.com.ar/"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 btn-brutal bg-white hover:bg-slate-50 text-black px-6 py-4 rounded-2xl text-xs flex items-center gap-2"
          >
            <span>akimpressvinilos.mercadoshops.com.ar</span>
            <ExternalLink className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>

      </div>
    </section>
  );
};

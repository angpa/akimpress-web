import React from 'react';
import { 
  Compass, 
  Layers, 
  Printer, 
  FileCheck, 
  ArrowRight, 
  Palette, 
  Check,
  Zap,
  Star
} from 'lucide-react';

interface ServicesOverviewProps {
  onSelectCategory: (category: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ onSelectCategory, onScrollToSection }) => {
  const services = [
    {
      id: 'tecnica',
      icon: <Compass className="w-8 h-8 text-black stroke-[2.5]" />,
      title: 'Librería Técnica & FADU',
      tagline: 'Especialistas en arquitectura y dibujo',
      description: 'Herramientas normadas para diseño, arquitectura y escuelas técnicas con stock permanente.',
      bullets: [
        'Tableros melamínicos con paralela (Plantec / Docta)',
        'Escalímetros triangulares, escuadras y reglas T',
        'Estilógrafos calibrados, portaminas 0.5, 0.7 y 2mm',
        'Papel vegetal, romaní, milimetrado y canson',
        'Planchas de corte autorreparables y cutters bisturí'
      ],
      cardBg: 'bg-[#FFF58A]',
      iconBg: 'bg-feast-yellow',
      sticker: '⭐ FAVORITO FADU',
      stickerColor: 'bg-black text-feast-yellow',
      actionText: 'Ver Artículos Técnicos'
    },
    {
      id: 'vinilos',
      icon: <Layers className="w-8 h-8 text-black stroke-[2.5]" />,
      title: 'Vinilos & Stickers Troquelados',
      tagline: 'Corte por plotter milimétrico',
      description: 'Autoadhesivos de primera calidad resistentes al agua, sol y uso intensivo en cualquier superficie.',
      bullets: [
        'Stickers troquelados con la forma exacta de tu logo',
        'Vinilos esmerilados para privacidad en vidrios y oficinas',
        'Vinilo microperforado para vidrieras y lunetas vehiculares',
        'Vinilos de corte decorativos para paredes y locales',
        'Vinilo termotransferible para remeras y buzos'
      ],
      cardBg: 'bg-[#FFD4EC]',
      iconBg: 'bg-feast-pink text-white',
      sticker: '🔥 ALTO IMPACTO',
      stickerColor: 'bg-feast-pink text-white',
      actionText: 'Cotizar Vinilos'
    },
    {
      id: 'imprenta',
      icon: <Printer className="w-8 h-8 text-black stroke-[2.5]" />,
      title: 'Imprenta & Merchandising',
      tagline: 'Corporativo y publicitario premium',
      description: 'Potenciá la imagen de tu marca con impresiones digitales de alta definición y acabados pro.',
      bullets: [
        'Tarjetas personales 350g mate o brillante',
        'Flyers y folletos publicitarios full color',
        'Talonarios comerciales y recetarios médicos con CAI',
        'Carpetas de presentación con solapa',
        'Banners Roll-Up autoenrollables 85x200 cm'
      ],
      cardBg: 'bg-[#C7F8FF]',
      iconBg: 'bg-feast-cyan',
      sticker: '⚡ FULL COLOR',
      stickerColor: 'bg-feast-blue text-white',
      actionText: 'Ver Imprenta Comercial'
    },
    {
      id: 'planos',
      icon: <FileCheck className="w-8 h-8 text-black stroke-[2.5]" />,
      title: 'Ploteo de Planos CAD',
      tagline: 'Doblado normalizado IRAM en el acto',
      description: 'Velocidad y fidelidad de líneas para arquitectos, ingenieros y constructoras de toda la ciudad.',
      bullets: [
        'Ploteo de planos color y monocromo (A0, A1, A2)',
        'Papel obra 80g y papel vegetal de alta densidad',
        'Anillados espiralados y encuadernación térmica',
        'Plastificados en caliente para planos y manuales',
        'Bajadas láser color y fotocopias de alta resolución'
      ],
      cardBg: 'bg-[#E5FF80]',
      iconBg: 'bg-feast-lime',
      sticker: '🚀 ENTREGA EN EL DÍA',
      stickerColor: 'bg-black text-feast-lime',
      actionText: 'Cotizar Ploteo'
    }
  ];

  const handleAction = (categoryId: string) => {
    onSelectCategory(categoryId);
    onScrollToSection('catalogo');
  };

  return (
    <section id="servicios" className="py-20 bg-[#FFFDEB] border-b-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title in Feastables Style */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-feast-yellow text-black border-3 border-black font-display font-black text-xs uppercase tracking-wider shadow-brutal-sm -rotate-1 mb-4">
            <Zap className="w-4 h-4 fill-black" />
            <span>NUESTRAS 4 ESPECIALIDADES TOP</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black drop-shadow-sm">
            TODO LO QUE TU PROYECTO NECESITA <br />
            <span className="bg-feast-cyan px-3 py-0.5 rounded-xl border-3 border-black shadow-brutal-sm inline-block mt-1">
              EN UN SOLO LUGAR
            </span>
          </h2>
          <p className="mt-4 text-black font-semibold text-base sm:text-lg max-w-2xl mx-auto">
            Combinamos tecnología de impresión digital y ploteo de última generación con la librería técnica más completa de Belgrano.
          </p>
        </div>

        {/* 4 Cards Grid - Feastables Pop Brutalism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => (
            <div 
              key={s.id}
              className={`${s.cardBg} rounded-3xl p-6 border-3 border-black shadow-brutal-md flex flex-col justify-between hover:-translate-y-2 hover:shadow-brutal-xl transition-all duration-200 relative group`}
            >
              {/* Corner Badge */}
              <div className="absolute -top-3 right-4">
                <span className={`${s.stickerColor} font-display font-black text-[10px] uppercase px-3 py-1 rounded-full border-2 border-black shadow-brutal-sm ${idx % 2 === 0 ? '-rotate-2' : 'rotate-2'}`}>
                  {s.sticker}
                </span>
              </div>

              <div>
                <div className={`w-16 h-16 rounded-2xl ${s.iconBg} border-3 border-black shadow-brutal-sm flex items-center justify-center mb-5 group-hover:rotate-6 transition-transform`}>
                  {s.icon}
                </div>
                
                <h3 className="font-display font-black text-2xl uppercase text-black mb-1 leading-tight">
                  {s.title}
                </h3>
                
                <p className="font-display font-bold text-xs uppercase tracking-wider text-black/70 mb-3">
                  {s.tagline}
                </p>
                
                <p className="text-xs font-semibold text-black/90 mb-5 leading-relaxed">
                  {s.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {s.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2 text-xs font-bold text-black">
                      <div className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleAction(s.id)}
                className="w-full btn-brutal bg-white hover:bg-black hover:text-white text-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>{s.actionText}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          ))}
        </div>

        {/* Custom Feastables Callout Banner */}
        <div className="mt-14 bg-feast-yellow text-black border-4 border-black rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-brutal-lg">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-block bg-black text-feast-yellow text-[11px] font-display font-black px-2.5 py-0.5 rounded-md uppercase mb-1">
              🔥 ¿TENÉS UN ARCHIVO O DISEÑO PERSONALIZADO?
            </div>
            <h4 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-black">
              MANDANOS TU PDF, AI O COREL Y TE COTIZAMOS AL TOQUE
            </h4>
            <p className="text-black font-semibold text-sm">
              Revisamos resolución, colores CMYK y tipografías en curvas para que quede perfecto.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => onScrollToSection('subir-archivos')}
              className="btn-brutal bg-white text-black px-5 py-3.5 rounded-xl text-xs"
            >
              Guía de Archivos
            </button>
            <a
              href="https://wa.me/5491125809266?text=Hola%20Akimpress!%20Tengo%20un%20archivo%20para%20presupuestar%20impresión."
              target="_blank"
              rel="noreferrer"
              className="btn-brutal-blue px-6 py-3.5 rounded-xl text-xs flex items-center gap-2"
            >
              <span>Enviar a WhatsApp</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

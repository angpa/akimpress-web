import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  MessageCircle, 
  Sparkles, 
  Check, 
  Copy, 
  Plus, 
  ShieldCheck, 
  Clock,
  Zap,
  Flame,
  Star
} from 'lucide-react';
import { Product } from '../data/catalog';

interface QuoteCalculatorProps {
  onAddCustomQuoteToCart: (item: {
    id: string;
    name: string;
    categoryLabel: string;
    details: string;
    priceEstimate: string;
  }) => void;
}

type JobType = 'stickers' | 'vinilo_m2' | 'planos' | 'tarjetas' | 'banner';

export const QuoteCalculator: React.FC<QuoteCalculatorProps> = ({ onAddCustomQuoteToCart }) => {
  const [jobType, setJobType] = useState<JobType>('stickers');

  // Stickers state
  const [stickerWidth, setStickerWidth] = useState<number>(5);
  const [stickerHeight, setStickerHeight] = useState<number>(5);
  const [stickerQty, setStickerQty] = useState<number>(100);
  const [stickerFinish, setStickerFinish] = useState<'brillante' | 'mate'>('brillante');

  // Vinilo m2 state
  const [viniloWidthM, setViniloWidthM] = useState<number>(1.2);
  const [viniloHeightM, setViniloHeightM] = useState<number>(1.0);
  const [viniloMaterial, setViniloMaterial] = useState<'esmerilado' | 'microperforado' | 'corte_color' | 'impreso_laminado'>('esmerilado');

  // Planos state
  const [planoFormat, setPlanoFormat] = useState<'A2' | 'A1' | 'A0'>('A1');
  const [planoPaper, setPlanoPaper] = useState<'obra80' | 'vegetal90'>('obra80');
  const [planoQty, setPlanoQty] = useState<number>(3);
  const [planoFold, setPlanoFold] = useState<boolean>(true);

  // Tarjetas state
  const [tarjetasQty, setTarjetasQty] = useState<number>(200);
  const [tarjetasLamination, setTarjetasLamination] = useState<'mate' | 'brillante' | 'sin_laminar'>('mate');
  const [tarjetasCorners, setTarjetasCorners] = useState<boolean>(false);

  // Banner state
  const [bannerSize, setBannerSize] = useState<'85x200' | '100x200'>('85x200');
  const [bannerIncludeStand, setBannerIncludeStand] = useState<boolean>(true);

  // Feedback states
  const [copied, setCopied] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);

  // Dynamic Calculation
  const quoteResult = useMemo(() => {
    let title = '';
    let details: string[] = [];
    let estimatedPrice = 0;

    if (jobType === 'stickers') {
      title = `Stickers Troquelados Personalizados`;
      const areaCm2 = stickerWidth * stickerHeight;
      const totalAreaM2 = (areaCm2 * stickerQty) / 10000;
      const baseM2Price = 22000;
      estimatedPrice = Math.max(9500, Math.round(totalAreaM2 * baseM2Price * 1.15));
      details = [
        `Medida: ${stickerWidth} x ${stickerHeight} cm`,
        `Cantidad: ${stickerQty} unidades`,
        `Terminación: Vinilo ${stickerFinish === 'brillante' ? 'Brillante' : 'Mate'}`,
        `Corte: Troquelado con la forma de tu diseño`
      ];
    } else if (jobType === 'vinilo_m2') {
      const areaM2 = viniloWidthM * viniloHeightM;
      let m2Rate = 21000;
      let matName = 'Vinilo Esmerilado Premium';
      if (viniloMaterial === 'microperforado') {
        m2Rate = 25000;
        matName = 'Vinilo Microperforado para Vidrieras';
      } else if (viniloMaterial === 'corte_color') {
        m2Rate = 23000;
        matName = 'Vinilo de Corte Color Puro';
      } else if (viniloMaterial === 'impreso_laminado') {
        m2Rate = 27000;
        matName = 'Vinilo Impreso con Laminado UV';
      }
      title = matName;
      estimatedPrice = Math.max(8000, Math.round(areaM2 * m2Rate));
      details = [
        `Medidas: ${viniloWidthM.toFixed(2)} m (ancho) x ${viniloHeightM.toFixed(2)} m (alto)`,
        `Superficie total: ${areaM2.toFixed(2)} m²`,
        `Material: ${matName}`,
        `Apto para interiores y vidrios a la calle`
      ];
    } else if (jobType === 'planos') {
      let unitPrice = 2800;
      if (planoFormat === 'A1') unitPrice = 4200;
      if (planoFormat === 'A0') unitPrice = 6400;
      if (planoPaper === 'vegetal90') unitPrice = Math.round(unitPrice * 1.6);
      if (planoFold) unitPrice += 300;

      title = `Ploteo de Planos CAD (${planoFormat})`;
      estimatedPrice = unitPrice * planoQty;
      details = [
        `Formato: ${planoFormat}`,
        `Papel: ${planoPaper === 'obra80' ? 'Papel Obra 80g' : 'Papel Vegetal 90g'}`,
        `Cantidad: ${planoQty} plano(s)`,
        planoFold ? 'Plegado normalizado IRAM incluido' : 'Entrega en rollo sin plegar'
      ];
    } else if (jobType === 'tarjetas') {
      title = `Tarjetas Personales 350g`;
      let unitCost = 75;
      if (tarjetasLamination === 'mate') unitCost = 90;
      if (tarjetasLamination === 'brillante') unitCost = 85;
      if (tarjetasCorners) unitCost += 15;

      estimatedPrice = Math.round(tarjetasQty * unitCost);
      details = [
        `Cantidad: ${tarjetasQty} tarjetas`,
        `Papel: Ilustración pesada 350 grs full color frente/dorso`,
        `Laminado: ${tarjetasLamination === 'mate' ? 'Polipropileno Mate' : tarjetasLamination === 'brillante' ? 'Brillante' : 'Sin laminar'}`,
        tarjetasCorners ? 'Puntas redondeadas de precisión' : 'Corte recto tradicional'
      ];
    } else if (jobType === 'banner') {
      title = `Banner Roll-Up Publicitario`;
      const baseBanner = bannerSize === '85x200' ? 42000 : 54000;
      estimatedPrice = bannerIncludeStand ? baseBanner : Math.round(baseBanner * 0.55);
      details = [
        `Medida: ${bannerSize === '85x200' ? '85 x 200 cm' : '100 x 200 cm'}`,
        `Lona: Frontlight Mate 13oz de alta resolución`,
        bannerIncludeStand 
          ? 'Incluye estructura autoenrollable de aluminio y bolso' 
          : 'Sólo impresión de lona de recambio'
      ];
    }

    return {
      title,
      details,
      estimatedPrice: `$${estimatedPrice.toLocaleString('es-AR')}`
    };
  }, [
    jobType,
    stickerWidth, stickerHeight, stickerQty, stickerFinish,
    viniloWidthM, viniloHeightM, viniloMaterial,
    planoFormat, planoPaper, planoQty, planoFold,
    tarjetasQty, tarjetasLamination, tarjetasCorners,
    bannerSize, bannerIncludeStand
  ]);

  const whatsappMessage = useMemo(() => {
    const text = `Hola Akimpress! Cotice en su web el siguiente trabajo:
📌 *${quoteResult.title}*
${quoteResult.details.map(d => `• ${d}`).join('\n')}
💵 *Estimado Web:* ${quoteResult.estimatedPrice}

¿Podrían confirmarme disponibilidad y plazo de entrega? ¡Gracias!`;
    return encodeURIComponent(text);
  }, [quoteResult]);

  const handleCopy = () => {
    const plain = `${quoteResult.title}\n${quoteResult.details.join('\n')}\nEstimado: ${quoteResult.estimatedPrice}`;
    navigator.clipboard.writeText(plain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCart = () => {
    onAddCustomQuoteToCart({
      id: `cotiz-${Date.now()}`,
      name: quoteResult.title,
      categoryLabel: 'Cotización a Medida',
      details: quoteResult.details.join(' | '),
      priceEstimate: quoteResult.estimatedPrice
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="cotizador" className="py-20 bg-feast-blue text-white relative overflow-hidden border-b-3 border-black">
      {/* Halftone dot pattern */}
      <div className="absolute inset-0 bg-dots-white opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Title Feastables Pop */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-feast-yellow text-black border-3 border-black font-display font-black text-xs uppercase tracking-wider shadow-brutal mb-3 -rotate-1">
            <Zap className="w-4 h-4 fill-black" />
            <span>⚡ COTIZADOR ONLINE EXPRESS EN EL ACTO</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white drop-shadow-[3px_3px_0px_#000]">
            CALCULÁ TU PRESUPUESTO AL TOQUE
          </h2>
          <p className="mt-3 text-white font-bold text-sm sm:text-base max-w-2xl mx-auto">
            Configurá tu trabajo gráfico, cambiá medidas o cantidades y enviá la cotización lista por WhatsApp.
          </p>
        </div>

        {/* Main Grid: Configurator left, Result right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input Form Controls */}
          <div className="lg:col-span-7 bg-[#FFFDEB] text-black border-4 border-black rounded-3xl p-6 sm:p-8 shadow-brutal-xl">
            
            {/* Step 1: Select Type */}
            <label className="block font-display font-black text-xs uppercase tracking-wider text-black mb-3">
              1. Elegí el tipo de producto:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-8">
              {[
                { id: 'stickers', label: '🏷️ Stickers & Calcos' },
                { id: 'vinilo_m2', label: '🪟 Vinilo por m²' },
                { id: 'planos', label: '📐 Ploteo de Planos' },
                { id: 'tarjetas', label: '💳 Tarjetas 350g' },
                { id: 'banner', label: '🚩 Banner Roll-Up' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setJobType(btn.id as JobType)}
                  className={`p-3 rounded-2xl font-display font-black text-xs uppercase tracking-wider text-left transition-all border-3 border-black select-none ${
                    jobType === btn.id
                      ? 'bg-feast-yellow text-black shadow-brutal -translate-y-0.5'
                      : 'bg-white text-black hover:bg-slate-100 shadow-brutal-sm'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Step 2: Dynamic Fields per Job Type */}
            <div className="space-y-6 pt-4 border-t-3 border-black">
              
              {/* STICKERS */}
              {jobType === 'stickers' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-display font-black text-xs uppercase text-black mb-1.5">
                        Ancho del sticker (cm):
                      </label>
                      <input
                        type="number"
                        min="2"
                        max="50"
                        value={stickerWidth}
                        onChange={(e) => setStickerWidth(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-white border-3 border-black rounded-xl px-4 py-3 font-display font-black text-sm text-black focus:outline-none focus:bg-feast-yellow/20 shadow-brutal-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-display font-black text-xs uppercase text-black mb-1.5">
                        Alto del sticker (cm):
                      </label>
                      <input
                        type="number"
                        min="2"
                        max="50"
                        value={stickerHeight}
                        onChange={(e) => setStickerHeight(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-white border-3 border-black rounded-xl px-4 py-3 font-display font-black text-sm text-black focus:outline-none focus:bg-feast-yellow/20 shadow-brutal-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-display font-black text-xs uppercase text-black mb-1.5">
                      Cantidad de stickers:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[50, 100, 250, 500].map((q) => (
                        <button
                          key={q}
                          onClick={() => setStickerQty(q)}
                          className={`py-2.5 font-display font-black text-xs uppercase rounded-xl border-3 border-black transition-all ${
                            stickerQty === q
                              ? 'bg-feast-pink text-white shadow-brutal-sm -translate-y-0.5'
                              : 'bg-white text-black hover:bg-slate-100 shadow-brutal-sm'
                          }`}
                        >
                          {q} u.
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-display font-black text-xs uppercase text-black mb-1.5">
                      Terminación del Vinilo:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => setStickerFinish('brillante')}
                        className={`py-3 px-3 font-display font-black text-xs uppercase rounded-xl border-3 border-black transition-all ${
                          stickerFinish === 'brillante'
                            ? 'bg-feast-lime text-black shadow-brutal-sm -translate-y-0.5'
                            : 'bg-white text-black hover:bg-slate-100 shadow-brutal-sm'
                        }`}
                      >
                        ✨ Vinilo Brillante
                      </button>
                      <button
                        onClick={() => setStickerFinish('mate')}
                        className={`py-3 px-3 font-display font-black text-xs uppercase rounded-xl border-3 border-black transition-all ${
                          stickerFinish === 'mate'
                            ? 'bg-feast-lime text-black shadow-brutal-sm -translate-y-0.5'
                            : 'bg-white text-black hover:bg-slate-100 shadow-brutal-sm'
                        }`}
                      >
                        🎨 Vinilo Mate
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* VINILO POR M2 */}
              {jobType === 'vinilo_m2' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-display font-black text-xs uppercase text-black mb-1.5">
                        Ancho (metros):
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.3"
                        max="20"
                        value={viniloWidthM}
                        onChange={(e) => setViniloWidthM(Math.max(0.1, Number(e.target.value)))}
                        className="w-full bg-white border-3 border-black rounded-xl px-4 py-3 font-display font-black text-sm text-black focus:outline-none focus:bg-feast-yellow/20 shadow-brutal-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-display font-black text-xs uppercase text-black mb-1.5">
                        Alto (metros):
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.3"
                        max="20"
                        value={viniloHeightM}
                        onChange={(e) => setViniloHeightM(Math.max(0.1, Number(e.target.value)))}
                        className="w-full bg-white border-3 border-black rounded-xl px-4 py-3 font-display font-black text-sm text-black focus:outline-none focus:bg-feast-yellow/20 shadow-brutal-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-display font-black text-xs uppercase text-black mb-1.5">
                      Tipo de vinilo / Material:
                    </label>
                    <select
                      value={viniloMaterial}
                      onChange={(e) => setViniloMaterial(e.target.value as any)}
                      className="w-full bg-white border-3 border-black rounded-xl px-4 py-3 font-display font-bold text-xs uppercase text-black focus:outline-none shadow-brutal-sm"
                    >
                      <option value="esmerilado">Vinilo Esmerilado (Privacidad oficinas & vidrios)</option>
                      <option value="microperforado">Vinilo Microperforado (Vidrieras y vehículos)</option>
                      <option value="corte_color">Vinilo de Corte Colores Puros (Plotter)</option>
                      <option value="impreso_laminado">Vinilo Full Color Impreso + Laminado UV</option>
                    </select>
                  </div>
                </div>
              )}

              {/* PLANOS */}
              {jobType === 'planos' && (
                <div className="space-y-5">
                  <div>
                    <label className="block font-display font-black text-xs uppercase text-black mb-1.5">
                      Formato de Plano CAD:
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {(['A2', 'A1', 'A0'] as const).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setPlanoFormat(fmt)}
                          className={`py-3 font-display font-black text-sm uppercase rounded-xl border-3 border-black transition-all ${
                            planoFormat === fmt
                              ? 'bg-feast-pink text-white shadow-brutal-sm -translate-y-0.5'
                              : 'bg-white text-black hover:bg-slate-100 shadow-brutal-sm'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-display font-black text-xs uppercase text-black mb-1.5">
                        Tipo de Papel:
                      </label>
                      <select
                        value={planoPaper}
                        onChange={(e) => setPlanoPaper(e.target.value as any)}
                        className="w-full bg-white border-3 border-black rounded-xl px-3 py-3 font-display font-bold text-xs uppercase text-black focus:outline-none shadow-brutal-sm"
                      >
                        <option value="obra80">Papel Obra 80g</option>
                        <option value="vegetal90">Papel Vegetal 90g</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-display font-black text-xs uppercase text-black mb-1.5">
                        Cantidad de Planos:
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="200"
                        value={planoQty}
                        onChange={(e) => setPlanoQty(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-white border-3 border-black rounded-xl px-4 py-3 font-display font-black text-sm text-black focus:outline-none shadow-brutal-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="planoFold"
                      checked={planoFold}
                      onChange={(e) => setPlanoFold(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-black accent-black cursor-pointer"
                    />
                    <label htmlFor="planoFold" className="font-display font-bold text-xs uppercase text-black cursor-pointer">
                      Incluir doblado normalizado IRAM para carpeta de obra
                    </label>
                  </div>
                </div>
              )}

              {/* TARJETAS */}
              {jobType === 'tarjetas' && (
                <div className="space-y-5">
                  <div>
                    <label className="block font-display font-black text-xs uppercase text-black mb-1.5">
                      Cantidad de Tarjetas:
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[100, 200, 500, 1000].map((qty) => (
                        <button
                          key={qty}
                          onClick={() => setTarjetasQty(qty)}
                          className={`py-2.5 font-display font-black text-xs uppercase rounded-xl border-3 border-black transition-all ${
                            tarjetasQty === qty
                              ? 'bg-feast-cyan text-black shadow-brutal-sm -translate-y-0.5'
                              : 'bg-white text-black hover:bg-slate-100 shadow-brutal-sm'
                          }`}
                        >
                          {qty}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-display font-black text-xs uppercase text-black mb-1.5">
                      Laminado Protector:
                    </label>
                    <select
                      value={tarjetasLamination}
                      onChange={(e) => setTarjetasLamination(e.target.value as any)}
                      className="w-full bg-white border-3 border-black rounded-xl px-4 py-3 font-display font-bold text-xs uppercase text-black focus:outline-none shadow-brutal-sm"
                    >
                      <option value="mate">Polipropileno Mate (Soft Touch elegante)</option>
                      <option value="brillante">Polipropileno Brillante</option>
                      <option value="sin_laminar">Sin laminar (Económicas)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="corners"
                      checked={tarjetasCorners}
                      onChange={(e) => setTarjetasCorners(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-black accent-black cursor-pointer"
                    />
                    <label htmlFor="corners" className="font-display font-bold text-xs uppercase text-black cursor-pointer">
                      Puntas redondeadas de precisión (+ terminación moderna)
                    </label>
                  </div>
                </div>
              )}

              {/* BANNER ROLL UP */}
              {jobType === 'banner' && (
                <div className="space-y-5">
                  <div>
                    <label className="block font-display font-black text-xs uppercase text-black mb-1.5">
                      Medida de Banner Roll-Up:
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => setBannerSize('85x200')}
                        className={`py-3 font-display font-black text-xs uppercase rounded-xl border-3 border-black transition-all ${
                          bannerSize === '85x200'
                            ? 'bg-feast-yellow text-black shadow-brutal-sm -translate-y-0.5'
                            : 'bg-white text-black hover:bg-slate-100 shadow-brutal-sm'
                        }`}
                      >
                        85 x 200 cm (Estándar)
                      </button>
                      <button
                        onClick={() => setBannerSize('100x200')}
                        className={`py-3 font-display font-black text-xs uppercase rounded-xl border-3 border-black transition-all ${
                          bannerSize === '100x200'
                            ? 'bg-feast-yellow text-black shadow-brutal-sm -translate-y-0.5'
                            : 'bg-white text-black hover:bg-slate-100 shadow-brutal-sm'
                        }`}
                      >
                        100 x 200 cm (Grande)
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="stand"
                      checked={bannerIncludeStand}
                      onChange={(e) => setBannerIncludeStand(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-black accent-black cursor-pointer"
                    />
                    <label htmlFor="stand" className="font-display font-bold text-xs uppercase text-black cursor-pointer">
                      Incluye estructura de aluminio autoenrollable + bolso con cierre
                    </label>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right: Calculated Summary & Actions in Feastables Yellow */}
          <div className="lg:col-span-5 bg-feast-yellow text-black border-4 border-black rounded-3xl p-6 sm:p-8 shadow-brutal-xl relative">
            
            <div className="flex items-center justify-between pb-4 border-b-3 border-black mb-5">
              <span className="font-display font-black text-xs uppercase tracking-wider bg-black text-white px-2.5 py-1 rounded-md">
                RESUMEN ESTIMADO
              </span>
              <span className="font-display font-black text-[11px] uppercase bg-feast-lime text-black px-2.5 py-1 rounded-full border-2 border-black flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>En el acto</span>
              </span>
            </div>

            <h3 className="font-display font-black text-2xl uppercase text-black mb-3 leading-tight">
              {quoteResult.title}
            </h3>

            {/* Bullet specifications */}
            <div className="bg-white rounded-2xl p-4 border-3 border-black mb-6 space-y-2 shadow-brutal-sm">
              {quoteResult.details.map((d, index) => (
                <div key={index} className="flex items-start gap-2 text-xs font-bold text-black">
                  <div className="w-2 h-2 rounded-full bg-feast-pink border border-black mt-1.5 shrink-0"></div>
                  <span>{d}</span>
                </div>
              ))}
            </div>

            {/* Price display badge */}
            <div className="bg-white border-3 border-black rounded-2xl p-4 mb-6 shadow-brutal-md text-center">
              <div className="font-display font-black text-xs uppercase text-black/60 mb-1">
                VALOR ESTIMADO APROXIMADO:
              </div>
              <div className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tight text-feast-blue drop-shadow-sm">
                {quoteResult.estimatedPrice} <span className="text-base text-black font-black">ARS</span>
              </div>
              <p className="text-[10px] font-bold text-black/70 mt-1">
                * Sujeto a revisión de archivo original y especificaciones finales.
              </p>
            </div>

            {/* Actions: WhatsApp, Add to Cart, Copy */}
            <div className="space-y-3">
              <a
                href={`https://wa.me/5491125809266?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full btn-brutal-lime py-4 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-brutal-md"
              >
                <MessageCircle className="w-5 h-5 fill-black text-feast-lime" />
                <span>Pedir este presupuesto por WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="btn-brutal bg-black text-white hover:bg-zinc-800 py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-feast-lime stroke-[3]" />
                      <span>¡Guardado!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Guardar en Lista</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopy}
                  className="btn-brutal bg-white text-black py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-feast-blue stroke-[3]" />
                      <span>¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Texto</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Guarantee badge */}
            <div className="mt-6 pt-4 border-t-2 border-black flex items-center gap-2.5 font-bold text-black text-xs">
              <ShieldCheck className="w-5 h-5 text-black shrink-0 stroke-[2.5]" />
              <span>Garantía Akimpress • Retiro en Belgrano o envíos a todo el país.</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

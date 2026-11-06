import React, { useState } from 'react';
import { Layers, Sparkles, CheckCircle2, Zap, FileCode, Shield } from 'lucide-react';

export const IsometricPrintLayers: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const layersInfo = [
    {
      id: 1,
      title: 'Laminado Protector UV',
      tag: '.LAMINADO',
      subtitle: 'Polipropileno mate o brillante',
      desc: 'Protege contra rayos UV, agua, rayaduras y productos de limpieza. Hace que el vinilo dure años al exterior.',
      color: '#00F0FF',
      badge: 'Protección Total'
    },
    {
      id: 2,
      title: 'Tinta CMYK HD (300 DPI)',
      tag: '.CMYK / COLOR',
      subtitle: 'Impresión digital de alta fidelidad',
      desc: 'Microgotas de tinta eco-solvente de alta densidad. Colores vivos calibrados sin bandeado.',
      color: '#FF007A',
      badge: 'Fidelidad Cromática'
    },
    {
      id: 3,
      title: 'Sustrato Base / Material',
      tag: '.SUSTRATO',
      subtitle: 'Vinilo polimérico / Ilustración 350g',
      desc: 'Base autoadhesiva de alto agarre para vidrios, vehículos y paredes; o cartulina pesada para tarjetería.',
      color: '#FFE500',
      badge: 'Resistencia Estructural'
    },
    {
      id: 4,
      title: 'Trazado de Troquel / Corte',
      tag: '.PLOTTER / CORTE',
      subtitle: 'Vector milimétrico de precisión',
      desc: 'Línea vectorial que guía la cuchilla del plotter para recortar calcos con la silueta exacta de tu diseño.',
      color: '#CCFF00',
      badge: 'Corte Milimétrico'
    }
  ];

  return (
    <div className="bg-black text-white border-4 border-black rounded-3xl p-6 sm:p-8 shadow-brutal-xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-feast-blue/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-feast-pink/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b-2 border-zinc-800 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-feast-yellow text-black font-display font-black text-xs uppercase px-3 py-1 rounded-full border-2 border-white shadow-brutal-sm mb-2">
            <Layers className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>ANATOMÍA EN CAPAS • TECNOLOGÍA GRÁFICA</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
            ¿Cómo se compone una impresión pro?
          </h3>
          <p className="text-xs sm:text-sm font-bold text-zinc-400 mt-1">
            Al igual que en Vite o el software de diseño, cada trabajo físico se construye capa por capa. Pasá el mouse por las capas:
          </p>
        </div>

        <span className="hidden sm:inline-block bg-zinc-900 border border-zinc-700 text-zinc-300 font-display font-black text-xs uppercase px-3 py-1.5 rounded-xl self-start">
          ⚡ 4 CAPAS DE PRODUCCIÓN
        </span>
      </div>

      {/* Interactive Main Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 relative z-10">
        
        {/* Left: Isometric SVG Diagram */}
        <div className="lg:col-span-7 flex items-center justify-center relative min-h-[380px] sm:min-h-[440px]">
          
          <svg 
            viewBox="0 0 500 480" 
            className="w-full max-w-[460px] h-auto drop-shadow-2xl select-none"
          >
            <defs>
              {/* Core 3D Slab Gradients */}
              <linearGradient id="coreTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a1c24" />
                <stop offset="100%" stopColor="#0d0e14" />
              </linearGradient>

              <linearGradient id="coreFront" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8000FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#005BFF" stopOpacity="0.4" />
              </linearGradient>

              <linearGradient id="coreSide" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF007A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#550080" stopOpacity="0.4" />
              </linearGradient>

              {/* Layer Gradients */}
              <linearGradient id="cyanGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#005BFF" stopOpacity="0.1" />
              </linearGradient>

              <linearGradient id="pinkGlass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF007A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8000FF" stopOpacity="0.1" />
              </linearGradient>

              <linearGradient id="glowGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE500" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF007A" stopOpacity="0.6" />
              </linearGradient>
            </defs>

            {/* === SATELLITE CONNECTOR LINES === */}
            <g stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="3 3">
              {/* Connector to .PDF (Top Left) */}
              <line x1="80" y1="210" x2="170" y2="250" />
              {/* Connector to .AI (Bottom Left) */}
              <line x1="75" y1="360" x2="175" y2="340" />
              {/* Connector to CMYK (Bottom Right) */}
              <line x1="420" y1="350" x2="330" y2="335" />
              {/* Connector to 300 DPI (Top Right) */}
              <line x1="410" y1="180" x2="335" y2="215" />
            </g>

            {/* === LAYER 4 (BOTTOM): LÍNEA DE TROQUEL & CORTE === */}
            <g 
              className={`transition-all duration-300 cursor-pointer ${
                activeLayer === 4 ? 'opacity-100 scale-105' : 'opacity-85 hover:opacity-100'
              }`}
              onMouseEnter={() => setActiveLayer(4)}
              onMouseLeave={() => setActiveLayer(null)}
              transform={activeLayer === 4 ? "translate(0, 10)" : "translate(0, 0)"}
            >
              <polygon
                points="250,330 380,265 250,200 120,265"
                fill="none"
                stroke="#CCFF00"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                className="transition-all"
              />
              <text x="250" y="320" fill="#CCFF00" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                .TROQUEL / PLOTTER
              </text>
            </g>

            {/* === LAYER 3 (CORE THICK SLAB): SUSTRATO VINILO / BASE === */}
            <g 
              className={`transition-all duration-300 cursor-pointer ${
                activeLayer === 3 ? 'opacity-100 scale-105' : 'opacity-95 hover:opacity-100'
              }`}
              onMouseEnter={() => setActiveLayer(3)}
              onMouseLeave={() => setActiveLayer(null)}
              transform={activeLayer === 3 ? "translate(0, -6)" : "translate(0, 0)"}
            >
              {/* 3D Slab - Front Thickness */}
              <polygon
                points="130,270 250,330 250,350 130,290"
                fill="url(#coreFront)"
                stroke="#8000FF"
                strokeWidth="1.5"
              />
              {/* 3D Slab - Right Thickness */}
              <polygon
                points="250,330 370,270 370,290 250,350"
                fill="url(#coreSide)"
                stroke="#FF007A"
                strokeWidth="1.5"
              />
              {/* 3D Slab - Top Face */}
              <polygon
                points="250,210 370,270 250,330 130,270"
                fill="url(#coreTop)"
                stroke="#A855F7"
                strokeWidth="2"
              />

              {/* Central Glowing Printer Icon */}
              <g transform="translate(250, 270)">
                <circle cx="0" cy="0" r="22" fill="#FFE500" stroke="#000" strokeWidth="2.5" />
                <path 
                  d="M -9 -7 L 9 -7 L 9 -3 L -9 -3 Z M -11 -2 L 11 -2 L 11 6 L -11 6 Z M -7 2 L 7 2 L 7 10 L -7 10 Z" 
                  fill="#000" 
                />
              </g>

              <text x="250" y="315" fill="#FFE500" fontSize="12" fontFamily="monospace" fontWeight="900" textAnchor="middle" letterSpacing="2">
                .SUSTRATO 350G
              </text>
            </g>

            {/* === LAYER 2 (MIDDLE): TINTA CMYK DE ALTA DEFINICIÓN === */}
            <g 
              className={`transition-all duration-300 cursor-pointer ${
                activeLayer === 2 ? 'opacity-100 -translate-y-4' : 'opacity-85 hover:opacity-100'
              }`}
              onMouseEnter={() => setActiveLayer(2)}
              onMouseLeave={() => setActiveLayer(null)}
              transform={activeLayer === 2 ? "translate(0, -18)" : "translate(0, 0)"}
            >
              <polygon
                points="250,150 380,215 250,280 120,215"
                fill="url(#pinkGlass)"
                stroke="#FF007A"
                strokeWidth="2.5"
                className="transition-all"
              />
              <text x="250" y="240" fill="#FF007A" fontSize="12" fontFamily="monospace" fontWeight="900" textAnchor="middle" letterSpacing="2">
                .CMYK 300DPI
              </text>
            </g>

            {/* === LAYER 1 (TOP): LAMINADO PROTECTOR UV === */}
            <g 
              className={`transition-all duration-300 cursor-pointer ${
                activeLayer === 1 ? 'opacity-100 -translate-y-6' : 'opacity-85 hover:opacity-100'
              }`}
              onMouseEnter={() => setActiveLayer(1)}
              onMouseLeave={() => setActiveLayer(null)}
              transform={activeLayer === 1 ? "translate(0, -32)" : "translate(0, 0)"}
            >
              <polygon
                points="250,90 380,155 250,220 120,155"
                fill="url(#cyanGlass)"
                stroke="#00F0FF"
                strokeWidth="2.5"
                className="transition-all"
              />
              <text x="250" y="165" fill="#00F0FF" fontSize="12" fontFamily="monospace" fontWeight="900" textAnchor="middle" letterSpacing="2">
                .LAMINADO UV
              </text>
            </g>

            {/* === FLOATING SATELLITE CHIPS (Vercel / Vite Style) === */}

            {/* Top Left: .PDF */}
            <g transform="translate(45, 185)" className="cursor-pointer hover:scale-110 transition-transform">
              <polygon points="35,10 65,25 35,40 5,25" fill="#18181b" stroke="#00F0FF" strokeWidth="2" />
              <polygon points="5,25 35,40 35,46 5,31" fill="#005BFF" stroke="#00F0FF" strokeWidth="1" />
              <polygon points="35,40 65,25 65,31 35,46" fill="#003ECC" stroke="#00F0FF" strokeWidth="1" />
              <text x="35" y="29" fill="#FFFFFF" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">.PDF</text>
            </g>

            {/* Bottom Left: .AI */}
            <g transform="translate(40, 335)" className="cursor-pointer hover:scale-110 transition-transform">
              <polygon points="35,10 65,25 35,40 5,25" fill="#18181b" stroke="#FF5500" strokeWidth="2" />
              <polygon points="5,25 35,40 35,46 5,31" fill="#ea580c" stroke="#FF5500" strokeWidth="1" />
              <polygon points="35,40 65,25 65,31 35,46" fill="#c2410c" stroke="#FF5500" strokeWidth="1" />
              <text x="35" y="29" fill="#FFFFFF" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">.AI</text>
            </g>

            {/* Top Right: 300 DPI */}
            <g transform="translate(385, 155)" className="cursor-pointer hover:scale-110 transition-transform">
              <polygon points="35,10 65,25 35,40 5,25" fill="#18181b" stroke="#FF007A" strokeWidth="2" />
              <polygon points="5,25 35,40 35,46 5,31" fill="#be185d" stroke="#FF007A" strokeWidth="1" />
              <polygon points="35,40 65,25 65,31 35,46" fill="#9d174d" stroke="#FF007A" strokeWidth="1" />
              <text x="35" y="29" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">300DPI</text>
            </g>

            {/* Bottom Right: .CDR */}
            <g transform="translate(395, 325)" className="cursor-pointer hover:scale-110 transition-transform">
              <polygon points="35,10 65,25 35,40 5,25" fill="#18181b" stroke="#CCFF00" strokeWidth="2" />
              <polygon points="5,25 35,40 35,46 5,31" fill="#65a30d" stroke="#CCFF00" strokeWidth="1" />
              <polygon points="35,40 65,25 65,31 35,46" fill="#4d7c0f" stroke="#CCFF00" strokeWidth="1" />
              <text x="35" y="29" fill="#FFFFFF" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">.CDR</text>
            </g>

          </svg>
        </div>

        {/* Right: Explanatory Interactive Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-display font-black uppercase text-zinc-400 mb-1">
            DESGLOSE TÉCNICO DE CALIDAD:
          </div>

          {layersInfo.map((l) => {
            const isHovered = activeLayer === l.id;
            return (
              <div
                key={l.id}
                onMouseEnter={() => setActiveLayer(l.id)}
                onMouseLeave={() => setActiveLayer(null)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  isHovered 
                    ? 'bg-zinc-900 border-white shadow-brutal-sm -translate-x-1' 
                    : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full border border-black shrink-0" 
                      style={{ backgroundColor: l.color }}
                    />
                    <span className="font-display font-black text-sm uppercase text-white">
                      {l.title}
                    </span>
                  </div>
                  <span 
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-zinc-700"
                    style={{ color: l.color }}
                  >
                    {l.tag}
                  </span>
                </div>

                <div className="text-[11px] font-bold text-zinc-300 mb-1">
                  {l.subtitle}
                </div>

                <p className="text-[11px] text-zinc-400 leading-snug">
                  {l.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* Footer Banner */}
      <div className="mt-8 pt-4 border-t-2 border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-zinc-400">
        <span className="flex items-center gap-1.5 text-feast-lime">
          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          <span>Cumplimiento estricto de estándares normados IRAM y perfiles de color Fogra39</span>
        </span>
        <span className="text-[11px] text-zinc-500">
          Inspirado en la visualización isométrica de Vite & Devtools
        </span>
      </div>

    </div>
  );
};

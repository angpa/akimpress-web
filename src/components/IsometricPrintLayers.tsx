import React, { useState } from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';

export const IsometricPrintLayers: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const layersInfo = [
    {
      id: 1,
      title: 'Laminado Protector UV',
      tag: '.LAMINADO',
      format: '.PDF',
      subtitle: 'Polipropileno mate o brillante',
      desc: 'Film transparente de alta resistencia que sella la impresión contra sol, agua y rayaduras.',
      color: '#00F0FF',
      accentBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
    },
    {
      id: 2,
      title: 'Tinta CMYK HD (300 DPI)',
      tag: '.CMYK / COLOR',
      format: '.AI',
      subtitle: 'Impresión digital calibrada Fogra39',
      desc: 'Microgotas de pigmento puro de alta densidad. Colores vivos sin bandeado ni pixelación.',
      color: '#FF007A',
      accentBg: 'bg-pink-500/20 text-pink-300 border-pink-500/50'
    },
    {
      id: 3,
      title: 'Sustrato Base / Material',
      tag: '.SUSTRATO',
      format: 'CORE',
      subtitle: 'Vinilo polimérico o ilustración 350g',
      desc: 'El soporte físico estructural: adhesivo alemán de larga vida o cartulina pesada de alta rigidez.',
      color: '#FFE500',
      accentBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
    },
    {
      id: 4,
      title: 'Trazado de Troquel / Corte',
      tag: '.PLOTTER / CORTE',
      format: '.CDR',
      subtitle: 'Vector milimétrico de precisión',
      desc: 'Línea de corte digital por plotter de cuchilla tangencial que recorta la silueta exacta.',
      color: '#CCFF00',
      accentBg: 'bg-lime-500/20 text-lime-300 border-lime-500/50'
    }
  ];

  return (
    <div className="bg-[#090a0f] text-white border-4 border-black rounded-3xl p-6 sm:p-8 shadow-brutal-xl relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-zinc-800 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-feast-yellow text-black font-display font-black text-xs uppercase px-3 py-1 rounded-full border-2 border-white shadow-brutal-sm mb-2">
            <Layers className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>ANATOMÍA EN CAPAS • ESTILO VITE ISOMÉTRICO</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
            ¿Cómo se compone una impresión pro?
          </h3>
          <p className="text-xs sm:text-sm font-bold text-zinc-400 mt-1">
            Cada trabajo gráfico se construye en capas superpuestas de alta precisión. Seleccioná una capa para inspeccionar:
          </p>
        </div>

        <span className="hidden sm:inline-block bg-zinc-900 border border-zinc-700 text-zinc-300 font-display font-black text-xs uppercase px-3 py-1.5 rounded-xl self-start">
          ⚡ 4 CAPAS DE PRODUCCIÓN
        </span>
      </div>

      {/* Interactive Main Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 relative z-10">
        
        {/* Left: Pure Isometric SVG Canvas */}
        <div className="lg:col-span-7 flex items-center justify-center relative min-h-[360px] sm:min-h-[440px]">
          
          <svg 
            viewBox="0 0 520 460" 
            className="w-full max-w-[480px] h-auto select-none overflow-visible"
          >
            <defs>
              {/* Gradients for core slab */}
              <linearGradient id="slabTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e202a" />
                <stop offset="100%" stopColor="#0d0e14" />
              </linearGradient>

              <linearGradient id="slabFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8000FF" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#005BFF" stopOpacity="0.3" />
              </linearGradient>

              <linearGradient id="slabSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF007A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8000FF" stopOpacity="0.3" />
              </linearGradient>

              <linearGradient id="cyanGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#005BFF" stopOpacity="0.08" />
              </linearGradient>

              <linearGradient id="pinkGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF007A" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#8000FF" stopOpacity="0.08" />
              </linearGradient>

              {/* Satellite Chip Gradient */}
              <linearGradient id="chipTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#252733" />
                <stop offset="100%" stopColor="#12131a" />
              </linearGradient>
            </defs>

            {/* ========================================================= */}
            {/* LAYER 4 (BASE): TROQUEL & CORTE POR PLOTTER              */}
            {/* ========================================================= */}
            <g 
              className="cursor-pointer transition-transform duration-300 ease-out"
              onMouseEnter={() => setActiveLayer(4)}
              onMouseLeave={() => setActiveLayer(null)}
              transform={activeLayer === 4 ? "translate(0, 10)" : "translate(0, 0)"}
            >
              {/* Connector line to .CDR */}
              <line 
                x1="390" y1="365" x2="350" y2="345" 
                stroke="#CCFF00" 
                strokeWidth={activeLayer === 4 ? "2" : "1.2"} 
                strokeDasharray="3 3"
                strokeOpacity={activeLayer === 4 ? "0.9" : "0.4"}
              />

              {/* Dashed Isometric Outline */}
              <g transform="translate(260, 340) scale(1, 0.55) rotate(45)">
                <rect 
                  x="-95" y="-95" width="190" height="190" rx="24"
                  fill="none" 
                  stroke="#CCFF00" 
                  strokeWidth="2.5" 
                  strokeDasharray="6 4"
                  opacity={activeLayer === 4 ? 1 : 0.75}
                />
              </g>

              {/* Label */}
              <text 
                x="260" y="345" 
                fill="#CCFF00" 
                fontSize="11" 
                fontFamily="monospace" 
                fontWeight="900" 
                textAnchor="middle" 
                letterSpacing="2"
                opacity={activeLayer === 4 ? 1 : 0.8}
              >
                .TROQUEL VECTORIAL
              </text>

              {/* Satellite .CDR Chip (No jumping hover transform!) */}
              <g 
                transform="translate(425, 375)" 
                className="transition-opacity duration-200"
                opacity={activeLayer === 4 ? 1 : 0.85}
              >
                {/* 3D Chip Thickness */}
                <polygon points="-18,-3 0,7 0,13 -18,3" fill="#4d7c0f" stroke="#CCFF00" strokeWidth="1" />
                <polygon points="0,7 18,-3 18,3 0,13" fill="#65a30d" stroke="#CCFF00" strokeWidth="1" />
                {/* Top Face */}
                <g transform="scale(1, 0.55) rotate(45)">
                  <rect x="-13" y="-13" width="26" height="26" rx="4" fill="url(#chipTopGrad)" stroke="#CCFF00" strokeWidth="1.5" />
                </g>
                <text x="0" y="2" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">.CDR</text>
              </g>
            </g>


            {/* ========================================================= */}
            {/* LAYER 3 (CORE 3D SLAB): SUSTRATO VINILO 350G             */}
            {/* ========================================================= */}
            <g 
              className="cursor-pointer transition-transform duration-300 ease-out"
              onMouseEnter={() => setActiveLayer(3)}
              onMouseLeave={() => setActiveLayer(null)}
              transform={activeLayer === 3 ? "translate(0, -6)" : "translate(0, 0)"}
            >
              {/* Beveled 3D Slab Thickness */}
              {/* Front-Left Face */}
              <polygon
                points="138,272 260,336 260,352 138,288"
                fill="url(#slabFrontGrad)"
                stroke="#8000FF"
                strokeWidth="1.5"
              />
              {/* Front-Right Face */}
              <polygon
                points="260,336 382,272 382,288 260,352"
                fill="url(#slabSideGrad)"
                stroke="#FF007A"
                strokeWidth="1.5"
              />

              {/* Top Isometric Face with Rounded Corners */}
              <g transform="translate(260, 272) scale(1, 0.55) rotate(45)">
                <rect 
                  x="-90" y="-90" width="180" height="180" rx="24"
                  fill="url(#slabTopGrad)" 
                  stroke={activeLayer === 3 ? "#FFE500" : "#A855F7"} 
                  strokeWidth="2.5" 
                />
              </g>

              {/* Central Glowing Printer Emblem */}
              <g transform="translate(260, 272)">
                <circle 
                  cx="0" cy="0" r="22" 
                  fill="#FFE500" 
                  stroke="#000" 
                  strokeWidth="2.5" 
                  className={activeLayer === 3 ? "drop-shadow-[0_0_12px_#FFE500]" : ""}
                />
                <path 
                  d="M -9 -7 L 9 -7 L 9 -3 L -9 -3 Z M -11 -2 L 11 -2 L 11 6 L -11 6 Z M -7 2 L 7 2 L 7 10 L -7 10 Z" 
                  fill="#000" 
                />
              </g>

              {/* Text label */}
              <text 
                x="260" y="322" 
                fill="#FFE500" 
                fontSize="12" 
                fontFamily="monospace" 
                fontWeight="900" 
                textAnchor="middle" 
                letterSpacing="2"
              >
                .SUSTRATO 350G
              </text>
            </g>


            {/* ========================================================= */}
            {/* LAYER 2 (MIDDLE): TINTA CMYK HD (300 DPI)                */}
            {/* ========================================================= */}
            <g 
              className="cursor-pointer transition-transform duration-300 ease-out"
              onMouseEnter={() => setActiveLayer(2)}
              onMouseLeave={() => setActiveLayer(null)}
              transform={activeLayer === 2 ? "translate(0, -18)" : "translate(0, 0)"}
            >
              {/* Connector line to .AI (left) */}
              <line 
                x1="100" y1="210" x2="160" y2="200" 
                stroke="#FF007A" 
                strokeWidth={activeLayer === 2 ? "2" : "1.2"} 
                strokeDasharray="3 3"
                strokeOpacity={activeLayer === 2 ? "0.9" : "0.4"}
              />

              {/* Connector line to 300DPI (right) */}
              <line 
                x1="420" y1="190" x2="360" y2="198" 
                stroke="#FF007A" 
                strokeWidth={activeLayer === 2 ? "2" : "1.2"} 
                strokeDasharray="3 3"
                strokeOpacity={activeLayer === 2 ? "0.9" : "0.4"}
              />

              {/* Translucent Magenta Isometric Plate */}
              <g transform="translate(260, 195) scale(1, 0.55) rotate(45)">
                <rect 
                  x="-95" y="-95" width="190" height="190" rx="24"
                  fill="url(#pinkGlassGrad)" 
                  stroke="#FF007A" 
                  strokeWidth={activeLayer === 2 ? "3" : "2"} 
                />
              </g>

              {/* Layer Text */}
              <text 
                x="260" y="200" 
                fill="#FF007A" 
                fontSize="12" 
                fontFamily="monospace" 
                fontWeight="900" 
                textAnchor="middle" 
                letterSpacing="2"
              >
                .CMYK 300DPI
              </text>

              {/* Satellite .AI Chip (Left) */}
              <g 
                transform="translate(80, 215)" 
                className="transition-opacity duration-200"
                opacity={activeLayer === 2 ? 1 : 0.85}
              >
                <polygon points="-18,-3 0,7 0,13 -18,3" fill="#c2410c" stroke="#FF5500" strokeWidth="1" />
                <polygon points="0,7 18,-3 18,3 0,13" fill="#ea580c" stroke="#FF5500" strokeWidth="1" />
                <g transform="scale(1, 0.55) rotate(45)">
                  <rect x="-13" y="-13" width="26" height="26" rx="4" fill="url(#chipTopGrad)" stroke="#FF5500" strokeWidth="1.5" />
                </g>
                <text x="0" y="2" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">.AI</text>
              </g>

              {/* Satellite 300DPI Chip (Right) */}
              <g 
                transform="translate(440, 185)" 
                className="transition-opacity duration-200"
                opacity={activeLayer === 2 ? 1 : 0.85}
              >
                <polygon points="-18,-3 0,7 0,13 -18,3" fill="#9d174d" stroke="#FF007A" strokeWidth="1" />
                <polygon points="0,7 18,-3 18,3 0,13" fill="#be185d" stroke="#FF007A" strokeWidth="1" />
                <g transform="scale(1, 0.55) rotate(45)">
                  <rect x="-13" y="-13" width="26" height="26" rx="4" fill="url(#chipTopGrad)" stroke="#FF007A" strokeWidth="1.5" />
                </g>
                <text x="0" y="2" fill="#FFFFFF" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">300DPI</text>
              </g>
            </g>


            {/* ========================================================= */}
            {/* LAYER 1 (TOP): LAMINADO PROTECTOR UV                     */}
            {/* ========================================================= */}
            <g 
              className="cursor-pointer transition-transform duration-300 ease-out"
              onMouseEnter={() => setActiveLayer(1)}
              onMouseLeave={() => setActiveLayer(null)}
              transform={activeLayer === 1 ? "translate(0, -30)" : "translate(0, 0)"}
            >
              {/* Connector line to .PDF */}
              <line 
                x1="110" y1="110" x2="170" y2="120" 
                stroke="#00F0FF" 
                strokeWidth={activeLayer === 1 ? "2" : "1.2"} 
                strokeDasharray="3 3"
                strokeOpacity={activeLayer === 1 ? "0.9" : "0.4"}
              />

              {/* Translucent Cyan Isometric Plate */}
              <g transform="translate(260, 120) scale(1, 0.55) rotate(45)">
                <rect 
                  x="-95" y="-95" width="190" height="190" rx="24"
                  fill="url(#cyanGlassGrad)" 
                  stroke="#00F0FF" 
                  strokeWidth={activeLayer === 1 ? "3" : "2"} 
                />
              </g>

              {/* Layer Text */}
              <text 
                x="260" y="125" 
                fill="#00F0FF" 
                fontSize="12" 
                fontFamily="monospace" 
                fontWeight="900" 
                textAnchor="middle" 
                letterSpacing="2"
              >
                .LAMINADO UV
              </text>

              {/* Satellite .PDF Chip (Top Left) */}
              <g 
                transform="translate(90, 105)" 
                className="transition-opacity duration-200"
                opacity={activeLayer === 1 ? 1 : 0.85}
              >
                <polygon points="-18,-3 0,7 0,13 -18,3" fill="#003ECC" stroke="#00F0FF" strokeWidth="1" />
                <polygon points="0,7 18,-3 18,3 0,13" fill="#005BFF" stroke="#00F0FF" strokeWidth="1" />
                <g transform="scale(1, 0.55) rotate(45)">
                  <rect x="-13" y="-13" width="26" height="26" rx="4" fill="url(#chipTopGrad)" stroke="#00F0FF" strokeWidth="1.5" />
                </g>
                <text x="0" y="2" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">.PDF</text>
              </g>
            </g>

          </svg>
        </div>

        {/* Right: Technical Explanation Cards */}
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
                className={`p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
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
      <div className="mt-8 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-zinc-400">
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

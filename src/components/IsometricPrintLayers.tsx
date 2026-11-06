import React, { useState, useRef, useEffect } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Maximize2, 
  Minimize2, 
  Zap, 
  Sliders, 
  RotateCcw,
  ShieldCheck,
  Eye
} from 'lucide-react';

type FinishMode = 'uv-gloss' | 'holographic' | 'matte';

export const IsometricPrintLayers: React.FC = () => {
  // Interactive state
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [separation, setSeparation] = useState<number>(1); // 0 (assembled) to 1 (full exploded)
  const [finishMode, setFinishMode] = useState<FinishMode>('uv-gloss');
  const [isLaserScanning, setIsLaserScanning] = useState<boolean>(false);
  const [mouseTilt, setMouseTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoveringCanvas, setIsHoveringCanvas] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const laserTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto trigger laser once on load for a grand entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerLaser();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const triggerLaser = () => {
    setIsLaserScanning(true);
    if (laserTimerRef.current) clearTimeout(laserTimerRef.current);
    laserTimerRef.current = setTimeout(() => {
      setIsLaserScanning(false);
    }, 3200);
  };

  // Smooth mouse tilt handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Normalize coordinates from -1 to 1
    const normX = Math.max(-1, Math.min(1, (x - 0.5) * 2));
    const normY = Math.max(-1, Math.min(1, (y - 0.5) * 2));
    
    setMouseTilt({ x: normX, y: normY });
    setIsHoveringCanvas(true);
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
    setIsHoveringCanvas(false);
    setActiveLayer(null);
  };

  const layersInfo = [
    {
      id: 1,
      title: 'Laminado Protector UV',
      tag: '.LAMINADO',
      format: '.PDF',
      spec: 'Polipropileno 80 micras',
      subtitle: 'Polipropileno mate, brillante u holográfico',
      desc: 'Film transparente que sella la gráfica contra intemperie, rayos UV, agua y rayaduras mecánicas.',
      color: '#00F0FF',
      accentBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
    },
    {
      id: 2,
      title: 'Tinta CMYK HD (300 DPI)',
      tag: '.CMYK / COLOR',
      format: '.AI',
      spec: 'Pigmento curado UV Fogra39',
      subtitle: 'Impresión digital calibrada a 1200x1200dpi',
      desc: 'Microgotas de pigmento de alta saturación. Colores vivos, negros profundos y sin pixelación.',
      color: '#FF007A',
      accentBg: 'bg-pink-500/20 text-pink-300 border-pink-500/50'
    },
    {
      id: 3,
      title: 'Sustrato Base / Material',
      tag: '.SUSTRATO',
      format: 'CORE',
      spec: 'Vinilo polimérico / 350g',
      subtitle: 'Vinilo polimérico o cartulina ilustración 350g',
      desc: 'El cuerpo estructural: adhesivo alemán de larga vida o cartulina pesada de máxima rigidez.',
      color: '#FFE500',
      accentBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
    },
    {
      id: 4,
      title: 'Trazado de Troquel / Corte',
      tag: '.PLOTTER / CORTE',
      format: '.CDR',
      spec: 'Plotter tangencial ±0.2mm',
      subtitle: 'Vector milimétrico de precisión',
      desc: 'Línea vectorial que guía la cuchilla óptica para el semicorte o troquelado perimetral exacto.',
      color: '#CCFF00',
      accentBg: 'bg-lime-500/20 text-lime-300 border-lime-500/50'
    }
  ];

  // Base Y positions when fully exploded (sep = 1) vs assembled (sep = 0)
  // Slab center is at Y = 265
  const baseY_Layer1 = 265 - 150 * separation; // Top Laminado
  const baseY_Layer2 = 265 - 72 * separation;  // CMYK Plate
  const baseY_Layer3 = 265;                    // Sustrato Core Slab
  const baseY_Layer4 = 265 + 68 * separation;  // Troquel Cut Outline

  // Parallax offsets based on layer depth
  const pX1 = mouseTilt.x * 22;
  const pY1 = mouseTilt.y * 15;

  const pX2 = mouseTilt.x * 14;
  const pY2 = mouseTilt.y * 9;

  const pX3 = mouseTilt.x * 6;
  const pY3 = mouseTilt.y * 4;

  const pX4 = mouseTilt.x * -2;
  const pY4 = mouseTilt.y * -2;

  // Active hover lifts
  const hoverLift1 = activeLayer === 1 ? -14 : 0;
  const hoverLift2 = activeLayer === 2 ? -12 : 0;
  const hoverLift3 = activeLayer === 3 ? -8 : 0;
  const hoverLift4 = activeLayer === 4 ? 10 : 0;

  return (
    <div className="bg-[#090a0f] text-white border-4 border-black rounded-3xl p-5 sm:p-8 shadow-brutal-xl relative overflow-hidden">
      
      {/* Colocated Animation Styles */}
      <style>{`
        @keyframes laserSweepBeam {
          0% { transform: translate(-140px, -140px); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translate(140px, 140px); opacity: 0; }
        }
        @keyframes glassSheenGlide {
          0%, 15% { transform: translate(-130px, -80px) rotate(-35deg); opacity: 0; }
          25% { opacity: 0.9; }
          55% { transform: translate(160px, 110px) rotate(-35deg); opacity: 0.9; }
          65%, 100% { opacity: 0; }
        }
        @keyframes holoShift {
          0% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(180deg); }
          100% { filter: hue-rotate(360deg); }
        }
        @keyframes neonPulseFlow {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes isoBreathe1 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes isoBreathe2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes isoBreathe3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        .anim-sheen {
          animation: glassSheenGlide 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .anim-laser {
          animation: laserSweepBeam 2.8s ease-in-out infinite;
        }
        .anim-holo {
          animation: holoShift 6s linear infinite;
        }
        .anim-neon-cables {
          animation: neonPulseFlow 1.2s linear infinite;
        }
        .anim-breathe-1 {
          animation: isoBreathe1 4.5s ease-in-out infinite;
        }
        .anim-breathe-2 {
          animation: isoBreathe2 4.5s ease-in-out infinite 0.6s;
        }
        .anim-breathe-3 {
          animation: isoBreathe3 4.5s ease-in-out infinite 1.2s;
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none"></div>
      {finishMode === 'holographic' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-pink-500/5 to-yellow-500/5 pointer-events-none animate-pulse"></div>
      )}

      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-zinc-800 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-feast-yellow text-black font-display font-black text-xs uppercase px-3 py-1 rounded-full border-2 border-black shadow-brutal-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>VISUALIZADOR 3D INTERACTIVO • ANATOMÍA DE PRODUCCIÓN</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white flex items-center gap-3">
            <span>¿Cómo se construye una impresión pro?</span>
          </h3>
          <p className="text-xs sm:text-sm font-bold text-zinc-400 mt-1 max-w-2xl">
            Interactuá con el modelo: mové el cursor para inclinar en 3D, ajustá el despiece físico o cambiá el acabado superficial en tiempo real.
          </p>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-2 self-start lg:self-center">
          <span className="inline-flex items-center gap-1.5 bg-zinc-900 border-2 border-zinc-700 text-zinc-300 font-display font-black text-[11px] uppercase px-3 py-1.5 rounded-xl shadow-inner">
            <span className={`w-2 h-2 rounded-full ${isHoveringCanvas ? 'bg-feast-lime animate-ping' : 'bg-cyan-400'}`}></span>
            <span>{isHoveringCanvas ? 'GIROSCOPIO 3D ACTIVO' : '4 CAPAS CALIBRADAS'}</span>
          </span>
        </div>
      </div>

      {/* Interactive Control Console (Feastables Neo-Brutalist Style) */}
      <div className="mt-4 p-3 sm:p-4 bg-zinc-950/90 border-2 border-zinc-800 rounded-2xl flex flex-wrap items-center justify-between gap-3 relative z-20">
        
        {/* Explosion Mode Toggles */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-display font-black uppercase text-zinc-400 hidden sm:inline-block">
            VISTA:
          </span>
          <button
            type="button"
            onClick={() => setSeparation(1)}
            className={`px-3 py-1.5 rounded-xl font-display font-black text-xs uppercase border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              separation > 0.5 
                ? 'bg-feast-yellow text-black border-black shadow-brutal-sm -translate-y-0.5' 
                : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Despiece 3D</span>
          </button>

          <button
            type="button"
            onClick={() => setSeparation(0)}
            className={`px-3 py-1.5 rounded-xl font-display font-black text-xs uppercase border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              separation <= 0.5 
                ? 'bg-feast-lime text-black border-black shadow-brutal-sm -translate-y-0.5' 
                : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500'
            }`}
          >
            <Minimize2 className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Ensamblado</span>
          </button>
        </div>

        {/* Continuous Separation Slider */}
        <div className="flex items-center gap-2.5 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
          <Sliders className="w-3.5 h-3.5 text-zinc-400 stroke-[2.5]" />
          <span className="text-[11px] font-mono font-bold text-zinc-300 hidden md:inline">
            Separación: {Math.round(separation * 100)}%
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            value={separation}
            onChange={(e) => setSeparation(parseFloat(e.target.value))}
            className="w-24 sm:w-32 accent-feast-yellow cursor-pointer"
            title="Deslizar para separar o unir las capas"
          />
        </div>

        {/* Finish Selector Buttons */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-display font-black uppercase text-zinc-400 hidden xl:inline-block">
            ACABADO:
          </span>
          <button
            type="button"
            onClick={() => setFinishMode('uv-gloss')}
            className={`px-2.5 py-1.5 rounded-xl font-display font-black text-[11px] uppercase border-2 transition-all cursor-pointer ${
              finishMode === 'uv-gloss'
                ? 'bg-cyan-400 text-black border-black shadow-brutal-sm'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
            title="Laminado con brillo de alta refracción"
          >
            ✨ Brillo UV
          </button>
          <button
            type="button"
            onClick={() => setFinishMode('holographic')}
            className={`px-2.5 py-1.5 rounded-xl font-display font-black text-[11px] uppercase border-2 transition-all cursor-pointer ${
              finishMode === 'holographic'
                ? 'bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 text-black border-black shadow-brutal-sm'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
            title="Efecto tornasol tornasolado arcoíris"
          >
            🌈 Holográfico
          </button>
          <button
            type="button"
            onClick={() => setFinishMode('matte')}
            className={`px-2.5 py-1.5 rounded-xl font-display font-black text-[11px] uppercase border-2 transition-all cursor-pointer ${
              finishMode === 'matte'
                ? 'bg-zinc-200 text-black border-black shadow-brutal-sm'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
            }`}
            title="Acabado satinado mate antirreflujo"
          >
            🌑 Mate
          </button>
        </div>

        {/* Laser Scan Action Button */}
        <button
          type="button"
          onClick={triggerLaser}
          disabled={isLaserScanning}
          className={`px-3 py-1.5 rounded-xl font-display font-black text-xs uppercase border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
            isLaserScanning 
              ? 'bg-feast-pink text-white border-black animate-pulse shadow-brutal-sm' 
              : 'bg-zinc-900 hover:bg-zinc-800 text-feast-yellow border-zinc-700 hover:border-feast-yellow'
          }`}
          title="Disparar simulación de cabezal de impresión"
        >
          <Zap className={`w-3.5 h-3.5 stroke-[2.5] ${isLaserScanning ? 'animate-spin' : ''}`} />
          <span>{isLaserScanning ? 'Imprimiendo...' : 'Simular Impresión'}</span>
        </button>

      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 relative z-10">
        
        {/* Left: 3D Isometric Interactive Canvas with Mouse Parallax & Tilt */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-7 flex items-center justify-center relative min-h-[380px] sm:min-h-[460px] cursor-crosshair rounded-2xl bg-radial from-zinc-900/60 to-transparent p-2 select-none"
          style={{
            perspective: 1200
          }}
        >
          {/* Assembled Mode Floating Badge */}
          {separation <= 0.15 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-feast-lime text-black font-display font-black text-xs uppercase px-4 py-1.5 rounded-full border-3 border-black shadow-brutal-md flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4 stroke-[3]" />
              <span>PRODUCTO FINAL ENSAMBLADO • 100% LISTO</span>
            </div>
          )}

          {/* Laser Scanning Indicator Banner */}
          {isLaserScanning && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-feast-pink text-white font-mono font-black text-[11px] uppercase px-3 py-1 rounded-full border-2 border-black shadow-brutal-sm flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              <span>CABEZAL CMYK: INYECTANDO 300 DPI (FOGRA39)</span>
            </div>
          )}

          {/* SVG Wrapper with 3D Gimbal Tilt */}
          <div 
            className="w-full max-w-[500px] h-auto transition-transform duration-150 ease-out"
            style={{
              transform: `rotateX(${mouseTilt.y * -8}deg) rotateY(${mouseTilt.x * 10}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            <svg 
              viewBox="0 0 540 500" 
              className="w-full h-auto overflow-visible select-none"
            >
              <defs>
                {/* Core 3D Slab Gradients */}
                <linearGradient id="slabTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#222533" />
                  <stop offset="100%" stopColor="#0d0e14" />
                </linearGradient>

                <linearGradient id="slabFrontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8000FF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#005BFF" stopOpacity="0.35" />
                </linearGradient>

                <linearGradient id="slabSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF007A" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#8000FF" stopOpacity="0.35" />
                </linearGradient>

                {/* CMYK Glass Plate Gradient */}
                <linearGradient id="pinkGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF007A" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#8000FF" stopOpacity="0.12" />
                </linearGradient>

                {/* UV Glass Finish Gradient */}
                <linearGradient id="cyanGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#005BFF" stopOpacity="0.1" />
                </linearGradient>

                {/* Holographic Iridescent Finish Gradient */}
                <linearGradient id="holoFoilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.5" />
                  <stop offset="25%" stopColor="#FF007A" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#FFE500" stopOpacity="0.45" />
                  <stop offset="75%" stopColor="#CCFF00" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#8000FF" stopOpacity="0.5" />
                </linearGradient>

                {/* Matte Finish Gradient */}
                <linearGradient id="matteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2e3142" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#14151f" stopOpacity="0.75" />
                </linearGradient>

                {/* Moving Specular Glare Gradient */}
                <linearGradient id="sheenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.75" />
                  <stop offset="55%" stopColor="#00F0FF" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>

                {/* Chip Gradient */}
                <linearGradient id="chipTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#272a3a" />
                  <stop offset="100%" stopColor="#12131b" />
                </linearGradient>

                {/* Laser Glow Filter */}
                <filter id="laserFilter" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Clip path for CMYK plate laser beam */}
                <clipPath id="cmykPlateClip">
                  <g transform="scale(1, 0.55) rotate(45)">
                    <rect x="-95" y="-95" width="190" height="190" rx="24" />
                  </g>
                </clipPath>

                {/* Clip path for UV Laminate glass glare */}
                <clipPath id="laminadoPlateClip">
                  <g transform="scale(1, 0.55) rotate(45)">
                    <rect x="-95" y="-95" width="190" height="190" rx="24" />
                  </g>
                </clipPath>
              </defs>

              {/* ========================================================= */}
              {/* LAYER 4 (BASE): TROQUEL & CORTE POR PLOTTER               */}
              {/* ========================================================= */}
              <g 
                className="cursor-pointer transition-transform duration-200 ease-out"
                onMouseEnter={() => setActiveLayer(4)}
                onMouseLeave={() => setActiveLayer(null)}
                transform={`translate(${pX4}, ${baseY_Layer4 + pY4 + hoverLift4})`}
                opacity={activeLayer !== null && activeLayer !== 4 ? 0.35 : 1}
              >
                {/* Connector line to .CDR with flowing neon pulses */}
                <line 
                  x1="435" y1="35" x2="365" y2="5" 
                  stroke="#CCFF00" 
                  strokeWidth={activeLayer === 4 ? "2.5" : "1.5"} 
                  strokeDasharray="5 4"
                  strokeOpacity={activeLayer === 4 ? "1" : "0.7"}
                  className="anim-neon-cables"
                />

                {/* Dashed Isometric Outline */}
                <g transform="translate(270, 0) scale(1, 0.55) rotate(45)">
                  <rect 
                    x="-95" y="-95" width="190" height="190" rx="24"
                    fill="none" 
                    stroke="#CCFF00" 
                    strokeWidth={activeLayer === 4 ? "3" : "2"} 
                    strokeDasharray="6 4"
                    opacity={activeLayer === 4 ? 1 : 0.75}
                    className="anim-neon-cables"
                  />
                </g>

                {/* Label */}
                <text 
                  x="270" y="8" 
                  fill="#CCFF00" 
                  fontSize="11" 
                  fontFamily="monospace" 
                  fontWeight="900" 
                  textAnchor="middle" 
                  letterSpacing="2"
                  opacity={activeLayer === 4 ? 1 : 0.85}
                >
                  .TROQUEL VECTORIAL
                </text>

                {/* Satellite .CDR Chip */}
                <g 
                  transform="translate(450, 42)" 
                  className="transition-opacity duration-200"
                  opacity={activeLayer === 4 ? 1 : 0.85}
                >
                  <polygon points="-18,-3 0,7 0,13 -18,3" fill="#4d7c0f" stroke="#CCFF00" strokeWidth="1" />
                  <polygon points="0,7 18,-3 18,3 0,13" fill="#65a30d" stroke="#CCFF00" strokeWidth="1" />
                  <g transform="scale(1, 0.55) rotate(45)">
                    <rect x="-13" y="-13" width="26" height="26" rx="4" fill="url(#chipTopGrad)" stroke="#CCFF00" strokeWidth="1.5" />
                  </g>
                  <text x="0" y="2" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">.CDR</text>
                </g>
              </g>


              {/* ========================================================= */}
              {/* LAYER 3 (CORE 3D SLAB): SUSTRATO VINILO 350G              */}
              {/* ========================================================= */}
              <g 
                className="cursor-pointer transition-transform duration-200 ease-out"
                onMouseEnter={() => setActiveLayer(3)}
                onMouseLeave={() => setActiveLayer(null)}
                transform={`translate(${pX3}, ${baseY_Layer3 + pY3 + hoverLift3})`}
                opacity={activeLayer !== null && activeLayer !== 3 ? 0.4 : 1}
              >
                {/* Idle organic breathing */}
                <g className={!isHoveringCanvas ? "anim-breathe-3" : ""}>
                  {/* Beveled 3D Slab Thickness */}
                  {/* Front-Left Face */}
                  <polygon
                    points="148,0 270,64 270,82 148,18"
                    fill="url(#slabFrontGrad)"
                    stroke="#8000FF"
                    strokeWidth="1.5"
                  />
                  {/* Front-Right Face */}
                  <polygon
                    points="270,64 392,0 392,18 270,82"
                    fill="url(#slabSideGrad)"
                    stroke="#FF007A"
                    strokeWidth="1.5"
                  />

                  {/* Top Isometric Face */}
                  <g transform="translate(270, 0) scale(1, 0.55) rotate(45)">
                    <rect 
                      x="-90" y="-90" width="180" height="180" rx="24"
                      fill="url(#slabTopGrad)" 
                      stroke={activeLayer === 3 ? "#FFE500" : "#A855F7"} 
                      strokeWidth={activeLayer === 3 ? "3" : "2"} 
                    />
                  </g>

                  {/* Central Glowing Printer Core Emblem */}
                  <g transform="translate(270, 0)">
                    <circle 
                      cx="0" cy="0" r="23" 
                      fill="#FFE500" 
                      stroke="#000" 
                      strokeWidth="2.5" 
                      className={activeLayer === 3 || isLaserScanning ? "drop-shadow-[0_0_15px_#FFE500]" : ""}
                    />
                    <path 
                      d="M -9 -7 L 9 -7 L 9 -3 L -9 -3 Z M -11 -2 L 11 -2 L 11 6 L -11 6 Z M -7 2 L 7 2 L 7 10 L -7 10 Z" 
                      fill="#000" 
                    />
                  </g>

                  {/* Text label */}
                  <text 
                    x="270" y="52" 
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
              </g>


              {/* ========================================================= */}
              {/* LAYER 2 (MIDDLE): TINTA CMYK HD (300 DPI)                 */}
              {/* ========================================================= */}
              <g 
                className="cursor-pointer transition-transform duration-200 ease-out"
                onMouseEnter={() => setActiveLayer(2)}
                onMouseLeave={() => setActiveLayer(null)}
                transform={`translate(${pX2}, ${baseY_Layer2 + pY2 + hoverLift2})`}
                opacity={activeLayer !== null && activeLayer !== 2 ? 0.35 : 1}
              >
                {/* Idle breathing */}
                <g className={!isHoveringCanvas ? "anim-breathe-2" : ""}>
                  {/* Connector line to .AI (left) */}
                  <line 
                    x1="90" y1="15" x2="170" y2="5" 
                    stroke="#FF007A" 
                    strokeWidth={activeLayer === 2 ? "2.5" : "1.5"} 
                    strokeDasharray="5 4"
                    strokeOpacity={activeLayer === 2 ? "1" : "0.7"}
                    className="anim-neon-cables"
                  />

                  {/* Connector line to 300DPI (right) */}
                  <line 
                    x1="450" y1="-5" x2="370" y2="5" 
                    stroke="#FF007A" 
                    strokeWidth={activeLayer === 2 ? "2.5" : "1.5"} 
                    strokeDasharray="5 4"
                    strokeOpacity={activeLayer === 2 ? "1" : "0.7"}
                    className="anim-neon-cables"
                  />

                  {/* Translucent Magenta Isometric Plate */}
                  <g transform="translate(270, 0)">
                    <g transform="scale(1, 0.55) rotate(45)">
                      <rect 
                        x="-95" y="-95" width="190" height="190" rx="24"
                        fill="url(#pinkGlassGrad)" 
                        stroke="#FF007A" 
                        strokeWidth={activeLayer === 2 || isLaserScanning ? "3.5" : "2"} 
                      />
                    </g>

                    {/* LIVE LASER HEAD SCANNING EFFECT */}
                    {(isLaserScanning || !isHoveringCanvas) && (
                      <g clipPath="url(#cmykPlateClip)" className="pointer-events-none">
                        <g className="anim-laser">
                          {/* Glowing Neon Laser Line */}
                          <line 
                            x1="-130" y1="0" x2="130" y2="0" 
                            stroke="#00F0FF" 
                            strokeWidth="3.5" 
                            filter="url(#laserFilter)" 
                          />
                          <line 
                            x1="-130" y1="0" x2="130" y2="0" 
                            stroke="#FFFFFF" 
                            strokeWidth="1.5" 
                          />
                          {/* Laser focal sparks */}
                          <circle cx="0" cy="0" r="5" fill="#FFE500" filter="url(#laserFilter)" />
                          <circle cx="-50" cy="0" r="3" fill="#FF007A" />
                          <circle cx="50" cy="0" r="3" fill="#00F0FF" />
                        </g>
                      </g>
                    )}
                  </g>

                  {/* Layer Text */}
                  <text 
                    x="270" y="5" 
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
                    transform="translate(75, 20)" 
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
                    transform="translate(465, -8)" 
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
              </g>


              {/* ========================================================= */}
              {/* LAYER 1 (TOP): LAMINADO PROTECTOR UV                      */}
              {/* ========================================================= */}
              <g 
                className="cursor-pointer transition-transform duration-200 ease-out"
                onMouseEnter={() => setActiveLayer(1)}
                onMouseLeave={() => setActiveLayer(null)}
                transform={`translate(${pX1}, ${baseY_Layer1 + pY1 + hoverLift1})`}
                opacity={activeLayer !== null && activeLayer !== 1 ? 0.35 : 1}
              >
                {/* Idle breathing */}
                <g className={!isHoveringCanvas ? "anim-breathe-1" : ""}>
                  {/* Connector line to .PDF */}
                  <line 
                    x1="90" y1="-10" x2="170" y2="0" 
                    stroke={finishMode === 'holographic' ? '#FF007A' : '#00F0FF'} 
                    strokeWidth={activeLayer === 1 ? "2.5" : "1.5"} 
                    strokeDasharray="5 4"
                    strokeOpacity={activeLayer === 1 ? "1" : "0.7"}
                    className="anim-neon-cables"
                  />

                  {/* Translucent Isometric Plate with dynamic finish */}
                  <g transform="translate(270, 0)">
                    <g transform="scale(1, 0.55) rotate(45)">
                      <rect 
                        x="-95" y="-95" width="190" height="190" rx="24"
                        fill={
                          finishMode === 'holographic' 
                            ? 'url(#holoFoilGrad)' 
                            : finishMode === 'matte' 
                            ? 'url(#matteGrad)' 
                            : 'url(#cyanGlassGrad)'
                        }
                        stroke={
                          finishMode === 'holographic' 
                            ? '#FFE500' 
                            : finishMode === 'matte' 
                            ? '#A1A1AA' 
                            : '#00F0FF'
                        }
                        strokeWidth={activeLayer === 1 ? "3.5" : "2"} 
                        className={finishMode === 'holographic' ? 'anim-holo' : ''}
                      />
                    </g>

                    {/* DYNAMIC SPECULAR GLASS SHEEN (Glare sweep) */}
                    <g clipPath="url(#laminadoPlateClip)" pointerEvents="none">
                      <rect 
                        x="-40" y="-120" width="80" height="240"
                        fill="url(#sheenGrad)" 
                        className="anim-sheen"
                      />
                    </g>
                  </g>

                  {/* Layer Text */}
                  <text 
                    x="270" y="5" 
                    fill={finishMode === 'holographic' ? '#FFE500' : finishMode === 'matte' ? '#E4E4E7' : '#00F0FF'} 
                    fontSize="12" 
                    fontFamily="monospace" 
                    fontWeight="900" 
                    textAnchor="middle" 
                    letterSpacing="2"
                  >
                    {finishMode === 'holographic' ? '.HOLO FOIL TORNASOL' : finishMode === 'matte' ? '.LAMINADO MATE SOFT' : '.LAMINADO UV PRO'}
                  </text>

                  {/* Satellite .PDF Chip (Top Left) */}
                  <g 
                    transform="translate(75, -15)" 
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
              </g>

            </svg>
          </div>
        </div>

        {/* Right: Technical Explanation Cards with Deep Specs */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-display font-black uppercase text-zinc-400 mb-1">
            <span>DESGLOSE TÉCNICO DE CALIDAD:</span>
            <span className="text-feast-yellow text-[11px] font-mono">
              {activeLayer ? `CAPA ${activeLayer} / 4 SELECCIONADA` : 'PASÁ EL MOUSE O TOCÁ'}
            </span>
          </div>

          {layersInfo.map((l) => {
            const isHovered = activeLayer === l.id;
            return (
              <div
                key={l.id}
                onMouseEnter={() => setActiveLayer(l.id)}
                onMouseLeave={() => setActiveLayer(null)}
                onClick={() => setActiveLayer(activeLayer === l.id ? null : l.id)}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer ${
                  isHovered 
                    ? 'bg-zinc-900 border-white shadow-brutal-sm -translate-x-1.5' 
                    : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span 
                      className={`w-3 h-3 rounded-full border border-black shrink-0 transition-transform ${isHovered ? 'scale-125' : ''}`}
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

                <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-zinc-300 mb-1">
                  <span>{l.subtitle}</span>
                  <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 shrink-0">
                    {l.spec}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-400 leading-snug">
                  {l.desc}
                </p>
              </div>
            );
          })}

          {/* Quick interactive hint */}
          <div className="bg-zinc-900/50 rounded-xl p-2.5 border border-zinc-800/80 flex items-center gap-2 text-[11px] text-zinc-400">
            <Eye className="w-4 h-4 text-feast-yellow shrink-0 stroke-[2.5]" />
            <span>Al pasar sobre cada capa, las demás se atenúan para aislar su posición física.</span>
          </div>
        </div>

      </div>

      {/* Footer Banner */}
      <div className="mt-8 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-zinc-400">
        <span className="flex items-center gap-1.5 text-feast-lime">
          <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
          <span>Cumplimiento estricto de estándares normados IRAM y perfiles de color Fogra39</span>
        </span>
        <span className="text-[11px] text-zinc-500">
          Inspirado en la visualización isométrica de Vite & Devtools
        </span>
      </div>

    </div>
  );
};

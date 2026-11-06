import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  Maximize2,
  Minimize2,
  Zap,
  Sliders,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { FINISHES, LAYERS, SLAB_CENTER_Y, type FinishMode, type LayerId } from './print-layers/config';
import { useInView, useReducedMotion } from './print-layers/hooks';
import { Chip } from './print-layers/Chip';
import { LayerGroup } from './print-layers/LayerGroup';
import { IPL_CSS } from './print-layers/styles';

const LASER_DURATION_MS = 3200;
const SEPARATION_TWEEN_MS = 650;
const LABELS_MIN_SEPARATION = 0.35;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export const IsometricPrintLayers: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const gid = (name: string) => `${uid}-${name}`;

  const [separation, setSeparation] = useState<number>(() => (reducedMotion ? 1 : 0));
  const [finishMode, setFinishMode] = useState<FinishMode>('uv-gloss');
  const [isLaserScanning, setIsLaserScanning] = useState(false);
  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);

  // A layer can be highlighted by hover, keyboard focus, or a pinned click/tap.
  const [hovered, setHovered] = useState<LayerId | null>(null);
  const [focused, setFocused] = useState<LayerId | null>(null);
  const [pinned, setPinned] = useState<LayerId | null>(null);
  const activeLayer = hovered ?? focused ?? pinned;

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const gimbalRef = useRef<HTMLDivElement>(null);
  const parallaxEls = useRef<(SVGGElement | null)[]>([]);
  const laserTimer = useRef<number>();
  const leaveTimer = useRef<number>();
  const tweenRaf = useRef<number>();
  const separationRef = useRef(separation);
  separationRef.current = separation;

  const { inView, seen } = useInView(rootRef);

  /* ------------------------------ separation ------------------------------ */

  const cancelTween = () => {
    if (tweenRaf.current) cancelAnimationFrame(tweenRaf.current);
    tweenRaf.current = undefined;
  };

  const animateSeparationTo = useCallback(
    (target: number) => {
      cancelTween();
      if (reducedMotion) {
        setSeparation(target);
        return;
      }
      const from = separationRef.current;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / SEPARATION_TWEEN_MS);
        setSeparation(from + (target - from) * easeInOutCubic(t));
        tweenRaf.current = t < 1 ? requestAnimationFrame(step) : undefined;
      };
      tweenRaf.current = requestAnimationFrame(step);
    },
    [reducedMotion]
  );

  /* -------------------------------- laser -------------------------------- */

  const triggerLaser = useCallback(() => {
    setIsLaserScanning(true);
    window.clearTimeout(laserTimer.current);
    laserTimer.current = window.setTimeout(() => setIsLaserScanning(false), LASER_DURATION_MS);
  }, []);

  // Entrance: explode + print once, the first time the section scrolls into view.
  useEffect(() => {
    if (!seen || reducedMotion) return;
    animateSeparationTo(1);
    const t = window.setTimeout(triggerLaser, 700);
    return () => window.clearTimeout(t);
  }, [seen, reducedMotion, animateSeparationTo, triggerLaser]);

  useEffect(
    () => () => {
      window.clearTimeout(laserTimer.current);
      window.clearTimeout(leaveTimer.current);
      cancelTween();
    },
    []
  );

  /* --------------------------- tilt (no re-render) --------------------------- */

  const applyTilt = (x: number, y: number) => {
    if (gimbalRef.current) {
      gimbalRef.current.style.transform = `rotateX(${y * -8}deg) rotateY(${x * 10}deg)`;
    }
    LAYERS.forEach((l, i) => {
      const el = parallaxEls.current[i];
      if (el) el.style.transform = `translate(${x * l.parallax.x}px, ${y * l.parallax.y}px)`;
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch' || reducedMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
    const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
    applyTilt(nx, ny);
    setIsHoveringCanvas(true);
  };

  const handlePointerLeave = () => {
    applyTilt(0, 0);
    setIsHoveringCanvas(false);
    window.clearTimeout(leaveTimer.current);
    setHovered(null);
  };

  /* ------------------------- layer interaction ------------------------- */

  // Small grace period so moving between overlapping layers doesn't flicker.
  const hoverLayer = useCallback((id: LayerId) => {
    window.clearTimeout(leaveTimer.current);
    setHovered(id);
  }, []);
  const unhoverLayer = useCallback(() => {
    window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(() => setHovered(null), 80);
  }, []);
  const togglePinned = useCallback((id: LayerId) => setPinned((p) => (p === id ? null : id)), []);

  /* ------------------------------- derived ------------------------------- */

  const finish = FINISHES.find((f) => f.id === finishMode)!;
  const showLabels = separation > LABELS_MIN_SEPARATION;
  const isAssembled = separation <= 0.15;
  const idleBreathing = !isHoveringCanvas && !reducedMotion;

  const layerY = (i: number) => {
    const l = LAYERS[i];
    const lift = activeLayer === l.id ? l.hoverLift : 0;
    return SLAB_CENTER_Y + l.explodedOffset * separation + lift;
  };

  const layerProps = (i: number) => {
    const l = LAYERS[i];
    return {
      layer: l,
      y: layerY(i),
      active: activeLayer === l.id,
      dimmed: activeLayer !== null && activeLayer !== l.id,
      pinned: pinned === l.id,
      breathe: idleBreathing && l.id !== 4,
      breatheClass: `ipl-breathe-${l.id}`,
      parallaxRef: (el: SVGGElement | null) => {
        parallaxEls.current[i] = el;
      },
      onHover: hoverLayer,
      onUnhover: unhoverLayer,
      onFocusLayer: setFocused,
      onBlurLayer: () => setFocused(null),
      onToggle: togglePinned,
    };
  };

  const labelStyle = (id: LayerId): React.CSSProperties => ({
    opacity: showLabels || activeLayer === id ? 1 : 0,
    transition: 'opacity 200ms',
  });

  const strokeW = (id: LayerId, active: number, idle: number) => (activeLayer === id ? active : idle);
  const dashOpacity = (id: LayerId) => (activeLayer === id ? 1 : 0.7);

  const [L1, L2, L3, L4] = LAYERS;

  return (
    <div
      ref={rootRef}
      data-paused={!inView}
      className="ipl-root bg-[#090a0f] text-white border-4 border-black rounded-3xl p-5 sm:p-8 shadow-brutal-xl relative overflow-hidden"
    >
      <style>{IPL_CSS}</style>

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      {finishMode === 'holographic' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-pink-500/5 to-yellow-500/5 pointer-events-none animate-pulse" />
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-zinc-800 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 bg-feast-yellow text-black font-display font-black text-xs uppercase px-3 py-1 rounded-full border-2 border-black shadow-brutal-sm mb-2">
            <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden />
            <span>VISUALIZADOR 3D INTERACTIVO • ANATOMÍA DE PRODUCCIÓN</span>
          </div>
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
            ¿Cómo se construye una impresión pro?
          </h3>
          <p className="text-xs sm:text-sm font-bold text-zinc-400 mt-1 max-w-2xl">
            Interactuá con el modelo: mové el cursor para inclinar en 3D, ajustá el despiece físico o cambiá el
            acabado superficial en tiempo real.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start lg:self-center" role="status" aria-live="polite">
          <span className="inline-flex items-center gap-1.5 bg-zinc-900 border-2 border-zinc-700 text-zinc-300 font-display font-black text-[11px] uppercase px-3 py-1.5 rounded-xl shadow-inner">
            <span
              className={`w-2 h-2 rounded-full ${isHoveringCanvas ? 'bg-feast-lime animate-ping' : 'bg-cyan-400'}`}
              aria-hidden
            />
            <span>{isHoveringCanvas ? 'GIROSCOPIO 3D ACTIVO' : '4 CAPAS CALIBRADAS'}</span>
          </span>
        </div>
      </div>

      {/* Control console */}
      <div
        className="mt-4 p-3 sm:p-4 bg-zinc-950/90 border-2 border-zinc-800 rounded-2xl flex flex-wrap items-center justify-between gap-3 relative z-20"
        role="toolbar"
        aria-label="Controles del visualizador"
      >
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-display font-black uppercase text-zinc-400 hidden sm:inline-block">
            VISTA:
          </span>
          <button
            type="button"
            onClick={() => animateSeparationTo(1)}
            aria-pressed={separation > 0.5}
            className={`px-3 py-1.5 rounded-xl font-display font-black text-xs uppercase border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              separation > 0.5
                ? 'bg-feast-yellow text-black border-black shadow-brutal-sm -translate-y-0.5'
                : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden />
            <span>Despiece 3D</span>
          </button>
          <button
            type="button"
            onClick={() => animateSeparationTo(0)}
            aria-pressed={separation <= 0.5}
            className={`px-3 py-1.5 rounded-xl font-display font-black text-xs uppercase border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              separation <= 0.5
                ? 'bg-feast-lime text-black border-black shadow-brutal-sm -translate-y-0.5'
                : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-zinc-500'
            }`}
          >
            <Minimize2 className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden />
            <span>Ensamblado</span>
          </button>
        </div>

        <label className="flex items-center gap-2.5 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
          <Sliders className="w-3.5 h-3.5 text-zinc-400 stroke-[2.5]" aria-hidden />
          <span className="text-[11px] font-mono font-bold text-zinc-300 hidden md:inline tabular-nums">
            Separación: {Math.round(separation * 100)}%
          </span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            value={separation}
            onChange={(e) => {
              cancelTween();
              setSeparation(parseFloat(e.target.value));
            }}
            aria-label="Separación de capas"
            className="w-24 sm:w-32 accent-feast-yellow cursor-pointer"
          />
        </label>

        <div className="flex items-center gap-1.5" role="group" aria-label="Acabado superficial">
          <span className="text-[11px] font-display font-black uppercase text-zinc-400 hidden xl:inline-block">
            ACABADO:
          </span>
          {FINISHES.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFinishMode(f.id)}
              aria-pressed={finishMode === f.id}
              title={f.hint}
              className={`px-2.5 py-1.5 rounded-xl font-display font-black text-[11px] uppercase border-2 transition-all cursor-pointer ${
                finishMode === f.id ? f.activeClass : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              <span aria-hidden>{f.emoji} </span>
              {f.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={triggerLaser}
          disabled={isLaserScanning}
          title="Disparar simulación de cabezal de impresión"
          className={`px-3 py-1.5 rounded-xl font-display font-black text-xs uppercase border-2 transition-all flex items-center gap-1.5 cursor-pointer ${
            isLaserScanning
              ? 'bg-feast-pink text-white border-black animate-pulse shadow-brutal-sm'
              : 'bg-zinc-900 hover:bg-zinc-800 text-feast-yellow border-zinc-700 hover:border-feast-yellow'
          }`}
        >
          <Zap className={`w-3.5 h-3.5 stroke-[2.5] ${isLaserScanning ? 'animate-spin' : ''}`} aria-hidden />
          <span>{isLaserScanning ? 'Imprimiendo...' : 'Simular Impresión'}</span>
        </button>
      </div>

      {/* Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6 relative z-10">
        <div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="lg:col-span-7 flex items-center justify-center relative min-h-[380px] sm:min-h-[460px] cursor-crosshair rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(24,24,27,0.6),transparent_70%)] p-2 select-none touch-pan-y"
          style={{ perspective: 1200 }}
        >
          {isAssembled && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-feast-lime text-black font-display font-black text-xs uppercase px-4 py-1.5 rounded-full border-3 border-black shadow-brutal-md flex items-center gap-2 motion-safe:animate-bounce">
              <CheckCircle2 className="w-4 h-4 stroke-[3]" aria-hidden />
              <span>PRODUCTO FINAL ENSAMBLADO • 100% LISTO</span>
            </div>
          )}

          {isLaserScanning && (
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-feast-pink text-white font-mono font-black text-[11px] uppercase px-3 py-1 rounded-full border-2 border-black shadow-brutal-sm flex items-center gap-2 animate-pulse"
              role="status"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" aria-hidden />
              <span>CABEZAL CMYK: INYECTANDO TINTA HD (FOGRA39)</span>
            </div>
          )}

          <div
            ref={gimbalRef}
            className="w-full max-w-[500px] h-auto transition-transform duration-150 ease-out"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <svg
              viewBox="0 0 540 500"
              className="w-full h-auto overflow-visible select-none"
              role="group"
              aria-label="Despiece isométrico de una impresión: laminado, tinta CMYK, sustrato y troquel"
            >
              <defs>
                <linearGradient id={gid('slabTop')} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#222533" />
                  <stop offset="100%" stopColor="#0d0e14" />
                </linearGradient>
                <linearGradient id={gid('slabFront')} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8000FF" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#005BFF" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id={gid('slabSide')} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FF007A" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#8000FF" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id={gid('pinkGlass')} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF007A" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#8000FF" stopOpacity="0.12" />
                </linearGradient>
                <linearGradient id={gid('cyanGlass')} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#005BFF" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id={gid('holoFoil')} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.5" />
                  <stop offset="25%" stopColor="#FF007A" stopOpacity="0.45" />
                  <stop offset="50%" stopColor="#FFE500" stopOpacity="0.45" />
                  <stop offset="75%" stopColor="#CCFF00" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#8000FF" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id={gid('matte')} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2e3142" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#14151f" stopOpacity="0.75" />
                </linearGradient>
                <linearGradient id={gid('sheen')} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.75" />
                  <stop offset="55%" stopColor="#00F0FF" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                <linearGradient id={gid('chipTop')} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#272a3a" />
                  <stop offset="100%" stopColor="#12131b" />
                </linearGradient>
                <filter id={gid('laserGlow')} x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Shared isometric plate clip (CMYK laser + laminate glare) */}
                <clipPath id={gid('plateClip')}>
                  <g transform="scale(1, 0.55) rotate(45)">
                    <rect x="-95" y="-95" width="190" height="190" rx="24" />
                  </g>
                </clipPath>
              </defs>

              {/* LAYER 4 (BASE): TROQUEL & CORTE */}
              <LayerGroup {...layerProps(3)}>
                <line
                  x1="435" y1="35" x2="365" y2="5"
                  stroke={L4.color} strokeWidth={strokeW(4, 2.5, 1.5)} strokeDasharray="5 4"
                  strokeOpacity={dashOpacity(4)} className="ipl-flow" pointerEvents="none"
                />
                <g transform="translate(270, 0) scale(1, 0.55) rotate(45)">
                  <rect
                    x="-95" y="-95" width="190" height="190" rx="24"
                    fill="none" stroke={L4.color} strokeWidth={strokeW(4, 3, 2)} strokeDasharray="6 4"
                    opacity={activeLayer === 4 ? 1 : 0.75} className="ipl-flow" pointerEvents="all"
                  />
                </g>
                <text
                  x="270" y="8" fill={L4.color} fontSize="11" fontFamily="monospace" fontWeight="900"
                  textAnchor="middle" letterSpacing="2" style={labelStyle(4)} pointerEvents="none"
                >
                  .TROQUEL VECTORIAL
                </text>
                <Chip
                  x={450} y={42} label=".CDR" left="#4d7c0f" right="#65a30d" stroke={L4.color}
                  gradId={gid('chipTop')} active={activeLayer === 4}
                />
              </LayerGroup>

              {/* LAYER 3 (CORE SLAB): SUSTRATO */}
              <LayerGroup {...layerProps(2)}>
                <polygon points="148,0 270,64 270,82 148,18" fill={`url(#${gid('slabFront')})`} stroke="#8000FF" strokeWidth="1.5" />
                <polygon points="270,64 392,0 392,18 270,82" fill={`url(#${gid('slabSide')})`} stroke="#FF007A" strokeWidth="1.5" />
                <g transform="translate(270, 0) scale(1, 0.55) rotate(45)">
                  <rect
                    x="-90" y="-90" width="180" height="180" rx="24"
                    fill={`url(#${gid('slabTop')})`}
                    stroke={activeLayer === 3 ? L3.color : '#A855F7'} strokeWidth={strokeW(3, 3, 2)}
                  />
                </g>
                <g transform="translate(270, 0)" pointerEvents="none">
                  <circle
                    cx="0" cy="0" r="23" fill={L3.color} stroke="#000" strokeWidth="2.5"
                    className={activeLayer === 3 || isLaserScanning ? 'drop-shadow-[0_0_15px_#FFE500]' : ''}
                  />
                  <path d="M -9 -7 L 9 -7 L 9 -3 L -9 -3 Z M -11 -2 L 11 -2 L 11 6 L -11 6 Z M -7 2 L 7 2 L 7 10 L -7 10 Z" fill="#000" />
                </g>
                <text
                  x="270" y="52" fill={L3.color} fontSize="12" fontFamily="monospace" fontWeight="900"
                  textAnchor="middle" letterSpacing="2" style={labelStyle(3)} pointerEvents="none"
                >
                  .SUSTRATO 350G
                </text>
              </LayerGroup>

              {/* LAYER 2: TINTA CMYK */}
              <LayerGroup {...layerProps(1)}>
                <line x1="90" y1="15" x2="170" y2="5" stroke={L2.color} strokeWidth={strokeW(2, 2.5, 1.5)} strokeDasharray="5 4" strokeOpacity={dashOpacity(2)} className="ipl-flow" pointerEvents="none" />
                <line x1="450" y1="-5" x2="370" y2="5" stroke={L2.color} strokeWidth={strokeW(2, 2.5, 1.5)} strokeDasharray="5 4" strokeOpacity={dashOpacity(2)} className="ipl-flow" pointerEvents="none" />

                <g transform="translate(270, 0)">
                  <g transform="scale(1, 0.55) rotate(45)">
                    <rect
                      x="-95" y="-95" width="190" height="190" rx="24"
                      fill={`url(#${gid('pinkGlass')})`} stroke={L2.color}
                      strokeWidth={activeLayer === 2 || isLaserScanning ? 3.5 : 2}
                    />
                  </g>

                  {isLaserScanning && (
                    <g clipPath={`url(#${gid('plateClip')})`} pointerEvents="none">
                      <g className="ipl-laser">
                        <line x1="-130" y1="0" x2="130" y2="0" stroke="#00F0FF" strokeWidth="3.5" filter={`url(#${gid('laserGlow')})`} />
                        <line x1="-130" y1="0" x2="130" y2="0" stroke="#FFFFFF" strokeWidth="1.5" />
                        <circle cx="0" cy="0" r="5" fill="#FFE500" filter={`url(#${gid('laserGlow')})`} />
                        <circle cx="-50" cy="0" r="3" fill="#FF007A" />
                        <circle cx="50" cy="0" r="3" fill="#00F0FF" />
                      </g>
                    </g>
                  )}
                </g>

                <text
                  x="270" y="5" fill={L2.color} fontSize="12" fontFamily="monospace" fontWeight="900"
                  textAnchor="middle" letterSpacing="2" style={labelStyle(2)} pointerEvents="none"
                >
                  .CMYK 300DPI
                </text>
                <Chip x={75} y={20} label=".AI" left="#c2410c" right="#ea580c" stroke="#FF5500" gradId={gid('chipTop')} active={activeLayer === 2} />
                <Chip x={465} y={-8} label="300DPI" fontSize={7.5} left="#9d174d" right="#be185d" stroke={L2.color} gradId={gid('chipTop')} active={activeLayer === 2} />
              </LayerGroup>

              {/* LAYER 1 (TOP): LAMINADO */}
              <LayerGroup {...layerProps(0)}>
                <line
                  x1="90" y1="-10" x2="170" y2="0"
                  stroke={finish.connector} strokeWidth={strokeW(1, 2.5, 1.5)} strokeDasharray="5 4"
                  strokeOpacity={dashOpacity(1)} className="ipl-flow" pointerEvents="none"
                />

                <g transform="translate(270, 0)">
                  <g transform="scale(1, 0.55) rotate(45)">
                    <rect
                      x="-95" y="-95" width="190" height="190" rx="24"
                      fill={`url(#${gid(finish.fill)})`} stroke={finish.stroke}
                      strokeWidth={strokeW(1, 3.5, 2)}
                      className={finishMode === 'holographic' ? 'ipl-holo' : undefined}
                    />
                  </g>
                  {finishMode !== 'matte' && (
                    <g clipPath={`url(#${gid('plateClip')})`} pointerEvents="none">
                      <rect x="-40" y="-120" width="80" height="240" fill={`url(#${gid('sheen')})`} className="ipl-sheen" />
                    </g>
                  )}
                </g>

                <text
                  x="270" y="5" fill={finish.labelColor} fontSize="12" fontFamily="monospace" fontWeight="900"
                  textAnchor="middle" letterSpacing="2" style={labelStyle(1)} pointerEvents="none"
                >
                  {finish.svgLabel}
                </text>
                <Chip x={75} y={-15} label=".PDF" left="#003ECC" right="#005BFF" stroke={L1.color} gradId={gid('chipTop')} active={activeLayer === 1} />
              </LayerGroup>
            </svg>
          </div>
        </div>

        {/* Right: spec cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-display font-black uppercase text-zinc-400 mb-1">
            <span>DESGLOSE TÉCNICO DE CALIDAD:</span>
            <span className="text-feast-yellow text-[11px] font-mono">
              {activeLayer ? `CAPA ${activeLayer} / 4 SELECCIONADA` : 'PASÁ EL MOUSE O TOCÁ'}
            </span>
          </div>

          {LAYERS.map((l) => {
            const isActive = activeLayer === l.id;
            return (
              <button
                key={l.id}
                type="button"
                aria-pressed={pinned === l.id}
                onPointerEnter={(e) => e.pointerType === 'mouse' && hoverLayer(l.id)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && unhoverLayer()}
                onFocus={() => setFocused(l.id)}
                onBlur={() => setFocused(null)}
                onClick={() => togglePinned(l.id)}
                className={`block w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer motion-reduce:transition-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isActive
                    ? 'bg-zinc-900 border-white shadow-brutal-sm -translate-x-1.5'
                    : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <span className="flex items-center justify-between mb-1">
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full border border-black shrink-0 transition-transform ${isActive ? 'scale-125' : ''}`}
                      style={{ backgroundColor: l.color }}
                      aria-hidden
                    />
                    <span className="font-display font-black text-sm uppercase text-white">{l.title}</span>
                  </span>
                  <span
                    className="text-[11px] font-mono font-bold px-2 py-0.5 rounded border border-zinc-700"
                    style={{ color: l.color }}
                  >
                    {l.tag}
                  </span>
                </span>

                <span className="flex items-center justify-between gap-2 text-[11px] font-bold text-zinc-300 mb-1">
                  <span>{l.subtitle}</span>
                  <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 shrink-0">
                    {l.spec}
                  </span>
                </span>

                <span className="block text-xs text-zinc-400 leading-snug">{l.desc}</span>
              </button>
            );
          })}

          <div className="bg-zinc-900/50 rounded-xl p-2.5 border border-zinc-800/80 flex items-center gap-2 text-[11px] text-zinc-400">
            <Eye className="w-4 h-4 text-feast-yellow shrink-0 stroke-[2.5]" aria-hidden />
            <span>Al pasar sobre cada capa, las demás se atenúan para aislar su posición física. Tocá para fijarla.</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center gap-3 text-xs font-bold text-zinc-400">
        <span className="flex items-center gap-1.5 text-feast-lime">
          <ShieldCheck className="w-4 h-4 stroke-[2.5]" aria-hidden />
          <span>Perfiles de color calibrados Fogra39</span>
        </span>
      </div>
    </div>
  );
};

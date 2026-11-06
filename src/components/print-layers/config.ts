export type FinishMode = 'uv-gloss' | 'holographic' | 'matte';
export type LayerId = 1 | 2 | 3 | 4;

export interface LayerConfig {
  id: LayerId;
  title: string;
  tag: string;
  format: string;
  spec: string;
  subtitle: string;
  desc: string;
  color: string;
  /** Y offset applied at full separation (0 = assembled). Slab (3) is the anchor. */
  explodedOffset: number;
  /** Parallax strength in px at full mouse deflection. */
  parallax: { x: number; y: number };
  /** Y shift when the layer is highlighted. */
  hoverLift: number;
}

/** Ordered top → bottom. */
export const LAYERS: readonly LayerConfig[] = [
  {
    id: 1,
    title: 'Laminado Protector UV',
    tag: '.LAMINADO',
    format: '.PDF',
    spec: 'Polipropileno 80 micras',
    subtitle: 'Polipropileno mate, brillante u holográfico',
    desc: 'Film transparente que sella la gráfica contra intemperie, rayos UV, agua y rayaduras mecánicas.',
    color: '#00F0FF',
    explodedOffset: -150,
    parallax: { x: 22, y: 15 },
    hoverLift: -14,
  },
  {
    id: 2,
    title: 'Tinta CMYK HD (300 DPI)',
    tag: '.CMYK / COLOR',
    format: '.AI',
    spec: 'Pigmento curado UV Fogra39',
    subtitle: 'Archivo a 300 DPI · impresión a 1200x1200dpi',
    desc: 'Microgotas de pigmento de alta saturación. Colores vivos, negros profundos y sin pixelación.',
    color: '#FF007A',
    explodedOffset: -72,
    parallax: { x: 14, y: 9 },
    hoverLift: -12,
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
    explodedOffset: 0,
    parallax: { x: 6, y: 4 },
    hoverLift: -8,
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
    explodedOffset: 68,
    parallax: { x: -2, y: -2 },
    hoverLift: 10,
  },
] as const;

export const SLAB_CENTER_Y = 265;

export interface FinishConfig {
  id: FinishMode;
  label: string;
  emoji: string;
  hint: string;
  activeClass: string;
  fill: string; // gradient key
  stroke: string;
  labelColor: string;
  connector: string;
  svgLabel: string;
}

export const FINISHES: readonly FinishConfig[] = [
  {
    id: 'uv-gloss',
    label: 'Brillo UV',
    emoji: '✨',
    hint: 'Laminado con brillo de alta refracción',
    activeClass: 'bg-cyan-400 text-black border-black shadow-brutal-sm',
    fill: 'cyanGlass',
    stroke: '#00F0FF',
    labelColor: '#00F0FF',
    connector: '#00F0FF',
    svgLabel: '.LAMINADO UV PRO',
  },
  {
    id: 'holographic',
    label: 'Holográfico',
    emoji: '🌈',
    hint: 'Efecto tornasolado arcoíris',
    activeClass:
      'bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 text-black border-black shadow-brutal-sm',
    fill: 'holoFoil',
    stroke: '#FFE500',
    labelColor: '#FFE500',
    connector: '#FF007A',
    svgLabel: '.HOLO FOIL TORNASOL',
  },
  {
    id: 'matte',
    label: 'Mate',
    emoji: '🌑',
    hint: 'Acabado satinado mate antirreflejo',
    activeClass: 'bg-zinc-200 text-black border-black shadow-brutal-sm',
    fill: 'matte',
    stroke: '#A1A1AA',
    labelColor: '#E4E4E7',
    connector: '#00F0FF',
    svgLabel: '.LAMINADO MATE SOFT',
  },
] as const;

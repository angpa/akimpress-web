export interface Product {
  id: string;
  name: string;
  category: 'tecnica' | 'escolar' | 'vinilos' | 'imprenta' | 'planos';
  categoryLabel: string;
  description: string;
  priceEstimate: string;
  badge?: string;
  popular?: boolean;
  features: string[];
  image: string;
}

export const CATEGORIES = [
  { id: 'all', label: 'Todos los Productos y Servicios' },
  { id: 'tecnica', label: '📐 Librería Técnica y Arquitectura' },
  { id: 'escolar', label: '🎒 Librería Escolar & Oficina' },
  { id: 'vinilos', label: '✨ Vinilos & Calcos Troquelados' },
  { id: 'imprenta', label: '🖨️ Imprenta & Gráfica Comercial' },
  { id: 'planos', label: '📑 Ploteo de Planos & Fotocopias' },
];

export const PRODUCTS: Product[] = [
  // LIBRERÍA TÉCNICA
  {
    id: 'tablero-plantec',
    name: 'Tablero de Dibujo Técnico Plantec con Paralela',
    category: 'tecnica',
    categoryLabel: 'Librería Técnica',
    description: 'Tablero portátil melamínico de alta resistencia con regla paralela incorporada y atriles regulables.',
    priceEstimate: 'Consultar según medida (50x60 o 60x80)',
    badge: 'Arquitectura & Diseño',
    popular: true,
    features: ['Madera melamínica blanca', 'Regla paralela con frenos', 'Atril de 4 posiciones', 'Funda de transporte opcional'],
    image: 'https://images.unsplash.com/photo-1581291518655-9523c932deda?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'escalimetro-triangular',
    name: 'Escalímetro Triangular Profesional Plantec / Pizzini',
    category: 'tecnica',
    categoryLabel: 'Librería Técnica',
    description: 'Escalímetro de 30cm con escalas 1:20, 1:25, 1:50, 1:75, 1:100, 1:125. Grabado de alta precisión indeleble.',
    priceEstimate: 'Desde $11.500',
    popular: true,
    features: ['6 escalas normalizadas', 'Cuerpo plástico blanco rígido', 'Franjas de color por escala', 'Estuche individual'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'microfibras-rotring-pizzini',
    name: 'Set Microfibras Graduadas (0.05 a 0.8 mm)',
    category: 'tecnica',
    categoryLabel: 'Librería Técnica',
    description: 'Punteras metálicas calibradas con tinta pigmentada negra resistente al agua y a la luz. Ideales para planos y croquis.',
    priceEstimate: 'Individual o set de 6 piezas',
    badge: 'Tinta indeleble',
    features: ['Punta fina de acero', 'Tinta de archivo libre de ácido', 'No traspasa el papel', 'Trazo uniforme'],
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'plancha-corte-cutter',
    name: 'Planchas de Corte Cicatrizantes (Cutting Mat A2 / A3)',
    category: 'tecnica',
    categoryLabel: 'Librería Técnica',
    description: 'Bases autorreparables para corte con cutter bisturí. Con cuadrícula milimetrada y guías angulares.',
    priceEstimate: 'Desde $14.800',
    features: ['Material autorregenerable 3 capas', 'Guías de 30°, 45°, 60° y 90°', 'Protege tus mesas y cuchillas', 'Doble faz'],
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'papel-romani-vegetal',
    name: 'Papel Vegetal & Romaní para Planos (Rollos y Hojas)',
    category: 'tecnica',
    categoryLabel: 'Librería Técnica',
    description: 'Papeles translúcidos y opacos de alto gramaje para dibujo técnico a tinta y lápiz.',
    priceEstimate: 'Hojas sueltas o resmas A4/A3/A2',
    features: ['Gramajes 90g, 110g, 150g', 'Apto tinta china y microfibras', 'No se deforma con el borrado'],
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80'
  },

  // VINILOS & CALCOS
  {
    id: 'vinilo-troquelado-calcos',
    name: 'Stickers & Calcomanías Troqueladas por Metro o Plancha',
    category: 'vinilos',
    categoryLabel: 'Vinilos & Gráfica',
    description: 'Impresión full color en vinilo adhesivo de alta resistencia al agua y sol. Corte con silueta personalizada (kiss-cut o die-cut).',
    priceEstimate: 'Desde $18.500 / metro cuadrado',
    badge: 'Más Vendido ⭐',
    popular: true,
    features: ['Resistente al agua y rayos UV', 'Corte exacto con tu forma y logo', 'Terminación Mate o Brillante', 'Entrega rápida'],
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'vinilo-esmerilado',
    name: 'Vinilo Esmerilado para Vidrios & Mamparas',
    category: 'vinilos',
    categoryLabel: 'Vinilos & Gráfica',
    description: 'Proporciona privacidad y elegancia en oficinas, locales y hogares dejando pasar la luz natural. Con o sin diseño calado.',
    priceEstimate: 'Cotización por m2 + Colocación opcional',
    popular: true,
    features: ['Privacidad total sin oscurecer', 'Logos calados en plotter', 'Apto interiores y exteriores', 'Fácil mantenimiento y limpieza'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'vinilo-decorativo-pared',
    name: 'Vinilos Decorativos para Paredes & Frases',
    category: 'vinilos',
    categoryLabel: 'Vinilos & Gráfica',
    description: 'Diseños modernos para dormitorios infantiles, cocinas, locales gastronómicos y oficinas. Vinilos de corte de colores puros.',
    priceEstimate: 'A medida según diseño',
    features: ['No daña la pintura al retirar', 'Más de 30 colores disponibles', 'Fácil de colocar con papel transfer', 'Diseños personalizados'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'vinilo-microperforado',
    name: 'Vinilo Microperforado para Vidrieras y Vehículos',
    category: 'vinilos',
    categoryLabel: 'Vinilos & Gráfica',
    description: 'Permite ver hacia el exterior desde adentro mientras que desde afuera se visualiza la publicidad impresa a pleno color.',
    priceEstimate: 'Por metro cuadrado impreso',
    features: ['Visión unidireccional', 'Protección solar leve', 'Ideal vidrieras a la calle y lunetas de autos', 'Tintas ecosolventes HD'],
    image: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?auto=format&fit=crop&w=600&q=80'
  },

  // IMPRENTA & GRÁFICA
  {
    id: 'tarjetas-personales',
    name: 'Tarjetas Personales & Comerciales Premium',
    category: 'imprenta',
    categoryLabel: 'Imprenta Comercial',
    description: 'Impresas en ilustración 350 grs full color frente o frente y dorso, con opción de laminado polipropileno mate o brillante.',
    priceEstimate: 'Packs por 100, 500 y 1.000 unidades',
    badge: 'Esenciales Negocio',
    popular: true,
    features: ['Ilustración pesada 350g', 'Laminado soft touch o brillo', 'Esquinas redondeadas opcionales', 'Diseño personalizado'],
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'folletos-flyers',
    name: 'Folletos y Flyers Publicitarios (10x15 / A5)',
    category: 'imprenta',
    categoryLabel: 'Imprenta Comercial',
    description: 'La mejor herramienta para difundir eventos, promociones y menúes en papel ilustración brillante de 150g.',
    priceEstimate: 'Desde 250 unidades',
    features: ['Full color offset y digital', 'Plegados simples o trípticos', 'Resolución fotográfica', 'Tiempos de entrega ágiles'],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'banner-rollup',
    name: 'Banners Roll-Up Autoenrollables con Estructura',
    category: 'imprenta',
    categoryLabel: 'Imprenta Comercial',
    description: 'Estructura liviana de aluminio con sistema retráctil y bolso de tela para transporte. Medida estándar 85x200 cm.',
    priceEstimate: 'Estructura + Lona impresa en HD',
    popular: true,
    features: ['Lona frontlight mate sin reflejos', 'Estructura autoenrollable fácil armado', 'Incluye bolso de transporte', 'Reutilizable para futuros eventos'],
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'talonarios-afip',
    name: 'Talonarios Comerciales & Recetarios Oficiales AFIP',
    category: 'imprenta',
    categoryLabel: 'Imprenta Comercial',
    description: 'Facturas, remitos, recibos con CAI y recetarios médicos con numeración correlativa y duplicados.',
    priceEstimate: 'Por 2, 4 o 10 talonarios',
    features: ['Puntillado de arranque fácil', 'Papel químico autocopiativo o común', 'Aprobados normativa AFIP/ARCA', 'Cartón soporte reforzado'],
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80'
  },

  // PLANOS & COPIAS
  {
    id: 'ploteo-planos-cad',
    name: 'Ploteo e Impresión de Planos CAD (A0, A1, A2)',
    category: 'planos',
    categoryLabel: 'Planos & Copias',
    description: 'Ploteo de planos de arquitectura, instalaciones eléctricas y sanitarias en papel obra 80g, vegetal o film poliester.',
    priceEstimate: 'Precio por metro lineal o por formato standard',
    badge: 'Entrega en el día',
    popular: true,
    features: ['Líneas nítidas de alta precisión', 'Plegado normalizado incluido', 'Papel obra 80/90g o vegetal', 'Recepción por WhatsApp/Email'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'anillados-encuadernacion',
    name: 'Anillados Doble Alambre & Espiralados Plásticos',
    category: 'planos',
    categoryLabel: 'Planos & Copias',
    description: 'Terminación profesional para apuntes universitarios, tesis, presentaciones comerciales y manuales técnicos.',
    priceEstimate: 'Desde $3.200 (incluye tapas)',
    features: ['Tapas de polipropileno cristal y color', 'Hasta 450 hojas por tomo', 'A4, Oficio y Carta', 'Pestañas separadoras opcionales'],
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'
  },

  // LIBRERÍA ESCOLAR
  {
    id: 'cuadernos-universitarios',
    name: 'Cuadernos Espiralados & Libretas A4/A5',
    category: 'escolar',
    categoryLabel: 'Librería Escolar',
    description: 'Cuadernos de primeras marcas (Rivadavia, Éxito, Ledesma) rayados y cuadriculados de 80 y 100 hojas de fibra virgen.',
    priceEstimate: 'Amplio stock escolar y universitario',
    features: ['Hojas de 90g micropunteadas', 'Tapa dura o polipropileno', 'Separadores de materias', 'Ideal estudio y oficina'],
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'marcadores-resaltadores',
    name: 'Sets de Resaltadores Pastel & Marcadores Permanentes',
    category: 'escolar',
    categoryLabel: 'Librería Escolar',
    description: 'Variedad completa de tonos pastel y fluorescentes Stabilo Boss, Trabi, Filgo y Edding para lettering y estudio.',
    priceEstimate: 'Packs de 4, 6 y 15 colores',
    badge: 'Tendencia Estudio',
    features: ['Tinta al agua anti-secado', 'Punta biselada doble grosor', 'Tonos vintage y pastel', 'Libres de tóxicos'],
    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&q=80'
  }
];

export const FAQ_ITEMS = [
  {
    q: '¿Cómo preparo mi archivo para imprimir o plotear?',
    a: 'Recomendamos enviar los archivos en formato PDF en tamaño real (escala 1:1), con las fuentes convertidas a curvas o trazados y en modo de color CMYK. Las imágenes deben tener un mínimo de 150 a 300 DPI de resolución.'
  },
  {
    q: '¿Hacen envíos a domicilio?',
    a: '¡Sí! Realizamos envíos rápidos en moto en Belgrano, Núñez, Palermo y toda CABA. Para el resto de Buenos Aires y el interior del país, despachamos por Correo Argentino, Andreani o Vía Cargo.'
  },
  {
    q: '¿Cuál es el tiempo de producción para vinilos y stickers?',
    a: 'Los ploteos de vinilos simples y planos suelen entregarse en el día o 24hs. Los calcos troquelados y trabajos de imprenta personalizada demoran habitualmente entre 24 y 72 horas hábiles.'
  },
  {
    q: '¿Dónde está ubicado el local y qué horarios tienen?',
    a: 'Nos encontramos en Juramento 1614, en pleno barrio de Belgrano, CABA (cerca de Av. del Libertador y Barrancas de Belgrano). Atendemos de Lunes a Viernes de 9:00 a 19:00 hs y Sábados de 9:30 a 13:30 hs.'
  },
  {
    q: '¿Qué medios de pago aceptan?',
    a: 'Aceptamos transferencias bancarias, Mercado Pago (dinero en cuenta, tarjetas de crédito/débito), efectivo en el local y facturas oficiales con IVA.'
  }
];


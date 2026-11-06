import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileCheck, 
  AlertCircle, 
  CheckCircle2, 
  Mail, 
  MessageCircle, 
  Info, 
  Trash2, 
  FileCode,
  Zap,
  Check
} from 'lucide-react';

export const FileUploadSection: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCmyk, setIsCmyk] = useState<boolean>(true);
  const [isCurved, setIsCurved] = useState<boolean>(true);
  const [isScaleOk, setIsScaleOk] = useState<boolean>(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <section id="subir-archivos" className="py-20 bg-[#FFFDEB] border-b-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Feastables Style */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-feast-cyan text-black border-3 border-black font-display font-black text-xs uppercase tracking-wider shadow-brutal-sm mb-3 -rotate-1">
            <FileCode className="w-4 h-4" />
            <span>ÁREA TÉCNICA & PRE-IMPRESIÓN</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black">
            ENVÍO Y CONTROL DE ARCHIVOS
          </h2>
          <p className="mt-3 text-black font-semibold text-sm sm:text-base">
            Comprobá que tu archivo cumpla las pautas técnicas de impresión para garantizar colores exactos y nitidez milimétrica.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive File Pre-check Box */}
          <div className="lg:col-span-7 bg-white border-4 border-black rounded-3xl p-6 sm:p-8 shadow-brutal-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display font-black text-xl uppercase text-black">
                Comprobador & Asistente de Envío
              </h3>
              <span className="bg-feast-yellow font-display font-black text-[10px] uppercase px-2 py-0.5 rounded border border-black">
                ⚡ RÁPIDO
              </span>
            </div>
            <p className="text-xs font-bold text-black/70 mb-5">
              Arrastrá tu archivo para validar el tamaño y generar el mensaje de envío directo a nuestro WhatsApp en Belgrano.
            </p>

            {/* Drag & Drop Area */}
            {!selectedFile ? (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="border-4 border-dashed border-black bg-feast-yellow/20 hover:bg-feast-yellow/40 rounded-3xl p-8 text-center transition-all cursor-pointer relative group shadow-brutal-sm"
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.ai,.eps,.cdr,.psd,.jpg,.jpeg,.png,.tiff"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-16 h-16 mx-auto rounded-2xl bg-feast-yellow text-black border-3 border-black shadow-brutal flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <UploadCloud className="w-8 h-8 stroke-[2.5]" />
                </div>
                <h4 className="font-display font-black text-base uppercase text-black mb-1">
                  Arrastrá tu archivo acá o hacé click para buscarlo
                </h4>
                <p className="text-xs font-bold text-black/70 mb-3">
                  Formatos aceptados: PDF, Illustrator (AI), Corel (CDR), Photoshop (PSD), TIFF o JPG en alta calidad
                </p>
                <span className="inline-block px-3 py-1 text-[11px] font-display font-black text-black bg-white rounded-full border-2 border-black shadow-brutal-sm">
                  Límite directo por WhatsApp: hasta 100 MB (para más peso usar Drive o WeTransfer)
                </span>
              </div>
            ) : (
              <div className="bg-white border-3 border-black rounded-2xl p-5 shadow-brutal space-y-4">
                <div className="flex items-center justify-between pb-3 border-b-2 border-black">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-feast-blue text-white border-2 border-black shadow-brutal-sm flex items-center justify-center">
                      <FileCheck className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="font-display font-black text-sm uppercase text-black truncate max-w-[200px] sm:max-w-xs">
                        {selectedFile.name}
                      </div>
                      <div className="text-xs font-bold text-black/70">
                        {formatFileSize(selectedFile.size)} • {selectedFile.type || 'Archivo listo'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedFile(null)}
                    className="p-2 text-black hover:text-white hover:bg-black rounded-xl border-2 border-black transition-colors"
                    title="Quitar archivo"
                  >
                    <Trash2 className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                {/* Checklist Feastables Style */}
                <div className="bg-[#FFFDEB] rounded-2xl p-4 space-y-2.5 border-3 border-black shadow-brutal-sm">
                  <span className="font-display font-black text-xs uppercase text-black block mb-1">
                    Checklist de control antes de enviar:
                  </span>
                  <label className="flex items-start gap-2.5 text-xs font-bold text-black cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCmyk}
                      onChange={(e) => setIsCmyk(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-2 border-black accent-black cursor-pointer"
                    />
                    <span>Modo de color <strong>CMYK</strong> (evita variaciones de tono RGB en pantalla).</span>
                  </label>
                  <label className="flex items-start gap-2.5 text-xs font-bold text-black cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCurved}
                      onChange={(e) => setIsCurved(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-2 border-black accent-black cursor-pointer"
                    />
                    <span>Tipografías y fuentes <strong>convertidas a curvas / trazados</strong>.</span>
                  </label>
                  <label className="flex items-start gap-2.5 text-xs font-bold text-black cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isScaleOk}
                      onChange={(e) => setIsScaleOk(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-2 border-black accent-black cursor-pointer"
                    />
                    <span>Escala real 1:1 con 2mm de demasía o sangría perimetral.</span>
                  </label>
                </div>

                {/* Dispatch buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={`https://wa.me/5491125809266?text=${encodeURIComponent(
                      `Hola Akimpress! Tengo listo para imprimir el archivo: ${selectedFile.name} (${formatFileSize(selectedFile.size)}). ¿Se los envío por acá?`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 btn-brutal-lime py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-black text-feast-lime" />
                    <span>Avisar y Enviar por WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:Akimpressbelgrano@gmail.com?subject=Archivo para Impresión - ${encodeURIComponent(selectedFile.name)}&body=Hola Akimpress,%0D%0A%0D%0AAdjunto el archivo ${encodeURIComponent(selectedFile.name)} para presupuesto e impresión.%0D%0A%0D%0ASaludos!`}
                    className="btn-brutal bg-black text-white hover:bg-zinc-800 py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Enviar por Email</span>
                  </a>
                </div>
              </div>
            )}

            {/* Note on large files */}
            <div className="mt-5 p-4 bg-feast-yellow rounded-2xl border-3 border-black text-black text-xs font-bold flex items-start gap-3 shadow-brutal-sm">
              <Info className="w-5 h-5 text-black shrink-0 stroke-[2.5]" />
              <div>
                <strong className="font-display font-black uppercase block mb-0.5">¿Archivos pesados mayores a 50 MB?</strong>
                Podés compartirlos por link de Google Drive, WeTransfer o Dropbox a nuestro mail: 
                <a href="mailto:Akimpressbelgrano@gmail.com" className="font-black underline ml-1">Akimpressbelgrano@gmail.com</a>
              </div>
            </div>

          </div>

          {/* Right Column: Printing guidelines in Feastables Black Box */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-black text-white rounded-3xl border-4 border-black p-6 sm:p-7 shadow-brutal-xl">
              <div className="inline-block bg-feast-pink text-white font-display font-black text-xs uppercase px-2.5 py-1 rounded-md mb-2">
                REGLAS DE ORO
              </div>
              <h4 className="font-display font-black text-2xl uppercase tracking-tight text-feast-yellow mb-4">
                GUÍA PARA IMPRENTA & PLOTEO
              </h4>

              <div className="space-y-4 text-xs font-bold text-zinc-300">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-feast-yellow text-black border-2 border-white flex items-center justify-center shrink-0 font-display font-black">1</div>
                  <div>
                    <strong className="text-white font-display font-black uppercase block mb-0.5">Espacio de Color: CMYK</strong>
                    Las pantallas muestran RGB pero los plotters e imprentas imprimen en CMYK. Usar CMYK garantiza colores fieles.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-feast-yellow text-black border-2 border-white flex items-center justify-center shrink-0 font-display font-black">2</div>
                  <div>
                    <strong className="text-white font-display font-black uppercase block mb-0.5">Tipografías a Curvas / Outlines</strong>
                    Convertí todos los textos a curvas para que no se altere ninguna fuente tipográfica al abrir el diseño.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-feast-yellow text-black border-2 border-white flex items-center justify-center shrink-0 font-display font-black">3</div>
                  <div>
                    <strong className="text-white font-display font-black uppercase block mb-0.5">Resolución 300 DPI</strong>
                    Tarjetas y folletos necesitan 300 DPI al 100% de escala para que no salgan pixelados.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-feast-yellow text-black border-2 border-white flex items-center justify-center shrink-0 font-display font-black">4</div>
                  <div>
                    <strong className="text-white font-display font-black uppercase block mb-0.5">Demasía de Corte (2 mm)</strong>
                    Dejá 2 mm de excedente en impresiones de corte recto, manteniendo textos y logos a 4 mm del borde.
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Help Pill */}
            <div className="bg-feast-cyan text-black border-3 border-black rounded-3xl p-5 shadow-brutal">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white text-black border-2 border-black shadow-brutal-sm flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h5 className="font-display font-black text-sm uppercase text-black">
                    ¿Dudas armando tu archivo?
                  </h5>
                  <p className="text-xs font-bold text-black/80">
                    Mandanos un WhatsApp y nuestro equipo de diseño te asiste sin costo para revisarlo.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

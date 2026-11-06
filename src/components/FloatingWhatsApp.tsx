import React, { useState } from 'react';
import { MessageCircle, X, Zap } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip speech bubble Feastables Style */}
      {showTooltip && (
        <div className="relative mb-3 bg-feast-yellow text-black border-3 border-black text-xs font-bold px-4 py-2.5 rounded-2xl shadow-brutal-md max-w-xs animate-bounce-slight flex items-center gap-3">
          <div>
            <span className="font-display font-black text-black block uppercase text-xs">
              ⚡ ¿DUDAS O PEDIDOS?
            </span>
            <span className="text-[11px] font-bold text-black/80">Respondemos al toque por WhatsApp</span>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center shrink-0 hover:bg-zinc-800"
            aria-label="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5 stroke-[3]" />
          </button>
          <div className="absolute -bottom-2 right-6 w-3.5 h-3.5 bg-feast-yellow border-b-3 border-r-3 border-black rotate-45"></div>
        </div>
      )}

      {/* Button */}
      <a
        href="https://wa.me/5491125809266?text=Hola%20Akimpress!%20Quisiera%20hacer%20una%20consulta%20desde%20la%20web."
        target="_blank"
        rel="noreferrer"
        className="w-16 h-16 rounded-2xl bg-feast-lime hover:bg-lime-300 text-black border-3 border-black shadow-brutal-lg flex items-center justify-center transition-all transform hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-xl active:translate-x-1 active:translate-y-1 active:shadow-none group relative select-none"
        aria-label="Contactar por WhatsApp"
      >
        <span className="absolute -top-2 -right-2 bg-feast-pink text-white font-display font-black text-[10px] w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
          !
        </span>
        <MessageCircle className="w-8 h-8 fill-black text-feast-lime group-hover:scale-110 transition-transform stroke-[2.5]" />
      </a>
    </div>
  );
};

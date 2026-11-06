import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  MessageCircle, 
  ShoppingBag, 
  MapPin, 
  Truck, 
  Sparkles, 
  CheckCircle2,
  Plus,
  Minus,
  Zap
} from 'lucide-react';

export interface CartItem {
  id: string;
  name: string;
  categoryLabel: string;
  details?: string;
  priceEstimate: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) => {
  const [deliveryMethod, setDeliveryMethod] = useState<'retiro' | 'envio'>('retiro');
  const [customerName, setCustomerName] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isOpen) return null;

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const generateWhatsAppMessage = () => {
    let msg = `Hola Akimpress! Quisiera solicitar presupuesto / pedido con los siguientes ítems de la web:\n\n`;
    
    items.forEach((item, index) => {
      msg += `🔹 *${index + 1}. ${item.name}* (x${item.quantity})\n`;
      if (item.details) {
        msg += `   Detalle: ${item.details}\n`;
      }
      msg += `   Est.: ${item.priceEstimate}\n\n`;
    });

    msg += `📍 *Modalidad:* ${deliveryMethod === 'retiro' ? 'Retiro en local (Juramento 1614, Belgrano)' : 'Envío a domicilio / Interior'}\n`;
    
    if (customerName.trim()) {
      msg += `👤 *Nombre:* ${customerName.trim()}\n`;
    }
    if (customerNotes.trim()) {
      msg += `📝 *Aclaraciones:* ${customerNotes.trim()}\n`;
    }

    msg += `\n¿Me confirman el presupuesto final y tiempos de producción? ¡Muchas gracias!`;

    return encodeURIComponent(msg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel Feastables Pop */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FFFDEB] border-l-4 border-black shadow-brutal-xl flex flex-col text-black">
          
          {/* Drawer Header in Feastables Yellow */}
          <div className="p-5 bg-feast-yellow text-black flex items-center justify-between border-b-3 border-black">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black text-feast-yellow border-2 border-black shadow-brutal-sm flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-display font-black text-lg uppercase text-black">
                  Tu Bolsa de Pedido
                </h3>
                <p className="text-xs font-bold text-black/70">
                  {totalItemCount} {totalItemCount === 1 ? 'ítem seleccionado' : 'ítems seleccionados'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white hover:bg-black hover:text-white text-black border-2 border-black flex items-center justify-center transition-colors shadow-brutal-sm"
            >
              <X className="w-5 h-5 stroke-[3]" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 rounded-3xl bg-feast-yellow border-3 border-black text-black flex items-center justify-center mx-auto mb-4 shadow-brutal rotate-3">
                  <ShoppingBag className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h4 className="font-display font-black text-black text-xl uppercase mb-1">
                  Tu bolsa está vacía
                </h4>
                <p className="text-xs font-bold text-black/70 max-w-xs mx-auto mb-6">
                  Podés sumar artículos desde el catálogo o usar el cotizador interactivo express para calcular trabajos a medida.
                </p>
                <button
                  onClick={onClose}
                  className="btn-brutal-yellow px-6 py-3 rounded-xl text-xs"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b-2 border-black">
                  <span className="font-display font-black text-xs uppercase text-black">
                    Artículos en Bolsa
                  </span>
                  <button
                    onClick={onClearCart}
                    className="font-display font-black text-[11px] uppercase text-feast-pink hover:underline"
                  >
                    Vaciar todo
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-white rounded-2xl border-3 border-black shadow-brutal-sm relative group"
                    >
                      <div className="flex justify-between items-start gap-2 mb-1.5">
                        <span className="font-display font-black text-[10px] uppercase bg-feast-yellow text-black border border-black px-2 py-0.5 rounded">
                          {item.categoryLabel}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-black/60 hover:text-feast-pink transition-colors p-1"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </div>

                      <h5 className="font-display font-black text-sm uppercase text-black leading-tight">
                        {item.name}
                      </h5>

                      {item.details && (
                        <p className="text-[11px] font-bold text-black/80 mt-1.5 leading-snug bg-slate-50 p-2 rounded-xl border border-black/20">
                          {item.details}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t-2 border-black/10">
                        <span className="font-display font-black text-xs uppercase bg-black text-white px-2 py-0.5 rounded">
                          {item.priceEstimate}
                        </span>

                        <div className="flex items-center gap-2 bg-[#FFFDEB] border-2 border-black rounded-xl p-1 shadow-brutal-sm">
                          <button
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center hover:bg-zinc-800"
                            title="Restar"
                          >
                            <Minus className="w-3 h-3 stroke-[3]" />
                          </button>
                          <span className="font-display font-black text-xs w-5 text-center text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center hover:bg-zinc-800"
                            title="Sumar"
                          >
                            <Plus className="w-3 h-3 stroke-[3]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Options */}
                <div className="pt-3 border-t-2 border-black space-y-2.5">
                  <span className="font-display font-black text-xs uppercase text-black block">
                    Modalidad de Entrega:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDeliveryMethod('retiro')}
                      className={`p-3 rounded-xl border-3 border-black text-left text-xs font-display font-black uppercase flex items-center gap-2 transition-all select-none ${
                        deliveryMethod === 'retiro'
                          ? 'bg-feast-yellow text-black shadow-brutal-sm -translate-y-0.5'
                          : 'bg-white text-black hover:bg-slate-100 shadow-brutal-sm'
                      }`}
                    >
                      <MapPin className="w-4 h-4 stroke-[2.5] text-black shrink-0" />
                      <div>
                        <div>Retiro Local</div>
                        <div className="text-[9px] font-bold text-black/70">Juramento 1614</div>
                      </div>
                    </button>

                    <button
                      onClick={() => setDeliveryMethod('envio')}
                      className={`p-3 rounded-xl border-3 border-black text-left text-xs font-display font-black uppercase flex items-center gap-2 transition-all select-none ${
                        deliveryMethod === 'envio'
                          ? 'bg-feast-cyan text-black shadow-brutal-sm -translate-y-0.5'
                          : 'bg-white text-black hover:bg-slate-100 shadow-brutal-sm'
                      }`}
                    >
                      <Truck className="w-4 h-4 stroke-[2.5] text-black shrink-0" />
                      <div>
                        <div>Envío</div>
                        <div className="text-[9px] font-bold text-black/70">CABA e Interior</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Additional Inputs */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block font-display font-black text-xs uppercase text-black mb-1">
                      Tu Nombre / Empresa (opcional):
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Carolina López"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border-2 border-black bg-white focus:outline-none shadow-brutal-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-display font-black text-xs uppercase text-black mb-1">
                      Comentarios o fecha límite (opcional):
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ej: Lo necesito para el jueves a la tarde, tengo el PDF listo..."
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full text-xs font-bold px-3 py-2 rounded-xl border-2 border-black bg-white focus:outline-none shadow-brutal-sm"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer / Dispatch Button */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t-3 border-black space-y-3 shadow-brutal">
              <a
                href={`https://wa.me/5491125809266?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noreferrer"
                className="w-full btn-brutal-lime py-4 px-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-brutal-md"
              >
                <MessageCircle className="w-5 h-5 fill-black text-feast-lime" />
                <span>Enviar Pedido a WhatsApp</span>
              </a>

              <p className="text-[10px] font-bold text-center text-black/70">
                Se abrirá WhatsApp con el desglose listo para enviar a <strong>11 2580-9266</strong>.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Truck, 
  Send, 
  ChevronDown, 
  CheckCircle2, 
  Navigation,
  ShoppingBag,
  ExternalLink,
  Zap
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/catalog';

export const LocationAndHours: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre || !formData.mensaje) return;

    setFormSent(true);
    setTimeout(() => {
      const text = `Hola Akimpress! Consulta desde el formulario web:%0A*Nombre:* ${encodeURIComponent(formData.nombre)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A*Tel:* ${encodeURIComponent(formData.telefono)}%0A*Consulta:* ${encodeURIComponent(formData.mensaje)}`;
      window.open(`https://wa.me/5491125809266?text=${text}`, '_blank');
    }, 800);
  };

  return (
    <section id="contacto" className="py-20 bg-[#FFFDEB] border-b-3 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Feastables Style */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-feast-yellow text-black border-3 border-black font-display font-black text-xs uppercase tracking-wider shadow-brutal-sm mb-3 -rotate-1">
            <MapPin className="w-4 h-4" />
            <span>BELGRANO • CABA • LOCAL A LA CALLE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-black">
            LOCAL, HORARIOS & CONTACTO
          </h2>
          <p className="mt-3 text-black font-semibold text-sm sm:text-base">
            Vení a nuestro local en Belgrano o consultanos online. Envíos express a todo el país.
          </p>
        </div>

        {/* 2-Column Info & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Address & Store Card */}
            <div className="bg-white rounded-3xl p-6 border-3 border-black shadow-brutal">
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-2xl bg-feast-pink text-white border-2 border-black shadow-brutal-sm flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-display font-black text-black text-lg uppercase mb-1">
                    Juramento 1614 • Belgrano
                  </h4>
                  <p className="text-xs font-bold text-black/80 mb-3 leading-relaxed">
                    CABA. Entre Montañeses y Arribeños / Av. del Libertador (zona Barrancas de Belgrano).
                  </p>
                  <a
                    href="https://maps.google.com/?q=Juramento+1614,+Belgrano,+CABA"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-display font-black uppercase text-feast-blue hover:text-blue-700 underline"
                  >
                    <Navigation className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Abrir en Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-[#FFF58A] rounded-3xl p-6 border-3 border-black shadow-brutal">
              <div className="flex items-start gap-4">
                <div className="w-13 h-13 rounded-2xl bg-feast-yellow text-black border-2 border-black shadow-brutal-sm flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div className="w-full">
                  <h4 className="font-display font-black text-black text-lg uppercase mb-2">
                    Horarios de Atención
                  </h4>
                  <div className="space-y-1.5 text-xs font-bold text-black">
                    <div className="flex justify-between py-1 border-b-2 border-black/20">
                      <span>Lunes a Viernes:</span>
                      <span className="font-display font-black uppercase bg-black text-white px-2 py-0.5 rounded">09:00 a 19:00 hs</span>
                    </div>
                    <div className="flex justify-between py-1 border-b-2 border-black/20">
                      <span>Sábados:</span>
                      <span className="font-display font-black uppercase bg-black text-white px-2 py-0.5 rounded">09:30 a 13:30 hs</span>
                    </div>
                    <div className="flex justify-between py-1 text-black/60">
                      <span>Domingos y Feriados:</span>
                      <span>Cerrado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp & Email Quick Links */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/5491125809266?text=Hola%20Akimpress!%20Quiero%20hacer%20una%20consulta."
                target="_blank"
                rel="noreferrer"
                className="btn-brutal-lime rounded-2xl p-4 flex flex-col justify-between items-start text-left shadow-brutal"
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <Phone className="w-5 h-5 stroke-[2.5] text-black" />
                  <span className="text-[10px] uppercase font-display font-black bg-black text-white px-2 py-0.5 rounded">Al toque</span>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-black/60">WhatsApp</div>
                  <div className="font-display font-black text-sm uppercase text-black">11 2580-9266</div>
                </div>
              </a>

              <a
                href="mailto:Akimpressbelgrano@gmail.com"
                className="btn-brutal bg-black text-white hover:bg-zinc-800 rounded-2xl p-4 flex flex-col justify-between items-start text-left shadow-brutal"
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <Mail className="w-5 h-5 text-feast-yellow stroke-[2.5]" />
                  <span className="text-[10px] uppercase font-display font-black bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">Correo</span>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase text-zinc-400">Email Oficial</div>
                  <div className="font-display font-black text-xs uppercase text-white truncate w-full">Akimpressbelgrano</div>
                </div>
              </a>
            </div>

            {/* Nationwide Shipping banner */}
            <div className="p-4 rounded-2xl bg-feast-cyan text-black border-3 border-black shadow-brutal flex items-center gap-3">
              <Truck className="w-8 h-8 text-black shrink-0 stroke-[2.5]" />
              <div className="text-xs font-bold text-black leading-snug">
                <strong className="font-display font-black uppercase block">📦 Envíos a todo el país:</strong> 
                Motos en CABA y Gran Buenos Aires; al interior por encomienda y Correo Argentino.
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive View & Contact Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Embedded Map in Feastables Frame */}
            <div className="bg-white rounded-3xl overflow-hidden border-4 border-black shadow-brutal-lg h-72 sm:h-80 relative">
              <iframe
                title="Akimpress Belgrano Ubicación"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=Juramento+1614,+Belgrano,+CABA,+Argentina&t=&z=16&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="absolute top-3 left-3 bg-feast-yellow border-2 border-black px-3 py-1.5 rounded-xl shadow-brutal-sm text-xs font-display font-black text-black flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping"></span>
                <span>JURAMENTO 1614 - BELGRANO</span>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-4 border-black shadow-brutal-xl">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-display font-black text-black text-xl uppercase">
                  Envianos tu consulta o pedido
                </h4>
                <span className="bg-feast-pink text-white font-display font-black text-[10px] uppercase px-2 py-0.5 rounded border border-black">
                  ONLINE
                </span>
              </div>
              <p className="text-xs font-bold text-black/70 mb-5">
                Te contestamos de inmediato por WhatsApp o email con el presupuesto final.
              </p>

              {formSent ? (
                <div className="p-6 bg-feast-lime rounded-2xl border-3 border-black text-center space-y-2 shadow-brutal-sm">
                  <CheckCircle2 className="w-12 h-12 text-black stroke-[3] mx-auto" />
                  <h5 className="font-display font-black text-base uppercase text-black">¡Consulta enviada con éxito!</h5>
                  <p className="text-xs font-bold text-black max-w-sm mx-auto">
                    Si no se abrió automáticamente tu WhatsApp, podés escribirnos directo al <strong>11 2580-9266</strong>.
                  </p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="btn-brutal-white px-4 py-2 rounded-xl text-xs mt-2"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-display font-black text-xs uppercase text-black mb-1">
                        Tu Nombre *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nombre completo"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full text-xs font-bold px-4 py-3 rounded-xl border-3 border-black bg-white focus:outline-none focus:bg-feast-yellow/20 shadow-brutal-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-display font-black text-xs uppercase text-black mb-1">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Ej: 11 5555-5555"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full text-xs font-bold px-4 py-3 rounded-xl border-3 border-black bg-white focus:outline-none focus:bg-feast-yellow/20 shadow-brutal-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-display font-black text-xs uppercase text-black mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="tunombre@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full text-xs font-bold px-4 py-3 rounded-xl border-3 border-black bg-white focus:outline-none focus:bg-feast-yellow/20 shadow-brutal-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-display font-black text-xs uppercase text-black mb-1">
                      Mensaje / Trabajo a realizar *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Detallá tipo de trabajo, medidas, cantidades o dudas..."
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      className="w-full text-xs font-bold px-4 py-3 rounded-xl border-3 border-black bg-white focus:outline-none focus:bg-feast-yellow/20 shadow-brutal-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-brutal-blue py-3.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-brutal-md"
                  >
                    <Send className="w-4 h-4 stroke-[3]" />
                    <span>Enviar Consulta a Akimpress</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* FAQ Accordion Section in Feastables Style */}
        <div className="mt-16 pt-12 border-t-3 border-black">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-block bg-feast-pink text-white font-display font-black text-[11px] uppercase px-3 py-1 rounded-full border-2 border-black shadow-brutal-sm mb-2 -rotate-1">
              ¿DUDAS?
            </div>
            <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-black">
              PREGUNTAS FRECUENTES
            </h3>
            <p className="text-xs sm:text-sm font-bold text-black/70 mt-1">
              Respuestas rápidas sobre entregas, ploteos, papeles y formas de pago.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3.5">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border-3 border-black overflow-hidden transition-all shadow-brutal-sm ${
                    isOpen ? 'bg-feast-yellow' : 'bg-white hover:bg-slate-50'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-display font-black text-xs sm:text-sm uppercase text-black transition-colors"
                  >
                    <span>{item.q}</span>
                    <div className="w-8 h-8 rounded-xl bg-white border-2 border-black flex items-center justify-center shrink-0">
                      <ChevronDown
                        className={`w-4 h-4 text-black stroke-[3] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs font-bold text-black/90 leading-relaxed border-t-2 border-black/30 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

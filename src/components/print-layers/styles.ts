/** Scoped styles. Everything is prefixed `ipl-` to avoid leaking into the page. */
export const IPL_CSS = `
@keyframes iplLaserSweep {
  0% { transform: translate(-140px, -140px); opacity: 0; }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translate(140px, 140px); opacity: 0; }
}
@keyframes iplSheen {
  0%, 15% { transform: translate(-130px, -80px) rotate(-35deg); opacity: 0; }
  25% { opacity: 0.9; }
  55% { transform: translate(160px, 110px) rotate(-35deg); opacity: 0.9; }
  65%, 100% { opacity: 0; }
}
@keyframes iplHolo { to { filter: hue-rotate(360deg); } }
@keyframes iplFlow { from { stroke-dashoffset: 24; } to { stroke-dashoffset: 0; } }
@keyframes iplBreathe1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes iplBreathe2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
@keyframes iplBreathe3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-2px); } }

.ipl-sheen { animation: iplSheen 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
.ipl-laser { animation: iplLaserSweep 2.8s ease-in-out infinite; }
.ipl-holo { animation: iplHolo 6s linear infinite; }
.ipl-flow { animation: iplFlow 1.2s linear infinite; }
.ipl-breathe-1 { animation: iplBreathe1 4.5s ease-in-out infinite; }
.ipl-breathe-2 { animation: iplBreathe2 4.5s ease-in-out infinite 0.6s; }
.ipl-breathe-3 { animation: iplBreathe3 4.5s ease-in-out infinite 1.2s; }

.ipl-layer { outline: none; }
.ipl-layer:focus-visible rect:first-of-type,
.ipl-layer:focus-visible polygon:first-of-type { filter: drop-shadow(0 0 6px #fff); }

/* Pause everything while off-screen */
.ipl-root[data-paused="true"] *, .ipl-root[data-paused="true"] *::before { animation-play-state: paused !important; }

@media (prefers-reduced-motion: reduce) {
  .ipl-root *, .ipl-root *::before { animation: none !important; transition-duration: 0.01ms !important; }
}
`;

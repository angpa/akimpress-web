import React from 'react';
import type { LayerConfig } from './config';

interface LayerGroupProps {
  layer: LayerConfig;
  /** Resolved Y position (anchor + explosion + hover lift). */
  y: number;
  active: boolean;
  dimmed: boolean;
  pinned: boolean;
  breathe: boolean;
  breatheClass: string;
  parallaxRef: (el: SVGGElement | null) => void;
  onHover: (id: LayerConfig['id']) => void;
  onUnhover: () => void;
  onFocusLayer: (id: LayerConfig['id']) => void;
  onBlurLayer: () => void;
  onToggle: (id: LayerConfig['id']) => void;
  children: React.ReactNode;
}

/**
 * Shared interactive shell for one SVG layer: positioning, dimming,
 * parallax hook-up, pointer/keyboard/touch handling and a11y semantics.
 */
export const LayerGroup: React.FC<LayerGroupProps> = ({
  layer, y, active, dimmed, pinned, breathe, breatheClass, parallaxRef,
  onHover, onUnhover, onFocusLayer, onBlurLayer, onToggle, children,
}) => (
  <g
    className="ipl-layer"
    role="button"
    tabIndex={0}
    aria-pressed={pinned}
    aria-label={`${layer.title}. ${layer.spec}`}
    style={{
      transform: `translate(0px, ${y}px)`,
      transition: 'transform 200ms ease-out, opacity 200ms ease-out',
      opacity: dimmed ? 0.35 : 1,
      cursor: 'pointer',
    }}
    onPointerEnter={(e) => e.pointerType === 'mouse' && onHover(layer.id)}
    onPointerLeave={(e) => e.pointerType === 'mouse' && onUnhover()}
    onFocus={() => onFocusLayer(layer.id)}
    onBlur={onBlurLayer}
    onClick={() => onToggle(layer.id)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle(layer.id);
      }
    }}
    data-active={active || undefined}
  >
    <g ref={parallaxRef} style={{ transition: 'transform 150ms ease-out' }}>
      <g className={breathe ? breatheClass : undefined}>{children}</g>
    </g>
  </g>
);

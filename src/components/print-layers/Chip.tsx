import React from 'react';

interface ChipProps {
  x: number;
  y: number;
  label: string;
  fontSize?: number;
  left: string;
  right: string;
  stroke: string;
  gradId: string;
  active: boolean;
}

/** Small isometric "file format" tile that floats beside a layer. */
export const Chip: React.FC<ChipProps> = ({ x, y, label, fontSize = 9, left, right, stroke, gradId, active }) => (
  <g
    transform={`translate(${x}, ${y})`}
    className="transition-opacity duration-200"
    opacity={active ? 1 : 0.85}
    pointerEvents="none"
  >
    <polygon points="-18,-3 0,7 0,13 -18,3" fill={left} stroke={stroke} strokeWidth="1" />
    <polygon points="0,7 18,-3 18,3 0,13" fill={right} stroke={stroke} strokeWidth="1" />
    <g transform="scale(1, 0.55) rotate(45)">
      <rect x="-13" y="-13" width="26" height="26" rx="4" fill={`url(#${gradId})`} stroke={stroke} strokeWidth="1.5" />
    </g>
    <text x="0" y="2" fill="#FFFFFF" fontSize={fontSize} fontFamily="monospace" fontWeight="bold" textAnchor="middle">
      {label}
    </text>
  </g>
);

import React from 'react';
import { KemenagLogo } from './KemenagLogo';

interface KemenagTteQrProps {
  className?: string;
  size?: number;
  customImageUrl?: string;
}

export const KemenagTteQr: React.FC<KemenagTteQrProps> = ({
  className = 'w-16 h-16',
  size,
  customImageUrl,
}) => {
  if (customImageUrl) {
    return (
      <div
        className={`${className} shrink-0 bg-white flex items-center justify-center`}
        style={size ? { width: size, height: size } : undefined}
      >
        <img
          src={customImageUrl}
          alt="TTE QR Code"
          className="max-h-full max-w-full object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  // Authentic Kemenag QR Code with high-fidelity modules and center emblem
  return (
    <div
      className={`${className} shrink-0 bg-white flex items-center justify-center select-none relative`}
      style={size ? { width: size, height: size } : undefined}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        shapeRendering="crispEdges"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* White background */}
        <rect width="200" height="200" fill="#FFFFFF" />

        {/* --- Top Left Finder Pattern (7x7) --- */}
        {/* Outer 7x7 box (x: 12..68, y: 12..68) */}
        <rect x="12" y="12" width="56" height="56" fill="#000000" />
        <rect x="20" y="20" width="40" height="40" fill="#FFFFFF" />
        {/* Inner 3x3 solid center (x: 28..52, y: 28..52) */}
        <rect x="28" y="28" width="24" height="24" fill="#000000" />

        {/* --- Top Right Finder Pattern (7x7) --- */}
        {/* Outer 7x7 box (x: 132..188, y: 12..68) */}
        <rect x="132" y="12" width="56" height="56" fill="#000000" />
        <rect x="140" y="20" width="40" height="40" fill="#FFFFFF" />
        {/* Inner 3x3 solid center */}
        <rect x="148" y="28" width="24" height="24" fill="#000000" />

        {/* --- Bottom Left Finder Pattern (7x7) --- */}
        {/* Outer 7x7 box (x: 12..68, y: 132..188) */}
        <rect x="12" y="132" width="56" height="56" fill="#000000" />
        <rect x="20" y="140" width="40" height="40" fill="#FFFFFF" />
        {/* Inner 3x3 solid center */}
        <rect x="28" y="148" width="24" height="24" fill="#000000" />

        {/* --- Timing Patterns (alternating black/white) --- */}
        {/* Horizontal timing at y: 40 */}
        <g fill="#000000">
          <rect x="76" y="40" width="8" height="8" />
          <rect x="92" y="40" width="8" height="8" />
          <rect x="108" y="40" width="8" height="8" />
          <rect x="124" y="40" width="8" height="8" />

          {/* Vertical timing at x: 40 */}
          <rect x="40" y="76" width="8" height="8" />
          <rect x="40" y="92" width="8" height="8" />
          <rect x="40" y="108" width="8" height="8" />
          <rect x="40" y="124" width="8" height="8" />
        </g>

        {/* --- Alignment Pattern (Bottom Right at x: 148, y: 148) --- */}
        <rect x="144" y="144" width="32" height="32" fill="#000000" />
        <rect x="152" y="152" width="16" height="16" fill="#FFFFFF" />
        <rect x="156" y="156" width="8" height="8" fill="#000000" />

        {/* --- Data Modules (Grid 8px step) --- */}
        <g fill="#000000">
          {/* Top band data */}
          <rect x="76" y="16" width="8" height="8" />
          <rect x="84" y="16" width="8" height="8" />
          <rect x="100" y="16" width="8" height="16" />
          <rect x="116" y="16" width="8" height="8" />

          <rect x="76" y="28" width="16" height="8" />
          <rect x="108" y="28" width="8" height="8" />
          <rect x="124" y="24" width="8" height="12" />

          <rect x="84" y="48" width="8" height="8" />
          <rect x="100" y="48" width="16" height="8" />
          <rect x="124" y="48" width="8" height="8" />

          {/* Left band data */}
          <rect x="16" y="76" width="8" height="8" />
          <rect x="28" y="76" width="8" height="16" />
          <rect x="16" y="92" width="16" height="8" />
          <rect x="16" y="108" width="8" height="8" />
          <rect x="28" y="108" width="8" height="8" />
          <rect x="20" y="120" width="16" height="8" />

          <rect x="48" y="76" width="8" height="8" />
          <rect x="56" y="84" width="8" height="16" />
          <rect x="48" y="108" width="8" height="8" />
          <rect x="56" y="116" width="8" height="8" />

          {/* Right band data */}
          <rect x="132" y="76" width="16" height="8" />
          <rect x="156" y="76" width="8" height="16" />
          <rect x="172" y="76" width="16" height="8" />

          <rect x="140" y="92" width="8" height="8" />
          <rect x="164" y="92" width="16" height="8" />
          <rect x="140" y="108" width="16" height="8" />
          <rect x="172" y="108" width="16" height="8" />
          <rect x="132" y="124" width="8" height="8" />
          <rect x="156" y="124" width="16" height="8" />

          {/* Bottom band data */}
          <rect x="76" y="136" width="8" height="8" />
          <rect x="92" y="136" width="16" height="8" />
          <rect x="116" y="136" width="8" height="8" />

          <rect x="76" y="152" width="16" height="8" />
          <rect x="100" y="152" width="8" height="16" />
          <rect x="116" y="152" width="16" height="8" />

          <rect x="84" y="168" width="8" height="16" />
          <rect x="108" y="168" width="16" height="8" />
          <rect x="124" y="168" width="8" height="16" />

          <rect x="16" y="172" width="8" height="16" />
          <rect x="48" y="176" width="16" height="8" />
          <rect x="144" y="180" width="16" height="8" />
          <rect x="168" y="180" width="16" height="8" />

          {/* Corner fillers */}
          <rect x="72" y="72" width="8" height="8" />
          <rect x="120" y="72" width="8" height="8" />
          <rect x="72" y="120" width="8" height="8" />
          <rect x="120" y="120" width="8" height="8" />
        </g>

        {/* --- Center Clear Protective Zone for Kemenag Emblem --- */}
        <rect
          x="66"
          y="66"
          width="68"
          height="68"
          fill="#FFFFFF"
          rx="6"
        />
        <rect
          x="68"
          y="68"
          width="64"
          height="64"
          fill="#FFFFFF"
          stroke="#E5E7EB"
          strokeWidth="1"
          rx="4"
        />
      </svg>

      {/* Official Kemenag Logo Badge inside the center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[36%] h-[36%] flex items-center justify-center">
          <KemenagLogo className="w-full h-full drop-shadow-xs" variant="color" />
        </div>
      </div>
    </div>
  );
};

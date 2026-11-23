import React from 'react';

interface DimensionsLogoProps {
  className?: string;
  size?: number;
}

export const DimensionsLogo: React.FC<DimensionsLogoProps> = ({ 
  className = '', 
  size = 32 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Dimensions Logo"
    >
      <defs>
        <linearGradient id="dim-top" x1="20" y1="20" x2="80" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#40bbed" />
          <stop offset="100%" stopColor="#304e9d" />
        </linearGradient>
        <linearGradient id="dim-right" x1="80" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#304e9d" />
          <stop offset="60%" stopColor="#ea3d9c" />
          <stop offset="100%" stopColor="#f14800" />
        </linearGradient>
        <linearGradient id="dim-bottom" x1="80" y1="80" x2="20" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f18900" />
          <stop offset="100%" stopColor="#ffcc00" />
        </linearGradient>
        <linearGradient id="dim-left" x1="20" y1="80" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a2c617" />
          <stop offset="100%" stopColor="#40bbed" />
        </linearGradient>
      </defs>

      {/* Hexagon outer frame */}
      <polygon
        points="50,6 88,28 88,72 50,94 12,72 12,28"
        stroke="url(#dim-right)"
        strokeWidth="4"
        fill="none"
      />
      {/* Internal icosahedron facet lines */}
      <polygon
        points="50,22 78,38 78,62 50,78 22,62 22,38"
        stroke="url(#dim-top)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.8"
      />
      {/* Connecting vertices */}
      <line x1="50" y1="6" x2="50" y2="22" stroke="#40bbed" strokeWidth="2.5" />
      <line x1="88" y1="28" x2="78" y2="38" stroke="#304e9d" strokeWidth="2.5" />
      <line x1="88" y1="72" x2="78" y2="62" stroke="#ea3d9c" strokeWidth="2.5" />
      <line x1="50" y1="94" x2="50" y2="78" stroke="#f18900" strokeWidth="2.5" />
      <line x1="12" y1="72" x2="22" y2="62" stroke="#ffcc00" strokeWidth="2.5" />
      <line x1="12" y1="28" x2="22" y2="38" stroke="#a2c617" strokeWidth="2.5" />

      {/* Inner triad */}
      <line x1="50" y1="22" x2="50" y2="78" stroke="#ffcc00" strokeWidth="2" opacity="0.6" />
      <line x1="22" y1="38" x2="78" y2="62" stroke="#40bbed" strokeWidth="2" opacity="0.6" />
      <line x1="22" y1="62" x2="78" y2="38" stroke="#ea3d9c" strokeWidth="2" opacity="0.6" />
    </svg>
  );
};

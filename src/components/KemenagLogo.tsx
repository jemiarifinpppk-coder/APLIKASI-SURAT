import React from 'react';

interface KemenagLogoProps {
  className?: string;
  variant?: 'color' | 'monochrome';
  size?: number; // width/height in px
}

export const KemenagLogo: React.FC<KemenagLogoProps> = ({
  className = 'w-24 h-24',
  variant = 'color',
  size,
}) => {
  const isMono = variant === 'monochrome';

  // Palette
  const gold = isMono ? '#444444' : '#E8A714';
  const darkGold = isMono ? '#222222' : '#C48805';
  const green = isMono ? '#555555' : '#006837';
  const darkGreen = isMono ? '#333333' : '#00522B';
  const white = '#FFFFFF';
  const black = '#000000';
  const cottonWhite = isMono ? '#E0E0E0' : '#FFFFFF';

  return (
    <svg
      viewBox="0 0 200 220"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
    >
      <defs>
        {/* Gradients for authentic shine */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isMono ? '#666' : '#FFD700'} />
          <stop offset="50%" stopColor={gold} />
          <stop offset="100%" stopColor={darkGold} />
        </linearGradient>
        <linearGradient id="greenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isMono ? '#555' : '#007A3D'} />
          <stop offset="100%" stopColor={darkGreen} />
        </linearGradient>
      </defs>

      {/* Outer Pentagonal Shield (Gold border) */}
      <polygon
        points="100,6 194,74 158,198 42,198 6,74"
        fill="url(#goldGrad)"
        stroke={darkGold}
        strokeWidth="2"
      />

      {/* Inner Pentagonal Shield (Green background) */}
      <polygon
        points="100,18 182,78 150,188 50,188 18,78"
        fill="url(#greenGrad)"
        stroke={gold}
        strokeWidth="1.5"
      />

      {/* 5-Pointed Star at the Top */}
      <polygon
        points="100,28 104,41 118,41 107,49 111,62 100,54 89,62 93,49 82,41 96,41"
        fill="url(#goldGrad)"
        stroke={darkGold}
        strokeWidth="0.8"
      />

      {/* Kapas (Cotton on Left - 8 florets) */}
      <g id="kapas">
        {/* Stalk */}
        <path
          d="M 54,160 C 44,135 46,95 86,65"
          stroke={cottonWhite}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* 8 Cotton Bolls */}
        {[
          { cx: 80, cy: 70, r: 4.5 },
          { cx: 70, cy: 78, r: 5 },
          { cx: 62, cy: 89, r: 5.2 },
          { cx: 55, cy: 102, r: 5.5 },
          { cx: 50, cy: 116, r: 5.5 },
          { cx: 48, cy: 130, r: 5.5 },
          { cx: 50, cy: 145, r: 5.5 },
          { cx: 55, cy: 158, r: 5 },
        ].map((c, i) => (
          <g key={i}>
            {/* White cotton bulb */}
            <circle cx={c.cx} cy={c.cy} r={c.r} fill={cottonWhite} stroke={isMono ? '#888' : '#D0E1D4'} strokeWidth="0.8" />
            <circle cx={c.cx - 1.5} cy={c.cy - 1.5} r={c.r * 0.45} fill={white} />
            {/* Green calyx / sepal */}
            <path
              d={`M ${c.cx - c.r * 0.8},${c.cy + c.r * 0.5} Q ${c.cx},${c.cy + c.r * 1.2} ${c.cx + c.r * 0.8},${c.cy + c.r * 0.5}`}
              fill={darkGreen}
            />
          </g>
        ))}
      </g>

      {/* Padi (Rice Stalk on Right - 17 grains) */}
      <g id="padi">
        {/* Stalk */}
        <path
          d="M 146,160 C 156,135 154,95 114,65"
          stroke="url(#goldGrad)"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
        />
        {/* 17 Grains of Rice */}
        {[
          { cx: 120, cy: 70, angle: -25 },
          { cx: 128, cy: 75, angle: -15 },
          { cx: 134, cy: 82, angle: -5 },
          { cx: 139, cy: 90, angle: 10 },
          { cx: 144, cy: 98, angle: 20 },
          { cx: 148, cy: 107, angle: 30 },
          { cx: 150, cy: 116, angle: 35 },
          { cx: 151, cy: 125, angle: 40 },
          { cx: 150, cy: 134, angle: 45 },
          { cx: 148, cy: 142, angle: 50 },
          { cx: 144, cy: 150, angle: 55 },
          { cx: 139, cy: 156, angle: 60 },
          // Inner row grains
          { cx: 124, cy: 79, angle: 20 },
          { cx: 131, cy: 89, angle: 30 },
          { cx: 137, cy: 101, angle: 35 },
          { cx: 140, cy: 114, angle: 40 },
          { cx: 141, cy: 128, angle: 45 },
        ].map((g, i) => (
          <ellipse
            key={i}
            cx={g.cx}
            cy={g.cy}
            rx="4.8"
            ry="2.8"
            transform={`rotate(${g.angle} ${g.cx} ${g.cy})`}
            fill="url(#goldGrad)"
            stroke={darkGold}
            strokeWidth="0.7"
          />
        ))}
      </g>

      {/* Kitab Suci Al-Qur'an / Book in Center */}
      <g id="kitab">
        {/* Alas Rehal / Book Stand */}
        <polygon
          points="80,140 100,128 120,140 115,148 100,137 85,148"
          fill={isMono ? '#222' : '#1A1A1A'}
        />
        <polygon
          points="100,128 100,137 126,155 131,148"
          fill={isMono ? '#333' : '#2C2C2C'}
        />
        <polygon
          points="100,128 100,137 74,155 69,148"
          fill={isMono ? '#333' : '#2C2C2C'}
        />

        {/* Book Base / Binding */}
        <path
          d="M 72,118 Q 100,126 128,118 L 128,122 Q 100,130 72,122 Z"
          fill={darkGold}
        />

        {/* Left Page (Golden Open Book) */}
        <path
          d="M 100,94 C 88,91 76,95 72,99 L 72,119 C 76,115 88,111 100,114 Z"
          fill="url(#goldGrad)"
          stroke={darkGold}
          strokeWidth="0.8"
        />
        {/* Left Page Lines */}
        <path
          d="M 76,103 Q 86,100 96,102 M 76,107 Q 86,104 96,106 M 76,111 Q 86,108 96,110"
          stroke={darkGreen}
          strokeWidth="0.6"
          strokeLinecap="round"
        />

        {/* Right Page (Golden Open Book) */}
        <path
          d="M 100,94 C 112,91 124,95 128,99 L 128,119 C 124,115 112,111 100,114 Z"
          fill="url(#goldGrad)"
          stroke={darkGold}
          strokeWidth="0.8"
        />
        {/* Right Page Lines */}
        <path
          d="M 104,102 Q 114,100 124,103 M 104,106 Q 114,104 124,107 M 104,110 Q 114,108 124,111"
          stroke={darkGreen}
          strokeWidth="0.6"
          strokeLinecap="round"
        />

        {/* Center Spine Marker */}
        <line x1="100" y1="94" x2="100" y2="114" stroke={darkGreen} strokeWidth="1" />
      </g>

      {/* Ribbon / Pita "IKHLAS BERAMAL" */}
      <g id="pita">
        {/* Left Ribbon Tail */}
        <polygon
          points="36,170 48,162 48,176 36,182 42,176"
          fill={isMono ? '#CCC' : '#E8E8E8'}
          stroke={isMono ? '#666' : '#999'}
          strokeWidth="0.8"
        />
        {/* Right Ribbon Tail */}
        <polygon
          points="164,170 152,162 152,176 164,182 158,176"
          fill={isMono ? '#CCC' : '#E8E8E8'}
          stroke={isMono ? '#666' : '#999'}
          strokeWidth="0.8"
        />

        {/* Main Ribbon Body with Curve */}
        <path
          d="M 44,166 C 70,180 130,180 156,166 L 154,179 C 128,193 72,193 46,179 Z"
          fill={white}
          stroke={darkGold}
          strokeWidth="1.2"
        />

        {/* Text "IKHLAS BERAMAL" on Path */}
        <path
          id="textPathRibbon"
          d="M 46,176 C 74,188 126,188 154,176"
          fill="none"
        />
        <text
          fontSize="9.5"
          fontWeight="900"
          fontFamily="'Arial Black', Arial, sans-serif"
          fill={isMono ? black : darkGreen}
          letterSpacing="0.6"
        >
          <textPath href="#textPathRibbon" startOffset="50%" textAnchor="middle">
            IKHLAS BERAMAL
          </textPath>
        </text>
      </g>
    </svg>
  );
};

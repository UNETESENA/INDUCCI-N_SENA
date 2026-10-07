import React from 'react';

interface SenaLogoProps {
  className?: string;
  size?: number;
  variant?: 'full' | 'symbol' | 'badge';
  color?: string;
}

export const SenaLogo: React.FC<SenaLogoProps> = ({
  className = '',
  size = 40,
  variant = 'full',
  color = '#39A900',
}) => {
  // Official stylized SENA human logosymbol vector
  const symbolSvg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Logosímbolo SENA"
    >
      {/* Head */}
      <circle cx="50" cy="20" r="10" fill={color} />
      {/* Torso & arms stretching upward and forward */}
      <path
        d="M50 35 C38 35 32 46 22 55 C19 58 22 62 26 60 C36 52 42 46 47 46 L47 88 C47 91 53 91 53 88 L53 46 C58 46 64 52 74 60 C78 62 81 58 78 55 C68 46 62 35 50 35 Z"
        fill={color}
      />
      {/* Path horizontal line indicating the ground/path to progress */}
      <rect x="15" y="92" width="70" height="4" rx="2" fill={color} />
    </svg>
  );

  if (variant === 'symbol') {
    return symbolSvg;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center p-1 bg-white rounded-lg shadow-xs border border-slate-100">
        {symbolSvg}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-extrabold tracking-tight text-xl text-slate-900 font-sans">
          SENA
        </span>
        <span className="text-[10px] uppercase font-semibold tracking-wider text-[#007832]">
          Servicio Nacional de Aprendizaje
        </span>
      </div>
    </div>
  );
};

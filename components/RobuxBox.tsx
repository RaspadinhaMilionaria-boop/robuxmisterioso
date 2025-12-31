
import React from 'react';

const RobuxBox: React.FC = () => {
  return (
    <div className="relative w-full aspect-square max-w-[400px] mx-auto group">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-[#00E676] opacity-20 blur-[80px] rounded-full group-hover:opacity-30 transition-opacity"></div>
      
      {/* Box Illustration (Simplified SVG) */}
      <div className="relative z-10 w-full h-full flex items-center justify-center animate-bounce duration-[3000ms]">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
          {/* Main Box Body */}
          <path d="M100 20L30 50V150L100 180L170 150V50L100 20Z" fill="#1A1A1A" stroke="#00E676" strokeWidth="4" />
          <path d="M30 50L100 80L170 50" stroke="#00E676" strokeWidth="4" />
          <path d="M100 80V180" stroke="#00E676" strokeWidth="4" />
          
          {/* Robux Symbol */}
          <circle cx="100" cy="50" r="15" fill="#00E676" />
          <text x="100" y="55" textAnchor="middle" fill="#0D0D0D" fontSize="16" fontWeight="bold" fontFamily="Outfit">R$</text>
          
          {/* Floating Accents */}
          <rect x="50" y="110" width="10" height="10" rx="2" fill="#00E676" className="animate-pulse" />
          <rect x="140" y="90" width="12" height="12" rx="3" fill="#00E676" className="animate-pulse delay-700" />
        </svg>
      </div>
      
      {/* Platform */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/40 blur-md rounded-full"></div>
    </div>
  );
};

export default RobuxBox;

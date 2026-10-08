import React from 'react';

export const ProductVisual = ({ product, className = 'w-16 h-16' }) => {
  const id = product.id;
  const name = product.name?.toLowerCase() || '';

  // 1. Dollar SP-10 Ballpoint (Blue)
  if (id === 'prod-001' || name.includes('sp-10 ballpoint (blue)')) {
    return (
      <div className={`${className} flex items-center justify-center relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Blue Pen Body tilted 45 deg */}
          <g transform="rotate(45 50 50)">
            <rect x="46" y="20" width="8" height="52" rx="3" fill="#2563EB" />
            <rect x="47" y="16" width="6" height="5" rx="1" fill="#1E293B" />
            <polygon points="50,10 47,16 53,16" fill="#CBD5E1" />
            <circle cx="50" cy="10" r="1.5" fill="#3B82F6" />
            <rect x="48" y="30" width="4" height="20" rx="1" fill="#60A5FA" opacity="0.6" />
            {/* Clip */}
            <path d="M 45 22 Q 41 24 41 38 Q 44 40 46 38" fill="none" stroke="#94A3B8" strokeWidth="2" />
          </g>
        </svg>
      </div>
    );
  }

  // 2. Dollar SP-10 Ballpoint (Black)
  if (id === 'prod-002' || name.includes('sp-10 ballpoint (black)')) {
    return (
      <div className={`${className} flex items-center justify-center relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g transform="rotate(45 50 50)">
            <rect x="46" y="20" width="8" height="52" rx="3" fill="#1E293B" />
            <rect x="47" y="16" width="6" height="5" rx="1" fill="#0F172A" />
            <polygon points="50,10 47,16 53,16" fill="#CBD5E1" />
            <circle cx="50" cy="10" r="1.5" fill="#1E293B" />
            <rect x="48" y="30" width="4" height="20" rx="1" fill="#475569" opacity="0.6" />
            <path d="M 45 22 Q 41 24 41 38 Q 44 40 46 38" fill="none" stroke="#94A3B8" strokeWidth="2" />
          </g>
        </svg>
      </div>
    );
  }

  // 3. Piano Crystal Gel Pen 0.7mm (Gold / Amber)
  if (id === 'prod-003' || name.includes('piano crystal gel')) {
    return (
      <div className={`${className} flex items-center justify-center relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g transform="rotate(45 50 50)">
            <rect x="45" y="18" width="10" height="54" rx="4" fill="#F59E0B" />
            <rect x="46" y="26" width="8" height="38" rx="2" fill="#FEF08A" opacity="0.8" />
            <polygon points="50,10 46,18 54,18" fill="#D97706" />
            <circle cx="50" cy="10" r="1.5" fill="#451A03" />
            <path d="M 44 20 Q 38 23 38 40 Q 42 42 45 40" fill="none" stroke="#FDE68A" strokeWidth="2.5" />
          </g>
        </svg>
      </div>
    );
  }

  // 4. Pelikan Textmarker 490 (Neon Pink / Yellow)
  if (id === 'prod-004' || name.includes('pelikan textmarker')) {
    return (
      <div className={`${className} flex items-center justify-center relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g transform="rotate(45 50 50)">
            <rect x="43" y="26" width="14" height="46" rx="4" fill="#EC4899" />
            <rect x="45" y="18" width="10" height="9" fill="#0F172A" />
            <polygon points="46,12 54,12 52,18 48,18" fill="#F43F5E" />
            <rect x="47" y="32" width="6" height="24" rx="1" fill="#FBCFE8" opacity="0.6" />
          </g>
        </svg>
      </div>
    );
  }

  // 5. Pilot Hi-Tecpoint V5 (Orange / Blue)
  if (id === 'prod-005' || name.includes('pilot hi-tecpoint')) {
    return (
      <div className={`${className} flex items-center justify-center relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g transform="rotate(45 50 50)">
            <rect x="46" y="22" width="8" height="50" rx="3" fill="#F97316" />
            <rect x="45" y="20" width="10" height="7" fill="#1E3A8A" />
            <polygon points="50,12 47,20 53,20" fill="#E2E8F0" />
            <circle cx="50" cy="11" r="1.5" fill="#1E3A8A" />
            <path d="M 45 22 Q 40 24 40 38 Q 43 40 45 38" fill="none" stroke="#CBD5E1" strokeWidth="2" />
          </g>
        </svg>
      </div>
    );
  }

  // 6. Dollar Whiteboard Marker (Black)
  if (id === 'prod-006' || name.includes('whiteboard marker')) {
    return (
      <div className={`${className} flex items-center justify-center relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <g transform="rotate(45 50 50)">
            <rect x="44" y="22" width="12" height="48" rx="4" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
            <rect x="44" y="55" width="12" height="15" rx="3" fill="#0F172A" />
            <rect x="45" y="16" width="10" height="7" fill="#0F172A" />
            <polygon points="50,10 47,16 53,16" fill="#0F172A" />
          </g>
        </svg>
      </div>
    );
  }

  // 7. Royal A4 Spiral Notebook
  if (id === 'prod-007' || name.includes('spiral notebook')) {
    return (
      <div className={`${className} flex items-center justify-center relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <rect x="28" y="16" width="50" height="68" rx="4" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="36" y="24" width="34" height="52" fill="none" stroke="#E2E8F0" strokeDasharray="3 3" />
          {/* Wire spiral holes */}
          {[22, 28, 34, 40, 46, 52, 58, 64, 70, 76].map((y) => (
            <circle key={y} cx="28" cy={y} r="2.5" fill="#475569" stroke="#94A3B8" strokeWidth="1" />
          ))}
        </svg>
      </div>
    );
  }

  // 8. Hardcover Ledger Account Register
  if (id === 'prod-008' || name.includes('ledger account register')) {
    return (
      <div className={`${className} flex items-center justify-center relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <rect x="28" y="16" width="48" height="68" rx="3" fill="#DC2626" />
          <rect x="28" y="16" width="10" height="68" fill="#991B1B" />
          <line x1="38" y1="16" x2="38" y2="84" stroke="#FBBF24" strokeWidth="1" />
          <rect x="44" y="32" width="24" height="14" rx="2" fill="#FEF2F2" stroke="#FCA5A5" />
          <line x1="47" y1="36" x2="65" y2="36" stroke="#DC2626" strokeWidth="1" />
          <line x1="47" y1="41" x2="61" y2="41" stroke="#DC2626" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  // 9. Double A Paper A4 Ream
  if (id === 'prod-009' || name.includes('double a paper') || name.includes('ream')) {
    return (
      <div className={`${className} flex items-center justify-center relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <polygon points="50,22 80,36 50,50 20,36" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
          <polygon points="20,36 50,50 50,70 20,56" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
          <polygon points="80,36 50,50 50,70 80,56" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
          <text x="50" y="40" fontSize="8" fontWeight="bold" fill="#2563EB" textAnchor="middle">80gsm</text>
        </svg>
      </div>
    );
  }

  // 10. 3M Post-it Neon Sticky Notes
  if (id === 'prod-010' || name.includes('sticky notes')) {
    return (
      <div className={`${className} flex items-center justify-center relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <rect x="22" y="24" width="46" height="46" rx="4" fill="#34D399" transform="rotate(-6 45 47)" />
          <rect x="26" y="26" width="46" height="46" rx="4" fill="#F43F5E" transform="rotate(4 49 49)" />
          <rect x="28" y="28" width="46" height="46" rx="4" fill="#FDE047" />
          <path d="M 64 64 L 74 64 L 74 74 Z" fill="#EAB308" />
        </svg>
      </div>
    );
  }

  // 11. Practical Notebook (College Ruled)
  if (id === 'prod-011' || name.includes('practical notebook')) {
    return (
      <div className={`${className} flex items-center justify-center relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <rect x="28" y="18" width="46" height="64" rx="3" fill="#2563EB" />
          <rect x="28" y="18" width="8" height="64" fill="#1D4ED8" />
          <rect x="42" y="32" width="26" height="18" rx="2" fill="#EFF6FF" />
          <line x1="45" y1="38" x2="64" y2="38" stroke="#3B82F6" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  // 12. Oxford Mathematical Geometry Box
  if (id === 'prod-012' || name.includes('geometry box')) {
    return (
      <div className={`${className} flex items-center justify-center relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          <rect x="18" y="30" width="64" height="40" rx="6" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
          <rect x="22" y="34" width="56" height="32" rx="3" fill="#1E293B" />
          {/* Compass and divider inside */}
          <line x1="30" y1="40" x2="44" y2="60" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="44" y1="60" x2="58" y2="40" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="44" cy="60" r="3" fill="#F59E0B" />
          <rect x="26" y="62" width="48" height="2" fill="#FBBF24" />
        </svg>
      </div>
    );
  }

  // Default fallback for any other items
  return (
    <div className={`${className} flex items-center justify-center text-3xl select-none`}>
      {product.emoji || '📦'}
    </div>
  );
};

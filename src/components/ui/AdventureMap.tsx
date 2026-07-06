'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Clock, ArrowRight, Compass } from 'lucide-react';
import Link from 'next/link';
import { Package } from '@/lib/mock-data';

interface AdventureMapProps {
  packages: Package[];
}

export default function AdventureMap({ packages }: AdventureMapProps) {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  // Map coordinates (percentages for relative positioning on custom SVG map)
  const pinPositions: Record<string, { x: string; y: string; color: string }> = {
    'Srinagar': { x: '45%', y: '60%', color: 'bg-secondary border-secondary-light' },
    'Gulmarg': { x: '25%', y: '50%', color: 'bg-primary border-primary-light' },
    'Sonamarg': { x: '65%', y: '45%', color: 'bg-forest border-forest-light' },
    'Pahalgam': { x: '75%', y: '75%', color: 'bg-amber-500 border-amber-400' },
    'Gurez Valley': { x: '50%', y: '20%', color: 'bg-purple-600 border-purple-400' }
  };

  return (
    <div className="relative w-full aspect-[16/10] bg-sand-dark/10 rounded-3xl overflow-hidden border border-obsidian/10 shadow-sm min-h-[450px] bg-[#FAF6F0]">
      
      {/* ─── STYLIZED VECTOR MAP CANVAS ─── */}
      <div className="absolute inset-0 select-none opacity-90">
        <svg width="100%" height="100%" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Valley Background Topography/Mountains */}
          <path d="M50 300 C 150 200, 300 250, 450 180 C 600 110, 700 150, 750 100 L 800 500 L 0 500 Z" fill="#EAE2D5" opacity="0.5" />
          <path d="M0 380 C 120 300, 280 320, 400 250 C 520 180, 680 200, 800 120 L 800 500 L 0 500 Z" fill="#DDD4C5" opacity="0.6" />
          
          {/* Rivers (Kishanganga & Lidder representation) */}
          <path d="M 0 100 Q 200 120, 380 180 T 800 150" stroke="#1D8A99" strokeWidth="4" strokeLinecap="round" opacity="0.25" />
          <path d="M 400 180 Q 500 350, 800 480" stroke="#1D8A99" strokeWidth="3" strokeLinecap="round" opacity="0.2" />

          {/* Grid lines */}
          <line x1="100" y1="0" x2="100" y2="500" stroke="rgba(18, 22, 26, 0.03)" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="200" y1="0" x2="200" y2="500" stroke="rgba(18, 22, 26, 0.03)" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="300" y1="0" x2="300" y2="500" stroke="rgba(18, 22, 26, 0.03)" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="400" y1="0" x2="400" y2="500" stroke="rgba(18, 22, 26, 0.03)" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(18, 22, 26, 0.03)" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="600" y1="0" x2="600" y2="500" stroke="rgba(18, 22, 26, 0.03)" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="700" y1="0" x2="700" y2="500" stroke="rgba(18, 22, 26, 0.03)" strokeWidth="1" strokeDasharray="5 5" />
          
          <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(18, 22, 26, 0.03)" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(18, 22, 26, 0.03)" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="0" y1="300" x2="800" y2="300" stroke="rgba(18, 22, 26, 0.03)" strokeWidth="1" strokeDasharray="5 5" />
          <line x1="0" y1="400" x2="800" y2="400" stroke="rgba(18, 22, 26, 0.03)" strokeWidth="1" strokeDasharray="5 5" />

          {/* Compass Rose */}
          <g transform="translate(80, 80) scale(0.6)">
            <circle cx="0" cy="0" r="40" stroke="rgba(18, 22, 26, 0.15)" strokeWidth="2" />
            <path d="M 0 -50 L 10 0 L 0 10 L -10 0 Z" fill="#FF5A36" />
            <path d="M 0 50 L 10 0 L 0 -10 L -10 0 Z" fill="#0F5C66" />
            <path d="M -50 0 L 0 10 L 10 0 L 0 -10 Z" fill="rgba(18, 22, 26, 0.4)" />
            <path d="M 50 0 L 0 10 L -10 0 L 0 -10 Z" fill="rgba(18, 22, 26, 0.4)" />
            <text x="-5" y="-55" fill="rgba(18, 22, 26, 0.6)" fontSize="12" fontWeight="bold" fontFamily="sans-serif">N</text>
          </g>
        </svg>
      </div>

      {/* ─── INTERACTIVE PINS ─── */}
      {packages.map(pkg => {
        const pos = pinPositions[pkg.destination];
        if (!pos) return null;

        const isHovered = hoveredPin === pkg.id;

        return (
          <div
            key={pkg.id}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: pos.x, top: pos.y }}
            onMouseEnter={() => setHoveredPin(pkg.id)}
            onMouseLeave={() => setHoveredPin(null)}
          >
            {/* Animated Ping Ring */}
            <span className="absolute inline-flex h-8 w-8 rounded-full bg-primary/20 animate-ping opacity-75 -left-1 -top-1" />
            
            {/* Map Pin Point */}
            <div className={`relative w-6 h-6 rounded-full border-2 border-cream flex items-center justify-center shadow-lg transition-transform duration-200 ${
              isHovered ? 'scale-125 z-30 bg-primary' : pos.color
            }`}>
              <MapPin className="w-3.5 h-3.5 text-cream" />
            </div>

            {/* Tooltip Popup Card */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 bg-cream rounded-2xl border border-obsidian/10 shadow-2xl p-4 space-y-3 z-40 pointer-events-auto"
                >
                  <div className="relative aspect-[16/10] bg-obsidian/5 rounded-xl overflow-hidden">
                    <img src={pkg.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-primary text-cream px-2 py-0.5 rounded-lg text-[8px] font-bold uppercase tracking-wider">
                      {pkg.category}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs text-obsidian font-display leading-tight">{pkg.title}</h4>
                    <div className="flex items-center justify-between text-[10px] text-obsidian/50 font-bold">
                      <span className="flex items-center gap-0.5"><Clock className="w-3 h-3 text-secondary" /> {pkg.duration}</span>
                      <span className="text-secondary font-display text-xs">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(pkg.price)}</span>
                    </div>
                  </div>
                  
                  <Link href={`/packages/${pkg.slug}`} className="block">
                    <button className="w-full py-1.5 bg-obsidian text-cream text-[10px] font-bold rounded-xl flex items-center justify-center gap-1 hover:bg-primary transition-all">
                      View Details <ArrowRight className="w-3 h-3" />
                    </button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-cream/80 backdrop-blur-md p-3 rounded-xl border border-obsidian/10 text-[9px] font-bold uppercase tracking-wider space-y-1.5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" /> Skiing / Winter
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block" /> Houseboat / Cultural
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-forest inline-block" /> Trekking / Glacier
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Valley / Horse Riding
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" /> Offroad Caravans
        </div>
      </div>
    </div>
  );
}

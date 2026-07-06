'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Compass, MapPin, ArrowRight, Grid, Eye } from 'lucide-react';
import Link from 'next/link';
import { mockDestinations } from '@/lib/mock-data';

export default function DestinationsHubPage() {
  return (
    <div className="min-h-screen bg-sand text-obsidian flex flex-col font-sans antialiased">
      
      {/* HEADER */}
      <header className="bg-sand border-b border-obsidian/5 py-5 sticky top-0 z-40 backdrop-blur-md bg-sand/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
              <Compass className="text-cream w-4.5 h-4.5 -rotate-45" />
            </div>
            <span className="font-bold text-obsidian font-display text-base">Wandertribe</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="font-semibold text-obsidian/60 hover:text-primary transition-colors">Home</Link>
            <Link href="/packages" className="font-semibold text-obsidian/60 hover:text-primary transition-colors">Explore Trips</Link>
          </nav>
        </div>
      </header>

      {/* HERO HERO TITLE */}
      <div className="bg-[#FFFDF9] border-b border-obsidian/5 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl font-extrabold text-obsidian font-display tracking-tight leading-none">
            Kashmir Adventure Zones
          </h1>
          <p className="text-sm text-obsidian/60 mt-2 font-light max-w-xl">
            From the high powder bowls of Apharwat to remote Dardic border villages along Kishanganga, explore Kashmir by zone.
          </p>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDestinations.map((dest, i) => (
            <Card key={dest.id} hoverEffect="lift" className="flex flex-col bg-cream group">
              <div className="relative aspect-[16/10] bg-obsidian/5 overflow-hidden">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary text-cream px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider">
                  {dest.count} Active Tour
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-xl text-obsidian font-display group-hover:text-primary transition-colors leading-tight flex items-center gap-1.5">
                    <MapPin className="w-5 h-5 text-primary" /> {dest.name}
                  </h3>
                  <p className="text-xs text-obsidian/60 leading-relaxed font-light">
                    {dest.desc} Explore native mountain trials and stay at our certified basecamps with direct WhatsApp local guide access.
                  </p>
                </div>

                <div className="pt-4 border-t border-obsidian/5 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-obsidian/45 tracking-wider font-display">Kashmir Valley</span>
                  <Link href="/packages">
                    <Button variant="outline" size="sm" className="rounded-xl flex items-center gap-1">
                      Explore Trips <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-obsidian text-sand/40 py-8 border-t border-cream/5 text-xs text-center">
        <p>© 2026 Wandertribe Kashmir Adventures. All rights reserved.</p>
      </footer>

    </div>
  );
}

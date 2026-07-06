'use client';

import { motion } from 'framer-motion';
import { MapPin, Plus, Package } from 'lucide-react';
import { mockPackages } from '@/lib/mock-data';

export default function DestinationsPage() {
  const allDests = [...new Map(mockPackages.flatMap(p => p.destinations).map(d => [d.id, d])).values()];
  const destWithCounts = allDests.map(d => ({ ...d, packageCount: mockPackages.filter(p => p.destinations.some(dd => dd.id === d.id)).length }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Destinations</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage travel destinations linked across packages.</p>
        </div>
        <button className="btn-primary"><Plus size={15} /> Add Destination</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {destWithCounts.map((d, i) => (
          <motion.div key={d.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="card p-5 text-center cursor-pointer hover:border-[#0F4C81]/40 transition-colors">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{ background: 'rgba(15,76,129,0.1)' }}><MapPin size={22} style={{ color: '#0F4C81' }} /></div>
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{d.name}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{d.country}</p>
            <div className="flex items-center justify-center gap-1 mt-2"><Package size={12} style={{ color: 'var(--text-muted)' }} /><span className="text-xs" style={{ color: 'var(--text-muted)' }}>{d.packageCount} package{d.packageCount !== 1 ? 's' : ''}</span></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

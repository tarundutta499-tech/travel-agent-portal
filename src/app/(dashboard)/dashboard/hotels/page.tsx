'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Star, Search, MapPin, Edit2 } from 'lucide-react';
import { mockHotels } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';
import type { Hotel } from '@/types';

const tierColors: Record<string, { bg: string; color: string }> = {
  standard: { bg: 'rgba(148,163,184,0.1)', color: '#64748B' },
  deluxe: { bg: 'rgba(15,76,129,0.1)', color: '#0F4C81' },
  luxury: { bg: 'rgba(245,166,35,0.1)', color: '#D97706' },
};

export default function HotelsPage() {
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');

  const filtered = mockHotels.filter(h => {
    const ms = h.name.toLowerCase().includes(search.toLowerCase()) || h.location.toLowerCase().includes(search.toLowerCase());
    const mt = tierFilter === 'all' || h.tier === tierFilter;
    return ms && mt;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Hotel Inventory</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage hotel properties linked to your packages.</p>
        </div>
        <button className="btn-primary"><Plus size={15} /> Add Hotel</button>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="input-base flex items-center gap-2 max-w-xs">
          <Search size={14} style={{ color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search hotels..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" style={{ color: 'var(--text-primary)' }} />
        </div>
        {['all', 'standard', 'deluxe', 'luxury'].map(t => (
          <button key={t} onClick={() => setTierFilter(t)} className="px-3 py-1.5 rounded-lg text-sm capitalize transition-all" style={{ background: tierFilter === t ? '#0F4C81' : 'var(--bg-tertiary)', color: tierFilter === t ? '#fff' : 'var(--text-secondary)' }}>
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((hotel, i) => {
          const ts = tierColors[hotel.tier];
          return (
            <motion.div key={hotel.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{hotel.name}</p>
                  <div className="flex items-center gap-1 mt-1"><MapPin size={12} style={{ color: 'var(--text-muted)' }} /><span className="text-xs" style={{ color: 'var(--text-muted)' }}>{hotel.location}, {hotel.country}</span></div>
                </div>
                <span className="badge capitalize" style={{ background: ts.bg, color: ts.color }}>{hotel.tier}</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, si) => <Star key={si} size={13} fill={si < hotel.stars ? '#F5A623' : 'none'} stroke={si < hotel.stars ? '#F5A623' : 'var(--border-color)'} />)}
                <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>{hotel.stars} Stars</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div><p className="text-xs" style={{ color: 'var(--text-muted)' }}>Room Types</p><p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{hotel.roomTypes.length} types</p></div>
                <div><p className="text-xs" style={{ color: 'var(--text-muted)' }}>Price/Night</p><p className="text-sm font-medium" style={{ color: '#0F4C81' }}>{formatCurrency(hotel.pricePerNight)}</p></div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">{hotel.mealPlans.map(mp => <span key={mp} className="tag text-xs">{mp}</span>)}</div>
              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <span className={`badge ${hotel.active ? 'badge-active' : 'badge-expired'}`}>{hotel.active ? 'Active' : 'Inactive'}</span>
                <button className="btn-ghost" style={{ padding: '6px' }}><Edit2 size={14} /></button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

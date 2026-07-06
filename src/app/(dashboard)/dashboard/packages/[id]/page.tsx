'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit2, Copy, Trash2, Eye, Globe, Check, X, Star, MapPin, Calendar, Users, DollarSign, BarChart3, Send } from 'lucide-react';
import Link from 'next/link';
import { mockPackages } from '@/lib/mock-data';
import { formatCurrency, formatDate, formatNumber, calculateMargin } from '@/lib/utils';
import type { PackageStatus } from '@/types';

const statusStyles: Record<PackageStatus, { badge: string; label: string }> = {
  draft: { badge: 'badge-draft', label: 'Draft' },
  pending_approval: { badge: 'badge-pending', label: 'Pending Approval' },
  published: { badge: 'badge-published', label: 'Published' },
  archived: { badge: 'badge-archived', label: 'Archived' },
};

export default function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const pkg = mockPackages.find(p => p.id === id) || mockPackages[0];
  const st = statusStyles[pkg.status];
  const margin = calculateMargin(pkg.internalCost, pkg.sellingPrice);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/packages" className="btn-ghost" style={{ padding: '8px' }}><ArrowLeft size={18} /></Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>{pkg.name}</h1>
            <span className={`badge ${st.badge}`}>{st.label}</span>
          </div>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>/{pkg.slug} · Last updated {formatDate(pkg.updatedAt)}</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-ghost"><Copy size={15} /> Duplicate</button>
          <Link href={`/dashboard/packages/new`} className="btn-secondary"><Edit2 size={15} /> Edit</Link>
          {pkg.status === 'draft' && <button className="btn-accent"><Send size={15} /> Submit</button>}
          {pkg.status === 'pending_approval' && <button className="btn-primary"><Check size={15} /> Publish</button>}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Views', value: formatNumber(pkg.views), icon: Eye, color: '#8B5CF6' },
          { label: 'Inquiries', value: String(pkg.inquiries), icon: Users, color: '#0F4C81' },
          { label: 'Bookings', value: String(pkg.bookings), icon: Calendar, color: '#00A676' },
          { label: 'Revenue', value: formatCurrency(pkg.revenue), icon: DollarSign, color: '#F5A623' },
          { label: 'Conv. Rate', value: pkg.views > 0 ? `${((pkg.bookings / pkg.views) * 100).toFixed(1)}%` : '0%', icon: BarChart3, color: '#EC4899' },
        ].map(({ label, value, icon: Icon, color }) => (
          <motion.div key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="stats-card">
            <div className="flex items-center gap-2 mb-1"><Icon size={14} style={{ color }} /><span className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span></div>
            <p className="text-xl font-bold" style={{ color, fontFamily: 'var(--font-poppins)' }}>{value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Cover */}
          {pkg.coverImage && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-hidden">
              <img src={pkg.coverImage} alt={pkg.name} className="w-full h-64 object-cover" />
            </motion.div>
          )}
          {/* Description */}
          <div className="card p-5">
            <h2 className="font-semibold text-base mb-3" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>About</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{pkg.shortDescription}</p>
          </div>
          {/* Itinerary */}
          <div className="card p-5">
            <h2 className="font-semibold text-base mb-3" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Itinerary ({pkg.itinerary.length} days)</h2>
            <div className="space-y-3">
              {pkg.itinerary.map((day, i) => (
                <div key={day.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(15,76,129,0.1)', color: '#0F4C81' }}>{i + 1}</span>
                    {i < pkg.itinerary.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: 'var(--border-color)' }} />}
                  </div>
                  <div className="pb-4">
                    <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{day.title}</p>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{day.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {day.activities.map(a => <span key={a} className="tag text-xs">{a}</span>)}
                    </div>
                  </div>
                </div>
              ))}
              {pkg.itinerary.length === 0 && <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No itinerary added yet.</p>}
            </div>
          </div>
          {/* Inclusions / Exclusions */}
          <div className="grid grid-cols-2 gap-5">
            <div className="card p-5">
              <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Inclusions</h3>
              <ul className="space-y-1.5">{pkg.inclusions.map(i => <li key={i} className="flex items-center gap-2 text-sm" style={{ color: '#00A676' }}><Check size={13} /> {i}</li>)}</ul>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Exclusions</h3>
              <ul className="space-y-1.5">{pkg.exclusions.map(i => <li key={i} className="flex items-center gap-2 text-sm" style={{ color: '#E5484D' }}><X size={13} /> {i}</li>)}</ul>
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-5">
          <div className="card p-5">
            <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Package Details</h3>
            <div className="space-y-3">
              {[
                { label: 'Category', value: pkg.category },
                { label: 'Duration', value: `${pkg.durationDays}D / ${pkg.durationNights}N` },
                { label: 'Destinations', value: pkg.destinations.map(d => d.name).join(', ') },
                { label: 'Visibility', value: pkg.visibility },
                { label: 'Created', value: formatDate(pkg.createdAt) },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</span>
                  <span className="text-sm font-medium capitalize" style={{ color: 'var(--text-primary)' }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Pricing</h3>
            <div className="space-y-2 mb-3">
              <div className="flex justify-between"><span className="text-xs" style={{ color: 'var(--text-muted)' }}>Selling Price</span><span className="text-sm font-bold" style={{ color: '#0F4C81' }}>{formatCurrency(pkg.sellingPrice)}</span></div>
              <div className="flex justify-between"><span className="text-xs" style={{ color: 'var(--text-muted)' }}>Internal Cost</span><span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{formatCurrency(pkg.internalCost)}</span></div>
            </div>
            <div className="p-3 rounded-lg" style={{ background: margin >= 30 ? 'rgba(0,166,118,0.06)' : 'rgba(245,166,35,0.06)' }}>
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Profit Margin</span>
                <span className="font-bold" style={{ color: margin >= 30 ? '#00A676' : '#F5A623' }}>{margin}%</span>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>Hotels</h3>
            <div className="space-y-2">
              {pkg.hotels.map(h => (
                <div key={h.id} className="p-3 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{h.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{h.location} · {'★'.repeat(h.stars)} · {h.mealPlan.toUpperCase()}</p>
                </div>
              ))}
            </div>
          </div>
          {pkg.notes && (
            <div className="card p-5">
              <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--text-primary)' }}>Internal Notes</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{pkg.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

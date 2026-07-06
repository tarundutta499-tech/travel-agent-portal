'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Tag, Search, Clock, Zap, Gift, Calendar, Percent, CheckCircle, XCircle, Copy, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { mockDeals } from '@/lib/mock-data';
import { formatDate, getDaysUntil } from '@/lib/utils';
import type { Deal, DealType } from '@/types';

const typeIcons: Record<DealType, React.ElementType> = { percentage: Percent, flat: Tag, bundle: Gift, early_bird: Calendar, last_minute: Zap, coupon: Tag };
const typeLabels: Record<DealType, string> = { percentage: '% Discount', flat: 'Flat Discount', bundle: 'Bundle', early_bird: 'Early Bird', last_minute: 'Last Minute', coupon: 'Coupon' };

function StatusBadge({ status }: { status: Deal['status'] }) {
  const cfg: Record<string, { color: string; bg: string; icon: React.ElementType; label: string }> = {
    active: { color: '#00A676', bg: 'rgba(0,166,118,0.1)', icon: CheckCircle, label: 'Active' },
    scheduled: { color: '#2563EB', bg: 'rgba(37,99,235,0.1)', icon: Clock, label: 'Scheduled' },
    expired: { color: '#94A3B8', bg: 'rgba(148,163,184,0.1)', icon: XCircle, label: 'Expired' },
    disabled: { color: '#E5484D', bg: 'rgba(229,72,77,0.1)', icon: XCircle, label: 'Disabled' },
  };
  const c = cfg[status]; const Icon = c.icon;
  return <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" style={{ color: c.color, background: c.bg }}><Icon size={11} /> {c.label}</span>;
}

function DealCard({ deal }: { deal: Deal }) {
  const TypeIcon = typeIcons[deal.type];
  const daysLeft = getDaysUntil(deal.validTo);
  const usagePct = deal.usageLimit ? (deal.usedCount / deal.usageLimit) * 100 : 0;
  const expiring = deal.status === 'active' && daysLeft <= 5 && daysLeft >= 0;

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-5 hover:border-[#0F4C81]/40 transition-all duration-200" style={{ borderColor: expiring ? '#F5A623' : undefined }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(15,76,129,0.1)' }}><TypeIcon size={17} style={{ color: '#0F4C81' }} /></div>
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{deal.name}</p>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{typeLabels[deal.type]}</p>
          </div>
        </div>
        <StatusBadge status={deal.status} />
      </div>
      {expiring && (
        <div className="flex items-center gap-1.5 mb-3 px-2.5 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(245,166,35,0.1)', color: '#D97706' }}>
          <AlertTriangle size={12} /> Expires in {daysLeft} day{daysLeft !== 1 ? 's' : ''}
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Discount</p>
          <p className="font-bold text-lg" style={{ color: '#0F4C81', fontFamily: 'var(--font-poppins)' }}>
            {['percentage', 'early_bird', 'last_minute'].includes(deal.type) ? `${deal.discountValue}%` : `₹${deal.discountValue.toLocaleString()}`}
          </p>
        </div>
        <div>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Valid Until</p>
          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatDate(deal.validTo)}</p>
        </div>
      </div>
      {deal.couponCode && (
        <div className="flex items-center gap-2 mb-3">
          <code className="flex-1 text-xs px-2.5 py-1.5 rounded-lg font-mono" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}>{deal.couponCode}</code>
          <button className="btn-ghost" style={{ padding: '6px' }} title="Copy"><Copy size={13} /></button>
        </div>
      )}
      {deal.usageLimit && (
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-muted)' }}><span>Usage</span><span>{deal.usedCount} / {deal.usageLimit}</span></div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.min(usagePct, 100)}%`, background: usagePct > 80 ? '#E5484D' : undefined }} /></div>
        </div>
      )}
      <div className="flex items-center gap-1 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <span className="px-2.5 py-1 text-xs rounded-lg" style={{ background: 'rgba(0,166,118,0.08)', color: '#00A676' }}>{deal.bannerText}</span>
        <div className="ml-auto flex gap-1">
          <button className="btn-ghost" style={{ padding: '6px' }}><Edit2 size={13} /></button>
          <button className="btn-ghost" style={{ padding: '6px' }}><Copy size={13} /></button>
          <button className="btn-ghost" style={{ padding: '6px', color: '#E5484D' }}><Trash2 size={13} /></button>
        </div>
      </div>
    </motion.div>
  );
}

export default function DealsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockDeals.filter(d => {
    const ms = d.name.toLowerCase().includes(search.toLowerCase()) || (d.couponCode || '').toLowerCase().includes(search.toLowerCase());
    const mf = statusFilter === 'all' || d.status === statusFilter;
    return ms && mf;
  });

  const counts: Record<string, number> = { all: mockDeals.length, active: mockDeals.filter(d => d.status === 'active').length, scheduled: mockDeals.filter(d => d.status === 'scheduled').length, expired: mockDeals.filter(d => d.status === 'expired').length };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Deals & Offers</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage promotions, discounts, and coupon codes.</p>
        </div>
        <Link href="/dashboard/deals/new" className="btn-primary"><Plus size={15} /> New Deal</Link>
      </div>
      <div className="flex items-center gap-1 mb-5 p-1 rounded-xl" style={{ background: 'var(--bg-tertiary)', width: 'fit-content' }}>
        {Object.entries(counts).map(([s, c]) => (
          <button key={s} onClick={() => setStatusFilter(s)} className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize" style={{ background: statusFilter === s ? 'var(--bg-secondary)' : 'transparent', color: statusFilter === s ? 'var(--text-primary)' : 'var(--text-muted)', boxShadow: statusFilter === s ? 'var(--card-shadow)' : 'none' }}>
            {s} <span className="ml-1 text-xs">({c})</span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 mb-5 max-w-md">
        <div className="input-base flex items-center gap-2">
          <Search size={14} style={{ color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search deals or coupon codes..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" style={{ color: 'var(--text-primary)' }} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(deal => <DealCard key={deal.id} deal={deal} />)}
        {filtered.length === 0 && <div className="col-span-full text-center py-16" style={{ color: 'var(--text-muted)' }}><Tag size={40} className="mx-auto mb-3 opacity-30" /><p>No deals found.</p></div>}
      </div>
    </div>
  );
}

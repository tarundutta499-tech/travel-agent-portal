'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Eye, Edit2, Copy, Trash2, Archive, Upload, Download, MoreHorizontal, Package as PackageIcon } from 'lucide-react';
import Link from 'next/link';
import { mockPackages } from '@/lib/mock-data';
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils';
import type { PackageStatus, PackageCategory } from '@/types';

const statusStyles: Record<PackageStatus, { badge: string; label: string }> = {
  draft: { badge: 'badge-draft', label: 'Draft' },
  pending_approval: { badge: 'badge-pending', label: 'Pending' },
  published: { badge: 'badge-published', label: 'Published' },
  archived: { badge: 'badge-archived', label: 'Archived' },
};

export default function PackagesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = mockPackages.filter(p => {
    const ms = p.name.toLowerCase().includes(search.toLowerCase()) || p.destinations.some(d => d.name.toLowerCase().includes(search.toLowerCase()));
    const mst = statusFilter === 'all' || p.status === statusFilter;
    const mc = categoryFilter === 'all' || p.category === categoryFilter;
    return ms && mst && mc;
  });

  const toggleSelect = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map(p => p.id));

  const statusCounts: Record<string, number> = { all: mockPackages.length, draft: mockPackages.filter(p => p.status === 'draft').length, pending_approval: mockPackages.filter(p => p.status === 'pending_approval').length, published: mockPackages.filter(p => p.status === 'published').length, archived: mockPackages.filter(p => p.status === 'archived').length };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Packages</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Create, manage, and publish travel packages.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary"><Download size={15} /> Export</button>
          <Link href="/dashboard/packages/new" className="btn-primary"><Plus size={15} /> New Package</Link>
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-1 mb-5 p-1 rounded-xl overflow-x-auto" style={{ background: 'var(--bg-tertiary)', width: 'fit-content' }}>
        {Object.entries(statusCounts).map(([s, c]) => (
          <button key={s} onClick={() => setStatusFilter(s)} className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap" style={{ background: statusFilter === s ? 'var(--bg-secondary)' : 'transparent', color: statusFilter === s ? 'var(--text-primary)' : 'var(--text-muted)', boxShadow: statusFilter === s ? 'var(--card-shadow)' : 'none' }}>
            {s === 'pending_approval' ? 'Pending' : s.charAt(0).toUpperCase() + s.slice(1)} ({c})
          </button>
        ))}
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="input-base flex items-center gap-2 max-w-xs">
          <Search size={14} style={{ color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search packages..." value={search} onChange={e => setSearch(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" style={{ color: 'var(--text-primary)' }} />
        </div>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="input-base" style={{ width: 'auto', minWidth: '140px' }}>
          <option value="all">All Categories</option>
          {['honeymoon', 'family', 'luxury', 'adventure', 'group', 'custom'].map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
        </select>
        {selected.length > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{selected.length} selected</span>
            <button className="btn-secondary text-xs" style={{ padding: '6px 12px' }}><Upload size={13} /> Publish</button>
            <button className="btn-secondary text-xs" style={{ padding: '6px 12px' }}><Archive size={13} /> Archive</button>
            <button className="btn-ghost text-xs" style={{ padding: '6px 12px', color: '#E5484D' }}><Trash2 size={13} /> Delete</button>
          </div>
        )}
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '40px' }}><input type="checkbox" className="checkbox-custom" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} /></th>
                <th>Package</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Status</th>
                <th>Views</th>
                <th>Bookings</th>
                <th>Revenue</th>
                <th>Updated</th>
                <th style={{ width: '60px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((pkg, i) => {
                const st = statusStyles[pkg.status];
                return (
                  <motion.tr key={pkg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <td><input type="checkbox" className="checkbox-custom" checked={selected.includes(pkg.id)} onChange={() => toggleSelect(pkg.id)} /></td>
                    <td>
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <img src={pkg.coverImage || 'https://via.placeholder.com/40'} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <Link href={`/dashboard/packages/${pkg.id}`} className="text-sm font-medium hover:underline truncate block" style={{ color: 'var(--text-primary)' }}>{pkg.name}</Link>
                          <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{pkg.destinations.map(d => d.name).join(', ')}</p>
                        </div>
                      </div>
                    </td>
                    <td><span className="tag capitalize">{pkg.category}</span></td>
                    <td><span className="text-sm whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>{pkg.durationDays}D / {pkg.durationNights}N</span></td>
                    <td><span className="text-sm font-medium whitespace-nowrap" style={{ color: '#0F4C81' }}>{formatCurrency(pkg.sellingPrice)}</span></td>
                    <td><span className={`badge ${st.badge}`}>{st.label}</span></td>
                    <td><span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{formatNumber(pkg.views)}</span></td>
                    <td><span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{pkg.bookings}</span></td>
                    <td><span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{formatCurrency(pkg.revenue)}</span></td>
                    <td><span className="text-xs whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>{formatDate(pkg.updatedAt)}</span></td>
                    <td>
                      <div className="flex gap-1">
                        <Link href={`/dashboard/packages/${pkg.id}`} className="btn-ghost" style={{ padding: '5px' }}><Eye size={14} /></Link>
                        <button className="btn-ghost" style={{ padding: '5px' }}><Copy size={14} /></button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
            <PackageIcon size={40} className="mx-auto mb-3 opacity-30" />
            <p>No packages found.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

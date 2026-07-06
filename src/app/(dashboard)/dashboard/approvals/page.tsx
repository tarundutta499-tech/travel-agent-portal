'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, MessageSquare, Check, X, Eye, Clock } from 'lucide-react';
import Link from 'next/link';
import { mockApprovals, mockPackages } from '@/lib/mock-data';
import { formatRelativeTime } from '@/lib/utils';

export default function ApprovalsPage() {
  const [comment, setComment] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(mockApprovals[0]?.id || null);

  const selected = mockApprovals.find(a => a.id === selectedId);
  const pkg = selected ? mockPackages.find(p => p.id === selected.packageId) : null;

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Approval Queue</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Review and approve package submissions from agents.</p>
      </motion.div>

      {mockApprovals.length === 0 ? (
        <div className="card text-center py-20">
          <CheckSquare size={48} className="mx-auto mb-4 opacity-20" style={{ color: 'var(--text-muted)' }} />
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>All caught up!</h2>
          <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>No pending approvals right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="space-y-3">
            {mockApprovals.map(apr => (
              <motion.div key={apr.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} onClick={() => setSelectedId(apr.id)} className="card p-4 cursor-pointer" style={{ borderColor: selectedId === apr.id ? '#0F4C81' : undefined }}>
                <div className="flex items-start gap-3">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${apr.submittedByName}`} alt={apr.submittedByName} className="w-9 h-9 rounded-full flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: 'var(--text-primary)' }}>{apr.packageName}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>by {apr.submittedByName}</p>
                    <div className="flex items-center gap-1 mt-1"><Clock size={11} style={{ color: 'var(--text-muted)' }} /><span className="text-xs" style={{ color: 'var(--text-muted)' }}>{formatRelativeTime(apr.submittedAt)}</span></div>
                  </div>
                  <span className="badge badge-pending">Pending</span>
                </div>
              </motion.div>
            ))}
          </div>

          {selected && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-5 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-bold text-lg" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>{selected.packageName}</h2>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Submitted by {selected.submittedByName} · {formatRelativeTime(selected.submittedAt)}</p>
                </div>
                <Link href={`/dashboard/packages/${selected.packageId}`} className="btn-secondary text-xs"><Eye size={13} /> Preview</Link>
              </div>

              {pkg && (
                <div className="p-4 rounded-xl mb-4" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: 'Category', value: pkg.category },
                      { label: 'Duration', value: `${pkg.durationDays}D / ${pkg.durationNights}N` },
                      { label: 'Base Price', value: `₹${pkg.sellingPrice.toLocaleString()}` },
                      { label: 'Destinations', value: pkg.destinations.map(d => d.name).join(', ') },
                    ].map(({ label, value }) => (
                      <div key={label}><p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p><p className="text-sm font-medium capitalize" style={{ color: 'var(--text-primary)' }}>{value}</p></div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Comments</h3>
                <div className="space-y-3">
                  {selected.comments.map(c => (
                    <div key={c.id} className="flex gap-3">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.userName}`} alt={c.userName} className="w-7 h-7 rounded-full flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{c.userName}</span>
                          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{formatRelativeTime(c.createdAt)}</span>
                        </div>
                        <p className="text-sm p-3 rounded-lg" style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Add a comment or feedback..." rows={3} className="input-base resize-none mb-5" style={{ fontFamily: 'var(--font-inter)' }} />

              <div className="flex items-center gap-3">
                <button className="btn-accent flex-1 justify-center"><Check size={15} /> Approve & Publish</button>
                <button className="btn-secondary flex-1 justify-center" style={{ color: '#F5A623', borderColor: '#F5A623' }}><MessageSquare size={15} /> Request Changes</button>
                <button className="btn-danger flex-shrink-0"><X size={15} /> Reject</button>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

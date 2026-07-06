'use client';

import { motion } from 'framer-motion';
import { UserPlus, Package, TrendingUp, Award } from 'lucide-react';
import { mockUsers, mockAgentPerformance } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

const roleColors: Record<string, { bg: string; color: string }> = {
  admin: { bg: 'rgba(139,92,246,0.1)', color: '#8B5CF6' },
  manager: { bg: 'rgba(15,76,129,0.1)', color: '#0F4C81' },
  agent: { bg: 'rgba(0,166,118,0.1)', color: '#00A676' },
};

export default function TeamPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Team</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage staff accounts and view performance metrics.</p>
        </div>
        <button className="btn-primary"><UserPlus size={15} /> Invite Member</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockUsers.map((user, i) => {
          const perf = mockAgentPerformance.find(a => a.userId === user.id);
          const rStyle = roleColors[user.role];
          return (
            <motion.div key={user.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="card p-5">
              <div className="flex items-center gap-3 mb-4">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-xl" />
                <div>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                  <span className="badge capitalize mt-1" style={{ background: rStyle.bg, color: rStyle.color }}>{user.role}</span>
                </div>
              </div>
              {perf && (
                <div className="grid grid-cols-3 gap-2 p-3 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                  {[
                    { label: 'Created', value: perf.packagesCreated, icon: Package },
                    { label: 'Published', value: perf.packagesPublished, icon: Award },
                    { label: 'Conv.', value: `${perf.conversionRate}%`, icon: TrendingUp },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="text-center">
                      <Icon size={14} className="mx-auto mb-1" style={{ color: 'var(--text-muted)' }} />
                      <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{value}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Revenue Generated</p>
                <p className="font-bold" style={{ color: '#0F4C81' }}>{formatCurrency(perf?.totalRevenue || 0)}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, Eye, BookOpen, DollarSign } from 'lucide-react';
import { mockRevenueData, mockPackages, mockAgentPerformance } from '@/lib/mock-data';
import { formatCurrency, formatNumber } from '@/lib/utils';

const COLORS = ['#0F4C81', '#00A676', '#F5A623', '#8B5CF6', '#EC4899'];
const categoryRevenue = [
  { name: 'Luxury', value: 5916000, fill: '#0F4C81' },
  { name: 'Honeymoon', value: 20770000, fill: '#00A676' },
  { name: 'Group', value: 1008000, fill: '#F5A623' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="card-flat px-3 py-2 text-xs">
        <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color || p.fill }}>{p.name}: {p.name === 'revenue' ? formatCurrency(p.value) : p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Analytics</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Performance insights across packages, deals, and agents.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Revenue', value: formatCurrency(27694000), icon: DollarSign, color: '#0F4C81' },
          { label: 'Total Views', value: formatNumber(17013), icon: Eye, color: '#8B5CF6' },
          { label: 'Total Bookings', value: '277', icon: BookOpen, color: '#00A676' },
          { label: 'Avg Conversion', value: '1.6%', icon: TrendingUp, color: '#F5A623' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="stats-card">
              <div className="flex items-center gap-2 mb-2"><Icon size={16} style={{ color: kpi.color }} /><span className="text-xs" style={{ color: 'var(--text-muted)' }}>{kpi.label}</span></div>
              <p className="text-2xl font-bold" style={{ color: kpi.color, fontFamily: 'var(--font-poppins)' }}>{kpi.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-5 lg:col-span-2">
          <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={mockRevenueData}>
              <defs>
                <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0F4C81" stopOpacity={0.3} /><stop offset="95%" stopColor="#0F4C81" stopOpacity={0} /></linearGradient>
                <linearGradient id="bGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#00A676" stopOpacity={0.3} /><stop offset="95%" stopColor="#00A676" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#0F4C81" strokeWidth={2} fill="url(#aGrad)" dot={false} />
              <Area type="monotone" dataKey="inquiries" stroke="#00A676" strokeWidth={2} fill="url(#bGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-5">
          <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>Revenue by Category</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryRevenue} dataKey="value" cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3}>
                {categoryRevenue.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Pie>
              <Tooltip formatter={(v: any) => formatCurrency(v)} />
              <Legend formatter={(value) => <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-5">
          <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>Package Performance</h2>
          <div className="space-y-3">
            {mockPackages.filter(p => p.status === 'published').map(pkg => {
              const conv = pkg.views > 0 ? ((pkg.bookings / pkg.views) * 100) : 0;
              return (
                <div key={pkg.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium truncate mr-2" style={{ color: 'var(--text-primary)' }}>{pkg.name}</span>
                    <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{conv.toFixed(1)}%</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.min(conv * 10, 100)}%` }} /></div>
                  <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    <span>{pkg.views.toLocaleString()} views</span>
                    <span>{pkg.bookings} bookings · {formatCurrency(pkg.revenue)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="card p-5">
          <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>Agent Leaderboard</h2>
          <div className="space-y-3">
            {mockAgentPerformance.map((agent, i) => (
              <div key={agent.userId} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: i === 0 ? '#F5A623' : i === 1 ? '#94A3B8' : 'var(--bg-tertiary)', color: i < 2 ? '#fff' : 'var(--text-muted)' }}>{i + 1}</span>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${agent.name}`} alt={agent.name} className="w-8 h-8 rounded-full" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{agent.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{agent.packagesPublished} published · {agent.conversionRate}% conv.</p>
                </div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{formatCurrency(agent.totalRevenue)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

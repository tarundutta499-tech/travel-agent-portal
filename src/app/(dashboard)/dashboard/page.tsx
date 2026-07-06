'use client';

import { motion } from 'framer-motion';
import {
  Package, Tag, TrendingUp, Users, Eye, BookOpen,
  ArrowUpRight, ArrowDownRight, Plus, Clock, CheckCircle,
  AlertTriangle, BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { mockDashboardStats, mockRevenueData, mockActivityLog, mockAgentPerformance, mockPackages } from '@/lib/mock-data';
import { formatCurrency, formatNumber, formatRelativeTime } from '@/lib/utils';
import type { Metadata } from 'next';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' } }),
};

const stats = [
  {
    label: 'Total Packages',
    value: '5',
    subLabel: '3 published',
    icon: Package,
    color: '#0F4C81',
    bg: 'rgba(15,76,129,0.1)',
    change: +12,
  },
  {
    label: 'Active Deals',
    value: '3',
    subLabel: '1 expiring soon',
    icon: Tag,
    color: '#00A676',
    bg: 'rgba(0,166,118,0.1)',
    change: +2,
  },
  {
    label: 'Monthly Revenue',
    value: '₹42L',
    subLabel: 'Dec 2024',
    icon: TrendingUp,
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.1)',
    change: +34,
  },
  {
    label: 'Total Bookings',
    value: '277',
    subLabel: 'All time',
    icon: BookOpen,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.1)',
    change: +8,
  },
  {
    label: 'Total Views',
    value: formatNumber(17013),
    subLabel: 'Across all packages',
    icon: Eye,
    color: '#EC4899',
    bg: 'rgba(236,72,153,0.1)',
    change: +22,
  },
  {
    label: 'Pending Approvals',
    value: '1',
    subLabel: 'Needs review',
    icon: Users,
    color: '#F5A623',
    bg: 'rgba(245,166,35,0.1)',
    change: 0,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="card-flat px-3 py-2 text-xs">
        <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name === 'revenue' ? formatCurrency(p.value) : `${p.name}: ${p.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const topPackages = [...mockPackages]
    .filter(p => p.status === 'published')
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>
          Good morning, Arjun 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Here&apos;s what&apos;s happening with your travel packages today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="stats-card"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: s.bg }}
                >
                  <Icon size={17} style={{ color: s.color }} />
                </div>
                {s.change !== 0 && (
                  <div
                    className="flex items-center gap-0.5 text-xs font-medium"
                    style={{ color: s.change > 0 ? '#00A676' : '#E5484D' }}
                  >
                    {s.change > 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                    {Math.abs(s.change)}%
                  </div>
                )}
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
                {s.value}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {s.label}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                {s.subLabel}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-5 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
                Revenue Overview
              </h2>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Jul — Dec 2024</p>
            </div>
            <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#0F4C81' }} />
                Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: '#00A676' }} />
                Bookings
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockRevenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0F4C81" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#0F4C81" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: '#0F4C81' }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bookings by month */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="card p-5"
        >
          <h2 className="font-semibold text-base mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
            Bookings
          </h2>
          <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>Monthly count</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockRevenueData} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="bookings" fill="#00A676" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Top Packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-5 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
              Top Packages
            </h2>
            <Link href="/dashboard/packages" className="text-xs font-medium" style={{ color: '#0F4C81' }}>
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {topPackages.map((pkg, i) => {
              const convRate = pkg.views > 0 ? ((pkg.bookings / pkg.views) * 100).toFixed(1) : '0';
              return (
                <div
                  key={pkg.id}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ background: 'var(--bg-primary)' }}
                >
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: i === 0 ? '#F5A623' : 'var(--bg-tertiary)', color: i === 0 ? '#fff' : 'var(--text-muted)' }}
                  >
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{pkg.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{pkg.views.toLocaleString()} views · {pkg.bookings} bookings</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {formatCurrency(pkg.revenue)}
                    </p>
                    <p className="text-xs" style={{ color: '#00A676' }}>{convRate}% conv.</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
              Recent Activity
            </h2>
            <Link href="/dashboard/activity" className="text-xs font-medium" style={{ color: '#0F4C81' }}>
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {mockActivityLog.slice(0, 6).map((log, i) => (
              <div key={log.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${log.userName}`}
                    alt={log.userName}
                    className="w-7 h-7 rounded-full flex-shrink-0"
                  />
                  {i < mockActivityLog.slice(0, 6).length - 1 && (
                    <div className="w-px flex-1 mt-2" style={{ background: 'var(--border-color)' }} />
                  )}
                </div>
                <div className="pb-4 min-w-0">
                  <p className="text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>
                    <span className="font-medium">{log.userName}</span>{' '}
                    <span style={{ color: 'var(--text-secondary)' }}>{log.action}</span>
                  </p>
                  <p className="text-xs truncate mt-0.5" style={{ color: '#0F4C81' }}>{log.entityName}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {formatRelativeTime(log.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-5 card p-5"
      >
        <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/packages/new" className="btn-primary">
            <Plus size={15} /> New Package
          </Link>
          <Link href="/dashboard/deals/new" className="btn-accent">
            <Tag size={15} /> Create Deal
          </Link>
          <Link href="/dashboard/approvals" className="btn-secondary">
            <Clock size={15} /> Review Approvals
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: '#F5A623', color: '#fff' }}>1</span>
          </Link>
          <Link href="/dashboard/analytics" className="btn-secondary">
            <BarChart3 size={15} /> Analytics
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

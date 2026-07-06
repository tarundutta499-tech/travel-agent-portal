'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag, Percent, Gift, Calendar, Zap, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { mockPackages } from '@/lib/mock-data';
import { generateCouponCode } from '@/lib/utils';
import type { DealType, PackageCategory } from '@/types';

const dealTypes: { value: DealType; label: string; icon: React.ElementType; desc: string }[] = [
  { value: 'percentage', label: '% Discount', icon: Percent, desc: 'Percentage off the package price' },
  { value: 'flat', label: 'Flat Discount', icon: Tag, desc: 'Fixed amount off the price' },
  { value: 'bundle', label: 'Bundle Offer', icon: Gift, desc: 'Combine packages at a special price' },
  { value: 'early_bird', label: 'Early Bird', icon: Calendar, desc: 'Discount for advance bookings' },
  { value: 'last_minute', label: 'Last Minute', icon: Zap, desc: 'Discount for last-minute bookings' },
  { value: 'coupon', label: 'Coupon Code', icon: Tag, desc: 'Redeemable coupon code discount' },
];

const categories: PackageCategory[] = ['honeymoon', 'family', 'luxury', 'adventure', 'group', 'custom'];

export default function NewDealPage() {
  const [dealType, setDealType] = useState<DealType>('percentage');
  const [coupon, setCoupon] = useState('');
  const [applicableTo, setApplicableTo] = useState<'all' | 'category' | 'specific'>('all');

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/deals" className="btn-ghost" style={{ padding: '8px' }}><ArrowLeft size={18} /></Link>
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Create New Deal</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>Set up a new promotion or discount offer.</p>
        </div>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* Deal Type Selection */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-5">
          <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>Deal Type</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {dealTypes.map(dt => {
              const Icon = dt.icon;
              const sel = dealType === dt.value;
              return (
                <button key={dt.value} onClick={() => setDealType(dt.value)} className="p-3 rounded-xl text-left transition-all" style={{ background: sel ? 'rgba(15,76,129,0.08)' : 'var(--bg-primary)', border: `2px solid ${sel ? '#0F4C81' : 'var(--border-color)'}` }}>
                  <Icon size={18} style={{ color: sel ? '#0F4C81' : 'var(--text-muted)' }} className="mb-2" />
                  <p className="text-sm font-medium" style={{ color: sel ? '#0F4C81' : 'var(--text-primary)' }}>{dt.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{dt.desc}</p>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Details */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-5">
          <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>Deal Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Deal Name *</label>
              <input type="text" placeholder="e.g. Summer Sale 2025" className="input-base" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
                  {['percentage', 'early_bird', 'last_minute'].includes(dealType) ? 'Discount (%)' : 'Discount Amount (₹)'}
                </label>
                <input type="number" placeholder={['percentage', 'early_bird', 'last_minute'].includes(dealType) ? '20' : '5000'} className="input-base" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Banner Text</label>
                <input type="text" placeholder="e.g. 20% OFF!" className="input-base" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Valid From *</label>
                <input type="date" className="input-base" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Valid To *</label>
                <input type="date" className="input-base" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coupon Code */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-5">
          <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>Coupon Code</h2>
          <div className="flex items-center gap-3">
            <input type="text" value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} placeholder="Enter or generate a code" className="input-base flex-1 font-mono" />
            <button onClick={() => setCoupon(generateCouponCode())} className="btn-secondary"><RefreshCw size={14} /> Generate</button>
          </div>
        </motion.div>

        {/* Applicability */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-5">
          <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>Applies To</h2>
          <div className="flex gap-3 mb-4">
            {(['all', 'category', 'specific'] as const).map(opt => (
              <button key={opt} onClick={() => setApplicableTo(opt)} className="px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all" style={{ background: applicableTo === opt ? '#0F4C81' : 'var(--bg-primary)', color: applicableTo === opt ? '#fff' : 'var(--text-secondary)', border: `1px solid ${applicableTo === opt ? '#0F4C81' : 'var(--border-color)'}` }}>
                {opt === 'all' ? 'All Packages' : opt === 'category' ? 'By Category' : 'Specific Packages'}
              </button>
            ))}
          </div>
          {applicableTo === 'category' && (
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer capitalize text-sm" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                  <input type="checkbox" className="checkbox-custom" /> {cat}
                </label>
              ))}
            </div>
          )}
          {applicableTo === 'specific' && (
            <div className="space-y-2">
              {mockPackages.map(pkg => (
                <label key={pkg.id} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                  <input type="checkbox" className="checkbox-custom" />
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{pkg.name}</p>
                    <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>{pkg.category} · {pkg.durationDays}D/{pkg.durationNights}N</p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </motion.div>

        {/* Limits */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-5">
          <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>Limits & Stacking</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Total Usage Limit</label>
              <input type="number" placeholder="Unlimited" className="input-base" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Per-Customer Limit</label>
              <input type="number" placeholder="1" className="input-base" />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="checkbox-custom" />
            <span className="text-sm" style={{ color: 'var(--text-primary)' }}>Allow stacking with other deals</span>
          </label>
        </motion.div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2 pb-8">
          <button className="btn-primary flex-1 justify-center">Create Deal</button>
          <button className="btn-secondary">Save as Draft</button>
          <Link href="/dashboard/deals" className="btn-ghost">Cancel</Link>
        </div>
      </div>
    </div>
  );
}

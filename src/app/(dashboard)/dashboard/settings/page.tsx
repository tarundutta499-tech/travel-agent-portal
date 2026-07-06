'use client';

import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Globe, Users, Key, CreditCard } from 'lucide-react';
import { mockUsers } from '@/lib/mock-data';

const roleColorMap: Record<string, string> = { admin: '#8B5CF6', manager: '#0F4C81', agent: '#00A676' };

export default function SettingsPage() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage portal preferences, users, and integrations.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="space-y-1">
          {[
            { label: 'General', icon: Settings, active: true },
            { label: 'Notifications', icon: Bell },
            { label: 'Security', icon: Shield },
            { label: 'Integrations', icon: Globe },
            { label: 'Team & Roles', icon: Users },
            { label: 'API Keys', icon: Key },
            { label: 'Billing', icon: CreditCard },
          ].map(({ label, icon: Icon, active }) => (
            <button key={label} className={`sidebar-link w-full ${active ? 'active' : ''}`}><Icon size={16} /> {label}</button>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-5">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-5">
            <h2 className="font-semibold text-base mb-4" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>General Settings</h2>
            <div className="space-y-4">
              {[
                { label: 'Portal Name', value: 'TravelOps Portal', type: 'text' },
                { label: 'Default Currency', value: 'INR', type: 'text' },
                { label: 'Default Tax Rate (%)', value: '5', type: 'number' },
                { label: 'Timezone', value: 'Asia/Kolkata', type: 'text' },
              ].map(({ label, value, type }) => (
                <div key={label}>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{label}</label>
                  <input type={type} defaultValue={value} className="input-base" />
                </div>
              ))}
              <button className="btn-primary">Save Changes</button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-base" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>Team Members</h2>
              <button className="btn-primary text-xs" style={{ padding: '6px 14px' }}>Invite Member</button>
            </div>
            <div className="space-y-3">
              {mockUsers.map(user => (
                <div key={user.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                  <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                  </div>
                  <span className="badge capitalize" style={{ background: `${roleColorMap[user.role]}20`, color: roleColorMap[user.role] }}>{user.role}</span>
                  <button className="btn-ghost" style={{ padding: '4px 8px', fontSize: '12px' }}>Edit</button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

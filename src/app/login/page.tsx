'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'admin' | 'manager' | 'agent'>('admin');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-center items-center flex-1 p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F4C81 0%, #1a6ab5 50%, #00A676 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)' }} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative z-10 text-center">
          <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
            <Plane size={36} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-poppins)' }}>TravelOps</h1>
          <p className="text-lg text-white/70 max-w-md">The internal portal for managing travel packages, deals, and publishing to your live website.</p>
          <div className="flex items-center justify-center gap-8 mt-12">
            {[
              { val: '50+', label: 'Packages' },
              { val: '₹2.7Cr', label: 'Revenue' },
              { val: '277', label: 'Bookings' },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-poppins)' }}>{val}</p>
                <p className="text-sm text-white/50">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right panel — login form */}
      <div className="flex flex-col justify-center items-center flex-1 p-8 lg:p-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0F4C81, #00A676)' }}>
              <Plane size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>TravelOps</span>
          </div>

          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Welcome back</h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>Sign in to manage your travel packages and deals.</p>

          {/* Role selector for demo */}
          <div className="mb-6">
            <label className="block text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Demo Role</label>
            <div className="flex gap-2">
              {(['admin', 'manager', 'agent'] as const).map(r => (
                <button key={r} onClick={() => setRole(r)} className="flex-1 py-2.5 rounded-lg text-sm font-medium capitalize transition-all" style={{ background: role === r ? '#0F4C81' : 'var(--bg-tertiary)', color: role === r ? '#fff' : 'var(--text-secondary)', border: `1px solid ${role === r ? '#0F4C81' : 'var(--border-color)'}` }}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Email</label>
              <input type="email" defaultValue={role === 'admin' ? 'arjun@travelportal.com' : role === 'manager' ? 'priya@travelportal.com' : 'rahul@travelportal.com'} className="input-base" placeholder="you@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} defaultValue="demo1234" className="input-base" style={{ paddingRight: '40px' }} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="checkbox-custom" defaultChecked />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Remember me</span>
              </label>
              <button type="button" className="text-sm font-medium" style={{ color: '#0F4C81' }}>Forgot password?</button>
            </div>

            <button type="submit" className="btn-primary w-full justify-center" style={{ padding: '12px 24px', fontSize: '15px' }}>
              Sign in <ArrowRight size={16} />
            </button>
          </form>

          <div className="flex items-center gap-2 mt-6 p-3 rounded-lg text-xs" style={{ background: 'rgba(15,76,129,0.06)', border: '1px solid rgba(15,76,129,0.12)', color: 'var(--text-secondary)' }}>
            <Shield size={14} style={{ color: '#0F4C81', flexShrink: 0 }} />
            <span>This is a demo portal. Use the role selector above to switch between Admin, Manager, and Agent views.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

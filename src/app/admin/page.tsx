'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Compass, Shield, Key, RefreshCw, Power, 
  MapPin, Database, CheckCircle
} from 'lucide-react';

interface DbTemplate {
  id: string;
  durationDays: number;
  title: string;
  price: number;
  difficulty: string;
  image: string;
  destination: {
    name: string;
  };
}

export default function AdminDashboardPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [templates, setTemplates] = useState<DbTemplate[]>([]);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrator passcode.');
    }
  };

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/packages');
      const data = await res.json();
      if (data.success) {
        setTemplates(data.packages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTemplates();
    }
  }, [isAuthenticated]);

  const handleSeedDb = async () => {
    setSeeding(true);
    setSeedSuccess(false);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSeedSuccess(true);
        fetchTemplates();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSeeding(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-sand text-obsidian flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-md mx-auto w-full space-y-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg">
              <Compass className="text-cream w-6 h-6 -rotate-45" />
            </div>
            <h1 className="text-2xl font-extrabold font-display mt-4">Wandertribe Admin Console</h1>
            <p className="text-xs text-obsidian/50 font-light">Enter passcode to access Kashmir control desk</p>
          </div>

          <Card className="p-6 md:p-8 bg-white border border-obsidian/10 shadow-xl rounded-3xl">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1 text-left">Admin Passcode</label>
                <div className="relative">
                  <Key className="absolute left-3 top-3.5 w-4 h-4 text-obsidian/30" />
                  <input 
                    type="password" 
                    placeholder="Enter passcode (hint: admin)"
                    value={passcode}
                    onChange={e => setPasscode(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                    required 
                  />
                </div>
              </div>

              {authError && (
                <div className="text-[10px] text-red-500 font-semibold text-left">
                  ⚠️ {authError}
                </div>
              )}

              <Button type="submit" className="w-full justify-center py-3">
                Unlock Control Panel <Shield className="w-4 h-4 ml-1" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand text-obsidian py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Sub-header */}
        <div className="flex justify-between items-center flex-wrap gap-4 border-b border-obsidian/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold font-display">Kashmir Templates Admin Panel</h1>
              <p className="text-xs text-obsidian/50">Manage dynamic stops, hotels, and duration templates.</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={handleSeedDb}
              disabled={seeding}
              className="flex items-center gap-1 text-xs"
            >
              <Database className="w-4 h-4 text-secondary" /> {seeding ? 'Seeding...' : 'Seed Database'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsAuthenticated(false)}
              className="p-2 border-red-200 text-red-500 hover:bg-red-50"
            >
              <Power className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {seedSuccess && (
          <div className="p-4 bg-[#00c98e]/10 border border-[#00c98e]/35 text-[#00c98e] rounded-xl text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> Database successfully re-seeded with Kashmir stops, templates, and Holiday Inn hotel!
          </div>
        )}

        {/* Listing Grid */}
        {loading ? (
          <div className="text-center py-12 text-xs font-semibold text-obsidian/50 animate-pulse flex items-center justify-center gap-1.5">
            <RefreshCw className="w-4 h-4 animate-spin" /> Fetching Template Listings...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {templates.map(tpl => (
              <Card key={tpl.id} className="flex flex-col bg-white border border-obsidian/10 rounded-2xl overflow-hidden shadow-sm">
                <div className="relative aspect-[16/10] bg-obsidian/5 overflow-hidden">
                  <img src={tpl.image} alt="" className="w-full h-full object-cover" />
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-emerald-500 text-cream">
                    {tpl.destination.name}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-obsidian font-display leading-tight">{tpl.title}</h3>
                    <p className="text-[10px] text-obsidian/45 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {tpl.durationDays} Days Duration · {tpl.difficulty}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-obsidian/5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-obsidian/40 block">Base Price</span>
                      <span className="text-xs font-bold text-secondary font-mono">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(tpl.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {templates.length === 0 && (
              <div className="col-span-full py-16 text-center border border-dashed border-obsidian/25 rounded-2xl">
                <Database className="w-12 h-12 text-obsidian/20 mx-auto mb-4" />
                <h3 className="font-bold text-sm text-obsidian font-display">Database is Empty</h3>
                <p className="text-xs text-obsidian/50 mt-1">Please click the "Seed Database" button at the top right to initialize templates.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

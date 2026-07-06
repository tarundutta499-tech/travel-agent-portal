'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Compass, Shield, Key, Plus, RefreshCw, Power, 
  Trash, Edit, Tag, Clock, MapPin, Database, CheckCircle
} from 'lucide-react';
import Link from 'next/link';

interface DbPackage {
  id: string;
  title: string;
  slug: string;
  description: string;
  destination: string;
  price: number;
  duration: string;
  difficulty: string;
  image: string;
  category: string;
  active: boolean;
}

export default function AdminDashboardPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [packages, setPackages] = useState<DbPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);
  
  // Add Package Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPkg, setNewPkg] = useState({
    title: '',
    slug: '',
    description: '',
    destination: 'Gulmarg',
    price: '',
    duration: '5 Days',
    difficulty: 'Moderate',
    groupSizeMax: '10',
    image: '',
    category: 'Trekking',
    guideName: ''
  });
  const [formError, setFormError] = useState('');

  // Handle local passphrase lock
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid administrator passcode.');
    }
  };

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/packages');
      const data = await res.json();
      if (data.success) {
        setPackages(data.packages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPackages();
    }
  }, [isAuthenticated]);

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/packages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, active: !currentStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setPackages(prev => prev.map(p => p.id === id ? { ...p, active: !currentStatus } : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSeedDb = async () => {
    setSeeding(true);
    setSeedSuccess(false);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSeedSuccess(true);
        fetchPackages();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSeeding(false);
    }
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    try {
      const res = await fetch('/api/admin/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPkg),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddForm(false);
        setNewPkg({
          title: '',
          slug: '',
          description: '',
          destination: 'Gulmarg',
          price: '',
          duration: '5 Days',
          difficulty: 'Moderate',
          groupSizeMax: '10',
          image: '',
          category: 'Trekking',
          guideName: ''
        });
        fetchPackages();
      } else {
        setFormError(data.error || 'Failed to create package');
      }
    } catch (err) {
      setFormError('Network error occurred.');
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
            <h1 className="text-2xl font-extrabold font-display mt-4">Wandertribe Admin console</h1>
            <p className="text-xs text-obsidian/50 font-light">Enter passcode to access Kashmir packages control desk</p>
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
              <h1 className="text-2xl font-extrabold font-display">Kashmir Packages Admin Panel</h1>
              <p className="text-xs text-obsidian/50">Manage local tour directories and seed mock records.</p>
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
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-1 text-xs"
            >
              <Plus className="w-4 h-4" /> Add Package
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
            <CheckCircle className="w-4 h-4" /> Database successfully initialized with Kashmir mock tours!
          </div>
        )}

        {/* Add package modal/form panel */}
        {showAddForm && (
          <Card className="p-6 md:p-8 bg-white border border-primary/20 shadow-2xl rounded-3xl space-y-6">
            <div className="flex justify-between items-center border-b border-obsidian/10 pb-4">
              <h3 className="font-bold text-base font-display">Create Kashmir Adventure Package</h3>
              <button onClick={() => setShowAddForm(false)} className="text-xs font-bold text-obsidian/45 hover:text-obsidian">Cancel</button>
            </div>
            
            <form onSubmit={handleAddPackage} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Package Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Gulmarg Ski Run"
                    value={newPkg.title}
                    onChange={e => setNewPkg({ ...newPkg, title: e.target.value })}
                    className="w-full px-3 py-2 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">URL Slug</label>
                  <input 
                    type="text" 
                    placeholder="e.g. gulmarg-ski-run"
                    value={newPkg.slug}
                    onChange={e => setNewPkg({ ...newPkg, slug: e.target.value })}
                    className="w-full px-3 py-2 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Price (INR)</label>
                  <input 
                    type="number" 
                    placeholder="35000"
                    value={newPkg.price}
                    onChange={e => setNewPkg({ ...newPkg, price: e.target.value })}
                    className="w-full px-3 py-2 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Destination Zone</label>
                  <select 
                    value={newPkg.destination}
                    onChange={e => setNewPkg({ ...newPkg, destination: e.target.value })}
                    className="w-full px-3 py-2 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                  >
                    <option value="Gulmarg">Gulmarg</option>
                    <option value="Srinagar">Srinagar</option>
                    <option value="Sonamarg">Sonamarg</option>
                    <option value="Pahalgam">Pahalgam</option>
                    <option value="Gurez Valley">Gurez Valley</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Duration</label>
                  <input 
                    type="text" 
                    placeholder="5 Days"
                    value={newPkg.duration}
                    onChange={e => setNewPkg({ ...newPkg, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Category</label>
                  <select 
                    value={newPkg.category}
                    onChange={e => setNewPkg({ ...newPkg, category: e.target.value })}
                    className="w-full px-3 py-2 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                  >
                    <option value="Skiing">Skiing</option>
                    <option value="Trekking">Trekking</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="Road Trips">Road Trips</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Cover Image URL</label>
                  <input 
                    type="text" 
                    placeholder="https://images.unsplash.com/..."
                    value={newPkg.image}
                    onChange={e => setNewPkg({ ...newPkg, image: e.target.value })}
                    className="w-full px-3 py-2 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Certified Guide Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Yaseen Lone"
                    value={newPkg.guideName}
                    onChange={e => setNewPkg({ ...newPkg, guideName: e.target.value })}
                    className="w-full px-3 py-2 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Trip Overview Description</label>
                <textarea 
                  rows={3}
                  placeholder="Itinerary summary..."
                  value={newPkg.description}
                  onChange={e => setNewPkg({ ...newPkg, description: e.target.value })}
                  className="w-full px-3 py-2 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary resize-none"
                />
              </div>

              {formError && (
                <div className="text-xs text-red-500 font-semibold">
                  ⚠️ {formError}
                </div>
              )}

              <Button type="submit" className="w-full justify-center">Create Package</Button>
            </form>
          </Card>
        )}

        {/* Listing Grid */}
        {loading ? (
          <div className="text-center py-12 text-xs font-semibold text-obsidian/50 animate-pulse flex items-center justify-center gap-1.5">
            <RefreshCw className="w-4 h-4 animate-spin" /> Fetching Package Listings...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <Card key={pkg.id} className="flex flex-col bg-white border border-obsidian/10 rounded-2xl overflow-hidden shadow-sm">
                <div className="relative aspect-[16/10] bg-obsidian/5 overflow-hidden">
                  <img src={pkg.image} alt="" className="w-full h-full object-cover" />
                  <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider ${
                    pkg.active ? 'bg-emerald-500 text-cream' : 'bg-red-500 text-cream'
                  }`}>
                    {pkg.active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-obsidian font-display leading-tight">{pkg.title}</h3>
                    <p className="text-[10px] text-obsidian/45 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {pkg.destination}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-obsidian/5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-obsidian/40 block">Price</span>
                      <span className="text-xs font-bold text-secondary font-mono">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(pkg.price)}
                      </span>
                    </div>

                    <button 
                      onClick={() => toggleStatus(pkg.id, pkg.active)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all ${
                        pkg.active 
                          ? 'border-red-200 text-red-500 hover:bg-red-50' 
                          : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                      }`}
                    >
                      {pkg.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </div>
              </Card>
            ))}

            {packages.length === 0 && (
              <div className="col-span-full py-16 text-center border border-dashed border-obsidian/25 rounded-2xl">
                <Database className="w-12 h-12 text-obsidian/20 mx-auto mb-4 animate-bounce" />
                <h3 className="font-bold text-sm text-obsidian font-display">Database is Empty</h3>
                <p className="text-xs text-obsidian/50 mt-1">Please click the "Seed Database" button at the top right to initialize Kashmir packages.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

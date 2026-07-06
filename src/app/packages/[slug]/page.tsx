'use client';

import { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Check, X, Star, MapPin, Calendar, Clock, 
  Users, Plane, Shield, MessageSquare, ChevronRight, Phone, Mail 
} from 'lucide-react';
import Link from 'next/link';
import { mockPackages } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function PublicPackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  // Find package by slug
  const pkg = mockPackages.find(p => p.slug === slug) || mockPackages[0];
  
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setFormData({ name: '', email: '', phone: '', date: '', guests: '2', notes: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-inter">
      
      {/* ─── HEADER ─── */}
      <header className="bg-white border-b border-slate-100 py-5 sticky top-0 z-40 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group text-sm font-semibold text-slate-600 hover:text-[#0F4C81] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Packages
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0F4C81] to-[#00A676] flex items-center justify-center">
              <Plane className="text-white w-4 h-4 -rotate-45" />
            </div>
            <span className="font-bold text-slate-950 font-poppins text-base leading-none">Voyage Luxe</span>
          </Link>
          <div>
            <Link href="/login" className="text-xs font-semibold text-slate-600 hover:text-[#0F4C81] border border-slate-200 px-3 py-1.5 rounded-lg">
              Consultant Login
            </Link>
          </div>
        </div>
      </header>

      {/* ─── HERO COVER BANNER ─── */}
      <section className="relative h-[400px] md:h-[500px] bg-slate-950 overflow-hidden">
        <img 
          src={pkg.coverImage || 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200'} 
          alt={pkg.name} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00A676]/90 uppercase tracking-widest text-white">
              {pkg.category} Package
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-poppins">
              {pkg.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-200 font-medium">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#00c98e]" /> {pkg.durationDays} Days / {pkg.durationNights} Nights</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-[#60a5fa]" /> {pkg.destinations.map(d => d.name).join(', ')}</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 5-Star Partners</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTENT GRID ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Itinerary and Details */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Short description / Pitch */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-4">
              <h2 className="text-xl font-bold font-poppins text-slate-900 border-l-4 border-[#0F4C81] pl-3">
                Experience Overview
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                {pkg.shortDescription}
              </p>
            </div>

            {/* Itinerary Timeline */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold font-poppins text-slate-900 border-l-4 border-[#0F4C81] pl-3">
                Day-by-Day Journey Itinerary
              </h2>
              
              <div className="relative border-l border-slate-100 pl-6 ml-3 space-y-8">
                {pkg.itinerary.map((day, idx) => (
                  <div key={day.id} className="relative">
                    {/* Circle timeline dot */}
                    <div className="absolute -left-[37px] top-1.5 w-6 h-6 rounded-full bg-gradient-to-tr from-[#0F4C81] to-[#00c98e] border-4 border-white shadow-sm flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">{day.day}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-bold text-base text-slate-950 font-poppins">
                        Day {day.day}: {day.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {day.description}
                      </p>
                      
                      {/* Activities tags */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {day.activities.map(act => (
                          <span key={act} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600">
                            {act}
                          </span>
                        ))}
                      </div>

                      {/* Day meal details */}
                      <div className="flex items-center gap-3 pt-2 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                        <span>Meals:</span>
                        <span className={day.meals.breakfast ? 'text-emerald-600' : 'text-slate-300'}>Breakfast</span>
                        <span className={day.meals.lunch ? 'text-emerald-600' : 'text-slate-300'}>Lunch</span>
                        <span className={day.meals.dinner ? 'text-emerald-600' : 'text-slate-300'}>Dinner</span>
                      </div>
                    </div>
                  </div>
                ))}

                {pkg.itinerary.length === 0 && (
                  <div className="text-slate-500 text-xs py-4 pl-2 font-medium italic">
                    Detailed Day-by-Day itinerary builder in progress. Standard excursions and transfers are included as baseline services.
                  </div>
                )}
              </div>
            </div>

            {/* Inclusions and Exclusions split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#00A676] font-poppins flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Package Inclusions
                </h3>
                <ul className="space-y-2">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#E5484D] font-poppins flex items-center gap-1.5">
                  <X className="w-4 h-4" /> Package Exclusions
                </h3>
                <ul className="space-y-2">
                  {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                      <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Hotel Inventory Detail */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-xl font-bold font-poppins text-slate-900 border-l-4 border-[#0F4C81] pl-3">
                Linked Luxury Hotels & Accommodations
              </h2>
              
              <div className="space-y-4">
                {pkg.hotels.map(h => (
                  <div key={h.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 text-sm font-poppins">{h.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <MapPin className="w-3 h-3 text-[#0F4C81]" /> <span>{h.location}</span>
                        <span>·</span>
                        <div className="flex text-amber-400">
                          {Array.from({ length: h.stars }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-md">
                        {h.roomType}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md">
                        Meal Plan: {h.mealPlan.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Consultation Quote Request Widget */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            
            <div className="bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-100/50 p-6 md:p-8 space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Consultant Rates Starting At</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-[#0F4C81] font-poppins">{formatCurrency(pkg.sellingPrice)}</span>
                  <span className="text-xs text-slate-500 font-medium">/ traveler</span>
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">Inclusive of GST, service margins, &amp; partner trade rates.</span>
              </div>

              {/* Occupancy variants */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-poppins">Occupancy Slabs</h4>
                <div className="divide-y divide-slate-50 text-xs">
                  {pkg.priceVariants && pkg.priceVariants.map(pv => (
                    <div key={pv.id} className="py-2.5 flex justify-between items-center">
                      <span className="text-slate-600 capitalize font-medium">{pv.occupancyType} occupancy ({pv.season} season)</span>
                      <span className="font-bold text-slate-900">{formatCurrency(pv.basePrice)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                {inquirySubmitted ? (
                  <div className="bg-emerald-50 text-emerald-800 text-xs p-4 rounded-xl border border-emerald-100 text-center font-medium leading-relaxed">
                    🌟 Request sent! A dedicated Voyage Luxe travel specialist will contact our local DMC partners to lock in this package for your dates.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-poppins">Request Quote For This Trip</h4>
                    
                    <div>
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl outline-none focus:bg-white focus:border-[#0F4C81]"
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="email" 
                        placeholder="Email" 
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl outline-none focus:bg-white focus:border-[#0F4C81]"
                        required 
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone" 
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl outline-none focus:bg-white focus:border-[#0F4C81]"
                        required 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="date" 
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl outline-none focus:bg-white focus:border-[#0F4C81]"
                        required 
                      />
                      <select 
                        value={formData.guests}
                        onChange={e => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-xs text-slate-900 rounded-xl outline-none focus:bg-white focus:border-[#0F4C81] cursor-pointer"
                      >
                        <option value="1">1 Traveler</option>
                        <option value="2">2 Travelers</option>
                        <option value="4">4 Travelers</option>
                        <option value="5+">5+ Travelers</option>
                      </select>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#0F4C81] hover:bg-[#1a6ab5] text-white text-xs font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#0F4C81]/15"
                    >
                      Check Availability &amp; Get Quote
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Travel Consultant Guarantee Box */}
            <div className="bg-gradient-to-tr from-slate-900 to-[#0F4C81] text-white p-6 rounded-3xl space-y-4">
              <Shield className="w-6 h-6 text-[#00c98e]" />
              <h4 className="font-bold text-sm font-poppins">Consultant Assurance</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                We coordinate directly with verified destination operators. No hidden booking markup. We guarantee full refund schemes and dedicated crisis helplines on every consultation contract.
              </p>
            </div>

          </div>

        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-900 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 Voyage Luxe Advisory. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-white transition-colors">Homepage</Link>
            <Link href="/login" className="hover:text-white transition-colors">Partner Dashboard</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

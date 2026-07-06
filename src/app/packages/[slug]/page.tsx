'use client';

import { use, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Compass, MapPin, Calendar, Users, Heart, Star, 
  ArrowLeft, Check, X, Shield, StarHalf, MessageSquare,
  Clock, ShieldAlert, Award
} from 'lucide-react';
import Link from 'next/link';
import { mockPackages } from '@/lib/mock-data';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  // Find package by slug
  const [pkg, setPkg] = useState(() => mockPackages.find(p => p.slug === slug) || mockPackages[0]);
  const [activeImage, setActiveImage] = useState<string>(pkg.image);
  const [activeDay, setActiveDay] = useState<number | null>(1);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [date, setDate] = useState<string>('2026-10-15');
  const [bookingInquirySubmitted, setBookingInquirySubmitted] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.packages) {
          const found = data.packages.find((p: any) => p.slug === slug);
          if (found) {
            setPkg(found);
            setActiveImage(found.image);
          }
        }
      })
      .catch(err => console.error('Error loading database package detail:', err));
  }, [slug]);

  const totalPrice = pkg.price * guestCount;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingInquirySubmitted(true);
    setTimeout(() => {
      setBookingInquirySubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-sand text-obsidian flex flex-col font-sans antialiased">
      
      {/* HEADER */}
      <header className="bg-sand border-b border-obsidian/5 py-5 sticky top-0 z-40 backdrop-blur-md bg-sand/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/packages" className="flex items-center gap-2 group text-sm font-semibold text-obsidian/70 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Kashmir Trips
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
              <Compass className="text-cream w-4.5 h-4.5 -rotate-45" />
            </div>
            <span className="font-bold text-obsidian font-display text-base">Wandertribe</span>
          </Link>
        </div>
      </header>

      {/* GALLERY / LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-8">
        
        {/* Title and location */}
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <span>{pkg.category} Expedition</span>
              <span>·</span>
              <span className="flex items-center gap-0.5"><Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {pkg.rating} ({pkg.reviewsCount} reviews)</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-obsidian leading-none">
              {pkg.title}
            </h1>
            <p className="text-sm text-obsidian/60 flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-primary" /> {pkg.destination}, Kashmir Valley
            </p>
          </div>
          
          <button 
            onClick={() => setSaved(!saved)}
            className="px-5 py-3 rounded-2xl bg-cream border border-obsidian/10 font-semibold text-xs transition-all hover:bg-obsidian/5 flex items-center gap-1.5"
          >
            <Heart className={`w-4 h-4 text-primary ${saved ? 'fill-current' : ''}`} /> {saved ? 'Saved' : 'Wishlist'}
          </button>
        </div>

        {/* Dynamic Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 aspect-[16/9] bg-obsidian/5 rounded-3xl overflow-hidden border border-obsidian/5">
            <img src={activeImage} alt={pkg.title} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
            {pkg.images.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setActiveImage(img)}
                className={`aspect-[4/3] bg-obsidian/5 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${
                  activeImage === img ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* TWO COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Itinerary, Guide, Inclusions */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview Card */}
            <div className="bg-cream rounded-3xl p-6 md:p-8 border border-obsidian/5 shadow-sm space-y-4">
              <h2 className="text-xl font-bold font-display border-l-4 border-primary pl-3 text-obsidian">
                Trip Overview
              </h2>
              <p className="text-sm text-obsidian/75 leading-relaxed font-light">
                {pkg.description}
              </p>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-obsidian/5 text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-obsidian/40 block">Duration</span>
                  <span className="text-sm font-bold text-obsidian font-display">{pkg.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-obsidian/40 block">Max Group Size</span>
                  <span className="text-sm font-bold text-obsidian font-display">{pkg.groupSizeMax} Travelers</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-obsidian/40 block">Difficulty</span>
                  <span className="text-sm font-bold text-obsidian font-display capitalize">{pkg.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Expandable Itinerary Accordion */}
            <div className="bg-cream rounded-3xl p-6 md:p-8 border border-obsidian/5 shadow-sm space-y-6">
              <h2 className="text-xl font-bold font-display border-l-4 border-primary pl-3 text-obsidian">
                Day-by-Day Expedition Itinerary
              </h2>

              <div className="space-y-3">
                {pkg.itinerary.map(day => (
                  <div 
                    key={day.day}
                    className="border border-obsidian/5 rounded-2xl overflow-hidden bg-sand/30"
                  >
                    <button 
                      onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                      className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-obsidian font-display"
                    >
                      <span>Day {day.day}: {day.title}</span>
                      <span className="text-primary font-bold text-lg">{activeDay === day.day ? '−' : '+'}</span>
                    </button>

                    <AnimatePresence>
                      {activeDay === day.day && (
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 border-t border-obsidian/5 text-xs text-obsidian/70 space-y-3 leading-relaxed">
                            <p>{day.description}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {day.activities.map(act => (
                                <span key={act} className="px-2 py-0.5 rounded-full bg-cream border border-obsidian/5 text-obsidian/60 text-[10px] font-semibold">
                                  {act}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions and Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cream rounded-3xl p-6 border border-obsidian/5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#00A676] font-display flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Inclusions
                </h3>
                <ul className="space-y-2">
                  {pkg.included.map((item, i) => (
                    <li key={i} className="text-xs text-obsidian/70 flex items-start gap-2 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-cream rounded-3xl p-6 border border-obsidian/5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#E5484D] font-display flex items-center gap-1.5">
                  <X className="w-4 h-4" /> Exclusions
                </h3>
                <ul className="space-y-2">
                  {pkg.excluded.map((item, i) => (
                    <li key={i} className="text-xs text-obsidian/70 flex items-start gap-2 leading-relaxed">
                      <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Local Host Profile Card */}
            <div className="bg-cream rounded-3xl p-6 md:p-8 border border-obsidian/5 shadow-sm flex flex-col md:flex-row items-center gap-6">
              <img 
                src={pkg.guide.avatar} 
                alt={pkg.guide.name} 
                className="w-16 h-16 rounded-2xl border border-obsidian/10 bg-sand flex-shrink-0"
              />
              <div className="space-y-2 flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-widest text-secondary font-display">
                  <span>Host &amp; Guide</span>
                  <span>·</span>
                  <span>{pkg.guide.experience} Experience</span>
                </div>
                <h3 className="font-bold text-lg text-obsidian font-display leading-none">{pkg.guide.name}</h3>
                <p className="text-xs text-obsidian/60 leading-relaxed font-light">{pkg.guide.bio}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            
            <div className="bg-cream rounded-3xl border border-obsidian/5 shadow-lg p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] uppercase font-bold text-obsidian/40 block">Trip Price</span>
                <div>
                  <span className="text-2xl font-extrabold text-secondary font-display">{formatCurrency(pkg.price)}</span>
                  <span className="text-[10px] text-obsidian/50">/ person</span>
                </div>
              </div>

              {bookingInquirySubmitted ? (
                <div className="bg-[#00c98e]/10 border border-[#00c98e]/35 text-[#00c98e] text-xs p-4 rounded-2xl text-center font-medium leading-relaxed">
                  🌟 Booking Inquiry Sent! Our local Kashmiri specialist guide has locked this date and is generating your booking credentials.
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4 pt-4 border-t border-obsidian/5">
                  <div>
                    <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Target Date</label>
                    <input 
                      type="date" 
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-sand/50 border border-obsidian/10 text-xs text-obsidian font-medium rounded-xl outline-none focus:bg-white focus:border-primary cursor-pointer"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Travelers</label>
                    <select 
                      value={guestCount}
                      onChange={e => setGuestCount(+e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-sand/50 border border-obsidian/10 text-xs text-obsidian font-bold rounded-xl outline-none focus:bg-white focus:border-primary cursor-pointer"
                    >
                      <option value="1">1 Traveler</option>
                      <option value="2">2 Travelers</option>
                      <option value="3">3 Travelers</option>
                      <option value="4">4 Travelers</option>
                      <option value="5">5 Travelers</option>
                      <option value="6">6+ Group</option>
                    </select>
                  </div>

                  <div className="pt-2 flex justify-between items-baseline text-sm border-t border-obsidian/5">
                    <span className="font-semibold text-obsidian/50">Total Estimation</span>
                    <span className="text-xl font-bold text-primary font-display">{formatCurrency(totalPrice)}</span>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full justify-center"
                  >
                    Check Availability
                  </Button>
                </form>
              )}
            </div>

            {/* Travel safety badge */}
            <div className="bg-obsidian text-cream p-6 rounded-3xl space-y-3">
              <Shield className="w-6 h-6 text-primary" />
              <h4 className="font-bold text-sm text-cream font-display">Tribe Protection</h4>
              <p className="text-[10px] text-sand/60 leading-relaxed font-light">
                We guarantee local rescue dispatch, emergency satellite channels, and a 100% refund policy if mountain safety agencies warn against ridge activity.
              </p>
            </div>

          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-obsidian text-sand/40 py-8 border-t border-cream/5 text-xs text-center">
        <p>© 2026 Wandertribe Kashmir Adventures. All rights reserved.</p>
      </footer>

    </div>
  );
}

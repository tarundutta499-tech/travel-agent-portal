'use client';

import { use, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Compass, MapPin, Calendar, Users, Heart, Star, 
  ArrowLeft, Check, X, Shield, MessageSquare,
  Clock, ShieldAlert, Award
} from 'lucide-react';
import Link from 'next/link';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  const [destination, setDestination] = useState<any>(null);
  const [duration, setDuration] = useState<number>(5);
  const [activeDay, setActiveDay] = useState<number | null>(1);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [date, setDate] = useState<string>('2026-10-15');
  const [bookingInquirySubmitted, setBookingInquirySubmitted] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1. Read duration parameter from URL query string on client side
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const durParam = urlParams.get('duration');
      if (durParam) {
        setDuration(parseInt(durParam));
      }
    }

    // 2. Fetch destination stops and templates
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.destinations) {
          const found = data.destinations.find((d: any) => d.slug === slug);
          if (found) {
            setDestination(found);
          }
        }
      })
      .catch(err => console.error('Error loading database destination detail:', err))
      .finally(() => setLoading(false));
  }, [slug]);

  // Find active template based on duration state
  const activeTemplate = destination?.itineraryTemplates?.find(
    (t: any) => t.durationDays === duration
  ) || destination?.itineraryTemplates?.[0];

  const totalPrice = (activeTemplate?.price || 0) * guestCount;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingInquirySubmitted(true);
    setTimeout(() => {
      setBookingInquirySubmitted(false);
    }, 4000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sand text-obsidian flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <Compass className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-xs font-semibold text-obsidian/60">Loading Kashmir Expedition details...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-sand text-obsidian flex items-center justify-center font-sans">
        <div className="text-center space-y-4 max-w-sm p-6 bg-cream border border-obsidian/10 rounded-3xl">
          <ShieldAlert className="w-10 h-10 text-red-500 mx-auto" />
          <h2 className="font-bold text-lg font-display">Destination Not Found</h2>
          <p className="text-xs text-obsidian/60">We could not load information for this zone. Please return to packages list.</p>
          <Link href="/packages">
            <Button size="sm" className="mt-2">Back to Kashmir Trips</Button>
          </Link>
        </div>
      </div>
    );
  }

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
        
        {/* Title and duration picker */}
        <div className="flex justify-between items-start gap-6 flex-wrap">
          <div className="space-y-2 flex-1 min-w-[280px]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <span>{activeTemplate?.difficulty} Expedition</span>
              <span>·</span>
              <span className="flex items-center gap-0.5"><Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.9 (140+ reviews)</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display text-obsidian leading-none">
              {destination.name}: {activeTemplate?.title || 'Expedition'}
            </h1>
            <p className="text-sm text-obsidian/60 flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-primary" /> {destination.name} Valley, Kashmir
            </p>
          </div>

          <div className="bg-cream p-1.5 rounded-2xl border border-obsidian/10 flex items-center gap-1 shadow-sm">
            {[3, 5, 7].map(d => (
              <button
                key={d}
                onClick={() => {
                  setDuration(d);
                  setActiveDay(1);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  duration === d 
                    ? 'bg-obsidian text-cream shadow-sm' 
                    : 'text-obsidian/60 hover:text-obsidian hover:bg-obsidian/5'
                }`}
              >
                {d} Days
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 aspect-[16/9] bg-obsidian/5 rounded-3xl overflow-hidden border border-obsidian/5">
            <img src={activeTemplate?.image || destination.heroImage} alt={destination.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
            {[
              activeTemplate?.image || destination.heroImage,
              'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
              'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'
            ].map((img, i) => (
              <div 
                key={i} 
                className="aspect-[4/3] bg-obsidian/5 rounded-2xl overflow-hidden border border-transparent opacity-75 hover:opacity-100 transition-opacity"
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
                {destination.description}
              </p>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-obsidian/5 text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-obsidian/40 block">Duration</span>
                  <span className="text-sm font-bold text-obsidian font-display">{duration} Days</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-obsidian/40 block">Stops Included</span>
                  <span className="text-sm font-bold text-obsidian font-display">
                    {activeTemplate?.itinerary?.map((item: any) => item.stopName).filter((v: any, i: number, a: any) => a.indexOf(v) === i).join(' · ')}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-obsidian/40 block">Difficulty</span>
                  <span className="text-sm font-bold text-obsidian font-display capitalize">{activeTemplate?.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Adaptable Day-by-Day Itinerary */}
            <div className="bg-cream rounded-3xl p-6 md:p-8 border border-obsidian/5 shadow-sm space-y-6">
              <h2 className="text-xl font-bold font-display border-l-4 border-primary pl-3 text-obsidian">
                Day-by-Day Route Itinerary
              </h2>

              <div className="space-y-4">
                {activeTemplate?.itinerary?.map((day: any) => {
                  // Resolve hotel at the current stop
                  const stop = destination.stops.find(
                    (s: any) => s.locationName.toLowerCase() === day.stopName.toLowerCase()
                  );
                  const confirmedHotel = stop?.hotels?.find((h: any) => h.isConfirmed);

                  return (
                    <div 
                      key={day.day}
                      className="border border-obsidian/5 rounded-2xl overflow-hidden bg-sand/30"
                    >
                      <button 
                        onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                        className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-obsidian font-display"
                      >
                        <span className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-lg bg-primary text-cream text-[10px] font-bold">Day {day.day}</span>
                          <span>{day.title} ({day.stopName})</span>
                        </span>
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
                            <div className="p-4 pt-0 border-t border-obsidian/5 text-xs text-obsidian/70 space-y-4 leading-relaxed">
                              <p>{day.description}</p>
                              
                              {/* Hotel Placement Block */}
                              <div className="p-3.5 rounded-2xl border transition-all">
                                {confirmedHotel ? (
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                                      <Check className="w-3.5 h-3.5" /> Confirmed Partner Hotel
                                    </div>
                                    <h4 className="font-bold text-sm text-obsidian font-display">{confirmedHotel.name}</h4>
                                    {confirmedHotel.notes && (
                                      <p className="text-[11px] text-obsidian/60 mt-0.5">{confirmedHotel.notes}</p>
                                    )}
                                  </div>
                                ) : (
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-600">
                                      <Shield className="w-3.5 h-3.5" /> Partner hotel coming soon
                                    </div>
                                    <p className="text-[11px] text-obsidian/55 italic">Accommodation details for {day.stopName} are currently being finalized. Rest assured that all partners conform to our strict safety audits.</p>
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-1.5">
                                {day.activities?.map((act: string) => (
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
                  );
                })}
              </div>
            </div>

            {/* Inclusions and Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-cream rounded-3xl p-6 border border-obsidian/5 shadow-sm space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#00A676] font-display flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Inclusions
                </h3>
                <ul className="space-y-2">
                  {activeTemplate?.included?.map((item: string, i: number) => (
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
                  {activeTemplate?.excluded?.map((item: string, i: number) => (
                    <li key={i} className="text-xs text-obsidian/70 flex items-start gap-2 leading-relaxed">
                      <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            
            <div className="bg-cream rounded-3xl border border-obsidian/5 shadow-lg p-6 md:p-8 space-y-6">
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] uppercase font-bold text-obsidian/40 block">Trip Price</span>
                <div>
                  <span className="text-2xl font-extrabold text-secondary font-display">{formatCurrency(activeTemplate?.price || 0)}</span>
                  <span className="text-[10px] text-obsidian/50">/ person</span>
                </div>
              </div>

              {bookingInquirySubmitted ? (
                <div className="bg-[#00c98e]/10 border border-[#00c98e]/35 text-[#00c98e] text-xs p-4 rounded-2xl text-center font-medium leading-relaxed">
                  🌟 Inquiry Sent! Our Kashmir tour specialist is finalizing your itinerary and will connect shortly.
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
                We guarantee local rescue dispatch, emergency satellite channels, and a 100% refund policy if mountain safety agencies warn against activity.
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

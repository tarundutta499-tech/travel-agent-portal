'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Compass, MapPin, Calendar, Users, Heart, Star, ShieldCheck, 
  Map, MessageSquare, Award, Navigation, Menu, X, ArrowRight, 
  Phone, Mail, CheckCircle2, ChevronLeft, ChevronRight, Play,
  Send, Sparkles, Clock
} from 'lucide-react';
import Link from 'next/link';
import { mockPackages, mockDestinations } from '@/lib/mock-data';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

const testimonials = [
  {
    id: 1,
    name: '[REAL_TESTIMONIAL_1_NAME]',
    location: '[REAL_TESTIMONIAL_1_LOCATION]',
    quote: '[REAL_TESTIMONIAL_1_QUOTE - e.g. "The Gulmarg ski runs were incredible. Our guide checked avalanche reports hourly..."]',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder1'
  },
  {
    id: 2,
    name: '[REAL_TESTIMONIAL_2_NAME]',
    location: '[REAL_TESTIMONIAL_2_LOCATION]',
    quote: '[REAL_TESTIMONIAL_2_QUOTE - e.g. "Staying in the cedar houseboat on Dal Lake was magical. Waking up to the sunrise floating market..."]',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder2'
  },
  {
    id: 3,
    name: '[REAL_TESTIMONIAL_3_NAME]',
    location: '[REAL_TESTIMONIAL_3_LOCATION]',
    quote: '[REAL_TESTIMONIAL_3_QUOTE - e.g. "The Gurez border caravan was beautiful. Hiking near Habba Khatoon Peak..."]',
    rating: 5,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder3'
  }
];

const categories = [
  { name: 'Skiing', icon: Award, count: 2, bg: 'from-[#FF5A36]/10 to-[#FF5A36]/5' },
  { name: 'Trekking', icon: Compass, count: 4, bg: 'from-[#0F5C66]/10 to-[#0F5C66]/5' },
  { name: 'Cultural', icon: Sparkles, count: 3, bg: 'from-amber-500/10 to-amber-500/5' },
  { name: 'Wildlife', icon: Map, count: 1, bg: 'from-purple-500/10 to-purple-500/5' },
  { name: 'Road Trips', icon: MapPin, count: 3, bg: 'from-emerald-500/10 to-emerald-500/5' },
  { name: 'Diving', icon: ShieldCheck, count: 1, bg: 'from-blue-500/10 to-blue-500/5' }
];

export default function HomePage() {
  const [packages, setPackages] = useState(mockPackages);

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.packages) {
          setPackages(data.packages);
        }
      })
      .catch(err => console.error('Error fetching dynamic packages:', err));
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [savedPackages, setSavedPackages] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState({ destination: '', dates: '', guests: '2' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const toggleSavePackage = (id: string) => {
    setSavedPackages(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const nextTestimonial = () => {
    setActiveTestimonial(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Itinerary Form State
  const [itineraryForm, setItineraryForm] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    date: '',
    guests: '2',
    notes: '',
    website_confirm: '' // Honeypot
  });
  const [itineraryLoading, setItineraryLoading] = useState(false);
  const [itinerarySuccess, setItinerarySuccess] = useState<string | null>(null);
  const [itineraryError, setItineraryError] = useState<string | null>(null);

  // Partner Form State
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    partnershipType: 'Certified Guide',
    message: '',
    website_confirm: '' // Honeypot
  });
  const [partnerLoading, setPartnerLoading] = useState(false);
  const [partnerSuccess, setPartnerSuccess] = useState<string | null>(null);
  const [partnerError, setPartnerError] = useState<string | null>(null);

  const handleItinerarySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setItineraryLoading(true);
    setItineraryError(null);
    setItinerarySuccess(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itineraryForm),
      });
      const data = await res.json();
      if (data.success) {
        setItinerarySuccess(data.message);
        setItineraryForm({
          name: '',
          email: '',
          phone: '',
          destination: '',
          date: '',
          guests: '2',
          notes: '',
          website_confirm: ''
        });
      } else {
        setItineraryError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setItineraryError('Network error. Please check your connection and try again.');
    } finally {
      setItineraryLoading(false);
    }
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerLoading(true);
    setPartnerError(null);
    setPartnerSuccess(null);

    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partnerForm),
      });
      const data = await res.json();
      if (data.success) {
        setPartnerSuccess(data.message);
        setPartnerForm({
          name: '',
          email: '',
          phone: '',
          companyName: '',
          partnershipType: 'Certified Guide',
          message: '',
          website_confirm: ''
        });
      } else {
        setPartnerError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setPartnerError('Network error. Please check your connection and try again.');
    } finally {
      setPartnerLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand text-obsidian flex flex-col font-sans antialiased">
      
      {/* ─── HEADER / NAVIGATION ─── */}
      <header className="sticky top-0 z-50 bg-sand/80 backdrop-blur-md border-b border-obsidian/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md shadow-primary/20">
              <Compass className="text-cream w-5 h-5 -rotate-45" />
            </div>
            <span className="text-xl font-bold tracking-tight text-obsidian font-display">Wandertribe</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/packages" className="text-sm font-semibold text-obsidian/70 hover:text-primary transition-colors">Explore Trips</Link>
            <Link href="/destinations" className="text-sm font-semibold text-obsidian/70 hover:text-primary transition-colors">Destinations</Link>
            <Link href="#why-us" className="text-sm font-semibold text-obsidian/70 hover:text-primary transition-colors">Why Wandertribe</Link>
            <Link href="#testimonials" className="text-sm font-semibold text-obsidian/70 hover:text-primary transition-colors">Stories</Link>
          </nav>

          {/* Header Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/account" className="text-sm font-semibold text-obsidian/70 hover:text-primary transition-colors px-3 py-2">Account</Link>
            <Button variant="primary" size="sm">Book Kashmir Adventure</Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl text-obsidian hover:bg-obsidian/5 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 max-w-full bg-sand z-50 p-6 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold font-display text-obsidian">Navigation</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-obsidian/5 text-obsidian/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <Link href="/packages" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold font-display text-obsidian/80 hover:text-primary py-2 border-b border-obsidian/5">Explore Trips</Link>
                <Link href="/destinations" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold font-display text-obsidian/80 hover:text-primary py-2 border-b border-obsidian/5">Destinations</Link>
                <Link href="#why-us" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold font-display text-obsidian/80 hover:text-primary py-2 border-b border-obsidian/5">Why Wandertribe</Link>
                <Link href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold font-display text-obsidian/80 hover:text-primary py-2 border-b border-obsidian/5">Stories</Link>
              </div>

              <div className="space-y-4 pt-6 border-t border-obsidian/10">
                <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="block text-center text-sm font-bold text-obsidian/70 py-3 rounded-2xl hover:bg-obsidian/5">
                  My Profile
                </Link>
                <Button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full justify-center"
                >
                  Book Kashmir Adventure
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── HERO SECTION ─── */}
      <section className="relative bg-obsidian text-cream min-h-[85vh] flex flex-col justify-center py-20 overflow-hidden">
        {/* Parallax Hero Image Cover */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-45 select-none pointer-events-none scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600')" }}
        />
        {/* Deep Overlay Grid */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/50 to-obsidian/90" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest text-[#00c98e] bg-[#00c98e]/10 border border-[#00c98e]/20 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Kashmir-Exclusive Adventures
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight font-display text-cream leading-[1.05]">
              Explore Kashmir <br /> Like Never Before.
            </h1>
            <p className="text-base md:text-xl text-sand/80 max-w-2xl mx-auto font-light leading-relaxed">
              Ditch the generic sightseeing buses. Book high-energy backcountry skiing in Gulmarg, raw glacial treks in Sonamarg, and offroad borderland caravans in Gurez.
            </p>
          </motion.div>

          {/* Search bar overlaid on Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-cream/10 backdrop-blur-xl p-3 rounded-2xl md:rounded-full border border-cream/10 shadow-2xl flex flex-col md:flex-row items-center gap-2"
          >
            <div className="w-full flex-1 flex items-center gap-3 px-4 py-2.5 border-b md:border-b-0 md:border-r border-cream/10">
              <MapPin className="w-5 h-5 text-[#FF856B]" />
              <select 
                value={searchParams.destination}
                onChange={e => setSearchParams({ ...searchParams, destination: e.target.value })}
                className="w-full bg-transparent border-none outline-none text-sm text-cream cursor-pointer focus:text-obsidian"
              >
                <option value="" className="text-obsidian">All Kashmir Locations</option>
                <option value="Gulmarg" className="text-obsidian">Gulmarg</option>
                <option value="Srinagar" className="text-obsidian">Srinagar</option>
                <option value="Sonamarg" className="text-obsidian">Sonamarg</option>
                <option value="Pahalgam" className="text-obsidian">Pahalgam</option>
                <option value="Gurez Valley" className="text-obsidian">Gurez Valley</option>
              </select>
            </div>
            
            <div className="w-full md:w-52 flex items-center gap-3 px-4 py-2.5 border-b md:border-b-0 md:border-r border-cream/10">
              <Calendar className="w-5 h-5 text-[#1D8A99]" />
              <input 
                type="date" 
                value={searchParams.dates}
                onChange={e => setSearchParams({ ...searchParams, dates: e.target.value })}
                className="w-full bg-transparent border-none outline-none text-sm text-cream cursor-pointer focus:text-obsidian"
              />
            </div>

            <div className="w-full md:w-44 flex items-center gap-3 px-4 py-2.5">
              <Users className="w-5 h-5 text-amber-400" />
              <select 
                value={searchParams.guests}
                onChange={e => setSearchParams({ ...searchParams, guests: e.target.value })}
                className="w-full bg-transparent border-none outline-none text-sm text-cream cursor-pointer focus:text-obsidian"
              >
                <option value="1">1 Explorer</option>
                <option value="2">2 Explorers</option>
                <option value="4">4 Explorers</option>
                <option value="5+">5+ Group</option>
              </select>
            </div>

            <Button 
              className="w-full md:w-auto px-8 py-3 rounded-xl md:rounded-full whitespace-nowrap"
            >
              Search Kashmir Trips
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="bg-cream border-y border-obsidian/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Trust stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-16 w-full md:w-auto">
            <div className="text-center md:text-left">
              <span className="text-2xl md:text-3xl font-extrabold font-display text-primary">[REAL_TRAVELERS_COUNT]</span>
              <span className="block text-[10px] uppercase font-bold tracking-wider text-obsidian/50">Happy Explorers</span>
            </div>
            <div className="text-center md:text-left">
              <span className="text-2xl md:text-3xl font-extrabold font-display text-secondary">5 Zones</span>
              <span className="block text-[10px] uppercase font-bold tracking-wider text-obsidian/50">Kashmir Covered</span>
            </div>
            <div className="text-center md:text-left">
              <span className="text-2xl md:text-3xl font-extrabold font-display text-forest">[REAL_AVERAGE_RATING]</span>
              <span className="block text-[10px] uppercase font-bold tracking-wider text-obsidian/50">Average Rating</span>
            </div>
          </div>

          {/* As featured in */}
          <div className="flex items-center gap-6 flex-wrap justify-center opacity-40 grayscale">
            <span className="text-xs font-bold uppercase tracking-widest font-display">[REAL_MEDIA_PARTNERS]</span>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PACKAGES GRID ─── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary text-xs font-bold uppercase tracking-widest block font-display">Kashmir Journeys</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-obsidian font-display leading-tight">
              Featured Expeditions
            </h2>
          </div>
          <Link href="/packages" className="text-sm font-bold text-secondary hover:text-secondary-light flex items-center gap-1">
            See all Kashmir trips <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.slice(0, 4).map(pkg => (
            <Card key={pkg.id} hoverEffect="lift" className="flex flex-col bg-cream group">
              <div className="relative aspect-[4/3] bg-obsidian/5 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button 
                  onClick={() => toggleSavePackage(pkg.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-cream/90 backdrop-blur-md text-primary shadow-sm hover:scale-110 active:scale-95 transition-all"
                >
                  <Heart className={`w-4 h-4 ${savedPackages.includes(pkg.id) ? 'fill-current' : ''}`} />
                </button>
                <div className="absolute bottom-4 left-4 bg-obsidian/80 backdrop-blur-md text-cream px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider">
                  {pkg.difficulty}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-obsidian/50 font-medium">
                    <span className="flex items-center gap-0.5"><Clock className="w-3.5 h-3.5 text-secondary" /> {pkg.duration}</span>
                    <span>·</span>
                    <span className="flex items-center gap-0.5"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {pkg.rating}</span>
                  </div>
                  <h3 className="font-bold text-base text-obsidian font-display group-hover:text-primary transition-colors leading-tight">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-obsidian/60 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary" /> {pkg.destination}, Kashmir
                  </p>
                </div>

                <div className="pt-3 border-t border-obsidian/5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-obsidian/40 block">From</span>
                    <span className="text-base font-extrabold text-secondary font-display">{formatCurrency(pkg.price)}</span>
                  </div>
                  <Link href={`/packages/${pkg.slug}`}>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ─── PLAN YOUR ITINERARY SECTION ─── */}
      <section id="plan-itinerary" className="py-20 bg-cream border-t border-obsidian/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-primary text-xs font-bold uppercase tracking-widest block font-display">Custom Experience</span>
            <h2 className="text-3xl font-extrabold text-obsidian font-display leading-tight">
              Plan Your Dream Kashmir Itinerary
            </h2>
            <p className="text-xs text-obsidian/60 font-light leading-relaxed">
              Tell us where you want to travel, and our specialist travel advisors will construct a custom itinerary, negotiate local operator rates, and deliver a clean digital PDF quote.
            </p>
          </div>

          <Card className="p-6 md:p-10 bg-white border border-obsidian/10 shadow-lg rounded-3xl">
            {itinerarySuccess ? (
              <div className="p-6 bg-[#00c98e]/10 border border-[#00c98e]/35 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#00c98e] mx-auto animate-bounce" />
                <h3 className="font-bold text-base text-obsidian font-display">Request Received!</h3>
                <p className="text-xs text-obsidian/75 leading-relaxed max-w-md mx-auto">{itinerarySuccess}</p>
              </div>
            ) : (
              <form onSubmit={handleItinerarySubmit} className="space-y-6">
                
                {/* Honeypot Spam Protection Field - Hidden from users */}
                <input 
                  type="text" 
                  name="website_confirm"
                  value={itineraryForm.website_confirm}
                  onChange={e => setItineraryForm({ ...itineraryForm, website_confirm: e.target.value })}
                  className="hidden" 
                  tabIndex={-1} 
                  autoComplete="off" 
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter full name"
                      value={itineraryForm.name}
                      onChange={e => setItineraryForm({ ...itineraryForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="email@example.com"
                      value={itineraryForm.email}
                      onChange={e => setItineraryForm({ ...itineraryForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. +91 98765 43210"
                      value={itineraryForm.phone}
                      onChange={e => setItineraryForm({ ...itineraryForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Destination Zone</label>
                    <select 
                      value={itineraryForm.destination}
                      onChange={e => setItineraryForm({ ...itineraryForm, destination: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary cursor-pointer"
                    >
                      <option value="">Select location...</option>
                      <option value="Gulmarg">Gulmarg</option>
                      <option value="Srinagar">Srinagar</option>
                      <option value="Sonamarg">Sonamarg</option>
                      <option value="Pahalgam">Pahalgam</option>
                      <option value="Gurez Valley">Gurez Valley</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Preferred Date</label>
                    <input 
                      type="date" 
                      value={itineraryForm.date}
                      onChange={e => setItineraryForm({ ...itineraryForm, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Itinerary Details / Notes</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us what you want to experience, special physical conditions, guide requirements..."
                    value={itineraryForm.notes}
                    onChange={e => setItineraryForm({ ...itineraryForm, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary resize-none"
                  />
                </div>

                {itineraryError && (
                  <div className="text-xs text-red-500 font-medium">
                    ⚠️ {itineraryError}
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={itineraryLoading}
                  className="w-full justify-center py-3"
                >
                  {itineraryLoading ? 'Sending Itinerary Request...' : 'Send Itinerary Request'}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* ─── BROWSE BY CATEGORY ─── */}
      <section className="py-20 bg-cream/50 border-y border-obsidian/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-secondary text-xs font-bold uppercase tracking-widest block font-display">Experience Hub</span>
            <h2 className="text-3xl font-extrabold text-obsidian font-display leading-tight">
              Browse by Adventure Category
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <Card 
                  key={cat.name} 
                  hoverEffect="tilt" 
                  className="flex flex-col items-center justify-center p-6 text-center cursor-pointer bg-cream border border-obsidian/5 hover:border-primary/20"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${cat.bg} flex items-center justify-center mb-4`}>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-sm text-obsidian font-display">{cat.name}</h3>
                  <p className="text-[10px] text-obsidian/40 uppercase tracking-wider font-semibold mt-1">
                    {cat.count} Trips
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── WHY WANDERTRIBE (VALUE PROPS & FOUNDER CREDENTIALS) ─── */}
      <section id="why-us" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-primary text-xs font-bold uppercase tracking-widest block font-display">Founder Credibility</span>
          <h2 className="text-3xl font-extrabold text-obsidian font-display leading-tight">
            Built on Operational Excellence
          </h2>
          <p className="text-xs text-obsidian/60 font-light max-w-md mx-auto leading-relaxed">
            By applying rigorous corporate management frameworks to local travel logistics, we ensure your high-altitude treks are safe, punctual, and reliable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: "Six Sigma Operational Precision",
              desc: "We utilize Six Sigma quality control methodologies to eliminate booking overlap, coordinate transportation timings, and vet alpine equipment safety."
            },
            {
              title: "ITIL Service Quality",
              desc: "Our customer response systems are built on ITIL service management frameworks to guarantee 24/7 support reliability and rapid incident management."
            },
            {
              title: "Verified Local Guides",
              desc: "Every ski and trek expedition is led by native Kashmiri guides who are certified mountaineers and trained in wilderness first response."
            },
            {
              title: "Direct Supplier Margin",
              desc: "We work directly with homeboat owners, guides, and horsemen in the valleys, guaranteeing complete fee transparency without middleman markups."
            }
          ].map((vp, i) => (
            <Card key={i} className="p-6 space-y-4 bg-cream border-obsidian/5 hover:border-secondary/20 shadow-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-secondary to-primary/10 flex items-center justify-center text-secondary">
                  <CheckCircle2 className="w-5 h-5 text-cream" />
                </div>
                <h3 className="font-bold text-sm text-obsidian font-display">{vp.title}</h3>
                <p className="text-xs text-obsidian/60 leading-relaxed font-light">{vp.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ─── TESTIMONIAL CAROUSEL ─── */}
      <section id="testimonials" className="py-20 bg-obsidian text-cream overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/15 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-primary text-xs font-bold uppercase tracking-widest block font-display">Traveler Stories</span>
            <h2 className="text-3xl font-extrabold text-cream font-display leading-tight">
              Reviewed by the Tribe
            </h2>
          </div>

          <div className="relative bg-cream/5 border border-cream/10 p-8 md:p-12 rounded-3xl backdrop-blur-md">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="flex text-amber-400">
                {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <blockquote className="text-base md:text-xl font-light leading-relaxed italic text-sand">
                &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <img 
                  src={testimonials[activeTestimonial].avatar} 
                  alt={testimonials[activeTestimonial].name} 
                  className="w-10 h-10 rounded-full border border-cream/20 bg-cream/10"
                />
                <div className="text-left">
                  <p className="font-bold text-sm text-cream font-display leading-none">{testimonials[activeTestimonial].name}</p>
                  <p className="text-xs text-sand/50 mt-1">{testimonials[activeTestimonial].location}</p>
                </div>
              </div>
            </div>

            {/* Carousel navigation controls */}
            <div className="flex justify-center gap-2 mt-8">
              <button 
                onClick={prevTestimonial}
                className="p-2 rounded-xl bg-cream/5 hover:bg-cream/10 border border-cream/10 hover:text-primary transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="p-2 rounded-xl bg-cream/5 hover:bg-cream/10 border border-cream/10 hover:text-primary transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER SIGNUP ─── */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-tr from-secondary to-[#0C4E57] rounded-3xl p-8 md:p-12 text-center text-cream relative overflow-hidden shadow-2xl border border-cream/10">
          <div className="absolute -top-10 -left-10 w-44 h-44 bg-primary/20 rounded-full blur-[40px] pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <span className="text-primary text-xs font-bold uppercase tracking-widest block font-display">Special Offers</span>
            <h2 className="text-3xl font-extrabold text-cream font-display leading-tight">
              Get 10% Off Your First Trip
            </h2>
            <p className="text-sm text-sand/80 max-w-md mx-auto leading-relaxed font-light">
              Join the Wandertribe list. Get weekly Kashmir snow alerts, offroad maps, and a 10% voucher code directly in your inbox.
            </p>

            {newsletterSubscribed ? (
              <div className="max-w-md mx-auto p-4 bg-[#00c98e]/10 border border-[#00c98e]/35 rounded-2xl text-xs font-medium text-cream flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00c98e]" /> Voucher sent! Check your inbox for your 10% code.
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setNewsletterSubscribed(true); }} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded-2xl bg-cream/10 border border-cream/20 text-sm text-cream placeholder-sand/50 focus:bg-cream/20 focus:border-primary outline-none"
                  required 
                />
                <Button 
                  type="submit"
                  variant="primary"
                  className="px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-1.5"
                >
                  Join Tribe <Send className="w-4 h-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── B2B PARTNER NETWORK INVITATION ─── */}
      <section id="partners" className="py-20 bg-cream/35 border-t border-obsidian/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-secondary text-xs font-bold uppercase tracking-widest block font-display">B2B Partnerships</span>
            <h2 className="text-3xl font-extrabold text-obsidian font-display leading-tight">
              Partner with Wandertribe
            </h2>
            <p className="text-xs text-obsidian/60 font-light leading-relaxed">
              Are you a local Kashmiri guesthouse owner, houseboat operator, transport provider, or certified alpine guide? Apply to join our network. We work directly with local operators to build sustainable border tourism.
            </p>
          </div>

          <Card className="p-6 md:p-10 bg-white border border-obsidian/10 shadow-lg rounded-3xl">
            {partnerSuccess ? (
              <div className="p-6 bg-[#00c98e]/10 border border-[#00c98e]/35 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#00c98e] mx-auto animate-bounce" />
                <h3 className="font-bold text-base text-obsidian font-display">Application Submitted!</h3>
                <p className="text-xs text-obsidian/75 leading-relaxed max-w-md mx-auto">{partnerSuccess}</p>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-6">
                
                {/* Honeypot Spam Protection Field - Hidden from users */}
                <input 
                  type="text" 
                  name="website_confirm"
                  value={partnerForm.website_confirm}
                  onChange={e => setPartnerForm({ ...partnerForm, website_confirm: e.target.value })}
                  className="hidden" 
                  tabIndex={-1} 
                  autoComplete="off" 
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Contact Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter contact person name"
                      value={partnerForm.name}
                      onChange={e => setPartnerForm({ ...partnerForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Business Email</label>
                    <input 
                      type="email" 
                      placeholder="partner@company.com"
                      value={partnerForm.email}
                      onChange={e => setPartnerForm({ ...partnerForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                      required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g. +91 98765 43210"
                      value={partnerForm.phone}
                      onChange={e => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Company / Houseboat Name</label>
                    <input 
                      type="text" 
                      placeholder="Optional"
                      value={partnerForm.companyName}
                      onChange={e => setPartnerForm({ ...partnerForm, companyName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Partnership Type</label>
                    <select 
                      value={partnerForm.partnershipType}
                      onChange={e => setPartnerForm({ ...partnerForm, partnershipType: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary cursor-pointer"
                    >
                      <option value="Certified Guide">Certified Alpine Guide</option>
                      <option value="Houseboat Owner">Houseboat Owner</option>
                      <option value="Transport Partner">Local Transport Partner</option>
                      <option value="Guesthouse Owner">Guesthouse / Homestay Owner</option>
                      <option value="Other">DMC / Operator Partner</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-obsidian/50 uppercase tracking-wider mb-1">Brief Description of Services / Message</label>
                  <textarea 
                    rows={3}
                    placeholder="Tell us about your inventory, fleet size, guiding history, or general query..."
                    value={partnerForm.message}
                    onChange={e => setPartnerForm({ ...partnerForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-sand/30 border border-obsidian/10 text-xs text-obsidian rounded-xl outline-none focus:bg-white focus:border-primary resize-none"
                  />
                </div>

                {partnerError && (
                  <div className="text-xs text-red-500 font-medium">
                    ⚠️ {partnerError}
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={partnerLoading}
                  className="w-full justify-center py-3"
                >
                  {partnerLoading ? 'Submitting Application...' : 'Apply to Partner Network'}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-obsidian text-sand/60 py-16 border-t border-cream/5 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                <Compass className="text-cream w-4 h-4 -rotate-45" />
              </div>
              <span className="text-lg font-bold text-cream font-display">Wandertribe</span>
            </div>
            <p className="leading-relaxed font-light text-sand/40">
              Vibrant, adventure-first travel experiences curated for the independent explorer.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-cream uppercase tracking-wider mb-4 font-display">Popular Adventures</h4>
            <ul className="space-y-2">
              <li><Link href="/packages/gulmarg-ski-expedition" className="hover:text-cream transition-colors">Gulmarg Ski Expedition</Link></li>
              <li><Link href="/packages/sonamarg-glacier-trek" className="hover:text-cream transition-colors">Sonamarg Glacier Trek</Link></li>
              <li><Link href="/packages/dal-lake-houseboat-retreat" className="hover:text-cream transition-colors">Dal Lake Houseboat Retreat</Link></li>
              <li><Link href="/packages/pahalgam-aru-valley-trail" className="hover:text-cream transition-colors">Pahalgam Aru Valley Trail</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-cream uppercase tracking-wider mb-4 font-display">Wandertribe</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-cream transition-colors">About our Story</Link></li>
              <li><Link href="/faq" className="hover:text-cream transition-colors">Support &amp; FAQ</Link></li>
              <li><Link href="/careers" className="hover:text-cream transition-colors">Careers (We are hiring!)</Link></li>
              <li><Link href="/guides" className="hover:text-cream transition-colors">Travel Guides &amp; Blog</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-cream uppercase tracking-wider mb-4 font-display">Download the Tribe App</h4>
            <div className="flex gap-2">
              <div className="px-3 py-2 bg-cream/10 border border-cream/20 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-cream/20 transition-all">
                <Play className="w-4 h-4 text-primary fill-current" />
                <div>
                  <span className="text-[8px] block leading-none opacity-50">GET IT ON</span>
                  <span className="text-[10px] font-bold block mt-0.5 leading-none">Google Play</span>
                </div>
              </div>
              <div className="px-3 py-2 bg-cream/10 border border-cream/20 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-cream/20 transition-all">
                <Compass className="w-4 h-4 text-secondary fill-current" />
                <div>
                  <span className="text-[8px] block leading-none opacity-50">DOWNLOAD ON THE</span>
                  <span className="text-[10px] font-bold block mt-0.5 leading-none">App Store</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-cream/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sand/40">
          <p>© 2026 Wandertribe Adventure Platforms. All rights reserved. | GSTIN: [REAL_GSTIN]</p>
          <div className="flex gap-4 font-semibold">
            <Link href="/privacy" className="hover:text-cream transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cream transition-colors">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-cream transition-colors">Cancellation &amp; Refunds</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

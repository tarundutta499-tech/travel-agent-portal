'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, Search, Compass, Star, MapPin, Calendar, Clock, 
  Users, CheckCircle2, ChevronRight, Menu, X, ArrowRight, 
  Phone, Mail, Shield, User, Globe, Award, Sparkles, MessageSquare 
} from 'lucide-react';
import Link from 'next/link';
import { mockPackages, mockHotels } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchDest, setSearchDest] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  
  // Form state
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    date: '',
    guests: '2',
    notes: ''
  });

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryModalOpen(false);
      setInquiryForm({ name: '', email: '', phone: '', destination: '', date: '', guests: '2', notes: '' });
    }, 3000);
  };

  // Only show published packages on public site
  const publicPackages = mockPackages.filter(p => p.status === 'published');

  // Filter packages based on on-page search inputs
  const filteredPackages = publicPackages.filter(p => {
    const matchDest = p.name.toLowerCase().includes(searchDest.toLowerCase()) || 
                      p.destinations.some(d => d.name.toLowerCase().includes(searchDest.toLowerCase()));
    const matchCat = searchCategory === 'all' || p.category === searchCategory;
    return matchDest && matchCat;
  });

  const categories = [
    { value: 'all', label: 'All Experiences' },
    { value: 'luxury', label: 'Luxury Stays' },
    { value: 'honeymoon', label: 'Honeymoon Escapes' },
    { value: 'adventure', label: 'Adventure Treks' },
    { value: 'group', label: 'Group Tours' },
    { value: 'family', label: 'Family Getaways' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-[#0F4C81]/20 selection:text-[#0F4C81]">
      
      {/* ─── PUBLIC HEADER ─── */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-100 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0F4C81] to-[#00A676] flex items-center justify-center shadow-md shadow-[#0F4C81]/10">
              <Plane className="text-white w-5 h-5 -rotate-45" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-950 font-poppins block leading-none">Voyage Luxe</span>
              <span className="text-[10px] text-slate-500 font-medium tracking-widest uppercase mt-1 block">Travel Advisory</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#experiences" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">Experiences</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">Why Choose Us</a>
            <a href="#partners" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">Partner Program</a>
            <a href="#contact" className="text-sm font-medium text-slate-600 hover:text-[#0F4C81] transition-colors">Contact</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-semibold text-slate-600 hover:text-[#0F4C81] transition-colors px-4 py-2"
            >
              Consultant Portal
            </Link>
            <button 
              onClick={() => setInquiryModalOpen(true)}
              className="bg-[#0F4C81] hover:bg-[#1a6ab5] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#0F4C81]/15 active:scale-95"
            >
              Request Custom Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Menu className="w-6 h-6" />
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
              className="fixed right-0 top-0 bottom-0 w-80 max-w-full bg-white z-50 p-6 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold font-poppins text-slate-900">Navigation</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-5 flex-1">
                <a href="#experiences" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-700 hover:text-[#0F4C81] py-2 transition-colors border-b border-slate-50">Experiences</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-700 hover:text-[#0F4C81] py-2 transition-colors border-b border-slate-50">Why Choose Us</a>
                <a href="#partners" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-700 hover:text-[#0F4C81] py-2 transition-colors border-b border-slate-50">Partner Program</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-slate-700 hover:text-[#0F4C81] py-2 transition-colors border-b border-slate-50">Contact</a>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-100">
                <Link 
                  href="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center text-sm font-semibold text-slate-700 hover:bg-slate-50 py-3 rounded-xl transition-all"
                >
                  Consultant Portal
                </Link>
                <button 
                  onClick={() => { setMobileMenuOpen(false); setInquiryModalOpen(true); }}
                  className="w-full bg-[#0F4C81] hover:bg-[#1a6ab5] text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-md shadow-[#0F4C81]/10"
                >
                  Request Custom Quote
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── LUXURY HERO SECTION ─── */}
      <section className="relative bg-slate-950 text-white py-24 md:py-36 overflow-hidden flex flex-col justify-center">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-30 select-none pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600')" }} />
        {/* Color overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#00A676] uppercase tracking-widest text-xs font-bold font-poppins px-3 py-1.5 rounded-full bg-[#00A676]/10 border border-[#00A676]/20 inline-flex items-center gap-1.5 mb-6">
              <Sparkles className="w-3 h-3" /> Bespoke Curated Itineraries
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-poppins text-white leading-[1.1] mb-6">
              Journeys Crafted For The <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c98e] via-[#60a5fa] to-[#1a6ab5]">
                Discerning Explorer
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              As travel consultants, we partner with the world&apos;s finest boutique properties, local tour partners, and luxury suppliers to curate unique, worry-free journeys.
            </p>
          </motion.div>

          {/* Interactive Search Bar Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl p-3 rounded-2xl md:rounded-full shadow-2xl border border-white/10 flex flex-col md:flex-row items-center gap-2"
          >
            <div className="w-full flex-1 flex items-center gap-2 px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
              <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <input 
                type="text" 
                placeholder="Search by destination (e.g. Udaipur, Maldives...)"
                value={searchDest}
                onChange={e => setSearchDest(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-white placeholder-slate-400"
              />
            </div>

            <div className="w-full md:w-56 flex items-center gap-2 px-4 py-2 border-b md:border-b-0 md:border-r border-white/10">
              <Compass className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <select 
                value={searchCategory}
                onChange={e => setSearchCategory(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-white focus:text-slate-900 cursor-pointer"
              >
                {categories.map(c => (
                  <option key={c.value} value={c.value} className="text-slate-900">{c.label}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => {
                const el = document.getElementById('experiences');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full md:w-auto bg-[#00A676] hover:bg-[#00c98e] text-white font-semibold text-sm px-8 py-3 rounded-xl md:rounded-full transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Explore Packages <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US / VALUE PROPOSITION ─── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#0F4C81] text-xs font-bold uppercase tracking-widest block mb-2 font-poppins">Our Value</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-poppins">
              The Consultant Difference
            </h2>
            <div className="w-12 h-1 bg-[#0F4C81] mx-auto mt-4 rounded-full" />
            <p className="text-slate-600 mt-6 leading-relaxed">
              We aren&apos;t a cold booking search engine. We work side-by-side with local operators, verified hoteliers, and package partners to secure the absolute best amenities, luxury upgrades, and safety guarantees for your trip.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Curated Boutique Partners",
                desc: "We vet hotels, guides, and activity partners personally. Only top-tier properties (like The Leela Palace, Taj, & luxury overwater resorts) make it to our catalog."
              },
              {
                icon: Shield,
                title: "Reseller Markup Transparency",
                desc: "As a consultant, we leverage trade rates with travel partners, passing bulk savings directly down to you while ensuring margin transparency."
              },
              {
                icon: MessageSquare,
                title: "24/7 Personalized Concierge",
                desc: "Get direct phone and WhatsApp support from a dedicated travel consultant before, during, and after your trip. No wait-times or robots."
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-8 rounded-2xl border border-slate-100 hover:border-slate-200 bg-[#F8FAFC]/50 hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#0F4C81]/5 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#0F4C81]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 font-poppins">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED EXPERIENCES ─── */}
      <section id="experiences" className="py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[#0F4C81] text-xs font-bold uppercase tracking-widest block mb-2 font-poppins">Curated Catalog</span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-poppins">Featured Experiences</h2>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2">
              {categories.map(c => (
                <button
                  key={c.value}
                  onClick={() => setSearchCategory(c.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    searchCategory === c.value 
                      ? 'bg-[#0F4C81] text-white shadow-md shadow-[#0F4C81]/15' 
                      : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <motion.div 
                key={pkg.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200/80 hover:shadow-2xl hover:shadow-slate-100 group transition-all duration-300 flex flex-col"
              >
                {/* Cover Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img 
                    src={pkg.coverImage || 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800'} 
                    alt={pkg.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0F4C81]">
                    {pkg.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-slate-900/85 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00c98e]" /> {pkg.durationDays} Days / {pkg.durationNights} Nights
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 ml-1">Verified Partners</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-950 font-poppins group-hover:text-[#0F4C81] transition-colors leading-tight mb-2">
                      {pkg.name}
                    </h3>
                    
                    <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4">
                      {pkg.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {pkg.destinations.map(d => (
                        <span key={d.id} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-slate-600 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5 text-[#0F4C81]" /> {d.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Starting From</span>
                      <span className="text-xl font-bold font-poppins text-[#0F4C81]">{formatCurrency(pkg.sellingPrice)}</span>
                      <span className="text-[10px] text-slate-500 block">per traveler</span>
                    </div>

                    <Link 
                      href={`/packages/${pkg.slug}`}
                      className="bg-slate-100 hover:bg-[#0F4C81] text-slate-700 hover:text-white px-4 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 flex items-center gap-1 group-hover:shadow-lg group-hover:shadow-[#0F4C81]/10"
                    >
                      View Details <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredPackages.length === 0 && (
              <div className="col-span-full py-16 bg-white rounded-2xl border border-slate-100 text-center">
                <Compass className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-base font-bold text-slate-900 font-poppins">No experiences found</h3>
                <p className="text-slate-500 text-xs mt-1">Try resetting your experience filter or editing your destination search.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── DUAL PARTNER INVITATION SECTION (ATTRACT PARTNERS) ─── */}
      <section id="partners" className="py-24 bg-gradient-to-tr from-slate-950 via-slate-900 to-[#0F4C81] text-white relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00A676]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F4C81]/25 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-[#00c98e] text-xs font-bold uppercase tracking-widest block font-poppins">B2B Travel Partnership</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-poppins text-white leading-tight">
                Are You a Travel Supplier, DMC, or Hotel Partner?
              </h2>
              <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
                We act as specialized consultants matching high-net-worth clients, corporate traveler groups, and luxury seekers to selected destinations. List your properties, packages, and local tours on our marketplace.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  {
                    title: "Access HNW Clients",
                    desc: "Skip marketing costs. We present your packages directly to verified premium travelers and corporate entities."
                  },
                  {
                    title: "Unified Agent Portal",
                    desc: "Manage package pricing, itinerary drafts, active deals, and sales analytics through our state-of-the-art console."
                  },
                  {
                    title: "Instant Commission Flow",
                    desc: "Transparent B2B margins and secure escrow/bank guarantees on every consult-matched booking."
                  },
                  {
                    title: "Joint Itinerary Building",
                    desc: "Co-build and draft customized trips inside the platform using our real-time approval pipelines."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#00c98e] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white font-poppins text-sm">{item.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
              <h3 className="text-xl font-bold font-poppins text-white">Partner Program Pitch</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Submit your contact details and company type (DMC, Hotelier, Local Agency, Transport). A Voyage Luxe consultant will schedule a virtual call to integrate your inventory and show you how to leverage our agent portal.
              </p>

              <form className="space-y-4" onSubmit={e => { e.preventDefault(); setInquirySubmitted(true); setTimeout(() => setInquirySubmitted(false), 2000); }}>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">Company Name</label>
                  <input type="text" placeholder="e.g. Royal Travels DMC" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-xs focus:bg-white/10 focus:border-[#00c98e] outline-none" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">Contact Person</label>
                    <input type="text" placeholder="Your Name" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-xs focus:bg-white/10 focus:border-[#00c98e] outline-none" required />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">Partnership Type</label>
                    <select className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:bg-white/10 focus:border-[#00c98e] outline-none cursor-pointer">
                      <option>DMC / Local Operator</option>
                      <option>Boutique Hotel / Resort</option>
                      <option>Transport / Cruise Partner</option>
                      <option>Tour / Guide Association</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">Corporate Email</label>
                  <input type="email" placeholder="partner@yourcompany.com" className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-xs focus:bg-white/10 focus:border-[#00c98e] outline-none" required />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#00A676] hover:bg-[#00c98e] text-white font-semibold text-xs py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-lg shadow-[#00A676]/10"
                >
                  Apply to Partner Network <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* ─── PUBLIC CONSULTATION FORM SECTION ─── */}
      <section id="contact" className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-100 text-center space-y-6">
            <span className="text-[#0F4C81] text-xs font-bold uppercase tracking-widest block font-poppins">Get a Customized Proposal</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-poppins">
              Plan Your Dream Itinerary
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
              Tell us where you want to travel, and our specialist travel advisors will construct a custom itinerary, negotiate local package discounts with partners, and deliver a clean digital PDF quote.
            </p>

            <button 
              onClick={() => setInquiryModalOpen(true)}
              className="bg-[#0F4C81] hover:bg-[#1a6ab5] text-white font-semibold px-8 py-3.5 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-[#0F4C81]/15 inline-flex items-center gap-2"
            >
              Start Travel Consultation Form <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0F4C81] to-[#00A676] flex items-center justify-center">
                <Plane className="text-white w-4 h-4 -rotate-45" />
              </div>
              <span className="text-lg font-bold text-white font-poppins">Voyage Luxe</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Curating high-end bespoke holiday experiences in partnerships with elite local DMCs and premier luxury resorts.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-poppins">Destinations</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#experiences" className="hover:text-white transition-colors">Udaipur, Rajasthan</a></li>
              <li><a href="#experiences" className="hover:text-white transition-colors">Goa Beaches</a></li>
              <li><a href="#experiences" className="hover:text-white transition-colors">Maldives Lagoons</a></li>
              <li><a href="#experiences" className="hover:text-white transition-colors">Manali Peaks</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-poppins">Partners</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#partners" className="hover:text-white transition-colors">List your hotel / stay</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">DMC Agent Program</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">Margin structures</a></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Access Portal</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-poppins">Contact Us</h4>
            <div className="flex items-center gap-2 text-xs">
              <Phone className="w-4 h-4 text-[#00A676]" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Mail className="w-4 h-4 text-[#00A676]" />
              <span>info@voyageluxe.com</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Voyage Luxe Advisory. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <Link href="/login" className="hover:text-[#00A676] font-semibold transition-colors">Partner Dashboard Login</Link>
          </div>
        </div>
      </footer>

      {/* ─── INQUIRY MODAL FORM ─── */}
      <AnimatePresence>
        {inquiryModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative border border-slate-100"
            >
              {/* Close Button */}
              <button 
                onClick={() => setInquiryModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {inquirySubmitted ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#00A676]/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#00A676]" />
                  </div>
                  <h3 className="text-xl font-bold font-poppins text-slate-900">Proposal Requested!</h3>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto">
                    Thank you! A Voyage Luxe advisor has received your request and will coordinate with our local travel partners to send you a customized proposal within 2 hours.
                  </p>
                </div>
              ) : (
                <div className="p-6 md:p-8 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold font-poppins text-slate-950">Travel Consultation</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Let us build a customized travel plan for you.</p>
                  </div>

                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">Your Name</label>
                      <input 
                        type="text" 
                        value={inquiryForm.name} 
                        onChange={e => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        placeholder="John Doe" 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F4C81] outline-none" 
                        required 
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">Email</label>
                        <input 
                          type="email" 
                          value={inquiryForm.email} 
                          onChange={e => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                          placeholder="you@email.com" 
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F4C81] outline-none" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">Phone</label>
                        <input 
                          type="tel" 
                          value={inquiryForm.phone} 
                          onChange={e => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                          placeholder="+91 98765..." 
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F4C81] outline-none" 
                          required 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">Destination</label>
                        <input 
                          type="text" 
                          value={inquiryForm.destination} 
                          onChange={e => setInquiryForm({ ...inquiryForm, destination: e.target.value })}
                          placeholder="e.g. Maldives" 
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F4C81] outline-none" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">Target Travel Date</label>
                        <input 
                          type="date" 
                          value={inquiryForm.date} 
                          onChange={e => setInquiryForm({ ...inquiryForm, date: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-950 focus:bg-white focus:border-[#0F4C81] outline-none cursor-pointer" 
                          required 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">Special Preferences / Custom Notes</label>
                      <textarea 
                        value={inquiryForm.notes} 
                        onChange={e => setInquiryForm({ ...inquiryForm, notes: e.target.value })}
                        placeholder="e.g. Vegetarian meals, honeymoon villa, private driver guide, standard flight ticket..." 
                        rows={3} 
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-[#0F4C81] outline-none resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#0F4C81] hover:bg-[#1a6ab5] text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-lg shadow-[#0F4C81]/15"
                    >
                      Submit Travel Inquiry <Plane className="w-4 h-4 -rotate-45" />
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

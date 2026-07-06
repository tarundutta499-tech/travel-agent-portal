'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Compass, MapPin, Calendar, Users, Heart, Star, 
  Search, SlidersHorizontal, Map, Clock, ArrowRight, Grid,
  X, Check
} from 'lucide-react';
import Link from 'next/link';
import { mockPackages } from '@/lib/mock-data';
import AdventureMap from '@/components/ui/AdventureMap';

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

export default function PackagesListingPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [mapView, setMapView] = useState<boolean>(false);
  const [savedPackages, setSavedPackages] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [packages, setPackages] = useState(mockPackages);

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.packages) {
          setPackages(data.packages);
        }
      })
      .catch(err => console.error('Error loading database packages:', err));
  }, []);

  const toggleSavePackage = (id: string) => {
    setSavedPackages(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Filter Logic
  const filteredPackages = packages.filter(pkg => {
    const matchSearch = pkg.title.toLowerCase().includes(search.toLowerCase()) || 
                        pkg.destination.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
    const matchDifficulty = selectedDifficulty === 'all' || pkg.difficulty === selectedDifficulty;
    const matchPrice = pkg.price <= maxPrice;
    return matchSearch && matchCategory && matchDifficulty && matchPrice;
  });

  // Sort Logic
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewsCount - a.reviewsCount; // Default: popularity
  });

  const categories = ['all', 'Skiing', 'Trekking', 'Cultural', 'Wildlife', 'Road Trips'];
  const difficulties = ['all', 'Easy', 'Moderate', 'Hard'];

  return (
    <div className="min-h-screen bg-sand text-obsidian flex flex-col font-sans antialiased">
      
      {/* HEADER */}
      <header className="bg-sand border-b border-obsidian/5 py-5 sticky top-0 z-40 backdrop-blur-md bg-sand/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
              <Compass className="text-cream w-4.5 h-4.5 -rotate-45" />
            </div>
            <span className="font-bold text-obsidian font-display text-base">Wandertribe</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="font-semibold text-obsidian/60 hover:text-primary transition-colors">Home</Link>
            <Link href="/destinations" className="font-semibold text-obsidian/60 hover:text-primary transition-colors">Destinations</Link>
          </nav>
        </div>
      </header>

      {/* HERO HERO TITLE */}
      <div className="bg-[#FFFDF9] border-b border-obsidian/5 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-obsidian font-display tracking-tight leading-none">
              Explore Kashmir Trips
            </h1>
            <p className="text-sm text-obsidian/60 mt-2 font-light">
              Showing {sortedPackages.length} curated, safety-checked Kashmir itineraries.
            </p>
          </div>
          
          {/* Map view / Grid view toggle */}
          <div className="flex gap-2">
            <button 
              onClick={() => setMapView(false)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                !mapView ? 'bg-obsidian text-cream' : 'bg-cream text-obsidian border border-obsidian/10'
              }`}
            >
              <Grid className="w-3.5 h-3.5" /> Grid View
            </button>
            <button 
              onClick={() => setMapView(true)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                mapView ? 'bg-obsidian text-cream' : 'bg-cream text-obsidian border border-obsidian/10'
              }`}
            >
              <Map className="w-3.5 h-3.5" /> Map View
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="flex-1 bg-cream rounded-2xl border border-obsidian/10 p-2 flex items-center gap-3 shadow-sm">
            <Search className="w-5 h-5 text-obsidian/40 ml-2" />
            <input 
              type="text" 
              placeholder="Search Kashmir trips, activities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-sm text-obsidian placeholder-obsidian/40"
            />
          </div>

          <div className="bg-cream rounded-2xl border border-obsidian/10 p-2 flex items-center gap-2 shadow-sm min-w-[200px]">
            <MapPin className="w-4 h-4 text-primary ml-1" />
            <select 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-xs font-bold text-obsidian cursor-pointer"
            >
              <option value="">All Locations</option>
              <option value="Gulmarg">Gulmarg</option>
              <option value="Srinagar">Srinagar</option>
              <option value="Sonamarg">Sonamarg</option>
              <option value="Pahalgam">Pahalgam</option>
              <option value="Gurez Valley">Gurez Valley</option>
            </select>
          </div>

          {/* Simple date selection */}
          <div className="bg-cream rounded-2xl border border-obsidian/10 p-2 flex items-center gap-2 shadow-sm min-w-[160px]">
            <Calendar className="w-4 h-4 text-secondary ml-1" />
            <input 
              type="date"
              className="w-full bg-transparent border-none outline-none text-xs font-bold text-obsidian cursor-pointer"
            />
          </div>
          
          {/* Sort selection dropdown */}
          <select 
            value={sortBy} 
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-2xl bg-cream border border-obsidian/10 text-xs font-bold text-obsidian outline-none cursor-pointer"
          >
            <option value="popular">Sort: Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>

          <Button 
            variant="outline" 
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 1. FILTER SIDEBAR (Desktop) */}
          <aside className="hidden md:block lg:col-span-3 space-y-6 bg-cream p-6 rounded-3xl border border-obsidian/5 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-obsidian/5">
              <h3 className="font-bold text-sm uppercase tracking-wider text-obsidian font-display">Filters</h3>
              <button 
                onClick={() => { setSelectedCategory('all'); setSelectedDifficulty('all'); setMaxPrice(200000); }}
                className="text-[10px] uppercase font-bold text-primary hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* Category Filter */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-obsidian/50 font-display">Activity</h4>
              <div className="space-y-1.5">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-2.5 text-xs text-obsidian/80 cursor-pointer font-medium hover:text-primary transition-all">
                    <input 
                      type="radio" 
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="w-4 h-4 accent-primary" 
                    />
                    <span className="capitalize">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="space-y-3 pt-4 border-t border-obsidian/5">
              <h4 className="font-bold text-xs uppercase tracking-wider text-obsidian/50 font-display">Difficulty</h4>
              <div className="space-y-1.5">
                {difficulties.map(diff => (
                  <label key={diff} className="flex items-center gap-2.5 text-xs text-obsidian/80 cursor-pointer font-medium hover:text-primary transition-all">
                    <input 
                      type="radio" 
                      name="difficulty"
                      checked={selectedDifficulty === diff}
                      onChange={() => setSelectedDifficulty(diff)}
                      className="w-4 h-4 accent-primary" 
                    />
                    <span className="capitalize">{diff}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 pt-4 border-t border-obsidian/5">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-xs uppercase tracking-wider text-obsidian/50 font-display">Max Price</h4>
                <span className="text-xs font-bold text-primary font-mono">{formatCurrency(maxPrice)}</span>
              </div>
              <input 
                type="range" 
                min="10000" 
                max="200000" 
                step="5000"
                value={maxPrice}
                onChange={e => setMaxPrice(+e.target.value)}
                className="w-full accent-primary cursor-pointer"
              />
            </div>
          </aside>

          {/* 2. GRID CARD RESULTS */}
          <div className="lg:col-span-9">
            
            {mapView ? (
              <AdventureMap packages={sortedPackages} />
            ) : (
              /* Standard Card Grid */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sortedPackages.map(pkg => (
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
                        <h3 className="font-bold text-sm text-obsidian font-display group-hover:text-primary transition-colors leading-tight">
                          {pkg.title}
                        </h3>
                        <p className="text-xs text-obsidian/60 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" /> {pkg.destination}, Kashmir
                        </p>
                        {(() => {
                          const stay = pkg.included?.find(item => 
                            item.toLowerCase().includes('inn') || 
                            item.toLowerCase().includes('lodging') || 
                            item.toLowerCase().includes('stay') || 
                            item.toLowerCase().includes('camp') || 
                            item.toLowerCase().includes('resort') || 
                            item.toLowerCase().includes('hotel') || 
                            item.toLowerCase().includes('cottage')
                          );
                          if (!stay) return null;
                          const cleanStay = stay
                            .replace('Riverside cottage rooms at ', '')
                            .replace('Luxury ', '')
                            .replace('A-grade ', '')
                            .replace('Premium ', '');
                          return (
                            <div className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-secondary bg-secondary/5 border border-secondary/15 px-2 py-0.5 rounded-lg w-fit mt-1">
                              <span>🏨 {cleanStay}</span>
                            </div>
                          );
                        })()}
                      </div>

                      <div className="pt-3 border-t border-obsidian/5 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-obsidian/40 block">From</span>
                          <span className="text-base font-extrabold text-secondary font-display">{formatCurrency(pkg.price)}</span>
                        </div>
                        <Link href={`/packages/${pkg.slug}`}>
                          <Button variant="outline" size="sm" className="rounded-xl">
                            Details <ArrowRight className="ml-1 w-3 h-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}

                {sortedPackages.length === 0 && (
                  <div className="col-span-full py-16 bg-cream rounded-3xl border border-obsidian/10 text-center">
                    <Compass className="w-12 h-12 text-obsidian/20 mx-auto mb-4" />
                    <h3 className="text-base font-bold text-obsidian font-display">No Kashmir trips match filters</h3>
                    <p className="text-xs text-obsidian/50 mt-1">Try resetting the difficulty, price sliders, or keyword search.</p>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      </main>

      {/* MOBILE FILTER SIDEBAR DRAWER */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="fixed inset-0 z-50 bg-black"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-sand z-50 rounded-t-3xl p-6 overflow-y-auto space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-obsidian/10">
                <h3 className="font-bold text-sm uppercase tracking-wider text-obsidian font-display">Filters</h3>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 rounded-xl hover:bg-obsidian/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Category */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-obsidian/50 font-display">Activity</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                        selectedCategory === cat ? 'bg-primary text-cream' : 'bg-cream text-obsidian border border-obsidian/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Difficulty */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-obsidian/50 font-display">Difficulty</h4>
                <div className="flex flex-wrap gap-2">
                  {difficulties.map(diff => (
                    <button 
                      key={diff} 
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                        selectedDifficulty === diff ? 'bg-primary text-cream' : 'bg-cream text-obsidian border border-obsidian/10'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-obsidian/50 font-display">Max Price</h4>
                  <span className="text-xs font-bold text-primary font-mono">{formatCurrency(maxPrice)}</span>
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="200000" 
                  step="5000"
                  value={maxPrice}
                  onChange={e => setMaxPrice(+e.target.value)}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              <Button 
                onClick={() => setShowMobileFilters(false)}
                className="w-full justify-center"
              >
                Apply Filters
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-obsidian text-sand/40 py-8 border-t border-cream/5 text-xs text-center mt-12">
        <p>© 2026 Wandertribe Kashmir Adventures. All rights reserved.</p>
      </footer>

    </div>
  );
}

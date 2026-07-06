'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Check, Save, Send, FileText, MapPin,
  Plus, Minus, GripVertical, Trash2, Copy, Image as ImageIcon,
  Video, Globe, Eye, Star, Upload, ChevronDown, ChevronUp,
  Bold, Italic, List, ListOrdered, Link2, Heading2,
  Utensils, Bus, Camera, BedDouble, X
} from 'lucide-react';
import Link from 'next/link';
import { mockHotels } from '@/lib/mock-data';
import { slugify, formatCurrency, calculateMargin } from '@/lib/utils';
import type { PackageCategory, ItineraryDay } from '@/types';

// ── Step data ──
const steps = [
  { num: 1, label: 'Basic Info', icon: FileText },
  { num: 2, label: 'Itinerary', icon: MapPin },
  { num: 3, label: 'Inclusions', icon: Check },
  { num: 4, label: 'Pricing', icon: Star },
  { num: 5, label: 'Hotels', icon: BedDouble },
  { num: 6, label: 'Media', icon: ImageIcon },
  { num: 7, label: 'SEO', icon: Globe },
  { num: 8, label: 'Review', icon: Eye },
];

const categories: { value: PackageCategory; label: string }[] = [
  { value: 'honeymoon', label: 'Honeymoon' },
  { value: 'family', label: 'Family' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'group', label: 'Group Tour' },
  { value: 'custom', label: 'Custom' },
];

const defaultInclusions = [
  'Accommodation', 'Daily Breakfast', 'Airport Transfers', 'Sightseeing Tours',
  'English-Speaking Guide', 'All Entry Fees', 'Welcome Drink', 'Travel Insurance',
];

const defaultExclusions = [
  'International/Domestic Flights', 'Lunch & Dinner', 'Personal Expenses',
  'Camera/Video Fees', 'Tips & Gratuities', 'Travel Insurance', 'Visa Charges',
];

// ── Simple Rich Text component ──
function SimpleRichText({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="tiptap-editor">
      <div className="tiptap-toolbar">
        <button title="Bold"><Bold size={14} /></button>
        <button title="Italic"><Italic size={14} /></button>
        <button title="Heading"><Heading2 size={14} /></button>
        <button title="Bullet List"><List size={14} /></button>
        <button title="Numbered List"><ListOrdered size={14} /></button>
        <button title="Link"><Link2 size={14} /></button>
      </div>
      <textarea
        className="w-full p-3 bg-transparent outline-none resize-none text-sm"
        style={{ minHeight: '120px', color: 'var(--text-primary)', fontFamily: 'var(--font-inter)' }}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

// ── Itinerary Day Card ──
function DayCard({ day, index, onRemove, onDuplicate }: { day: ItineraryDay; index: number; onRemove: () => void; onDuplicate: () => void }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="card-flat overflow-hidden">
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer"
        style={{ borderBottom: expanded ? '1px solid var(--border-color)' : 'none' }}
        onClick={() => setExpanded(!expanded)}
      >
        <GripVertical size={16} className="drag-handle flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: 'rgba(15,76,129,0.1)', color: '#0F4C81' }}>
          {index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
            Day {index + 1}: {day.title || 'Untitled'}
          </p>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={e => { e.stopPropagation(); onDuplicate(); }} className="btn-ghost" style={{ padding: '4px' }} title="Duplicate"><Copy size={13} /></button>
          <button onClick={e => { e.stopPropagation(); onRemove(); }} className="btn-ghost" style={{ padding: '4px', color: '#E5484D' }} title="Remove"><Trash2 size={13} /></button>
          {expanded ? <ChevronUp size={16} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Day Title</label>
                <input type="text" defaultValue={day.title} placeholder="e.g. Arrival in Jaipur — The Pink City" className="input-base" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Description</label>
                <SimpleRichText placeholder="Describe the day's activities, highlights, and experiences..." value={day.description} onChange={() => {}} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Meals Included</label>
                  <div className="flex gap-3">
                    {['Breakfast', 'Lunch', 'Dinner'].map(meal => (
                      <label key={meal} className="flex items-center gap-1.5 text-sm cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                        <input type="checkbox" className="checkbox-custom" defaultChecked={meal === 'Breakfast' || meal === 'Dinner'} />
                        {meal}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Hotel/Stay</label>
                  <select className="input-base">
                    <option value="">Select hotel...</option>
                    {mockHotels.map(h => <option key={h.id} value={h.id}>{h.name} ({h.location})</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Activities</label>
                <div className="flex flex-wrap gap-2">
                  {(day.activities.length > 0 ? day.activities : ['Sightseeing', 'City Tour']).map((a, i) => (
                    <span key={i} className="tag flex items-center gap-1">{a} <X size={11} className="cursor-pointer" /></span>
                  ))}
                  <button className="tag" style={{ cursor: 'pointer', borderStyle: 'dashed' }}><Plus size={11} /> Add</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Wizard ──
export default function NewPackagePage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<PackageCategory>('luxury');
  const [days, setDays] = useState(5);
  const [nights, setNights] = useState(4);
  const [description, setDescription] = useState('');
  const [sellingPrice, setSellingPrice] = useState(68000);
  const [internalCost, setInternalCost] = useState(45000);
  const [inclusions, setInclusions] = useState<string[]>(defaultInclusions.slice(0, 5));
  const [exclusions, setExclusions] = useState<string[]>(defaultExclusions.slice(0, 4));
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { id: '1', day: 1, title: 'Arrival & Welcome', description: 'Arrive at destination, transfer to hotel, evening at leisure.', meals: { breakfast: false, lunch: false, dinner: true }, activities: ['Airport Transfer', 'Hotel Check-in'], hotelId: 'h1', hotelName: 'The Leela Palace' },
    { id: '2', day: 2, title: 'Full Day Exploration', description: 'Full day sightseeing of major attractions with guide.', meals: { breakfast: true, lunch: true, dinner: true }, activities: ['City Tour', 'Monument Visits', 'Local Market'], hotelId: 'h1', hotelName: 'The Leela Palace' },
  ]);

  const handleNameChange = (v: string) => { setName(v); setSlug(slugify(v)); };

  const addDay = () => {
    const newDay: ItineraryDay = { id: String(Date.now()), day: itinerary.length + 1, title: '', description: '', meals: { breakfast: true, lunch: false, dinner: true }, activities: [], hotelName: '' };
    setItinerary([...itinerary, newDay]);
  };

  const removeDay = (index: number) => setItinerary(itinerary.filter((_, i) => i !== index));
  const duplicateDay = (index: number) => {
    const copy = { ...itinerary[index], id: String(Date.now()), day: itinerary.length + 1 };
    setItinerary([...itinerary, copy]);
  };

  const margin = calculateMargin(internalCost, sellingPrice);

  const next = () => step < 8 && setStep(step + 1);
  const prev = () => step > 1 && setStep(step - 1);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/packages" className="btn-ghost" style={{ padding: '8px' }}><ArrowLeft size={18} /></Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Create New Package</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>Step {step} of 8 — {steps[step - 1].label}</p>
        </div>
        <button className="btn-secondary"><Save size={15} /> Save Draft</button>
      </div>

      {/* Step Indicator */}
      <div className="step-indicator mb-8 max-w-4xl mx-auto">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center" style={{ flex: i < steps.length - 1 ? 1 : 0 }}>
            <button
              onClick={() => setStep(s.num)}
              className={`step-dot ${step === s.num ? 'active' : step > s.num ? 'completed' : ''}`}
              title={s.label}
            >
              {step > s.num ? <Check size={14} /> : s.num}
            </button>
            {i < steps.length - 1 && (
              <div className={`step-connector ${step > s.num ? 'completed' : ''}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>

            {/* ─── STEP 1: Basic Info ─── */}
            {step === 1 && (
              <div className="card p-6 space-y-5">
                <h2 className="font-semibold text-lg" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Basic Information</h2>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Package Name *</label>
                  <input type="text" value={name} onChange={e => handleNameChange(e.target.value)} placeholder="e.g. Royal Rajasthan Heritage Tour" className="input-base" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>URL Slug</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>yoursite.com/packages/</span>
                    <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="input-base flex-1" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Category *</label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {categories.map(c => (
                      <button key={c.value} onClick={() => setCategory(c.value)} className="px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-center" style={{ background: category === c.value ? 'rgba(15,76,129,0.08)' : 'var(--bg-primary)', border: `2px solid ${category === c.value ? '#0F4C81' : 'var(--border-color)'}`, color: category === c.value ? '#0F4C81' : 'var(--text-secondary)' }}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Destinations</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {['Jaipur', 'Udaipur', 'Jodhpur'].map(d => (
                      <span key={d} className="tag flex items-center gap-1">{d} <X size={11} className="cursor-pointer" /></span>
                    ))}
                  </div>
                  <input type="text" placeholder="Add destination..." className="input-base" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Days</label>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setDays(Math.max(1, days - 1))} className="btn-ghost" style={{ padding: '6px' }}><Minus size={14} /></button>
                      <input type="number" value={days} onChange={e => setDays(+e.target.value)} className="input-base text-center" style={{ width: '80px' }} />
                      <button onClick={() => setDays(days + 1)} className="btn-ghost" style={{ padding: '6px' }}><Plus size={14} /></button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Nights</label>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setNights(Math.max(0, nights - 1))} className="btn-ghost" style={{ padding: '6px' }}><Minus size={14} /></button>
                      <input type="number" value={nights} onChange={e => setNights(+e.target.value)} className="input-base text-center" style={{ width: '80px' }} />
                      <button onClick={() => setNights(nights + 1)} className="btn-ghost" style={{ padding: '6px' }}><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Short Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="A brief, compelling summary of this package..." rows={3} className="input-base resize-none" style={{ fontFamily: 'var(--font-inter)' }} />
                </div>
              </div>
            )}

            {/* ─── STEP 2: Itinerary ─── */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Itinerary Builder</h2>
                  <div className="flex gap-2">
                    <button className="btn-secondary text-xs"><Copy size={13} /> Import Template</button>
                    <button onClick={addDay} className="btn-primary text-xs"><Plus size={13} /> Add Day</button>
                  </div>
                </div>
                <AnimatePresence>
                  {itinerary.map((day, i) => (
                    <DayCard key={day.id} day={day} index={i} onRemove={() => removeDay(i)} onDuplicate={() => duplicateDay(i)} />
                  ))}
                </AnimatePresence>
                {itinerary.length === 0 && (
                  <div className="card p-12 text-center">
                    <MapPin size={40} className="mx-auto mb-3 opacity-20" style={{ color: 'var(--text-muted)' }} />
                    <p style={{ color: 'var(--text-muted)' }}>No days added yet. Click &quot;Add Day&quot; to start building the itinerary.</p>
                  </div>
                )}
              </div>
            )}

            {/* ─── STEP 3: Inclusions & Exclusions ─── */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="card p-6">
                  <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Inclusions</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    {defaultInclusions.map(item => {
                      const active = inclusions.includes(item);
                      return (
                        <button key={item} onClick={() => active ? setInclusions(inclusions.filter(x => x !== item)) : setInclusions([...inclusions, item])} className="flex items-center gap-2 p-3 rounded-lg text-sm text-left transition-all" style={{ background: active ? 'rgba(0,166,118,0.08)' : 'var(--bg-primary)', border: `1.5px solid ${active ? '#00A676' : 'var(--border-color)'}`, color: active ? '#00A676' : 'var(--text-secondary)' }}>
                          {active ? <Check size={14} /> : <Plus size={14} />} {item}
                        </button>
                      );
                    })}
                  </div>
                  <input type="text" placeholder="Add custom inclusion..." className="input-base" />
                </div>
                <div className="card p-6">
                  <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Exclusions</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    {defaultExclusions.map(item => {
                      const active = exclusions.includes(item);
                      return (
                        <button key={item} onClick={() => active ? setExclusions(exclusions.filter(x => x !== item)) : setExclusions([...exclusions, item])} className="flex items-center gap-2 p-3 rounded-lg text-sm text-left transition-all" style={{ background: active ? 'rgba(229,72,77,0.08)' : 'var(--bg-primary)', border: `1.5px solid ${active ? '#E5484D' : 'var(--border-color)'}`, color: active ? '#E5484D' : 'var(--text-secondary)' }}>
                          {active ? <X size={14} /> : <Plus size={14} />} {item}
                        </button>
                      );
                    })}
                  </div>
                  <input type="text" placeholder="Add custom exclusion..." className="input-base" />
                </div>
                <div className="card p-6">
                  <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Add-Ons (Optional Extras)</h2>
                  <div className="space-y-2 mb-4">
                    {['Camel Safari (₹2,500/person)', 'Hot Air Balloon (₹9,000/person)'].map((addon, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 rounded-lg" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                        <span className="flex-1 text-sm" style={{ color: 'var(--text-primary)' }}>{addon}</span>
                        <button className="btn-ghost" style={{ padding: '4px', color: '#E5484D' }}><Trash2 size={13} /></button>
                      </div>
                    ))}
                  </div>
                  <input type="text" placeholder="Add an optional add-on..." className="input-base" />
                </div>
                <div className="card p-6">
                  <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Terms & Conditions</h2>
                  <SimpleRichText placeholder="Enter terms and conditions..." value="Standard cancellation policy applies. Full refund 30 days before departure. 50% refund 15-29 days before. No refund within 14 days." onChange={() => {}} />
                </div>
              </div>
            )}

            {/* ─── STEP 4: Pricing ─── */}
            {step === 4 && (
              <div className="space-y-5">
                <div className="card p-6">
                  <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Base Pricing</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Selling Price (per person)</label>
                      <input type="number" value={sellingPrice} onChange={e => setSellingPrice(+e.target.value)} className="input-base" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Internal Cost</label>
                      <input type="number" value={internalCost} onChange={e => setInternalCost(+e.target.value)} className="input-base" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Currency</label>
                      <select className="input-base"><option>INR</option><option>USD</option><option>EUR</option></select>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: margin >= 30 ? 'rgba(0,166,118,0.06)' : margin >= 15 ? 'rgba(245,166,35,0.06)' : 'rgba(229,72,77,0.06)', border: `1px solid ${margin >= 30 ? 'rgba(0,166,118,0.2)' : margin >= 15 ? 'rgba(245,166,35,0.2)' : 'rgba(229,72,77,0.2)'}` }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Profit Margin</p>
                        <p className="text-3xl font-bold" style={{ color: margin >= 30 ? '#00A676' : margin >= 15 ? '#F5A623' : '#E5484D', fontFamily: 'var(--font-poppins)' }}>{margin}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Profit per Person</p>
                        <p className="text-xl font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-poppins)' }}>{formatCurrency(sellingPrice - internalCost)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card p-6">
                  <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Price Variants by Occupancy</h2>
                  <table className="data-table">
                    <thead><tr><th>Occupancy</th><th>Peak Season</th><th>Off-Peak</th><th>Festival</th></tr></thead>
                    <tbody>
                      {[['Single', '95000', '75000', '105000'], ['Double', '68000', '55000', '78000'], ['Triple', '58000', '48000', '65000'], ['Child (with bed)', '45000', '38000', '52000'], ['Child (no bed)', '32000', '26000', '38000']].map(([occ, peak, off, fest]) => (
                        <tr key={occ}>
                          <td><span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{occ}</span></td>
                          <td><input type="number" defaultValue={peak} className="input-base" style={{ width: '120px' }} /></td>
                          <td><input type="number" defaultValue={off} className="input-base" style={{ width: '120px' }} /></td>
                          <td><input type="number" defaultValue={fest} className="input-base" style={{ width: '120px' }} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="card p-6">
                  <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Tax & GST</h2>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="checkbox-custom" defaultChecked />
                      <span className="text-sm" style={{ color: 'var(--text-primary)' }}>Enable GST</span>
                    </label>
                    <div>
                      <input type="number" defaultValue={5} className="input-base" style={{ width: '80px' }} />
                      <span className="text-xs ml-1" style={{ color: 'var(--text-muted)' }}>%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 5: Hotels ─── */}
            {step === 5 && (
              <div className="card p-6">
                <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Hotels & Stays</h2>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>Assign hotels from your inventory to this package. You can offer multiple tiers.</p>
                {['Standard', 'Deluxe', 'Luxury'].map(tier => (
                  <div key={tier} className="mb-4 p-4 rounded-xl" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                    <h3 className="font-semibold text-sm mb-3" style={{ color: 'var(--text-primary)' }}>{tier} Tier</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {mockHotels.filter(h => h.tier === tier.toLowerCase()).map(hotel => (
                        <label key={hotel.id} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                          <input type="checkbox" className="checkbox-custom" defaultChecked={tier === 'Luxury'} />
                          <div>
                            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{hotel.name}</p>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                              {hotel.location} · {'★'.repeat(hotel.stars)} · {formatCurrency(hotel.pricePerNight)}/night
                            </p>
                          </div>
                        </label>
                      ))}
                      {mockHotels.filter(h => h.tier === tier.toLowerCase()).length === 0 && (
                        <p className="text-xs col-span-2" style={{ color: 'var(--text-muted)' }}>No {tier.toLowerCase()} hotels in inventory.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ─── STEP 6: Media ─── */}
            {step === 6 && (
              <div className="space-y-5">
                <div className="card p-6">
                  <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Cover Image *</h2>
                  <div className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors hover:border-[#0F4C81]" style={{ borderColor: 'var(--border-color)' }}>
                    <Upload size={40} className="mx-auto mb-3 opacity-30" style={{ color: 'var(--text-muted)' }} />
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Click to upload or drag and drop</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>PNG, JPG or WebP (max 5MB). Recommended: 1200×800px</p>
                  </div>
                </div>
                <div className="card p-6">
                  <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Gallery</h2>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="aspect-square rounded-xl overflow-hidden relative group" style={{ background: 'var(--bg-tertiary)' }}>
                        <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?w=200&h=200&fit=crop`} alt="" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Trash2 size={18} className="text-white" /></div>
                      </div>
                    ))}
                    <div className="aspect-square rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors hover:border-[#0F4C81]" style={{ borderColor: 'var(--border-color)' }}>
                      <Plus size={24} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  </div>
                </div>
                <div className="card p-6">
                  <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Video URL (Optional)</h2>
                  <div className="flex items-center gap-2">
                    <Video size={16} style={{ color: 'var(--text-muted)' }} />
                    <input type="url" placeholder="https://youtube.com/watch?v=..." className="input-base flex-1" />
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 7: SEO & Publishing ─── */}
            {step === 7 && (
              <div className="space-y-5">
                <div className="card p-6">
                  <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>SEO Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Meta Title</label>
                      <input type="text" defaultValue={name ? `${name} | Best Travel Package` : ''} className="input-base" />
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>60 characters max for optimal display</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Meta Description</label>
                      <textarea rows={2} placeholder="A compelling description for search results..." className="input-base resize-none" style={{ fontFamily: 'var(--font-inter)' }} />
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>160 characters max</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>URL Preview</label>
                      <div className="p-3 rounded-lg text-sm" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                        <span style={{ color: '#00A676' }}>yoursite.com</span>
                        <span style={{ color: 'var(--text-muted)' }}>/packages/</span>
                        <span style={{ color: 'var(--text-primary)' }}>{slug || 'your-package-slug'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card p-6">
                  <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Publishing Options</h2>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-3 rounded-lg cursor-pointer" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
                      <input type="checkbox" className="checkbox-custom" />
                      <div><p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Featured Package</p><p className="text-xs" style={{ color: 'var(--text-muted)' }}>Show on homepage carousel</p></div>
                    </label>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Visibility</label>
                      <select className="input-base" style={{ width: 'auto' }}>
                        <option value="public">Public — visible to everyone</option>
                        <option value="unlisted">Unlisted — accessible via direct link</option>
                        <option value="internal">Internal — quote-only, not on website</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Scheduled Publish Date (optional)</label>
                      <input type="datetime-local" className="input-base" style={{ width: 'auto' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 8: Review ─── */}
            {step === 8 && (
              <div className="space-y-5">
                <div className="card p-6">
                  <h2 className="font-semibold text-lg mb-4" style={{ fontFamily: 'var(--font-poppins)', color: 'var(--text-primary)' }}>Review Summary</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Package', value: name || 'Untitled Package' },
                      { label: 'Category', value: category },
                      { label: 'Duration', value: `${days}D / ${nights}N` },
                      { label: 'Selling Price', value: formatCurrency(sellingPrice) },
                    ].map(({ label, value }) => (
                      <div key={label} className="p-3 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</p>
                        <p className="text-sm font-semibold capitalize" style={{ color: 'var(--text-primary)' }}>{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Inclusions ({inclusions.length})</h3>
                      <ul className="space-y-1">{inclusions.map(i => <li key={i} className="flex items-center gap-2 text-sm" style={{ color: '#00A676' }}><Check size={13} /> {i}</li>)}</ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Exclusions ({exclusions.length})</h3>
                      <ul className="space-y-1">{exclusions.map(i => <li key={i} className="flex items-center gap-2 text-sm" style={{ color: '#E5484D' }}><X size={13} /> {i}</li>)}</ul>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Itinerary ({itinerary.length} days)</h3>
                    <div className="space-y-2">
                      {itinerary.map((day, i) => (
                        <div key={day.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--bg-primary)' }}>
                          <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold" style={{ background: 'rgba(15,76,129,0.1)', color: '#0F4C81' }}>{i + 1}</span>
                          <span className="text-sm" style={{ color: 'var(--text-primary)' }}>{day.title || 'Untitled Day'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(15,76,129,0.04)', border: '1px solid rgba(15,76,129,0.15)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Pricing Summary</span>
                      <span className="badge" style={{ background: margin >= 30 ? 'rgba(0,166,118,0.1)' : 'rgba(245,166,35,0.1)', color: margin >= 30 ? '#00A676' : '#F5A623' }}>{margin}% margin</span>
                    </div>
                    <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span>Internal Cost</span><span>{formatCurrency(internalCost)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold mt-1" style={{ color: 'var(--text-primary)' }}>
                      <span>Selling Price</span><span>{formatCurrency(sellingPrice)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Internal Notes</label>
                  <textarea rows={3} placeholder="Add any internal notes about this package (not shown to customers)..." className="input-base resize-none" style={{ fontFamily: 'var(--font-inter)' }} />
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-5 pb-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <button onClick={prev} disabled={step === 1} className="btn-secondary" style={{ opacity: step === 1 ? 0.4 : 1 }}>
            <ArrowLeft size={15} /> Previous
          </button>
          <div className="flex gap-3">
            <button className="btn-secondary"><Save size={15} /> Save Draft</button>
            {step === 8 ? (
              <>
                <button className="btn-accent"><Send size={15} /> Submit for Approval</button>
                <button className="btn-primary"><Check size={15} /> Publish</button>
              </>
            ) : (
              <button onClick={next} className="btn-primary">Next <ArrowRight size={15} /></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

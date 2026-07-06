// REVIEW WITH A LAWYER BEFORE LAUNCH — placeholder legal language, not verified for Indian travel/consumer law.

import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-sand text-obsidian py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-obsidian/60 hover:text-primary transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Wandertribe Home
        </Link>

        <div className="flex items-center gap-3 border-b border-obsidian/10 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold font-display">Privacy Policy</h1>
            <p className="text-xs text-obsidian/50 mt-1">Last updated: July 2026</p>
          </div>
        </div>

        <div className="prose prose-sm prose-obsidian max-w-none space-y-6 text-xs text-obsidian/75 leading-relaxed font-light">
          <p className="font-semibold text-sm text-obsidian">
            NOTICE: This policy outlines how Wandertribe collects, uses, and protects client data. 
            Before utilizing this in production for Indian travel markets, ensure a certified legal expert reviews all details for compliance with the Information Technology Act (2000) and upcoming Digital Personal Data Protection (DPDP) Act.
          </p>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us when planning an itinerary or registering as a B2B partner. This includes your name, email address, phone number, destination preferences, travel dates, and any custom trip notes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display">2. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To customize your Kashmir travel itineraries.</li>
              <li>To negotiate rates and coordinate booking schedules with local operators (guides, houseboat hosts, transport drivers).</li>
              <li>To verify B2B partner applications.</li>
              <li>To send weekly snow alerts, itinerary updates, and promotional voucher offers (if opted-in).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display">3. Information Sharing and Disclosure</h2>
            <p>
              We do NOT sell or lease your personal information. To fulfill your customized bookings, we share necessary itinerary details (such as names and dates) directly with certified local guides, hotel hosts, and mountain transport partners operating in the Kashmir Valley.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display">4. Data Security</h2>
            <p>
              We employ standard administrative and electronic security measures to protect your information from unauthorized access. However, no transmission over the internet or database storage is 100% secure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display">5. Your Rights &amp; Contacts</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data by contacting us at <code className="bg-sand-dark/10 px-1 rounded">[REAL_BUSINESS_EMAIL]</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

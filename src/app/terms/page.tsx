// REVIEW WITH A LAWYER BEFORE LAUNCH — placeholder legal language, not verified for Indian travel/consumer law.

import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-sand text-obsidian py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-obsidian/60 hover:text-primary transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Wandertribe Home
        </Link>

        <div className="flex items-center gap-3 border-b border-obsidian/10 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold font-display">Terms of Service</h1>
            <p className="text-xs text-obsidian/50 mt-1">Last updated: July 2026</p>
          </div>
        </div>

        <div className="prose prose-sm prose-obsidian max-w-none space-y-6 text-xs text-obsidian/75 leading-relaxed font-light">
          <p className="font-semibold text-sm text-obsidian">
            NOTICE: These terms govern the use of Wandertribe travel services. 
            Before utilizing this in production for Indian travel markets, ensure a certified legal expert reviews all details for compliance with tourism liability limits.
          </p>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display">1. Booking Agreement</h2>
            <p>
              By booking an expedition (including skiing, trekking, or road trips) through Wandertribe, you enter into a direct agreement with our local operators. Wandertribe acts as a coordinator utilizing Six Sigma operational checks to minimize booking and logistical errors.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display">2. High-Altitude and Adventure Risk</h2>
            <p>
              Many of our Kashmir packages (such as Gulmarg backcountry skiing or Sonamarg glacier trekking) take place in high-altitude, avalanche-prone, or remote border areas. Travelers assume all inherent risks of personal injury, illness, altitude sickness, and mountain weather disruptions. Certified local guides always check safety conditions, and travelers must follow guide instructions at all times.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display">3. Travel Permits &amp; Security</h2>
            <p>
              Certain zones in Kashmir (like Gurez Valley) lie near international border checkpoints and require specific security permits. Travelers must submit accurate identity credentials (like Aadhaar, Passport, or Visa details) within the requested timeline. Wandertribe is not responsible for permits denied due to inaccurate submission or security authority decisions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display">4. Limitation of Liability</h2>
            <p>
              Wandertribe acts as an booking agent and is not liable for delayed flights, national highway closures (such as NH-44 blockages due to landslides), weather anomalies, or services provided by third-party lodging/transport partners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display">5. Jurisdiction</h2>
            <p>
              Any disputes arising from these terms or Wandertribe packages will be governed by the laws of Jammu &amp; Kashmir, India, under the jurisdiction of Srinagar courts.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

// REVIEW WITH A LAWYER BEFORE LAUNCH — placeholder legal language, not verified for Indian travel/consumer law.

import Link from 'next/link';
import { ArrowLeft, FileText, AlertTriangle } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-sand text-obsidian py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-obsidian/60 hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Wandertribe
        </Link>

        {/* Title Block */}
        <div className="border-b border-obsidian/10 pb-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold font-display tracking-tight">Terms of Service</h1>
              <p className="text-xs text-obsidian/50 mt-1">
                Last updated: July 2026 — <span className="font-semibold text-primary">Draft (Pending Legal Review)</span>
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-2xl text-xs text-obsidian/85 leading-relaxed font-light">
            <strong className="block text-[10px] font-bold uppercase tracking-wider text-secondary mb-1">
              Legal Disclaimer &amp; Draft Status
            </strong>
            This document is a draft template prepared for Wandertribe. It has not been reviewed by a qualified Indian legal counsel. It is not verified for compliance under the Information Technology Act (2000), Consumer Protection Act (2019), or local travel regulation in India. Review and modify all sections with legal counsel before accepting bookings.
          </div>
        </div>

        {/* Table of Contents */}
        <div className="p-6 bg-cream border border-obsidian/5 rounded-3xl space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-obsidian/40 font-display">
            Table of Contents
          </h2>
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs font-medium">
            <a href="#1-service-description" className="hover:text-primary transition-colors">1. Service Description</a>
            <a href="#2-booking-and-payments" className="hover:text-primary transition-colors">2. Booking and Payments</a>
            <a href="#3-cancellations-and-refunds" className="hover:text-primary transition-colors">3. Cancellations and Refunds</a>
            <a href="#4-user-responsibilities" className="hover:text-primary transition-colors">4. User Responsibilities</a>
            <a href="#5-limitation-of-liability" className="hover:text-primary transition-colors">5. Limitation of Liability</a>
            <a href="#6-partner-vendor-terms" className="hover:text-primary transition-colors">6. Partner &amp; Vendor Terms</a>
            <a href="#7-intellectual-property" className="hover:text-primary transition-colors">7. Intellectual Property</a>
            <a href="#8-governing-law" className="hover:text-primary transition-colors">8. Governing Law &amp; Jurisdiction</a>
            <a href="#9-changes-to-terms" className="hover:text-primary transition-colors">9. Changes to Terms</a>
            <a href="#10-dispute-contact" className="hover:text-primary transition-colors">10. Contact for Disputes</a>
          </nav>
        </div>

        {/* Terms Content */}
        <div className="space-y-12 text-xs text-obsidian/75 leading-relaxed font-light">
          
          <section id="1-service-description" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              1. Service Description
            </h2>
            <p>
              Wandertribe is a full-service travel management provider. We design, manage, and coordinate the entire travel itinerary, local logistics, transport schedules, guide assignments, and safety protocols for our clients. We act as the single point of management and accountability for your entire trip, overseeing local operators, guides, transport teams, and accommodations to ensure a seamless, managed experience.
            </p>
            <p className="font-semibold text-obsidian">
              While we coordinate with verified local partners and accommodations, Wandertribe is the primary manager responsible for orchestrating, quality-controlling, and executing the adventure travel package you book.
            </p>
          </section>

          <section id="2-booking-and-payments" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              2. Booking and Payments
            </h2>
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-800 rounded-xl space-y-2">
              <strong className="block text-[10px] font-bold uppercase tracking-wider text-amber-700">
                [PENDING PAYMENT GATEWAY INTEGRATION — FINALIZE WORDING]
              </strong>
              <p>
                Reservations are confirmed upon payment of the required deposit (usually 50% of the total package value) or the full trip price, as outlined during checkout. The balance payment must be settled at least 15 days before the trip departure date. If the balance remains unpaid, Wandertribe reserves the right to cancel the booking and retain the deposit.
              </p>
            </div>
          </section>

          <section id="3-cancellations-and-refunds" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              3. Cancellations and Refunds
            </h2>
            <p>
              All cancellations must be requested in writing by emailing <code className="bg-cream/80 px-1 border border-obsidian/5 rounded text-obsidian">[REAL_BUSINESS_EMAIL]</code>. Refund percentages are determined based on how many days prior to departure the cancellation request is received, as outlined in our <Link href="/refund-policy" className="text-secondary font-bold underline hover:text-primary transition-colors">Cancellation &amp; Refund Policy</Link>.
            </p>
            <p>
              Please note that third-party vendors (such as specific luxury hotels or helicopter service providers) may enforce distinct cancellation policies that differ from Wandertribe&apos;s standard terms. In such instances, the third-party vendor&apos;s cancellation policy will take precedence for that specific segment of your booking.
            </p>
          </section>

          <section id="4-user-responsibilities" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              4. User Responsibilities
            </h2>
            <p>
              When booking a trip through Wandertribe, you agree to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate personal and travel group information at the time of reservation.</li>
              <li>Ensure all travelers possess valid travel documents, including government-issued photo IDs (Aadhaar/Passport) and required entry visas. Acquiring these is solely the user&apos;s responsibility.</li>
              <li>Verify and comply with all specific local entry permits or security checkpoint requirements enforced in border zones (such as Gurez Valley).</li>
            </ul>
          </section>

          <section id="5-limitation-of-liability" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2 text-red-600 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-500" /> 5. Limitation of Liability
            </h2>
            
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-800 rounded-xl space-y-2">
              <strong className="block text-[10px] font-bold uppercase tracking-wider text-red-600">
                CRITICAL WARNING — FLAG FOR LAWYER REVIEW
              </strong>
              <p>
                Liability limitation clauses carry the highest risk of enforceability issues under Indian travel and contract laws. Review this section carefully with a legal professional.
              </p>
            </div>

            <p>
              As your full-service travel manager, Wandertribe takes responsibility for orchestrating, quality-controlling, and executing the booking. We actively manage and resolve any local operational challenges or scheduling delays during your trip. However, Wandertribe shall not be held liable for:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Delays, blockages, or travel modifications due to road closures (such as landslides on the NH-44 highway) or flight cancellations.</li>
              <li>Force Majeure events, natural disasters, avalanches, civil disturbances, or government-imposed security restrictions in the Kashmir Valley.</li>
              <li>Personal injuries, illnesses, or high-altitude health risks voluntarily undertaken by the client during ski or trek packages.</li>
            </ul>
            <p>
              In no event shall Wandertribe&apos;s total financial liability exceed the actual fees paid by the client for the specific travel package.
            </p>
          </section>

          <section id="6-partner-vendor-terms" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              6. Partner &amp; Vendor Terms
            </h2>
            <p>
              Local guesthouses, guides, and DMCs participating in the Wandertribe B2B Partner Program are governed by separate, signed master vendor agreements. The registration submitted through the online Partner Application form is an expression of interest and does not establish a binding commercial relationship until formal vetting is complete and contracts are executed.
            </p>
          </section>

          <section id="7-intellectual-property" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              7. Intellectual Property
            </h2>
            <p>
              All website content, software, logo designs, custom vector maps (including the Kashmir Adventure Map), branding, layout styles, and curated trip itineraries displayed on our platform are the exclusive intellectual property of Wandertribe. Any unauthorized reproduction or commercial use is strictly prohibited.
            </p>
          </section>

          <section id="8-governing-law" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              8. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These terms of service are governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in <span className="font-semibold text-obsidian">[SPECIFY STATE/CITY — e.g. New Delhi, Delhi]</span>.
            </p>
          </section>

          <section id="9-changes-to-terms" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              9. Changes to Terms
            </h2>
            <p>
              Wandertribe reserves the right to modify these terms at any time. Changes will be posted on this page, and the last updated timestamp will be adjusted. Your continued use of the platform following the posting of modifications indicates your binding acceptance of the updated terms.
            </p>
          </section>

          <section id="10-dispute-contact" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              10. Contact for Disputes
            </h2>
            <p>
              For legal notifications, disputes, or policy arbitration, please contact our legal representative at:
            </p>
            <p className="bg-cream p-4 border border-obsidian/5 rounded-2xl font-mono text-[10px] space-y-1">
              <span className="block"><strong>Wandertribe Legal Desk</strong></span>
              <span className="block">Email: [REAL_BUSINESS_EMAIL]</span>
              <span className="block">Address: [REAL_BUSINESS_ADDRESS]</span>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

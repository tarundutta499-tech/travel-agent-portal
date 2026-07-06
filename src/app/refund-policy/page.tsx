// REVIEW WITH A LAWYER BEFORE LAUNCH — placeholder legal language, not verified for Indian travel/consumer law.

import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-sand text-obsidian py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-obsidian/60 hover:text-primary transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Wandertribe Home
        </Link>

        <div className="flex items-center gap-3 border-b border-obsidian/10 pb-6">
          <div className="w-12 h-12 rounded-2xl bg-forest/10 flex items-center justify-center text-forest">
            <RefreshCw className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold font-display">Cancellation &amp; Refund Policy</h1>
            <p className="text-xs text-obsidian/50 mt-1">Last updated: July 2026</p>
          </div>
        </div>

        <div className="prose prose-sm prose-obsidian max-w-none space-y-6 text-xs text-obsidian/75 leading-relaxed font-light">
          <p className="font-semibold text-sm text-obsidian">
            NOTICE: This policy details cancellation window thresholds and refund percentages for Kashmir travel packages. 
            Review this with your payment gateway provider and legal advisor before linking this to live gateway accounts.
          </p>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display">1. Cancellation Timelines &amp; Fees</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-obsidian/20 font-bold">
                    <th className="py-2">Cancellation Timeframe</th>
                    <th className="py-2">Refund Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-obsidian/10">
                  <tr>
                    <td className="py-2">30+ Days before departure</td>
                    <td className="py-2">100% Refund (minus transactional fees)</td>
                  </tr>
                  <tr>
                    <td className="py-2">15 - 29 Days before departure</td>
                    <td className="py-2">75% Refund</td>
                  </tr>
                  <tr>
                    <td className="py-2">7 - 14 Days before departure</td>
                    <td className="py-2">50% Refund</td>
                  </tr>
                  <tr>
                    <td className="py-2">Less than 7 Days before departure</td>
                    <td className="py-2">No Refund (0%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display">2. Weather Disruption &amp; Pass Closures</h2>
            <p>
              Kashmir is prone to sudden heavy snowfalls, avalanches, and military checks. In the event of mountain pass closures (such as Razdan Pass to Gurez or Zojila Pass to Sonamarg) or ski lift shutdowns in Gulmarg due to wind/avalanche threats:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Our operators will attempt to rearrange alternative routes or destinations (e.g. transfering Gurez routes to Gulmarg or Srinagar stays).</li>
              <li>If the entire trip is canceled by guides due to verified safety alerts, a 100% credit voucher will be generated for future dates within 12 months.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display">3. Processing Refunds</h2>
            <p>
              Approved refund requests are processed within 7 to 10 business days directly to the original bank account/card used during payment.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display">4. Refund Requests</h2>
            <p>
              To file a cancellation, email details to <code className="bg-sand-dark/10 px-1 rounded">[REAL_BUSINESS_EMAIL]</code> with your booking ID.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

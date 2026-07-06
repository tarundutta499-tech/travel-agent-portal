// REVIEW WITH A LAWYER BEFORE LAUNCH — placeholder legal language, not verified for Indian travel/consumer law.

import Link from 'next/link';
import { ArrowLeft, Shield, ExternalLink } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold font-display tracking-tight">Privacy Policy</h1>
              <p className="text-xs text-obsidian/50 mt-1">
                Last updated: July 2026 — <span className="font-semibold text-primary">Draft (Pending Legal Review)</span>
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl text-xs text-obsidian/85 leading-relaxed font-light">
            <strong className="block text-[10px] font-bold uppercase tracking-wider text-primary mb-1">
              Legal Disclaimer &amp; Draft Status
            </strong>
            This document is a draft template prepared for Wandertribe. It has not been reviewed by a qualified Indian legal counsel. It is not verified for compliance under the Information Technology Act (2000), Digital Personal Data Protection (DPDP) Act (2023), or local consumer protection regulations in India. Review and modify all sections with legal counsel before accepting payments.
          </div>
        </div>

        {/* Table of Contents */}
        <div className="p-6 bg-cream border border-obsidian/5 rounded-3xl space-y-3">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-obsidian/40 font-display">
            Table of Contents
          </h2>
          <nav className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs font-medium">
            <a href="#1-data-we-collect" className="hover:text-primary transition-colors">1. Data We Collect</a>
            <a href="#2-how-we-use-your-data" className="hover:text-primary transition-colors">2. How We Use Your Data</a>
            <a href="#3-third-party-sharing" className="hover:text-primary transition-colors">3. Third-Party Sharing</a>
            <a href="#4-cookies-and-analytics" className="hover:text-primary transition-colors">4. Cookies and Analytics</a>
            <a href="#5-data-retention" className="hover:text-primary transition-colors">5. Data Retention</a>
            <a href="#6-user-rights" className="hover:text-primary transition-colors">6. Your User Rights</a>
            <a href="#7-childrens-privacy" className="hover:text-primary transition-colors">7. Children&apos;s Privacy</a>
            <a href="#8-policy-updates" className="hover:text-primary transition-colors">8. Policy Updates</a>
            <a href="#9-contact-information" className="hover:text-primary transition-colors">9. Contact Information</a>
          </nav>
        </div>

        {/* Policy Content */}
        <div className="space-y-12 text-xs text-obsidian/75 leading-relaxed font-light">
          
          <section id="1-data-we-collect" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              1. Data We Collect
            </h2>
            <p>
              We collect information that you voluntarily provide when using our adventure booking platform. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Identity Details:</strong> Full name, age, and travel preferences.</li>
              <li><strong>Contact Information:</strong> Email address and mobile phone number.</li>
              <li><strong>Form Submissions:</strong> Information submitted via the &quot;Plan Your Itinerary&quot; and &quot;Partner Application&quot; forms.</li>
              <li><strong>Payment Information:</strong> When you purchase packages, we collect billing details. <em className="text-obsidian/90 font-medium">Note: Actual credit/debit card numbers or bank credentials are processed directly by our secure third-party payment gateway provider and are not stored or hosted on Wandertribe servers.</em></li>
            </ul>
          </section>

          <section id="2-how-we-use-your-data" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              2. How We Use Your Data
            </h2>
            <p>
              We utilize collected information to deliver and optimize our adventure travel services:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>To customize your Kashmir itinerary and secure local guide assignments.</li>
              <li>To verify B2B partner applications and evaluate DMC credentials.</li>
              <li>To dispatch trip updates, booking vouchers, and alpine weather notifications.</li>
              <li>To send marketing updates and snow alerts. You may opt out of promotional communications at any time by clicking the unsubscribe link in our emails.</li>
            </ul>
          </section>

          <section id="3-third-party-sharing" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              3. Third-Party Sharing
            </h2>
            <p>
              We do not sell, lease, or distribute your personal data. We share only necessary information with select third parties to facilitate your booking:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Travel Vendors &amp; DMCs:</strong> Local guesthouse hosts, houseboat owners, transport drivers, and certified alpine guides who execute your trip.</li>
              <li><strong>Service Providers:</strong> Payment gateway operators and email/CRM marketing utilities.</li>
              <li><strong>Legal Compliance:</strong> When required by Indian law enforcement or court order.</li>
            </ul>
          </section>

          <section id="4-cookies-and-analytics" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              4. Cookies and Analytics
            </h2>
            <p>
              We use cookies to analyze web traffic, remember your preferences, and maintain dashboard logins.
            </p>
            <p>
              Our platform integrates Google Analytics 4 (GA4) to track user behavior. This data is collected anonymously. You can opt out of Google Analytics tracking by installing the official browser opt-out add-on or modifying your cookie consent options.
            </p>
          </section>

          <section id="5-data-retention" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              5. Data Retention
            </h2>
            <p>
              We retain trip inquiry and lead data for as long as necessary to provide service, or up to 2 years after your last interaction, unless a longer retention period is required by Indian financial auditing laws. Partner applications are kept on file during active registration.
            </p>
          </section>

          <section id="6-user-rights" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              6. Your User Rights
            </h2>
            <p>
              As a user, you have the following rights under personal data protection guidelines:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Right to access the personal records we hold about you.</li>
              <li>Right to request corrections of inaccurate or outdated data.</li>
              <li>Right to request complete deletion of your records from our systems (subject to active booking fulfillments and local tax requirements).</li>
            </ul>
            <p>
              To exercise these rights, please email our privacy team at <code className="bg-cream/80 px-1 border border-obsidian/5 rounded text-obsidian">[REAL_BUSINESS_EMAIL]</code>.
            </p>
          </section>

          <section id="7-childrens-privacy" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              7. Children&apos;s Privacy
            </h2>
            <p>
              Our booking services and payment portals are directed strictly at individuals who are 18 years of age or older. We do not knowingly collect personal data from minors. If you believe a minor has provided details without parental consent, contact us immediately for deletion.
            </p>
          </section>

          <section id="8-policy-updates" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              8. Policy Updates
            </h2>
            <p>
              We may revise this privacy policy from time to time. Any changes will be posted on this page, and the &quot;Last updated&quot; timestamp at the top will be updated. Continued use of our platform constitutes acceptance of the updated terms.
            </p>
          </section>

          <section id="9-contact-information" className="space-y-3 scroll-mt-6">
            <h2 className="text-sm font-bold text-obsidian uppercase tracking-wider font-display border-b border-obsidian/5 pb-2">
              9. Contact Information
            </h2>
            <p>
              For privacy concerns, data deletion requests, or general inquiries, contact us at:
            </p>
            <p className="bg-cream p-4 border border-obsidian/5 rounded-2xl font-mono text-[10px] space-y-1">
              <span className="block"><strong>Wandertribe Privacy Office</strong></span>
              <span className="block">Email: [REAL_BUSINESS_EMAIL]</span>
              <span className="block">Address: [REAL_BUSINESS_ADDRESS]</span>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

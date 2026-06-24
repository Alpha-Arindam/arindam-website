import { useEffect } from 'react';
import { ArrowLeft, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

interface CompanyDetailsProps {
  slug: string;
}

export default function CompanyDetails({ slug }: CompanyDetailsProps) {
  useEffect(() => {
    if (slug === 'coderlook-solutions') {
      window.location.replace('https://coderlook.com');
    } else {
      document.title = 'Coderlook Solutions — Career Details';
      window.scrollTo(0, 0);
    }
  }, [slug]);

  const handleBack = () => {
    // If opened in a new tab, we can try to close it, or redirect back
    if (window.opener) {
      window.close();
    } else {
      window.location.href = '/';
    }
  };

  if (slug !== 'coderlook-solutions') {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center p-8 font-sans">
        <h1 className="text-4xl font-bold text-[#1d1d1f] tracking-tight">404 - Not Found</h1>
        <p className="text-[#7a7a7a] mt-4 mb-8">The requested company node was not found.</p>
        <button onClick={handleBack} className="inline-flex items-center gap-2 text-[#0066cc] hover:underline font-semibold">
          <ArrowLeft size={16} /> Return to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] antialiased font-sans selection:bg-[#0066cc]/10 selection:text-[#0066cc]">
      {/* ── Slim Frosted Sub-Nav ── */}
      <header className="sticky top-0 z-50 bg-[#f5f5f7]/80 backdrop-blur-xl border-b border-[#e0e0e0] h-[52px]">
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 select-none">
            <span className="font-mono text-xs font-bold bg-[#1d1d1f] text-white px-2 py-1 rounded">AB.NODE</span>
            <h2 className="text-sm font-semibold tracking-tight text-[#1d1d1f]">Coderlook Solutions</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#22c55e] font-medium bg-[#22c55e]/10 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              Currently Working
            </span>
            <button 
              onClick={handleBack}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#0066cc] hover:text-[#0071e3] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero Tile (Parchment off-white) ── */}
        <section className="bg-[#f5f5f7] py-24 px-6 text-center overflow-hidden border-b border-[#e0e0e0]">
          <div className="max-w-[980px] mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-[#1d1d1f]/5 border border-[#1d1d1f]/10 text-xs font-semibold uppercase tracking-wider text-[#7a7a7a]">
              Active Deployment Record
            </div>
            
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight text-[#1d1d1f] leading-[1.07] -letter-spacing-[0.03em]">
              Coderlook Solutions Pvt. Ltd.
            </h1>
            
            <p className="text-xl sm:text-2xl font-light text-[#7a7a7a] max-w-2xl mx-auto mt-6 leading-relaxed">
              Seven years of engineering progression from Core Developer to Technical Lead, architecting enterprise systems across Health, Fintech, and Real Estate.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-[#7a7a7a] font-medium select-none">
              <span className="flex items-center gap-1.5">
                <Calendar size={15} className="text-[#7a7a7a]" />
                August 2019 — Present
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-[#7a7a7a]" />
                Kolkata, India (Remote)
              </span>
            </div>

            {/* Premium center graphic with single soft shadow */}
            <div className="mt-16 max-w-[500px] mx-auto relative group">
              <div className="absolute inset-0 bg-[#0066cc]/5 blur-3xl rounded-full opacity-60 pointer-events-none" />
              <div className="relative bg-white rounded-3xl p-8 border border-[#e0e0e0] shadow-[rgba(0,0,0,0.12)_3px_5px_30px_0] transition-transform duration-500 hover:scale-[1.01] select-none">
                <div className="grid grid-cols-3 gap-6 text-center font-mono">
                  <div className="border-r border-[#f0f0f0] py-2">
                    <div className="text-3xl font-bold text-[#0066cc]">7+</div>
                    <div className="text-[10px] text-[#7a7a7a] uppercase tracking-wider mt-1.5 font-bold">Shipped Ships</div>
                  </div>
                  <div className="border-r border-[#f0f0f0] py-2">
                    <div className="text-3xl font-bold text-[#0066cc]">4+</div>
                    <div className="text-[10px] text-[#7a7a7a] uppercase tracking-wider mt-1.5 font-bold">Mentored</div>
                  </div>
                  <div className="py-2">
                    <div className="text-3xl font-bold text-[#0066cc]">99%</div>
                    <div className="text-[10px] text-[#7a7a7a] uppercase tracking-wider mt-1.5 font-bold">Uptime SLA</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Timeline Role 1: Technical Lead (Dark Tile) ── */}
        <section className="bg-[#272729] text-white py-24 px-6 relative overflow-hidden border-b border-[#000]">
          <div className="max-w-[980px] mx-auto grid md:grid-cols-[280px_1fr] gap-12 items-start">
            <div className="sticky top-[100px] select-none">
              <span className="text-xs font-mono font-bold tracking-widest text-[#2997ff] uppercase block mb-2">Phase 03</span>
              <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">Technical Lead</h2>
              <div className="text-sm font-mono text-[#cccccc] mt-2 flex items-center gap-1.5">
                <Calendar size={13} className="text-[#2997ff]" />
                2023 — Present
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Next.js v16', 'React v19', 'FastAPI', 'PostgreSQL v16', 'AWS S3/Cognito'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#2997ff]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-[#cccccc] leading-relaxed font-light">
                Directing frontend architectural strategies and full-stack integrations for high-volume enterprise systems.
              </p>
              <ul className="space-y-5">
                {[
                  'Architected multi-role real estate platform (Abdoun) using Next.js v16 and React v19, delivering SSR-optimized pages for improved Core Web Vitals and organic search performance.',
                  'Implemented role-based access control (RBAC) with AWS Cognito authentication and OTP verification, securing multi-tenant context.',
                  'Built FastAPI REST endpoints and PostgreSQL v16 schemas for property listing, lead workflows, and S3 secure storage.',
                  'Delivered property approval workflows and live analytics dashboards, providing Admins and Agents with operational visibility.',
                  'Mentored 4+ developers, established frontend architecture, and integrated AI features via OpenAI API in production.'
                ].map((hl, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-sm text-[#cccccc] leading-relaxed">
                    <CheckCircle2 size={16} className="text-[#2997ff] mt-1 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Timeline Role 2: Senior Frontend Developer (Light Tile) ── */}
        <section className="bg-white text-[#1d1d1f] py-24 px-6 relative overflow-hidden border-b border-[#e0e0e0]">
          <div className="max-w-[980px] mx-auto grid md:grid-cols-[280px_1fr] gap-12 items-start">
            <div className="sticky top-[100px] select-none">
              <span className="text-xs font-mono font-bold tracking-widest text-[#0066cc] uppercase block mb-2">Phase 02</span>
              <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f] leading-tight">Senior Frontend Developer</h2>
              <div className="text-sm font-mono text-[#7a7a7a] mt-2 flex items-center gap-1.5">
                <Calendar size={13} className="text-[#0066cc]" />
                2021 — 2023
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['React', 'Angular', 'Ionic', 'Redux Toolkit', 'D3.js', 'Jest / RTL'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs font-medium text-[#1d1d1f]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-[#7a7a7a] leading-relaxed font-light">
                Optimizing large-scale micro-frontends and cross-platform mobile apps for legal and medical industries.
              </p>
              <ul className="space-y-5">
                {[
                  'Designed and delivered 8+ reusable React component modules for SellPoint analytics, reducing feature delivery cycles by ~25% through component libraries.',
                  'Introduced OnPush change detection and standalone component patterns in Angular case management (Nucleus) to cut initial bundle size by 35% and improve Time-to-Interactive.',
                  'Developed responsive Ionic mobile applications for SenoClock digital health, ensuring consistent cross-platform iOS/Android UX.',
                  'Achieved WCAG 2.2 AA accessibility compliance across all patient-facing flows to meet healthcare requirements.',
                  'Integrated frontend with AWS-hosted reporting services, enabling real-time updates and offline-tolerant interactions.'
                ].map((hl, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-sm text-[#7a7a7a] leading-relaxed">
                    <CheckCircle2 size={16} className="text-[#0066cc] mt-1 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Timeline Role 3: Frontend Developer (Dark Tile 2) ── */}
        <section className="bg-[#2a2a2c] text-white py-24 px-6 relative overflow-hidden border-b border-[#000]">
          <div className="max-w-[980px] mx-auto grid md:grid-cols-[280px_1fr] gap-12 items-start">
            <div className="sticky top-[100px] select-none">
              <span className="text-xs font-mono font-bold tracking-widest text-[#2997ff] uppercase block mb-2">Phase 01</span>
              <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">Frontend Developer</h2>
              <div className="text-sm font-mono text-[#cccccc] mt-2 flex items-center gap-1.5">
                <Calendar size={13} className="text-[#2997ff]" />
                2019 — 2021
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Angular', 'Angular Material', 'Bootstrap', 'Spring Boot', 'MySQL'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#2997ff]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-[#cccccc] leading-relaxed font-light">
                Collaborating on interface features, layouts, and data schema designs for Fintech portals.
              </p>
              <ul className="space-y-5">
                {[
                  'Served as primary frontend liaison for wealth management stakeholder discussions, translating requirements into Angular onboarding UIs.',
                  'Designed complex reporting views and portfolio components, enabling managers to manage client accounts at scale.',
                  'Enforced frontend code review practices and sprint delivery discipline across the team.',
                  'Partnered with Business Analysts to convert ambiguous stakeholder requirements into precise UI specifications and component libraries.'
                ].map((hl, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-sm text-[#cccccc] leading-relaxed">
                    <CheckCircle2 size={16} className="text-[#2997ff] mt-1 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* ── Apple Style Fine Print Footer ── */}
      <footer className="bg-[#f5f5f7] py-16 px-6 border-t border-[#e0e0e0] select-none">
        <div className="max-w-[980px] mx-auto">
          <div className="text-xs text-[#7a7a7a] leading-relaxed space-y-4 border-b border-[#e0e0e0] pb-8 mb-8 font-light">
            <p>
              1. Coderlook Solutions Pvt. Ltd. career timeline calculations are based on uninterrupted employment starting August 2019 to Present. Metric measurements representing bundle size reductions (-35%) and delivery cycles improvements (~25%) represent verified production telemetry.
            </p>
            <p>
              2. Dedicated pages are created for educational and developer assessment presentation purposes. Design tokens, color presets, spacing metrics, and SF Pro substituted typography follow the system-wide Alpha specifications verified under the Apple-design-analysis style guide.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7a7a7a] font-light">
            <div>
              © {new Date().getFullYear()} Arindam Betal. All rights reserved.
            </div>
            <button onClick={handleBack} className="text-[#0066cc] hover:underline font-medium inline-flex items-center gap-1">
              Return to Portfolio main page
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

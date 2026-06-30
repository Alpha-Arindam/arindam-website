'use client';

import { useEffect } from 'react';
import { ArrowLeft, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../locales';

interface CompanyDetailsProps {
  slug: string;
}

export default function CompanyDetails({ slug }: CompanyDetailsProps) {
  const { t } = useI18n();

  useEffect(() => {
    if (slug === 'coderlook-solutions') {
      window.location.replace('https://coderlook.com');
    } else {
      document.title = 'Coderlook Solutions — Career Details';
      window.scrollTo(0, 0);
    }
  }, [slug]);

  const handleBack = () => {
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

  const role1Highlights = [
    t('experience.roles.techLead.highlights.0'),
    t('experience.roles.techLead.highlights.1'),
    t('experience.roles.techLead.highlights.2'),
    t('experience.roles.techLead.highlights.3'),
    t('experience.roles.techLead.highlights.4')
  ];

  const role2Highlights = [
    t('experience.roles.seniorDev.highlights.0'),
    t('experience.roles.seniorDev.highlights.1'),
    t('experience.roles.seniorDev.highlights.2'),
    t('experience.roles.seniorDev.highlights.3'),
    t('experience.roles.seniorDev.highlights.4')
  ];

  const role3Highlights = [
    t('experience.roles.frontendDev.highlights.0'),
    t('experience.roles.frontendDev.highlights.1'),
    t('experience.roles.frontendDev.highlights.2'),
    t('experience.roles.frontendDev.highlights.3')
  ];

  return (
    <div className="min-h-screen bg-white text-[#1d1d1f] antialiased font-sans selection:bg-[#0066cc]/10 selection:text-[#0066cc]">
      {/* ── Slim Frosted Sub-Nav ── */}
      <header className="sticky top-0 z-50 bg-[#f5f5f7]/80 backdrop-blur-xl border-b border-[#e0e0e0] h-[52px]">
        <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 select-none">
            <span className="font-mono text-xs font-bold bg-[#1d1d1f] text-white px-2 py-1 rounded">AB.NODE</span>
            <h2 className="text-sm font-semibold tracking-tight text-[#1d1d1f]">{t('companyDetails.subnavTitle')}</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#22c55e] font-medium bg-[#22c55e]/10 px-2.5 py-1 rounded-full select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              {t('companyDetails.currentlyWorking')}
            </span>
            <button 
              onClick={handleBack}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#0066cc] hover:text-[#0071e3] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>{t('companyDetails.back')}</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero Tile (Parchment off-white) ── */}
        <section className="bg-[#f5f5f7] py-24 px-6 text-center overflow-hidden border-b border-[#e0e0e0]">
          <div className="max-w-[980px] mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-[#1d1d1f]/5 border border-[#1d1d1f]/10 text-xs font-semibold uppercase tracking-wider text-[#7a7a7a] select-none">
              {t('companyDetails.activeDeploymentRecord')}
            </div>
            
            <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-bold tracking-tight text-[#1d1d1f] leading-[1.07] -letter-spacing-[0.03em]">
              Coderlook Solutions Pvt. Ltd.
            </h1>
            
            <p className="text-xl sm:text-2xl font-light text-[#7a7a7a] max-w-2xl mx-auto mt-6 leading-relaxed">
              {t('experience.timelineSubtitle')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-[#7a7a7a] font-medium select-none">
              <span className="flex items-center gap-1.5 font-mono">
                <Calendar size={15} className="text-[#7a7a7a]" />
                {t('companyDetails.activePeriod')}
              </span>
              <span className="text-gray-300 select-none">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-[#7a7a7a]" />
                {t('companyDetails.activeLocation')}
              </span>
            </div>

            {/* Premium center graphic with single soft shadow */}
            <div className="mt-16 max-w-[500px] mx-auto relative group">
              <div className="absolute inset-0 bg-[#0066cc]/5 blur-3xl rounded-full opacity-60 pointer-events-none" />
              <div className="relative bg-white rounded-3xl p-8 border border-[#e0e0e0] shadow-[rgba(0,0,0,0.12)_3px_5px_30px_0] transition-transform duration-500 hover:scale-[1.01] select-none">
                <div className="grid grid-cols-3 gap-6 text-center font-mono">
                  <div className="border-r border-[#f0f0f0] py-2">
                    <div className="text-3xl font-bold text-[#0066cc]">7+</div>
                    <div className="text-[10px] text-[#7a7a7a] uppercase tracking-wider mt-1.5 font-bold">{t('companyDetails.shippedShips')}</div>
                  </div>
                  <div className="border-r border-[#f0f0f0] py-2">
                    <div className="text-3xl font-bold text-[#0066cc]">4+</div>
                    <div className="text-[10px] text-[#7a7a7a] uppercase tracking-wider mt-1.5 font-bold">{t('companyDetails.mentored')}</div>
                  </div>
                  <div className="py-2">
                    <div className="text-3xl font-bold text-[#0066cc]">99%</div>
                    <div className="text-[10px] text-[#7a7a7a] uppercase tracking-wider mt-1.5 font-bold">{t('companyDetails.uptimeSla')}</div>
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
              <span className="text-xs font-mono font-bold tracking-widest text-[#2997ff] uppercase block mb-2">{t('companyDetails.phase3')}</span>
              <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">{t('companyDetails.role1')}</h2>
              <div className="text-sm font-mono text-[#cccccc] mt-2 flex items-center gap-1.5">
                <Calendar size={13} className="text-[#2997ff]" />
                {t('companyDetails.role1Duration')}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Next.js v16', 'React v19', 'FastAPI', 'PostgreSQL v16', 'AWS S3/Cognito'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#2997ff] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-[#cccccc] leading-relaxed font-light">
                {t('companyDetails.role1Description')}
              </p>
              <ul className="space-y-5">
                {role1Highlights.map((hl, i) => (
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
              <span className="text-xs font-mono font-bold tracking-widest text-[#0066cc] uppercase block mb-2">{t('companyDetails.phase2')}</span>
              <h2 className="text-3xl font-bold tracking-tight text-[#1d1d1f] leading-tight">{t('companyDetails.role2')}</h2>
              <div className="text-sm font-mono text-[#7a7a7a] mt-2 flex items-center gap-1.5">
                <Calendar size={13} className="text-[#0066cc]" />
                {t('companyDetails.role2Duration')}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['React', 'Angular', 'Ionic', 'Redux Toolkit', 'D3.js', 'Jest / RTL'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-xs font-medium text-[#1d1d1f] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-[#7a7a7a] leading-relaxed font-light">
                {t('companyDetails.role2Description')}
              </p>
              <ul className="space-y-5">
                {role2Highlights.map((hl, i) => (
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
              <span className="text-xs font-mono font-bold tracking-widest text-[#2997ff] uppercase block mb-2">{t('companyDetails.phase1')}</span>
              <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">{t('companyDetails.role3')}</h2>
              <div className="text-sm font-mono text-[#cccccc] mt-2 flex items-center gap-1.5">
                <Calendar size={13} className="text-[#2997ff]" />
                {t('companyDetails.role3Duration')}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Angular', 'Angular Material', 'Bootstrap', 'Spring Boot', 'MySQL'].map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#2997ff] font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-xl text-[#cccccc] leading-relaxed font-light">
                {t('companyDetails.role3Description')}
              </p>
              <ul className="space-y-5">
                {role3Highlights.map((hl, i) => (
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
              {t('companyDetails.footnote1')}
            </p>
            <p>
              {t('companyDetails.footnote2')}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7a7a7a] font-light">
            <div>
              {t('companyDetails.copyright', { year: new Date().getFullYear() })}
            </div>
            <button onClick={handleBack} className="text-[#0066cc] hover:underline font-medium inline-flex items-center gap-1">
              {t('companyDetails.returnToPortfolio')}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

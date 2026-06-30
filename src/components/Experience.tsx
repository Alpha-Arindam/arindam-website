'use client';

import { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { Calendar, MapPin, ChevronRight, Briefcase } from 'lucide-react';
import { useI18n } from '../locales';

interface RoleHighlight {
  title: string;
  period: string;
  highlights: string[];
  stats: { label: string; value: string }[];
  radarPoints: string; // Polygon points for SVG radar chart
}

export default function Experience() {
  const { t, language } = useI18n();
  const headingRef = useInView({ threshold: 0.1 });
  const cardRef = useInView({ threshold: 0.05 });

  const deploymentRoles: RoleHighlight[] = [
    {
      title: t('experience.roles.techLead.title'),
      period: t('experience.roles.techLead.duration'),
      highlights: [
        t('experience.roles.techLead.highlights.0'),
        t('experience.roles.techLead.highlights.1'),
        t('experience.roles.techLead.highlights.2'),
        t('experience.roles.techLead.highlights.3'),
        t('experience.roles.techLead.highlights.4')
      ],
      stats: [
        { label: t('experience.roles.techLead.stats.0.label'), value: t('experience.roles.techLead.stats.0.value') },
        { label: t('experience.roles.techLead.stats.1.label'), value: t('experience.roles.techLead.stats.1.value') },
        { label: t('experience.roles.techLead.stats.2.label'), value: t('experience.roles.techLead.stats.2.value') }
      ],
      radarPoints: '100,25 172,48 152,145 42,145 32,48'
    },
    {
      title: t('experience.roles.seniorDev.title'),
      period: t('experience.roles.seniorDev.duration'),
      highlights: [
        t('experience.roles.seniorDev.highlights.0'),
        t('experience.roles.seniorDev.highlights.1'),
        t('experience.roles.seniorDev.highlights.2'),
        t('experience.roles.seniorDev.highlights.3'),
        t('experience.roles.seniorDev.highlights.4')
      ],
      stats: [
        { label: t('experience.roles.seniorDev.stats.0.label'), value: t('experience.roles.seniorDev.stats.0.value') },
        { label: t('experience.roles.seniorDev.stats.1.label'), value: t('experience.roles.seniorDev.stats.1.value') },
        { label: t('experience.roles.seniorDev.stats.2.label'), value: t('experience.roles.seniorDev.stats.2.value') }
      ],
      radarPoints: '100,36 140,70 145,138 38,149 24,40'
    },
    {
      title: t('experience.roles.frontendDev.title'),
      period: t('experience.roles.frontendDev.duration'),
      highlights: [
        t('experience.roles.frontendDev.highlights.0'),
        t('experience.roles.frontendDev.highlights.1'),
        t('experience.roles.frontendDev.highlights.2'),
        t('experience.roles.frontendDev.highlights.3')
      ],
      stats: [
        { label: t('experience.roles.frontendDev.stats.0.label'), value: t('experience.roles.frontendDev.stats.0.value') },
        { label: t('experience.roles.frontendDev.stats.1.label'), value: t('experience.roles.frontendDev.stats.1.value') },
        { label: t('experience.roles.frontendDev.stats.2.label'), value: t('experience.roles.frontendDev.stats.2.value') }
      ],
      radarPoints: '100,50 119,94 136,126 40,144 24,76'
    }
  ];

  const projects = [
    {
      name: t('experience.projects.abdoun.name'),
      domain: t('experience.projects.abdoun.domain'),
      tech: ['Next.js v16', 'React v19', 'FastAPI', 'PostgreSQL v16', 'AWS S3/Cognito'],
      bullets: [
        t('experience.projects.abdoun.bullets.0'),
        t('experience.projects.abdoun.bullets.1'),
        t('experience.projects.abdoun.bullets.2')
      ]
    },
    {
      name: t('experience.projects.sellpoint.name'),
      domain: t('experience.projects.sellpoint.domain'),
      tech: ['React.js v17-v18', 'TypeScript', 'Redux Toolkit', 'REST APIs', 'D3.js'],
      bullets: [
        t('experience.projects.sellpoint.bullets.0'),
        t('experience.projects.sellpoint.bullets.1'),
        t('experience.projects.sellpoint.bullets.2')
      ]
    },
    {
      name: t('experience.projects.nucleus.name'),
      domain: t('experience.projects.nucleus.domain'),
      tech: ['Angular v14-v17', 'NgRx', 'Spring Boot v3.x', 'PostgreSQL v15', 'Keycloak'],
      bullets: [
        t('experience.projects.nucleus.bullets.0'),
        t('experience.projects.nucleus.bullets.1'),
        t('experience.projects.nucleus.bullets.2')
      ]
    },
    {
      name: t('experience.projects.senoclock.name'),
      domain: t('experience.projects.senoclock.domain'),
      tech: ['React Ionic v6-v7', 'TypeScript', 'Tailwind CSS v3', 'PostgreSQL v14', 'AWS'],
      bullets: [
        t('experience.projects.senoclock.bullets.0'),
        t('experience.projects.senoclock.bullets.1'),
        t('experience.projects.senoclock.bullets.2')
      ]
    },
    {
      name: t('experience.projects.molcom.name'),
      domain: t('experience.projects.molcom.domain'),
      tech: ['Angular v10-v14', 'Angular Material', 'Bootstrap v5', 'Spring Boot v2.x', 'MySQL v8.0'],
      bullets: [
        t('experience.projects.molcom.bullets.0'),
        t('experience.projects.molcom.bullets.1'),
        t('experience.projects.molcom.bullets.2')
      ]
    },
    {
      name: t('experience.projects.pethealth.name'),
      domain: t('experience.projects.pethealth.domain'),
      tech: ['React v18', 'TypeScript v5', 'Vite v5-v6', 'Redux Toolkit v2', 'Jest / RTL'],
      bullets: [
        t('experience.projects.pethealth.bullets.0'),
        t('experience.projects.pethealth.bullets.1'),
        t('experience.projects.pethealth.bullets.2')
      ]
    }
  ];

  const [activeRole, setActiveRole] = useState<RoleHighlight>(deploymentRoles[0]);

  // Synchronize state when language changes to prevent displaying old translations
  useEffect(() => {
    const matched = deploymentRoles.find((r) => r.radarPoints === activeRole.radarPoints);
    if (matched) {
      setActiveRole(matched);
    } else {
      setActiveRole(deploymentRoles[0]);
    }
  }, [language]);

  return (
    <section id="experience" className="py-24 bg-white dark:bg-surface-900 relative">
      <div className="section-container">
        
        {/* Title */}
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className="opacity-0 [&.in-view]:animate-fade-up mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-900 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest mb-4">
            {t('experience.sectionTitle')}
          </div>
          <h2 className="section-heading text-surface-900 dark:text-white font-mono">
            {t('experience.headingRecord')}
          </h2>
          <p className="section-subheading">
            {t('experience.timelineSubtitle')}
          </p>
        </div>

        {/* Split Timeline Dashboard */}
        <div
          ref={cardRef as React.RefObject<HTMLDivElement>}
          className="grid lg:grid-cols-[1fr_360px] gap-8 opacity-0 [&.in-view]:animate-fade-up items-start mb-16"
        >
          {/* LEFT: Deployment Description & Metrics */}
          <div className="relative rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-slate-950/30 p-6 sm:p-8">
            {/* Cybernetic Corner Brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-5 h-5 border-t-2 border-l-2 border-indigo-500 rounded-tl-2xl pointer-events-none" />
            <div className="absolute -top-[1px] -right-[1px] w-5 h-5 border-t-2 border-r-2 border-indigo-500 rounded-tr-2xl pointer-events-none" />
            <div className="absolute -bottom-[1px] -left-[1px] w-5 h-5 border-b-2 border-l-2 border-indigo-500 rounded-bl-2xl pointer-events-none" />
            <div className="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-b-2 border-r-2 border-indigo-500 rounded-br-2xl pointer-events-none" />

            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-slate-200 dark:border-white/[0.06] pb-6 mb-6">
              <div>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest font-bold block mb-1">
                  {t('experience.activeDeploymentNode')}
                </span>
                <h3 className="text-xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
                  <a
                    href="https://coderlook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors underline decoration-dotted decoration-indigo-500/40"
                  >
                    Coderlook Solutions Pvt. Ltd.
                  </a>
                </h3>
                {/* Role Switcher tabs */}
                <div className="flex gap-2 mt-4 select-none flex-wrap">
                  {deploymentRoles.map((role, idx) => {
                    const isActive = activeRole.radarPoints === role.radarPoints;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveRole(role)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                          isActive
                            ? 'bg-indigo-500 border-indigo-600 text-white shadow-lg shadow-indigo-500/10'
                            : 'bg-white dark:bg-surface-900 border-slate-200 dark:border-white/[0.04] text-slate-500 hover:bg-slate-100 dark:hover:bg-white/[0.02]'
                        }`}
                      >
                        {role.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Deployment specs */}
              <div className="flex flex-col gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono mt-4 sm:mt-0 sm:text-right select-none shrink-0">
                <div className="flex items-center gap-1.5 sm:justify-end">
                  <Calendar size={12} className="text-indigo-400" />
                  {activeRole.period}
                </div>
                <div className="flex items-center gap-1.5 sm:justify-end">
                  <MapPin size={12} className="text-indigo-400" />
                  Kolkata, India
                </div>
                <div className="flex items-center gap-1.5 sm:justify-end text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t('experience.stableOperation')}
                </div>
              </div>
            </div>

            {/* Bullets */}
            <ul className="space-y-4 mb-8">
              {activeRole.highlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-surface-600 dark:text-surface-300 leading-relaxed">
                  <ChevronRight size={16} className="text-indigo-500 mt-1 shrink-0" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>

            {/* Micro stats for role */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-white/[0.06] pt-6 bg-slate-100/30 dark:bg-slate-950/20 -mx-6 sm:-mx-8 px-6 sm:px-8 -mb-6 sm:-mb-8 py-5 rounded-b-2xl">
              {activeRole.stats.map((stat, idx) => (
                <div key={idx} className="text-center font-mono">
                  <div className="text-lg sm:text-xl font-bold text-indigo-500 dark:text-indigo-400">{stat.value}</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 uppercase tracking-wider mt-1 font-bold leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Capabilities Radar Chart Panel */}
          <div className="relative rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-slate-950/30 p-6 flex flex-col items-center justify-center">
            {/* Corner brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-5 h-5 border-t-2 border-l-2 border-indigo-500 rounded-tl-2xl pointer-events-none" />
            <div className="absolute -top-[1px] -right-[1px] w-5 h-5 border-t-2 border-r-2 border-indigo-500 rounded-tr-2xl pointer-events-none" />
            <div className="absolute -bottom-[1px] -left-[1px] w-5 h-5 border-b-2 border-l-2 border-indigo-500 rounded-bl-2xl pointer-events-none" />
            <div className="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-b-2 border-r-2 border-indigo-500 rounded-br-2xl pointer-events-none" />

            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest font-bold mb-4 select-none">
              {t('experience.capabilitiesTelemetry')}
            </span>

            {/* SVG Radar Chart */}
            <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] select-none">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Background Concentric pentagons */}
                <polygon points="100,20 180,78 150,170 50,170 20,78" fill="none" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
                <polygon points="100,45 158,87 136,150 64,150 42,87" fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="1" />
                <polygon points="100,70 137,96 122,130 78,130 63,96" fill="none" stroke="rgba(99,102,241,0.18)" strokeWidth="1" />

                {/* Radar grid axis lines */}
                <line x1="100" y1="100" x2="100" y2="20" stroke="rgba(255,255,255,0.08)" strokeDasharray="3,3" />
                <line x1="100" y1="100" x2="180" y2="78" stroke="rgba(255,255,255,0.08)" strokeDasharray="3,3" />
                <line x1="100" y1="100" x2="150" y2="170" stroke="rgba(255,255,255,0.08)" strokeDasharray="3,3" />
                <line x1="100" y1="100" x2="50" y2="170" stroke="rgba(255,255,255,0.08)" strokeDasharray="3,3" />
                <line x1="100" y1="100" x2="20" y2="78" stroke="rgba(255,255,255,0.08)" strokeDasharray="3,3" />

                {/* Glow under active polygon */}
                <polygon
                  points={activeRole.radarPoints}
                  fill="rgba(99,102,241,0.15)"
                  className="transition-all duration-700 ease-out"
                />

                {/* Outline of active polygon */}
                <polygon
                  points={activeRole.radarPoints}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                  className="transition-all duration-700 ease-out"
                />

                {/* Point nodes */}
                {activeRole.radarPoints.split(' ').map((p, i) => {
                  const [x, y] = p.split(',');
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="4"
                      className="fill-sky-400 transition-all duration-700 ease-out"
                      stroke="#6366f1"
                      strokeWidth="1.5"
                    />
                  );
                })}
              </svg>

              {/* Labels */}
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-indigo-400">{t('experience.radarArch')}</span>
              <span className="absolute top-[68px] -right-3 text-[9px] font-mono font-bold text-indigo-400">{t('experience.radarLead')}</span>
              <span className="absolute -bottom-2 right-6 text-[9px] font-mono font-bold text-indigo-400">{t('experience.radarCode')}</span>
              <span className="absolute -bottom-2 left-6 text-[9px] font-mono font-bold text-indigo-400">{t('experience.radarPerf')}</span>
              <span className="absolute top-[68px] -left-2 text-[9px] font-mono font-bold text-indigo-400">{t('experience.radarUX')}</span>
            </div>

            <div className="mt-8 text-center text-xs text-slate-500 font-mono leading-relaxed select-text border-t border-slate-200 dark:border-white/[0.04] pt-4 w-full">
              <span className="text-[10px] text-slate-600 font-bold block mb-1">{t('experience.moduleSpecs')}</span>
              <p>{t('experience.capabilitiesDesc')}</p>
            </div>
          </div>
        </div>

        {/* Project Cards */}
        <div>
          <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-6 flex items-center gap-2 select-none font-mono">
            <Briefcase size={16} className="text-indigo-500" />
            {t('experience.projectShippedLogs')}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => {
              const pRef = useInView({ threshold: 0.05 });
              return (
                <div
                  key={project.name}
                  ref={pRef as React.RefObject<HTMLDivElement>}
                  className="card opacity-0 [&.in-view]:animate-fade-up p-5 flex flex-col group hover:-translate-y-1 relative overflow-hidden"
                  style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
                >
                  {/* Glowing card outline on hover */}
                  <div className="absolute inset-0 border border-indigo-500/0 group-hover:border-indigo-500/20 transition-colors pointer-events-none rounded-2xl" />

                  <div className="mb-3 select-none">
                    <h4 className="font-bold text-surface-900 dark:text-white text-base group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                      {project.name}
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {project.domain}
                    </span>
                  </div>

                  <ul className="space-y-1.5 mb-4 flex-1">
                    {project.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-surface-600 dark:text-surface-400 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/40 mt-1.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-surface-100 dark:border-surface-700/60 select-none">
                    {project.tech.map((t) => (
                      <span key={t} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-500/5 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10 dark:border-indigo-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

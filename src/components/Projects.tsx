import { useInView } from '../hooks/useInView';
import { ExternalLink, TrendingUp } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Abdoun Real Estate Platform',
    description: 'Multi-role property listing and search platform (User, Owner, Agent, Admin) featuring Next.js and React, delivering SSR-optimized listing pages for improved Core Web Vitals.',
    tech: ['Next.js v16', 'React v19', 'FastAPI', 'PostgreSQL v16', 'AWS S3/Cognito'],
    metrics: [
      { label: 'Faster page loads', value: '40%' },
      { label: 'SEO traffic growth', value: '3x' },
      { label: 'Properties indexed', value: '10K+' },
    ],
    category: 'Real Estate',
    accent: 'blue',
  },
  {
    title: 'SellPoint Analytics Dashboard',
    description: 'Real-time analytics dashboards and KPI tracking platform. Reduced feature delivery cycles by ~25% using shared component libraries and established code review guidelines.',
    tech: ['React.js v17-v18', 'TypeScript', 'Redux Toolkit', 'D3.js', 'REST APIs'],
    metrics: [
      { label: 'Delivery speedup', value: '25%' },
      { label: 'Reusable modules', value: '8+' },
      { label: 'Visualized data', value: '1M+' },
    ],
    category: 'SaaS / Analytics',
    accent: 'green',
  },
  {
    title: 'Nucleus Case Management',
    description: 'Enterprise case management platform featuring Angular microservices with Keycloak OAuth2/OIDC security. Introduced OnPush change detection and standalone component patterns.',
    tech: ['Angular v14-v17', 'NgRx', 'Spring Boot v3.x', 'PostgreSQL v15', 'Keycloak'],
    metrics: [
      { label: 'Bundle reduction', value: '-35%' },
      { label: 'Active users', value: '500+' },
      { label: 'Uptime SLA', value: '99.9%' },
    ],
    category: 'Enterprise / Legal',
    accent: 'orange',
  },
  {
    title: 'SenoClock Digital Health Platform',
    description: 'Cross-platform mobile application built using React Ionic, delivering a consistent iOS and Android UX. Achieved strict WCAG 2.2 AA digital accessibility compliance.',
    tech: ['React Ionic v6-v7', 'TypeScript', 'Tailwind CSS v3', 'PostgreSQL v14', 'AWS'],
    metrics: [
      { label: 'Accessibility level', value: 'AA 2.2' },
      { label: 'Crash-free rate', value: '98%' },
      { label: 'Onboarding time', value: '-70%' },
    ],
    category: 'Healthcare / Mobile',
    accent: 'teal',
  },
  {
    title: 'Pet Health & Veterinary Care Platform',
    description: 'Smart pet healthcare management platform with appointment scheduling and treatment tracking. Achieved robust component coverage using React Testing Library and Jest v29.',
    tech: ['React v18', 'TypeScript v5', 'Vite v5-v6', 'Redux Toolkit v2', 'Jest / RTL'],
    metrics: [
      { label: 'Jest Test Coverage', value: '92%' },
      { label: 'Lighthouse Score', value: '95+' },
      { label: 'AI accuracy rate', value: '89%' },
    ],
    category: 'Veterinary Care',
    accent: 'rose',
  },
  {
    title: 'Molcom & Wisebaron Wealth Portals',
    description: 'Client-facing wealth dashboards and portfolio management onboarding UIs. Enforced sprint delivery and frontend code review practices across the team.',
    tech: ['Angular v10-v14', 'Angular Material', 'Bootstrap v5', 'Spring Boot v2.x', 'MySQL v8.0'],
    metrics: [
      { label: 'Accessibility level', value: 'AA 2.2' },
      { label: 'AUM tracked', value: '$2B+' },
      { label: 'Client retention', value: '97%' },
    ],
    category: 'Fintech',
    accent: 'amber',
  },
];

const ACCENT_CLASSES: Record<string, { badge: string; metric: string; border: string }> = {
  blue: {
    badge: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    metric: 'text-blue-600 dark:text-blue-400',
    border: 'border-t-blue-500',
  },
  green: {
    badge: 'bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
    metric: 'text-green-600 dark:text-green-400',
    border: 'border-t-green-500',
  },
  orange: {
    badge: 'bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    metric: 'text-orange-600 dark:text-orange-400',
    border: 'border-t-orange-500',
  },
  teal: {
    badge: 'bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    metric: 'text-teal-600 dark:text-teal-400',
    border: 'border-t-teal-500',
  },
  rose: {
    badge: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    metric: 'text-rose-600 dark:text-rose-400',
    border: 'border-t-rose-500',
  },
  amber: {
    badge: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    metric: 'text-amber-600 dark:text-amber-400',
    border: 'border-t-amber-500',
  },
};

export default function Projects() {
  const headingRef = useInView({ threshold: 0.1 });

  return (
    <section id="projects" className="py-24 bg-surface-50 dark:bg-surface-950">
      <div className="section-container">
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className="opacity-0 [&.in-view]:animate-fade-up mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-900 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest mb-4">
            Portfolio
          </div>
          <h2 className="section-heading text-surface-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="section-subheading">
            Real-world enterprise applications shipped across multiple industries
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => {
            const cardRef = useInView({ threshold: 0.05 });
            const accentClasses = ACCENT_CLASSES[project.accent];
            return (
              <div
                key={project.title}
                ref={cardRef as React.RefObject<HTMLDivElement>}
                className={`card opacity-0 [&.in-view]:animate-fade-up flex flex-col border-t-2 ${accentClasses.border} hover:-translate-y-1`}
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mb-2 ${accentClasses.badge}`}>
                        {project.category}
                      </span>
                      <h3 className="font-bold text-surface-900 dark:text-white text-base leading-snug">
                        {project.title}
                      </h3>
                    </div>
                    <ExternalLink size={14} className="text-surface-300 dark:text-surface-600 mt-1 shrink-0" />
                  </div>

                  <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  {/* Impact metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-xl bg-surface-50 dark:bg-surface-700/50 border border-surface-100 dark:border-surface-700">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <div className={`text-sm font-bold ${accentClasses.metric}`}>{m.value}</div>
                        <div className="text-[10px] text-surface-400 dark:text-surface-500 leading-tight mt-0.5">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-600">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Impact summary */}
        <div className="mt-14 grid sm:grid-cols-3 gap-5">
          {[
            { icon: TrendingUp, value: '40–60%', label: 'Average performance improvement across projects', color: 'text-primary-600 dark:text-primary-400' },
            { icon: TrendingUp, value: '6 Domains', label: 'Healthcare, Fintech, Real Estate, Legal, SaaS, AI', color: 'text-accent-600 dark:text-accent-400' },
            { icon: TrendingUp, value: '20+ Ships', label: 'Features and full products delivered end-to-end', color: 'text-orange-600 dark:text-orange-400' },
          ].map((item) => {
            const ref = useInView({ threshold: 0.1 });
            return (
              <div
                key={item.label}
                ref={ref as React.RefObject<HTMLDivElement>}
                className="card opacity-0 [&.in-view]:animate-scale-in p-6 text-center"
                style={{ animationFillMode: 'forwards' }}
              >
                <div className={`text-3xl font-bold mb-2 ${item.color}`}>{item.value}</div>
                <div className="text-sm text-surface-500 dark:text-surface-400">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

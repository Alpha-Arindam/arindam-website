import { useInView } from '../hooks/useInView';
import { ExternalLink, TrendingUp } from 'lucide-react';
import { useI18n } from '../locales';

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
  const { t } = useI18n();
  const headingRef = useInView({ threshold: 0.1 });

  const projects = [
    {
      title: t('projects.projectList6.abdoun.title'),
      description: t('projects.projectList6.abdoun.description'),
      tech: ['Next.js v16', 'React v19', 'FastAPI', 'PostgreSQL v16', 'AWS S3/Cognito'],
      metrics: [
        { label: t('projects.projectList6.abdoun.metrics.0.label'), value: t('projects.projectList6.abdoun.metrics.0.value') },
        { label: t('projects.projectList6.abdoun.metrics.1.label'), value: t('projects.projectList6.abdoun.metrics.1.value') },
        { label: t('projects.projectList6.abdoun.metrics.2.label'), value: t('projects.projectList6.abdoun.metrics.2.value') },
      ],
      category: t('projects.projectList6.abdoun.category'),
      accent: 'blue',
    },
    {
      title: t('projects.projectList6.sellpoint.title'),
      description: t('projects.projectList6.sellpoint.description'),
      tech: ['React.js v17-v18', 'TypeScript', 'Redux Toolkit', 'D3.js', 'REST APIs'],
      metrics: [
        { label: t('projects.projectList6.sellpoint.metrics.0.label'), value: t('projects.projectList6.sellpoint.metrics.0.value') },
        { label: t('projects.projectList6.sellpoint.metrics.1.label'), value: t('projects.projectList6.sellpoint.metrics.1.value') },
        { label: t('projects.projectList6.sellpoint.metrics.2.label'), value: t('projects.projectList6.sellpoint.metrics.2.value') },
      ],
      category: t('projects.projectList6.sellpoint.category'),
      accent: 'green',
    },
    {
      title: t('projects.projectList6.nucleus.title'),
      description: t('projects.projectList6.nucleus.description'),
      tech: ['Angular v14-v17', 'NgRx', 'Spring Boot v3.x', 'PostgreSQL v15', 'Keycloak'],
      metrics: [
        { label: t('projects.projectList6.nucleus.metrics.0.label'), value: t('projects.projectList6.nucleus.metrics.0.value') },
        { label: t('projects.projectList6.nucleus.metrics.1.label'), value: t('projects.projectList6.nucleus.metrics.1.value') },
        { label: t('projects.projectList6.nucleus.metrics.2.label'), value: t('projects.projectList6.nucleus.metrics.2.value') },
      ],
      category: t('projects.projectList6.nucleus.category'),
      accent: 'orange',
    },
    {
      title: t('projects.projectList6.senoclock.title'),
      description: t('projects.projectList6.senoclock.description'),
      tech: ['React Ionic v6-v7', 'TypeScript', 'Tailwind CSS v3', 'PostgreSQL v14', 'AWS'],
      metrics: [
        { label: t('projects.projectList6.senoclock.metrics.0.label'), value: t('projects.projectList6.senoclock.metrics.0.value') },
        { label: t('projects.projectList6.senoclock.metrics.1.label'), value: t('projects.projectList6.senoclock.metrics.1.value') },
        { label: t('projects.projectList6.senoclock.metrics.2.label'), value: t('projects.projectList6.senoclock.metrics.2.value') },
      ],
      category: t('projects.projectList6.senoclock.category'),
      accent: 'teal',
    },
    {
      title: t('projects.projectList6.pethealth.title'),
      description: t('projects.projectList6.pethealth.description'),
      tech: ['React v18', 'TypeScript v5', 'Vite v5-v6', 'Redux Toolkit v2', 'Jest / RTL'],
      metrics: [
        { label: t('projects.projectList6.pethealth.metrics.0.label'), value: t('projects.projectList6.pethealth.metrics.0.value') },
        { label: t('projects.projectList6.pethealth.metrics.1.label'), value: t('projects.projectList6.pethealth.metrics.1.value') },
        { label: t('projects.projectList6.pethealth.metrics.2.label'), value: t('projects.projectList6.pethealth.metrics.2.value') },
      ],
      category: t('projects.projectList6.pethealth.category'),
      accent: 'rose',
    },
    {
      title: t('projects.projectList6.molcom.title'),
      description: t('projects.projectList6.molcom.description'),
      tech: ['Angular v10-v14', 'Angular Material', 'Bootstrap v5', 'Spring Boot v2.x', 'MySQL v8.0'],
      metrics: [
        { label: t('projects.projectList6.molcom.metrics.0.label'), value: t('projects.projectList6.molcom.metrics.0.value') },
        { label: t('projects.projectList6.molcom.metrics.1.label'), value: t('projects.projectList6.molcom.metrics.1.value') },
        { label: t('projects.projectList6.molcom.metrics.2.label'), value: t('projects.projectList6.molcom.metrics.2.value') },
      ],
      category: t('projects.projectList6.molcom.category'),
      accent: 'amber',
    },
  ];

  const impactSummary = [
    { icon: TrendingUp, value: '40–60%', label: t('projects.avgPerformance'), color: 'text-primary-600 dark:text-primary-400' },
    { icon: TrendingUp, value: t('projects.domainsCount'), label: t('projects.domainsDesc'), color: 'text-accent-600 dark:text-accent-400' },
    { icon: TrendingUp, value: t('projects.shipsCount'), label: t('projects.shipsDesc'), color: 'text-orange-600 dark:text-orange-400' },
  ];

  return (
    <section id="projects" className="py-24 bg-surface-50 dark:bg-surface-950">
      <div className="section-container">
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className="opacity-0 [&.in-view]:animate-fade-up mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-900 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest mb-4">
            {t('projects.sectionTitle')}
          </div>
          <h2 className="section-heading text-surface-900 dark:text-white">
            {t('projects.heading')}
          </h2>
          <p className="section-subheading">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
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
                      <span key={t} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-600 font-mono">
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
          {impactSummary.map((item) => {
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

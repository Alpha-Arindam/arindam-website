'use client';

import { useInView } from '../hooks/useInView';
import { Code2, Layers, Zap, Users, MapPin } from 'lucide-react';
import { useI18n } from '../locales';

export default function About() {
  const { t } = useI18n();
  const sectionRef = useInView({ threshold: 0.1 });

  const highlightsTranslated = [
    {
      icon: Code2,
      title: t('about.fullStackCapability'),
      description: t('about.fullStackCapabilityDesc'),
    },
    {
      icon: Layers,
      title: t('about.architectureFirst'),
      description: t('about.architectureFirstDesc'),
    },
    {
      icon: Zap,
      title: t('about.performanceObsessed'),
      description: t('about.performanceObsessedDesc'),
    },
    {
      icon: Users,
      title: t('about.mentorLead'),
      description: t('about.mentorLeadDesc'),
    },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-surface-900">
      <div className="section-container">
        <div
          ref={sectionRef as React.RefObject<HTMLDivElement>}
          className="opacity-0 [&.in-view]:animate-fade-up"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-900 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest mb-4">
            {t('about.sectionTitle')}
          </div>
          <h2 className="section-heading text-surface-900 dark:text-white mb-4">
            {t('about.heading')}
            <br />
            <span className="gradient-text">{t('about.headingAccent')}</span>
          </h2>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <div className="space-y-5">
            {/* Profile Avatar Card */}
            <div className="card flex flex-col sm:flex-row items-center gap-6 p-5 mb-6 relative group">
              <div className="absolute -top-[1px] -left-[1px] w-5 h-5 border-t-2 border-l-2 border-indigo-500 rounded-tl-2xl pointer-events-none" />
              <div className="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-b-2 border-r-2 border-indigo-500 rounded-br-2xl pointer-events-none" />
              
              <a 
                href="/profile.png" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-indigo-500/20 dark:border-indigo-500/10 shadow-md shrink-0 block cursor-zoom-in group/img"
              >
                <img 
                  src="/profile.png" 
                  alt="Arindam Betal" 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                />
              </a>
              <div className="text-center sm:text-left space-y-1.5">
                <h3 className="text-lg font-bold text-surface-900 dark:text-white font-mono">Arindam Betal</h3>
                <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 font-mono">[{t('hero.badge')}]</p>
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-surface-500 dark:text-surface-400 font-mono">
                  <MapPin size={13} className="text-primary-500" />
                  <span>Kolkata, India (Remote)</span>
                </div>
                <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {t('common.activeNode')}
                </div>
              </div>
            </div>

            {[
              t('about.bioParagraph1'),
              t('about.bioParagraph2'),
              t('about.bioParagraph3'),
            ].map((para, i) => {
              const paraRef = useInView({ threshold: 0.1 });
              return (
                <p
                  key={i}
                  ref={paraRef as React.RefObject<HTMLParagraphElement>}
                  className="opacity-0 [&.in-view]:animate-fade-up text-surface-600 dark:text-surface-300 leading-relaxed text-base"
                  style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'forwards' }}
                >
                  {para}
                </p>
              );
            })}

            <div className="pt-4 flex flex-wrap gap-3">
              {['React', 'Next.js', 'Angular', 'TypeScript', 'FastAPI', 'AWS', 'OpenAI'].map((tech) => (
                <span key={tech} className="badge bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 border border-surface-200 dark:border-surface-600">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlightsTranslated.map((item, i) => {
              const cardRef = useInView({ threshold: 0.1 });
              return (
                <div
                  key={i}
                  ref={cardRef as React.RefObject<HTMLDivElement>}
                  className="card opacity-0 [&.in-view]:animate-scale-in p-5 group"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'forwards' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center mb-3 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40 transition-colors">
                    <item.icon size={20} className="text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-semibold text-surface-900 dark:text-white text-sm mb-1.5">{item.title}</h3>
                  <p className="text-surface-500 dark:text-surface-400 text-xs leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


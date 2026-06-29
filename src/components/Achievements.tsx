import { useInView } from '../hooks/useInView';
import { Award, Star } from 'lucide-react';
import { useI18n } from '../locales';

export default function Achievements() {
  const { t } = useI18n();
  const headingRef = useInView({ threshold: 0.1 });

  const achievements = [
    {
      title: t('achievements.list.0.title'),
      description: t('achievements.list.0.description'),
      icon: '⚡',
      tags: ['React 18/19', 'Angular 17+', 'Enterprise'],
    },
    {
      title: t('achievements.list.1.title'),
      description: t('achievements.list.1.description'),
      icon: '🔗',
      tags: ['FastAPI', 'PostgreSQL', 'AWS'],
    },
    {
      title: t('achievements.list.2.title'),
      description: t('achievements.list.2.description'),
      icon: '🤖',
      tags: ['OpenAI API', 'Prompt Engineering', 'LLM'],
    },
    {
      title: t('achievements.list.3.title'),
      description: t('achievements.list.3.description'),
      icon: '♿',
      tags: ['WCAG 2.2 AA', 'a11y', 'Inclusive Design'],
    },
    {
      title: t('achievements.list.4.title'),
      description: t('achievements.list.4.description'),
      icon: '🚀',
      tags: ['React v16→19', 'Angular v10→19', 'Zero Downtime'],
    },
    {
      title: t('achievements.list.5.title'),
      description: t('achievements.list.5.description'),
      icon: '👥',
      tags: ['Team Lead', 'Mentorship', 'Architecture'],
    },
  ];

  return (
    <section id="achievements" className="py-24 bg-surface-50 dark:bg-surface-950">
      <div className="section-container">
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className="opacity-0 [&.in-view]:animate-fade-up mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-900 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Award size={12} />
            {t('achievements.sectionTitle')}
          </div>
          <h2 className="section-heading text-surface-900 dark:text-white">
            {t('achievements.heading')}
          </h2>
          <p className="section-subheading">
            {t('achievements.subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {achievements.map((item, i) => {
            const cardRef = useInView({ threshold: 0.05 });
            return (
              <div
                key={i}
                ref={cardRef as React.RefObject<HTMLDivElement>}
                className="card opacity-0 [&.in-view]:animate-fade-up p-6 group hover:-translate-y-1 relative"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
              >
                {/* Cybernetic Corner Brackets */}
                <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-xl pointer-events-none group-hover:border-indigo-500/60 transition-colors" />
                <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-indigo-500/30 rounded-br-xl pointer-events-none group-hover:border-indigo-500/60 transition-colors" />

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-surface-100 dark:bg-surface-700 flex items-center justify-center text-xl shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-surface-900 dark:text-white text-sm leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900 font-mono">
                      <Star size={9} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

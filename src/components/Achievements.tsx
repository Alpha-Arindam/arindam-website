import { useInView } from '../hooks/useInView';
import { Award, Star } from 'lucide-react';

const ACHIEVEMENTS = [
  {
    title: 'React + Angular Dual Expertise',
    description: 'Enterprise-grade proficiency in both major frontend frameworks — delivering production systems across different client tech stacks.',
    icon: '⚡',
    tags: ['React 18/19', 'Angular 17+', 'Enterprise'],
  },
  {
    title: 'Full-Stack Contribution',
    description: 'Extended beyond frontend to deliver end-to-end features with FastAPI backends, PostgreSQL schemas, and AWS infrastructure.',
    icon: '🔗',
    tags: ['FastAPI', 'PostgreSQL', 'AWS'],
  },
  {
    title: 'AI Feature Integration',
    description: 'Pioneered OpenAI API integrations into production frontend applications, delivering intelligent user experiences before it became mainstream.',
    icon: '🤖',
    tags: ['OpenAI API', 'Prompt Engineering', 'LLM'],
  },
  {
    title: 'WCAG 2.2 AA Accessibility',
    description: 'Delivered fully accessible interfaces meeting WCAG 2.2 AA standards across enterprise fintech portals, broadening user reach.',
    icon: '♿',
    tags: ['WCAG 2.2 AA', 'a11y', 'Inclusive Design'],
  },
  {
    title: 'Framework Upgrade Champion',
    description: 'Led major framework migrations — React v16→19 and Angular v10→19 — with zero production downtime and full test coverage.',
    icon: '🚀',
    tags: ['React v16→19', 'Angular v10→19', 'Zero Downtime'],
  },
  {
    title: 'Technical Leadership',
    description: 'Promoted to Technical Lead, mentoring 4+ developers, establishing engineering standards, and leading cross-functional delivery.',
    icon: '👥',
    tags: ['Team Lead', 'Mentorship', 'Architecture'],
  },
];

export default function Achievements() {
  const headingRef = useInView({ threshold: 0.1 });

  return (
    <section id="achievements" className="py-24 bg-surface-50 dark:bg-surface-950">
      <div className="section-container">
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className="opacity-0 [&.in-view]:animate-fade-up mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-900 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Award size={12} />
            Achievements
          </div>
          <h2 className="section-heading text-surface-900 dark:text-white">
            Career highlights
          </h2>
          <p className="section-subheading">
            Key differentiators that define my professional journey
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACHIEVEMENTS.map((item, i) => {
            const cardRef = useInView({ threshold: 0.05 });
            return (
              <div
                key={item.title}
                ref={cardRef as React.RefObject<HTMLDivElement>}
                className="card opacity-0 [&.in-view]:animate-fade-up p-6 group hover:-translate-y-1"
                style={{ animationDelay: `${i * 80}ms`, animationFillMode: 'forwards' }}
              >
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
                    <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-900">
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

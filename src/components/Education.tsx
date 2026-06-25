import { useInView } from '../hooks/useInView';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useI18n } from '../locales';

export default function Education() {
  const { t } = useI18n();
  const sectionRef = useInView({ threshold: 0.1 });

  const subjects = [
    t('education.subjects.0'),
    t('education.subjects.1'),
    t('education.subjects.2'),
    t('education.subjects.3'),
    t('education.subjects.4'),
    t('education.subjects.5')
  ];

  return (
    <section id="education" className="py-24 bg-white dark:bg-surface-900">
      <div className="section-container">
        <div
          ref={sectionRef as React.RefObject<HTMLDivElement>}
          className="opacity-0 [&.in-view]:animate-fade-up mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-900 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest mb-4">
            {t('education.sectionTitle')}
          </div>
          <h2 className="section-heading text-surface-900 dark:text-white">
            {t('education.heading')}
          </h2>
        </div>

        <div className="max-w-2xl">
          <div className="card p-8 flex items-start gap-6 relative group">
            {/* Cybernetic Corner Brackets */}
            <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-indigo-500/30 rounded-tl-xl pointer-events-none group-hover:border-indigo-500/60 transition-colors" />
            <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-indigo-500/30 rounded-br-xl pointer-events-none group-hover:border-indigo-500/60 transition-colors" />

            <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/50 flex items-center justify-center shrink-0">
              <GraduationCap size={28} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-surface-900 dark:text-white">
                    {t('education.degree')}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold text-sm mt-0.5">{t('education.degreeAbbr')}</p>
                </div>
                <div className="flex flex-col gap-1 text-sm text-surface-500 dark:text-surface-400 sm:text-right shrink-0">
                  <div className="flex items-center gap-1.5 sm:justify-end font-mono">
                    <Calendar size={13} className="text-indigo-400" />
                    {t('education.duration')}
                  </div>
                  <div className="flex items-center gap-1.5 sm:justify-end">
                    <MapPin size={13} className="text-indigo-400" />
                    {t('education.location')}
                  </div>
                </div>
              </div>

              <p className="text-surface-600 dark:text-surface-400 text-sm mb-4">
                {t('education.institution')}
              </p>

              <div className="flex flex-wrap gap-2">
                {subjects.map((sub) => (
                  <span key={sub} className="badge bg-surface-100 dark:bg-surface-700 text-surface-600 dark:text-surface-300 border border-surface-200 dark:border-surface-600 text-xs">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

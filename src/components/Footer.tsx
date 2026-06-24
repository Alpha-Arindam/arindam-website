import { Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-900 dark:bg-surface-950 border-t border-surface-800 dark:border-surface-800">
      <div className="section-container py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="font-mono font-bold text-white text-lg tracking-tight">
              AB<span className="text-surface-600">.</span>
            </span>
            <span className="text-surface-400 text-sm">Arindam Betal — Senior Frontend Developer (7 Years Exp)</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bjuek2v8FTM631TBlBI1C8A%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-surface-400 hover:text-white transition-colors text-sm"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href="mailto:arindambetal1994@gmail.com"
              className="flex items-center gap-2 text-surface-400 hover:text-white transition-colors text-sm"
            >
              <Mail size={16} />
              Email
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-surface-800 flex items-center justify-center gap-1 text-surface-500 text-xs">
          <span>© {year} Arindam Betal. Built with</span>
          <Heart size={11} className="text-rose-500 mx-0.5" />
          <span>React + TypeScript + Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}

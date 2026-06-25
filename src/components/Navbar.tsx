import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Linkedin } from 'lucide-react';
import { useI18n } from '../locales';
import { handleLinkedInClick } from '../utils/linkedin';



interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { language, changeLanguage, t } = useI18n();

  const navLinksTranslated = [
    { label: t('common.about'), href: '#about' },
    { label: t('common.skills'), href: '#skills' },
    { label: t('common.experience'), href: '#experience' },
    { label: t('common.projects'), href: '#projects' },
    { label: t('common.education'), href: '#education' },
    { label: t('common.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['about', 'skills', 'experience', 'projects', 'education', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    window.history.pushState(null, '', href);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-surface-900/90 backdrop-blur-md shadow-sm border-b border-surface-200/60 dark:border-surface-700/60'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <nav className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <a
              href="/profile.png"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg overflow-hidden border border-primary-500/20 dark:border-primary-400/20 shadow-sm shrink-0 cursor-zoom-in block hover:opacity-85 transition-opacity"
              title="View Profile Photo"
            >
              <img 
                src="/profile.png" 
                alt="Arindam Betal Profile" 
                className="w-full h-full object-cover object-top"
              />
            </a>
            <button
              onClick={() => handleNavClick('#hero')}
              className="font-mono font-semibold text-primary-600 dark:text-primary-400 text-lg tracking-tight hover:opacity-80 transition-opacity"
            >
              AB<span className="text-surface-400">.</span>
            </button>
            <a
              href="https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3Bjuek2v8FTM631TBlBI1C8A%3D%3D"
              onClick={handleLinkedInClick}
              className="text-surface-400 hover:text-[#0a66c2] dark:hover:text-[#0a66c2] transition-colors ml-1 flex items-center justify-center p-1 rounded-md hover:bg-slate-100 dark:hover:bg-white/[0.05]"
              title={t('common.linkedinTitle')}
            >
              <Linkedin size={16} />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinksTranslated.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`nav-link ${activeSection === link.href.slice(1) ? 'text-primary-600 dark:text-primary-400 after:w-full' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative flex items-center">
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value as any)}
                className="appearance-none bg-transparent hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 text-xs font-mono font-bold pl-2.5 pr-5 py-1.5 rounded-lg border border-surface-200 dark:border-surface-700/60 focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer select-none transition-colors duration-200"
                aria-label="Change language"
              >
                <option value="en" className="bg-white dark:bg-surface-900">EN</option>
                <option value="bn" className="bg-white dark:bg-surface-900">BN</option>
                <option value="hi" className="bg-white dark:bg-surface-900">HI</option>
              </select>
              <span className="absolute right-2 pointer-events-none text-[8px] text-surface-400 font-mono">▼</span>
            </div>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-surface-500 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => handleNavClick('#contact')}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-950/40 transition-all duration-200"
            >
              {t('common.requestResume')}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-surface-500 hover:text-surface-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-surface-800 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-surface-900 border-t border-surface-200 dark:border-surface-700 shadow-lg">
          <div className="section-container py-4 flex flex-col gap-1">
            {navLinksTranslated.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 px-4">
              <button
                onClick={() => handleNavClick('#contact')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-950/40 transition-all duration-200"
              >
                {t('common.requestResume')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

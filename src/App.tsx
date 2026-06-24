import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CompanyDetails from './components/CompanyDetails';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    
    // Intercept clicks to prevent full reloads on company routing
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href && anchor.host === window.location.host && anchor.pathname.startsWith('/company/')) {
        e.preventDefault();
        window.history.pushState(null, '', anchor.pathname);
        handleLocationChange();
      }
    };
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Handle hash anchor smooth scrolling on refresh and browser history navigation
  useEffect(() => {
    const scrollToHash = (isInitial: boolean) => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else if (!isInitial) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Run on initial load/refresh (wait for DOM/renders)
    scrollToHash(true);

    const handlePopState = () => {
      scrollToHash(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Simple Router
  if (currentPath.startsWith('/company/')) {
    const slug = currentPath.split('/company/')[1];
    return <CompanyDetails slug={slug} />;
  }

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      <CustomCursor />
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode((d) => !d)} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

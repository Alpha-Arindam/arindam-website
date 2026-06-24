import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ArrowRight, 
  Mail, 
  Code2, 
  Terminal, 
  Sliders, 
  Sparkles, 
  Check, 
  RotateCcw 
} from 'lucide-react';

// Theme configuration presets
interface ThemePreset {
  id: string;
  name: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  accentText: string;
  gradientText: string;
  radialGlow: string;
  buttonBg: string;
  activeTabBorder: string;
}

const THEME_PRESETS: Record<string, ThemePreset> = {
  sky: {
    id: 'sky',
    name: 'Sky Cascade',
    badgeBg: 'bg-sky-500/10',
    badgeBorder: 'border-sky-500/20',
    badgeText: 'text-sky-400',
    accentText: 'text-sky-400',
    gradientText: 'from-sky-400 via-blue-400 to-violet-400',
    radialGlow: 'rgba(56,189,248,0.12)',
    buttonBg: 'hover:shadow-[0_0_24px_rgba(56,189,248,0.2)]',
    activeTabBorder: 'border-b-2 border-sky-400 text-sky-400',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Matrix',
    badgeBg: 'bg-emerald-500/10',
    badgeBorder: 'border-emerald-500/20',
    badgeText: 'text-emerald-400',
    accentText: 'text-emerald-400',
    gradientText: 'from-emerald-400 via-teal-400 to-cyan-400',
    radialGlow: 'rgba(16,185,129,0.12)',
    buttonBg: 'hover:shadow-[0_0_24px_rgba(16,185,129,0.2)]',
    activeTabBorder: 'border-b-2 border-emerald-400 text-emerald-400',
  },
  amber: {
    id: 'amber',
    name: 'Cyberpunk Amber',
    badgeBg: 'bg-amber-500/10',
    badgeBorder: 'border-amber-500/20',
    badgeText: 'text-amber-400',
    accentText: 'text-amber-400',
    gradientText: 'from-amber-400 via-orange-400 to-red-400',
    radialGlow: 'rgba(245,158,11,0.12)',
    buttonBg: 'hover:shadow-[0_0_24px_rgba(245,158,11,0.2)]',
    activeTabBorder: 'border-b-2 border-amber-400 text-amber-400',
  },
  violet: {
    id: 'violet',
    name: 'Neon Violet',
    badgeBg: 'bg-violet-500/10',
    badgeBorder: 'border-violet-500/20',
    badgeText: 'text-violet-400',
    accentText: 'text-violet-400',
    gradientText: 'from-violet-400 via-fuchsia-400 to-rose-400',
    radialGlow: 'rgba(139,92,246,0.12)',
    buttonBg: 'hover:shadow-[0_0_24px_rgba(139,92,246,0.2)]',
    activeTabBorder: 'border-b-2 border-violet-400 text-violet-400',
  },
};

const TECH_PILLS = [
  { label: 'React', short: 'R' },
  { label: 'Next.js', short: 'N' },
  { label: 'Angular', short: 'A' },
  { label: 'TypeScript', short: 'TS' },
  { label: 'Node.js', short: 'No' },
  { label: 'FastAPI', short: 'FA' },
  { label: 'AWS', short: 'AW' },
  { label: 'OpenAI', short: 'AI' },
];

const COMMAND_MAP: Record<string, string[]> = {
  help: [
    'Available commands:',
    '  skills    - View key technical skills summary',
    '  projects  - Show active developer projects',
    '  stats     - Print core production stats & metrics',
    '  clear     - Clear terminal logs',
  ],
  skills: [
    'Technical Skills:',
    '  • Languages: JavaScript, TypeScript, Python, HTML/CSS',
    '  • Frameworks: React, Next.js, Angular, Ionic',
    '  • State Management: Redux Toolkit, Context API, NgRx',
    '  • Styling: Tailwind CSS, Material UI / MUI, Styled Components',
    '  • Backend & Cloud: FastAPI, Node.js, Spring Boot, Keycloak, AWS',
    '  • Testing & DevOps: Jest, React Testing Library, Cypress, Docker, CI/CD',
  ],
  projects: [
    'Shipped Enterprise Projects:',
    '  • Abdoun (Real Estate): SSR listing platform (Next.js, FastAPI, AWS)',
    '  • SellPoint (SaaS): Real-time analytics dashboards (React, Redux, D3)',
    '  • Nucleus (Case Management): Enterprise microservices (Angular, NgRx, Spring Boot)',
    '  • SenoClock (Healthcare): Cross-platform mobile app (Ionic, React, AWS)',
    '  • Pet Health (Veterinary): Appointment & triage system (React, Vite, Jest)',
    '  • Wealth Portals (Fintech): Advisor & portfolio views (Angular, Spring Boot)',
  ],
  stats: [
    'Production Telemetry:',
    '  • Experience: 7 Years of enterprise software delivery',
    '  • Core Frameworks: React (v16-v19), Next.js (v12-v16), Angular (v10-v19)',
    '  • Domains: Healthcare, Real Estate, Fintech, Legal, Case Management',
    '  • Standards Compliance: WCAG 2.2 AA Accessibility & Inclusive Design',
  ],
};

// Canvas Particle Animation
function CanvasParticles({ themeColor, speed = 1 }: { themeColor: string; speed: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const numParticles = Math.min(70, Math.floor((width * height) / 18000));

    const getThemeColors = () => {
      switch (themeColor) {
        case 'emerald':
          return { particle: 'rgba(52, 211, 153, 0.4)', line: 'rgba(52, 211, 153, 0.08)' };
        case 'amber':
          return { particle: 'rgba(251, 191, 36, 0.4)', line: 'rgba(251, 191, 36, 0.08)' };
        case 'violet':
          return { particle: 'rgba(167, 139, 250, 0.4)', line: 'rgba(167, 139, 250, 0.08)' };
        case 'sky':
        default:
          return { particle: 'rgba(56, 189, 248, 0.4)', line: 'rgba(56, 189, 248, 0.08)' };
      }
    };

    // Initialize particles
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4 * speed,
        vy: (Math.random() - 0.5) * 0.4 * speed,
        radius: Math.random() * 2 + 1,
      });
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const colors = getThemeColors();

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse attraction/repulsion
        if (mouse.x !== -1000) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            p.x -= (dx / dist) * 0.5 * speed; // subtle push away
            p.y -= (dy / dist) * 0.5 * speed;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();
      });

      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = (1 - dist / 90) * 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [themeColor, speed]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemePreset>(THEME_PRESETS.sky);
  const [activeTab, setActiveTab] = useState<'profile' | 'terminal' | 'sandbox'>('profile');
  const [particleSpeed, setParticleSpeed] = useState<number>(1.2);
  const [glowIntensity, setGlowIntensity] = useState<boolean>(true);
  
  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Type "help" or click one of the quick commands below.',
    'System connected to D:\\My_Workspace\\arindam-website...'
  ]);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Scroll terminal to bottom
  useEffect(() => {
    if (activeTab === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, activeTab]);

  const runCommand = useCallback((cmdRaw: string) => {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    let response: string[] = [];
    if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (COMMAND_MAP[cmd]) {
      response = COMMAND_MAP[cmd];
    } else {
      response = [`Command not found: "${cmdRaw}". Type "help" for a list of commands.`];
    }

    setTerminalHistory((prev) => [
      ...prev,
      `$ ${cmdRaw}`,
      ...response,
      ''
    ]);
    setTerminalInput('');
  }, []);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(terminalInput);
  };

  const selectMetric = (cmd: string) => {
    setActiveTab('terminal');
    runCommand(cmd);
  };

  const scrollTo = (id: string) => {
    const hash = `#${id}`;
    window.history.pushState(null, '', hash);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Code editor lines
  const codeLines = [
    { text: 'const', type: 'keyword' },
    { text: ' developer ', type: 'plain' },
    { text: '=', type: 'operator' },
    { text: ' {', type: 'plain' },
    { text: '  name:', type: 'key' },
    { text: ' "Arindam Betal"', type: 'string' },
    { text: ',', type: 'plain' },
    { text: '  role:', type: 'key' },
    { text: ' "Senior Frontend Developer"', type: 'string' },
    { text: ',', type: 'plain' },
    { text: '  experience:', type: 'key' },
    { text: ' "7 Years"', type: 'string' },
    { text: ',', type: 'plain' },
    { text: '  domains:', type: 'key' },
    { text: ' ["Fintech", "Healthcare", "SaaS"]', type: 'string' },
    { text: ',', type: 'plain' },
    { text: '  skills:', type: 'key' },
    { text: ' ["React", "Next.js", "TypeScript", "FastAPI"]', type: 'string' },
    { text: ',', type: 'plain' },
    { text: '  openForWork:', type: 'key' },
    { text: ' true', type: 'boolean' },
    { text: '};', type: 'plain' }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#020617] text-white"
    >
      {/* ── Dynamic Canvas Particles ── */}
      <CanvasParticles themeColor={activeTheme.id} speed={particleSpeed} />

      {/* ── Background Glow ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glow according to selected theme */}
        <div
          className="absolute w-[800px] h-[600px] rounded-full transition-all duration-1000 ease-out opacity-80"
          style={{
            background: `radial-gradient(circle, ${activeTheme.radialGlow} 0%, transparent 60%)`,
            left: '25%',
            top: '20%',
            transform: 'translate(-50%, -50%)',
            filter: glowIntensity ? 'blur(40px)' : 'none',
          }}
        />
        <div
          className="absolute w-[600px] h-[500px] rounded-full transition-all duration-1000 ease-out opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 60%)',
            right: '10%',
            bottom: '10%',
            filter: glowIntensity ? 'blur(40px)' : 'none',
          }}
        />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* Fade gradient overlays */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020617] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020617] to-transparent" />
      </div>

      <div className="section-container relative z-10 py-20 pt-28 w-full">
        <div className="grid lg:grid-cols-[1fr_450px] xl:grid-cols-[1fr_500px] gap-12 xl:gap-16 items-center">
          
          {/* ════ LEFT: Content ════ */}
          <div className="flex flex-col">
            {/* Status pill */}
            <div
              className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <div className="inline-flex items-center gap-2.5 mb-6 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-emerald-400">
                  Open for new opportunities
                </span>
              </div>
            </div>

            {/* Title */}
            <div
              className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: '120ms' }}
            >
              <h1 className="text-[clamp(2.8rem,6.5vw,5rem)] font-extrabold tracking-tight leading-[0.95] mb-4">
                Arindam
                <br />
                <span
                  className={`bg-gradient-to-r ${activeTheme.gradientText} bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-x`}
                >
                  Betal
                </span>
              </h1>
            </div>

            {/* Badges */}
            <div
              className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: '240ms' }}
            >
              <div className="flex flex-wrap items-center gap-2 mt-2 mb-6">
                <span className={`px-3.5 py-1.5 rounded-xl ${activeTheme.badgeBg} border ${activeTheme.badgeBorder} ${activeTheme.badgeText} text-xs font-semibold backdrop-blur-md`}>
                  Senior Frontend Developer
                </span>
                <span className="text-white/20 text-xs select-none">•</span>
                <span className="px-3.5 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold backdrop-blur-md">
                  7 Years Exp
                </span>
                <span className="text-white/20 text-xs select-none">•</span>
                <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold backdrop-blur-md">
                  Enterprise scale
                </span>
              </div>
            </div>

            {/* Introduction */}
            <div
              className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: '360ms' }}
            >
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg mb-8">
                Delivering high-performance, accessible, and scalable web and mobile applications across Healthcare, Real Estate, Fintech, Case Management, and Veterinary Care domains.
              </p>
            </div>

            {/* CTAs */}
            <div
              className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: '480ms' }}
            >
              <div className="flex flex-wrap items-center gap-3.5 mb-10">
                <button
                  onClick={() => scrollTo('projects')}
                  className={`group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 ${activeTheme.buttonBg}`}
                >
                  Explore Work
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 hover:border-white/25 text-white/95 font-bold text-sm bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Mail size={15} />
                  Let's Talk
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors duration-200 font-semibold ml-2"
                >
                  <Mail size={14} />
                  Request Resume
                </button>
              </div>
            </div>

            {/* Tech badges */}
            <div
              className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="flex flex-wrap gap-1.5">
                {TECH_PILLS.map((tech) => (
                  <span
                    key={tech.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-400 text-xs font-semibold hover:bg-white/[0.06] hover:border-white/[0.1] hover:text-slate-200 transition-all duration-200 cursor-default"
                  >
                    <span className="w-4 h-4 rounded-[6px] bg-white/[0.06] flex items-center justify-center text-[9px] font-bold text-slate-400">
                      {tech.short}
                    </span>
                    {tech.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ════ RIGHT: Sandbox/Terminal Dashboard ════ */}
          <div
            className={`transition-all duration-900 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            style={{ transitionDelay: '400ms' }}
          >
            <div className="relative">
              {/* Outer decorative neon frame */}
              <div
                className="absolute -inset-[1px] rounded-2xl opacity-40 transition-all duration-1000"
                style={{
                  background: `linear-gradient(135deg, ${activeTheme.id === 'sky' ? '#38bdf8' : activeTheme.id === 'emerald' ? '#34d399' : activeTheme.id === 'amber' ? '#fbbf24' : '#a78bfa'}, transparent 70%)`
                }}
              />

              {/* Behind-card blur glow */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-20 blur-2xl transition-all duration-1000"
                style={{
                  background: `linear-gradient(135deg, ${activeTheme.id === 'sky' ? '#38bdf8' : activeTheme.id === 'emerald' ? '#34d399' : activeTheme.id === 'amber' ? '#fbbf24' : '#a78bfa'}, #4f46e5)`
                }}
              />

              {/* Dashboard Container */}
              <div className="relative rounded-2xl border border-white/[0.08] bg-slate-900/60 backdrop-blur-xl overflow-hidden shadow-2xl">
                {/* Header Window Bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-slate-950/40">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>

                  <span className="text-[11px] text-slate-500 font-mono">arindam@studio:~</span>

                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wide">Live</span>
                  </div>
                </div>

                {/* Dashboard Tabs header */}
                <div className="flex border-b border-white/[0.06] bg-slate-950/20 text-xs font-mono select-none">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center gap-1.5 px-4 py-3 border-r border-white/[0.05] transition-all hover:bg-white/[0.02] ${
                      activeTab === 'profile'
                        ? 'bg-slate-900/40 border-b-2 border-indigo-500 text-white font-medium'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Code2 size={13} className="text-indigo-400" />
                    DeveloperProfile.ts
                  </button>

                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`flex items-center gap-1.5 px-4 py-3 border-r border-white/[0.05] transition-all hover:bg-white/[0.02] ${
                      activeTab === 'terminal'
                        ? 'bg-slate-900/40 border-b-2 border-emerald-500 text-white font-medium'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Terminal size={13} className="text-emerald-400" />
                    InteractiveConsole.sh
                  </button>

                  <button
                    onClick={() => setActiveTab('sandbox')}
                    className={`flex items-center gap-1.5 px-4 py-3 transition-all hover:bg-white/[0.02] ${
                      activeTab === 'sandbox'
                        ? 'bg-slate-900/40 border-b-2 border-amber-500 text-white font-medium'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Sliders size={13} className="text-amber-400" />
                    SandboxSettings.config
                  </button>
                </div>

                {/* Main Content Area */}
                <div className="p-6 h-[260px] overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed scrollbar-thin">
                  
                  {/* Tab 1: Profile View */}
                  {activeTab === 'profile' && (
                    <div className="space-y-1 select-text">
                      {codeLines.map((line, idx) => (
                        <div key={idx} className="flex">
                          <span className="w-5 text-slate-600 text-[10px] text-right mr-4 select-none">
                            {idx + 1}
                          </span>
                          <span>
                            {line.type === 'keyword' && (
                              <span className="text-violet-400 font-semibold">{line.text}</span>
                            )}
                            {line.type === 'key' && (
                              <span className="text-sky-300">{line.text}</span>
                            )}
                            {line.type === 'string' && (
                              <span className="text-amber-300">{line.text}</span>
                            )}
                            {line.type === 'boolean' && (
                              <span className="text-orange-400 font-semibold">{line.text}</span>
                            )}
                            {line.type === 'operator' && (
                              <span className="text-pink-400 font-semibold">{line.text}</span>
                            )}
                            {line.type === 'plain' && (
                              <span className="text-slate-300">{line.text}</span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab 2: Terminal Console */}
                  {activeTab === 'terminal' && (
                    <div className="h-full flex flex-col justify-between">
                      <div className="overflow-y-auto space-y-1.5 flex-1 pr-1">
                        {terminalHistory.map((line, idx) => (
                          <div key={idx} className={`${line.startsWith('$') ? 'text-sky-400' : 'text-slate-300'}`}>
                            {line}
                          </div>
                        ))}
                        <div ref={terminalEndRef} />
                      </div>

                      {/* Interactive prompt form */}
                      <form onSubmit={handleTerminalSubmit} className="flex items-center mt-3 pt-3 border-t border-white/[0.04]">
                        <span className="text-emerald-400 mr-2 shrink-0 select-none">~ $</span>
                        <input
                          type="text"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          placeholder="type help, skills, projects, stats..."
                          className="bg-transparent text-white outline-none border-none flex-1 text-xs sm:text-sm font-mono placeholder:text-slate-600"
                        />
                        <button type="submit" className="text-[10px] text-slate-500 hover:text-white px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08]">
                          run
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Tab 3: Sandbox Config */}
                  {activeTab === 'sandbox' && (
                    <div className="space-y-5">
                      {/* Theme colors */}
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
                          <Sparkles size={11} className="text-amber-400" />
                          Color Palette presets
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.values(THEME_PRESETS).map((t) => (
                            <button
                              key={t.id}
                              onClick={() => setActiveTheme(t)}
                              className={`flex items-center justify-between px-3 py-2 rounded-xl text-left border text-xs font-semibold transition-all duration-200 ${
                                activeTheme.id === t.id
                                  ? 'bg-white/[0.08] border-white/20 text-white shadow-lg'
                                  : 'bg-white/[0.02] border-white/[0.04] text-slate-400 hover:bg-white/[0.05] hover:border-white/10 hover:text-slate-200'
                              }`}
                            >
                              <span>{t.name}</span>
                              {activeTheme.id === t.id && <Check size={12} className="text-emerald-400" />}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Particle speed slider */}
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2 font-bold flex items-center justify-between">
                          <span>Particle Velocity: {particleSpeed === 0 ? 'Paused' : particleSpeed < 1 ? 'Slow' : particleSpeed < 2 ? 'Normal' : 'Fast'}</span>
                          <button 
                            onClick={() => setParticleSpeed(1.2)} 
                            className="hover:text-white text-slate-600 flex items-center gap-1"
                            title="Reset Speed"
                          >
                            <RotateCcw size={10} /> Reset
                          </button>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="3"
                          step="0.1"
                          value={particleSpeed}
                          onChange={(e) => setParticleSpeed(parseFloat(e.target.value))}
                          className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                      </div>

                      {/* Radial glows toggle */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Ambient Glow Effects</span>
                        <button
                          onClick={() => setGlowIntensity(!glowIntensity)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                            glowIntensity ? 'bg-indigo-600' : 'bg-slate-700'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              glowIntensity ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Dashboard bottom shell info */}
                {activeTab === 'terminal' && (
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-950/40 border-t border-white/[0.05] select-none text-[10px] text-slate-500">
                    <span className="text-slate-600 font-bold uppercase shrink-0">Try clicking:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['help', 'skills', 'projects', 'stats'].map((cmd) => (
                        <button
                          key={cmd}
                          onClick={() => runCommand(cmd)}
                          className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all font-mono"
                        >
                          {cmd}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab !== 'terminal' && (
                  <div className="flex items-center justify-between px-5 py-2.5 bg-slate-950/40 border-t border-white/[0.05] select-none text-[10px] text-slate-500">
                    <div className="flex items-center gap-3 font-mono">
                      <span>React 18</span>
                      <span>•</span>
                      <span>TypeScript 5.5</span>
                    </div>
                    <span className="font-mono">theme: {activeTheme.name}</span>
                  </div>
                )}
              </div>

              {/* Floating badges */}
              <button
                onClick={() => selectMetric('stats')}
                className="absolute -top-3.5 -right-3 px-3.5 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/25 hover:border-indigo-500/50 text-indigo-400 text-[10px] font-bold backdrop-blur-md shadow-lg transition-all hover:scale-105"
              >
                7 YRS
              </button>
              <button
                onClick={() => selectMetric('projects')}
                className="absolute -bottom-3.5 -left-3 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 hover:border-emerald-500/50 text-emerald-400 text-[10px] font-bold backdrop-blur-md shadow-lg transition-all hover:scale-105"
              >
                20+ PROJ
              </button>
            </div>
          </div>

        </div>

        {/* ── Stats bar ── */}
        <div
          className={`mt-16 pt-10 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-xl transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{ transitionDelay: '700ms' }}
        >
          {[
            { value: '7', label: 'Years', sub: 'Production', cmd: 'stats' },
            { value: '20+', label: 'Projects', sub: 'Shipped', cmd: 'projects' },
            { value: '4', label: 'Domains', sub: 'Fintech · Health · SaaS', cmd: 'help' },
            { value: '100%', label: 'Satisfaction', sub: 'Client Retention', cmd: 'stats' },
          ].map((stat, idx) => (
            <button
              key={idx}
              onClick={() => selectMetric(stat.cmd)}
              className="text-left group outline-none hover:opacity-80 transition-opacity"
            >
              <div className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors group-hover:${activeTheme.accentText}`}>{stat.value}</div>
              <div className="text-sm text-slate-400 mt-0.5">{stat.label}</div>
              <div className="text-[10px] text-slate-600 mt-0.5">{stat.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 select-none pointer-events-none">
        <div className="w-5 h-9 rounded-full border border-slate-800 flex items-start justify-center pt-2 animate-bounce">
          <div className="w-0.5 h-1.5 rounded-full bg-slate-600 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { Code2, Play, CheckCircle, Terminal, Sparkles } from 'lucide-react';
import { useI18n } from '../locales';

interface SkillModule {
  category: string;
  filename: string;
  language: string;
  skills: string[];
  code: string;
  logs: string[];
}

const SKILL_MODULES: SkillModule[] = [
  {
    category: 'Frontend Core',
    filename: 'VirtualGrid.tsx',
    language: 'typescript',
    skills: ['React.js', 'Next.js', 'Angular', 'Ionic'],
    code: `import { useState, useMemo } from 'react';

// Optimized list virtualization
export function VirtualGrid({ items, height = 400 }) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / 50);
    return items.slice(startIndex, startIndex + 8);
  }, [scrollTop, items]);
  
  return (
    <div className="virtual-container" style={{ height }}>
      {visibleItems.map(item => (
        <div key={item.id} className="grid-row" />
      ))}
    </div>
  );
}`,
    logs: [
      'Vite bundle compiled.',
      'VirtualGrid.tsx initialized.',
      '✓ Rendering 10,000 nodes at 60fps verified.',
      '✓ Intersection observer bindings completed.',
      '✓ Mem-leak tests: Passed.'
    ]
  },
  {
    category: 'Languages',
    filename: 'Lexer.ts',
    language: 'typescript',
    skills: ['JavaScript', 'TypeScript', 'Python'],
    code: `type Token = { type: string; value: string };

export class Lexer {
  private pos = 0;
  constructor(private src: string) {}

  public nextToken(): Token | null {
    if (this.pos >= this.src.length) return null;
    const char = this.src[this.pos++];
    if (/\\d/.test(char)) return { type: 'INT', value: char };
    if (/[a-zA-Z]/.test(char)) return { type: 'IDENT', value: char };
    return { type: 'OP', value: char };
  }
}`,
    logs: [
      'TSC compilation successful.',
      'Lexer static type checks passed.',
      '✓ Token scanner capacity: 75K lines/sec.',
      '✓ AST generator binding checks completed.'
    ]
  },
  {
    category: 'State Management',
    filename: 'TelemetryStore.ts',
    language: 'typescript',
    skills: ['Redux Toolkit', 'Context API', 'NgRx (Angular)'],
    code: `import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Log { id: string; event: string }

const telemetrySlice = createSlice({
  name: 'telemetry',
  initialState: { logs: [] as Log[] },
  reducers: {
    logReceived: (state, action: PayloadAction<Log>) => {
      state.logs.push(action.payload);
    },
    clearLogs: (state) => {
      state.logs = [];
    }
  }
});`,
    logs: [
      'Redux slice loaded in global context.',
      'Middlewares active: [Redux Logger, WebSockets].',
      '✓ Actions mapped: telemetry/logReceived.',
      '✓ State latency: 0ms.'
    ]
  },
  {
    category: 'Styling Engine',
    filename: 'MechaStyle.css',
    language: 'css',
    skills: ['Tailwind CSS', 'Material UI / MUI', 'CSS Modules', 'Bootstrap'],
    code: `@layer components {
  .mecha-bracket-panel {
    border-top: 2px solid #38bdf8;
    border-left: 2px solid #38bdf8;
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(12px);
    position: relative;
  }
  .mecha-bracket-panel::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 6px;
    height: 6px;
    background: #6366f1;
  }
}`,
    logs: [
      'Tailwind JIT engine rebuilt css.',
      '✓ Extracted 42 theme classes.',
      '✓ PostCSS autoprefixer complete.',
      '✓ Responsive layout grid validation: Passed.'
    ]
  },
  {
    category: 'Backend & APIs',
    filename: 'TelemetryServer.py',
    language: 'python',
    skills: ['FastAPI', 'Node.js', 'Spring Boot', 'REST APIs', 'Keycloak'],
    code: `from fastapi import FastAPI, WebSocket
import json

app = FastAPI()

@app.websocket("/ws/telemetry")
async def websocket_telemetry(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        parsed = json.loads(data)
        await websocket.send_json({
            "status": "synchronized", 
            "id": parsed.get("id")
        })`,
    logs: [
      'Uvicorn server running at http://127.0.0.1:8000',
      'WebSocket route /ws/telemetry activated.',
      '✓ Client connection handshake completed.',
      '✓ Performance test: 15K concurrent websockets.'
    ]
  },
  {
    category: 'Databases',
    filename: 'SchemaInit.sql',
    language: 'sql',
    skills: ['PostgreSQL', 'MySQL'],
    code: `-- Setup visitor sign-in signatures table
CREATE TABLE visitor_signatures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_sig_time ON visitor_signatures(created_at DESC);`,
    logs: [
      'PostgreSQL schema execution successful.',
      'Indices verified: [idx_sig_time].',
      '✓ Default UUID resolver active.',
      '✓ Row-level security settings verified.'
    ]
  },
  {
    category: 'Cloud & DevOps',
    filename: 's3_deploy.yml',
    language: 'yaml',
    skills: ['AWS', 'Docker', 'GitHub Actions', 'GitLab CI', 'Azure DevOps'],
    code: `name: AWS S3 Deploy Pipeline
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Sync Build Assets
        run: aws s3 sync dist/ s3://arindam-website --delete
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET }\}`,
    logs: [
      'GitHub runner triggered.',
      'Syncing assets with S3: s3://arindam-website.',
      '✓ CloudFront distribution invalidations initialized.',
      '✓ AWS Cognito auth gateways: Active.'
    ]
  },
  {
    category: 'Testing & QA',
    filename: 'telemetry.test.ts',
    language: 'typescript',
    skills: ['React Testing Library', 'Jest', 'Cypress E2E'],
    code: `import { render } from '@testing-library/react';
import { VirtualGrid } from './VirtualGrid';

describe('VirtualGrid Component Test Suite', () => {
  it('renders without memory overflow', () => {
    const { container } = render(<VirtualGrid items={[]} />);
    expect(container).toBeInTheDocument();
  });
});`,
    logs: [
      'Jest runner active.',
      'PASS src/components/telemetry.test.ts',
      '✓ VirtualGrid renders without crash (36ms)',
      'Test Suites: 1 passed, 1 total',
      'Tests:       1 passed, 1 total'
    ]
  },
  {
    category: 'AI / GenAI',
    filename: 'AgentCompletion.ts',
    language: 'typescript',
    skills: ['OpenAI API (GPT-3.5 / GPT-4)', 'Prompt Engineering', 'AI Features'],
    code: `import OpenAI from 'openai';

const openai = new OpenAI();

export async function generateProfileInsights(history: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'Generate mecha stats summary.' },
      { role: 'user', content: history }
    ]
  });
  return completion.choices[0].message.content;
}`,
    logs: [
      'OpenAI Client active.',
      '✓ Model gpt-4o connection verified.',
      '✓ Temperature settings: 0.2 (deterministic).',
      '✓ API latency logs: 215ms response verified.'
    ]
  }
];

export default function Skills() {
  const { t } = useI18n();
  const headingRef = useInView({ threshold: 0.1 });
  const [activeModule, setActiveModule] = useState<SkillModule>(SKILL_MODULES[0]);
  const [compilerState, setCompilerState] = useState<'idle' | 'compiling' | 'running' | 'done'>('idle');
  const [consoleHistory, setConsoleHistory] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const getCategoryTranslation = (category: string) => {
    switch (category) {
      case 'Frontend Core': return t('skills.tabs.frontend');
      case 'Languages': return t('skills.tabs.languages');
      case 'State Management': return t('skills.tabs.stateManagement');
      case 'Styling Engine': return t('skills.tabs.stylingEngine');
      case 'Backend & APIs': return t('skills.tabs.backend');
      case 'Databases': return t('skills.tabs.databases');
      case 'Cloud & DevOps': return t('skills.tabs.cloudDevops');
      case 'Testing & QA': return t('skills.tabs.testingQa');
      case 'AI / GenAI': return t('skills.tabs.aiGenai');
      default: return category;
    }
  };

  // Load active module logs into terminal initially
  useEffect(() => {
    setConsoleHistory([`// ${t('skills.loadedModule')}: ${activeModule.filename}`, t('skills.readyExecute')]);
    setCompilerState('idle');
  }, [activeModule, t]);

  // Scroll terminal logs without affecting window scroll position
  useEffect(() => {
    const container = consoleEndRef.current?.parentElement;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [consoleHistory]);

  const compileAndRun = () => {
    if (compilerState !== 'idle') return;

    setCompilerState('compiling');
    setConsoleHistory([`$ compile ${activeModule.filename} --optimize=production`]);

    setTimeout(() => {
      setCompilerState('running');
      setConsoleHistory((prev) => [...prev, t('skills.parsingAst'), t('skills.checkingTypes'), t('skills.executingBuild')]);
      
      setTimeout(() => {
        setCompilerState('done');
        setConsoleHistory((prev) => [
          ...prev,
          t('skills.buildSuccess'),
          '---------- stdout ----------',
          ...activeModule.logs,
          '----------------------------',
          t('skills.processExited')
        ]);
      }, 1200);

    }, 800);
  };

  return (
    <section id="skills" className="py-24 bg-surface-50 dark:bg-surface-950 relative overflow-hidden">
      {/* Decorative layout grids */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03] select-none z-0">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="section-container relative z-10">
        
        {/* Title */}
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className="opacity-0 [&.in-view]:animate-fade-up mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-900 text-primary-600 dark:text-primary-400 text-xs font-semibold uppercase tracking-widest mb-4">
            {t('skills.sectionTitle')}
          </div>
          <h2 className="section-heading text-surface-900 dark:text-white flex items-center gap-2 font-mono">
            {t('skills.headingDiagnostics')}
          </h2>
          <p className="section-subheading">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Layout split */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-8 items-start">
          
          {/* LEFT: Folder Tree */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold ml-1 font-mono">
              {t('skills.selectModule')}
            </span>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {SKILL_MODULES.map((module) => {
                const isActive = activeModule.category === module.category;
                return (
                  <button
                    key={module.category}
                    onClick={() => setActiveModule(module)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-200 ${
                      isActive
                        ? 'bg-slate-900 border-indigo-500/50 shadow-lg text-white shadow-indigo-500/5'
                        : 'bg-white dark:bg-surface-900 border-slate-200 dark:border-white/[0.04] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/10 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full transition-colors ${isActive ? 'bg-indigo-400 animate-pulse' : 'bg-slate-300 dark:bg-slate-700'}`} />
                      <span className="text-xs font-bold font-mono">{getCategoryTranslation(module.category)}</span>
                    </div>
                    <span className="text-[10px] font-mono opacity-50 select-none">
                      {module.filename.substring(module.filename.lastIndexOf('.'))}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Editor Dashboard with mecha borders */}
          <div className="relative rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-slate-950/40 backdrop-blur-xl shadow-xl">
            
            {/* Cybernetic bracket overlays */}
            <div className="absolute -top-[1px] -left-[1px] w-5 h-5 border-t-2 border-l-2 border-indigo-500 pointer-events-none rounded-tl-2xl" />
            <div className="absolute -top-[1px] -right-[1px] w-5 h-5 border-t-2 border-r-2 border-indigo-500 pointer-events-none rounded-tr-2xl" />
            <div className="absolute -bottom-[1px] -left-[1px] w-5 h-5 border-b-2 border-l-2 border-indigo-500 pointer-events-none rounded-bl-2xl" />
            <div className="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-b-2 border-r-2 border-indigo-500 pointer-events-none rounded-br-2xl" />

            {/* Editor Top Menu */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-slate-950/60 rounded-t-2xl select-none">
              <div className="flex items-center gap-2">
                <Code2 size={15} className="text-indigo-400" />
                <span className="text-xs font-mono text-slate-700 dark:text-slate-300 font-semibold">
                  {activeModule.filename}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400 text-[10px] font-mono">
                  {activeModule.language}
                </span>
              </div>

              {/* Action Compile button */}
              <button
                onClick={compileAndRun}
                disabled={compilerState !== 'idle'}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                  compilerState === 'idle'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-white shadow-md shadow-emerald-500/5 hover:scale-[1.02]'
                    : 'bg-slate-100 dark:bg-white/[0.03] border-slate-200 dark:border-white/[0.05] text-slate-400 cursor-not-allowed'
                }`}
              >
                {compilerState === 'idle' && (
                  <>
                    <Play size={11} fill="currentColor" />
                    {t('skills.compileButton')}
                  </>
                )}
                {compilerState === 'compiling' && t('skills.parsingCode')}
                {compilerState === 'running' && t('skills.runningExecution')}
                {compilerState === 'done' && (
                  <>
                    <CheckCircle size={12} className="text-emerald-400" />
                    {t('skills.buildCompleted')}
                  </>
                )}
              </button>
            </div>

            {/* Code Content Editor Area */}
            <div className="p-5 border-b border-slate-200 dark:border-white/[0.06] bg-white dark:bg-transparent overflow-x-auto h-[240px] text-xs sm:text-sm font-mono leading-relaxed select-text scrollbar-thin">
              <pre className="text-slate-800 dark:text-slate-300">
                {activeModule.code}
              </pre>
            </div>

            {/* Console output widget */}
            <div className="bg-slate-950/80 dark:bg-slate-950/90 text-slate-300 p-5 font-mono text-xs leading-relaxed border-t border-slate-200 dark:border-white/[0.06]">
              <div className="flex items-center justify-between text-slate-500 mb-3 border-b border-white/[0.04] pb-1.5 select-none">
                <div className="flex items-center gap-1.5">
                  <Terminal size={12} className="text-indigo-400" />
                  <span>{t('skills.outputStreamTitle')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles size={12} className="text-amber-400 animate-pulse" />
                  <span>{t('skills.statusLabel')}: {compilerState}</span>
                </div>
              </div>
              <div className="h-[100px] overflow-y-auto space-y-1 font-mono text-[11px] sm:text-xs scrollbar-thin text-slate-400">
                {consoleHistory.map((line, idx) => (
                  <div key={idx} className={`${line.startsWith('$') ? 'text-indigo-400' : line.startsWith('✓') || line.startsWith('✔') ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {line}
                  </div>
                ))}
                {compilerState === 'compiling' || compilerState === 'running' ? (
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-3 bg-indigo-400 animate-blink rounded-[1px]" />
                    <span className="text-slate-500 font-mono">compiling modules...</span>
                  </div>
                ) : null}
                <div ref={consoleEndRef} />
              </div>
            </div>

            {/* Technology pill index */}
            <div className="px-5 py-3 border-t border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-slate-950/60 rounded-b-2xl select-none text-[11px]">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-bold uppercase font-mono">{t('skills.moduleSkillsLabel')}</span>
                <div className="flex flex-wrap gap-1">
                  {activeModule.skills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-slate-200 dark:bg-white/[0.05] text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-white/[0.08] font-mono">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

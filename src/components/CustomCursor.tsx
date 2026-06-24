import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState({ x: 0, y: 0 });
  const [trail2Position, setTrail2Position] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hoverType, setHoverType] = useState<'standard' | 'input' | 'submit'>('standard');
  const [clickPulse, setClickPulse] = useState(false);

  const requestRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      const target = e.target as HTMLElement;
      if (target) {
        const interactive = target.closest('a, button, [role="button"], [data-cursor-hover]');
        const input = target.closest('input, textarea, select');
        const submit = target.closest('button[type="submit"], [data-cursor-submit]');

        if (submit) {
          setIsHovered(true);
          setHoverType('submit');
        } else if (input) {
          setIsHovered(true);
          setHoverType('input');
        } else if (interactive) {
          setIsHovered(true);
          setHoverType('standard');
        } else {
          setIsHovered(false);
        }
      }
    };

    const onMouseDown = () => {
      setIsClicking(true);
      setClickPulse(true);
    };
    
    const onMouseUp = () => {
      setIsClicking(false);
      setTimeout(() => setClickPulse(false), 500);
    };
    
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Hide original cursor
    document.body.classList.add('cursor-none-global');

    // Smooth spring physics for trail
    const updatePosition = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      setPosition({ x: targetX, y: targetY });

      setTrailPosition((prev) => {
        const dx = targetX - prev.x;
        const dy = targetY - prev.y;
        return {
          x: prev.x + dx * 0.16,
          y: prev.y + dy * 0.16,
        };
      });

      setTrail2Position((prev) => {
        const dx = targetX - prev.x;
        const dy = targetY - prev.y;
        return {
          x: prev.x + dx * 0.08,
          y: prev.y + dy * 0.08,
        };
      });

      requestRef.current = requestAnimationFrame(updatePosition);
    };

    requestRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.body.classList.remove('cursor-none-global');
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      
      {/* 1. Radar Click Pulse Ring */}
      {clickPulse && (
        <div
          className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-500/80 animate-ping"
          style={{
            width: '40px',
            height: '40px',
            left: `${position.x}px`,
            top: `${position.y}px`,
            animationDuration: '500ms'
          }}
        />
      )}

      {/* 2. Outer Rotating Reticle Ring */}
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out flex items-center justify-center ${
          isHovered
            ? hoverType === 'submit'
              ? 'w-10 h-10 border-red-500 bg-red-500/10 rotate-45 rounded-[6px]'
              : hoverType === 'input'
              ? 'w-3 h-8 border-amber-400 bg-amber-400/5 rounded-[2px]'
              : 'w-12 h-12 border-sky-400 bg-sky-400/15'
            : 'w-8 h-8 border-sky-400/30 bg-sky-400/[0.02] animate-[spin_12s_linear_infinite]'
        } ${isClicking ? 'scale-75 opacity-90' : 'scale-100'}`}
        style={{
          transform: `translate3d(${trailPosition.x}px, ${trailPosition.y}px, 0) ${
            isHovered && hoverType === 'submit' ? 'rotate(45deg)' : ''
          }`,
        }}
      >
        {/* Inward crosshair ticks for mecha aesthetics */}
        {!isHovered && (
          <>
            <span className="absolute top-0.5 left-1/2 -translate-x-1/2 w-[1px] h-1 bg-sky-400/60" />
            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-[1px] h-1 bg-sky-400/60" />
            <span className="absolute left-0.5 top-1/2 -translate-y-1/2 w-1 h-[1px] bg-sky-400/60" />
            <span className="absolute right-0.5 top-1/2 -translate-y-1/2 w-1 h-[1px] bg-sky-400/60" />
          </>
        )}

        {/* Robotic corner markings on outer ring if hovered standard */}
        {isHovered && hoverType === 'standard' && (
          <div className="absolute inset-0">
            <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-sky-400" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-sky-400" />
            <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-sky-400" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-sky-400" />
          </div>
        )}
      </div>

      {/* 3. Real-time Coordinates Display Tag */}
      {!isHovered && (
        <span
          className="fixed text-[7px] font-mono text-sky-400/40 select-none tracking-wider pointer-events-none"
          style={{
            left: `${position.x + 14}px`,
            top: `${position.y - 12}px`,
          }}
        >
          {position.x},{position.y}
        </span>
      )}

      {/* 4. Main target center dot */}
      <div
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
          isHovered 
            ? hoverType === 'submit' 
              ? 'bg-red-500' 
              : hoverType === 'input' 
              ? 'bg-amber-400' 
              : 'bg-sky-400' 
            : 'bg-sky-400'
        }`}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      />

      {/* 5. Trailing delayed dot */}
      <div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-indigo-500/40"
        style={{
          transform: `translate3d(${trail2Position.x}px, ${trail2Position.y}px, 0)`,
        }}
      />
    </div>
  );
}

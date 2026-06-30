'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'fade-in' | 'fade-right' | 'scale-in';
}

export function AnimateIn({ children, className = '', delay = 0, animation = 'fade-up' }: AnimateInProps) {
  const ref = useInView();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`opacity-0 transition-none [&.in-view]:opacity-100 [&.in-view]:animate-${animation} ${className}`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  );
}

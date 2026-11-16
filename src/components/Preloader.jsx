import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Preloader() {
  const prefersReduced = useReducedMotion();
  // Never block first-visit LCP for search crawlers or SSR
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return undefined;
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 500);
    return () => clearTimeout(timer);
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          key="mayaban-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1F3D2B] text-[#F6F1E7] pointer-events-none"
          aria-hidden="true"
        >
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <img
              src="/assets/mayaban-logo.png"
              alt="Mayaban Village Resort"
              width={112}
              height={128}
              className="w-24 sm:w-28 h-auto object-contain mb-4 drop-shadow-[0_4px_18px_rgba(255,255,255,0.2)]"
            />
            <span className="font-serif text-3xl sm:text-4xl tracking-[0.14em] text-[#F6F1E7]">
              MAYABAN
            </span>
            <svg width="140" height="12" viewBox="0 0 140 12" fill="none" className="mt-3">
              <m.line
                x1="10"
                y1="6"
                x2="130"
                y2="6"
                stroke="#C9A227"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <span className="mt-2 text-xs tracking-[0.26em] uppercase text-[#C9A227]">
              Village Resort · Bankura
            </span>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

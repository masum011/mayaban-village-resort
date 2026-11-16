import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return undefined;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return undefined;

    setEnabled(true);

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handleOver = (e) => {
      const target = e.target;
      if (target && target.closest('a, button, [role="button"], input, select, textarea')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    window.addEventListener('mouseover', handleOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [prefersReduced]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[90] pointer-events-none rounded-full border border-[#C9A227]/75 mix-blend-difference hidden lg:block"
      animate={{
        x: pos.x - (hovering ? 18 : 10),
        y: pos.y - (hovering ? 18 : 10),
        width: hovering ? 36 : 20,
        height: hovering ? 36 : 20,
        backgroundColor: hovering ? 'rgba(201, 162, 39, 0.16)' : 'rgba(201, 162, 39, 0)',
      }}
      transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.4 }}
    />
  );
}

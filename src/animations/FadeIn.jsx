import { m } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function FadeIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 24,
  duration = 0.65,
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const offset =
    direction === 'up'
      ? { y: distance, x: 0 }
      : direction === 'down'
      ? { y: -distance, x: 0 }
      : direction === 'left'
      ? { x: distance, y: 0 }
      : direction === 'right'
      ? { x: -distance, y: 0 }
      : { x: 0, y: 0 };

  return (
    <m.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

import { m } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const containerVariants = {
  hidden: {},
  visible: (staggerDelay) => ({
    transition: {
      staggerChildren: staggerDelay,
    },
  }),
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function StaggerChildren({ children, className = '', staggerDelay = 0.08 }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      variants={containerVariants}
      custom={staggerDelay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className = '' }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div variants={itemVariants} className={className}>
      {children}
    </m.div>
  );
}

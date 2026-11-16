import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { OptimizedImage } from '../components/OptimizedImage';

export function ParallaxImage({
  imageKey,
  alt,
  className = '',
  imgClassName = '',
  speed = 12,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
}) {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const isLowEnd =
      typeof navigator !== 'undefined' &&
      ((navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
        (navigator.deviceMemory && navigator.deviceMemory <= 2));

    if (
      prefersReduced ||
      isLowEnd ||
      window.innerWidth < 1024 ||
      !containerRef.current ||
      !innerRef.current
    ) {
      return undefined;
    }

    let ctx;
    let active = true;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (!active || !containerRef.current || !innerRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.fromTo(
            innerRef.current,
            { yPercent: -speed / 2, scale: 1.06 },
            {
              yPercent: speed / 2,
              scale: 1.02,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }, containerRef);
      }
    );

    return () => {
      active = false;
      if (ctx) ctx.revert();
    };
  }, [prefersReduced, speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="w-full h-full">
        <OptimizedImage
          imageKey={imageKey}
          alt={alt}
          priority={priority}
          sizes={sizes}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      </div>
    </div>
  );
}

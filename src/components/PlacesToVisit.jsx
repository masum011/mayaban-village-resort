import { useEffect, useRef, useState } from 'react';
import { Compass } from 'lucide-react';
import { siteData } from '../data/site';
import { FadeIn } from '../animations/FadeIn';
import { useReducedMotion } from '../hooks/useReducedMotion';

function AnimatedDistance({ targetKm }) {
  const [count, setCount] = useState(targetKm);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || hasAnimated || !ref.current) return undefined;

    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          const duration = 900;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * targetKm));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetKm, hasAnimated, prefersReduced]);

  return (
    <span ref={ref} className="tabular-nums font-serif text-4xl sm:text-5xl font-semibold text-[#1F3D2B]">
      {count} <span className="text-xl font-normal text-[#B5654A]">km</span>
    </span>
  );
}

export function PlacesToVisit() {
  return (
    <section className="py-20 lg:py-28 bg-[#F6F1E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
              Explore Bankura
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-semibold text-[#1F3D2B]">
              Places To Visit Nearby
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#57534E] max-w-md leading-relaxed">
            Stay right near Bikna Station Road and set out at daybreak for Bankura&apos;s rocky
            hills, ancient inscriptions, and serene reservoirs.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {siteData.placesToVisit.map((place, index) => (
            <FadeIn
              key={place.id}
              delay={index * 0.1}
              className="bg-[#FAF7F0] rounded-2xl border border-[#1F3D2B]/10 p-7 sm:p-8 flex flex-col justify-between shadow-soft"
            >
              <div>
                <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#1F3D2B]/10">
                  <AnimatedDistance targetKm={place.distanceKm} />
                  <Compass className="w-5 h-5 text-[#137A3D]" strokeWidth={1.75} aria-hidden="true" />
                </div>

                <h3 className="mt-6 font-serif text-2xl sm:text-3xl font-semibold text-[#1F3D2B]">
                  {place.name}
                </h3>

                <p className="mt-3 text-sm text-[#57534E] leading-relaxed">{place.summary}</p>
              </div>

              <p className="mt-6 pt-4 border-t border-[#1F3D2B]/8 text-xs text-[#B5654A] font-medium">
                {place.highlight}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

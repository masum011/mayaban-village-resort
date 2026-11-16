import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsData } from '../data/testimonials';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const prefersReduced = useReducedMotion();

  const total = testimonialsData.length;

  const goNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    if (paused || prefersReduced) return undefined;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 6500);
    return () => clearInterval(interval);
  }, [paused, prefersReduced, total]);

  const current = testimonialsData[activeIndex];

  return (
    <section
      aria-label="Guest testimonials"
      className="py-20 lg:py-28 bg-[#FAF7F0] border-y border-[#1F3D2B]/10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
            Guest Reflections
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-semibold text-[#1F3D2B]">
            Stories from Our Courtyard
          </h2>
        </div>

        <div
          className="relative bg-white/80 rounded-2xl border border-[#1F3D2B]/10 p-8 sm:p-12 lg:p-14 shadow-soft"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const diff = e.changedTouches[0].clientX - touchStartX.current;
            if (diff < -45) goNext();
            else if (diff > 45) goPrev();
          }}
        >
          <Quote
            className="w-10 h-10 text-[#137A3D]/35 mx-auto mb-6"
            strokeWidth={1.4}
            aria-hidden="true"
          />

          <div className="min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <m.div
                key={current.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <blockquote className="font-serif text-2xl sm:text-3xl text-[#1F3D2B] leading-relaxed italic max-w-3xl mx-auto">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="mt-8 flex flex-col items-center gap-1">
                  <p className="font-semibold text-base text-[#1F3D2B]">{current.author}</p>
                  <p className="text-xs text-[#57534E]">
                    <span>{current.ratingLabel}</span>
                    <span className="mx-2" aria-hidden="true">·</span>
                    <span>{current.stayContext}</span>
                  </p>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-[#137A3D]/25 flex items-center justify-center text-[#137A3D] hover:border-[#137A3D] hover:bg-[#137A3D]/10 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5">
              {testimonialsData.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`View review by ${item.author}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-7 bg-[#137A3D]' : 'w-2 bg-[#137A3D]/25'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-[#137A3D]/25 flex items-center justify-center text-[#137A3D] hover:border-[#137A3D] hover:bg-[#137A3D]/10 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

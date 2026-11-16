import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Expand, X } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';
import { useReducedMotion } from '../hooks/useReducedMotion';

const showcaseCards = [
  {
    id: 'sc-exterior',
    label: 'Exterior',
    title: 'Courtyard Lawn & Main Wing',
    imageKey: 'exterior',
  },
  {
    id: 'sc-restaurant',
    label: 'Restaurant',
    title: 'Aatchala Bengali Dining Pavilion',
    imageKey: 'restaurant',
  },
  {
    id: 'sc-front',
    label: 'Front View',
    title: 'Bikna Station Road Gateway',
    imageKey: 'entranceGate',
  },
  {
    id: 'sc-facade',
    label: 'Architecture',
    title: 'Mayaban Village Main Building',
    imageKey: 'resortFacade',
  },
  {
    id: 'sc-twilight',
    label: 'Evening',
    title: 'Illuminated Reception Wing',
    imageKey: 'twilightWing',
  },
  {
    id: 'sc-cottages',
    label: 'Gardens',
    title: 'Moonlit Garden Cottage Path',
    imageKey: 'nightCottages',
  },
  {
    id: 'sc-deluxe',
    label: 'Deluxe Rooms',
    title: 'Spacious Family Quarters',
    imageKey: 'deluxeTriple',
  },
  {
    id: 'sc-beds',
    label: 'Beds',
    title: 'Handcrafted Teak & Canopy Beds',
    imageKey: 'cottage',
  },
];

export function HorizontalShowcase() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
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
      !sectionRef.current ||
      !trackRef.current
    ) {
      return undefined;
    }

    let ctx;
    let mm;
    let active = true;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (!active || !sectionRef.current || !trackRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        mm = gsap.matchMedia();
        ctx = gsap.context(() => {
          mm.add('(min-width: 1024px)', () => {
            const track = trackRef.current;
            const getScrollDistance = () =>
              Math.max(0, track.scrollWidth - window.innerWidth + 120);

            gsap.to(track, {
              x: () => -getScrollDistance(),
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                scrub: 0.8,
                end: () => `+=${getScrollDistance()}`,
                invalidateOnRefresh: true,
              },
            });
          });
        }, sectionRef);
      }
    );

    return () => {
      active = false;
      if (ctx) ctx.revert();
      if (mm) mm.revert();
    };
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      aria-label="Resort visual showcase"
      className="relative bg-[#1F3D2B] text-[#F6F1E7] py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 lg:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] uppercase text-[#DFC15E]">
            Visual Journey
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-semibold text-[#F6F1E7]">
            Life Across Mayaban
          </h2>
        </div>
        <p className="text-sm text-[#F6F1E7]/75 max-w-md">
          Rooms, Restaurant, Exterior, Front View, Deluxe Rooms &amp; Handcrafted Beds — select any
          frame to inspect in full detail.
        </p>
      </div>

      {/* Horizontal Track on lg+, clean responsive grid on smaller viewports */}
      <div
        ref={trackRef}
        className="px-4 sm:px-6 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-nowrap gap-6 lg:gap-8 lg:w-max"
      >
        {showcaseCards.map((card) => (
          <button
            key={card.id}
            type="button"
            onClick={() => setSelectedItem(card)}
            className="group relative text-left rounded-2xl overflow-hidden bg-[#14291C] border border-[#C9A227]/20 lg:w-[440px] xl:w-[480px] shrink-0 focus-visible:outline-[#C9A227]"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <OptimizedImage
                imageKey={card.imageKey}
                sizes="(max-width: 1024px) 100vw, 480px"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#14291C]/90 via-[#14291C]/20 to-transparent"
            />
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#14291C]/70 text-[#DFC15E] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Expand className="w-4 h-4" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-xs tracking-[0.18em] uppercase text-[#DFC15E]">{card.label}</p>
              <h3 className="mt-1 font-serif text-2xl font-semibold text-[#F6F1E7]">
                {card.title}
              </h3>
            </div>
          </button>
        ))}
      </div>

      {/* Accessible Lightbox Modal via Radix Dialog */}
      <Dialog.Root
        open={Boolean(selectedItem)}
        onOpenChange={(open) => !open && setSelectedItem(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-[#14291C]/90 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 focus:outline-none">
            {selectedItem && (
              <div className="relative max-w-4xl w-full bg-[#FAF7F0] rounded-2xl overflow-hidden shadow-elevated border border-[#C9A227]/30">
                <Dialog.Close
                  aria-label="Close photo preview"
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#14291C]/85 text-[#F6F1E7] flex items-center justify-center hover:bg-[#14291C] transition-colors"
                >
                  <X className="w-5 h-5" />
                </Dialog.Close>

                <div className="aspect-[16/10] bg-[#14291C]">
                  <OptimizedImage
                    imageKey={selectedItem.imageKey}
                    sizes="90vw"
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex items-center justify-between gap-4">
                  <div>
                    <Dialog.Description className="text-xs uppercase tracking-[0.18em] text-[#B5654A]">
                      {selectedItem.label}
                    </Dialog.Description>
                    <Dialog.Title className="mt-1 font-serif text-2xl font-semibold text-[#1F3D2B]">
                      {selectedItem.title}
                    </Dialog.Title>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

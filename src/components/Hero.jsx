import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowDown, Phone, Play, X } from 'lucide-react';
import { SplitText } from '../animations/SplitText';
import { HeroVideo } from './HeroVideo';
import { YouTubeFacade } from './YouTubeFacade';
import { siteData } from '../data/site';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { prefetchRoute } from '../utils/routePrefetch';

export function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const [tourModalOpen, setTourModalOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const isLowEnd =
      typeof navigator !== 'undefined' &&
      ((navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
        (navigator.deviceMemory && navigator.deviceMemory <= 2));

    if (prefersReduced || isLowEnd || window.innerWidth < 1024 || !sectionRef.current || !bgRef.current) {
      return undefined;
    }

    let ctx;
    let active = true;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (!active || !sectionRef.current || !bgRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.to(bgRef.current, {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }, sectionRef);
      }
    );

    return () => {
      active = false;
      if (ctx) ctx.revert();
    };
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#14291C] text-[#F6F1E7]"
    >
      {/* Parallax Poster + Idle-Loaded Video Background */}
      <div ref={bgRef} className="absolute inset-0 -top-10 -bottom-10">
        <HeroVideo />
      </div>

      {/* Measured contrast scrim for WCAG AA text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#14291C]/90 via-[#14291C]/55 to-[#14291C]/45"
      />

      {/* Centered Editorial Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        <m.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs sm:text-sm tracking-[0.26em] uppercase text-[#1F3D2B] lg:text-[#DFC15E] mb-5"
        >
          Bikna Station Road · Mobarakpur · Bankura
        </m.p>

        <SplitText
          text="Welcome to Mayaban Village Resort"
          as="h1"
          immediate
          delay={0.2}
          highlightWords={['Mayaban', 'Village', 'Resort']}
          highlightClassName="hero-keyword"
          className="font-serif text-4xl sm:text-6xl lg:text-[4.25rem] font-semibold tracking-tight leading-[1.08] text-white drop-shadow-[0_2px_6px_rgba(20,41,28,0.95)] mx-auto max-w-4xl"
        />

        <m.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 text-lg sm:text-xl text-white/95 drop-shadow-[0_1px_4px_rgba(20,41,28,0.9)] font-light tracking-wide max-w-2xl mx-auto"
        >
          {siteData.tagline}
        </m.p>

        <m.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/rooms"
            onMouseEnter={() => prefetchRoute('/rooms')}
            onFocus={() => prefetchRoute('/rooms')}
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#C9A227] text-[#14291C] text-sm font-semibold tracking-wider uppercase hover:bg-[#DFC15E] transition-colors shadow-gold whitespace-nowrap shrink-0"
          >
            Book Your Room
          </Link>

          <a
            href={siteData.phoneHref}
            className="btn-gold-outline inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase text-[#F6F1E7] hover:text-[#14291C] whitespace-nowrap shrink-0"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span>Call Now</span>
          </a>

          <button
            type="button"
            onClick={() => setTourModalOpen(true)}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/12 backdrop-blur-md border border-white/25 text-sm font-medium text-[#F6F1E7] hover:bg-white/20 transition-colors whitespace-nowrap shrink-0"
          >
            <Play className="w-4 h-4 text-[#DFC15E] fill-current" aria-hidden="true" />
            <span>Inside Resort Tour</span>
          </button>
        </m.div>
      </div>

      {/* Animated Scroll-Down Indicator */}
      <m.a
        href="#resort-intro"
        aria-label="Scroll to resort introduction"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 7, 0] }}
        transition={{
          opacity: { delay: 1.0, duration: 0.5 },
          y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#1F3D2B] lg:text-white/90 hover:text-[#DFC15E] transition-colors"
      >
        <span className="text-[11px] tracking-[0.22em] uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 text-[#C9A227]" />
      </m.a>

      {/* Full Resort Tour Modal (YouTube Facade when YouTube ID is provided, or on-click tour player) */}
      <Dialog.Root open={tourModalOpen} onOpenChange={setTourModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-[#14291C]/92 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 focus:outline-none">
            <div className="relative max-w-5xl w-full bg-[#14291C] rounded-2xl overflow-hidden shadow-elevated border border-[#C9A227]/35">
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
                <div>
                  <Dialog.Title className="font-serif text-xl sm:text-2xl font-semibold text-[#F6F1E7]">
                    Inside Mayaban Village Resort
                  </Dialog.Title>
                  <Dialog.Description className="text-xs text-[#F6F1E7]/70">
                    Walkthrough of our entrance, reception, deluxe rooms, Aatchala restaurant &amp; banquet hall
                  </Dialog.Description>
                </div>
                <Dialog.Close
                  aria-label="Close resort tour video"
                  className="w-9 h-9 rounded-full bg-white/10 text-[#F6F1E7] flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </Dialog.Close>
              </div>

              {siteData.social.youtubeTourId ? (
                <YouTubeFacade
                  videoId={siteData.social.youtubeTourId}
                  title="Mayaban Village Resort Full Tour"
                  posterKey="exterior"
                />
              ) : (
                <div className="aspect-video bg-black">
                  <video
                    src={siteData.resortTourVideo}
                    poster="/video/hero-poster.webp"
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

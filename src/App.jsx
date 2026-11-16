import { lazy, Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { PageSkeleton } from './components/Skeleton';
import { PWAUpdatePrompt } from './components/PWAUpdatePrompt';
import { useReducedMotion } from './hooks/useReducedMotion';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Rooms = lazy(() => import('./pages/Rooms'));
const RoomDetail = lazy(() => import('./pages/RoomDetail'));
const Events = lazy(() => import('./pages/Events'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteLoader() {
  return <PageSkeleton />;
}

function PageWrapper({ children }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div>{children}</div>;
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}

export default function App() {
  const location = useLocation();
  const prefersReduced = useReducedMotion();
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const onQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  // Dynamic import of Lenis + GSAP on capable desktop screens only
  useEffect(() => {
    const isLowEnd =
      typeof navigator !== 'undefined' &&
      ((navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) ||
        (navigator.deviceMemory && navigator.deviceMemory <= 2));

    if (prefersReduced || isLowEnd || typeof window === 'undefined' || window.innerWidth < 1024) {
      return undefined;
    }

    let active = true;
    let lenis;
    let gsapInstance;
    let updateTicker;

    Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
        if (!active) return;
        gsapInstance = gsap;
        gsap.registerPlugin(ScrollTrigger);

        lenis = new Lenis({
          duration: 1.15,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        lenis.on('scroll', ScrollTrigger.update);

        updateTicker = (time) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(updateTicker);
        gsap.ticker.lagSmoothing(0);
      }
    );

    return () => {
      active = false;
      if (gsapInstance && updateTicker) {
        gsapInstance.ticker.remove(updateTicker);
      }
      if (lenis) {
        lenis.destroy();
      }
    };
  }, [prefersReduced]);

  // Scroll to top and refresh GSAP ScrollTrigger on route change if already loaded
  useEffect(() => {
    window.scrollTo(0, 0);
    if (typeof window === 'undefined' || window.innerWidth < 1024 || prefersReduced) {
      return undefined;
    }
    const refreshTimer = setTimeout(() => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    }, 150);
    return () => clearTimeout(refreshTimer);
  }, [location.pathname, prefersReduced]);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="relative min-h-screen flex flex-col bg-[#F6F1E7] text-[#2B2B2B]">
        {/* Subtle grain texture across entire canvas */}
        <div
          aria-hidden="true"
          className="grain-overlay fixed inset-0 pointer-events-none z-[60]"
        />

        {mapsQuotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

        <Preloader />
        <CustomCursor />
        <Navbar />

        <main className="flex-1">
          <Suspense fallback={<RouteLoader />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <PageWrapper>
                      <Home />
                    </PageWrapper>
                  }
                />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route
                  path="/about"
                  element={
                    <PageWrapper>
                      <About />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/rooms"
                  element={
                    <PageWrapper>
                      <Rooms />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/rooms/:slug"
                  element={
                    <PageWrapper>
                      <RoomDetail />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/events"
                  element={
                    <PageWrapper>
                      <Events />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/gallery"
                  element={
                    <PageWrapper>
                      <Gallery />
                    </PageWrapper>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PageWrapper>
                      <Contact />
                    </PageWrapper>
                  }
                />
                <Route
                  path="*"
                  element={
                    <PageWrapper>
                      <NotFound />
                    </PageWrapper>
                  }
                />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>

        <Footer />
        <WhatsAppButton />
        <PWAUpdatePrompt />
      </div>
    </LazyMotion>
  );
}

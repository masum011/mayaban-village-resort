import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteData } from '../data/site';
import { prefetchRoute } from '../utils/routePrefetch';
import { PWAInstallButton } from './PWAUpdatePrompt';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us' },
  { to: '/rooms', label: 'Rooms' },
  { to: '/events', label: 'Banquet & Events' },
  { to: '/gallery', label: 'Our Gallery' },
  { to: '/contact', label: 'Contact Us' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 44);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const isTransparent = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-[#14291C]/25 backdrop-blur-md border-b border-white/15 text-[#F6F1E7]'
          : 'bg-[#F6F1E7]/95 backdrop-blur-md border-b border-[#1F3D2B]/12 text-[#1F3D2B] shadow-soft'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Lockup */}
        <Link
          to="/"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'auto'
                  : 'smooth',
              });
            }
          }}
          onMouseEnter={() => prefetchRoute('/')}
          className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-[#C9A227]"
        >
          <img
            src={siteData.logo}
            alt="Mayaban Village Resort Logo"
            width={44}
            height={50}
            className="h-10 sm:h-11 w-auto object-contain shrink-0 drop-shadow-[0_1px_6px_rgba(255,255,255,0.28)]"
          />
          <span className="font-serif text-lg sm:text-2xl font-semibold tracking-tight">
            {siteData.name}
          </span>
        </Link>

        {/* Zone 2: Concise single-line navigation links with route prefetch */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6 xl:gap-7">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onMouseEnter={() => prefetchRoute(item.to)}
              onFocus={() => prefetchRoute(item.to)}
              className={({ isActive }) =>
                `relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 ${
                  isTransparent
                    ? isActive
                      ? 'text-[#DFC15E]'
                      : 'text-[#F6F1E7]/90 hover:text-white'
                    : isActive
                    ? 'text-[#B5654A]'
                    : 'text-[#2B2B2B]/85 hover:text-[#1F3D2B]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span
                    className={`absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#C9A227] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/rooms"
            onMouseEnter={() => prefetchRoute('/rooms')}
            onFocus={() => prefetchRoute('/rooms')}
            className={`hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap shrink-0 transition-all duration-200 ${
              isTransparent
                ? 'bg-[#C9A227] text-[#14291C] hover:bg-[#DFC15E]'
                : 'bg-[#1F3D2B] text-[#F6F1E7] hover:bg-[#14291C] border border-[#C9A227]/40'
            }`}
          >
            Book Now
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-current/20 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <m.nav
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-[#F6F1E7] text-[#1F3D2B] border-b border-[#1F3D2B]/15"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onFocus={() => prefetchRoute(item.to)}
                  className={({ isActive }) =>
                    `px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#1F3D2B]/8 text-[#B5654A]'
                        : 'text-[#2B2B2B] hover:bg-[#1F3D2B]/5'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-3 mt-2 border-t border-[#1F3D2B]/10 flex flex-col gap-2">
                <Link
                  to="/rooms"
                  className="w-full inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-sm font-semibold tracking-wider uppercase"
                >
                  Book Now
                </Link>
                <PWAInstallButton className="w-full justify-center bg-[#14291C] text-[#DFC15E]" />
              </div>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

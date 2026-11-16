import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { OptimizedImage } from './OptimizedImage';

function shouldSkipBackgroundVideo() {
  if (typeof navigator === 'undefined') return false;
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!conn) return false;
  if (conn.saveData) return true;
  if (conn.effectiveType && ['slow-2g', '2g', '3g'].includes(conn.effectiveType)) return true;
  return false;
}

/**
 * Performance-first Hero background video:
 * 1. Renders LCP poster image immediately with fetchPriority="high".
 * 2. Mounts video only after browser idle (requestIdleCallback).
 * 3. Skips video under prefers-reduced-motion or slow/save-data connections.
 * 4. Pauses video automatically when scrolled off-screen via IntersectionObserver.
 */
export function HeroVideo() {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [enableVideo, setEnableVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (prefersReduced || shouldSkipBackgroundVideo()) return undefined;

    setIsMobile(window.innerWidth < 768);

    let cancelled = false;
    const activate = () => {
      if (!cancelled) setEnableVideo(true);
    };

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(activate, { timeout: 600 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const timer = setTimeout(activate, 350);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [prefersReduced]);

  // Pause video automatically when off-screen
  useEffect(() => {
    const videoEl = videoRef.current;
    const containerEl = containerRef.current;
    if (!enableVideo || !videoEl || !containerEl || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerEl);
    return () => observer.disconnect();
  }, [enableVideo]);

  const webmSrc = isMobile ? '/video/hero-mobile.webm' : '/video/hero-desktop.webm';
  const mp4Src = isMobile ? '/video/hero-mobile.mp4' : '/video/hero-desktop.mp4';

  return (
    <div ref={containerRef} className="relative w-full h-full bg-[#14291C]">
      {isMobile && (
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <OptimizedImage
            imageKey="exterior"
            sizes="100vw"
            className="w-full h-full object-cover blur-md scale-110 opacity-60"
          />
        </div>
      )}

      {/* Instant LCP Poster Image */}
      <OptimizedImage
        imageKey="exterior"
        priority
        sizes="100vw"
        alt="Mayaban Village Resort courtyard, green Aatchala restaurant, and main wing in Bankura"
        className={`w-full h-full object-center ${isMobile ? 'object-contain' : 'object-cover'}`}
      />

      {enableVideo && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.webp"
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          className={`absolute inset-0 w-full h-full object-center transition-opacity duration-700 ${
            isMobile ? 'object-contain' : 'object-cover'
          } ${
            videoReady ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { ExternalLink, MapPin, Navigation } from 'lucide-react';
import { siteData } from '../data/site';
import { OptimizedImage } from './OptimizedImage';

const ResortGoogleMap = lazy(() => import('./ResortGoogleMap'));

/**
 * Lazy interactive Google Maps wrapper:
 * Keeps @vis.gl/react-google-maps out of the initial first-load JS bundle and
 * hydrates automatically on scroll-into-view (or click) using the verified pin.
 */
export function ClickToLoadMap({
  autoLoadInView = true,
  heightClass = 'h-[340px] sm:h-[400px]',
}) {
  const containerRef = useRef(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (!autoLoadInView || shouldMount || !containerRef.current) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setShouldMount(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: '260px 0px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [autoLoadInView, shouldMount]);

  return (
    <div
      ref={containerRef}
      className="rounded-2xl overflow-hidden border border-[#1F3D2B]/15 bg-[#EFE7D6] shadow-soft"
    >
      {shouldMount ? (
        <Suspense
          fallback={
            <div className={`${heightClass} w-full skeleton-shimmer flex items-center justify-center`}>
              <span className="text-xs font-medium text-[#1F3D2B]/70">
                Loading interactive Google Map...
              </span>
            </div>
          }
        >
          <ResortGoogleMap heightClass={heightClass} />
        </Suspense>
      ) : (
        <div className={`relative ${heightClass} flex flex-col items-center justify-center p-6 text-center overflow-hidden`}>
          <div className="absolute inset-0 opacity-25">
            <OptimizedImage
              imageKey="exterior"
              alt="Bikna Station Road, Bankura location preview"
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 max-w-xs space-y-3 bg-[#FAF7F0]/95 backdrop-blur-sm p-5 rounded-xl border border-[#1F3D2B]/12 shadow-soft">
            <div className="w-10 h-10 rounded-full bg-[#137A3D]/12 flex items-center justify-center mx-auto">
              <MapPin className="w-5 h-5 text-[#137A3D]" aria-hidden="true" />
            </div>
            <div>
              <p className="font-serif text-lg font-semibold text-[#1F3D2B]">
                Bikna Station Road, Mobarakpur
              </p>
              <p className="text-xs text-[#57534E]">Bankura, West Bengal 722155</p>
            </div>
            <button
              type="button"
              onClick={() => setShouldMount(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold tracking-wider uppercase hover:bg-[#14291C] transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-[#DFC15E]" aria-hidden="true" />
              <span>Load Interactive Map</span>
            </button>
          </div>
        </div>
      )}

      <div className="px-5 py-3.5 bg-[#FAF7F0] flex flex-wrap items-center justify-between gap-2 text-xs text-[#57534E] border-t border-[#1F3D2B]/10">
        <span>Bikna Station Road, Mobarakpur, Bankura 722155</span>
        <div className="flex items-center gap-4">
          <a
            href={siteData.location.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#137A3D] hover:underline whitespace-nowrap"
          >
            <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Directions</span>
          </a>
          <a
            href={siteData.location.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#1F3D2B] hover:text-[#137A3D] underline whitespace-nowrap"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

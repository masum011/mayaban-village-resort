import { useState } from 'react';
import { Play } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

/**
 * Lazy-loaded YouTube facade using youtube-nocookie.com.
 * Displays a crisp local thumbnail first and mounts the iframe only on click.
 */
export function YouTubeFacade({
  videoId,
  title = 'Mayaban Village Resort Tour',
  posterKey = 'hero',
}) {
  const [activated, setActivated] = useState(false);

  if (!videoId) return null;

  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#14291C] border border-[#C9A227]/25 shadow-elevated">
      {activated ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="w-full h-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          aria-label={`Play video: ${title}`}
          className="group relative w-full h-full block text-left focus-visible:outline-[#C9A227]"
        >
          <OptimizedImage
            imageKey={posterKey}
            alt={title}
            sizes="(max-width: 1024px) 100vw, 80vw"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#14291C]/45 group-hover:bg-[#14291C]/35 transition-colors"
          />
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#F6F1E7]">
            <span className="w-16 h-16 rounded-full bg-[#C9A227] text-[#14291C] flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 fill-current ml-0.5" aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase bg-[#14291C]/80 px-4 py-1.5 rounded-full">
              Watch Resort Tour
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

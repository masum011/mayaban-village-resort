import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { prefetchRoute } from '../utils/routePrefetch';

export function RoomCard({ room }) {
  const prefersReduced = useReducedMotion();

  return (
    <m.article
      whileHover={prefersReduced ? undefined : { y: -6 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-[#FAF7F0] rounded-2xl overflow-hidden border border-[#1F3D2B]/10 shadow-soft hover:shadow-elevated transition-shadow duration-300"
    >
      {/* Image Container with smooth zoom & slide-in action */}
      <Link
        to={`/rooms/${room.slug}`}
        onMouseEnter={() => prefetchRoute(`/rooms/${room.slug}`)}
        onFocus={() => prefetchRoute(`/rooms/${room.slug}`)}
        aria-label={`View ${room.name} details and tariffs`}
        className="relative aspect-[4/3] overflow-hidden bg-[#EFE7D6] block"
      >
        <OptimizedImage
          imageKey={room.primaryImageKey}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#14291C]/55 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"
        />
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A227] text-[#14291C] text-xs font-semibold tracking-wider uppercase translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          Book Now
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </Link>

      {/* Editorial Card Body (Zero-Pill Unboxed Metadata) */}
      <div className="p-6 sm:p-7 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-[#B5654A] font-medium tracking-wide">
          <span>{room.category}</span>
          <span aria-hidden="true">·</span>
          <span>{room.size}</span>
          <span aria-hidden="true">·</span>
          <span>
            {room.maxGuests} {room.maxGuests === 1 ? 'Guest' : 'Guests'}
          </span>
        </div>

        <h3 className="mt-2.5 font-serif text-2xl sm:text-[1.75rem] font-semibold text-[#1F3D2B] leading-snug">
          <Link
            to={`/rooms/${room.slug}`}
            onMouseEnter={() => prefetchRoute(`/rooms/${room.slug}`)}
            className="hover:text-[#B5654A] transition-colors"
          >
            {room.name}
          </Link>
        </h3>

        <p className="mt-2.5 text-sm text-[#57534E] leading-relaxed flex-1">
          {room.shortDescription}
        </p>

        <div className="mt-5 pt-4 border-t border-[#1F3D2B]/10 flex items-center justify-between gap-4">
          <p className="text-xs font-medium text-[#1F3D2B]/80">
            {room.price ? room.price : room.priceNote}
          </p>
          <Link
            to={`/rooms/${room.slug}`}
            onMouseEnter={() => prefetchRoute(`/rooms/${room.slug}`)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#1F3D2B] hover:text-[#B5654A] whitespace-nowrap shrink-0 transition-colors"
          >
            <span>Explore {room.name}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#137A3D] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </m.article>
  );
}

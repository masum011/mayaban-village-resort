import { useEffect, useRef, useState } from 'react';
import { TreePine } from 'lucide-react';
import imageManifest from '../data/imageManifest.json';

const KEY_TO_SLUG = {
  hero: 'hero',
  deluxeTriple: 'deluxe-triple',
  deluxeDouble: 'deluxe-double',
  deluxeSingle: 'deluxe-single',
  cottage: 'cottage',
  restaurant: 'restaurant',
  banquet: 'banquet',
  exterior: 'exterior',
  bankuraHills: 'bankura-hills',
  entranceGate: 'entrance-gate',
  resortFacade: 'resort-facade',
  courtyardDrive: 'courtyard-drive',
  twilightWing: 'twilight-wing',
  nightCottages: 'night-cottages',
  festiveEvening: 'festive-evening',
};

const ALT_TEXT = {
  hero: 'Mayaban Village Resort golden hour courtyard, terracotta cottages, and reflective pond in Bankura',
  'deluxe-triple':
    'Deluxe Triple Bed room at Mayaban Village Resort with three handcrafted teak beds and garden doors',
  'deluxe-double':
    'Deluxe Double Bed suite featuring king teak bed, terracotta kantha runner, and misty forest window',
  'deluxe-single':
    'Deluxe Single Bed room with artisanal wooden bed, bamboo chair, and sunlit garden view',
  cottage:
    'Standalone Heritage Cottage Room with vaulted timber roof, sheer canopy bed, and private wooden verandah',
  restaurant:
    'Aatchala Mayaban Village dining pavilion framed by palm trees, lawn, and terracotta sculpture in Bankura',
  banquet:
    'Evening wedding and banquet celebration lawn at Mayaban Village Resort, Mobarakpur, Bankura',
  exterior:
    'Mayaban Village Resort courtyard showing the green-roofed Aatchala restaurant, garden lawn, and main building wing',
  'bankura-hills':
    'Scenic Susunia Pahar hills and Mukutmanipur reservoir waters near Bankura',
  'entrance-gate':
    'Main entrance gateway of Mayaban Village Hotel and Resort on Bikna Station Road, Bankura',
  'resort-facade':
    'Front elevation of the main Mayaban Village Hotel and Resort building with private balconies',
  'courtyard-drive':
    'Paved resort courtyard driveway, manicured lawn garden, and main accommodation wing at Mayaban Village Resort',
  'twilight-wing':
    'Nighttime illuminated reception entrance and guest wing courtyard at Mayaban Village Resort',
  'night-cottages':
    'Illuminated evening garden pathway leading to heritage cottage rooms at Mayaban Village Resort',
  'festive-evening':
    'Mayaban Village Resort illuminated for Deepavali celebrations on Bikna Station Road, Bankura',
};

function buildSrcSet(slug, widths, ext) {
  return widths.map((w) => `/images/${slug}-${w}.${ext} ${w}w`).join(', ');
}

export function OptimizedImage({
  imageKey,
  alt,
  className = '',
  wrapperClassName = 'w-full h-full',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1280px',
  priority = false,
}) {
  const slug = KEY_TO_SLUG[imageKey] || imageKey || 'hero';
  const meta = imageManifest[slug] || { width: 1280, height: 960, widths: [480, 768, 1280], lqip: '' };
  const widths = meta.widths && meta.widths.length ? meta.widths : [480, 768, 1280];
  const fallbackWidth = widths.includes(1280) ? 1280 : widths[widths.length - 1];
  const resolvedAlt = alt || ALT_TEXT[slug] || 'Mayaban Village Resort, Bankura';

  const [loaded, setLoaded] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setHasError(false);
    if (priority || (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0)) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [slug, priority]);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1F3D2B] via-[#2C543C] to-[#14291C] text-[#F6F1E7] p-6 text-center ${wrapperClassName}`}
        role="img"
        aria-label={resolvedAlt}
      >
        <TreePine className="w-8 h-8 text-[#DFC15E] mb-2 opacity-85" aria-hidden="true" />
        <span className="font-serif text-sm tracking-wide text-[#F6F1E7]/90">
          {resolvedAlt}
        </span>
      </div>
    );
  }

  return (
    <picture
      className={`relative block overflow-hidden bg-cover bg-center ${wrapperClassName}`}
      style={
        !loaded && meta.lqip
          ? { backgroundImage: `url("${meta.lqip}")` }
          : undefined
      }
    >
      {!loaded && (
        <span
          aria-hidden="true"
          className="skeleton-shimmer absolute inset-0 w-full h-full opacity-50 z-0"
        />
      )}
      <source type="image/avif" srcSet={buildSrcSet(slug, widths, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={buildSrcSet(slug, widths, 'webp')} sizes={sizes} />
      <img
        ref={imgRef}
        src={`/images/${slug}-${fallbackWidth}.jpg`}
        srcSet={buildSrcSet(slug, widths, 'jpg')}
        sizes={sizes}
        alt={resolvedAlt}
        width={meta.width}
        height={meta.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        className={`relative z-10 transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      />
    </picture>
  );
}

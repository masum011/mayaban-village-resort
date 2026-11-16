import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SplitText } from '../animations/SplitText';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { galleryCategories, galleryItems } from '../data/gallery';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const visibleItems =
    selectedCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const activeItem = lightboxIndex !== null ? visibleItems[lightboxIndex] : null;

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % visibleItems.length);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + visibleItems.length) % visibleItems.length);
  };

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <>
      <SEO
        title="Our Gallery"
        description="View photos of Mayaban Village Resort in Mobarakpur, Bankura — cottage verandahs, deluxe rooms, in-house Bengali restaurant, and celebration lawns."
        path="/gallery"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Our Gallery', path: '/gallery' },
        ]}
      />

      <div className="pt-28 lg:pt-36 pb-24 bg-[#F6F1E7] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
              Resort Visual Archive
            </p>
            <SplitText
              text="Our Gallery"
              as="h1"
              immediate
              className="mt-3 font-serif text-4xl sm:text-6xl font-semibold text-[#1F3D2B]"
            />
            <p className="mt-4 text-base text-[#57534E]">
              Moments across our cottages, deluxe suites, dining colonnade, and celebration lawns.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Filter gallery images by category"
            className="mt-10 flex flex-wrap items-center gap-2"
          >
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#1F3D2B] text-[#F6F1E7] shadow-sm'
                    : 'bg-[#EFE7D6] text-[#2B2B2B] hover:bg-[#1F3D2B]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence mode="popLayout">
              {visibleItems.map((item, idx) => (
                <m.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative w-full break-inside-avoid rounded-2xl overflow-hidden bg-[#FAF7F0] border border-[#1F3D2B]/10 shadow-soft text-left block focus-visible:outline-[#C9A227]"
                >
                  <div
                    className={`overflow-hidden ${
                      item.aspect === 'tall'
                        ? 'aspect-[3/4]'
                        : item.aspect === 'wide'
                        ? 'aspect-[16/10]'
                        : item.aspect === 'square'
                        ? 'aspect-square'
                        : 'aspect-[4/3]'
                    }`}
                  >
                    <ResponsiveImage
                      imageKey={item.imageKey}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#14291C]/85 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity"
                  />
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#14291C]/75 text-[#DFC15E] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Expand className="w-4 h-4" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-[#F6F1E7]">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#DFC15E]">
                      {item.category}
                    </p>
                    <h2 className="mt-1 font-serif text-xl font-semibold">{item.title}</h2>
                  </div>
                </m.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Animated Lightbox Dialog */}
      <Dialog.Root
        open={lightboxIndex !== null}
        onOpenChange={(open) => !open && setLightboxIndex(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-[#14291C]/92 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 focus:outline-none">
            {activeItem && (
              <m.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-5xl w-full bg-[#FAF7F0] rounded-2xl overflow-hidden shadow-elevated border border-[#C9A227]/30"
              >
                <Dialog.Close
                  aria-label="Close gallery lightbox"
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#14291C]/85 text-[#F6F1E7] flex items-center justify-center hover:bg-[#14291C]"
                >
                  <X className="w-5 h-5" />
                </Dialog.Close>

                <div className="relative aspect-[16/10] bg-[#14291C]">
                  <ResponsiveImage
                    imageKey={activeItem.imageKey}
                    priority
                    sizes="95vw"
                    className="w-full h-full object-contain"
                  />

                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#14291C]/75 text-[#F6F1E7] flex items-center justify-center hover:bg-[#14291C]"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#14291C]/75 text-[#F6F1E7] flex items-center justify-center hover:bg-[#14291C]"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <Dialog.Title className="font-serif text-2xl font-semibold text-[#1F3D2B]">
                      {activeItem.title}
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-[#57534E] mt-1">
                      {activeItem.caption}
                    </Dialog.Description>
                  </div>
                  <span className="text-xs font-medium text-[#B5654A] shrink-0">
                    {activeItem.category} · {lightboxIndex + 1} / {visibleItems.length}
                  </span>
                </div>
              </m.div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

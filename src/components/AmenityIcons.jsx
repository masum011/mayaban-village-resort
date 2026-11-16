import { m } from 'framer-motion';
import { siteData } from '../data/site';
import { StaggerChildren, StaggerItem } from '../animations/StaggerChildren';

const spriteMap = {
  wifi: 'icon-wifi',
  ac: 'icon-ac',
  tv: 'icon-tv',
  geyser: 'icon-geyser',
  service: 'icon-service',
};

export function AmenityIcons() {
  return (
    <section
      aria-label="Quick resort amenities"
      className="bg-[#FAF7F0] border-y border-[#1F3D2B]/10 py-10 lg:py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerChildren className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {siteData.quickAmenities.map((item) => {
            const symbolId = spriteMap[item.id] || 'icon-wifi';
            return (
              <StaggerItem key={item.id}>
                <m.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/70 border border-[#1F3D2B]/8 hover:border-[#C9A227]/50 transition-colors"
                >
                  <div className="w-11 h-11 rounded-full bg-[#137A3D]/10 flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-[#137A3D]" aria-hidden="true">
                      <use href={`/icons/resort-sprite.svg#${symbolId}`} />
                    </svg>
                  </div>
                  <p className="font-serif text-lg font-semibold text-[#1F3D2B]">{item.label}</p>
                  <p className="mt-1 text-xs text-[#57534E] leading-relaxed">{item.detail}</p>
                </m.div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}

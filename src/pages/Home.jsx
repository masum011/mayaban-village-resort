import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { AmenityIcons } from '../components/AmenityIcons';
import { RoomCard } from '../components/RoomCard';
import { HorizontalShowcase } from '../components/HorizontalShowcase';
import { Testimonials } from '../components/Testimonials';
import { PlacesToVisit } from '../components/PlacesToVisit';
import { ClickToLoadMap } from '../components/ClickToLoadMap';
import { FadeIn } from '../animations/FadeIn';
import { ParallaxImage } from '../animations/ParallaxImage';
import { StaggerChildren, StaggerItem } from '../animations/StaggerChildren';
import { siteData } from '../data/site';
import { roomsData } from '../data/rooms';
import { prefetchRoute } from '../utils/routePrefetch';

export default function Home() {
  const previewRooms = roomsData.filter((r) => r.slug !== 'cottage-room').slice(0, 3);

  return (
    <>
      <SEO
        title="Best Resort in Bankura"
        description="Book Mayaban Village Resort near Bikna Station Road, Bankura — heritage cottages, deluxe AC rooms, Bengali dining, and scenic wedding banquet halls."
        path="/"
        schemaType="Hotel"
      />

      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Resort Intro */}
      <section id="resort-intro" className="py-20 lg:py-28 bg-[#F6F1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <FadeIn className="lg:col-span-6 space-y-6">
              <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
                Rustic Bengal Heritage
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1F3D2B] leading-[1.12]">
                Where Rustic Charm Meets Modern Comfort
              </h2>
              <div className="gold-divider w-24" />
              <p className="text-base sm:text-lg text-[#2B2B2B]/85 leading-relaxed">
                {siteData.description}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-5">
                <Link
                  to="/about"
                  onMouseEnter={() => prefetchRoute('/about')}
                  onFocus={() => prefetchRoute('/about')}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold tracking-wider uppercase hover:bg-[#14291C] transition-colors"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/rooms/cottage-room"
                  onMouseEnter={() => prefetchRoute('/rooms/cottage-room')}
                  onFocus={() => prefetchRoute('/rooms/cottage-room')}
                  className="text-sm font-medium text-[#1F3D2B] hover:text-[#B5654A] underline underline-offset-4 decoration-[#C9A227]"
                >
                  Explore Cottage Suites
                </Link>
              </div>
            </FadeIn>

            <div className="lg:col-span-6 relative">
              <div className="space-y-4">
                <ParallaxImage
                  imageKey="exterior"
                  alt="Mayaban Village Resort courtyard, green Aatchala restaurant, lawn, and main wing"
                  className="rounded-2xl aspect-[16/10] shadow-elevated border border-[#C9A227]/25"
                  speed={10}
                />
                <div className="grid grid-cols-2 gap-4">
                  <ParallaxImage
                    imageKey="resortFacade"
                    alt="Mayaban Village Hotel and Resort front elevation with private balconies"
                    className="rounded-2xl aspect-[16/10] shadow-soft border border-[#1F3D2B]/10"
                    speed={14}
                  />
                  <ParallaxImage
                    imageKey="restaurant"
                    alt="Aatchala dining pavilion surrounded by greenery at Mayaban Village Resort"
                    className="rounded-2xl aspect-[16/10] shadow-soft border border-[#C9A227]/30"
                    speed={16}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Amenities Row */}
      <AmenityIcons />

      {/* 4. Our Rooms Preview */}
      <section className="py-20 lg:py-28 bg-[#F6F1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
                Accommodations
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-semibold text-[#1F3D2B]">
                Our Rooms &amp; Suites
              </h2>
            </div>
            <Link
              to="/rooms"
              onMouseEnter={() => prefetchRoute('/rooms')}
              onFocus={() => prefetchRoute('/rooms')}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1F3D2B] hover:text-[#B5654A] transition-colors whitespace-nowrap"
            >
              <span>View All 4 Room Categories</span>
              <ArrowRight className="w-4 h-4 text-[#137A3D]" />
            </Link>
          </FadeIn>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
            {previewRooms.map((room) => (
              <StaggerItem key={room.id}>
                <RoomCard room={room} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* 5. Services */}
      <section className="py-20 lg:py-28 bg-[#FAF7F0] border-t border-[#1F3D2B]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="max-w-2xl mb-14">
            <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
              Curated Experiences
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-semibold text-[#1F3D2B]">
              Hospitality Crafted Around Every Stay
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {siteData.services.map((service, idx) => (
              <FadeIn key={service.index} delay={idx * 0.08}>
                <Link
                  to={service.link}
                  onMouseEnter={() => prefetchRoute(service.link)}
                  onFocus={() => prefetchRoute(service.link)}
                  className="group grid grid-cols-1 sm:grid-cols-12 bg-white rounded-2xl overflow-hidden border border-[#1F3D2B]/10 shadow-soft hover:shadow-elevated transition-all duration-300 h-full"
                >
                  <div className="sm:col-span-5 aspect-[4/3] sm:aspect-auto overflow-hidden">
                    <ParallaxImage
                      imageKey={service.imageKey}
                      alt={service.title}
                      className="w-full h-full"
                      imgClassName="transition-transform duration-700 group-hover:scale-105"
                      speed={8}
                    />
                  </div>
                  <div className="sm:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <p className="text-xs text-[#B5654A] font-medium">
                        {service.index}. {service.subtitle}
                      </p>
                      <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-[#1F3D2B] group-hover:text-[#B5654A] transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm text-[#57534E] leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#1F3D2B]">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#137A3D] transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Photo Showcase (GSAP Horizontal Scroll + Lightbox) */}
      <HorizontalShowcase />

      {/* 7. Testimonials Slider */}
      <Testimonials />

      {/* 8. Offer Banner */}
      <section className="py-16 lg:py-20 bg-[#1F3D2B] text-[#F6F1E7] relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,#C9A227_0%,transparent_55%)]"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <FadeIn className="max-w-2xl">
            <p className="text-xs tracking-[0.22em] uppercase text-[#DFC15E]">
              Seasonal Direct Booking Privilege
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F6F1E7] leading-tight">
              Book Your Dream Vacation Today! Get Discounted Offer Price Now
            </h2>
          </FadeIn>

          <FadeIn delay={0.12} className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <a
              href={siteData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C9A227] text-[#14291C] text-xs font-semibold tracking-wider uppercase hover:bg-[#DFC15E] transition-colors shadow-gold whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp for Offer</span>
            </a>
            <a
              href={siteData.phoneHref}
              className="btn-gold-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#F6F1E7] hover:text-[#14291C] whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              <span>{siteData.phone}</span>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* 9. Places To Visit */}
      <PlacesToVisit />

      {/* 10. Resort Location & Interactive Google Map */}
      <section className="py-20 lg:py-24 bg-[#FAF7F0] border-t border-[#1F3D2B]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <FadeIn className="lg:col-span-5 space-y-5">
              <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
                Arrive With Ease
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1F3D2B] leading-tight">
                Find Us in Bankura
              </h2>
              <div className="gold-divider w-24" />
              <div className="flex items-start gap-3 text-[#2B2B2B]/85 text-base leading-relaxed">
                <MapPin className="w-5 h-5 text-[#137A3D] shrink-0 mt-1" aria-hidden="true" />
                <p>{siteData.address}</p>
              </div>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Conveniently positioned off Bikna Station Road near Bankura rail connectivity and
                Bikna Dokra Craft Village, with tranquil countryside surroundings and free on-site
                guest parking.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={siteData.location.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold tracking-wider uppercase hover:bg-[#14291C] transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#DFC15E]" aria-hidden="true" />
                  <span>Get Directions</span>
                </a>
                <a
                  href={siteData.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-outline inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wider uppercase text-[#1F3D2B] hover:text-[#14291C]"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>View Pin</span>
                </a>
              </div>
            </FadeIn>

            <div className="lg:col-span-7">
              <ClickToLoadMap autoLoadInView heightClass="h-[340px] sm:h-[400px]" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

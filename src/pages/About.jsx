import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SplitText } from '../animations/SplitText';
import { FadeIn } from '../animations/FadeIn';
import { ParallaxImage } from '../animations/ParallaxImage';
import { siteData } from '../data/site';
import { prefetchRoute } from '../utils/routePrefetch';

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Discover Mayaban Village Resort at Bikna Station Road, Mobarakpur, Bankura — rustic Bengal eco-cottages, warm hospitality, near Susunia Pahar & Dam."
        path="/about"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]}
      />

      <div className="pt-28 lg:pt-36 pb-20 bg-[#F6F1E7]">
        {/* Editorial Hero Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
              Our Story · Bikna Station Road, Bankura
            </p>
            <SplitText
              text="Welcome to Mayaban Village Resort"
              as="h1"
              immediate
              className="mt-4 font-serif text-4xl sm:text-6xl font-semibold text-[#1F3D2B] leading-[1.08]"
            />
            <p className="mt-6 text-lg sm:text-xl text-[#2B2B2B]/85 leading-relaxed">
              A perfect blend of comfort, tradition and tranquility at Bikna Station Road,
              Bankura. Mayaban offers a true village experience with modern amenities, thoughtfully
              crafted for families, couples, and travelers seeking unhurried peace.
            </p>
          </div>

          {/* Parallax Architectural Gallery Split */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-7">
              <ParallaxImage
                imageKey="resortFacade"
                priority
                alt="Mayaban Village Hotel and Resort main elevation in Bankura"
                className="rounded-2xl aspect-[16/10] lg:h-full shadow-elevated border border-[#C9A227]/25"
                speed={10}
              />
            </div>
            <div className="lg:col-span-5 flex flex-col gap-6">
              <ParallaxImage
                imageKey="entranceGate"
                alt="Mayaban Village Resort entrance gate on Bikna Station Road"
                className="rounded-2xl aspect-[16/9] shadow-soft"
                speed={14}
              />
              <div className="bg-[#FAF7F0] rounded-2xl border border-[#1F3D2B]/10 p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#137A3D] font-medium">
                    <MapPin className="w-4 h-4 text-[#137A3D]" />
                    <span>Bankura, West Bengal</span>
                  </div>
                  <p className="mt-3 font-serif text-2xl font-semibold text-[#1F3D2B]">
                    Minutes from Bikna Artisans &amp; Rail Connectivity
                  </p>
                </div>
                <p className="mt-3 text-sm text-[#57534E] leading-relaxed">
                  {siteData.address}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Best Hospitality Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 lg:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-4">
              <ParallaxImage
                imageKey="restaurant"
                alt="Aatchala restaurant dining hall and terracotta sculpture garden"
                className="rounded-2xl aspect-[3/2] shadow-elevated border border-[#C9A227]/25"
                speed={10}
              />
              <div className="grid grid-cols-2 gap-4">
                <ParallaxImage
                  imageKey="twilightWing"
                  alt="Evening illuminated reception wing and driveway at Mayaban Village"
                  className="rounded-2xl aspect-[4/3] shadow-soft"
                  speed={14}
                />
                <ParallaxImage
                  imageKey="nightCottages"
                  alt="Nighttime garden walkway and cottages at Mayaban Village Resort"
                  className="rounded-2xl aspect-[4/3] shadow-soft"
                  speed={16}
                />
              </div>
            </div>

            <FadeIn className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
                Our Philosophy
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#1F3D2B] leading-tight">
                Experience Best Hospitality
              </h2>
              <div className="gold-divider w-24" />
              <p className="text-base sm:text-lg text-[#2B2B2B]/85 leading-relaxed">
                At Mayaban Village Resort, hospitality begins with heartfelt care. Rooted in rural
                Bengal charm, our cozy cottages and deluxe suites invite you to slow down amidst
                rustling sal trees and scenic countryside surroundings.
              </p>
              <p className="text-base text-[#57534E] leading-relaxed">
                From fresh home-style Bengali delicacies in our dining pavilion to thoughtful
                local sightseeing guidance toward Koro Pahar, Susunia Pahar, and Mukutmanipur Dam,
                every guest is welcomed and looked after like family.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/rooms"
                  onMouseEnter={() => prefetchRoute('/rooms')}
                  onFocus={() => prefetchRoute('/rooms')}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold tracking-wider uppercase hover:bg-[#14291C] transition-colors shadow-soft"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4 text-[#DFC15E]" />
                </Link>
                <Link
                  to="/contact"
                  onMouseEnter={() => prefetchRoute('/contact')}
                  onFocus={() => prefetchRoute('/contact')}
                  className="btn-gold-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold tracking-wider uppercase text-[#1F3D2B] hover:text-[#14291C]"
                >
                  <span>Contact Reception</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </>
  );
}

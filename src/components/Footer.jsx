import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { siteData } from '../data/site';
import { roomsData } from '../data/rooms';
import { prefetchRoute } from '../utils/routePrefetch';
import { PWAInstallButton } from './PWAUpdatePrompt';

export function Footer() {
  return (
    <footer className="bg-[#14291C] text-[#F6F1E7] border-t border-[#C9A227]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <img
                src={siteData.logo}
                alt="Mayaban Village Resort Logo"
                width={56}
                height={64}
                loading="lazy"
                className="h-14 w-auto object-contain shrink-0 drop-shadow-[0_2px_10px_rgba(255,255,255,0.22)]"
              />
              <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#F6F1E7] group-hover:text-[#DFC15E] transition-colors">
                {siteData.name}
              </span>
            </Link>
            <p className="text-sm text-[#F6F1E7]/78 leading-relaxed max-w-sm">
              {siteData.tagline}. Rustic Bengal warmth paired with tranquil cottages, deluxe rooms,
              authentic Bengali cuisine, and celebration lawns in Bankura.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={siteData.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mayaban Village Resort on Facebook"
                className="w-10 h-10 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#F6F1E7] hover:bg-[#C9A227] hover:text-[#14291C] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Mayaban Village Resort on Instagram"
                className="w-10 h-10 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#F6F1E7] hover:bg-[#C9A227] hover:text-[#14291C] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              {siteData.social.youtube ? (
                <a
                  href={siteData.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Mayaban Village Resort on YouTube"
                  className="w-10 h-10 rounded-full border border-[#C9A227]/40 flex items-center justify-center text-[#F6F1E7] hover:bg-[#C9A227] hover:text-[#14291C] transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              ) : null}
              <PWAInstallButton />
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#DFC15E]">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-[#F6F1E7]/80">
              <li>
                <Link
                  to="/about"
                  onMouseEnter={() => prefetchRoute('/about')}
                  className="hover:text-[#DFC15E] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/rooms"
                  onMouseEnter={() => prefetchRoute('/rooms')}
                  className="hover:text-[#DFC15E] transition-colors"
                >
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  onMouseEnter={() => prefetchRoute('/events')}
                  className="hover:text-[#DFC15E] transition-colors"
                >
                  Banquet &amp; Events
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  onMouseEnter={() => prefetchRoute('/gallery')}
                  className="hover:text-[#DFC15E] transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onMouseEnter={() => prefetchRoute('/contact')}
                  className="hover:text-[#DFC15E] transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Rooms */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#DFC15E]">Explore Rooms</h3>
            <ul className="space-y-2.5 text-sm text-[#F6F1E7]/80">
              {roomsData.map((room) => (
                <li key={room.slug}>
                  <Link
                    to={`/rooms/${room.slug}`}
                    onMouseEnter={() => prefetchRoute(`/rooms/${room.slug}`)}
                    className="hover:text-[#DFC15E] transition-colors"
                  >
                    {room.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (Consistent NAP) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-lg font-semibold text-[#DFC15E]">Contact Details</h3>
            <ul className="space-y-3 text-sm text-[#F6F1E7]/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-1" aria-hidden="true" />
                <span>{siteData.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C9A227] shrink-0" aria-hidden="true" />
                <a href={siteData.phoneHref} className="hover:text-[#DFC15E] transition-colors">
                  {siteData.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C9A227] shrink-0" aria-hidden="true" />
                <a href={siteData.emailHref} className="hover:text-[#DFC15E] transition-colors">
                  {siteData.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-divider my-10 opacity-40" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F6F1E7]/70">
          <p>Mayaban Village | Copyright 2026</p>
          <p>Bikna Station Road, Mobarakpur · Bankura 722155</p>
        </div>
      </div>
    </footer>
  );
}

import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as Dialog from '@radix-ui/react-dialog';
import { m } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Expand,
  MessageCircle,
  Phone,
  Users,
  X,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { getRoomBySlug, roomsData } from '../data/rooms';
import { siteData } from '../data/site';
import { submitResortInquiry } from '../utils/emailService';
import { prefetchRoute } from '../utils/routePrefetch';

const bookingSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  phone: z.string().min(10, 'Please enter a valid 10-digit mobile number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  checkIn: z.string().min(1, 'Select a check-in date'),
  checkOut: z.string().min(1, 'Select a check-out date'),
  guests: z.string().min(1, 'Select number of guests'),
  notes: z.string().optional(),
});

export default function RoomDetail() {
  const { slug } = useParams();
  const room = getRoomBySlug(slug);
  const [activeImgKey, setActiveImgKey] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: room ? String(room.maxGuests) : '2',
    },
  });

  if (!room) {
    return (
      <>
        <SEO title="Room Not Found" path={`/rooms/${slug || ''}`} robots="noindex, nofollow" />
        <div className="pt-36 pb-28 text-center px-4 bg-[#F6F1E7] min-h-[70vh]">
          <h1 className="font-serif text-4xl font-semibold text-[#1F3D2B]">Room Not Found</h1>
          <p className="mt-3 text-sm text-[#57534E]">
            The room category you are looking for is unavailable.
          </p>
          <Link
            to="/rooms"
            onMouseEnter={() => prefetchRoute('/rooms')}
            className="mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Rooms</span>
          </Link>
        </div>
      </>
    );
  }

  const currentHeroKey = activeImgKey || room.primaryImageKey;
  const whatsappRoomLink = `https://wa.me/${siteData.whatsappNumberRaw}?text=${encodeURIComponent(
    `Hello, I want to know the tariff and availability for the ${room.name} at Mayaban Village Resort.`
  )}`;

  const roomMetaDescription = `Book ${room.name} (${room.size}) at Mayaban Village Resort, Bikna Station Road, Bankura. AC, free Wi-Fi, Smart TV & direct WhatsApp rates.`;

  const onSubmit = async (data) => {
    setSubmitError('');
    try {
      const result = await submitResortInquiry({
        inquiryType: `Room Booking Enquiry — ${room.name}`,
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.notes || `Enquiry for ${room.name}`,
        extraFields: {
          Room: room.name,
          'Check-in': data.checkIn,
          'Check-out': data.checkOut,
          Guests: data.guests,
        },
      });
      setSubmitResult(result);
      reset();
    } catch {
      setSubmitError(
        'Could not dispatch automatically. Please use the direct WhatsApp or phone booking buttons below.'
      );
    }
  };

  return (
    <>
      <SEO
        title={room.name}
        description={roomMetaDescription}
        path={`/rooms/${room.slug}`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Rooms', path: '/rooms' },
          { name: room.name, path: `/rooms/${room.slug}` },
        ]}
      />

      <div className="pt-28 lg:pt-34 pb-24 bg-[#F6F1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/rooms"
            onMouseEnter={() => prefetchRoute('/rooms')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#1F3D2B] hover:text-[#B5654A] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Rooms &amp; Cottages</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Gallery + Overview + Amenities */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="relative rounded-2xl overflow-hidden bg-[#EFE7D6] aspect-[4/3] shadow-elevated group">
                  <ResponsiveImage
                    imageKey={currentHeroKey}
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    aria-label="Open full screen room photo"
                    className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14291C]/85 text-[#F6F1E7] text-xs font-medium hover:bg-[#14291C] transition-colors"
                  >
                    <Expand className="w-3.5 h-3.5 text-[#DFC15E]" />
                    <span>Expand Photo</span>
                  </button>
                </div>

                {/* Thumbnail Selector */}
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {room.galleryKeys.map((imgKey, idx) => (
                    <button
                      key={`${imgKey}-${idx}`}
                      type="button"
                      onClick={() => setActiveImgKey(imgKey)}
                      className={`rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all ${
                        currentHeroKey === imgKey
                          ? 'border-[#C9A227] scale-[0.98]'
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <ResponsiveImage
                        imageKey={imgKey}
                        sizes="20vw"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Room Description */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#B5654A] font-medium">
                  <span>{room.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{room.size}</span>
                  <span aria-hidden="true">·</span>
                  <span>{room.view}</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1F3D2B]">
                  {room.name}
                </h1>

                <div className="flex items-center gap-2.5 text-sm text-[#1F3D2B] font-medium">
                  <Users className="w-4 h-4 text-[#137A3D]" />
                  <span>{room.guests}</span>
                  <span aria-hidden="true">·</span>
                  <span>{room.bedConfig}</span>
                </div>

                <p className="text-base text-[#2B2B2B]/85 leading-relaxed pt-2">
                  {room.fullDescription}
                </p>
              </div>

              {/* Full Room Amenities */}
              <div className="bg-[#FAF7F0] rounded-2xl border border-[#1F3D2B]/10 p-6 sm:p-8">
                <h2 className="font-serif text-2xl font-semibold text-[#1F3D2B] mb-5">
                  Included Amenities
                </h2>
                <ul className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-4 text-sm text-[#2B2B2B]">
                  {room.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#137A3D] shrink-0" aria-hidden="true" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Direct Booking + Enquiry Form */}
            <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
              {/* Direct Booking Card */}
              <div className="bg-[#1F3D2B] text-[#F6F1E7] rounded-2xl p-6 sm:p-8 shadow-elevated">
                <p className="text-xs tracking-[0.2em] uppercase text-[#DFC15E]">
                  Direct Booking
                </p>
                <p className="mt-2 font-serif text-2xl sm:text-3xl font-semibold">
                  {room.price ? room.price : room.priceNote}
                </p>
                <p className="mt-2 text-xs text-[#F6F1E7]/75 leading-relaxed">
                  Speak directly with our Bikna Station Road reception for seasonal discounts,
                  family packages, and instant room confirmation.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href={whatsappRoomLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C9A227] text-[#14291C] text-xs font-semibold tracking-wider uppercase hover:bg-[#DFC15E] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={siteData.phoneHref}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-[#C9A227]/60 text-[#F6F1E7] text-xs font-semibold tracking-wider uppercase hover:bg-white/10 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#DFC15E]" />
                    <span>Call Reception</span>
                  </a>
                </div>
              </div>

              {/* Validated Booking Enquiry Form */}
              <div className="bg-white rounded-2xl border border-[#1F3D2B]/12 p-6 sm:p-8 shadow-soft">
                <h2 className="font-serif text-2xl font-semibold text-[#1F3D2B]">
                  Send Booking Enquiry
                </h2>
                <p className="mt-1 text-xs text-[#57534E]">
                  Enquiries are directed to {siteData.email}.
                </p>

                {submitResult ? (
                  <m.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-5 rounded-xl bg-[#1F3D2B]/6 border border-[#1F3D2B]/15 space-y-3"
                  >
                    <div className="flex items-center gap-2 text-[#1F3D2B] font-semibold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-[#137A3D]" />
                      <span>Booking Request Prepared</span>
                    </div>
                    <p className="text-xs text-[#57534E] leading-relaxed">
                      {submitResult.mode === 'emailjs'
                        ? 'Thank you! Your room enquiry has been emailed to our reception desk.'
                        : 'Your enquiry details are ready. Confirm immediately via WhatsApp or your email app:'}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <a
                        href={submitResult.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold"
                      >
                        Send via WhatsApp
                      </a>
                      {submitResult.mode !== 'emailjs' && (
                        <a
                          href={submitResult.mailtoUrl}
                          className="px-4 py-2 rounded-full border border-[#1F3D2B]/30 text-[#1F3D2B] text-xs font-semibold"
                        >
                          Open Email App
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setSubmitResult(null)}
                        className="px-3 py-2 text-xs text-[#57534E] underline"
                      >
                        New Enquiry
                      </button>
                    </div>
                  </m.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
                    <div>
                      <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        {...register('name')}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-[#B5654A]">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98..."
                          {...register('phone')}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-[#B5654A]">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                          Guests *
                        </label>
                        <select
                          {...register('guests')}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                        >
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <option key={n} value={n}>
                              {n} {n === 1 ? 'Guest' : 'Guests'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                          Check-in Date *
                        </label>
                        <input
                          type="date"
                          {...register('checkIn')}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                        />
                        {errors.checkIn && (
                          <p className="mt-1 text-xs text-[#B5654A]">{errors.checkIn.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                          Check-out Date *
                        </label>
                        <input
                          type="date"
                          {...register('checkOut')}
                          className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                        />
                        {errors.checkOut && (
                          <p className="mt-1 text-xs text-[#B5654A]">{errors.checkOut.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        {...register('email')}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-[#B5654A]">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                        Special Requests
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Early check-in, meal preferences, extra bed..."
                        {...register('notes')}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                      />
                    </div>

                    {submitError && (
                      <p className="text-xs text-[#B5654A]">{submitError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold tracking-wider uppercase hover:bg-[#14291C] transition-colors disabled:opacity-60"
                    >
                      {isSubmitting ? 'Submitting...' : 'Request Room Availability'}
                    </button>
                  </form>
                )}
              </div>
            </aside>
          </div>

          {/* Explore Other Rooms */}
          <section className="mt-24 pt-12 border-t border-[#1F3D2B]/12">
            <h2 className="font-serif text-3xl font-semibold text-[#1F3D2B] mb-8">
              Other Accommodations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {roomsData
                .filter((r) => r.slug !== room.slug)
                .map((other) => (
                  <Link
                    key={other.slug}
                    to={`/rooms/${other.slug}`}
                    onMouseEnter={() => prefetchRoute(`/rooms/${other.slug}`)}
                    className="group bg-[#FAF7F0] rounded-2xl overflow-hidden border border-[#1F3D2B]/10 shadow-soft"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <ResponsiveImage
                        imageKey={other.primaryImageKey}
                        sizes="33vw"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-[#B5654A]">{other.category}</p>
                      <h3 className="mt-1 font-serif text-xl font-semibold text-[#1F3D2B]">
                        {other.name}
                      </h3>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </div>

      {/* Room Gallery Lightbox */}
      <Dialog.Root open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[70] bg-[#14291C]/90 backdrop-blur-sm" />
          <Dialog.Content className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8 focus:outline-none">
            <div className="relative max-w-4xl w-full bg-[#FAF7F0] rounded-2xl overflow-hidden shadow-elevated border border-[#C9A227]/30">
              <Dialog.Close
                aria-label="Close lightbox"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#14291C]/85 text-[#F6F1E7] flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </Dialog.Close>
              <div className="aspect-[4/3] bg-[#14291C]">
                <ResponsiveImage
                  imageKey={currentHeroKey}
                  priority
                  sizes="90vw"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <Dialog.Title className="font-serif text-2xl font-semibold text-[#1F3D2B]">
                  {room.name}
                </Dialog.Title>
                <Dialog.Description className="text-xs text-[#57534E] mt-1">
                  {room.bedConfig} · {room.view}
                </Dialog.Description>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

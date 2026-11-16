import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as Accordion from '@radix-ui/react-accordion';
import { m } from 'framer-motion';
import { Calendar, CheckCircle2, ChevronDown, MapPin, Users } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SplitText } from '../animations/SplitText';
import { FadeIn } from '../animations/FadeIn';
import { ParallaxImage } from '../animations/ParallaxImage';
import { banquetSpaces, eventFaqs, upcomingEvents } from '../data/events';
import { siteData } from '../data/site';
import { submitResortInquiry } from '../utils/emailService';

const eventSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  phone: z.string().min(10, 'Please enter a valid mobile number'),
  email: z.string().email('Enter a valid email address').optional().or(z.literal('')),
  eventType: z.string().min(1, 'Select an event type'),
  eventDate: z.string().min(1, 'Select a preferred date'),
  guestCount: z.string().min(1, 'Enter estimated guest count'),
  details: z.string().min(5, 'Share brief celebration details'),
});

export default function Events() {
  const [submitResult, setSubmitResult] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventType: 'Wedding & Reception',
    },
  });

  const onSubmit = async (data) => {
    setSubmitError('');
    try {
      const result = await submitResortInquiry({
        inquiryType: `Banquet & Event Enquiry (${data.eventType})`,
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.details,
        extraFields: {
          'Event Type': data.eventType,
          'Preferred Date': data.eventDate,
          'Estimated Guests': data.guestCount,
        },
      });
      setSubmitResult(result);
      reset();
    } catch {
      setSubmitError('Unable to send automatically. Please contact us on WhatsApp or phone.');
    }
  };

  return (
    <>
      <SEO
        title="Banquet & Events"
        description="Plan destination weddings, corporate conferences & receptions at Mayaban Village Resort, Bankura's leading banquet venue near Bikna Station Road."
        path="/events"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Banquet & Events', path: '/events' },
        ]}
        faqs={eventFaqs}
        events={upcomingEvents}
      />

      <div className="pt-28 lg:pt-36 pb-24 bg-[#F6F1E7]">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
              Bankura Wedding Venue &amp; Conferences
            </p>
            <SplitText
              text="Banquet Halls & Celebrations"
              as="h1"
              immediate
              className="mt-3 font-serif text-4xl sm:text-6xl font-semibold text-[#1F3D2B]"
            />
            <p className="mt-5 text-base sm:text-lg text-[#2B2B2B]/85 leading-relaxed">
              From starlit Bengali wedding receptions on our manicured lawns to focused corporate
              conferences and milestone gatherings, Mayaban offers spacious venues backed by
              warm hospitality and authentic catering.
            </p>
          </div>

          {/* Banquet Spaces */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {banquetSpaces.map((space, idx) => (
              <FadeIn
                key={space.id}
                delay={idx * 0.1}
                className="bg-[#FAF7F0] rounded-2xl overflow-hidden border border-[#1F3D2B]/10 shadow-soft flex flex-col"
              >
                <ParallaxImage
                  imageKey={space.imageKey}
                  alt={space.name}
                  className="aspect-[16/10]"
                  speed={10}
                />
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#137A3D] font-medium">
                      <Users className="w-4 h-4 text-[#137A3D]" />
                      <span>{space.capacity}</span>
                      <span aria-hidden="true">·</span>
                      <span>{space.format}</span>
                    </div>
                    <h2 className="mt-2.5 font-serif text-2xl sm:text-3xl font-semibold text-[#1F3D2B]">
                      {space.name}
                    </h2>
                    <p className="mt-3 text-sm text-[#57534E] leading-relaxed">
                      {space.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Editable Upcoming Events (loaded from src/data/events.js) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <FadeIn className="mb-10">
            <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
              Seasonal Calendar
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-[#1F3D2B]">
              Upcoming Events
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((ev, idx) => (
              <FadeIn
                key={ev.id}
                delay={idx * 0.08}
                className="bg-white rounded-2xl border border-[#1F3D2B]/10 p-6 sm:p-7 shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#137A3D] font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#137A3D]" />
                    <span>{ev.date}</span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl font-semibold text-[#1F3D2B]">
                    {ev.name}
                  </h3>
                  <p className="mt-3 text-sm text-[#57534E] leading-relaxed">{ev.details}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#1F3D2B]/10 flex items-center gap-2 text-xs text-[#1F3D2B]/80 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#137A3D]" />
                  <span>{ev.venue}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Event Enquiry Form + Radix Accordion FAQ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Radix Accordion FAQ */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
                  Planning Questions
                </p>
                <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1F3D2B]">
                  Banquet &amp; Catering Details
                </h2>
              </div>

              <Accordion.Root type="single" collapsible className="space-y-3">
                {eventFaqs.map((faq, idx) => (
                  <Accordion.Item
                    key={faq.question}
                    value={`faq-${idx}`}
                    className="bg-[#FAF7F0] rounded-xl border border-[#1F3D2B]/10 overflow-hidden"
                  >
                    <Accordion.Header>
                      <Accordion.Trigger className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[#1F3D2B] group">
                        <span>{faq.question}</span>
                        <ChevronDown className="w-4 h-4 text-[#137A3D] shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="px-5 pb-4 text-sm text-[#57534E] leading-relaxed">
                      {faq.answer}
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>

            {/* Enquire For Your Event Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#1F3D2B]/10 p-7 sm:p-10 shadow-soft">
              <h2 className="font-serif text-3xl font-semibold text-[#1F3D2B]">
                Enquire for Your Event
              </h2>
              <p className="mt-1 text-sm text-[#57534E]">
                Share your celebration dates and guest count. Our events team responds via{' '}
                {siteData.email} and {siteData.phone}.
              </p>

              {submitResult ? (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 rounded-xl bg-[#1F3D2B]/6 border border-[#1F3D2B]/15 space-y-4"
                >
                  <div className="flex items-center gap-2 text-[#1F3D2B] font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-[#137A3D]" />
                    <span>Event Enquiry Ready</span>
                  </div>
                  <p className="text-sm text-[#57534E]">
                    {submitResult.mode === 'emailjs'
                      ? 'Your event details have been sent to Mayaban Village Resort.'
                      : 'Complete your dispatch via WhatsApp or Email below for immediate assistance.'}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={submitResult.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold uppercase tracking-wider"
                    >
                      Send via WhatsApp
                    </a>
                    {submitResult.mode !== 'emailjs' && (
                      <a
                        href={submitResult.mailtoUrl}
                        className="px-5 py-2.5 rounded-full border border-[#1F3D2B]/30 text-[#1F3D2B] text-xs font-semibold uppercase tracking-wider"
                      >
                        Open Email App
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setSubmitResult(null)}
                      className="px-4 py-2 text-xs text-[#57534E] underline"
                    >
                      Submit Another
                    </button>
                  </div>
                </m.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Full name"
                        {...register('name')}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-[#B5654A]">{errors.name.message}</p>
                      )}
                    </div>

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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                        Event Type *
                      </label>
                      <select
                        {...register('eventType')}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                      >
                        <option value="Wedding & Reception">Wedding &amp; Reception</option>
                        <option value="Corporate Conference">Corporate Conference</option>
                        <option value="Anniversary / Birthday">Anniversary / Birthday</option>
                        <option value="Family Retreat">Family Retreat</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        {...register('eventDate')}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                      />
                      {errors.eventDate && (
                        <p className="mt-1 text-xs text-[#B5654A]">{errors.eventDate.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                        Estimated Guests *
                      </label>
                      <input
                        type="number"
                        min="10"
                        placeholder="e.g. 120"
                        {...register('guestCount')}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                      />
                      {errors.guestCount && (
                        <p className="mt-1 text-xs text-[#B5654A]">{errors.guestCount.message}</p>
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
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2B2B] mb-1">
                      Celebration &amp; Catering Notes *
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your ceremony, room blocks needed, or dining preferences..."
                      {...register('details')}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                    />
                    {errors.details && (
                      <p className="mt-1 text-xs text-[#B5654A]">{errors.details.message}</p>
                    )}
                  </div>

                  {submitError && <p className="text-xs text-[#B5654A]">{submitError}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold tracking-wider uppercase hover:bg-[#14291C] transition-colors disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending...' : 'Enquire for Your Event'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

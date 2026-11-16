import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as Accordion from '@radix-ui/react-accordion';
import { m } from 'framer-motion';
import { CheckCircle2, ChevronDown, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SplitText } from '../animations/SplitText';
import { FadeIn } from '../animations/FadeIn';
import { ClickToLoadMap } from '../components/ClickToLoadMap';
import { siteData } from '../data/site';
import { submitResortInquiry } from '../utils/emailService';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  mobile: z.string().min(10, 'Please enter a valid 10-digit mobile number'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(6, 'Please write a short message or query'),
});

const contactFaqs = [
  {
    question: 'Where is Mayaban Village Resort located in Bankura?',
    answer:
      'Mayaban Village Resort is situated on Bikna Station Road, Mobarakpur, Bankura, West Bengal 722155 — just minutes from Bikna Dokra Craft Village and Bankura rail connectivity.',
  },
  {
    question: 'How far is the resort from Koro Pahar, Susunia Pahar, and Mukutmanipur Dam?',
    answer:
      'Koro Pahar is approximately 20 km away, Susunia Pahar is about 27 km away, and Mukutmanipur Dam is 53 km away, making Mayaban an ideal peaceful base for Bankura sightseeing.',
  },
  {
    question: 'Is car parking and Wi-Fi complimentary for guests?',
    answer:
      'Yes. Complimentary on-site car parking, high-speed Wi-Fi across rooms and lawns, Smart TV, air conditioning, and 24-hour hot water are included with every stay.',
  },
  {
    question: 'How can I confirm a room booking or banquet reservation?',
    answer:
      'Call or WhatsApp our reception directly on +91 9883220490, or send your dates via our website enquiry forms routed to mayabanvillage@gmail.com.',
  },
];

export default function Contact() {
  const [submitResult, setSubmitResult] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setSubmitError('');
    try {
      const result = await submitResortInquiry({
        inquiryType: 'General Resort Query',
        name: data.name,
        phone: data.mobile,
        email: data.email,
        message: data.message,
      });
      setSubmitResult(result);
      reset();
    } catch {
      setSubmitError('Could not dispatch query. Please reach us directly by phone or WhatsApp.');
    }
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Contact Mayaban Village Resort, Bikna Station Road, Mobarakpur, Bankura 722155. Call +91 9883220490, WhatsApp, or email mayabanvillage@gmail.com."
        path="/contact"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact Us', path: '/contact' },
        ]}
        faqs={contactFaqs}
      />

      <div className="pt-28 lg:pt-36 pb-24 bg-[#F6F1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
              Reception &amp; Reservations
            </p>
            <SplitText
              text="Contact Us"
              as="h1"
              immediate
              className="mt-3 font-serif text-4xl sm:text-6xl font-semibold text-[#1F3D2B]"
            />
            <p className="mt-4 text-base text-[#57534E]">
              For room tariffs, group bookings, or banquet dates at Mayaban Village Resort, reach
              our reception desk directly.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Contact Details + Click-to-Load Map */}
            <FadeIn className="lg:col-span-5 space-y-6">
              <div className="bg-[#FAF7F0] rounded-2xl border border-[#1F3D2B]/10 p-7 sm:p-8 space-y-6 shadow-soft">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#B5654A]">Address</p>
                  <div className="mt-2 flex items-start gap-3 text-[#1F3D2B]">
                    <MapPin className="w-5 h-5 text-[#137A3D] shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="font-medium text-base">{siteData.address}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1F3D2B]/10">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#B5654A]">
                    Phone &amp; Reception Number
                  </p>
                  <a
                    href={siteData.phoneHref}
                    className="mt-2 flex items-center gap-3 text-[#1F3D2B] font-medium hover:text-[#137A3D] transition-colors"
                  >
                    <Phone className="w-5 h-5 text-[#137A3D] shrink-0" aria-hidden="true" />
                    <span>{siteData.receptionNumber}</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-[#1F3D2B]/10">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#B5654A]">Email</p>
                  <a
                    href={siteData.emailHref}
                    className="mt-2 flex items-center gap-3 text-[#1F3D2B] font-medium hover:text-[#137A3D] transition-colors"
                  >
                    <Mail className="w-5 h-5 text-[#137A3D] shrink-0" aria-hidden="true" />
                    <span>{siteData.email}</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-[#1F3D2B]/10">
                  <a
                    href={siteData.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold tracking-wider uppercase hover:bg-[#14291C] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#DFC15E]" aria-hidden="true" />
                    <span>WhatsApp Reception Desk</span>
                  </a>
                </div>
              </div>

              <ClickToLoadMap autoLoadInView heightClass="h-[340px] sm:h-[360px]" />
            </FadeIn>

            {/* Contact Query Form */}
            <FadeIn
              delay={0.1}
              className="lg:col-span-7 bg-white rounded-2xl border border-[#1F3D2B]/10 p-7 sm:p-10 shadow-soft"
            >
              <h2 className="font-serif text-3xl font-semibold text-[#1F3D2B]">
                Send Us a Message
              </h2>
              <p className="mt-1 text-sm text-[#57534E]">Queries are sent to {siteData.email}.</p>

              {submitResult ? (
                <m.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 p-7 rounded-2xl bg-[#1F3D2B]/6 border border-[#1F3D2B]/15 text-center space-y-4"
                >
                  <m.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                    className="w-12 h-12 rounded-full bg-[#1F3D2B] text-[#DFC15E] flex items-center justify-center mx-auto"
                  >
                    <CheckCircle2 className="w-6 h-6" />
                  </m.div>
                  <h3 className="font-serif text-2xl font-semibold text-[#1F3D2B]">
                    Thank You for Reaching Out
                  </h3>
                  <p className="text-sm text-[#57534E] max-w-md mx-auto">
                    {submitResult.mode === 'emailjs'
                      ? 'Your query has been emailed to mayabanvillage@gmail.com. Our team will respond shortly.'
                      : 'Your message is ready to send directly via WhatsApp or your email app for instant confirmation:'}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={submitResult.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold uppercase tracking-wider"
                    >
                      Send via WhatsApp
                    </a>
                    {submitResult.mode !== 'emailjs' && (
                      <a
                        href={submitResult.mailtoUrl}
                        className="px-6 py-2.5 rounded-full border border-[#1F3D2B]/30 text-[#1F3D2B] text-xs font-semibold uppercase tracking-wider"
                      >
                        Open Email App
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setSubmitResult(null)}
                      className="px-4 py-2 text-xs text-[#57534E] underline"
                    >
                      Send Another Query
                    </button>
                  </div>
                </m.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5" noValidate>
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-[#2B2B2B] mb-1.5"
                    >
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your full name"
                      {...register('name')}
                      className="w-full px-4 py-3 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-[#B5654A]">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-mobile"
                        className="block text-xs font-medium text-[#2B2B2B] mb-1.5"
                      >
                        Mobile Number *
                      </label>
                      <input
                        id="contact-mobile"
                        type="tel"
                        placeholder="+91 98..."
                        {...register('mobile')}
                        className="w-full px-4 py-3 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                      />
                      {errors.mobile && (
                        <p className="mt-1 text-xs text-[#B5654A]">{errors.mobile.message}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-[#2B2B2B] mb-1.5"
                      >
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="you@example.com"
                        {...register('email')}
                        className="w-full px-4 py-3 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-[#B5654A]">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-[#2B2B2B] mb-1.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Ask about room tariffs, upcoming dates, sightseeing, or banquet availability..."
                      {...register('message')}
                      className="w-full px-4 py-3 rounded-lg bg-[#FAF7F0] border border-[#1F3D2B]/15 text-sm focus:border-[#C9A227] focus:outline-none"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-[#B5654A]">{errors.message.message}</p>
                    )}
                  </div>

                  {submitError && <p className="text-xs text-[#B5654A]">{submitError}</p>}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-9 py-3.5 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold tracking-wider uppercase hover:bg-[#14291C] transition-colors disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Query'}
                  </button>
                </form>
              )}
            </FadeIn>
          </div>

          {/* Frequently Asked Questions (Matches FAQPage JSON-LD) */}
          <section className="mt-20 pt-14 border-t border-[#1F3D2B]/12 max-w-3xl">
            <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
              Traveler Information
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1F3D2B]">
              Frequently Asked Questions
            </h2>
            <Accordion.Root type="single" collapsible className="mt-6 space-y-3">
              {contactFaqs.map((faq, idx) => (
                <Accordion.Item
                  key={faq.question}
                  value={`contact-faq-${idx}`}
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
          </section>
        </div>
      </div>
    </>
  );
}

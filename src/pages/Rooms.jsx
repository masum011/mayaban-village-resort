import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { SEO } from '../components/SEO';
import { SplitText } from '../animations/SplitText';
import { StaggerChildren, StaggerItem } from '../animations/StaggerChildren';
import { RoomCard } from '../components/RoomCard';
import { roomsData } from '../data/rooms';
import { siteData } from '../data/site';

const roomFaqs = [
  {
    question: 'What room types are available at Mayaban Village Resort in Bankura?',
    answer:
      'We offer four categories: Deluxe Triple Bed (up to 3 guests), Deluxe Double Bed (2 guests), Deluxe Single Bed (1 guest), and private heritage Cottage Rooms with sit-out verandahs.',
  },
  {
    question: 'Do all rooms include AC, Wi-Fi, Smart TV, and hot water?',
    answer:
      'Yes. Every cottage and deluxe room features whisper-quiet air conditioning, complimentary high-speed Wi-Fi, Smart LED TV, 24-hour geyser hot water, and room service.',
  },
  {
    question: 'How do I check current room tariffs and book directly?',
    answer:
      'Contact our Bikna Station Road reception directly on +91 9883220490 via WhatsApp or call, or submit an availability enquiry on any room page for seasonal direct rates.',
  },
];

export default function Rooms() {
  const [filter, setFilter] = useState('all');

  const filteredRooms =
    filter === 'all'
      ? roomsData
      : filter === 'deluxe'
      ? roomsData.filter((r) => r.slug.startsWith('deluxe'))
      : roomsData.filter((r) => r.slug === 'cottage-room');

  return (
    <>
      <SEO
        title="Rooms & Cottage Suites"
        description="Stay in Deluxe Triple, Double, Single AC rooms or private Cottage Suites near Bikna Station, Bankura. Free Wi-Fi, Smart TV, parking & Bengali dining."
        path="/rooms"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Rooms & Cottage Suites', path: '/rooms' },
        ]}
        faqs={roomFaqs}
      />

      <div className="pt-28 lg:pt-36 pb-24 bg-[#F6F1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Tariff Note */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#1F3D2B]/12">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
                Accommodations in Bankura
              </p>
              <SplitText
                text="Rooms & Heritage Cottages"
                as="h1"
                immediate
                className="mt-3 font-serif text-4xl sm:text-6xl font-semibold text-[#1F3D2B]"
              />
              <p className="mt-4 text-base text-[#57534E] leading-relaxed">
                Thoughtfully designed sanctuaries combining quiet rural stillness with modern
                climate control, high-speed Wi-Fi, and attentive room service.
              </p>
            </div>

            <div className="bg-[#FAF7F0] rounded-2xl border border-[#C9A227]/35 p-5 sm:p-6 max-w-md">
              <p className="font-serif text-xl font-semibold text-[#1F3D2B]">
                Price on request, WhatsApp us for tariffs
              </p>
              <p className="mt-1 text-xs text-[#57534E]">
                Direct seasonal &amp; group rates available via Reception.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href={siteData.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1F3D2B] text-[#F6F1E7] text-xs font-semibold tracking-wider uppercase hover:bg-[#14291C] transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#DFC15E]" />
                  <span>WhatsApp Tariffs</span>
                </a>
                <a
                  href={siteData.phoneHref}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F3D2B] hover:text-[#B5654A]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#137A3D]" />
                  <span>{siteData.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Radix UI Tabs Filter */}
          <Tabs.Root value={filter} onValueChange={setFilter} className="mt-10">
            <Tabs.List
              aria-label="Filter rooms by category"
              className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-xl bg-[#EFE7D6] border border-[#1F3D2B]/10"
            >
              {[
                { value: 'all', label: 'All Rooms (4)' },
                { value: 'deluxe', label: 'Deluxe Rooms (3)' },
                { value: 'cottage', label: 'Cottage Room (1)' },
              ].map((tab) => (
                <Tabs.Trigger
                  key={tab.value}
                  value={tab.value}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors whitespace-nowrap ${
                    filter === tab.value
                      ? 'bg-[#1F3D2B] text-[#F6F1E7] shadow-sm'
                      : 'text-[#2B2B2B]/80 hover:text-[#1F3D2B]'
                  }`}
                >
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <div className="mt-10">
              <StaggerChildren
                key={filter}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10"
              >
                {filteredRooms.map((room) => (
                  <StaggerItem key={room.id}>
                    <RoomCard room={room} />
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>
          </Tabs.Root>

          {/* Visible Room FAQs matching FAQPage JSON-LD */}
          <section className="mt-20 pt-14 border-t border-[#1F3D2B]/12 max-w-3xl">
            <p className="text-xs tracking-[0.22em] uppercase text-[#B5654A] font-medium">
              Guest Information
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#1F3D2B]">
              Room &amp; Booking Questions
            </h2>
            <Accordion.Root type="single" collapsible className="mt-6 space-y-3">
              {roomFaqs.map((faq, idx) => (
                <Accordion.Item
                  key={faq.question}
                  value={`room-faq-${idx}`}
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

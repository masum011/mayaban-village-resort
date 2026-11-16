import { Helmet } from 'react-helmet-async';
import { siteData } from '../data/site';

export function SEO({
  title,
  description,
  path = '/',
  image = '/og-image.jpg',
  robots = 'index, follow',
  schemaType = 'Hotel',
  breadcrumbs = null,
  faqs = null,
  events = null,
}) {
  const isHome = path === '/';
  const fullTitle = isHome
    ? 'Mayaban Village Resort | Best Resort in Bankura, Bikna Station Road'
    : `${title} | Mayaban Village Resort, Bankura`;

  const metaDescription =
    description ||
    'Stay at Mayaban Village Resort, Bikna Station Road, Mobarakpur, Bankura. Heritage cottages, deluxe AC rooms, Bengali dining, and wedding banquet halls.';

  const origin =
    typeof window !== 'undefined' && window.location?.origin
      ? window.location.origin
      : siteData.seo.siteUrl;
  const canonicalUrl = `${siteData.seo.siteUrl}${path}`;
  const ogImageUrl = image.startsWith('http') ? image : `${origin}${image}`;

  const lodgingSchema = {
    '@context': 'https://schema.org',
    '@type': schemaType === 'LodgingBusiness' ? 'LodgingBusiness' : ['Hotel', 'LodgingBusiness'],
    name: siteData.name,
    description: metaDescription,
    url: canonicalUrl,
    telephone: '+919883220490',
    email: siteData.email,
    image: `${siteData.seo.siteUrl}/og-image.jpg`,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bikna Station Road, Mobarakpur',
      addressLocality: 'Bankura',
      addressRegion: 'West Bengal',
      postalCode: '722155',
      addressCountry: 'IN',
    },
    hasMap: siteData.location.googleMapsUrl,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteData.location.lat,
      longitude: siteData.location.lng,
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Free Wi-Fi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Smart TV', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'In-house Bengali Restaurant', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Wedding Banquet Hall', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free Car Parking', value: true },
    ],
    sameAs: [siteData.social.facebook, siteData.social.instagram].filter(Boolean),
  };

  const breadcrumbSchema =
    breadcrumbs && breadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: `${siteData.seo.siteUrl}${crumb.path}`,
          })),
        }
      : null;

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;

  const eventSchemas =
    events && events.length > 0
      ? events.map((ev) => ({
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: ev.name,
          startDate: ev.isoDate || '2026-12-20',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: {
            '@type': 'Place',
            name: `${ev.venue} — Mayaban Village Resort`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Bikna Station Road, Mobarakpur',
              addressLocality: 'Bankura',
              addressRegion: 'West Bengal',
              postalCode: '722155',
              addressCountry: 'IN',
            },
          },
          description: ev.details,
          organizer: {
            '@type': 'Organization',
            name: siteData.name,
            url: siteData.seo.siteUrl,
          },
        }))
      : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={siteData.seo.keywords} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteData.name} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      <script type="application/ld+json">{JSON.stringify(lodgingSchema)}</script>
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      {eventSchemas &&
        eventSchemas.map((schema, i) => (
          <script key={`ev-ld-${i}`} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
    </Helmet>
  );
}

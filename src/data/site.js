export const siteData = {
  name: 'Mayaban Village Resort',
  shortName: 'Mayaban',
  tagline: 'A Serene Get Away in the Heart of Bankura',
  description:
    'Where rustic charm meets modern comfort. Nestled in the heart of Bankura, our resort offers serene cottages, elegant deluxe rooms, and top-notch amenities. Enjoy authentic cuisine at our in-house restaurant, celebrate special moments in our spacious banquet halls, and explore nearby attractions.',
  address: 'Bikna Station Road, Mobarakpur, Bankura, West Bengal 722155',
  phone: '+91 9883220490',
  phoneHref: 'tel:+919883220490',
  receptionNumber: '+91 9883220490',
  email: 'mayabanvillage@gmail.com',
  emailHref: 'mailto:mayabanvillage@gmail.com',
  whatsappUrl:
    'https://wa.me/919883220490?text=I%20want%20to%20know%20the%20Room%20Tariffs%20of%20Mayaban%20Village',
  whatsappNumberRaw: '919883220490',
  logo: '/assets/mayaban-logo.png',
  resortTourVideo: '/assets/aistudio/vidssave.com__________________________Best_Resort_in_Bankura_720P__1__f302ed26.mp4',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=100078367155425',
    instagram: 'https://www.instagram.com/mayabanvillageresort/',
    // PLACEHOLDER: Add your YouTube channel or video ID when available (e.g. 'dQw4w9WgXcQ')
    youtube: '',
    youtubeTourId: '',
  },
  seo: {
    siteUrl: 'https://mayabanvillageresort.com',
    keywords:
      'best resort in Bankura, premium village resort Bankura, resort near Bikna Station, resort in Mobarakpur, Bankura wedding venue, stay near Susunia Pahar, resort near Mukutmanipur, cottage stay in Bankura',
  },
  location: {
    lat: 23.2481777,
    lng: 87.093333,
    googleMapsUrl: 'https://maps.app.goo.gl/DFvRCcK2KhFQac8eA',
    directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=23.2481777,87.093333',
  },
  quickAmenities: [
    { id: 'wifi', label: 'Free Wi-Fi', detail: 'High-speed fibre across rooms & lawns' },
    { id: 'ac', label: 'Air-Conditioner', detail: 'Whisper-quiet climate control' },
    { id: 'tv', label: 'Smart TV', detail: 'Curated entertainment & satellite channels' },
    { id: 'geyser', label: 'Geyser', detail: '24-hour hot & cold running water' },
    { id: 'service', label: 'Room Service', detail: 'Warm, attentive countryside hospitality' },
  ],
  services: [
    {
      index: '01',
      title: 'Deluxe Rooms',
      subtitle: 'Single, Double & Triple Suites',
      description:
        'Thoughtfully appointed rooms blending warm plaster finishes, solid teakwood furniture, and lush garden views with modern conveniences.',
      imageKey: 'deluxeDouble',
      link: '/rooms',
    },
    {
      index: '02',
      title: 'Cottage Rooms',
      subtitle: 'Standalone Heritage Sanctuary',
      description:
        'Private eco-cottages with vaulted timber ceilings and sit-out verandahs where morning mist drifts across the lawns.',
      imageKey: 'cottage',
      link: '/rooms/cottage-room',
    },
    {
      index: '03',
      title: 'In-house Restaurant',
      subtitle: 'Authentic Bengali & Multi-Cuisine',
      description:
        'Savour farm-fresh seasonal Bengali delicacies, traditional thalis, and curated Indian & continental dishes prepared to order.',
      imageKey: 'restaurant',
      link: '/gallery',
    },
    {
      index: '04',
      title: 'Banquet Halls',
      subtitle: 'Weddings, Conferences & Celebrations',
      description:
        'Expansive indoor banquet spaces and manicured open lawns designed for unforgettable weddings, corporate retreats, and family milestones.',
      imageKey: 'banquet',
      link: '/events',
    },
  ],
  placesToVisit: [
    {
      id: 'koro-pahar',
      name: 'Koro Pahar',
      distanceKm: 20,
      summary: 'Scenic hills and panoramic views across tranquil Bankura woodlands.',
      highlight: 'Sunrise viewpoints · Gentle hill trails · Photography',
      imageKey: 'bankuraHills',
    },
    {
      id: 'susunia-pahar',
      name: 'Susunia Pahar',
      distanceKm: 27,
      summary: 'Rocky landscapes, trekking trails, and ancient historical rock-cut inscriptions.',
      highlight: 'Trekking routes · Natural springs · Ancient heritage',
      imageKey: 'bankuraHills',
    },
    {
      id: 'mukutmanipur-dam',
      name: 'Mukutmanipur Dam',
      distanceKm: 53,
      summary: 'Serene dam at the confluence of Kangsabati and Kumari rivers with calm water activities.',
      highlight: 'Boating · Sunset promenade · Island views',
      imageKey: 'bankuraHills',
    },
  ],
};

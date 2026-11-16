// Editable Room Catalogue & Tariffs
// Update 'price' below whenever seasonal rates are published.
export const roomsData = [
  {
    id: 'deluxe-triple-bed',
    slug: 'deluxe-triple-bed',
    name: 'Deluxe Triple Bed',
    category: 'Deluxe Suite',
    guests: 'Up to 3 Guests (Families & Small Groups)',
    maxGuests: 3,
    bedConfig: 'Three Handcrafted Teak Single Beds',
    size: '360 sq. ft.',
    view: 'Garden Courtyard & Lawns',
    // PLACEHOLDER: Replace with published tariff (e.g., '₹4,200 / night') when ready
    price: null,
    priceNote: 'Price on request, WhatsApp us for tariffs',
    shortDescription:
      'Spacious, sunlit sanctuary with three bespoke teakwood beds, woven cane lighting, and direct garden verandah access.',
    fullDescription:
      'Designed for families and close companions traveling through Bankura, the Deluxe Triple Bed room balances generous breathing room with serene rural warmth. French doors invite golden morning sunlight across lime-washed walls, while individual solid teak beds dressed in crisp cotton linens ensure restorative rest after exploring Susunia Pahar or Bikna village.',
    primaryImageKey: 'deluxeTriple',
    galleryKeys: ['deluxeTriple', 'exterior', 'courtyardDrive', 'restaurant'],
    amenities: [
      'AC',
      'Free Wi-Fi',
      'LED TV',
      'Hot Water',
      'Restaurant',
      'Iron on demand',
      'Drinking Water',
      'Car Parking',
    ],
  },
  {
    id: 'deluxe-double-bed',
    slug: 'deluxe-double-bed',
    name: 'Deluxe Double Bed',
    category: 'Deluxe Suite',
    guests: '2 Guests (Couples & Leisure Travelers)',
    maxGuests: 2,
    bedConfig: 'One King-Size Solid Teak Bed',
    size: '310 sq. ft.',
    view: 'Sal Canopy & Misty Gardens',
    // PLACEHOLDER: Replace with published tariff when ready
    price: null,
    priceNote: 'Price on request, WhatsApp us for tariffs',
    shortDescription:
      'An intimate couple-friendly retreat featuring a king-size teak bed, kantha textiles, and floor-to-ceiling woodland views.',
    fullDescription:
      'Crafted for quiet mornings and unhurried evenings, our Deluxe Double Bed room wraps you in understated Bengal elegance. Textured terracotta throws, artisanal brass bedside lamps, and panoramic windows framing the surrounding greenery create a calm private haven with every modern amenity at your fingertips.',
    primaryImageKey: 'deluxeDouble',
    galleryKeys: ['deluxeDouble', 'resortFacade', 'restaurant', 'twilightWing'],
    amenities: [
      'AC',
      'Free Wi-Fi',
      'LED TV',
      'Hot Water',
      'Restaurant',
      'Iron on demand',
      'Drinking Water',
      'Car Parking',
    ],
  },
  {
    id: 'deluxe-single-bed',
    slug: 'deluxe-single-bed',
    name: 'Deluxe Single Bed',
    category: 'Deluxe Suite',
    guests: '1 Guest (Solo Travelers & Business Retreats)',
    maxGuests: 1,
    bedConfig: 'One Handcrafted Teak Single Bed',
    size: '240 sq. ft.',
    view: 'Tropical Foliage & Quiet Walkways',
    // PLACEHOLDER: Replace with published tariff when ready
    price: null,
    priceNote: 'Price on request, WhatsApp us for tariffs',
    shortDescription:
      'Calm minimalist quarters tailored for solo explorers, writers, and executive guests seeking privacy near Bikna Station.',
    fullDescription:
      'Whether visiting Bankura for work, terracotta craft heritage, or solo reflection, the Deluxe Single Bed room offers effortless comfort without excess. Settle into the woven bamboo lounge chair with morning Darjeeling tea as birdsong drifts across the garden pathway.',
    primaryImageKey: 'deluxeSingle',
    galleryKeys: ['deluxeSingle', 'entranceGate', 'restaurant', 'courtyardDrive'],
    amenities: [
      'AC',
      'Free Wi-Fi',
      'LED TV',
      'Hot Water',
      'Restaurant',
      'Iron on demand',
      'Drinking Water',
      'Car Parking',
    ],
  },
  {
    id: 'cottage-room',
    slug: 'cottage-room',
    name: 'Cottage Room',
    category: 'Private Eco-Cottage',
    guests: '2–3 Guests (Private Verandah Sanctuary)',
    maxGuests: 3,
    bedConfig: 'King Canopy Bed + Private Sit-Out Verandah',
    size: '420 sq. ft.',
    view: 'Private Lawn & Woodland Courtyard',
    // PLACEHOLDER: Replace with published tariff when ready
    price: null,
    priceNote: 'Price on request, WhatsApp us for tariffs',
    shortDescription:
      'Signature standalone heritage cottage featuring vaulted timber beams, sheer linen canopy, and a tranquil private wooden verandah.',
    fullDescription:
      'Our signature Cottage Room embodies the soul of Mayaban Village Resort. Step onto your private timber sit-out verandah overlooking lush foliage, unwind beneath high thatched-and-timber rafters, and enjoy the stillness of rural Bankura paired with crisp air-conditioning, Smart TV, and round-the-clock hospitality.',
    primaryImageKey: 'cottage',
    galleryKeys: ['cottage', 'nightCottages', 'exterior', 'restaurant'],
    amenities: [
      'AC',
      'Free Wi-Fi',
      'LED TV',
      'Hot Water',
      'Restaurant',
      'Iron on demand',
      'Drinking Water',
      'Car Parking',
    ],
  },
];

export const getRoomBySlug = (slug) => roomsData.find((room) => room.slug === slug);

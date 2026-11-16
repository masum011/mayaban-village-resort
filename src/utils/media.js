// Centralized Media Asset Registry
// Replace paths below with your final photography when updating assets.
// Each entry maps to the optimized WebP, 640w mobile WebP, and JPG fallback in /src/assets/images/.

const buildAsset = (basePath, width, height, alt) => ({
  webp: `${basePath}.webp`,
  webpMobile: `${basePath}-640w.webp`,
  jpg: `${basePath}.jpg`,
  width,
  height,
  alt,
});

export const mediaAssets = {
  hero: buildAsset(
    '/src/assets/images/hero_mayaban_resort_1794842587534',
    1408,
    768,
    'Mayaban Village Resort golden hour courtyard, terracotta cottages, and reflective pond in Bankura'
  ),
  deluxeTriple: buildAsset(
    '/src/assets/images/room_deluxe_triple_1794842587849',
    1280,
    960,
    'Deluxe Triple Bed room at Mayaban Village Resort with three handcrafted teak beds and garden doors'
  ),
  deluxeDouble: buildAsset(
    '/src/assets/images/room_deluxe_double_1794842587984',
    1280,
    960,
    'Deluxe Double Bed suite featuring king teak bed, terracotta kantha runner, and misty forest window'
  ),
  deluxeSingle: buildAsset(
    '/src/assets/images/room_deluxe_single_1794842588924',
    1280,
    960,
    'Deluxe Single Bed room with artisanal wooden bed, bamboo chair, and sunlit garden view'
  ),
  cottage: buildAsset(
    '/src/assets/images/room_heritage_cottage_1794842589775',
    1280,
    960,
    'Standalone Heritage Cottage Room with vaulted timber roof, sheer canopy bed, and private wooden verandah'
  ),
  restaurant: buildAsset(
    '/src/assets/images/resort_dining_pavilion_1794842590163',
    1280,
    960,
    'In-house restaurant dining pavilion at Mayaban Village Resort with traditional thali table settings'
  ),
  banquet: buildAsset(
    '/src/assets/images/resort_banquet_celebration_1794842590558',
    1408,
    768,
    'Evening wedding and banquet celebration lawn illuminated by warm fairy lights at Mayaban Village Resort'
  ),
  exterior: buildAsset(
    '/src/assets/images/resort_exterior_facade_1794842591811',
    1408,
    768,
    'Resort front garden pathway and terracotta entrance archway at dusk in Bankura'
  ),
  bankuraHills: buildAsset(
    '/src/assets/images/bankura_hills_dam_1794842591391',
    1280,
    960,
    'Scenic hills and tranquil Mukutmanipur reservoir waters near Bankura at golden hour'
  ),
};

export const getMediaAsset = (key) => mediaAssets[key] || mediaAssets.hero;

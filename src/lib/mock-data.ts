export interface Package {
  id: string;
  title: string;
  slug: string;
  description: string;
  destination: string;
  price: number;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  groupSizeMax: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviewsCount: number;
  itinerary: { day: number; title: string; description: string; activities: string[] }[];
  included: string[];
  excluded: string[];
  guide: { name: string; avatar: string; rating: number; experience: string; bio: string };
}

export const mockPackages: Package[] = [
  {
    id: 'k1',
    title: 'Gulmarg Deep Powder Ski Expedition',
    slug: 'gulmarg-ski-expedition',
    description: 'Carve your way through the world-famous backcountry powder of Gulmarg. Access untouched slopes via the Gulmarg Gondola—one of the highest cable cars in the world—led by professional avalanche safety guides.',
    destination: 'Gulmarg',
    price: 45000,
    duration: '6 Days',
    difficulty: 'Hard',
    groupSizeMax: 8,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'
    ],
    category: 'Skiing',
    rating: 4.96,
    reviewsCount: 142,
    itinerary: [
      { day: 1, title: 'Arrival in Srinagar & Transfer to Gulmarg', description: 'Arrive at Srinagar airport. Drive through snow-draped pine forests to Gulmarg. Evening briefing and equipment setup.', activities: ['Airport pickup', 'Ski fit check', 'Group dinner'] },
      { day: 2, title: 'Avalanche Safety & Gondola Level 1 Orientation', description: 'Begin with beacon, shovel, probe drills. Warm up runs on the lower slopes to acclimatize to the high altitude.', activities: ['Safety training', 'Slope warm-ups', 'Piste runs'] },
      { day: 3, title: 'Backcountry Ridge Run - Phase II Gondola', description: 'Access the Mt. Apharwat ridge at 3,979m. Ski the deep powder bowls of Apharwat, guided by safety experts.', activities: ['Off-piste bowl skiing', 'Backcountry exploration', 'Video review'] }
    ],
    included: ['Professional ski guides', 'Avalanche safety kit rental', 'All meals', 'Gondola lift passes', 'A-grade resort lodging'],
    excluded: ['Personal flight tickets', 'Personal ski wear', 'Alcoholic beverages', 'Travel insurance'],
    guide: {
      name: 'Riyaz Wani',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=riyaz',
      rating: 4.95,
      experience: '12 Years',
      bio: 'Riyaz is an IFMGA-trained alpine guide who has spent over a decade leading international groups down Mt. Apharwat bowls.'
    }
  },
  {
    id: 'k2',
    title: 'Dal Lake Luxury Houseboat Retreat',
    slug: 'dal-lake-houseboat-retreat',
    description: 'Immerse yourself in heritage luxury on a beautifully carved cedar wood houseboat on Dal Lake. Witness the sunrise floating vegetable market, glide through narrow waterways in a traditional Shikara boat, and explore royal Mughal gardens.',
    destination: 'Srinagar',
    price: 18000,
    duration: '4 Days',
    difficulty: 'Easy',
    groupSizeMax: 12,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800'
    ],
    category: 'Cultural',
    rating: 4.88,
    reviewsCount: 96,
    itinerary: [
      { day: 1, title: 'Welcome to Srinagar & Shikara Check-in', description: 'Board your private carved wooden houseboat. Enjoy warm Kashmiri Kehwa tea while cruising Dal Lake at sunset.', activities: ['Kehwa reception', 'Sunset Shikara ride', 'Wazwan dinner'] },
      { day: 2, title: 'Sunrise Floating Market & Mughal Gardens', description: 'Wake up early to witness local vendors selling organic produce on boats. Later, tour the historical Shalimar and Nishat Mughal gardens.', activities: ['Floating market tour', 'Mughal garden walks', 'Local handicraft workshop'] }
    ],
    included: ['Luxury houseboat stays', 'Shikara rides daily', 'Breakfast & dinner', 'Local cultural host', 'All entry tickets'],
    excluded: ['Lunch', 'Personal shopping', 'Camera fees at monuments'],
    guide: {
      name: 'Manzoor Bhat',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=manzoor',
      rating: 4.9,
      experience: '15 Years',
      bio: 'Manzoor is a third-generation houseboat host who loves sharing Srinagar lake history and local secret fishing spots.'
    }
  },
  {
    id: 'k3',
    title: 'Sonamarg Thajiwas Glacier Trek',
    slug: 'sonamarg-glacier-trek',
    description: 'Hike through alpine meadows, pine forests, and silver fir trees to reach the foot of the Thajiwas Glacier in Sonamarg (Meadow of Gold). Witness pristine frozen streams, raw glacial views, and camp by the Sindh river.',
    destination: 'Sonamarg',
    price: 22000,
    duration: '5 Days',
    difficulty: 'Moderate',
    groupSizeMax: 10,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800'
    ],
    category: 'Trekking',
    rating: 4.92,
    reviewsCount: 74,
    itinerary: [
      { day: 1, title: 'Srinagar to Sonamarg Drive', description: 'Drive along the gushing Sindh river. Check-in at our base camp in Sonamarg. Evening walk along the riverbanks.', activities: ['Scenic road drive', 'River camp check-in', 'Acclimatization walk'] },
      { day: 2, title: 'Summit Day: Thajiwas Glacier Ascent', description: 'Hike 4km uphill through silver fir trees to the glacier base. Touch the snow slabs and watch local sledges.', activities: ['Glacier trek', 'Sledge slides', 'Campfire stories'] }
    ],
    included: ['Premium camp equipment', 'Certified mountain guides', 'All meals', 'Ponies for bags', 'First aid & oxygen cylinders'],
    excluded: ['Personal trekking shoes', 'Tips', 'Pony riding fees'],
    guide: {
      name: 'Yaseen Lone',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=yaseen',
      rating: 4.88,
      experience: '8 Years',
      bio: 'Yaseen is an experienced trekker who specializes in glacier climbs and High-Altitude Wilderness Response.'
    }
  },
  {
    id: 'k4',
    title: 'Pahalgam Aru Valley Meadow Trail',
    slug: 'pahalgam-aru-valley-trail',
    description: 'Ride and trek across the famous meadows of Betaab Valley and Aru Valley in Pahalgam, staying at the cozy Kashmir Holiday Inn. Wander alongside gushing streams, enjoy riverside picnics, and see local Nomadic shepherd (Bakarwal) camps.',
    destination: 'Pahalgam',
    price: 16000,
    duration: '4 Days',
    difficulty: 'Easy',
    groupSizeMax: 15,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800'
    ],
    category: 'Wildlife',
    rating: 4.9,
    reviewsCount: 58,
    itinerary: [
      { day: 1, title: 'Arrive in Pahalgam Valley', description: 'Check-in at the premium Kashmir Holiday Inn. Explore local Lidder river markets in the afternoon.', activities: ['Kashmir Holiday Inn check-in', 'Lidder river walk', 'Local dinner'] },
      { day: 2, title: 'Horseback Ride to Aru Meadows', description: 'Ride through pine forests up to Aru Valley. Enjoy a mountain picnic and meet nomadic shepherds.', activities: ['Meadow horse ride', 'Nomad camp visit', 'Riverside picnic'] }
    ],
    included: ['Riverside cottage rooms at Kashmir Holiday Inn', 'Horse ride fees', 'Breakfast & dinner', 'Lidder fishing permit', 'Local guide'],
    excluded: ['Lunches', 'River rafting ticket', 'Shopping'],
    guide: {
      name: 'Farooq Shah',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=farooq',
      rating: 4.96,
      experience: '10 Years',
      bio: 'Farooq grew up in Pahalgam and knows every hidden pine clearing and fishing pool in Lidder Valley.'
    }
  },
  {
    id: 'k5',
    title: 'Gurez Valley Borderland Caravan',
    slug: 'gurez-valley-caravan',
    description: 'Journey off the grid to the breathtaking Gurez Valley along the Line of Control. Sleep under the stars near Habba Khatoon peak, explore local Dardic wooden villages, and hear border stories.',
    destination: 'Gurez Valley',
    price: 32000,
    duration: '7 Days',
    difficulty: 'Moderate',
    groupSizeMax: 10,
    image: 'https://images.unsplash.com/photo-1533587834175-9b2f67a26f8d?w=800',
    images: [
      'https://images.unsplash.com/photo-1533587834175-9b2f67a26f8d?w=800'
    ],
    category: 'Road Trips',
    rating: 4.98,
    reviewsCount: 42,
    itinerary: [
      { day: 1, title: 'Cross the Razdan Pass (3,558m)', description: 'Spectacular mountain road trip crossing Razdan Pass. Enter Gurez valley. Check-in at Kishanganga river camp.', activities: ['Razdan pass cross', 'River campsite check-in'] },
      { day: 2, title: 'Habba Khatoon Peak Hike', description: 'Hike to the spring waters of Mt. Habba Khatoon. Visit local wooden villages and speak with border locals.', activities: ['Habba spring hike', 'Dardic village visit', 'Folk stories session'] }
    ],
    included: ['Offroad vehicles & fuel', 'River tent camps', 'All meals', 'Border permit support', 'Expert local guides'],
    excluded: ['Flights to Srinagar', 'Personal snacks', 'Sleeping bags (can be rented)'],
    guide: {
      name: 'Gulzar Gurezi',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gulzar',
      rating: 5.0,
      experience: '9 Years',
      bio: 'Gulzar is a native Gurez host who acts as a liaison for border tourism, introducing guests to local Dardic families.'
    }
  }
];

export const mockDestinations = [
  { id: 'd_g', name: 'Gulmarg', slug: 'gulmarg', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', desc: 'Backcountry powder slopes and towering peaks.', count: 1 },
  { id: 'd_s', name: 'Srinagar', slug: 'srinagar', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', desc: 'Wooden houseboats, floating markets, and history.', count: 1 },
  { id: 'd_so', name: 'Sonamarg', slug: 'sonamarg', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800', desc: 'Glaciers, wildflower fields, and crystal streams.', count: 1 },
  { id: 'd_p', name: 'Pahalgam', slug: 'pahalgam', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800', desc: 'Pine forests, rushing rivers, and shepherd routes.', count: 1 },
  { id: 'd_gu', name: 'Gurez Valley', slug: 'gurez-valley', image: 'https://images.unsplash.com/photo-1533587834175-9b2f67a26f8d?w=800', desc: 'Remote Dardic borderlands and massive river peaks.', count: 1 }
];

/* =========================================================
   SRI SAI DIAMONDS AND TOOLS — PRODUCTS & CATEGORIES DATA
   cat: gold | silver | diamonds | stones | tools
   ========================================================= */

export const CATEGORIES = [
  {
    id: 'gold',
    name: 'Gold Bullion & Jewellery',
    shortName: 'Gold',
    icon: '◈',
    subtitle: '916 Hallmarked & 999.9 Fine',
    desc: '22k hallmarked gold jewellery, pure 24k bullion bars, biscuits and coins with guaranteed purity.'
  },
  {
    id: 'silver',
    name: 'Silver & Pooja Articles',
    shortName: 'Silver',
    icon: '◇',
    subtitle: '999 Fine & Handcrafted',
    desc: '999 fine silver bars, traditional pooja articles, kalasam, diyas, anklets, and custom silver gift items.'
  },
  {
    id: 'diamonds',
    name: 'Certified Diamonds',
    shortName: 'Diamonds',
    icon: '✦',
    subtitle: 'Solitaires & Loose Parcels',
    desc: 'Certified natural diamonds, solitaires, fancy shapes and workshop melee parcels with honest grading.'
  },
  {
    id: 'stones',
    name: 'Precious & Semi-Precious Stones',
    shortName: 'Gemstones',
    icon: '❖',
    subtitle: 'Astrological & Jewellery Stones',
    desc: 'Natural Ruby (Manikyam), Emerald (Panna), Blue/Yellow Sapphires, Pearls, Navratna sets & colored gems.'
  },
  {
    id: 'tools',
    name: 'Jewellery & Diamond Tools',
    shortName: 'Tools',
    icon: '⚙',
    subtitle: 'Professional Workshop Gear',
    desc: 'Precision carat scales, diamond testers, loupes, micro-motors, pliers, files, and workshop consumables.'
  }
];

export const CAT_LABELS = {
  gold: 'Gold',
  silver: 'Silver',
  diamonds: 'Diamonds',
  stones: 'Gemstones',
  tools: 'Tools & Equipment'
};

export const PRODUCTS = [
  // --- GOLD ---
  {
    id: 1,
    name: '22k Hallmarked Gold Chains',
    cat: 'gold',
    desc: 'Hallmarked 916 gold chains in classic & contemporary designs across various weights.',
    tag: 'Popular'
  },
  {
    id: 2,
    name: '24k Pure Gold Bars & Biscuits',
    cat: 'gold',
    desc: '999.9 investment-grade pure gold with tamper-evident assay certification.',
    tag: 'Investment'
  },
  {
    id: 3,
    name: '22k Gold Bangles & Kadas',
    cat: 'gold',
    desc: 'Handcrafted traditional and modern machine-cut gold bangles with hallmarked purity.',
    tag: 'Bestseller'
  },
  {
    id: 4,
    name: '22k Gold Ring Castings & Blanks',
    cat: 'gold',
    desc: 'Precision jewellery mountings, ring blanks, and casting parts for goldsmiths.',
    tag: 'Workshop'
  },
  {
    id: 5,
    name: '24k Gold Lakshmi & Ganesha Coins',
    cat: 'gold',
    desc: 'Pure gold minted coins in 1g, 2g, 5g, 8g, 10g, and 50g denominations.',
    tag: 'Auspicious'
  },

  // --- SILVER ---
  {
    id: 6,
    name: '999 Fine Silver Bars & Biscuits',
    cat: 'silver',
    desc: 'Certified 999 fine silver bullion bars from 50g up to 1kg with purity seal.',
    tag: 'Purity 999'
  },
  {
    id: 7,
    name: 'Silver Pooja Articles & Diya Sets',
    cat: 'silver',
    desc: 'Intricately handcrafted silver diyas, agarbatti stands, and ceremonial pooja thalis.',
    tag: 'Bestseller'
  },
  {
    id: 8,
    name: 'Silver Kalasam & Pooja Utensils',
    cat: 'silver',
    desc: 'Traditional silver vessels, lotas, tumblers, and temple-grade holy articles.',
    tag: 'Traditional'
  },
  {
    id: 9,
    name: 'Silver Leg Chains & Anklets (Pattilu)',
    cat: 'silver',
    desc: 'Durable and traditional silver anklets, waist chains, and bridal ornaments.',
    tag: 'Popular'
  },
  {
    id: 10,
    name: '999 Silver Embossed Gift Coins',
    cat: 'silver',
    desc: 'High-relief embossed silver coins for weddings, housewarming, and festivals.',
    tag: 'Gift Item'
  },

  // --- DIAMONDS ---
  {
    id: 11,
    name: 'Certified Solitaire Diamonds',
    cat: 'diamonds',
    desc: 'Natural certified loose solitaires (0.30ct to 3.00ct+) with transparent 4C specifications.',
    tag: 'Certified'
  },
  {
    id: 12,
    name: 'Polished Loose Diamonds (Melee/Stars)',
    cat: 'diamonds',
    desc: 'Evenly graded small parcel diamonds for pavé setting, eternity rings, and custom work.',
    tag: 'Jeweller Lot'
  },
  {
    id: 13,
    name: 'Fancy Cut Diamonds (Princess/Oval/Emerald)',
    cat: 'diamonds',
    desc: 'Hand-picked fancy shapes with superior luster, facet symmetry, and diamond fire.',
    tag: 'Special Cut'
  },
  {
    id: 14,
    name: 'Diamond Semi-Mounts & Castings',
    cat: 'diamonds',
    desc: 'Ready-to-set gold semi-mounts for solitaire rings, earrings, and pendants.',
    tag: 'Ready Mount'
  },

  // --- GEMSTONES ---
  {
    id: 15,
    name: 'Natural Ruby (Manikyam)',
    cat: 'stones',
    desc: 'Certified natural unheated red rubies with vibrant colour for astrology and fine jewellery.',
    tag: 'Certified Natural'
  },
  {
    id: 16,
    name: 'Natural Emerald (Panna)',
    cat: 'stones',
    desc: 'Zambian and Colombian emeralds in octagonal, oval, and cabochon cuts.',
    tag: 'Premium'
  },
  {
    id: 17,
    name: 'Blue & Yellow Sapphires (Neelam / Pukhraj)',
    cat: 'stones',
    desc: 'Natural untreated Ceylon sapphires with excellent clarity and brilliance.',
    tag: 'Astrology Grade'
  },
  {
    id: 18,
    name: 'Natural South Sea & Basra Pearls (Muthyam)',
    cat: 'stones',
    desc: 'Authentic lustrous pearls with deep orient and round/button contours.',
    tag: 'Natural'
  },
  {
    id: 19,
    name: 'Navratna 9-Gemstone Certified Sets',
    cat: 'stones',
    desc: 'Complete 9-gem set properly matched and calibrated for Vedic astrological rings.',
    tag: 'Complete Set'
  },
  {
    id: 20,
    name: 'Calibrated Semi-Precious Gemstones',
    cat: 'stones',
    desc: 'Faceted Amethyst, Blue Topaz, Garnet, Tourmaline, and Citrine in standard millimeter sizes.',
    tag: 'Wide Selection'
  },

  // --- TOOLS ---
  {
    id: 21,
    name: 'Precision Goldsmith Pliers & Cutters',
    cat: 'tools',
    desc: 'High-carbon steel round-nose, chain-nose, flat-nose pliers and heavy-duty flush cutters.',
    tag: 'Workshop Essential'
  },
  {
    id: 22,
    name: 'Digital Carat & Gold Precision Scale (0.001g)',
    cat: 'tools',
    desc: 'High-accuracy electronic carat scale with draft shield, tare mode, and calibration weights.',
    tag: 'High Accuracy'
  },
  {
    id: 23,
    name: 'Achromatic 10x / 20x Diamond Loupes',
    cat: 'tools',
    desc: 'Triplet optical glass loupes with anti-reflective coating for accurate diamond and hallmark inspection.',
    tag: 'Essential'
  },
  {
    id: 24,
    name: 'Electronic Diamond & Gem Tester',
    cat: 'tools',
    desc: 'Instant dual thermal and electrical conductivity tester to verify genuine diamonds and moissanite.',
    tag: 'Instant Test'
  },
  {
    id: 25,
    name: 'Jewellers Rolling Mill (Sheet & Wire)',
    cat: 'tools',
    desc: 'Heavy-duty steel roller mill with reduction gear for gold/silver sheet and square wire fabrication.',
    tag: 'Heavy Duty'
  },
  {
    id: 26,
    name: 'Diamond Needle Files & Lapping Paste',
    cat: 'tools',
    desc: 'Electroplated diamond precision files and micron diamond polishing pastes for mirror finishes.',
    tag: 'Finishing'
  },
  {
    id: 27,
    name: 'Micro-Motor Rotary System (35,000 RPM)',
    cat: 'tools',
    desc: 'Variable-speed handpiece for stone setting, drilling, carving, and fine detailing.',
    tag: 'Professional'
  }
];

export const IMG = (seed) => `https://picsum.photos/seed/${seed}/700/900.jpg`;


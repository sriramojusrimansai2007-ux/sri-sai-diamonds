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
    subtitle: 'BIS 916 Hallmarked & 999.9 Fine',
    desc: 'Certified 22k hallmarked gold jewellery, pure 24k bullion bars, biscuits, and auspicious minted coins.',
    img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'silver',
    name: 'Silver & Pooja Articles',
    shortName: 'Silver',
    icon: '◇',
    subtitle: '999 Fine Bullion & Temple Craft',
    desc: '999 fine silver bars, handcrafted silver pooja thalis, diyas, kalasam, anklets (pattilu), and custom silverware.',
    img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'diamonds',
    name: 'Certified Natural Diamonds',
    shortName: 'Diamonds',
    icon: '✦',
    subtitle: 'IGI/GIA Graded Solitaires & Parcels',
    desc: 'Natural certified solitaires, fancy cut stones (Princess, Oval, Emerald), and calibrated workshop melee parcels.',
    img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'stones',
    name: 'Precious & Semi-Precious Stones',
    shortName: 'Gemstones',
    icon: '❖',
    subtitle: 'Vedic Astrology & Jewellery Gems',
    desc: 'Unheated Rubies (Manikyam), Zambian Emeralds (Panna), Blue/Yellow Sapphires, Natural Pearls, and Navratna sets.',
    img: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tools',
    name: 'Jewellery & Diamond Tools',
    shortName: 'Tools',
    icon: '⚙',
    subtitle: 'Master Goldsmith & Workshop Equipment',
    desc: '0.001g digital carat scales, thermal diamond testers, 10x/20x loupes, micro-motors, pliers, and diamond files.',
    img: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=800&q=80'
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
  // --- GOLD BULLION & JEWELLERY ---
  {
    id: 1,
    name: '22k Hallmarked Gold Chains',
    cat: 'gold',
    desc: '916 BIS hallmarked pure gold chains available in classic curb, rope, and modern Italian designer links.',
    tag: 'BIS 916',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 2,
    name: '24k Pure Gold Bars & Biscuits',
    cat: 'gold',
    desc: '999.9 investment-grade pure gold minted in tamper-evident assay certicard packaging with serial numbers.',
    tag: '999.9 Purity',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 3,
    name: '22k Gold Bangles & Kadas',
    cat: 'gold',
    desc: 'Intricately handcrafted and precision CNC cut gold bangles with guaranteed purity and smooth hinge locks.',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 4,
    name: '22k Gold Ring Castings & Blanks',
    cat: 'gold',
    desc: 'Precision gold mountings, ring blanks, and casting parts for goldsmiths and custom jewellery fabrication.',
    tag: 'Workshop Supply',
    image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 5,
    name: '24k Gold Lakshmi & Ganesha Coins',
    cat: 'gold',
    desc: 'High-relief embossed 24k 999 gold coins in 1g, 2g, 5g, 8g, 10g, and 50g denominations with assay certificate.',
    tag: 'Auspicious Gift',
    image: 'https://images.unsplash.com/photo-1610375461369-d613b564f4c4?auto=format&fit=crop&w=700&q=80'
  },

  // --- SILVER & POOJA ARTICLES ---
  {
    id: 6,
    name: '999 Fine Silver Bars & Biscuits',
    cat: 'silver',
    desc: 'Certified 999 fine silver bullion bars from 50g up to 1kg with official refinery purity stamp.',
    tag: '999 Fine Silver',
    image: 'https://images.unsplash.com/photo-1618403088890-3d9fb6f4c8b1?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 7,
    name: 'Silver Pooja Articles & Diya Sets',
    cat: 'silver',
    desc: 'Exquisite traditional silver diyas, agarbatti holders, panchamrutham sets, and auspicious pooja thalis.',
    tag: 'Temple Craft',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 8,
    name: 'Silver Kalasam & Pooja Utensils',
    cat: 'silver',
    desc: 'Heavyweight traditional silver vessels, lotas, tumblers, and sacred temple ceremonial articles.',
    tag: 'Pure Silver',
    image: 'https://images.unsplash.com/photo-1567684014761-b65e2e59b9eb?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 9,
    name: 'Silver Leg Chains & Anklets (Pattilu)',
    cat: 'silver',
    desc: 'Durable, handcrafted silver leg chains and bridal anklets with traditional bells and oxidized accents.',
    tag: 'Popular',
    image: 'https://images.unsplash.com/photo-1611591475152-4735d38d0145?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 10,
    name: '999 Silver Embossed Gift Coins',
    cat: 'silver',
    desc: 'Purity-certified 999 fine silver coins for wedding giveaways, Diwali, Dhanteras, and corporate gifting.',
    tag: 'Gift Pack',
    image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=700&q=80'
  },

  // --- CERTIFIED DIAMONDS ---
  {
    id: 11,
    name: 'Certified Solitaire Diamonds',
    cat: 'diamonds',
    desc: 'Natural certified loose solitaires (0.30ct to 3.00ct+) with transparent 4C cut, color, and clarity grading.',
    tag: 'Certified Solitaire',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 12,
    name: 'Polished Loose Diamonds (Melee/Stars)',
    cat: 'diamonds',
    desc: 'Evenly calibrated small diamond parcels (0.01ct to 0.15ct) for pavé setting, micro-setting, and eternity bands.',
    tag: 'Goldsmith Lot',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 13,
    name: 'Fancy Cut Diamonds (Princess/Oval/Emerald)',
    cat: 'diamonds',
    desc: 'Hand-selected fancy shapes with exceptional brilliance, facet alignment, and fire for bespoke rings.',
    tag: 'Special Shape',
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 14,
    name: 'Diamond Semi-Mounts & Castings',
    cat: 'diamonds',
    desc: 'Ready-to-set 18k and 14k gold semi-mounts for solitaire rings, halo pendants, and stud earrings.',
    tag: 'Ready to Set',
    image: 'https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&w=700&q=80'
  },

  // --- PRECIOUS & SEMI-PRECIOUS GEMSTONES ---
  {
    id: 15,
    name: 'Natural Ruby (Manikyam)',
    cat: 'stones',
    desc: 'Certified natural unheated Burma and Mozambique rubies with deep pigeon blood red hue for astrology and rings.',
    tag: 'Natural Unheated',
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 16,
    name: 'Natural Emerald (Panna)',
    cat: 'stones',
    desc: 'Vibrant Zambian and Colombian emeralds in octagonal, oval, and teardrop cuts with excellent crystal luster.',
    tag: 'Astrology Grade',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 17,
    name: 'Blue & Yellow Sapphires (Neelam / Pukhraj)',
    cat: 'stones',
    desc: 'Natural untreated Ceylon sapphires with exceptional clarity, perfect for planetary alignment and luxury jewellery.',
    tag: 'Ceylon Certified',
    image: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 18,
    name: 'Natural South Sea & Basra Pearls (Muthyam)',
    cat: 'stones',
    desc: 'Authentic lustrous round pearls with deep iridescence and thick nacre for royal necklaces and rings.',
    tag: 'Natural Pearl',
    image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 19,
    name: 'Navratna 9-Gemstone Certified Sets',
    cat: 'stones',
    desc: 'Complete 9-planet gemstone set accurately matched, weighed, and energized for Vedic astrological jewellery.',
    tag: '9 Gem Set',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 20,
    name: 'Calibrated Semi-Precious Gemstones',
    cat: 'stones',
    desc: 'Faceted Amethyst, Blue Topaz, Red Garnet, Tourmaline, and Citrine in standard millimeter calibrated sizes.',
    tag: 'Wide Range',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=80'
  },

  // --- JEWELLERY & DIAMOND TOOLS ---
  {
    id: 21,
    name: 'Precision Goldsmith Pliers & Cutters',
    cat: 'tools',
    desc: 'High-carbon German steel round-nose, chain-nose, flat-nose pliers and flush cutters for intricate goldsmith work.',
    tag: 'Workshop Essential',
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 22,
    name: 'Digital Carat & Gold Precision Scale (0.001g)',
    cat: 'tools',
    desc: 'High-precision digital carat scale with glass draft shield, piece counting, tare function, and calibration weights.',
    tag: '0.001g Accuracy',
    image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 23,
    name: 'Achromatic 10x / 20x Diamond Loupes',
    cat: 'tools',
    desc: 'Triplet optical glass loupes with anti-reflective coating for accurate diamond clarity grading and hallmark reading.',
    tag: 'Inspection Grade',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 24,
    name: 'Electronic Diamond & Gem Tester',
    cat: 'tools',
    desc: 'Instant dual thermal and electrical conductivity testing pen to distinguish genuine diamonds from moissanite.',
    tag: 'Instant Test',
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 25,
    name: 'Jewellers Rolling Mill (Sheet & Wire)',
    cat: 'tools',
    desc: 'Heavy-duty steel roller mill with 4:1 reduction gear for smooth manual gold and silver sheet/wire fabrication.',
    tag: 'Heavy Machinery',
    image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 26,
    name: 'Diamond Needle Files & Lapping Paste',
    cat: 'tools',
    desc: 'Electroplated diamond precision files and micron diamond polishing pastes for flawless mirror polish finishes.',
    tag: 'High Finish',
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 27,
    name: 'Micro-Motor Rotary System (35,000 RPM)',
    cat: 'tools',
    desc: 'High-torque variable-speed handpiece system for precision stone setting, carving, polishing, and micro-drilling.',
    tag: 'Master Tool',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=80'
  }
];

export const IMG = (productOrSeed) => {
  if (typeof productOrSeed === 'object' && productOrSeed.image) {
    return productOrSeed.image;
  }
  return `https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80`;
};


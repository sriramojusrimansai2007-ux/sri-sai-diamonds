/* =========================================================
   SRI SAI DIAMONDS AND TOOLS — FESTIVAL WISHES MARQUEE ENGINE
   Automatic Indian & Telangana Festival Detector & Ticker
   Displays warm bilingual (Telugu + English) auspicious wishes
   with festive emojis, blessings, and gold/silver pooja notes.
   ========================================================= */

import { CONFIG } from '../config.js';
import { $ } from './dom.js';

export const FESTIVALS = [
  {
    id: 'sankranti',
    name: 'Makar Sankranti & Pongal',
    teluguName: 'మకర సంక్రాంతి & భోగి సంబరాలు',
    badge: '🌾 సంక్రాంతి శుభాకాంక్షలు ✦ HAPPY SANKRANTI',
    // Jan 13 - Jan 17
    match: (m, d) => m === 0 && d >= 12 && d <= 18,
    items: [
      '🌾 మకర సంక్రాంతి మరియు భోగి పండుగ శుభాకాంక్షలు! 🌾',
      'Happy Makar Sankranti & Pongal from Sri Sai Diamonds & Tools! May the harvest sun bring golden prosperity, good health and joy to your family!',
      '🪁 Celebrate auspicious beginnings with 100% BIS 916 Hallmarked Gold Jewellery & 999 Fine Silver Pooja Articles! 🪁',
      '✨ Special Festive Making Charges & Honest Calibrated Weighing at Bellampalli Store! ✨'
    ]
  },
  {
    id: 'republic_day',
    name: 'Republic Day',
    teluguName: 'గణతంత్ర దినోత్సవం',
    badge: '🇮🇳 గణతంత్ర దినోత్సవ శుభాకాంక్షలు ✦ REPUBLIC DAY',
    // Jan 25 - Jan 27
    match: (m, d) => m === 0 && d >= 25 && d <= 27,
    items: [
      '🇮🇳 గణతంత్ర దినోత్సవ శుభాకాంక్షలు! 🇮🇳',
      'Happy Republic Day from Sri Sai Diamonds & Tools! Proudly celebrating Indian heritage, unity and master jewellery craftsmanship!',
      '✦ Certified Natural Diamonds • BIS 916 Hallmarked Gold • Guaranteed Honest Purity ✦'
    ]
  },
  {
    id: 'shivaratri',
    name: 'Maha Shivaratri',
    teluguName: 'మహా శివరాత్రి పర్వదినం',
    badge: '🔱 మహా శివరాత్రి శుభాకాంక్షలు ✦ MAHA SHIVARATRI',
    // Mid Feb - Early Mar
    match: (m, d) => (m === 1 && d >= 12 && d <= 28) || (m === 2 && d >= 1 && d <= 8),
    items: [
      '🔱 ఓం నమః శివాయ! మహా శివరాత్రి పర్వదిన శుభాకాంక్షలు! 🔱',
      'Har Har Mahadev! Wishing you divine peace, blessings and spiritual prosperity on Maha Shivaratri from Sri Sai Diamonds & Tools!',
      '🕉️ Auspicious 999 Fine Silver Bilva Leaves, Shiva Lingam Pooja sets & Silver Articles Available! 🕉️'
    ]
  },
  {
    id: 'holi',
    name: 'Holi',
    teluguName: 'హోలీ పండుగ',
    badge: '🎨 హోలీ శుభాకాంక్షలు ✦ HAPPY HOLI',
    // March
    match: (m, d) => m === 2 && d >= 1 && d <= 12,
    items: [
      '🎨 హోలీ పండుగ శుభాకాంక్షలు! 🎨',
      'Wishing you and your family a vibrant, joyful and colorful Happy Holi from Sri Sai Diamonds & Tools!',
      '✨ May your life sparkle with the brilliant colors of natural certified diamonds and heirloom gold! ✨'
    ]
  },
  {
    id: 'ugadi',
    name: 'Ugadi & Gudi Padwa (Telugu New Year)',
    teluguName: 'నూతన సంవత్సర ఉగాది పర్వదినం',
    badge: '🥭 ఉగాది శుభాకాంక్షలు ✦ HAPPY UGADI',
    // Late Mar - Early Apr
    match: (m, d) => (m === 2 && d >= 18) || (m === 3 && d <= 5),
    items: [
      '🥭 శ్రీ నూతన సంవత్సర ఉగాది పర్వదిన శుభాకాంక్షలు! 🥭',
      'Happy Ugadi & Gudi Padwa from Sri Sai Diamonds & Tools! May this auspicious Telugu New Year usher in happiness, vitality and golden abundance!',
      '🌸 Welcome the New Year with 916 Hallmarked Gold ornaments, Silver Pooja items & Astrological Gemstones! 🌸',
      '✨ Exclusive Ugadi Festive Benefits & Transparent Live Bullion Billing! ✨'
    ]
  },
  {
    id: 'sri_rama_navami',
    name: 'Sri Rama Navami',
    teluguName: 'శ్రీ రామ నవమి',
    badge: '🏹 శ్రీరామ నవమి శుభాకాంక్షలు ✦ SRI RAMA NAVAMI',
    // Late Mar - Mid Apr
    match: (m, d) => m === 2 && d >= 25 && d <= 31,
    items: [
      '🏹 శ్రీ సీతారాముల కళ్యాణ మహోత్సవ & శ్రీరామ నవమి శుభాకాంక్షలు! 🏹',
      'Jai Sri Ram! Wishing you divine grace, peace and prosperity on Sri Rama Navami from Sri Sai Diamonds & Tools!',
      '🪷 Auspicious Silver Pattabhishekam Coins, Silver Rama Idols & Gold Ornaments in Stock! 🪷'
    ]
  },
  {
    id: 'akshaya_tritiya',
    name: 'Akshaya Tritiya',
    teluguName: 'అక్షయ తృతీయ మహాపర్వదినం',
    badge: '🪙 అక్షయ తృతీయ శుభాకాంక్షలు ✦ AKSHAYA TRITIYA',
    // Late Apr - Mid May
    match: (m, d) => (m === 3 && d >= 16) || (m === 4 && d <= 12),
    items: [
      '🪙✨ అక్షయ తృతీయ పర్వదిన శుభాకాంక్షలు! 🪙✨',
      'Auspicious Akshaya Tritiya Greetings from Sri Sai Diamonds & Tools! May your wealth and prosperity multiply infinitely!',
      '👑 Buy 100% BIS 916 Hallmarked Gold Jewellery, 999.9 Fine Gold Bars & Silver Bullion with special festive making charges! 👑',
      '✦ Certified Natural Diamonds • Live Transparent Counter Scales • Book on WhatsApp Today! ✦'
    ]
  },
  {
    id: 'eid',
    name: 'Eid-ul-Fitr / Eid Mubarak',
    teluguName: 'ఈద్ ముబారక్',
    badge: '🌙 ఈద్ ముబారక్ ✦ EID MUBARAK',
    // Mar / Apr / May window
    match: (m, d) => m === 2 && d >= 18 && d <= 24,
    items: [
      '🌙 ఈద్ ముబారక్! Eid Mubarak from Sri Sai Diamonds & Tools! 🌙',
      'Wishing peace, joy, togetherness and prosperity to you and your loved ones on this blessed occasion!',
      '✨ Celebrate precious moments with handcrafted certified gold & diamond jewellery! ✨'
    ]
  },
  {
    id: 'bonalu',
    name: 'Telangana Bonalu Jathara',
    teluguName: 'తెలంగాణ బోనాల సంబరాలు',
    badge: '🌸 బోనాల శుభాకాంక్షలు ✦ BONALU JATHARA',
    // July - August
    match: (m, d) => (m === 6 && d >= 15) || (m === 7 && d <= 10),
    items: [
      '🌸 తెలంగాణ సంస్కృతికి ప్రతీక బోనాల పండుగ శుభాకాంక్షలు! 🌸',
      'Happy Bonalu Greetings from Sri Sai Diamonds & Tools, Bellampalli! May Goddess Mahankali shower divine health and prosperity!',
      '🥁 Bring home pure Silver Bonalu Kundalu, Deepalu & Traditional Telangana Gold Ornaments! 🥁'
    ]
  },
  {
    id: 'varalakshmi',
    name: 'Sri Varalakshmi Vratam',
    teluguName: 'శ్రీ వరలక్ష్మీ వ్రతం',
    badge: '🪷 వరలక్ష్మీ వ్రత శుభాకాంక్షలు ✦ VARALAKSHMI VRATAM',
    // August
    match: (m, d) => m === 7 && d >= 15 && d <= 25,
    items: [
      '🪷 శ్రీ వరలక్ష్మీ వ్రత పర్వదిన శుభాకాంక్షలు! 🪷',
      'Auspicious Sri Varalakshmi Vratam Greetings from Sri Sai Diamonds & Tools! Welcome Goddess Lakshmi with divine purity!',
      '🪙 999 Fine Silver Kalasham, Lakshmi Idols, Silver Pooja Samagri & 916 BIS Hallmarked Gold Ornaments Available! 🪙'
    ]
  },
  {
    id: 'rakshabandhan',
    name: 'Raksha Bandhan',
    teluguName: 'రాఖీ పౌర్ణమి / రక్షాబంధన్',
    badge: '🎁 రాఖీ పౌర్ణమి శుభాకాంక్షలు ✦ RAKSHA BANDHAN',
    // Late August
    match: (m, d) => m === 7 && d >= 24 && d <= 31,
    items: [
      '🎁 రక్షాబంధన్ & రాఖీ పౌర్ణమి శుభాకాంక్షలు! 🎁',
      'Happy Raksha Bandhan from Sri Sai Diamonds & Tools! Celebrate the eternal bond of love and protection!',
      '✨ Pure 925 Silver Rakhis, Diamond Solitaire Rings and Timeless Gold Gifts for your beloved siblings! ✨'
    ]
  },
  {
    id: 'independence_day',
    name: 'Independence Day',
    teluguName: 'స్వాతంత్ర్య దినోత్సవం',
    badge: '🇮🇳 స్వాతంత్ర్య దినోత్సవ శుభాకాంక్షలు ✦ INDEPENDENCE DAY',
    // Aug 14 - Aug 16
    match: (m, d) => m === 7 && d >= 14 && d <= 16,
    items: [
      '🇮🇳 స్వాతంత్ర్య దినోత్సవ శుభాకాంక్షలు! 🇮🇳',
      'Happy Independence Day from Sri Sai Diamonds & Tools! Proudly serving with 100% Indian craftsmanship, BIS hallmark integrity & certified trust! 🇮🇳'
    ]
  },
  {
    id: 'janmashtami',
    name: 'Sri Krishna Janmashtami',
    teluguName: 'శ్రీ కృష్ణాష్టమి పర్వదినం',
    badge: '🦚 శ్రీకృష్ణాష్టమి శుభాకాంక్షలు ✦ JANMASHTAMI',
    // Early September (Active around Sep 1 - Sep 8)
    match: (m, d) => m === 8 && d >= 1 && d <= 8,
    items: [
      '🦚 శ్రీ కృష్ణాష్టమి మరియు గోకులాష్టమి పర్వదిన శుభాకాంక్షలు! 🦚',
      'Jai Shri Krishna! May Lord Krishna fill your home with love, joy, auspiciousness & golden prosperity on Janmashtami from Sri Sai Diamonds & Tools!',
      '🧈 Auspicious 999 Pure Silver Balakrishna Idols, Silver Flutes, Oonjal (Cradle) & Silver Pooja Utensils in Stock! 🧈',
      '✨ 100% BIS 916 Hallmarked Gold • Certified Natural Diamonds • Visit Bellampalli Store! ✨'
    ]
  },
  {
    id: 'ganesh_chaturthi',
    name: 'Ganesh Chaturthi / Vinayaka Chavithi',
    teluguName: 'వినాయక చవితి మహోత్సవం',
    badge: '🐘 వినాయక చవితి శుభాకాంక్షలు ✦ GANESH CHATURTHI',
    // Mid September (Active around Sep 9 - Sep 22)
    match: (m, d) => m === 8 && d >= 9 && d <= 23,
    items: [
      '🐘 శ్రీ వినాయక చవితి పండుగ శుభాకాంక్షలు! 🐘',
      'Happy Ganesh Chaturthi from Sri Sai Diamonds & Tools! May Lord Vighnaharta remove all obstacles and bless you with wisdom, health & golden prosperity!',
      '🪔 Pure 999 Fine Silver Ganesha Idols, Silver Modak Bowls, Undralla Patralu & Pooja Deepalu in Ready Stock! 🪔',
      '✨ Celebrate with BIS 916 Gold & Certified Diamonds • Special Festive Making Charges! ✨'
    ]
  },
  {
    id: 'bathukamma',
    name: 'Telangana Bathukamma Festival',
    teluguName: 'తెలంగాణ బతుకమ్మ సంబరాలు',
    badge: '🌺 బతుకమ్మ శుభాకాంక్షలు ✦ BATHUKAMMA FESTIVAL',
    // Late Sept - Oct
    match: (m, d) => (m === 8 && d >= 24) || (m === 9 && d <= 12),
    items: [
      '🌺 తెలంగాణ ఆడపడుచుల పండుగ బతుకమ్మ సంబరాల శుభాకాంక్షలు! 🌺',
      'Joyous Bathukamma Greetings from Sri Sai Diamonds & Tools, Bellampalli! Celebrating the floral pride and cultural beauty of Telangana!',
      '🌸 Traditional Choker Sets, Kasu Malas, Jhumkas & Hallmarked Bridal Jewellery for Festive Celebrations! 🌸'
    ]
  },
  {
    id: 'dussehra',
    name: 'Navratri, Dussehra & Vijayadashami',
    teluguName: 'విజయదశమి & దసరా మహోత్సవం',
    badge: '🏹 దసరా & విజయదశమి శుభాకాంక్షలు ✦ DUSSEHRA WISHES',
    // Mid - Late October
    match: (m, d) => m === 9 && d >= 13 && d <= 26,
    items: [
      '🏹 విజయదశమి మరియు దసరా పండుగ శుభాకాంక్షలు! 🏹',
      'Happy Dussehra & Joyous Vijayadashami from Sri Sai Diamonds & Tools! May good fortune triumph and lead you to endless golden success!',
      '👑 Auspicious Day to Buy Gold! Explore our 100% BIS 916 Hallmarked Collection with special festive savings! 👑',
      '✦ Natural Diamonds • 999 Silver Pooja Articles • Master Goldsmith Tools ✦'
    ]
  },
  {
    id: 'karwa_chauth',
    name: 'Karwa Chauth',
    teluguName: 'కర్వా చౌత్',
    badge: '🌙 కర్వా చౌత్ శుభాకాంక్షలు ✦ KARWA CHAUTH',
    // Late Oct - Early Nov
    match: (m, d) => (m === 9 && d >= 27) || (m === 10 && d <= 3),
    items: [
      '🌙 కర్వా చౌత్ శుభాకాంక్షలు! Happy Karwa Chauth from Sri Sai Diamonds & Tools! 🌙',
      'Celebrate eternal bonds of love with IGI certified natural diamond solitaires, gold mangalsutras and silver pooja thalis!'
    ]
  },
  {
    id: 'diwali',
    name: 'Dhanteras & Diwali / Deepavali',
    teluguName: 'ధన త్రయోదశి & దీపావళి సంబరాలు',
    badge: '🪔 ధన త్రయోదశి & దీపావళి శుభాకాంక్షలు ✦ SHUBH DIWALI & DHANTERAS',
    // Late Oct - Mid Nov
    match: (m, d) => m === 10 && d >= 4 && d <= 18,
    items: [
      '🪔✨ శుభ ధన త్రయోదశి మరియు దీపావళి పండుగ శుభాకాంక్షలు! 🪔✨',
      'Shubh Dhanteras & Happy Diwali from Sri Sai Diamonds & Tools! May Goddess Lakshmi illuminate your home with wealth, light and everlasting joy!',
      '🪙 Invest in Pure 999.9 Gold & Silver Bullion Bars, Laxmi-Ganesh Coins & BIS 916 Hallmarked Ornaments! 🪙',
      '🎆 Exclusive Diwali Bullion Discounts • Live Transparent Spot Rates • WhatsApp Direct Booking: +91 94402 07558 🎆'
    ]
  },
  {
    id: 'gurpurab',
    name: 'Guru Nanak Jayanti',
    teluguName: 'గురునానక్ జయంతి',
    badge: 'ੴ గురునానక్ జయంతి శుభాకాంక్షలు ✦ GURU NANAK JAYANTI',
    // Mid - Late Nov
    match: (m, d) => m === 10 && d >= 20 && d <= 28,
    items: [
      'ੴ గురునానక్ జయంతి శుభాకాంక్షలు! Happy Guru Nanak Jayanti from Sri Sai Diamonds & Tools! ੴ',
      'May truth, compassion, contentment and divine peace surround you and your family always!'
    ]
  },
  {
    id: 'christmas_newyear',
    name: 'Christmas & New Year Celebrations',
    teluguName: 'క్రిస్మస్ & నూతన సంవత్సర సంబరాలు',
    badge: '🎄 క్రిస్మస్ & నూతన సంవత్సర శుభాకాంక్షలు ✦ MERRY CHRISTMAS & NEW YEAR',
    // Dec 20 - Jan 5
    match: (m, d) => (m === 11 && d >= 20) || (m === 0 && d <= 6),
    items: [
      '🎄 క్రిస్మస్ మరియు నూతన సంవత్సర శుభాకాంక్షలు! 🎄',
      'Merry Christmas & Happy New Year from Sri Sai Diamonds & Tools! Ring in new beginnings with sparkling certified diamonds and timeless gold!',
      '✨ Special Holiday Season Jewellery Collections & Exclusive Offers for Discerning Buyers! ✨'
    ]
  }
];

// Default auspicious blessings when outside specific festival windows
export const DEFAULT_AUSPICIOUS_WISHES = {
  id: 'auspicious',
  name: 'Auspicious Greetings',
  teluguName: 'శ్రీ సాయి డైమండ్స్ & టూల్స్ శుభాకాంక్షలు',
  badge: '✦ పండుగ శుభాకాంక్షలు ✦ AUSPICIOUS CELEBRATIONS',
  items: [
    '✨ శ్రీ సాయి డైమండ్స్ & టూల్స్, బెల్లంపల్లి వారి హృదయపూర్వక శుభాకాంక్షలు! ✨',
    'Warm Greetings from Sri Sai Diamonds & Tools! May health, peace, prosperity and sparkling moments fill your household!',
    '◈ 100% BIS 916 Hallmarked Gold • 999 Fine Silver Bullion • Certified Natural Diamonds • Honest Weight Calibration ◈',
    '⚙️ Master Jeweller Precision Tools, Diamond Dressers & Goldsmith Equipment ⚙️',
    '💬 Live Rates Locking & Direct Store Enquiry on WhatsApp: +91 94402 07558 💬'
  ]
};

/**
 * Detects the active festival based on current date or manual override in CONFIG.festivalMode
 */
export function getActiveFestival() {
  const mode = (CONFIG.festivalMode || 'auto').toLowerCase();

  // If manually specified in config.js (e.g. 'diwali', 'ugadi', 'ganesh_chaturthi')
  if (mode !== 'auto') {
    const matched = FESTIVALS.find(f => f.id === mode);
    if (matched) return matched;
  }

  // Automatic calendar detection based on current local date
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const day = now.getDate();   // 1-31

  const active = FESTIVALS.find(f => f.match(month, day));
  return active || DEFAULT_AUSPICIOUS_WISHES;
}

/**
 * Initializes and renders the Festive Wishes Marquee banner
 */
export function initFestivalMarquee() {
  const marqueeContainer = $('#festiveMarquee');
  if (!marqueeContainer) return;

  const festival = getActiveFestival();

  // Build the animated ticker track content
  const track = $('#festiveMarqueeTrack');
  const badge = $('#festiveMarqueeBadge');

  if (badge) {
    badge.textContent = festival.badge;
  }

  if (track) {
    const chunk = festival.items.map(item => `
      <span class="festive-item">
        ${item}
      </span>
      <i class="festive-sep">✦</i>
    `).join('');

    // Duplicate chunks to create an unbroken seamless infinite loop
    track.innerHTML = chunk + chunk + chunk;
  }
}


/* =========================================================
   SRI SAI DIAMONDS AND TOOLS — FESTIVAL WISHES MARQUEE ENGINE
   Automatic Indian & Telangana Festival Detector & Ticker
   Appears strictly on that specific festival day only.
   Hidden on ordinary non-festival days.
   ========================================================= */

import { CONFIG } from '../config.js';
import { $ } from './dom.js';

export const FESTIVALS = [
  {
    id: 'new_year',
    name: 'New Year',
    teluguName: 'నూతన సంవత్సర శుభాకాంక్షలు',
    badge: '🎆 నూతన సంవత్సర శుభాకాంక్షలు ✦ HAPPY NEW YEAR',
    match: (m, d) => m === 0 && d === 1, // Jan 1
    items: [
      '🎆 నూతన సంవత్సర శుభాకాంక్షలు! Happy New Year from Sri Sai Diamonds & Tools! 🎆',
      'Ring in the New Year with sparkling certified natural diamonds, pure gold and timeless blessings!',
      '✨ 100% BIS 916 Hallmarked Purity • Master Goldsmith Precision in Bellampalli! ✨'
    ]
  },
  {
    id: 'sankranti',
    name: 'Makar Sankranti & Pongal',
    teluguName: 'మకర సంక్రాంతి & భోగి సంబరాలు',
    badge: '🌾 సంక్రాంతి శుభాకాంక్షలు ✦ HAPPY SANKRANTI',
    match: (m, d) => m === 0 && (d === 14 || d === 15), // Jan 14-15
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
    match: (m, d) => m === 0 && d === 26, // Jan 26
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
    match: (m, d) => (m === 1 && d === 15) || (m === 2 && d === 6), // Feb 15 (2026) / Mar 6 (2027)
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
    match: (m, d) => (m === 2 && (d === 3 || d === 4)), // Mar 3-4
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
    match: (m, d) => m === 2 && d === 19, // Mar 19
    items: [
      '🥭 శ్రీ నూతన సంవత్సర ఉగాది పర్వదిన శుభాకాంక్షలు! 🥭',
      'Happy Ugadi & Gudi Padwa from Sri Sai Diamonds & Tools! May this auspicious Telugu New Year usher in happiness, vitality and golden abundance!',
      '🌸 Welcome the New Year with 916 Hallmarked Gold ornaments, Silver Pooja items & Astrological Gemstones! 🌸',
      '✨ Exclusive Ugadi Festive Benefits & Transparent Live Bullion Billing! ✨'
    ]
  },
  {
    id: 'eid',
    name: 'Eid-ul-Fitr / Eid Mubarak',
    teluguName: 'ఈద్ ముబారక్',
    badge: '🌙 ఈద్ ముబారక్ ✦ EID MUBARAK',
    match: (m, d) => m === 2 && (d === 20 || d === 21), // Mar 20-21
    items: [
      '🌙 ఈద్ ముబారక్! Eid Mubarak from Sri Sai Diamonds & Tools! 🌙',
      'Wishing peace, joy, togetherness and prosperity to you and your loved ones on this blessed occasion!',
      '✨ Celebrate precious moments with handcrafted certified gold & diamond jewellery! ✨'
    ]
  },
  {
    id: 'sri_rama_navami',
    name: 'Sri Rama Navami',
    teluguName: 'శ్రీ రామ నవమి',
    badge: '🏹 శ్రీరామ నవమి శుభాకాంక్షలు ✦ SRI RAMA NAVAMI',
    match: (m, d) => m === 2 && d === 27, // Mar 27
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
    match: (m, d) => (m === 3 && d === 19) || (m === 4 && d === 9), // Apr 19 (2026) / May 9 (2027)
    items: [
      '🪙✨ అక్షయ తృతీయ పర్వదిన శుభాకాంక్షలు! 🪙✨',
      'Auspicious Akshaya Tritiya Greetings from Sri Sai Diamonds & Tools! May your wealth and prosperity multiply infinitely!',
      '👑 Buy 100% BIS 916 Hallmarked Gold Jewellery, 999.9 Fine Gold Bars & Silver Bullion with special festive making charges! 👑',
      '✦ Certified Natural Diamonds • Live Transparent Counter Scales • Book on WhatsApp Today! ✦'
    ]
  },
  {
    id: 'independence_day',
    name: 'Independence Day',
    teluguName: 'స్వాతంత్ర్య దినోత్సవం',
    badge: '🇮🇳 స్వాతంత్ర్య దినోత్సవ శుభాకాంక్షలు ✦ INDEPENDENCE DAY',
    match: (m, d) => m === 7 && d === 15, // Aug 15
    items: [
      '🇮🇳 స్వాతంత్ర్య దినోత్సవ శుభాకాంక్షలు! 🇮🇳',
      'Happy Independence Day from Sri Sai Diamonds & Tools! Proudly serving with 100% Indian craftsmanship, BIS hallmark integrity & certified trust! 🇮🇳'
    ]
  },
  {
    id: 'varalakshmi',
    name: 'Sri Varalakshmi Vratam',
    teluguName: 'శ్రీ వరలక్ష్మీ వ్రతం',
    badge: '🪷 వరలక్ష్మీ వ్రత శుభాకాంక్షలు ✦ VARALAKSHMI VRATAM',
    match: (m, d) => m === 7 && d === 21, // Aug 21
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
    match: (m, d) => m === 7 && d === 28, // Aug 28
    items: [
      '🎁 రక్షాబంధన్ & రాఖీ పౌర్ణమి శుభాకాంక్షలు! 🎁',
      'Happy Raksha Bandhan from Sri Sai Diamonds & Tools! Celebrate the eternal bond of love and protection!',
      '✨ Pure 925 Silver Rakhis, Diamond Solitaire Rings and Timeless Gold Gifts for your beloved siblings! ✨'
    ]
  },
  {
    id: 'janmashtami',
    name: 'Sri Krishna Janmashtami',
    teluguName: 'శ్రీ కృష్ణాష్టమి పర్వదినం',
    badge: '🦚 శ్రీకృష్ణాష్టమి శుభాకాంక్షలు ✦ JANMASHTAMI',
    match: (m, d) => m === 8 && d === 4, // Sep 4
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
    match: (m, d) => m === 8 && (d === 14 || d === 15), // Sep 14-15
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
    match: (m, d) => m === 9 && (d === 17 || d === 18), // Oct 17-18
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
    match: (m, d) => m === 9 && (d === 19 || d === 20), // Oct 19-20
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
    match: (m, d) => m === 9 && d === 29, // Oct 29
    items: [
      '🌙 కర్వా చౌత్ శుభాకాంక్షలు! Happy Karwa Chauth from Sri Sai Diamonds & Tools! 🌙',
      'Celebrate eternal bonds of love with IGI certified natural diamond solitaires, gold mangalsutras and silver pooja thalis!'
    ]
  },
  {
    id: 'dhanteras',
    name: 'Dhanteras / Dhanatrayodashi',
    teluguName: 'ధన త్రయోదశి మహాపర్వదినం',
    badge: '🪙 ధన త్రయోదశి శుభాకాంక్షలు ✦ SHUBH DHANTERAS',
    match: (m, d) => m === 10 && d === 6, // Nov 6
    items: [
      '🪙✨ శుభ ధన త్రయోదశి పర్వదిన శుభాకాంక్షలు! 🪙✨',
      'Shubh Dhanteras from Sri Sai Diamonds & Tools! May Lord Dhanvantari and Goddess Lakshmi bless you with health, wealth & abundance!',
      '👑 Auspicious Day for Bullion! Buy Pure 999.9 Gold & Silver Bullion Bars, Laxmi-Ganesh Coins & BIS 916 Hallmarked Ornaments! 👑'
    ]
  },
  {
    id: 'diwali',
    name: 'Diwali & Deepavali',
    teluguName: 'దీపావళి సంబరాలు',
    badge: '🪔 దీపావళి శుభాకాంక్షలు ✦ HAPPY DIWALI',
    match: (m, d) => m === 10 && (d === 7 || d === 8), // Nov 7-8
    items: [
      '🪔✨ దీపావళి పండుగ శుభాకాంక్షలు! Happy Diwali from Sri Sai Diamonds & Tools! 🪔✨',
      'May the festival of lights illuminate your life with infinite prosperity, happiness and success!',
      '🎆 Exclusive Diwali Bullion Offers • Live Transparent Spot Rates • WhatsApp Direct Booking: +91 94402 07558 🎆'
    ]
  },
  {
    id: 'gurpurab',
    name: 'Guru Nanak Jayanti',
    teluguName: 'గురునానక్ జయంతి',
    badge: 'ੴ గురునానక్ జయంతి శుభాకాంక్షలు ✦ GURU NANAK JAYANTI',
    match: (m, d) => m === 10 && d === 24, // Nov 24
    items: [
      'ੴ గురునానక్ జయంతి శుభాకాంక్షలు! Happy Guru Nanak Jayanti from Sri Sai Diamonds & Tools! ੴ',
      'May truth, compassion, contentment and divine peace surround you and your family always!'
    ]
  },
  {
    id: 'christmas',
    name: 'Christmas',
    teluguName: 'క్రిస్మస్ పండుగ శుభాకాంక్షలు',
    badge: '🎄 క్రిస్మస్ శుభాకాంక్షలు ✦ MERRY CHRISTMAS',
    match: (m, d) => m === 11 && d === 25, // Dec 25
    items: [
      '🎄 క్రిస్మస్ పండుగ శుభాకాంక్షలు! Merry Christmas from Sri Sai Diamonds & Tools! 🎄',
      'Wishing you peace, joy and heartwarming celebrations with your loved ones this Christmas!',
      '✨ Sparkling Certified Diamond Jewellery & Heirloom Gold Gifts at Bellampalli Store! ✨'
    ]
  }
];

/**
 * Detects the active festival based on current date or manual override in CONFIG.festivalMode.
 * Appears strictly on that specific day only.
 * Returns null on ordinary days so the banner remains hidden.
 */
export function getActiveFestival() {
  const mode = (CONFIG.festivalMode || 'auto').toLowerCase();

  // If manually specified in config.js (e.g. 'diwali', 'ugadi', 'ganesh_chaturthi')
  if (mode !== 'auto' && mode !== 'none') {
    const matched = FESTIVALS.find(f => f.id === mode);
    if (matched) return matched;
  }

  if (mode === 'none') {
    return null;
  }

  // Automatic calendar detection based on current local date
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const day = now.getDate();   // 1-31

  const active = FESTIVALS.find(f => f.match(month, day));
  // Appears on that specific festival day ONLY. Returns null otherwise.
  return active || null;
}

/**
 * Initializes and renders the Festive Wishes Marquee banner.
 * If today is not a festival day, the entire marquee element is hidden (display: none).
 */
export function initFestivalMarquee() {
  const marqueeContainer = $('#festiveMarquee');
  if (!marqueeContainer) return;

  const festival = getActiveFestival();

  // If today is NOT a festival day, hide the banner completely
  if (!festival) {
    marqueeContainer.style.display = 'none';
    return;
  }

  // Today IS a festival day: reveal banner and render greetings
  marqueeContainer.style.display = 'block';

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

    // Duplicate chunks to create an unbroken seamless infinite loop (aria-hidden on clones for screen readers)
    track.innerHTML = chunk + `<span aria-hidden="true">${chunk + chunk}</span>`;
  }
}

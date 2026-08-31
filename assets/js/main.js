import { CONFIG } from './config.js';
import { $ } from './modules/dom.js';
import { initReveal, initMarquee, initYear, toast } from './modules/ui.js';
import { initNav } from './modules/nav.js';
import { initCatalogue } from './modules/catalogue.js';
import { initQuote, add as addToQuote } from './modules/quote.js';
import { initEnquiry } from './modules/enquiry.js';
import { initGallery } from './modules/gallery.js';
import { initRates } from './modules/rates.js';

/* ---- Marquee ---- */
initMarquee([
  '916 Hallmarked Gold', '999 Fine Silver Bullion', 'Certified Natural Diamonds',
  'Natural Precious Gemstones', 'Professional Goldsmith Tools',
  'B2B Wholesale & Retail', '100% Calibrated Accuracy & Honest Weight'
]);

/* ---- Contact wiring (from config.js) ---- */
function wireContact() {
  const setHref = (id, url) => {
    const n = $(id);
    if (n && url) n.href = url;
  };
  const setText = (id, text) => {
    const n = $(id);
    if (n && text) n.textContent = text;
  };

  // Google Maps links
  if (CONFIG.mapsUrl) {
    setHref('#directionsBtn', CONFIG.mapsUrl);
    setHref('#footMaps', CONFIG.mapsUrl);
  }

  // Google Maps iframe embed
  const frame = $('#mapFrame');
  if (frame) {
    if (CONFIG.mapEmbedUrl) {
      frame.src = CONFIG.mapEmbedUrl;
    } else if (CONFIG.address) {
      frame.src = `https://maps.google.com/maps?q=${encodeURIComponent(CONFIG.address)}&output=embed`;
    }
  }

  // Call links
  if (CONFIG.phoneIntl) {
    setHref('#callBtn', `tel:+${CONFIG.phoneIntl}`);
    setHref('#footCall', `tel:+${CONFIG.phoneIntl}`);
    const callBtn = $('#callBtn');
    if (callBtn) {
      callBtn.textContent = CONFIG.phoneDisplay ? `Call ${CONFIG.phoneDisplay}` : 'Call the Shop';
    }
    const footCall = $('#footCall');
    if (footCall) {
      footCall.textContent = CONFIG.phoneDisplay ? `Call: ${CONFIG.phoneDisplay}` : 'Call Us';
    }
  } else {
    const callBtn = $('#callBtn');
    if (callBtn) {
      callBtn.addEventListener('click', e => {
        e.preventDefault();
        toast('Phone number not configured');
      });
    }
  }

  // WhatsApp links
  const wa = CONFIG.whatsappNumber || CONFIG.phoneIntl;
  if (wa) {
    setHref('#whatsappBtn', `https://wa.me/${wa}`);
    setHref('#footWa', `https://wa.me/${wa}`);
  } else {
    const waBtn = $('#whatsappBtn');
    if (waBtn) {
      waBtn.addEventListener('click', e => {
        e.preventDefault();
        toast('WhatsApp number not configured');
      });
    }
  }

  // Address, Email & Hours
  if (CONFIG.address) {
    setText('#visitAddress', CONFIG.address);
    setText('#footAddress', CONFIG.address);
  }
  if (CONFIG.hours) {
    setText('#visitHours', CONFIG.hours);
    setText('#footHours', CONFIG.hours);
  }
  if (CONFIG.email) {
    setHref('#footEmail', `mailto:${CONFIG.email}`);
    setText('#footEmail', CONFIG.email);
    setText('#visitEmail', CONFIG.email);
  }

  // Live Indicative Rates Bar
  if (CONFIG.rates) {
    if (CONFIG.rates.gold24k) setText('#rateGold24k', CONFIG.rates.gold24k);
    if (CONFIG.rates.gold22k) setText('#rateGold22k', CONFIG.rates.gold22k);
    if (CONFIG.rates.silver999) setText('#rateSilver999', CONFIG.rates.silver999);
  }
  if (wa) {
    setHref('#rateWaLink', `https://wa.me/${wa}?text=${encodeURIComponent("Namaste Sri Sai Diamonds, please share today's live gold and silver rates.")}`);
  }
}

/* ---- Bootstrap Application ---- */
try {
  initNav();
  initYear();
  initReveal();
  wireContact();

  const gallery = initGallery();
  initCatalogue(addToQuote, gallery.open);
  initQuote();
  initEnquiry();
  initRates();
} catch (err) {
  console.error('Initialization error:', err);
}

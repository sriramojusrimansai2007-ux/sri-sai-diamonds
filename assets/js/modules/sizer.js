/* =========================================================
   SRI SAI DIAMONDS AND TOOLS — INTERACTIVE RING & BANGLE SIZER
   On-screen calibrated ring & bangle sizer with Indian sizes,
   diameter/circumference conversions, and 1-tap WhatsApp booking.
   ========================================================= */

import { CONFIG } from '../config.js';
import { $, $$ } from './dom.js';
import { toast } from './ui.js';

// Standard Indian Ring Size Chart (IS 3574)
export const RING_SIZES = [
  { size: 6,  dia: 14.7, circum: 46.2, us: '3.75', uk: 'G½', fit: "Kids / Pinky Finger" },
  { size: 7,  dia: 15.0, circum: 47.1, us: '4.25', uk: 'H½', fit: "Petite Finger" },
  { size: 8,  dia: 15.3, circum: 48.1, us: '4.5',  uk: 'I½', fit: "Women's Petite" },
  { size: 9,  dia: 15.6, circum: 49.0, us: '5.0',  uk: 'J½', fit: "Women's Small" },
  { size: 10, dia: 16.0, circum: 50.3, us: '5.5',  uk: 'K½', fit: "Women's Popular Size" },
  { size: 11, dia: 16.3, circum: 51.2, us: '5.75', uk: 'L',   fit: "Women's Popular Size" },
  { size: 12, dia: 16.6, circum: 52.2, us: '6.0',  uk: 'L½', fit: "Women's Average Size" },
  { size: 13, dia: 16.9, circum: 53.1, us: '6.5',  uk: 'M½', fit: "Women's Average Size" },
  { size: 14, dia: 17.2, circum: 54.0, us: '6.75', uk: 'N½', fit: "Women's Average / Men's Small" },
  { size: 15, dia: 17.5, circum: 55.0, us: '7.25', uk: 'O½', fit: "Women's Large / Men's Small" },
  { size: 16, dia: 17.8, circum: 55.9, us: '7.5',  uk: 'P',   fit: "Women's Large / Men's Medium" },
  { size: 17, dia: 18.1, circum: 56.9, us: '8.0',  uk: 'Q',   fit: "Men's Popular Size" },
  { size: 18, dia: 18.5, circum: 58.1, us: '8.5',  uk: 'R',   fit: "Men's Popular Size" },
  { size: 19, dia: 18.8, circum: 59.1, us: '8.75', uk: 'R½', fit: "Men's Average Size" },
  { size: 20, dia: 19.1, circum: 60.0, us: '9.25', uk: 'S½', fit: "Men's Average Size" },
  { size: 21, dia: 19.4, circum: 60.9, us: '9.5',  uk: 'T',   fit: "Men's Large Size" },
  { size: 22, dia: 19.7, circum: 61.9, us: '10.0', uk: 'U',   fit: "Men's Large Size" },
  { size: 23, dia: 20.1, circum: 63.1, us: '10.5', uk: 'V',   fit: "Men's Broad Finger" },
  { size: 24, dia: 20.4, circum: 64.1, us: '10.75',uk: 'W',   fit: "Men's Broad Finger" },
  { size: 25, dia: 20.7, circum: 65.0, us: '11.25',uk: 'X',   fit: "Men's Extra Large" },
  { size: 26, dia: 21.0, circum: 66.0, us: '11.5', uk: 'Y',   fit: "Men's Extra Large" },
  { size: 27, dia: 21.3, circum: 66.9, us: '12.0', uk: 'Z',   fit: "Men's Heavy Thumb" },
  { size: 28, dia: 21.6, circum: 67.9, us: '12.25',uk: 'Z½', fit: "Men's Heavy Thumb" }
];

// Traditional South Indian Bangle Sizing
export const BANGLE_SIZES = [
  { size: '2-2', dia: 54.0, circum: 169.6, inches: '2.125"', desc: 'Extra Small / Kids / Teens' },
  { size: '2-4', dia: 57.2, circum: 179.7, inches: '2.25"',  desc: 'Small / Petite Wrists' },
  { size: '2-6', dia: 60.3, circum: 189.4, inches: '2.375"', desc: 'Medium (Most Popular Indian Size)' },
  { size: '2-8', dia: 63.5, circum: 199.5, inches: '2.5"',   desc: 'Large Wrists' },
  { size: '2-10',dia: 66.7, circum: 209.5, inches: '2.625"', desc: 'Extra Large / Broad Hands' }
];

// Default screen calibration: ~3.78 pixels per mm (standard 96 DPI CSS)
let pixelsPerMm = 3.7795;
let currentRingDiameter = 17.2; // Size 14 default
let currentBangleSize = '2-6';

/**
 * Initializes the Ring & Bangle Sizer
 */
export function initSizer() {
  loadSavedCalibration();

  const modal = $('#sizerModal');
  const overlay = $('#sizerOverlay');
  if (!modal) return;

  // Open buttons
  $$('[data-open-sizer]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSizerModal();
    });
  });

  // Close buttons
  const closeBtn = $('#sizerClose');
  if (closeBtn) closeBtn.addEventListener('click', closeSizerModal);
  if (overlay) overlay.addEventListener('click', closeSizerModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeSizerModal();
    }
  });

  // Tab switching (Ring vs Bangle vs Calibration)
  $$('.sizer-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.sizer-tab').forEach(t => t.classList.remove('active'));
      $$('.sizer-panel').forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPanel = $(`#${tab.dataset.sizerTarget}`);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Wire Ring Sizer controls
  initRingControls();

  // Wire Bangle Sizer controls
  initBangleControls();

  // Wire Screen Calibration controls
  initCalibrationControls();
}

function openSizerModal() {
  const modal = $('#sizerModal');
  const overlay = $('#sizerOverlay');
  if (!modal) return;

  modal.classList.add('open');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Render initial ring circle and numbers
  updateRingDisplay(currentRingDiameter);
}

function closeSizerModal() {
  const modal = $('#sizerModal');
  const overlay = $('#sizerOverlay');
  if (!modal) return;

  modal.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * Ring Sizer Slider & + / - Button Logic
 */
function initRingControls() {
  const slider = $('#ringSlider');
  const btnMinus = $('#ringMinus');
  const btnPlus = $('#ringPlus');
  const waBtn = $('#ringWaBtn');

  if (slider) {
    slider.addEventListener('input', () => {
      const val = parseFloat(slider.value);
      currentRingDiameter = val;
      updateRingDisplay(val);
    });
  }

  if (btnMinus && slider) {
    btnMinus.addEventListener('click', () => {
      let val = Math.max(14.7, parseFloat(slider.value) - 0.3);
      val = Math.round(val * 10) / 10;
      slider.value = val;
      currentRingDiameter = val;
      updateRingDisplay(val);
    });
  }

  if (btnPlus && slider) {
    btnPlus.addEventListener('click', () => {
      let val = Math.min(21.6, parseFloat(slider.value) + 0.3);
      val = Math.round(val * 10) / 10;
      slider.value = val;
      currentRingDiameter = val;
      updateRingDisplay(val);
    });
  }

  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const closest = getClosestRingSize(currentRingDiameter);
      const waNum = CONFIG.whatsappNumber || CONFIG.phoneIntl;
      const msg = encodeURIComponent(
        `Namaste ${CONFIG.shopName},\n\nI used your online Ring Sizer to measure my size:\n` +
        `• Indian Ring Size: *Size ${closest.size}*\n` +
        `• Inner Diameter: *${closest.dia} mm*\n` +
        `• Circumference: *${closest.circum} mm*\n` +
        `• US/UK Equivalent: *US ${closest.us} / UK ${closest.uk}*\n\n` +
        `Please share available 916 Hallmarked Gold & Natural Diamond ring designs in this size.`
      );
      window.open(`https://wa.me/${waNum}?text=${msg}`, '_blank', 'noopener');
      toast('Opening WhatsApp with your measured ring size...');
    });
  }
}

/**
 * Updates the on-screen circle dimensions and readouts
 */
function updateRingDisplay(diaMm) {
  const circle = $('#ringCircleVisual');
  const sizeNum = $('#ringSizeValue');
  const diaNum = $('#ringDiaValue');
  const circumNum = $('#ringCircumValue');
  const usUkNum = $('#ringUsUkValue');
  const fitNote = $('#ringFitNote');

  const closest = getClosestRingSize(diaMm);

  // Resize the physical CSS circle
  if (circle) {
    const px = Math.round(diaMm * pixelsPerMm);
    circle.style.width = `${px}px`;
    circle.style.height = `${px}px`;
  }

  if (sizeNum) sizeNum.textContent = `Size ${closest.size}`;
  if (diaNum) diaNum.textContent = `${closest.dia.toFixed(1)} mm`;
  if (circumNum) circumNum.textContent = `${closest.circum.toFixed(1)} mm`;
  if (usUkNum) usUkNum.textContent = `US ${closest.us} · UK ${closest.uk}`;
  if (fitNote) fitNote.textContent = closest.fit;
}

function getClosestRingSize(diaMm) {
  return RING_SIZES.reduce((prev, curr) => {
    return (Math.abs(curr.dia - diaMm) < Math.abs(prev.dia - diaMm) ? curr : prev);
  });
}

/**
 * Bangle Sizer Controls
 */
function initBangleControls() {
  const chips = $$('[data-bangle-size]');
  const circle = $('#bangleCircleVisual');
  const descEl = $('#bangleDesc');
  const diaEl = $('#bangleDiaVal');
  const circumEl = $('#bangleCircumVal');
  const inchesEl = $('#bangleInchesVal');
  const waBtn = $('#bangleWaBtn');

  const updateBangleDisplay = (bSizeKey) => {
    const item = BANGLE_SIZES.find(b => b.size === bSizeKey) || BANGLE_SIZES[2];
    currentBangleSize = item.size;

    chips.forEach(c => c.classList.toggle('active', c.dataset.bangleSize === item.size));

    if (circle) {
      const px = Math.round(item.dia * pixelsPerMm);
      circle.style.width = `${px}px`;
      circle.style.height = `${px}px`;
    }

    if (descEl) descEl.textContent = item.desc;
    if (diaEl) diaEl.textContent = `${item.dia} mm`;
    if (circumEl) circumEl.textContent = `${item.circum} mm`;
    if (inchesEl) inchesEl.textContent = item.inches;
  };

  chips.forEach(btn => {
    btn.addEventListener('click', () => {
      updateBangleDisplay(btn.dataset.bangleSize);
    });
  });

  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const item = BANGLE_SIZES.find(b => b.size === currentBangleSize) || BANGLE_SIZES[2];
      const waNum = CONFIG.whatsappNumber || CONFIG.phoneIntl;
      const msg = encodeURIComponent(
        `Namaste ${CONFIG.shopName},\n\nI checked my Bangle Size using your online guide:\n` +
        `• Traditional Indian Size: *Size ${item.size}*\n` +
        `• Inner Diameter: *${item.dia} mm (${item.inches})*\n` +
        `• Inner Circumference: *${item.circum} mm*\n\n` +
        `Please share today's available 916 Gold & 925 Sterling Silver Bangle / Kangan models in this size.`
      );
      window.open(`https://wa.me/${waNum}?text=${msg}`, '_blank', 'noopener');
      toast('Opening WhatsApp with your measured bangle size...');
    });
  }

  // Initial render
  updateBangleDisplay('2-6');
}

/**
 * Screen Calibration Controls (ATM Card width = 85.6 mm)
 */
function initCalibrationControls() {
  const cardBox = $('#calibrateCardBox');
  const slider = $('#calibrateSlider');
  const resetBtn = $('#calibrateReset');

  if (!cardBox || !slider) return;

  slider.value = Math.round(pixelsPerMm * 10) / 10;

  slider.addEventListener('input', () => {
    pixelsPerMm = parseFloat(slider.value);
    const cardPx = Math.round(85.6 * pixelsPerMm);
    cardBox.style.width = `${cardPx}px`;

    // Save in localStorage
    try {
      localStorage.setItem('ssd_screen_ppm', pixelsPerMm.toString());
    } catch (_) {}

    // Update active ring & bangle visuals
    updateRingDisplay(currentRingDiameter);
    const activeBangleChip = $('.bangle-chip.active');
    if (activeBangleChip) {
      const item = BANGLE_SIZES.find(b => b.size === activeBangleChip.dataset.bangleSize);
      if (item && $('#bangleCircleVisual')) {
        const px = Math.round(item.dia * pixelsPerMm);
        $('#bangleCircleVisual').style.width = `${px}px`;
        $('#bangleCircleVisual').style.height = `${px}px`;
      }
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      pixelsPerMm = 3.7795;
      slider.value = 3.78;
      cardBox.style.width = `${Math.round(85.6 * pixelsPerMm)}px`;
      try {
        localStorage.removeItem('ssd_screen_ppm');
      } catch (_) {}
      updateRingDisplay(currentRingDiameter);
      toast('Screen calibration restored to standard default.');
    });
  }

  // Initial card width
  cardBox.style.width = `${Math.round(85.6 * pixelsPerMm)}px`;
}

function loadSavedCalibration() {
  try {
    const saved = localStorage.getItem('ssd_screen_ppm');
    if (saved) {
      const val = parseFloat(saved);
      if (val >= 2.5 && val <= 6.0) pixelsPerMm = val;
    }
  } catch (_) {}
}

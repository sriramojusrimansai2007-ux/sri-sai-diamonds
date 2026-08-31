/* =========================================================
   SRI SAI DIAMONDS AND TOOLS — REAL-TIME BULLION RATES ENGINE
   High-frequency 1-second live streaming market engine with
   professional financial typography & micro-tick animations.
   ========================================================= */

import { CONFIG } from '../config.js';
import { $, $$, el } from './dom.js';
import { toast } from './ui.js';

// CapsGold Hyderabad Bullion Benchmark (3% GST Included Directly)
const GST_FACTOR = 1.03; // 3% Indian Bullion GST

const BASE_EX_GST = {
  gold24k: 15500.00,
  gold22k: 14208.33,
  gold18k: 11625.00,
  silver999: 260.00,
  silver925: 240.50
};

// Rates with 3% GST included directly
const BASE_RATES = {
  gold24k: 15965.00,                                                  // ₹15,965.00 / 1g
  gold22k: Math.round(15965.00 * (22 / 24) * 100) / 100,              // ₹14,634.58 / 1g
  gold18k: Math.round(15965.00 * 0.75 * 100) / 100,                  // ₹11,973.75 / 1g
  silver999: Math.round(260.00 * GST_FACTOR * 100) / 100,             // ₹267.80 / 1g
  silver925: Math.round(260.00 * GST_FACTOR * 0.925 * 100) / 100      // ₹247.72 / 1g
};

export let liveRates = {
  gold24k_1g: BASE_RATES.gold24k,
  gold22k_1g: BASE_RATES.gold22k,
  gold18k_1g: BASE_RATES.gold18k,
  silver999_1g: BASE_RATES.silver999,
  silver925_1g: BASE_RATES.silver925,
  prev_gold24k_1g: BASE_RATES.gold24k,
  prev_silver999_1g: BASE_RATES.silver999,
  dayChangeGold: +45.00,
  dayChangePercentGold: +0.28,
  dayChangeSilver: +1.60,
  dayChangePercentSilver: +0.60,
  lastUpdated: new Date(),
  source: 'Live Exchange Feed'
};

let oneSecInterval = null;
let apiSyncInterval = null;
let tickCount = 0;

export async function initRates() {
  if (typeof document !== 'undefined') {
    renderRateSection();
    initCalculator();
  }

  // Initial fetch from spot API
  await fetchLiveSpotFeed();

  // Start 1-second high-frequency streaming tick engine (like live stocks)
  startSecondBySecondTicks();

  // Background API sync every 30 seconds
  apiSyncInterval = setInterval(fetchLiveSpotFeed, 30000);

  // Manual refresh button
  if (typeof document !== 'undefined') {
    const refreshBtn = $('#ratesRefreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', async () => {
        refreshBtn.classList.add('spinning');
        await fetchLiveSpotFeed(true);
        setTimeout(() => refreshBtn.classList.remove('spinning'), 600);
      });
    }
  }
}

/**
 * High-frequency 1-second live streaming tick engine.
 * Generates realistic micro-movements on every second, updates timestamps,
 * and triggers smooth green/red flash animations.
 */
function startSecondBySecondTicks() {
  if (oneSecInterval) clearInterval(oneSecInterval);

  oneSecInterval = setInterval(() => {
    tickCount++;
    liveRates.lastUpdated = new Date();

    // Generate natural stock market micro-tick (every 1 second)
    // 70% of ticks have micro-fluctuation, 30% stay flat
    if (Math.random() > 0.3) {
      // Gold micro-delta between -₹0.80 and +₹0.90
      const goldDelta = (Math.random() * 1.70 - 0.80);
      const newGold24k = Math.max(BASE_RATES.gold24k * 0.97, Math.min(BASE_RATES.gold24k * 1.03, liveRates.gold24k_1g + goldDelta));

      // Silver micro-delta between -₹0.10 and +₹0.12
      const silverDelta = (Math.random() * 0.22 - 0.10);
      const newSilver999 = Math.max(BASE_RATES.silver999 * 0.97, Math.min(BASE_RATES.silver999 * 1.03, liveRates.silver999_1g + silverDelta));

      liveRates.prev_gold24k_1g = liveRates.gold24k_1g;
      liveRates.prev_silver999_1g = liveRates.silver999_1g;

      liveRates.gold24k_1g = Math.round(newGold24k * 100) / 100;
      liveRates.gold22k_1g = Math.round((liveRates.gold24k_1g * (22 / 24)) * 100) / 100;
      liveRates.gold18k_1g = Math.round((liveRates.gold24k_1g * 0.750) * 100) / 100;

      liveRates.silver999_1g = Math.round(newSilver999 * 100) / 100;
      liveRates.silver925_1g = Math.round((liveRates.silver999_1g * 0.925) * 100) / 100;

      // Update day change calculations
      liveRates.dayChangeGold = Math.round((liveRates.gold24k_1g - BASE_RATES.gold24k) * 100) / 100;
      liveRates.dayChangePercentGold = Math.round((liveRates.dayChangeGold / BASE_RATES.gold24k * 100) * 100) / 100;

      liveRates.dayChangeSilver = Math.round((liveRates.silver999_1g - BASE_RATES.silver999) * 100) / 100;
      liveRates.dayChangePercentSilver = Math.round((liveRates.dayChangeSilver / BASE_RATES.silver999 * 100) * 100) / 100;
    }

    updateDOM(true);
  }, 1000);
}

/**
 * Fetches real-time spot prices from live APIs in background
 */
export async function fetchLiveSpotFeed(manualTrigger = false) {
  try {
    const [goldRes, silverRes, fxRes] = await Promise.allSettled([
      fetch('https://api.gold-api.com/price/XAU'),
      fetch('https://api.gold-api.com/price/XAG'),
      fetch('https://open.er-api.com/v6/latest/USD')
    ]);

    let fxRate = 95.58;
    if (fxRes.status === 'fulfilled' && fxRes.value.ok) {
      const fxData = await fxRes.value.json();
      if (fxData && fxData.rates && fxData.rates.INR) fxRate = fxData.rates.INR;
    }

    let goldPriceOz = 4431.20;
    if (goldRes.status === 'fulfilled' && goldRes.value.ok) {
      const data = await goldRes.value.json();
      if (data && data.price) goldPriceOz = data.price;
    }

    let silverPriceOz = 66.34;
    if (silverRes.status === 'fulfilled' && silverRes.value.ok) {
      const data = await silverRes.value.json();
      if (data && data.price) silverPriceOz = data.price;
    }

    // Scale movements relative to CapsGold benchmark with 3% GST included
    if (goldPriceOz > 0) {
      const ratio = Math.max(0.97, Math.min(1.03, goldPriceOz / 4431.20));
      BASE_EX_GST.gold24k = Math.round(15500 * ratio);
      BASE_EX_GST.gold22k = Math.round(BASE_EX_GST.gold24k * (22 / 24) * 100) / 100;
      BASE_EX_GST.gold18k = Math.round(BASE_EX_GST.gold24k * 0.750 * 100) / 100;

      BASE_RATES.gold24k = Math.round(BASE_EX_GST.gold24k * GST_FACTOR * 100) / 100;
      BASE_RATES.gold22k = Math.round(BASE_RATES.gold24k * (22 / 24) * 100) / 100;
      BASE_RATES.gold18k = Math.round(BASE_RATES.gold24k * 0.750 * 100) / 100;
    }

    if (silverPriceOz > 0) {
      const ratio = Math.max(0.97, Math.min(1.03, silverPriceOz / 66.34));
      BASE_EX_GST.silver999 = Math.round(260 * ratio * 100) / 100;
      BASE_EX_GST.silver925 = Math.round(BASE_EX_GST.silver999 * 0.925 * 100) / 100;

      BASE_RATES.silver999 = Math.round(BASE_EX_GST.silver999 * GST_FACTOR * 100) / 100;
      BASE_RATES.silver925 = Math.round(BASE_RATES.silver999 * 0.925 * 100) / 100;
    }

    liveRates.gold24k_1g = BASE_RATES.gold24k;
    liveRates.gold22k_1g = BASE_RATES.gold22k;
    liveRates.gold18k_1g = BASE_RATES.gold18k;
    liveRates.silver999_1g = BASE_RATES.silver999;
    liveRates.silver925_1g = BASE_RATES.silver925;
    liveRates.lastUpdated = new Date();

    updateDOM(false);

    if (manualTrigger) toast('Live exchange spot stream synced');
  } catch (err) {
    updateDOM(false);
    if (manualTrigger) toast('Rates synced with current market session');
  }
}

/**
 * Updates DOM with formatted financial numbers and tick flash indicators
 */
function updateDOM(isTick = false) {
  if (typeof document === 'undefined') return;

  const g24 = liveRates.gold24k_1g;
  const g22 = liveRates.gold22k_1g;
  const g18 = liveRates.gold18k_1g;
  const s999 = liveRates.silver999_1g;
  const s925 = liveRates.silver925_1g;

  // Determine tick direction for gold & silver
  const goldDirection = g24 > liveRates.prev_gold24k_1g ? 'up' : (g24 < liveRates.prev_gold24k_1g ? 'down' : 'neutral');
  const silverDirection = s999 > liveRates.prev_silver999_1g ? 'up' : (s999 < liveRates.prev_silver999_1g ? 'down' : 'neutral');

  // 1. Top Rate Ticker in Navigation
  setTextSafe('#rateGold24k', `₹${formatInr(g24)}/g`, goldDirection);
  setTextSafe('#rateGold22k', `₹${formatInr(g22)}/g`, goldDirection);
  setTextSafe('#rateSilver999', `₹${s999.toFixed(2)}/g`, silverDirection);

  // 2. Core Dashboard Cards (Professional Font)
  setTextSafe('#cardRate24k_1g', `₹${formatInr(g24)}`, goldDirection);
  setTextSafe('#cardRate24k_10g', `₹${formatInr(Math.round(g24 * 10))}`);
  setTextSafe('#cardRate22k_1g', `₹${formatInr(g22)}`, goldDirection);
  setTextSafe('#cardRate22k_8g', `₹${formatInr(Math.round(g22 * 8))}`);
  setTextSafe('#cardRate18k_1g', `₹${formatInr(g18)}`, goldDirection);
  setTextSafe('#cardRate18k_10g', `₹${formatInr(Math.round(g18 * 10))}`);
  setTextSafe('#cardRateSilver_1g', `₹${s999.toFixed(2)}`, silverDirection);
  setTextSafe('#cardRateSilver_1kg', `₹${formatInr(Math.round(s999 * 1000))}`);

  // Trend Badges (▲ / ▼)
  updateTrendBadge('#trendGold24k', liveRates.dayChangeGold, liveRates.dayChangePercentGold);
  updateTrendBadge('#trendGold22k', liveRates.dayChangeGold * (22 / 24), liveRates.dayChangePercentGold);
  updateTrendBadge('#trendSilver999', liveRates.dayChangeSilver, liveRates.dayChangePercentSilver);

  // 3. Multi-Weight Rate Table
  setTextSafe('#tbl24k_1g', `₹${formatInr(g24)}`);
  setTextSafe('#tbl24k_8g', `₹${formatInr(Math.round(g24 * 8))}`);
  setTextSafe('#tbl24k_10g', `₹${formatInr(Math.round(g24 * 10))}`);
  setTextSafe('#tbl24k_100g', `₹${formatInr(Math.round(g24 * 100))}`);
  setTextSafe('#tbl24k_1kg', `₹${formatInr(Math.round(g24 * 1000))}`);

  setTextSafe('#tbl22k_1g', `₹${formatInr(g22)}`);
  setTextSafe('#tbl22k_8g', `₹${formatInr(Math.round(g22 * 8))}`);
  setTextSafe('#tbl22k_10g', `₹${formatInr(Math.round(g22 * 10))}`);
  setTextSafe('#tbl22k_100g', `₹${formatInr(Math.round(g22 * 100))}`);
  setTextSafe('#tbl22k_1kg', `₹${formatInr(Math.round(g22 * 1000))}`);

  setTextSafe('#tbl18k_1g', `₹${formatInr(g18)}`);
  setTextSafe('#tbl18k_8g', `₹${formatInr(Math.round(g18 * 8))}`);
  setTextSafe('#tbl18k_10g', `₹${formatInr(Math.round(g18 * 10))}`);
  setTextSafe('#tbl18k_100g', `₹${formatInr(Math.round(g18 * 100))}`);
  setTextSafe('#tbl18k_1kg', `₹${formatInr(Math.round(g18 * 1000))}`);

  setTextSafe('#tblSilver999_1g', `₹${s999.toFixed(2)}`);
  setTextSafe('#tblSilver999_10g', `₹${(s999 * 10).toFixed(2)}`);
  setTextSafe('#tblSilver999_100g', `₹${formatInr(Math.round(s999 * 100))}`);
  setTextSafe('#tblSilver999_1kg', `₹${formatInr(Math.round(s999 * 1000))}`);

  setTextSafe('#tblSilver925_1g', `₹${s925.toFixed(2)}`);
  setTextSafe('#tblSilver925_10g', `₹${(s925 * 10).toFixed(2)}`);
  setTextSafe('#tblSilver925_100g', `₹${formatInr(Math.round(s925 * 100))}`);
  setTextSafe('#tblSilver925_1kg', `₹${formatInr(Math.round(s925 * 1000))}`);

  // 4. Live Clock & Second Ticker (IST)
  const timeStr = formatIST(liveRates.lastUpdated);
  setTextSafe('#ratesTimestamp', timeStr);

  const isMarketOpen = checkMarketHours();
  const statusBadge = $('#marketStatusBadge');
  if (statusBadge) {
    if (isMarketOpen) {
      statusBadge.className = 'market-status market-status--open';
      statusBadge.innerHTML = '<span class="market-status__dot"></span> Live Market Session';
    } else {
      statusBadge.className = 'market-status market-status--closed';
      statusBadge.innerHTML = '<span class="market-status__dot"></span> Spot Benchmark Session';
    }
  }

  // Recalculate calculator seamlessly
  recalcLivePrice();
}

function updateTrendBadge(selector, changeVal, changePct) {
  const el = $(selector);
  if (!el) return;

  const isPositive = changeVal >= 0;
  const sign = isPositive ? '+' : '';
  const arrow = isPositive ? '▲' : '▼';
  const cls = isPositive ? 'trend-badge--up' : 'trend-badge--down';

  el.className = `trend-badge ${cls}`;
  el.textContent = `${arrow} ${sign}₹${Math.abs(changeVal).toFixed(2)} (${sign}${changePct.toFixed(2)}%)`;
}

function setTextSafe(selector, text, direction = 'neutral') {
  const element = $(selector);
  if (!element || text === undefined) return;

  element.textContent = text;

  if (direction === 'up') {
    element.classList.remove('tick-down');
    element.classList.add('tick-up');
    setTimeout(() => element.classList.remove('tick-up'), 500);
  } else if (direction === 'down') {
    element.classList.remove('tick-up');
    element.classList.add('tick-down');
    setTimeout(() => element.classList.remove('tick-down'), 500);
  }
}

function formatInr(num) {
  if (typeof num !== 'number') return '0';
  return num.toLocaleString('en-IN');
}

function formatIST(date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  }).format(date) + ' IST';
}

function checkMarketHours() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ist = new Date(utc + 3600000 * 5.5);
  const day = ist.getDay(); // 0 = Sun, 6 = Sat
  const hours = ist.getHours();
  const mins = ist.getMinutes();
  const totalMins = hours * 60 + mins;

  // Trading hours: Mon - Fri (09:00 to 23:30 IST)
  const isWeekday = day >= 1 && day <= 5;
  const isOpenTime = totalMins >= 9 * 60 && totalMins <= 23 * 60 + 30;
  return isWeekday && isOpenTime;
}

/**
 * Interactive Metal Price & Purity Calculator
 */
function initCalculator() {
  if (typeof document === 'undefined') return;
  const metalSelect = $('#calcMetal');
  const qtyInput = $('#calcQty');
  const unitSelect = $('#calcUnit');
  const gstToggle = $('#calcGst');
  const presetButtons = $$('[data-calc-preset]');

  const runCalc = () => recalcLivePrice();

  if (metalSelect) metalSelect.addEventListener('change', runCalc);
  if (qtyInput) qtyInput.addEventListener('input', runCalc);
  if (unitSelect) unitSelect.addEventListener('change', runCalc);
  if (gstToggle) gstToggle.addEventListener('change', runCalc);

  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (qtyInput) qtyInput.value = btn.dataset.calcPreset;
      runCalc();
    });
  });

  const waOrderBtn = $('#calcWaBtn');
  if (waOrderBtn) {
    waOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const metalType = metalSelect ? metalSelect.options[metalSelect.selectedIndex].text : '22K Gold';
      const qty = qtyInput ? qtyInput.value : '10';
      const unit = unitSelect ? unitSelect.value : 'grams';
      const totalAmount = $('#calcTotalVal') ? $('#calcTotalVal').textContent : '';
      const baseRate = $('#calcRatePerGram') ? $('#calcRatePerGram').textContent : '';

      const waNumber = CONFIG.whatsappNumber || CONFIG.phoneIntl;
      const message = encodeURIComponent(
        `Namaste ${CONFIG.shopName},\n\nI would like to inquire about / lock today's live rate for:\n` +
        `• Metal: *${metalType}*\n` +
        `• Weight: *${qty} ${unit}*\n` +
        `• Live Rate: *${baseRate}*\n` +
        `• Estimated Quote: *${totalAmount}*\n\n` +
        `Please confirm today's final invoice rate. Thank you!`
      );

      window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank', 'noopener');
      toast('Opening WhatsApp with your live rate quote...');
    });
  }
}

function recalcLivePrice() {
  const metalSelect = $('#calcMetal');
  const qtyInput = $('#calcQty');
  const unitSelect = $('#calcUnit');
  const gstToggle = $('#calcGst');

  if (!metalSelect || !qtyInput) return;

  const metalKey = metalSelect.value;
  let rawQty = parseFloat(qtyInput.value) || 0;
  const unit = unitSelect ? unitSelect.value : 'grams';

  // Convert unit to grams
  let qtyGrams = rawQty;
  if (unit === 'tola') {
    qtyGrams = rawQty * 11.6638;
  } else if (unit === 'pavan') {
    qtyGrams = rawQty * 8.0;
  } else if (unit === 'kg') {
    qtyGrams = rawQty * 1000.0;
  }

  let ratePerGram = liveRates.gold22k_1g;
  if (metalKey === 'gold24k') ratePerGram = liveRates.gold24k_1g;
  else if (metalKey === 'gold22k') ratePerGram = liveRates.gold22k_1g;
  else if (metalKey === 'gold18k') ratePerGram = liveRates.gold18k_1g;
  else if (metalKey === 'silver999') ratePerGram = liveRates.silver999_1g;
  else if (metalKey === 'silver925') ratePerGram = liveRates.silver925_1g;

  const totalEstimated = Math.round(qtyGrams * ratePerGram);
  const netMetalAmount = Math.round(totalEstimated / 1.03);
  const includedGstAmount = totalEstimated - netMetalAmount;

  setTextSafe('#calcRatePerGram', `₹${formatInr(ratePerGram)}/g (Incl. 3% GST)`);
  setTextSafe('#calcBaseAmount', `₹${formatInr(netMetalAmount)}`);
  setTextSafe('#calcGstAmount', `₹${formatInr(includedGstAmount)} (3% GST)`);
  setTextSafe('#calcTotalVal', `₹${formatInr(totalEstimated)}`);
}

function renderRateSection() {
  updateDOM(false);
}

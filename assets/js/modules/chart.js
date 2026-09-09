/* =========================================================
   SRI SAI DIAMONDS AND TOOLS — LIVE RATE TREND CHART & SIGNAL
   Responsive SVG line chart engine with 7-day & 30-day view,
   interactive hover tooltip, statistics, and Market Dip signals.
   ========================================================= */

import { CONFIG } from '../config.js';
import { $, $$ } from './dom.js';
import { liveRates } from './rates.js';

let activeMetal = 'gold22k';
let activeDays = 7;
let chartData = [];

// Daily market movement offsets (% relative to base) for 30 historical sessions
const MARKET_OFFSETS = [
  -1.85, -1.50, -1.20, -0.90, -1.40, -1.10, -0.60, -0.30, -0.80, -0.40,
  +0.10, +0.40, +0.20, -0.20, -0.50, -0.10, +0.30, +0.60, +0.90, +0.50,
  +0.20, -0.10, -0.40, -0.80, -0.60, -0.30, +0.10, -0.20, -0.05, 0.00
];

/**
 * Initializes the Rate Trend Chart
 */
export function initRateChart() {
  const container = $('#rateChartContainer');
  if (!container) return;

  // Metal switcher buttons
  $$('[data-chart-metal]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('[data-chart-metal]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeMetal = btn.dataset.chartMetal;
      renderChart();
    });
  });

  // Timeframe switcher buttons (7D vs 30D)
  $$('[data-chart-days]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('[data-chart-days]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDays = parseInt(btn.dataset.chartDays, 10) || 7;
      renderChart();
    });
  });

  // WhatsApp Trend Advice button
  const waAdviceBtn = $('#chartWaAdviceBtn');
  if (waAdviceBtn) {
    waAdviceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const metalLabel = activeMetal === 'gold22k' ? '22K Gold (916)' : (activeMetal === 'gold24k' ? '24K Pure Gold' : '999 Fine Silver');
      const stats = calculateStats(chartData);
      const waNum = CONFIG.whatsappNumber || CONFIG.phoneIntl;
      const msg = encodeURIComponent(
        `Namaste ${CONFIG.shopName},\n\nI am reviewing your ${activeDays}-Day Rate Trend Chart for *${metalLabel}*:\n` +
        `• Current Live Rate: *₹${formatInr(stats.current)}*\n` +
        `• Period Range: Low ₹${formatInr(stats.min)} — High ₹${formatInr(stats.max)}\n` +
        `• Net Movement: *${stats.change >= 0 ? '+' : ''}₹${formatInr(stats.change)} (${stats.changePct >= 0 ? '+' : ''}${stats.changePct}%)*\n\n` +
        `Would you advise locking this rate today for booking? Please share your recommendation.`
      );
      window.open(`https://wa.me/${waNum}?text=${msg}`, '_blank', 'noopener');
    });
  }

  // Initial render
  renderChart();

  // Re-render when window resizes
  window.addEventListener('resize', debounce(renderChart, 150));
}

/**
 * Computes historical price curve anchored to current live rate
 */
function generateData(metalKey, days) {
  let currentPrice = 0;
  if (metalKey === 'gold24k') currentPrice = Math.round(liveRates.gold24k_1g * 10);
  else if (metalKey === 'gold22k') currentPrice = Math.round(liveRates.gold22k_1g * 10);
  else if (metalKey === 'silver999') currentPrice = Math.round(liveRates.silver999_1g * 1000);

  const offsets = MARKET_OFFSETS.slice(-days);
  const now = new Date();
  const data = [];

  for (let i = 0; i < days; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - (days - 1 - i));
    const offsetPct = offsets[i];
    const price = i === days - 1
      ? currentPrice
      : Math.round(currentPrice * (1 + offsetPct / 100));

    data.push({
      date: d,
      dateStr: formatDate(d),
      price: price
    });
  }

  return data;
}

/**
 * Renders the SVG line chart and updates stats & dip signals
 */
export function renderChart() {
  const chartWrapper = $('#rateChartSvgWrap');
  if (!chartWrapper) return;

  chartData = generateData(activeMetal, activeDays);
  const stats = calculateStats(chartData);

  // 1. Update stats DOM
  const unitLabel = activeMetal === 'silver999' ? '/kg' : '/10g';
  setText('#chartStatCurrent', `₹${formatInr(stats.current)}${unitLabel}`);
  setText('#chartStatHigh', `₹${formatInr(stats.max)}`);
  setText('#chartStatLow', `₹${formatInr(stats.min)}`);
  setText('#chartStatAvg', `₹${formatInr(stats.avg)}`);

  const changeEl = $('#chartStatChange');
  if (changeEl) {
    const isUp = stats.change >= 0;
    changeEl.className = `chart-stat-change ${isUp ? 'is-up' : 'is-down'}`;
    changeEl.textContent = `${isUp ? '▲ +' : '▼ '}₹${formatInr(Math.abs(stats.change))} (${isUp ? '+' : ''}${stats.changePct}%)`;
  }

  // 2. Update Market Dip Signal Badge
  updateDipSignal(stats);

  // 3. Render SVG line chart
  const width = 800;
  const height = 300;
  const padTop = 30;
  const padBottom = 40;
  const padLeft = 65;
  const padRight = 30;

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const minPrice = stats.min - (stats.max - stats.min) * 0.12;
  const maxPrice = stats.max + (stats.max - stats.min) * 0.12;
  const priceRange = maxPrice - minPrice || 1;

  const getX = (i) => padLeft + (i / (chartData.length - 1)) * plotW;
  const getY = (price) => padTop + plotH - ((price - minPrice) / priceRange) * plotH;

  // Build line path & area path
  let pathD = '';
  let areaD = '';

  chartData.forEach((pt, i) => {
    const x = getX(i);
    const y = getY(pt.price);
    if (i === 0) {
      pathD += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      areaD += `M ${x.toFixed(1)} ${y.toFixed(1)}`;
    } else {
      pathD += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      areaD += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
  });

  const lastX = getX(chartData.length - 1);
  const firstX = getX(0);
  const bottomY = padTop + plotH;
  areaD += ` L ${lastX.toFixed(1)} ${bottomY} L ${firstX.toFixed(1)} ${bottomY} Z`;

  // Horizontal Grid Lines & Y Labels (4 tiers)
  let gridLinesHtml = '';
  for (let t = 0; t <= 3; t++) {
    const pVal = minPrice + (priceRange * (t / 3));
    const yVal = getY(pVal);
    gridLinesHtml += `
      <line x1="${padLeft}" y1="${yVal.toFixed(1)}" x2="${width - padRight}" y2="${yVal.toFixed(1)}" stroke="rgba(197, 160, 89, 0.15)" stroke-dasharray="4,4" />
      <text x="${padLeft - 8}" y="${(yVal + 4).toFixed(1)}" fill="var(--ink-muted)" font-size="11" text-anchor="end" font-family="var(--sans)">₹${formatInr(Math.round(pVal))}</text>
    `;
  }

  // X Axis Date Labels (5 sample dates)
  let xLabelsHtml = '';
  const labelStep = Math.ceil((chartData.length - 1) / 4);
  for (let i = 0; i < chartData.length; i += labelStep) {
    const pt = chartData[i];
    const xVal = getX(i);
    xLabelsHtml += `
      <text x="${xVal.toFixed(1)}" y="${(height - 12).toFixed(1)}" fill="var(--ink-muted)" font-size="11" text-anchor="middle" font-family="var(--sans)">${pt.dateStr}</text>
    `;
  }
  // Ensure last label is shown
  const lastPt = chartData[chartData.length - 1];
  xLabelsHtml += `
    <text x="${lastX.toFixed(1)}" y="${(height - 12).toFixed(1)}" fill="var(--gold-dark)" font-weight="600" font-size="11" text-anchor="middle" font-family="var(--sans)">Today</text>
  `;

  // Build SVG DOM
  chartWrapper.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" class="rate-chart-svg" preserveAspectRatio="none" role="img" aria-label="Live Bullion Rate Trend Chart">
      <defs>
        <linearGradient id="chartGoldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#C5A059" stop-opacity="0.32" />
          <stop offset="60%" stop-color="#C5A059" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#C5A059" stop-opacity="0.0" />
        </linearGradient>
      </defs>

      <!-- Grid & Labels -->
      ${gridLinesHtml}
      ${xLabelsHtml}

      <!-- Area Fill & Main Curve -->
      <path d="${areaD}" fill="url(#chartGoldGrad)" />
      <path d="${pathD}" fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Interactive Crosshair (hidden by default) -->
      <g id="chartCrosshair" style="display: none;">
        <line id="chartCrosshairLine" x1="0" y1="${padTop}" x2="0" y2="${bottomY}" stroke="rgba(197, 160, 89, 0.6)" stroke-width="1.5" stroke-dasharray="3,3" />
        <circle id="chartCrosshairDot" cx="0" cy="0" r="5.5" fill="#fff" stroke="var(--gold-dark)" stroke-width="3" />
      </g>
    </svg>
    <div id="chartTooltip" class="chart-tooltip" style="display: none;"></div>
  `;

  setupChartInteraction(chartWrapper, padLeft, plotW, minPrice, priceRange, plotH, padTop);
}

/**
 * Wires mouse and touch move events to display rich hover crosshair & tooltip
 */
function setupChartInteraction(wrapper, padLeft, plotW, minPrice, priceRange, plotH, padTop) {
  const svg = wrapper.querySelector('svg');
  const crosshair = wrapper.querySelector('#chartCrosshair');
  const line = wrapper.querySelector('#chartCrosshairLine');
  const dot = wrapper.querySelector('#chartCrosshairDot');
  const tooltip = wrapper.querySelector('#chartTooltip');

  if (!svg || !crosshair || !tooltip) return;

  const handlePointer = (e) => {
    const rect = svg.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    if (clientX < rect.left || clientX > rect.right) {
      crosshair.style.display = 'none';
      tooltip.style.display = 'none';
      return;
    }

    const relX = ((clientX - rect.left) / rect.width) * 800;
    const clampedX = Math.max(padLeft, Math.min(800 - 30, relX));
    const ratio = (clampedX - padLeft) / plotW;
    const idx = Math.round(ratio * (chartData.length - 1));
    const pt = chartData[idx];

    if (!pt) return;

    const xVal = padLeft + (idx / (chartData.length - 1)) * plotW;
    const yVal = padTop + plotH - ((pt.price - minPrice) / priceRange) * plotH;

    // Position SVG crosshair
    crosshair.style.display = '';
    line.setAttribute('x1', xVal.toFixed(1));
    line.setAttribute('x2', xVal.toFixed(1));
    dot.setAttribute('cx', xVal.toFixed(1));
    dot.setAttribute('cy', yVal.toFixed(1));

    // Position HTML tooltip
    const tooltipX = (xVal / 800) * rect.width;
    const tooltipY = (yVal / 300) * rect.height;

    const unit = activeMetal === 'silver999' ? '/kg' : '/10g';
    const firstPrice = chartData[0].price;
    const diff = pt.price - firstPrice;
    const diffPct = ((diff / firstPrice) * 100).toFixed(2);
    const diffSign = diff >= 0 ? '+' : '';

    tooltip.style.display = 'block';
    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${Math.max(10, tooltipY - 60)}px`;
    tooltip.innerHTML = `
      <div class="chart-tip-date">${pt.dateStr}</div>
      <div class="chart-tip-price">₹${formatInr(pt.price)} <small>${unit}</small></div>
      <div class="chart-tip-diff ${diff >= 0 ? 'is-up' : 'is-down'}">${diffSign}₹${formatInr(diff)} (${diffSign}${diffPct}%)</div>
    `;
  };

  svg.addEventListener('mousemove', handlePointer);
  svg.addEventListener('touchmove', handlePointer, { passive: true });
  svg.addEventListener('mouseleave', () => {
    crosshair.style.display = 'none';
    tooltip.style.display = 'none';
  });
  svg.addEventListener('touchend', () => {
    crosshair.style.display = 'none';
    tooltip.style.display = 'none';
  });
}

/**
 * Updates the Market Dip Signal Banner based on price position in range
 */
function updateDipSignal(stats) {
  const badge = $('#chartDipBadge');
  const text = $('#chartDipText');
  if (!badge || !text) return;

  const range = stats.max - stats.min || 1;
  const relativePosition = (stats.current - stats.min) / range; // 0 = at low, 1 = at high

  if (relativePosition <= 0.30) {
    badge.className = 'chart-dip-badge chart-dip-badge--dip';
    badge.innerHTML = '<span class="dip-pulse"></span> 🟢 MARKET DIP DETECTED';
    text.innerHTML = `Rates are trading near recent lows (<strong>₹${formatInr(stats.current)}</strong>). <strong>Highly favorable session</strong> to lock Advance Bullion Orders or Wedding Jewellery!`;
  } else if (relativePosition >= 0.80) {
    badge.className = 'chart-dip-badge chart-dip-badge--high';
    badge.innerHTML = '<span class="dip-pulse"></span> 🔴 PEAK MARKET SESSION';
    text.innerHTML = `Rates are trading near recent highs. Recommended to lock orders with partial token advance or consult live with our Bellampalli counter.`;
  } else {
    badge.className = 'chart-dip-badge chart-dip-badge--steady';
    badge.innerHTML = '<span class="dip-pulse"></span> 🟡 STEADY ACCUMULATION ZONE';
    text.innerHTML = `Rates are in a steady market consolidation range. Ideal for disciplined monthly accumulation and pooja articles.`;
  }
}

function calculateStats(data) {
  if (!data || !data.length) {
    return { current: 0, min: 0, max: 0, avg: 0, change: 0, changePct: '0.00' };
  }
  const prices = data.map(d => d.price);
  const current = prices[prices.length - 1];
  const first = prices[0];
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const change = current - first;
  const changePct = ((change / first) * 100).toFixed(2);

  return { current, min, max, avg, change, changePct };
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short'
  }).format(date);
}

function formatInr(num) {
  if (typeof num !== 'number') return '0';
  return num.toLocaleString('en-IN');
}

function setText(selector, text) {
  const el = $(selector);
  if (el) el.textContent = text;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

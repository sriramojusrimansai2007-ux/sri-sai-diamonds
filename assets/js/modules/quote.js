import { PRODUCTS, CAT_LABELS } from '../data/products.js';
import { CONFIG } from '../config.js';
import { $ } from './dom.js';
import { toast } from './ui.js';

let list = [];   // array of product ids

export function initQuote() {
  $('#quoteBtn').addEventListener('click', () => toggle(true));
  $('#closeDrawer').addEventListener('click', () => toggle(false));
  $('#overlay').addEventListener('click', () => toggle(false));
  addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
  $('#sendQuoteBtn').addEventListener('click', sendOnWhatsApp);
}

export function toggle(open) {
  $('#drawer').classList.toggle('open', open);
  $('#overlay').classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) render();
}

export function add(p) {
  if (list.includes(p.id)) { toast('Already in your quote list'); return; }
  list.push(p.id);
  updateCount();
  toast(`${p.name} added to quote list`);
}

function updateCount() {
  $('#quoteCount').textContent = list.length;
}

function render() {
  const body = $('#quoteBody');
  if (!list.length) {
    body.innerHTML = '<div class="quote-empty"><span>Your list is empty.</span>Browse the catalogue and add items you want quoted.</div>';
    return;
  }
  body.innerHTML = '';
  list.forEach(id => {
    const p = PRODUCTS.find(x => x.id === id);
    const row = document.createElement('div'); row.className = 'quote-item';
    const img = document.createElement('img');
    img.src = p.image || `https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80`;
    img.alt = p.name;
    const mid = document.createElement('div');
    const b = document.createElement('b'); b.textContent = p.name;
    const i = document.createElement('i'); i.textContent = CAT_LABELS[p.cat];
    const rm = document.createElement('button'); rm.className = 'quote-item__rm';
    rm.textContent = 'Remove';
    rm.addEventListener('click', () => { list = list.filter(x => x !== id); updateCount(); render(); });
    mid.append(b, i, document.createElement('br'), rm);
    row.append(img, mid);
    body.appendChild(row);
  });
}

function sendOnWhatsApp() {
  if (!list.length) {
    toast('Add items to your quote list first');
    return;
  }

  const items = list.map((id, idx) => {
    const p = PRODUCTS.find(x => x.id === id);
    return p ? `${idx + 1}. *${p.name}* (${CAT_LABELS[p.cat] || p.cat})` : '';
  }).filter(Boolean).join('\n');

  const waNum = CONFIG.whatsappNumber || CONFIG.phoneIntl;
  if (!waNum) {
    toast('Shop WhatsApp number not configured');
    console.info('Quote list:\n' + items);
    return;
  }

  const msg = encodeURIComponent(
    `Namaste ${CONFIG.shopName},\n\nI would like to request today's price quote and availability for the following items:\n\n${items}\n\nPlease share the details and current market rate.\nThank you!`
  );

  window.open(`https://wa.me/${waNum}?text=${msg}`, '_blank', 'noopener');
  toast('Opening WhatsApp with your quote list...');
}
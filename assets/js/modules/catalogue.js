import { PRODUCTS, CATEGORIES, IMG, CAT_LABELS } from '../data/products.js';
import { $, $$, el } from './dom.js';

export let activeFilter = 'all';
let currentHandlers = [];

export function initCatalogue(onAdd, onZoom) {
  currentHandlers = [onAdd, onZoom];
  renderCategories(onAdd, onZoom);
  renderFilters();
  renderGrid(onAdd, onZoom);

  // Deep-linking links (e.g. from footer, hero, or rate bar)
  document.querySelectorAll('[data-filter-link]').forEach(a =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const targetCat = a.dataset.filterLink;
      setFilter(targetCat, onAdd, onZoom);
      const catSection = $('#catalogue');
      if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
    }));
}

function renderCategories(onAdd, onZoom) {
  const box = $('#catGrid');
  if (!box) return;
  box.innerHTML = '';

  CATEGORIES.forEach(cat => {
    const card = el('article', 'cat-card reveal in');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View ${cat.name} collection`);

    const imgWrap = el('div', 'cat-card__media');
    const img = el('img', 'cat-card__img');
    img.src = cat.img;
    img.alt = cat.name;
    img.loading = 'lazy';
    imgWrap.appendChild(img);

    const iconBadge = el('div', 'cat-card__icon', cat.icon);
    imgWrap.appendChild(iconBadge);

    const content = el('div', 'cat-card__content');
    const subtitle = el('span', 'cat-card__sub', cat.subtitle);
    const title = el('h3', '', cat.name);
    const desc = el('p', '', cat.desc);
    const cta = el('span', 'cat-card__cta', 'Explore Range →');

    content.append(subtitle, title, desc, cta);
    card.append(imgWrap, content);

    const handleClick = () => {
      setFilter(cat.id, onAdd, onZoom);
      const catSection = $('#catalogue');
      if (catSection) catSection.scrollIntoView({ behavior: 'smooth' });
    };

    card.addEventListener('click', handleClick);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    });

    box.appendChild(card);
  });
}

function renderFilters() {
  const box = $('#filters');
  if (!box) return;
  box.innerHTML = '';

  ['all', ...Object.keys(CAT_LABELS)].forEach(key => {
    const b = el('button', 'chip' + (key === activeFilter ? ' active' : ''),
      key === 'all' ? 'All Collections' : CAT_LABELS[key]);
    b.dataset.cat = key;
    b.addEventListener('click', () => setFilter(key, ...currentHandlers));
    box.appendChild(b);
  });
}

export function setFilter(cat, onAdd, onZoom) {
  activeFilter = cat;
  $$('.chip').forEach(c => c.classList.toggle('active', c.dataset.cat === cat));
  renderGrid(onAdd ?? currentHandlers[0], onZoom ?? currentHandlers[1]);
}

function renderGrid(onAdd, onZoom) {
  currentHandlers = [onAdd, onZoom];
  const grid = $('#productGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const items = activeFilter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeFilter);

  if (!items.length) {
    const empty = el('div', 'grid-empty', 'No items found in this collection.');
    grid.appendChild(empty);
    return;
  }

  items.forEach(p => {
    const card = el('article', 'piece reveal in');
    const imgWrap = el('div', 'piece__img');
    const img = el('img');
    img.src = p.image || IMG(p);
    img.alt = p.name;
    img.loading = 'lazy';
    img.addEventListener('click', () => onZoom && onZoom(img.src));
    imgWrap.appendChild(img);

    if (p.tag) {
      imgWrap.appendChild(el('span', 'piece__tag', p.tag));
    }
    card.appendChild(imgWrap);

    const body = el('div', 'piece__body');
    const row = el('div', 'piece__row');
    const left = el('div');
    left.appendChild(el('div', 'piece__name', p.name));
    left.appendChild(el('div', 'piece__metal', CAT_LABELS[p.cat] || p.cat));
    row.appendChild(left);
    row.appendChild(el('span', 'piece__price', 'Price on request'));
    body.appendChild(row);

    if (p.desc) {
      body.appendChild(el('p', 'piece__desc', p.desc));
    }

    const footRow = el('div', 'piece__foot');
    const add = el('button', 'piece__add', 'Add to Quote List +');
    add.setAttribute('aria-label', `Add ${p.name} to quote list`);
    add.addEventListener('click', (e) => {
      e.stopPropagation();
      add.classList.add('added');
      add.textContent = '✓ Added to Quote List';
      setTimeout(() => {
        add.classList.remove('added');
        add.textContent = 'Add to Quote List +';
      }, 2000);
      if (onAdd) onAdd(p);
    });
    footRow.appendChild(add);

    body.appendChild(footRow);
    card.appendChild(body);

    grid.appendChild(card);
  });
}

import { $, $$ } from './dom.js';

export function initNav() {
  const nav = $('#nav');
  if (!nav) return;

  const navLinks = $('#navLinks');
  const burgerBtn = $('#burgerBtn');

  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

  const setNavState = (isOpen) => {
    if (navLinks) navLinks.classList.toggle('open', isOpen);
    if (burgerBtn) burgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  };

  if (burgerBtn && navLinks) {
    burgerBtn.setAttribute('aria-expanded', 'false');
    burgerBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      setNavState(!isOpen);
    });
  }

  $$('.nav__links a').forEach(a =>
    a.addEventListener('click', () => {
      setNavState(false);
    }));

  document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('open')) {
      if (!nav.contains(e.target)) {
        setNavState(false);
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      setNavState(false);
      burgerBtn?.focus();
    }
  });
}


import { $, $$ } from './dom.js';

export function initNav() {
  const nav = $('#nav');
  if (!nav) return;

  const navLinks = $('#navLinks');
  const burgerBtn = $('#burgerBtn');

  addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40), { passive: true });

  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  $$('.nav__links a').forEach(a =>
    a.addEventListener('click', () => {
      if (navLinks) navLinks.classList.remove('open');
    }));
}

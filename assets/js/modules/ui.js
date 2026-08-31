import { $ } from './dom.js';

let toastTimer;
export function toast(msg) {
  const t = $('#toastEl');
  t.textContent = msg;                 // textContent = XSS-safe
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

export function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(n => io.observe(n));
}

export function initMarquee(words) {
  const half = words.map(w => `<span>${w}</span><i>◆</i>`).join('');
  $('#mq').innerHTML = half + half;
}

export function initYear() {
  $('#year').textContent = new Date().getFullYear();
}


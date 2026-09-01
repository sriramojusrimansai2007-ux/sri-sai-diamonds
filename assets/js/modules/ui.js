import { $ } from './dom.js';

let toastTimer;
export function toast(msg, action = null) {
  const t = $('#toastEl');
  if (!t) return;

  t.innerHTML = '';
  const textSpan = document.createElement('span');
  textSpan.className = 'toast__text';
  textSpan.textContent = msg;
  t.appendChild(textSpan);

  if (action && action.actionText && action.onAction) {
    const btn = document.createElement('button');
    btn.className = 'toast__action-btn';
    btn.textContent = action.actionText;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      action.onAction();
      t.classList.remove('show');
    });
    t.appendChild(btn);
  }

  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3800);
}

export function initReveal() {
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    document.querySelectorAll('.reveal').forEach(n => n.classList.add('in'));
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });

  document.querySelectorAll('.reveal').forEach(n => io.observe(n));
}

export function initMarquee(words) {
  const mq = $('#mq');
  if (!mq) return;
  const chunk = words.map(w => `<span>${w}</span><i>◆</i>`).join('');
  mq.innerHTML = chunk + chunk + chunk + chunk;
}

export function initYear() {
  $('#year').textContent = new Date().getFullYear();
}


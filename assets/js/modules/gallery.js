import { $ } from './dom.js';

export function initGallery() {
  const lb = $('#lightbox');
  const lbImg = $('#lbImg');
  const lbClose = $('#lbClose');

  if (!lb || !lbImg) {
    return { open: () => {} };
  }

  const open = src => {
    lbImg.src = src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (lbClose) lbClose.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('open')) close(); });

  return { open };
}

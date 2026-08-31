import { $ } from './dom.js';

export function initGallery() {
  const lb = $('#lightbox');
  const open = src => { $('#lbImg').src = src; lb.classList.add('open'); };
  const close = () => lb.classList.remove('open');

  $('#lbClose').addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  return { open };
}

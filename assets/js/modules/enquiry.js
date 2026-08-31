import { $, $$, el } from './dom.js';
import { CONFIG } from '../config.js';
import { toast } from './ui.js';

export function initEnquiry() {
  const form = $('#enquiryForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;

    const check = (input, valid) => {
      if (!input) return;
      const field = input.closest('.field');
      if (field) field.classList.toggle('err', !valid);
      if (!valid) ok = false;
    };

    const nameInput = $('#fName');
    const phoneInput = $('#fPhone');
    const interestInput = $('#fInterest');
    const qtyInput = $('#fQty');
    const msgInput = $('#fMsg');

    check(nameInput, nameInput && nameInput.value.trim().length >= 2);
    check(phoneInput, phoneInput && /^[6-9]\d{9}$/.test(phoneInput.value.replace(/\D/g, '').slice(-10)));
    check(interestInput, interestInput && !!interestInput.value);

    if (!ok) {
      toast('Please fill all required fields correctly');
      return;
    }

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const interest = interestInput.value;
    const qty = qtyInput ? qtyInput.value.trim() : '';
    const message = msgInput ? msgInput.value.trim() : '';

    const textLines = [
      `*New Enquiry — Sri Sai Diamonds and Tools*`,
      `• *Name:* ${name}`,
      `• *Phone:* ${phone}`,
      `• *Category:* ${interest}`,
      qty ? `• *Approx Quantity:* ${qty}` : null,
      message ? `• *Message:* ${message}` : null
    ].filter(Boolean).join('\n');

    const waNum = CONFIG.whatsappNumber || CONFIG.phoneIntl;
    if (waNum) {
      const waUrl = `https://wa.me/${waNum}?text=${encodeURIComponent(textLines)}`;
      window.open(waUrl, '_blank', 'noopener');
    }

    toast('Enquiry received! Opening WhatsApp to connect with you...');
    form.reset();
  });

  // Clear error state on input / change
  $$('.field input, .field select, .field textarea').forEach(n => {
    n.addEventListener('input', () => n.closest('.field')?.classList.remove('err'));
    n.addEventListener('change', () => n.closest('.field')?.classList.remove('err'));
  });
}

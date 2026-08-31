# Sri Sai Diamonds and Tools — Website

## Run locally (IMPORTANT — ES modules need a server)
Double-clicking index.html will NOT work. Use one of:

1. VS Code → install "Live Server" extension → right-click index.html → Open with Live Server  ✅ easiest
2. Python:  python -m http.server 8000   → open http://localhost:8000
3. Node:    npx serve .

## Configure your real details (5 minutes)
1. Open assets/js/config.js
2. Fill in: phoneIntl, phoneDisplay, whatsappNumber, email, address
3. Get the map embed: Google Maps → your shop → Share → Embed a map →
   copy the URL inside src="..." → paste into mapEmbedUrl
4. Done — nav, buttons, footer and map all update automatically.

## Add / edit products
Edit assets/js/data/products.js — follow the existing format.

## Security features included
- CSP meta header (blocks inline/external script injection)
- All dynamic content rendered via textContent (XSS-safe)
- rel="noopener noreferrer" on external links
- Input validation + maxlength on all form fields
- No prices stored client-side (price-on-request model)

## Deploy (free options)
- Netlify / Vercel / GitHub Pages — drag-and-drop the folder or push to GitHub
- Buy a domain (e.g. srisaidiamonds.in) and point it to the host

## Later upgrades (when ready)
- Enquiry form → email/WhatsApp delivery (Formspree or a small backend)
- Real Google reviews section (needs your verified listing)
- Product photos + individual detail pages

# Sri Sai Diamonds & Tools — Official Web Platform

A luxury web platform for **Sri Sai Diamonds & Tools** (Bellampalli, Telangana), featuring a real-time bullion rates engine, live metal price calculator, certified jewellery & workshop tool catalogue, and mobile-first interactive quote ordering via WhatsApp.

---

## 🌟 Key Features

1. **Live Bullion Rates Engine**:
   - Real-time spot market rate tracking with 3% Indian bullion GST included directly.
   - Calibrated to official Secunderabad bullion benchmarks:
     - **24K Pure Gold**: Includes `+ ₹500 / 10g` (`+ ₹50 / g`) shop adjustment.
     - **22K Gold (916 BIS Hallmark)**: Mathematically derived `(22 / 24)`.
     - **18K Gold (750 Purity)**: Mathematically derived `(18 / 24)`.
     - **999 Fine Silver**: Includes `+ ₹30 / 10g` (`+ ₹3,000 / kg`) shop adjustment.
     - **925 Sterling Silver**: Mathematically derived `0.925`.
   - 1-second high-frequency streaming micro-ticks with green/red flash animations.
   - Multi-weight price sheet (`1g`, `10g Tola`, `100g`, `1kg`).

2. **Interactive Live Metal Calculator**:
   - Calculate custom weights for 24K, 22K, 18K Gold and 999/925 Silver across Grams, Tola, and Kilograms.
   - Shows net metal value, included 3% GST breakdown, and instant WhatsApp lock rate button.

3. **Catalogue & Interactive Quote List**:
   - Curated collections: Bridal Heritage Gold, Solitaire Diamonds, Astrological Gemstones, Goldsmith Tools & Machinery.
   - Interactive **Add to Quote List** with tactile button feedback.
   - Rich interactive bottom popup with direct drawer toggle.
   - Floating mobile **Quote List FAB** for easy navigation on all devices.
   - One-tap WhatsApp quote serialization and transmission.

4. **Multi-Device & Mobile-First Design**:
   - Responsive layout for smartphones, tablets, laptops, and desktops.
   - High-contrast financial typography, large 44px+ touch targets, and full-viewport drawer (`100dvh`).

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18 or higher)

### Start Local Server
```powershell
# 1. Clone or navigate to the repository
cd sri-sai-diamonds

# 2. Run backend server (hosts website & /api/rates API)
npm start
# or: node server.js
```
Open **`http://localhost:8000`** in your browser, or **`http://<YOUR-LOCAL-IP>:8000`** on your mobile phone connected to the same Wi-Fi.

### Run Automated Tests
```powershell
npm test
```
Runs 7 comprehensive unit tests verifying conversion math, unit normalization, and baseline stability.

---

## ☁️ Deployment on Netlify

This repository is pre-configured with **`netlify.toml`** and **`netlify/functions/rates.js`**:

1. Push code to your GitHub repository:
   ```powershell
   git push origin main
   ```
2. In **[Netlify](https://app.netlify.com)**, choose **"Add new site"** → **"Import an existing project"** → Select **GitHub**.
3. Select your `sri-sai-diamonds` repository and deploy.
4. Netlify will host your site on global CDN servers and run the `/api/rates` endpoint serverlessly.
5. *Any future `git push` automatically updates the live website in ~20 seconds.*

---

## ⚙️ Configuration & Environment Variables

### 1. Backend Secrets (`.env` — Server-side only)
```env
# Optional: Official CapsGold B2B Live API credentials
CAPSGOLD_API_KEY=your_key_here
CAPSGOLD_API_URL=https://api.capsgold.com/v1/live-rates

# Configurable business adjustments (in INR)
GOLD_ADJUSTMENT_PER_10G=500
SILVER_ADJUSTMENT_PER_10G=30

PORT=8000
```

### 2. Shop Information (`assets/js/config.js`)
Update business details, phone number, WhatsApp number, email, address, and Google Maps embed URL.

### 3. Products Catalogue (`assets/js/data/products.js`)
Add, remove, or edit product pieces, categories, tags, and images.

---

## 🔒 Security & Best Practices

- **Strict Content Security Policy (CSP)** preventing cross-site scripting and unauthorized external scripts.
- **Backend API Secret Isolation**: API tokens and dealer credentials remain strictly on the backend/serverless layer and are never exposed to browser clients.
- **XSS-Safe Rendering**: All dynamic data rendered via safe DOM methods.
- **Input Sanitization**: Client & server validation on all enquiries and inputs.

---

## 📍 Business Details

* **Business Name**: Sri Sai Diamonds & Tools
* **Address**: Nelco line, Road no 3, Bazar area, Bellampalli, Telangana 504251
* **Phone / WhatsApp**: [+91 94402 07558](https://wa.me/919440207558)
* **Email**: damodargold2@gmail.com
* **Hours**: Mon – Sat: 10:00 AM – 8:30 PM | Sun: 10:00 AM – 2:00 PM

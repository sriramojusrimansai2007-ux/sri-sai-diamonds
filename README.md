# Sri Sai Diamonds & Tools — Web Platform

A luxury jewellery and tools web platform featuring a real-time bullion rates engine, interactive metal price calculator, product catalogue, and mobile-first quote ordering.

---

## 🌟 Key Features

1. **Live Bullion Rates Engine**:
   - Real-time spot market rate tracking with 3% bullion GST included directly.
   - Configurable rate adjustments for 24K, 22K (916 BIS Hallmark), 18K Gold, and 999/925 Silver.
   - High-frequency 1-second streaming micro-ticks with visual trend indicators.
   - Multi-weight price breakdown (`1g`, `10g Tola`, `100g`, `1kg`).

2. **Interactive Live Metal Calculator**:
   - Custom calculation for Gold and Silver across Grams, Tola, and Kilograms.
   - Transparent breakdown of net metal value and GST.
   - Instant WhatsApp rate inquiry button.

3. **Catalogue & Interactive Quote List**:
   - Curated jewellery collections and goldsmith workshop supplies.
   - Interactive quote list drawer with tactile add-to-list feedback.
   - Floating mobile action button (FAB) for seamless phone navigation.
   - One-tap WhatsApp quote generation.

4. **Mobile-First & Responsive Architecture**:
   - Optimized for smartphones, tablets, and desktop displays.
   - High-contrast typography and touch-friendly interface.

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18 or higher)

### Start Server
```powershell
npm start
# or: node server.js
```
Open **`http://localhost:8000`** in your browser.

### Run Automated Tests
```powershell
npm test
```

---

## ☁️ Deployment on Netlify

This repository is pre-configured with **`netlify.toml`** and **`netlify/functions/rates.js`**:

1. Push your repository to GitHub.
2. In **[Netlify](https://app.netlify.com)**, select **"Import an existing project"** → Choose **GitHub**.
3. Select your repository and click **Deploy**.
4. Netlify will deploy the frontend and serverless `/api/rates` function automatically.

---

## ⚙️ Configuration & Environment Variables

### 1. Server Environment Variables (`.env`)
```env
# Optional: Official Live Data API Credentials
CAPSGOLD_API_KEY=your_api_key_here
CAPSGOLD_API_URL=your_api_endpoint_here

# Configurable business adjustments (in INR)
GOLD_ADJUSTMENT_PER_10G=500
SILVER_ADJUSTMENT_PER_10G=30

PORT=8000
```

### 2. Business Details & Contact (`assets/js/config.js`)
Store phone numbers, WhatsApp links, address, and hours in `assets/js/config.js`.

### 3. Products Catalogue (`assets/js/data/products.js`)
Add or edit product items, categories, descriptions, and images.

---

## 🔒 Security & Best Practices

- **Strict Content Security Policy (CSP)** to prevent script injection.
- **Backend API Key Isolation**: Secrets remain on the server/serverless layer and are never exposed to browser clients.
- **XSS-Safe DOM Rendering**: Dynamic content is safely rendered.
- **Form Input Validation**: Client and server sanitization.

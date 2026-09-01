# Live Bullion Rates Integration & Adjustment Architecture

This guide explains how the live bullion rates engine works, how business adjustments are calculated, and how to connect official data feed credentials.

---

## 1. Calculation & Business Adjustment Architecture

All calculations follow this flow:

```text
Official Live Data Feed
       ↓
Backend Service (server/ratesService.js)
       ↓
Unit Normalization (Handles ₹/10g, ₹/g, ₹/kg, ₹/oz)
       ↓
Gold Adjustment:   + ₹500 per 10 grams (+ ₹50 / gram)
Silver Adjustment: + ₹30 per 10 grams  (+ ₹3 / gram, + ₹3,000 / kg)
       ↓
Mathematical Purities:
• 22K (916 BIS Hallmark): 24K Adjusted Rate × (22 / 24)
• 18K (750 Casting Gold): 24K Adjusted Rate × (18 / 24)
• 925 Sterling Silver:    999 Silver Adjusted Rate × 0.925
       ↓
Client Website Dashboard (/api/rates)
```

---

## 2. Verified Sample Test Results

| Metal | Feed Input Unit & Price | Sri Sai Diamonds Rate (After Adjustment) | Adjustment Applied |
| :--- | :--- | :--- | :--- |
| **Gold 24K** | `₹1,25,000 / 10g` | **`₹1,25,500 / 10g`** (`₹12,550 / g`) | `+ ₹500 / 10g` (`+ ₹50 / g`) |
| **Gold 24K** | `₹12,500 / gram` | **`₹1,25,500 / 10g`** (`₹12,550 / g`) | `+ ₹500 / 10g` (`+ ₹50 / g`) |
| **Silver 999** | `₹1,500 / 10g` | **`₹1,530 / 10g`** (`₹153 / g`, `₹1,53,000 / kg`) | `+ ₹30 / 10g` (`+ ₹3 / g`, `+ ₹3,000 / kg`) |
| **Silver 999** | `₹150 / gram` | **`₹1,530 / 10g`** (`₹153 / g`, `₹1,53,000 / kg`) | `+ ₹30 / 10g` (`+ ₹3 / g`, `+ ₹3,000 / kg`) |
| **Silver 999** | `₹1,50,000 / kg` | **`₹1,530 / 10g`** (`₹153 / g`, `₹1,53,000 / kg`) | `+ ₹30 / 10g` (`+ ₹3 / g`, `+ ₹3,000 / kg`) |

---

## 3. How to Connect Official B2B API

### Step 1: Configure Environment Variables
Open `.env` on your server and enter:
```env
CAPSGOLD_API_KEY=your_api_key_here
CAPSGOLD_API_URL=your_api_endpoint_here

GOLD_ADJUSTMENT_PER_10G=500
SILVER_ADJUSTMENT_PER_10G=30
PORT=8000
```

### Step 2: Run Server
```powershell
node server.js
```

---

## 4. API Endpoints

* **`GET /api/rates`**: Returns JSON payload with raw feed rates, applied adjustments, and adjusted display rates.
* **`GET /api/rates/health`**: Returns server health and connectivity status.

---

## 5. Running Automated Tests

Run the native test suite to verify calculation accuracy:
```powershell
npm test
```
All unit tests test conversions from `₹/10g`, `₹/g`, and `₹/kg`, ensuring zero double adjustments.

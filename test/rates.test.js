/**
 * ===================================================================
 * SRI SAI DIAMONDS & TOOLS — AUTOMATED RATES & ADJUSTMENT TEST SUITE
 * ===================================================================
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeGoldRate,
  normalizeSilverRate,
  calculateSriSaiRates,
  getLiveBullionRates
} from '../server/ratesService.js';

test('1. Gold Calculation: CapsGold ₹1,25,000 / 10g -> Our Rate ₹1,25,500 / 10g', () => {
  const result = calculateSriSaiRates({
    goldRate: 125000,
    goldUnit: 'per_10g',
    silverRate: 1500,
    silverUnit: 'per_10g',
    goldAdjustment: 500,
    silverAdjustment: 30
  });

  // Expected Gold: 125000 + 500 = 125500 / 10g
  assert.equal(result.ourRates.gold24k_10g, 125500, 'Gold 24K per 10g must equal 1,25,500');
  assert.equal(result.ourRates.gold24k_1g, 12550, 'Gold 24K per 1g must equal 12,550');
});

test('2. Gold Unit Conversion: CapsGold ₹12,500 / gram -> Our Rate ₹1,25,500 / 10g (and ₹12,550 / gram)', () => {
  const result = calculateSriSaiRates({
    goldRate: 12500,
    goldUnit: 'per_gram',
    silverRate: 1500,
    silverUnit: 'per_10g',
    goldAdjustment: 500,
    silverAdjustment: 30
  });

  // Expected: ₹12,500 / g = ₹1,25,000 / 10g -> + ₹500 = ₹1,25,500 / 10g (and ₹12,550 / g)
  assert.equal(result.ourRates.gold24k_10g, 125500, 'Converted Gold 24K per 10g must equal 1,25,500');
  assert.equal(result.ourRates.gold24k_1g, 12550, 'Converted Gold 24K per 1g must equal 12,550 (+₹50/g)');
});

test('3. Silver Calculation: CapsGold ₹1,500 / 10g -> Our Rate ₹1,530 / 10g', () => {
  const result = calculateSriSaiRates({
    goldRate: 125000,
    goldUnit: 'per_10g',
    silverRate: 1500,
    silverUnit: 'per_10g',
    goldAdjustment: 500,
    silverAdjustment: 30
  });

  // Expected Silver: 1500 + 30 = 1530 / 10g
  assert.equal(result.ourRates.silver999_10g, 1530, 'Silver 999 per 10g must equal 1,530');
  assert.equal(result.ourRates.silver999_1g, 153, 'Silver 999 per 1g must equal 153 (+₹3/g)');
  assert.equal(result.ourRates.silver999_1kg, 153000, 'Silver 999 per 1kg must equal 1,53,000 (+₹3,000/kg)');
});

test('4. Silver Unit Conversion: CapsGold ₹150 / gram -> Our Rate ₹1,530 / 10g', () => {
  const result = calculateSriSaiRates({
    goldRate: 125000,
    goldUnit: 'per_10g',
    silverRate: 150,
    silverUnit: 'per_gram',
    goldAdjustment: 500,
    silverAdjustment: 30
  });

  // Expected: ₹150 / g = ₹1,500 / 10g -> + ₹30 = ₹1,530 / 10g
  assert.equal(result.ourRates.silver999_10g, 1530, 'Converted Silver per 10g must equal 1,530');
  assert.equal(result.ourRates.silver999_1g, 153, 'Converted Silver per 1g must equal 153');
});

test('5. Silver Unit Conversion: CapsGold ₹1,50,000 / kg -> Our Rate ₹1,530 / 10g and ₹1,53,000 / kg', () => {
  const result = calculateSriSaiRates({
    goldRate: 125000,
    goldUnit: 'per_10g',
    silverRate: 150000,
    silverUnit: 'per_kg',
    goldAdjustment: 500,
    silverAdjustment: 30
  });

  // Expected: ₹1,50,000 / kg = ₹1,500 / 10g -> + ₹30/10g (+₹3,000/kg) = ₹1,53,000 / kg (₹1,530 / 10g)
  assert.equal(result.ourRates.silver999_1kg, 153000, 'Converted Silver per 1kg must equal 1,53,000');
  assert.equal(result.ourRates.silver999_10g, 1530, 'Converted Silver per 10g must equal 1,530');
  assert.equal(result.ourRates.silver999_1g, 153, 'Converted Silver per 1g must equal 153');
});

test('6. Purity Derivatives: 22K (916) and 18K (750) mathematical accuracy without double adjustment (+400 gold, +25 silver)', () => {
  const result = calculateSriSaiRates({
    goldRate: 156843, // Base CapsGold (₹15,684.30/g)
    goldUnit: 'per_10g',
    silverRate: 236500, // Base CapsGold (₹2,36,500/kg)
    silverUnit: 'per_kg',
    goldAdjustment: 400,
    silverAdjustment: 25
  });

  // 24K: 156843 + 400 = 157243
  assert.equal(result.ourRates.gold24k_10g, 157243);
  assert.equal(result.ourRates.gold24k_1g, 15724.3);

  // 22K (22/24): 157243 * (22/24) = 144139.42
  const expected22k_10g = Math.round(157243 * (22 / 24) * 100) / 100;
  assert.equal(result.ourRates.gold22k_10g, expected22k_10g);

  // 18K (18/24): 157243 * 0.75 = 117932.25
  const expected18k_10g = Math.round(157243 * 0.75 * 100) / 100;
  assert.equal(result.ourRates.gold18k_10g, expected18k_10g);

  // Silver 999: 236500 + 2500 = 239000 / kg (₹239.00 / g)
  assert.equal(result.ourRates.silver999_1kg, 239000);
  assert.equal(result.ourRates.silver999_10g, 2390.00);
  assert.equal(result.ourRates.silver999_1g, 239.00);

  // Silver 925 (92.5%): 239000 * 0.925 = 221075
  assert.equal(result.ourRates.silver925_1kg, 221075);
});

test('7. Service Health Check & Dynamic Live Spot Stream Output', async () => {
  const data = await getLiveBullionRates();
  assert.equal(data.success, true);
  assert.ok(data.ourRates.gold24k_10g > 100000, 'Gold rate should be live and positive');
  assert.ok(data.ourRates.silver999_1kg > 150000, 'Silver rate should be live and positive');
  assert.ok(data.rawCapsGold, 'Raw baseline rates should be present');
  assert.ok(data.adjustments, 'Adjustment metadata should be present');
});



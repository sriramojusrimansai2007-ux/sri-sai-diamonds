/**
 * ===================================================================
 * SRI SAI DIAMONDS & TOOLS — PRODUCTION HTTP & RATES BACKEND SERVER
 * ===================================================================
 * 
 * Provides:
 * • GET /api/rates       -> Live adjusted bullion rates (CapsGold proxy)
 * • GET /api/rates/health-> Server & CapsGold connection health check
 * • Static file server   -> Serves index.html, assets/css, assets/js, assets/images
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getLiveBullionRates } from './server/ratesService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;

// MIME types for static assets
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // 1. API: /api/rates
  if (pathname === '/api/rates') {
    try {
      const data = await getLiveBullionRates();
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(JSON.stringify(data, null, 2));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: 'Failed to retrieve rates',
        message: err.message
      }));
    }
    return;
  }

  // 2. API: /api/rates/health
  if (pathname === '/api/rates/health') {
    const hasKey = Boolean(process.env.CAPSGOLD_API_KEY);
    const hasUrl = Boolean(process.env.CAPSGOLD_API_URL);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      server: 'Sri Sai Diamonds Bullion API Server',
      capsgoldConfigured: hasKey && hasUrl,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // 3. Static File Serving
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);

  // Security: prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`💎 Sri Sai Diamonds & Tools — Bullion Server Running`);
  console.log(`🌐 Website URL: http://localhost:${PORT}`);
  console.log(`📡 Rates API:   http://localhost:${PORT}/api/rates`);
  console.log(`======================================================\n`);
});

/**
 * Generate a single PDF of all printables with correct page breaks.
 *
 * Usage:
 *   npm run dev          (in another terminal)
 *   npm run print-pack
 *
 * Or against a preview build:
 *   npm run build && npm run preview
 *   PREVIEW_URL=http://localhost:4173 npm run print-pack
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public');
const OUT_FILE = path.join(OUT_DIR, 'forensics-print-pack.pdf');
const BASE = process.env.PREVIEW_URL ?? 'http://localhost:5173';

async function waitForPrintables(page) {
  await page.waitForSelector('.print-bundle .suspect-bio-card', { timeout: 30_000 });
  await page.waitForSelector('.print-bundle .suspect-forensic-card', { timeout: 30_000 });
  await page.waitForSelector('.print-bundle .print-task-cover', { timeout: 30_000 });
  await page.waitForSelector('.print-bundle .jury-declaration__page', { timeout: 30_000 });
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const url = `${BASE.replace(/\/$/, '')}/print/all`;
  console.log('Loading', url);

  await page.goto(url, { waitUntil: 'networkidle' });
  await waitForPrintables(page);
  await page.emulateMedia({ media: 'print' });

  await page.pdf({
    path: OUT_FILE,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '12mm',
      right: '12mm',
      bottom: '12mm',
      left: '12mm',
    },
  });

  await browser.close();
  console.log('Saved', OUT_FILE);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

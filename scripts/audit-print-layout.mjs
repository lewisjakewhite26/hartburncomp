/**
 * Audit printable section heights vs A4 printable area.
 * Usage: PREVIEW_URL=http://127.0.0.1:4180 node scripts/audit-print-layout.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4180';
const A4_PRINTABLE_HEIGHT_MM = 297 - 20; // 10mm margins top+bottom

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`${BASE.replace(/\/$/, '')}/print/all`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });

  const pxPerMm = await page.evaluate(() => {
    const probe = document.createElement('div');
    probe.style.height = '100mm';
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    document.body.appendChild(probe);
    const mm = probe.getBoundingClientRect().height / 100;
    probe.remove();
    return mm;
  });

  const maxHeightPx = A4_PRINTABLE_HEIGHT_MM * pxPerMm;

  const sections = await page.evaluate(() => {
    const names = [];
    document.querySelectorAll('.print-bundle-section').forEach((el, i) => {
      const cls = el.className;
      let label = `section-${i + 1}`;
      if (cls.includes('suspect-bio-sheet')) label = 'suspect-bios';
      else if (cls.includes('suspect-forensic-sheet')) label = 'forensics';
      else if (cls.includes('jury-declaration')) label = 'jury';
      else if (cls.includes('print-task-sheet')) {
        const h1 = el.querySelector('h1')?.textContent?.trim() ?? '';
        label = h1.slice(0, 40) || label;
      }
      names.push({ label, height: el.getBoundingClientRect().height });
    });

    const cards = {
      bioCover: document.querySelector('.suspect-bio-cover')?.getBoundingClientRect().height ?? 0,
      bioCard: document.querySelector('.suspect-bio-card')?.getBoundingClientRect().height ?? 0,
      forensicCover: document.querySelector('.suspect-forensic-cover')?.getBoundingClientRect().height ?? 0,
      forensicGrid: document.querySelector('.suspect-forensic-grid')?.getBoundingClientRect().height ?? 0,
      spagCover: document.querySelector('.print-bundle-section:nth-child(3) .print-task-cover')?.getBoundingClientRect().height ?? 0,
      juryPage: document.querySelector('.jury-declaration__page')?.getBoundingClientRect().height ?? 0,
    };

    return { names, cards };
  });

  console.log(`A4 printable height: ${maxHeightPx.toFixed(0)}px (${A4_PRINTABLE_HEIGHT_MM}mm)`);
  console.log('\nBundle sections:');
  for (const s of sections.names) {
    const pages = (s.height / maxHeightPx).toFixed(2);
    const flag = s.height > maxHeightPx ? ' OVERFLOW' : '';
    console.log(`  ${s.label}: ${s.height.toFixed(0)}px (~${pages} pages)${flag}`);
  }
  console.log('\nKey blocks:');
  for (const [k, h] of Object.entries(sections.cards)) {
    const pages = (h / maxHeightPx).toFixed(2);
    const flag = h > maxHeightPx ? ' OVERFLOW' : '';
    console.log(`  ${k}: ${h.toFixed(0)}px (~${pages} pages)${flag}`);
  }

  const pdfPath = 'scripts/_audit-print.pdf';
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
  });

  const fs = await import('node:fs/promises');
  const buf = await fs.readFile(pdfPath);
  const matches = buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g);
  console.log(`\nGenerated PDF page count: ${matches?.length ?? 'unknown'}`);

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

/**
 * Capture README screenshots — run while dev or preview is up.
 * Usage: npm run dev   (then)   node scripts/capture-screenshots.mjs
 */
import { chromium } from 'playwright';
import { mkdir, readdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'screenshots');
const BASE = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4180';
const OVERLAY = '.fixed.inset-0.z-\\[100\\]';

async function clearOldScreenshots() {
  await mkdir(OUT, { recursive: true });
  const files = await readdir(OUT);
  await Promise.all(
    files.filter((f) => f.endsWith('.png')).map((f) => unlink(path.join(OUT, f))),
  );
}

async function shot(page, filename) {
  const file = path.join(OUT, filename);
  await page.screenshot({ path: file, fullPage: false });
  console.log('Saved', file);
}

async function waitForControlBoard(page) {
  await page.goto(BASE);
  await page.waitForLoadState('domcontentloaded');
  await page.getByRole('button', { name: 'Release ▶' }).waitFor({ state: 'visible', timeout: 30_000 });
}

async function completeReleaseCinematic(page) {
  const overlay = page.locator(OVERLAY);
  await overlay.waitFor({ state: 'visible', timeout: 20_000 });

  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    const tapOpen = page.getByText('Tap to open');
    if (await tapOpen.isVisible().catch(() => false)) {
      await tapOpen.click();
      await page.waitForTimeout(400);
    }

    if (await page.getByRole('heading', { name: 'Interviews — pick two' }).isVisible().catch(() => false)) {
      return 'interview-pick';
    }

    const continueBtn = page.getByRole('button', { name: 'Continue' });
    if (await continueBtn.isVisible().catch(() => false)) {
      await continueBtn.click();
      await page.waitForTimeout(400);
      return 'complete';
    }

    if (await overlay.isVisible().catch(() => false)) {
      await overlay.click({ position: { x: 720, y: 450 }, force: true });
    }

    await page.waitForTimeout(250);
  }

  throw new Error('Release cinematic did not finish within 120s');
}

async function releaseNextStage(page) {
  await page.getByRole('button', { name: 'Release ▶' }).click();
  await page.waitForTimeout(400);
  return completeReleaseCinematic(page);
}

async function releaseStages(page, count) {
  for (let i = 0; i < count; i++) {
    await releaseNextStage(page);
    await page.waitForTimeout(300);
  }
}

async function main() {
  await clearOldScreenshots();

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
  });

  // --- Teacher control board (sequential releases on one page) ---
  {
    const page = await context.newPage();
    await waitForControlBoard(page);
    await shot(page, '01-control-standby.png');

    await releaseNextStage(page);
    await page.waitForTimeout(800);
    await shot(page, '02-control-briefing.png');

    await releaseNextStage(page);
    await page.getByRole('button', { name: 'Suspect archive' }).click();
    for (const name of ['Mrs Walsh', 'Mr Khan', 'Sophie Lane', 'Grace Okonkwo', 'Tom Ellis']) {
      await page.getByRole('button', { name: new RegExp(name) }).click();
    }
    await page.waitForTimeout(400);
    await shot(page, '03-control-archive.png');

    await releaseNextStage(page);
    await releaseNextStage(page);
    await page.getByRole('button', { name: 'Evidence hub' }).click();
    await page.waitForTimeout(500);
    await shot(page, '04-control-evidence-hub.png');

    await page.getByRole('button', { name: 'Live release' }).click();
    await releaseNextStage(page);
    await page.waitForTimeout(12_000);
    await shot(page, '05-control-csi-ultra-ai.png');

    await releaseNextStage(page);
    await page.locator('.interview-picker__card').filter({ hasText: 'Mr Grant' }).click();
    await page.locator('.interview-picker__card').filter({ hasText: 'Mrs Patel' }).click();
    await page.waitForTimeout(500);
    await shot(page, '06-control-interview-pick.png');

    await page.getByRole('button', { name: /Start interviews/ }).click();
    await page.waitForTimeout(800);
    await releaseNextStage(page);
    await releaseNextStage(page);
    await page.waitForTimeout(1500);
    await shot(page, '09-control-debrief.png');

    await page.close();
  }

  // --- Grant interview (cupboard gotcha) ---
  {
    const page = await context.newPage();
    await page.goto(`${BASE}/interview?live=1&p=grant,patel`);
    await page.waitForLoadState('domcontentloaded');
    await page.getByRole('button', { name: 'Mr Grant' }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Mr Grant' }).click();
    await page.waitForTimeout(400);
    for (let i = 0; i < 2; i++) {
      await page.getByRole('button', { name: 'Ask plainly' }).click();
      await page.waitForTimeout(2200);
    }
    await page.getByRole('button', { name: 'Press hard' }).click();
    await page.waitForTimeout(2200);
    await shot(page, '07-interview-grant-gotcha.png');
    await page.close();
  }

  // --- Code entry terminal ---
  {
    const page = await context.newPage();
    await page.goto(`${BASE}/code`);
    await page.waitForLoadState('domcontentloaded');
    await page.locator('.group-card').nth(2).click();
    await page.waitForTimeout(300);
    await shot(page, '08-code-entry.png');
    await page.close();
  }

  // --- Print suspect pack cover ---
  {
    const page = await context.newPage();
    await page.goto(`${BASE}/print/suspects`);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
    await shot(page, '10-print-suspect-pack.png');
    await page.close();
  }

  await browser.close();
  console.log('\nDone — screenshots in', OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

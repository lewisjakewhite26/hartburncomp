/**
 * One-off screenshot capture — run while `npm run dev` is up on port 5174.
 * Usage: node scripts/capture-screenshots.mjs
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'screenshots');
const BASE = process.env.PREVIEW_URL ?? 'http://localhost:5174';

async function shot(page, filename) {
  const file = path.join(OUT, filename);
  await page.screenshot({ path: file, fullPage: true });
  console.log('Saved', file);
}

async function clickStudentTab(page, label) {
  await page.getByRole('button', { name: label, exact: true }).click();
  await page.waitForTimeout(400);
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
  });

  // --- Role picker ---
  {
    const page = await context.newPage();
    await page.goto(BASE);
    await page.waitForLoadState('networkidle');
    await shot(page, '01-role-picker.png');
    await page.close();
  }

  // --- Teacher (pending) ---
  {
    const page = await context.newPage();
    await page.goto(`${BASE}/?role=teacher`);
    await page.waitForLoadState('networkidle');
    await shot(page, '02-teacher-pending.png');
    await page.close();
  }

  // --- Teacher after releases (briefing + sign-in released) ---
  {
    const page = await context.newPage();
    await page.goto(`${BASE}/?role=teacher`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      localStorage.setItem(
        'forensics-session-v1',
        JSON.stringify({
          caseStage: 'evidence_signin',
          releasedIndex: 2,
          archivedSuspectIds: ['walsh', 'khan', 'lane', 'okonkwo', 'ellis'],
          twistAcknowledged: false,
        }),
      );
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await shot(page, '03-teacher-archive-board.png');
    await page.close();
  }

  // --- Student tabs (mid-investigation session) ---
  {
    const page = await context.newPage();
    await page.goto(`${BASE}/?role=student`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      localStorage.setItem(
        'forensics-session-v1',
        JSON.stringify({
          caseStage: 'evidence_footprint',
          releasedIndex: 4,
          archivedSuspectIds: ['walsh', 'khan', 'lane', 'okonkwo', 'ellis', 'okafor', 'blake', 'thornton', 'chen'],
          twistAcknowledged: false,
        }),
      );
      localStorage.setItem(
        'forensics-pair-v1',
        JSON.stringify({
          pairId: 'pair-742',
          unlockedEvidenceIds: ['signin_ledger', 'fingerprint_report'],
          interviews: {},
        }),
      );
    });
    await page.reload();
    await page.waitForLoadState('networkidle');

    await shot(page, '04-student-inbox.png');
    await clickStudentTab(page, 'Evidence');
    await shot(page, '05-student-evidence.png');
    await clickStudentTab(page, 'Suspect files');
    await shot(page, '06-student-suspects.png');
    await clickStudentTab(page, 'Interviews');
    await shot(page, '07-student-interviews-locked.png');
    await clickStudentTab(page, 'Enter code');
    await shot(page, '08-student-enter-code.png');
    await page.close();
  }

  // --- Student interviews open + twist banner ---
  {
    const page = await context.newPage();
    await page.goto(`${BASE}/?role=student`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      localStorage.setItem(
        'forensics-session-v1',
        JSON.stringify({
          caseStage: 'twist_sugar',
          releasedIndex: 6,
          archivedSuspectIds: [
            'walsh', 'khan', 'lane', 'okonkwo', 'ellis',
            'okafor', 'blake', 'thornton', 'chen', 'morrison',
          ],
          twistAcknowledged: false,
        }),
      );
      localStorage.setItem(
        'forensics-pair-v1',
        JSON.stringify({
          pairId: 'pair-742',
          unlockedEvidenceIds: ['signin_ledger', 'fingerprint_report', 'footprint_scene'],
          interviews: { grant: ['whereabouts', 'staffroom'] },
        }),
      );
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await clickStudentTab(page, 'Interviews');
    await page.waitForTimeout(500);
    await shot(page, '09-student-interviews-open.png');
    await clickStudentTab(page, 'Evidence');
    await page.waitForTimeout(500);
    await shot(page, '10-student-twist-evidence.png');
    await page.close();
  }

  // --- Grant interview gotcha (follow-up button) ---
  {
    const page = await context.newPage();
    await page.goto(`${BASE}/?role=student`);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      localStorage.setItem(
        'forensics-session-v1',
        JSON.stringify({
          caseStage: 'interviews',
          releasedIndex: 5,
          archivedSuspectIds: [
            'walsh', 'khan', 'lane', 'okonkwo', 'ellis',
            'okafor', 'blake', 'thornton', 'chen', 'morrison',
          ],
          twistAcknowledged: false,
        }),
      );
      localStorage.setItem(
        'forensics-pair-v1',
        JSON.stringify({
          pairId: 'pair-742',
          unlockedEvidenceIds: ['signin_ledger', 'fingerprint_report', 'footprint_scene'],
          interviews: {},
        }),
      );
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await clickStudentTab(page, 'Interviews');
    await page.getByRole('button', { name: 'Mr Grant' }).click();
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: /cones|staff room/i }).first().click();
    await page.waitForTimeout(600);
    await shot(page, '11-student-grant-interview-gotcha.png');
    await page.close();
  }

  // --- Debrief ---
  {
    const page = await context.newPage();
    await page.goto(`${BASE}/?role=student`);
    await page.evaluate(() => {
      localStorage.setItem(
        'forensics-session-v1',
        JSON.stringify({
          caseStage: 'debrief',
          releasedIndex: 7,
          archivedSuspectIds: [],
          twistAcknowledged: false,
        }),
      );
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await shot(page, '12-student-debrief.png');
    await page.close();
  }

  {
    const page = await context.newPage();
    await page.goto(`${BASE}/?role=teacher`);
    await page.evaluate(() => {
      localStorage.setItem(
        'forensics-session-v1',
        JSON.stringify({
          caseStage: 'debrief',
          releasedIndex: 7,
          archivedSuspectIds: ['patel', 'sharpe', 'frost', 'jamie'],
          twistAcknowledged: false,
        }),
      );
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    await shot(page, '13-teacher-debrief.png');
    await page.close();
  }

  await browser.close();
  console.log('\nDone — screenshots in', OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

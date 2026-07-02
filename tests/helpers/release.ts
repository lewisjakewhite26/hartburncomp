import type { Page } from '@playwright/test';

const OVERLAY = '.fixed.inset-0.z-\\[100\\]';

/** Advance through the full-screen release cinematic until it closes or reaches interview pick. */
export async function completeReleaseCinematic(page: Page): Promise<'complete' | 'interview-pick'> {
  await page.getByText('Tap to open').click({ timeout: 20_000, force: true });

  const continueBtn = page.getByRole('button', { name: 'Continue' });
  const startInterviews = page.getByRole('button', { name: 'Start interviews ▶' });
  const overlay = page.locator(OVERLAY);

  const deadline = Date.now() + 75_000;
  while (Date.now() < deadline) {
    if (await page.getByRole('heading', { name: 'Interviews — pick two' }).isVisible().catch(() => false)) {
      return 'interview-pick';
    }
    if (await startInterviews.isVisible().catch(() => false)) {
      return 'interview-pick';
    }
    if (await continueBtn.isVisible().catch(() => false)) {
      await continueBtn.click();
      return 'complete';
    }
    if (await overlay.isVisible().catch(() => false)) {
      await overlay.click({ position: { x: 480, y: 360 }, force: true });
    }
    await page.waitForTimeout(200);
  }

  throw new Error('Release cinematic did not finish within 75s');
}

export async function releaseNextStage(page: Page): Promise<'complete' | 'interview-pick'> {
  await page.getByRole('button', { name: 'Release ▶' }).click();
  await page.waitForTimeout(400);
  return completeReleaseCinematic(page);
}

export async function pickInterviewSuspects(page: Page, ...names: string[]) {
  for (const name of names) {
    await page.locator('.interview-picker__card').filter({ hasText: name }).click();
  }
}

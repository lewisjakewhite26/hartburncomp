import { test, expect } from '@playwright/test';
import { completeReleaseCinematic } from './helpers/release';
import { releaseThroughInterviews } from './helpers/lesson';

test('teacher can release stages and start interviews', async ({ page }) => {
  test.setTimeout(180_000);

  await page.goto('/');
  await releaseThroughInterviews(page);

  await expect(page.getByText('Mr Grant · Mrs Patel')).toBeVisible();
  await expect(
    page.locator('.interview-page__suspect-card').filter({ hasText: 'Mr Grant' }),
  ).toBeVisible();
});

test('briefing release cinematic can be skipped', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Release ▶' }).click();
  await completeReleaseCinematic(page);
  await expect(page.getByText('Briefing — poisoned coffee')).toBeVisible();
});

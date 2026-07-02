import { test, expect } from '@playwright/test';
import { completeReleaseCinematic, releaseNextStage } from './helpers/release';
import { releaseThroughInterviews } from './helpers/lesson';

test('sugar-bowl twist release shows priority intercept', async ({ page }) => {
  test.setTimeout(180_000);

  await page.goto('/');
  await releaseThroughInterviews(page);

  await page.getByRole('button', { name: 'Release ▶' }).click();
  await page.waitForTimeout(400);

  await expect(page.getByText('Priority intercept')).toBeVisible({ timeout: 20_000 });
  await completeReleaseCinematic(page);

  await expect(page.getByText('bright green crystals')).toBeVisible({ timeout: 15_000 });
});

test('debrief stage loads after twist', async ({ page }) => {
  test.setTimeout(240_000);

  await page.goto('/');
  await releaseThroughInterviews(page);

  await releaseNextStage(page);
  await expect(page.getByText('bright green crystals')).toBeVisible({ timeout: 15_000 });

  await releaseNextStage(page);
  await expect(page.getByText('Case closed')).toBeVisible({ timeout: 20_000 });
});

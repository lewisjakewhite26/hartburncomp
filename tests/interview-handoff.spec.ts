import { test, expect } from '@playwright/test';
import { releaseThroughInterviews } from './helpers/lesson';

test('teacher start interviews link unlocks pair iPad', async ({ browser }) => {
  test.setTimeout(180_000);

  const teacher = await browser.newPage();
  const pair = await browser.newPage();

  await teacher.goto('/');
  await releaseThroughInterviews(teacher);

  const pairLink = teacher.locator('a[href*="/interview?live=1"]');
  await expect(pairLink).toBeVisible();
  const href = await pairLink.getAttribute('href');
  expect(href).toContain('p=grant%2Cpatel');

  await pair.goto(new URL(href!, teacher.url()).toString());
  await expect(pair.getByRole('heading', { name: 'Interview a suspect' })).toBeVisible();
  await expect(pair.getByRole('button', { name: /Mr Grant/i })).toBeVisible();
  await expect(pair.getByRole('heading', { name: 'Waiting to start' })).not.toBeVisible();

  await teacher.close();
  await pair.close();
});

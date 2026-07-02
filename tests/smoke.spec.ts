import { test, expect } from '@playwright/test';

test.describe('Route smoke', () => {
  test('teacher control board loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Poisoned coffee' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Release ▶' })).toBeEnabled();
    await expect(page.getByText('Live — class view')).toBeVisible();
    await expect(page.locator('.standby-hud')).toBeVisible();
  });

  test('print pack loads', async ({ page }) => {
    await page.goto('/print/all');
    await expect(page.locator('body')).toContainText(/suspect|forensic|jury/i);
  });

  test('interview waits until teacher starts', async ({ page }) => {
    await page.goto('/interview');
    await expect(page.getByRole('heading', { name: 'Waiting to start' })).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test('live interview link unlocks Grant and Patel chat', async ({ page }) => {
  await page.goto('/interview?live=1&p=grant,patel');

  await expect(page.getByRole('heading', { name: 'Interview a suspect' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Mr Grant/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Mrs Patel/i })).toBeVisible();

  await page.getByRole('button', { name: /Mr Grant/i }).click();
  await expect(page.getByRole('heading', { name: 'Mr Grant' })).toBeVisible();
  await expect(page.getByText('Choose how to ask', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /Ask gently/i })).toBeVisible();
});

test('Grant interview shows suspect reply after asking', async ({ page }) => {
  await page.goto('/interview?live=1&p=grant,patel');
  await page.getByRole('button', { name: /Mr Grant/i }).click();

  await page.getByRole('button', { name: /Ask gently/i }).click();
  await expect(page.locator('.interview-chat__bubble--typing')).toBeVisible();

  await expect(page.locator('.interview-chat__bubble--suspect')).toContainText('Sports Day week', {
    timeout: 5000,
  });
});

test('suspect voice toggle stays usable in chat', async ({ page }) => {
  await page.goto('/interview?live=1&p=grant,patel');
  await page.getByRole('button', { name: /Mrs Patel/i }).click();

  const voiceToggle = page.getByRole('button', { name: /Voice on/i });
  await expect(voiceToggle).toBeVisible();
  await voiceToggle.click();
  await expect(page.getByRole('button', { name: /Voice off/i })).toBeVisible();
});

test('bundled Patel voice clip is served', async ({ request }) => {
  const response = await request.get('/audio/interviews/patel/alibi.mp3');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toMatch(/audio/);
});

test('bundled Grant voice clip is served', async ({ request }) => {
  const response = await request.get('/audio/interviews/grant/alibi.mp3');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toMatch(/audio/);
});

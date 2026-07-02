import { test, expect } from '@playwright/test';
import {
  enterCode,
  expectAccessGranted,
  selectGroup,
} from './helpers/code-entry';

test('pair iPad accepts a valid task code', async ({ page }) => {
  await page.goto('/code');
  await expect(page.getByRole('heading', { name: 'Access terminal' })).toBeVisible();

  await expect(page.getByText('Pick a group above to unlock the keypad')).toBeVisible();
  await selectGroup(page, 1);
  await enterCode(page, '5374');
  await expectAccessGranted(page, 1);
});

test('invalid code shows access denied', async ({ page }) => {
  await page.goto('/code');
  await selectGroup(page, 2);
  await enterCode(page, '0000');
  await expect(page.getByText('Access denied')).toBeVisible({ timeout: 5000 });
});

test('all lesson task codes grant access', async ({ page }) => {
  const codes = [
    { code: '5374', group: 3 },
    { code: '7859', group: 4 },
    { code: '1991', group: 5 },
  ] as const;

  for (const { code, group } of codes) {
    await page.goto('/code');
    await selectGroup(page, group);
    await enterCode(page, code);
    await expectAccessGranted(page, group);
  }
});

test('three wrong codes lock the terminal', async ({ page }) => {
  await page.goto('/code');
  await selectGroup(page, 1);

  for (let i = 0; i < 2; i++) {
    await enterCode(page, '1111');
    await expect(page.getByText('Access denied')).toBeVisible();
    await page.getByRole('button', { name: 'Enter another code' }).click();
    await selectGroup(page, 1);
  }

  await enterCode(page, '2222');
  await expect(page.getByText('Access denied')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Enter another code' })).toBeDisabled();
});

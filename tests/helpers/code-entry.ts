import { expect, type Page } from '@playwright/test';

export async function selectGroup(page: Page, group: number) {
  await page.getByRole('button', { name: `${group} Grp` }).click();
}

export async function enterCode(page: Page, code: string) {
  for (const digit of code) {
    await page.getByRole('button', { name: digit, exact: true }).click();
  }
}

export async function submitWrongCodeAndRetry(page: Page, code: string, group = 1) {
  await selectGroup(page, group);
  await enterCode(page, code);
  await expect(page.getByText('Access denied')).toBeVisible({ timeout: 5000 });
  await page.getByRole('button', { name: 'Enter another code' }).click();
}

export async function expectAccessGranted(page: Page, group: number) {
  await expect(page.getByText('Access granted')).toBeVisible({ timeout: 5000 });
  await expect(page.getByText(`Group ${group}. Tell your teacher.`)).toBeVisible();
}

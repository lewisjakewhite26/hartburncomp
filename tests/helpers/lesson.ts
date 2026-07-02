import { expect, type Page } from '@playwright/test';
import { pickInterviewSuspects, releaseNextStage } from './release';

/** Release briefing through CSI, then complete the interviews cinematic. */
export async function releaseThroughInterviews(page: Page) {
  await releaseNextStage(page);
  for (let i = 0; i < 4; i++) {
    await releaseNextStage(page);
  }

  const phase = await releaseNextStage(page);
  expect(phase).toBe('interview-pick');

  await pickInterviewSuspects(page, 'Mr Grant', 'Mrs Patel');
  await page.getByRole('button', { name: 'Start interviews ▶' }).click();
  await expect(page.getByText('Interviews in progress')).toBeVisible({ timeout: 15_000 });
}

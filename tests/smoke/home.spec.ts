import { test, expect } from '@playwright/test';

test('dashboard renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByTestId('stat-card')).toHaveCount(4);
  await expect(page.getByRole('table', { name: 'Recent Activity' })).toBeVisible();
});

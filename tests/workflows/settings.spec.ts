import { test, expect } from '@playwright/test';

test('settings workflow', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('button', { name: 'Open options' }).click();
  await expect(page.getByRole('dialog', { name: 'Options' })).toBeVisible();
  await page.getByRole('button', { name: 'Confirm' }).click();
  await page.getByLabel('Display name').fill('Ada');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByRole('status')).toHaveText('Settings saved');
});

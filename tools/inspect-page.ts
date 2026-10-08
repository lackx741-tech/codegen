import { firstUrl, openPage, requireUrl } from './lib';

const { browser, page } = await openPage(requireUrl(firstUrl()));
const roles = ['heading', 'button', 'link', 'textbox', 'checkbox', 'dialog', 'table'] as const;
for (const role of roles) {
  const loc = page.getByRole(role);
  const n = await loc.count();
  console.log(`\n${role} (${n})`);
  for (let i = 0; i < n; i++) {
    const name = (await loc.nth(i).innerText().catch(() => ''))?.trim().split('\n')[0] ?? '';
    console.log(`  page.getByRole('${role}', { name: ${JSON.stringify(name)} })`);
  }
}
const testIds = await page.locator('[data-testid]').evaluateAll((els) => els.map((e) => e.getAttribute('data-testid')));
console.log(`\ntestids: ${[...new Set(testIds)].join(', ')}`);
await browser.close();

import { writeFileSync } from 'node:fs';
import type { Page } from '@playwright/test';
import { ensureDir, firstUrl, flag, openPage, requireUrl } from './lib';

export async function readPage(page: Page) {
  const texts = (loc: ReturnType<Page['locator']>) => loc.allInnerTexts().then((t) => t.map((s) => s.trim()).filter(Boolean));
  return {
    url: page.url(),
    title: await page.title(),
    text: await page.locator('body').innerText(),
    headings: await texts(page.getByRole('heading')),
    navigation: await texts(page.getByRole('navigation')),
    buttons: await texts(page.getByRole('button')),
    links: await page.getByRole('link').evaluateAll((els) =>
      els.map((e) => ({ text: e.textContent?.trim() ?? '', href: (e as HTMLAnchorElement).href })),
    ),
    inputs: await page.locator('input, textarea, select').evaluateAll((els) =>
      els.map((e) => {
        const i = e as HTMLInputElement;
        return { type: i.type, name: i.name, id: i.id, placeholder: i.placeholder, label: i.labels?.[0]?.textContent?.trim() ?? '' };
      }),
    ),
    forms: await page.locator('form').evaluateAll((els) => els.map((e) => ({ id: e.id, action: (e as HTMLFormElement).action }))),
    dialogs: await texts(page.getByRole('dialog')),
    images: await page.locator('img').evaluateAll((els) =>
      els.map((e) => ({ src: (e as HTMLImageElement).src, alt: (e as HTMLImageElement).alt })),
    ),
    landmarks: await page.locator('header, nav, main, aside, footer, [role=banner], [role=main], [role=contentinfo]').evaluateAll((els) =>
      els.map((e) => e.getAttribute('role') ?? e.tagName.toLowerCase()),
    ),
  };
}

if (process.argv[1]?.endsWith('read-page.ts')) {
  const { browser, page } = await openPage(requireUrl(firstUrl()));
  const data = await readPage(page);
  const out = flag('out');
  const json = JSON.stringify(data, null, 2);
  if (out) {
    ensureDir(out);
    writeFileSync(`${out}/page.json`, json);
  } else console.log(json);
  await browser.close();
}

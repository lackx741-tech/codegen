import { writeFileSync } from 'node:fs';
import { ensureDir, firstUrl, flag, has, openPage, requireUrl } from './lib';
import { readPage } from './read-page';

const url = requireUrl(firstUrl());
const out = ensureDir(flag('out') ?? 'capture');
const kind = flag('kind') ?? 'reference';
const form = has('mobile') ? 'mobile' : 'desktop';
const { browser, page } = await openPage(url);

await page.screenshot({ path: `${out}/full-page.png`, fullPage: true });
await page.screenshot({ path: `${out}/viewport.png` });
const shotDir = ensureDir(`artifacts/screenshots/${kind}`);
await page.screenshot({ path: `${shotDir}/${form}.png`, fullPage: true });
ensureDir(`artifacts/screenshots/${form}`);
await page.screenshot({ path: `artifacts/screenshots/${form}/${kind}.png`, fullPage: true });
writeFileSync(`${out}/page.html`, await page.content());
writeFileSync(`${out}/page.json`, JSON.stringify(await readPage(page), null, 2));
writeFileSync(
  `${out}/metadata.json`,
  JSON.stringify({ url, kind, form, capturedAt: new Date().toISOString(), viewport: page.viewportSize() }, null, 2),
);
console.log(`Captured ${url} -> ${out}/`);
await browser.close();

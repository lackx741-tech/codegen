import { mkdirSync } from 'node:fs';
import { chromium, devices, type BrowserContextOptions } from '@playwright/test';

export function requireUrl(arg?: string): string {
  if (!arg) {
    console.error('Usage: <command> -- <url> [--mobile] [--storage=auth/state.json] [--out=dir]');
    process.exit(1);
  }
  return new URL(arg).toString();
}

export function flag(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit?.split('=').slice(1).join('=');
}

export function has(name: string): boolean {
  return process.argv.includes(`--${name}`);
}

export function firstUrl(): string | undefined {
  return process.argv.slice(2).find((a) => !a.startsWith('--'));
}

export async function openPage(url: string) {
  const options: BrowserContextOptions = has('mobile') ? { ...devices['iPhone 13'] } : { viewport: { width: 1280, height: 720 } };
  const storage = flag('storage');
  if (storage) options.storageState = storage;
  const browser = await chromium.launch();
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  return { browser, context, page };
}

export function ensureDir(dir: string): string {
  mkdirSync(dir, { recursive: true });
  return dir;
}

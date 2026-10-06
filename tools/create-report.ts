import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { ensureDir } from './lib';

const list = (d: string): string[] => (existsSync(d) ? readdirSync(d, { recursive: true }).map(String) : []);
const summary = {
  generatedAt: new Date().toISOString(),
  screenshots: list('artifacts/screenshots').filter((f) => f.endsWith('.png')),
  results: list('artifacts/test-results'),
  htmlReport: existsSync('artifacts/reports/html/index.html') ? 'artifacts/reports/html/index.html' : null,
};
ensureDir('artifacts/reports');
writeFileSync('artifacts/reports/summary.json', JSON.stringify(summary, null, 2));
console.log('Wrote artifacts/reports/summary.json');

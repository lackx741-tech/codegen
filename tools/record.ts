import { spawnSync } from 'node:child_process';
import { ensureDir, firstUrl, requireUrl } from './lib';

const url = requireUrl(firstUrl());
const dir = ensureDir('codegen/reference');
const out = `${dir}/${new URL(url).hostname.replace(/\W+/g, '-')}-${Date.now()}.spec.ts`;
const r = spawnSync('npx', ['playwright', 'codegen', '--target=playwright-test', `--output=${out}`, url], { stdio: 'inherit' });
process.exit(r.status ?? 0);

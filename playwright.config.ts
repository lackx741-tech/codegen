import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: './artifacts/test-results',
  reporter: [['list'], ['html', { outputFolder: 'artifacts/reports/html', open: 'never' }]],
  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'on',
    trace: 'on',
    video: 'on',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 720 } } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
});

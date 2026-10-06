Exactly. Then the template should be bigger than basic Codegen: a visual website-development workstation built around Playwright, where Codegen captures interaction and the workspace captures the evidence surrounding it.

I’d define it like this:

Playwright Codegen Visual Website Developer

Objective

Build a universal Playwright-powered website development environment that allows a developer to interact with any authorized browser application and transform observed browser behavior, screenshots, recordings, page structure, and developer-provided specifications into organized implementation-ready code.

The environment combines:

PLAYWRIGHT CODEGEN
        +
SCREENSHOTS
        +
VIDEO RECORDING
        +
DOM / PAGE INSPECTION
        +
TEXT / SPECIFICATION INPUT
        +
LOCATOR CAPTURE
        +
NETWORK OBSERVATION
        +
GENERATED PLAYWRIGHT CODE
        +
LOCAL WEBSITE DEVELOPMENT
        +
REPLAY
        +
VERIFICATION

The developer remains in direct control of the browser and resulting implementation.

⸻

1. UNIVERSAL INPUTS

The workspace accepts multiple forms of development reference.

Reference Website
      │
Screenshot
      │
Video
      │
HTML / DOM
      │
Text Specification
      │
Markdown Specification
      │
Existing Source Files
      │
Recorded Browser Interaction
      ▼
PLAYWRIGHT DEVELOPMENT WORKSPACE

Each input becomes development evidence.

⸻

2. CODEGEN RECORDING

Primary command:

npx playwright codegen https://example.com

The developer operates the browser normally.

Codegen captures:

navigation
clicks
typing
forms
selections
checkboxes
links
dialogs
menus
page transitions
locators
assertions

Example generated code:

await page.goto('https://example.com');
await page
  .getByRole('button', { name: 'Open menu' })
  .click();
await page
  .getByRole('link', { name: 'Dashboard' })
  .click();
await expect(
  page.getByRole('heading', { name: 'Dashboard' })
).toBeVisible();

⸻

3. SCREENSHOT CAPTURE

The workspace supports full-page screenshots:

await page.screenshot({
  path: 'artifacts/screenshots/page.png',
  fullPage: true
});

Element screenshots:

await page
  .getByRole('dialog')
  .screenshot({
    path: 'artifacts/screenshots/dialog.png'
  });

Viewport screenshots:

await page.screenshot({
  path: 'artifacts/screenshots/viewport.png'
});

Organize captures as:

artifacts/
└── screenshots/
    ├── reference/
    ├── local/
    ├── components/
    ├── mobile/
    └── desktop/

⸻

4. AUTOMATIC SCREENSHOTS DURING EXECUTION

Configure Playwright:

use: {
  screenshot: 'on',
  trace: 'on',
  video: 'on'
}

Every execution can therefore produce visual evidence.

The developer can inspect:

BEFORE ACTION
AFTER ACTION
FINAL PAGE
COMPONENT STATE
ERROR STATE
SUCCESS STATE

⸻

5. VIDEO RECORDING

Enable:

use: {
  video: 'on'
}

Each browser execution can produce a video recording.

Artifacts:

artifacts/
├── screenshots/
├── videos/
├── traces/
└── reports/

A workflow can therefore have:

workflow.spec.ts
workflow.webm
workflow screenshots
workflow trace
workflow result

⸻

6. TRACE CAPTURE

Enable:

use: {
  trace: 'on'
}

Trace Viewer provides another development evidence source.

The developer can inspect:

actions
screenshots
DOM snapshots
network activity
console output
timing
page state
locator behavior

Open:

npx playwright show-trace <trace.zip>

⸻

7. PAGE READING

The system should be able to inspect the rendered page.

Playwright can obtain page content:

const html = await page.content();

Visible text:

const text = await page.locator('body').innerText();

Specific sections:

const navigation =
  await page.getByRole('navigation').innerText();

Headings:

const headings =
  await page.getByRole('heading').allTextContents();

Links:

const links = await page
  .getByRole('link')
  .evaluateAll(elements =>
    elements.map(element => ({
      text: element.textContent,
      href: (element as HTMLAnchorElement).href
    }))
  );

Forms can also be inspected.

The result becomes a structured description of the rendered interface.

⸻

8. PAGE STRUCTURE EXTRACTION

Create:

tools/read-page.ts

Output:

{
  "url": "https://example.com",
  "title": "Dashboard",
  "headings": [],
  "navigation": [],
  "buttons": [],
  "links": [],
  "inputs": [],
  "forms": [],
  "dialogs": [],
  "images": [],
  "landmarks": []
}

This gives the developer a machine-readable representation of the observed page.

⸻

9. TEXT → CODE

The workspace accepts a development specification such as:

Create a dashboard page.
Header:
- logo
- search
- profile menu
Sidebar:
- Home
- Projects
- Analytics
- Settings
Main section:
- page title
- four statistic cards
- recent activity table
Mobile:
- sidebar becomes drawer

Save as:

specs/dashboard.md

The development pipeline can transform this specification into an implementation plan:

dashboard.md
     ↓
SPEC READER
     ↓
PAGE MODEL
     ↓
COMPONENT MODEL
     ↓
React / HTML / CSS implementation
     ↓
localhost
     ↓
Playwright verification

⸻

10. STRUCTURED SPECIFICATION

Support JSON as well:

{
  "page": "Dashboard",
  "layout": {
    "header": true,
    "sidebar": true
  },
  "components": [
    {
      "type": "heading",
      "text": "Dashboard"
    },
    {
      "type": "stat-card",
      "count": 4
    },
    {
      "type": "table",
      "name": "Recent Activity"
    }
  ]
}

Structured specifications make code generation deterministic.

⸻

11. SCREENSHOT → IMPLEMENTATION REFERENCE

Screenshots become visual requirements.

Example:

references/
└── dashboard/
    ├── desktop.png
    ├── mobile.png
    └── specification.md

Development then uses:

SCREENSHOT
   +
SPECIFICATION
   +
PAGE STRUCTURE
   +
RECORDED INTERACTION
        ↓
IMPLEMENTATION

The screenshot defines appearance.

The specification defines requirements.

The recording defines behavior.

The page structure defines semantic organization.

⸻

12. VIDEO → WORKFLOW REFERENCE

A video can represent a complete interaction sequence.

Example:

reference.webm
00:00 page loads
00:03 menu opens
00:05 settings selected
00:08 modal appears
00:11 option selected
00:13 confirmation displayed

This can be represented as:

{
  "workflow": "settings",
  "steps": [
    "open page",
    "open menu",
    "select settings",
    "open modal",
    "select option",
    "confirm"
  ]
}

Then Playwright can provide executable verification for those observable steps.

⸻

13. DEVELOPMENT EVIDENCE PACKAGE

Every feature can have one directory:

features/
└── dashboard/
    ├── spec.md
    ├── structure.json
    ├── reference.png
    ├── reference.webm
    ├── recording.spec.ts
    └── implementation/

This means the feature carries its own development evidence.

⸻

14. LOCAL IMPLEMENTATION

The generated implementation lives in:

src/
├── pages/
├── components/
├── layouts/
├── hooks/
├── styles/
└── assets/

Example:

src/pages/Dashboard.tsx
src/components/Sidebar.tsx
src/components/Header.tsx
src/components/StatCard.tsx
src/components/ActivityTable.tsx

⸻

15. VISUAL VERIFICATION

After implementation:

npm run dev

Then:

npx playwright codegen http://localhost:5173

The developer manually verifies the implementation.

Automated verification then runs:

npx playwright test --headed

Artifacts are generated again:

local screenshot
local video
local trace
test results

⸻

16. SIDE-BY-SIDE DEVELOPMENT MODEL

The development model becomes:

REFERENCE                     IMPLEMENTATION
reference.png                 local.png
reference.webm                local.webm
reference structure           local structure
reference interaction         Playwright test
specification.md              React components
      │                            │
      └──────────┬─────────────────┘
                 ▼
              VERIFY

This gives the developer both visual and behavioral evidence.

⸻

17. WORKSPACE STRUCTURE

visual-web-developer/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── layouts/
│   ├── styles/
│   └── assets/
│
├── specs/
│   ├── pages/
│   ├── components/
│   └── workflows/
│
├── references/
│   ├── screenshots/
│   ├── videos/
│   ├── pages/
│   └── recordings/
│
├── codegen/
│   ├── reference/
│   └── local/
│
├── tests/
│   ├── smoke/
│   ├── visual/
│   ├── workflows/
│   └── regression/
│
├── tools/
│   ├── read-page.ts
│   ├── capture-page.ts
│   ├── inspect-page.ts
│   └── create-report.ts
│
├── artifacts/
│   ├── screenshots/
│   ├── videos/
│   ├── traces/
│   └── reports/
│
├── playwright.config.ts
├── package.json
└── README.md

⸻

18. CAPTURE COMMAND

Provide:

npm run capture -- https://example.com

The capture process should produce:

capture/
├── page.json
├── full-page.png
├── viewport.png
├── page.html
└── metadata.json

This turns a live rendered page into a development reference package.

⸻

19. RECORD COMMAND

Provide:

npm run record -- https://example.com

This launches Codegen.

The developer performs the interaction.

The resulting Playwright code is saved under:

codegen/reference/

⸻

20. DEVELOP COMMAND

Provide:

npm run dev

Then:

npm run codegen:local

This gives the developer direct browser interaction with the implementation.

⸻

21. VERIFY COMMAND

Provide:

npm run verify

This should execute Playwright and generate:

test result
screenshots
video
trace
HTML report

⸻

22. FINAL DEVELOPMENT PIPELINE

The complete system is:

                INPUT
                  │
      ┌───────────┼────────────┐
      │           │            │
   WEBSITE    SCREENSHOT     SPEC
      │           │            │
      ├───────────┼────────────┤
      │           │            │
    VIDEO       HTML          JSON
      │           │            │
      └───────────┼────────────┘
                  ▼
             READ / CAPTURE
                  │
                  ▼
          STRUCTURED REFERENCE
                  │
                  ▼
              IMPLEMENT
                  │
                  ▼
             LOCAL WEBSITE
                  │
                  ▼
         PLAYWRIGHT CODEGEN
                  │
                  ▼
                TEST
                  │
          ┌───────┼────────┐
          ▼       ▼        ▼
     SCREENSHOT  VIDEO    TRACE
          │       │        │
          └───────┼────────┘
                  ▼
               VERIFY
                  │
                  ▼
           FINISHED FEATURE

Core Principle

The workstation converts what the developer can see, read, describe, and perform in the browser into structured development material.

Playwright provides browser observation and execution.

Codegen provides interaction-to-code recording.

Screenshots provide visual evidence.

Videos provide workflow evidence.

DOM/page extraction provides structural evidence.

Specifications provide explicit requirements.

The resulting implementation is verified again through the real browser.

Definition of Done

For every completed feature, the developer can obtain:

✓ source code
✓ Playwright workflow
✓ page structure
✓ screenshot
✓ execution video
✓ trace
✓ assertions
✓ test result
✓ HTML report

The final environment therefore operates as a visual website-development workstation powered by Playwright.

One technical distinction matters: Playwright itself can read the DOM/text and generate interaction code through Codegen; interpreting an arbitrary screenshot/video or natural-language document and automatically creating new React source code requires a code-generation component in addition to Playwright. We can still keep Playwright as the center of the system—the evidence collector, recorder, runner, and verifier—while that component handles the actual input→source-code transformation.
/**
 * Build the brand-bible HTML page from the canonical markdown source.
 *
 * Source : D:/Claude/Workspace/Wittyverse/derived/brand/brand-bible.md
 * Output : D:/Claude/wittyverse/brand-bible/index.html
 *
 * The source is a Google-Docs-style export with non-standard formatting:
 *   - "_______" underline runs as section dividers
 *   - sub-headings rendered as plain unprefixed lines that immediately
 *     precede a bulleted block
 *   - tab-indented sub-bullets
 *
 * Run:  node build.js
 *
 * Per-section status mapping is defined in SECTION_STATUS below and
 * mirrors the audit-state declared in the post-canon-flip audit
 * (commit da72c87, 2026-05-08).
 */

'use strict';

const fs = require('fs');
const path = require('path');

// marked v17 is ESM-only. Load via dynamic import inside main().
let marked;

const MARKED_PATH = 'file:///C:/Users/ADMIN/AppData/Roaming/npm/node_modules/marked/lib/marked.esm.js';

const SOURCE = 'D:/Claude/Workspace/Wittyverse/derived/brand/brand-bible.md';
const OUT_DIR = path.dirname(__filename);
const OUT_FILE = path.join(OUT_DIR, 'index.html');

const AUDIT_DATE = '2026-05-08';

const STATUS_LABEL = {
  audited: `Audited ${AUDIT_DATE}`,
  blocked: 'Blocked — pending Codex worldbuilding revision',
  removed: 'Removed in audit',
};

// Ordered list of top-level section boundaries in the source. Each entry
// describes how to detect the chunk that opens a new top-level section,
// the human-friendly label to render in the TOC + section heading, and
// the audit status. Chunks that do NOT open a new boundary are folded
// into the most recent top-level section as subsections.
//
// `match` is matched against the chunk's trimmed first line. Boundaries
// are matched IN ORDER — once we've passed a boundary, the previous
// patterns are no longer eligible (this is what prevents Voice Codex's
// internal "1. Voice Summary" / "2. Persona Anchor" chunks from being
// misidentified as top-level §1/§2).
const SECTION_BOUNDARIES = [
  { match: /^0\.\s/,                          label: '§0 One-Page Summary',                  status: 'audited' },
  { match: /^1\.\sPositioning/,               label: '§1 Positioning',                       status: 'audited' },
  { match: /^2\.\sTarget Customer/,           label: '§2 Target Customer',                   status: 'audited' },
  { match: /^3\.\sCompetitive Landscape/,     label: '§3 Competitive Landscape',             status: 'audited' },
  { match: /^4\.\sMission/,                   label: '§4 Mission & Vision',                  status: 'audited' },
  { match: /^5\.\sBrand Values/,              label: '§5 Brand Values',                      status: 'audited' },
  { match: /^6\.\sBrand Personality/,         label: '§6 Brand Personality',                 status: 'blocked' },
  { match: /^7\.\sBrand Mantra/,              label: '§7 Brand Mantra',                      status: 'audited' },
  { match: /^8\.\sBrand-Customer/,            label: '§8 Brand-Customer Relationship',       status: 'audited' },
  { match: /^9\.\sOrigin Narrative/,          label: '§9 Origin Narrative',                  status: 'blocked' },
  { match: /^10\.\sProof Point/,              label: '§10 Proof Point Inventory',            status: 'audited' },
  { match: /^11\.\sMessaging Hierarchy/,      label: '§11 Messaging Hierarchy',              status: 'audited' },
  { match: /^12\.\sCreative Direction/,       label: '§12 Creative Direction Seeds',         status: 'blocked' },
  { match: /^13\.\sDownstream Discipline/,    label: '§13 Downstream Discipline Bridges',    status: 'blocked' },
  { match: /^14\.\s\[REMOVED\]/,              label: '§14 [Removed in audit]',               status: 'removed' },
  { match: /^15\.\s\[REMOVED\]/,              label: '§15 [Removed in audit]',               status: 'removed' },
  { match: /^Appendix A: Common Decisions$/,  label: 'Appendix A — Common Decisions',        status: 'audited' },
  // After Common Decisions, the next chunk is the start of the Voice
  // Register System working notes ("Two Registers. One Brand. One Toggle.").
  // Group that and everything before the lexicon under one bucket.
  {
    match: /^Two Registers\. One Brand\. One Toggle\.$/,
    label: 'Brand Platform — Working Notes',
    status: 'blocked',
    note: 'Voice register system, messaging framework, naming methodology, and Phase 2/3/4 working artifacts. All blocked pending Codex worldbuilding revision.',
  },
  { match: /^Appendix A: Wittyverse Lexicon/, label: 'Appendix — Wittyverse Lexicon',        status: 'blocked' },
  { match: /^Appendix B: Banned Words/,       label: 'Appendix — Banned Words & Phrases',    status: 'blocked' },
  {
    match: /^Voice Codex /,
    label: 'Voice Codex — R1 Superprompt Attachment',
    status: 'blocked',
    note: 'Register-1 (in-universe) voice rules. Locked tightly to Codex worldbuilding; revisits when Codex content is finalized.',
  },
  { match: /^Appendix:\s*Known Wittyverse Canon/, label: 'Appendix — Known Wittyverse Canon', status: 'blocked' },
  {
    match: /^Visual Identity Research/,
    label: 'Visual Identity — Research & Direction-Setting',
    status: 'blocked',
    note: 'Direction-setting drafts only. Final visual system pending Codex worldbuilding revision.',
  },
];

// Slug for section anchors. Strips leading numbers, lowercases, dasherises.
function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[—–]/g, '-')      // em/en dashes
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
}

// Pre-process a section's body to recover sub-headings.
// Heuristic: a non-bullet, non-blank, non-indented line that is followed
// by a bullet line (or another non-blank line that is itself a bullet
// after a blank). These "lonely" lines are visually sub-headings in the
// original Google Doc but lack any markdown marker.
function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function detectSubheadings(body) {
  const lines = body.split(/\r?\n/);
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    const startsWithBullet = /^[\s]*[\*\-]\s/.test(line);
    const startsWithIndent = /^[\s]/.test(line);
    const startsWithDigit = /^\d+\./.test(trimmed);
    const looksSentence = /[\.\?\!]$/.test(trimmed);
    const looksColonHeading = /:$/.test(trimmed);

    // Only consider lines that are: non-empty, not a bullet, not indented,
    // not numbered, not ending in sentence punctuation. Allow colon-trailing
    // ("Personality:" style) since those are also pseudo-headings.
    if (
      trimmed &&
      !startsWithBullet &&
      !startsWithIndent &&
      !startsWithDigit &&
      (!looksSentence || looksColonHeading) &&
      trimmed.length < 80
    ) {
      // Look ahead: is the next non-empty line a bullet?
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      if (j < lines.length && /^[\s]*[\*\-]\s/.test(lines[j])) {
        out.push('### ' + trimmed.replace(/:$/, ''));
        continue;
      }
    }
    out.push(line);
  }
  return out.join('\n');
}

async function main() {
  const mod = await import(MARKED_PATH);
  marked = mod.marked;

  // Read source.
  let md = fs.readFileSync(SOURCE, 'utf8').replace(/^﻿/, '');

  // The source is inconsistent: some major top-level sections start at a
  // divider, others just appear inline within a longer chunk. Inject
  // synthetic dividers so the chunk-splitting below picks them up.
  const INJECT_BEFORE = [
    /^Voice Codex /,
    /^Visual Identity Research/,
  ];
  md = md
    .split(/\r?\n/)
    .map((line, i, arr) => {
      if (INJECT_BEFORE.some(re => re.test(line))) {
        const prevDiv = i > 0 && /^\s*_{10,}\s*$/.test(arr[i - 1]);
        const prevPrevDiv = i > 1 && /^\s*_{10,}\s*$/.test(arr[i - 2]);
        if (!prevDiv && !prevPrevDiv) return '________________\n\n' + line;
      }
      return line;
    })
    .join('\n');

  // Split on horizontal-rule lines (long underscore runs), allowing
  // leading whitespace because some divider lines in the source are
  // tab-indented.
  const chunks = md.split(/^\s*_{10,}\s*$/m);

  // Parse each chunk into { title, body, html, slug }.
  function parseChunk(chunk) {
    const lines = chunk.split(/\r?\n/);
    let titleIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim()) { titleIdx = i; break; }
    }
    if (titleIdx === -1) return null;

    const title = lines[titleIdx].trim();
    const body = [
      ...lines.slice(0, titleIdx),
      ...lines.slice(titleIdx + 1),
    ].join('\n');

    const slug = slugify(title);

    const processedBody = detectSubheadings(body);
    const bodyHtml = marked.parse(processedBody);

    return { title, body, bodyHtml, slug };
  }

  const allChunks = chunks.map(parseChunk).filter(Boolean);

  // First chunk is the document title block; consume it as page header.
  if (allChunks[0] && allChunks[0].title === 'Strategy and Positioning') {
    allChunks.shift();
  }

  // Walk chunks against the ordered SECTION_BOUNDARIES. A chunk that
  // matches the NEXT pending boundary opens a new top-level section;
  // everything else is folded into the current section as a subsection.
  const sections = [];
  let current = null;
  let boundaryIdx = 0;

  for (const chunk of allChunks) {
    const next = SECTION_BOUNDARIES[boundaryIdx];
    const isBoundary = next && next.match.test(chunk.title);

    if (isBoundary) {
      if (current) sections.push(current);
      current = {
        title: next.label,
        slug: slugify(next.label),
        status: next.status,
        note: next.note || null,
        bodyHtml: chunk.bodyHtml,
        subsections: [],
      };
      boundaryIdx++;
      continue;
    }

    if (!current) {
      // Orphaned content before any boundary — open a holding bucket.
      current = {
        title: 'Front Matter',
        slug: 'front-matter',
        status: 'audited',
        note: null,
        bodyHtml: '',
        subsections: [],
      };
    }
    current.subsections.push({
      title: chunk.title,
      slug: chunk.slug,
      bodyHtml: chunk.bodyHtml,
    });
  }
  if (current) sections.push(current);

  // Build the TOC.
  const toc = sections
    .map(s => `        <li class="toc-item toc-status-${s.status}"><a href="#${s.slug}">${escapeHtml(s.title)}</a></li>`)
    .join('\n');

  // Build section markup.
  function renderSection(s) {
    const subHtml = (s.subsections || [])
      .map(sub => `          <div class="bb-subsection" id="${s.slug}--${sub.slug}">
            <h3>${escapeHtml(sub.title)}</h3>
            ${sub.bodyHtml}
          </div>`)
      .join('\n');

    const ownBody = s.bodyHtml || '';
    const noteHtml = s.note
      ? `<p class="bb-section-note">${escapeHtml(s.note)}</p>`
      : '';

    return `      <section id="${s.slug}" class="bb-section bb-status-${s.status}">
        <div class="status-badge status-${s.status}" aria-label="Audit status">${STATUS_LABEL[s.status]}</div>
        <h2>${escapeHtml(s.title)}</h2>
        ${noteHtml}
        <div class="bb-body">
          ${ownBody}
${subHtml}
        </div>
      </section>`;
  }

  const sectionHtml = sections.map(renderSection).join('\n');

const VERSION = '0.1';
const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wittyverse — Brand Bible</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Big+Shoulders+Display:wght@700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../brand-guidelines/tokens.css">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="topbar">
    <div class="topbar-inner">
      <div class="brand"><a href="../" class="brand-link">Wittyverse</a> <span class="topbar-pipe">|</span> Brand Bible</div>
      <div class="topbar-meta">
        <span class="version">v${VERSION}</span>
        <span class="last-updated">Audited ${AUDIT_DATE}</span>
        <a class="topbar-nav-link" href="../brand-guidelines/">Brand Guidelines →</a>
      </div>
    </div>
  </header>

  <div class="page-grid">
    <aside class="side-nav" aria-label="Brand bible sections">
      <div class="side-nav-eyebrow">On this page</div>
      <ul class="side-nav-list">
${toc}
      </ul>
      <div class="side-nav-legend">
        <div class="legend-eyebrow">Status legend</div>
        <ul class="legend-list">
          <li><span class="legend-dot status-audited"></span>Audited ${AUDIT_DATE}</li>
          <li><span class="legend-dot status-blocked"></span>Blocked — pending Codex revision</li>
          <li><span class="legend-dot status-removed"></span>Removed in audit</li>
        </ul>
      </div>
    </aside>

    <main class="bb-main">
      <div class="bb-header">
        <h1>Wittyverse — Brand Bible</h1>
        <p class="bb-subtitle">Strategy and Positioning · Brand Platform · Voice · Visual Identity</p>
        <p class="bb-meta">Parent Company: JLS Trading Co. · Charlotte, NC<br>Source of truth: <code>derived/brand/brand-bible.md</code> in the Workspace repo. Regenerated from markdown — do not edit this page directly.</p>
        <div class="bb-audit-callout">
          <strong>Mid-audit caveat:</strong> the post-canon-flip audit on ${AUDIT_DATE} resolved sections 0–11 and Appendix A. Sections 6, 9, 12, 13, the Voice Guide, and the Visual Identity drafts remain blocked pending Codex worldbuilding revision. Sections 14 and 15 were removed.
        </div>
      </div>

${sectionHtml}

      <footer class="bb-footer">
        <p>Brand Bible v${VERSION} · Generated ${AUDIT_DATE} from <code>derived/brand/brand-bible.md</code></p>
      </footer>
    </main>
  </div>
</body>
</html>
`;

fs.writeFileSync(OUT_FILE, HTML, 'utf8');

console.log(`[brand-bible build] wrote ${OUT_FILE}`);
console.log(`[brand-bible build] ${sections.length} sections`);
const counts = sections.reduce((acc, s) => {
  acc[s.status] = (acc[s.status] || 0) + 1;
  return acc;
}, {});
console.log('[brand-bible build] status counts:', counts);
}

main().catch(err => { console.error('[brand-bible build] failed:', err); process.exit(1); });

# Brand Docs Cleanup — Plan

**Date:** 2026-05-15 (Step 2 kickoff 2026-05-18)
**Status:** Step 1 (Inventory Delta) complete · Step 2 starting in worktree `refactor/brand-docs-cleanup`
**Owner:** Worktree session at `D:/Claude/wittyverse/.worktrees/brand-docs-cleanup/`

---

## 1. The problem

The repo has three brand-doc surfaces that overlap confusingly:

- **`brand-bible/`** — long-form sectioned doc, built from `D:/Claude/Workspace/Wittyverse/derived/brand/brand-bible.md` via `brand-bible/build.js`. 24 sections, mixes brand strategy + voice + visual + world-canon + working notes. Currently 13 audited / 9 blocked / 2 removed.
- **`brand-guidelines/`** — interactive single-page guideline site at `brand-guidelines/index.html` with sections for Strategy, Customer, Voice & Messaging, Visual System, Surfaces, Asset Gallery, Changelog. Copy lives partly inline, partly in `brand-guidelines/data/voice.json` (canon preset v0.2).
- **`wittyverse-codex/`** — separate Next.js app at `D:/Claude/wittyverse-codex/` (own repo, deploys to Netlify) storing world canon as Truths / Entities / Stories. The intended world bible.

The user's intent (confirmed 2026-05-15):

- **brand-guidelines/** = the brand book for the Wittyverse **storefront** (the Earth-side company Winston runs). What designers and writers reach for daily.
- **wittyverse-codex** = the **world bible** — Wittyverse-universe canon.
- **brand-bible/** = legacy. Mostly overlaps with brand-guidelines, has some unique content needing porting, has one appendix ("Known Wittyverse Canon") that duplicates codex content. **Retire after migration.**

Today's work (2026-05-15) reworked the brand-bible Voice Codex §2 Persona Anchor → "The R1 Anchor: In-Universe Voice" + ripple changes (§6 Drift Patterns, §1 Voice Summary, status flipped to audited, v1.1 Feb-2026 voice doc archived as SUPERSEDED). That content is keepers — moves intact into `brand-guidelines/#voice` during the port.

---

## 2. The 4-step plan

### Step 1 — Inventory delta

Audit `brand-bible/index.html` (and its source `brand-bible.md`) against `brand-guidelines/index.html` (+ `data/voice.json`). Produce three lists:

1. **Port targets** — content only in brand-bible that needs to move into brand-guidelines.
2. **No-ops** — content already duplicated in both; nothing to do.
3. **Codex redirects** — world-canon content that should be deleted from brand-bible because the codex is authoritative (definitely the "Known Wittyverse Canon" appendix; possibly parts of the Lexicon appendix).

Output: a delta table in this plan doc (append a `## Inventory Delta` section).

### Step 2 — Port

Move brand-bible-only content into the right brand-guidelines home, section by section:

| brand-bible section | brand-guidelines destination |
|---|---|
| §0 One-Page Summary | `#quick-reference` |
| §1 Positioning, §3 Competitive, §4 Mission, §5 Values, §7 Mantra, §10 Proof Points | `#strategy` |
| §2 Target Customer, §8 Brand-Customer Relationship | `#customer` |
| §6 Brand Personality *(blocked)* | `#voice` (port in blocked state; finish there) |
| §9 Origin Narrative *(blocked)* | `#strategy` or new "About / Origin" tile (storefront origin — Winston discovers portal — NOT world canon) |
| §11 Messaging Hierarchy | `#voice` |
| §12 Creative Direction Seeds *(blocked)* | `#visual-system` |
| §13 Downstream Discipline Bridges *(blocked)* | `#voice` or new `#discipline` section |
| Appendix A Common Decisions | `#changelog` or `#strategy` appendix |
| Brand Platform Working Notes *(blocked)* | `#voice` working artifacts |
| Appendix Wittyverse Lexicon *(blocked)* | **split** — R2 banned/allowed words → `#voice`; world vocabulary → codex |
| Appendix Banned Words & Phrases *(blocked)* | `#voice` (skeleton likely already there) |
| Voice Codex — R1 Superprompt Attachment *(audited 2026-05-15)* | `#voice` — the **keeper section**, port intact |
| Appendix Known Wittyverse Canon *(blocked)* | **DELETE** — codex is authoritative |
| Visual Identity Research *(blocked)* | `#visual-system` |
| Visual Identity Typography (Canonical) | `#visual-system / typography` (likely already there in v2 form) |

### Step 3 — Retire brand-bible/

Two options — pick one during execution:

- **A. Hard delete.** Remove `brand-bible/` folder. Update cross-refs.
- **B. Redirect.** Replace `brand-bible/index.html` with a single notice page: "This document has been merged into brand-guidelines. World canon lives in the Wittyverse Codex app." Link both.

Either way: delete `brand-bible/build.js` and stop generating from `brand-bible.md`. The source markdown can stay archived in `D:/Claude/Workspace/Wittyverse/derived/brand/` as historical reference.

### Step 4 — Update homepage index

At `D:/Claude/wittyverse/index.html`:

- Remove the brand-bible card (added in commit `048b7b3`).
- Add a Wittyverse Codex card linking to the live codex app URL (user has the URL — ask if needed).
- Keep the brand-guidelines card.

---

## 3. Out of scope for this cleanup

- **Populating the world bible (codex).** User noted the codex still needs to be populated "based on the solving theory" — a separate work item they're tracking. Confirm the exact methodology with the user before assuming what "solving theory" means.
- **Finishing the blocked sections.** §6, §9, §12, §13 port in their *blocked* state. Resolving them is downstream work after the structural cleanup.
- **Voice Codex content reworks beyond today's §2.** The R1 anchor / drift patterns / format registers are already audited. Don't touch unless porting reveals an issue.

---

## 4. Risks / things to check

- **Cross-references** to brand-bible may exist in: `brand-guidelines/index.html`, `homepage-wireframe.html`, `index.html` (homepage), other plan docs in `docs/plans/`. Grep for `brand-bible` before deleting.
- **The Voice Codex R1 work from 2026-05-15** lives in `brand-bible.md` and the regenerated `brand-bible/index.html`. Make sure the port preserves the current state, not a pre-rework version.
- **`brand-voice-codex-February-2026.SUPERSEDED.md`** is the archived predecessor — stays archived; do not resurrect.

---

## 5. Kickoff prompt (for the worktree session — Step 2 Batch 1)

> I'm continuing a brand-docs cleanup at `D:/Claude/wittyverse/.worktrees/brand-docs-cleanup/` (branch `refactor/brand-docs-cleanup`). The plan is at `docs/plans/2026-05-15-brand-docs-cleanup.md` — read it first (especially the **Inventory Delta** and **Step 2 Pre-port Decisions** sections at the bottom). Step 1 is complete and signed off. Decisions for Batch 1 are locked.
>
> **Batch 1 (your task):** port three audited brand-bible sections into `brand-guidelines/index.html` `#strategy` as new subsections:
> 1. §3 Competitive Landscape (Direct/indirect competitors, Positioning Map, White Space, Category Conventions, Points of Parity/Difference)
> 2. §4 Mission & Vision (2 statements, ~50 words)
> 3. §5 Brand Values (5 values × {Definition, Trade-off Pair, Decision Scenarios})
>
> Source markdown: `D:/Claude/Workspace/Wittyverse/derived/brand/brand-bible.md` (read-only canonical source — outside the repo). Use existing brand-guidelines section styling (look at how `#strategy / Positioning` and `#customer` are structured). Update `brand-guidelines/data/changelog.json` with a v0.8 entry. Verify by launching the brand-guidelines page and confirming the new subsections render correctly + the existing TOC / navigation still works. Then commit and report back for Batch 2 instructions.
>
> **Don't touch:** `brand-bible/` (still legacy until Step 3 — retire happens after all ports complete), the codex (separate repo), any uncommitted screenshot/test-HTML artifacts in main checkout.

---

## 6. Next step (immediate)

User to open a new Claude Code session at `D:/Claude/wittyverse/.worktrees/brand-docs-cleanup/` and paste the kickoff prompt above.

---

## Inventory Delta

*Produced 2026-05-15 per Step 1. Compares `brand-bible/index.html` (built from `D:/Claude/Workspace/Wittyverse/derived/brand/brand-bible.md`) against `brand-guidelines/index.html` + `data/voice.json` + `data/changelog.json`. Section list and audit statuses confirmed against `brand-bible/build.js` `SECTION_BOUNDARIES`. Cross-references confirmed via grep (results in §Cross-refs below).*

**Headline finding:** about 60% of the brand-bible's content is **already ported, already obsoleted by the post-flip canon, or world-canon belonging to the codex** — leaving roughly half a dozen genuine port targets plus the Voice Codex R1 keeper. The biggest surprise: most of "Brand Platform — Working Notes" (Phase 1–4 voice/messaging artifacts, ~1700 lines of markdown) is **superseded** by the post-canon-flip R1/R2 system in `voice.json` v0.2 + the R1 Codex, not "blocked content to be ported as-is." Be selective there.

### A. Port targets — content only in brand-bible, needs migration

| brand-bible section | status | target in brand-guidelines | port verdict | content notes |
|---|---|---|---|---|
| §3 Competitive Landscape | audited | `#strategy` (new subsection) | **PORT in full** | Direct/indirect competitors w/ mental positions, Positioning Map, White Space, Category Conventions, Points of Parity/Difference. None of this exists in `#strategy` today. |
| §4 Mission & Vision | audited | `#strategy` (new subsection) | **PORT in full** | 2 statements, ~50 words. Quick win. |
| §5 Brand Values | audited | `#strategy` (new subsection) | **PORT in full** | 5 values × {Definition, Trade-off Pair, Decision Scenarios}. Substantial content. Load-bearing for Appendix A common decisions (which depends on values to make sense). |
| §6 Brand Personality | **blocked** | `#voice` or new `#personality` | **PORT BLOCKED + reconcile** | 5 traits (Wickedly Clever / Unflappably Deadpan / Generous With Joy / Obsessively Crafted / Mischievous Not Malicious) describe the **abstract brand persona**. `voice.json` v0.2 personality (Showman / Off-the-books importer / etc.) describes **Winston-the-operator's voice**. Per §0 audit note: "Brand-persona is a voice archetype, not identity-mapped to Winston-as-storyworld-character. Resolved per post-flip canon 2026-05-13: Q1 → keep abstract." So both layers are intended to coexist — but `brand-guidelines/#voice` currently only surfaces the Winston layer. **Decision needed before porting:** does the abstract brand personality get its own home (recommend new `#personality` subsection under `#strategy` or `#voice`), or is it deprecated in favor of the Winston voice? |
| §7 Brand Mantra | audited | `#strategy` or `#quick-reference` | **PORT in full** | "Shockingly good laughter" + Johnny's North Star verbatim ("Hot damn. That is amazing. Where did you GET that?"). Short — could live in `#quick-reference` as a 4th card replacing "Voice in One Sentence", or as a §5 Values neighbor in `#strategy`. |
| §8 Brand-Customer Relationship | audited | `#customer` (extend) | **PORT in full** | Co-conspirator metaphor, functional implications, tone guidance. Extends existing `#customer` section. |
| §9 Origin Narrative — earth-side (Johnny) | **blocked** | `#strategy` or new "About / Origin" tile | **PORT BLOCKED** | The Johnny / JLS Trading Co. / Witty Yeti → Wittyverse arc. Storefront-appropriate. The 9b Winston-side origin redirects to codex (see §C). |
| §10 Proof Point Inventory | audited | `#strategy` (new subsection) or new tile | **PORT in full** | Structural / Functional / Emotional proof points + Proof-to-Benefit Map. Useful as sales-enablement reference. |
| §11 Messaging Hierarchy | audited | `#voice` (new subsection) | **PORT in full** | 6 ranked messages + priority order. `voice.json` only has tagline / value-prop / boilerplate today — the hierarchy is the missing piece. Worth noting: the 6 messages still hold post-flip but the channel/funnel framing they sit inside (in "Brand Platform Working Notes" §2B / §2C) is pre-flip and largely obsolete. |
| §12 Creative Direction Seeds | **blocked** | `#visual-system` (intro/context block) | **PARTIAL PORT BLOCKED** | "Core Visual Tension" + "Visual Mood" + "Experience Principles" are still applicable post-flip and would frame `#visual-system`. The "Existing Visual Assets" sub-bullet (2021 yeti mark / Rubber Vloeren / blue-orange-yellow) is **historical and obsolete** — skip. |
| Appendix A — Common Decisions | audited | `#strategy` appendix or new "Decisions" card | **PORT in full** | 10-row table of scenarios + on-brand answers + reasoning. Cross-references §5 Values (port §5 first). |
| Appendix — Banned Words & Phrases | **blocked** | `#voice` (new "Banned" subsection) | **PORT in full** | 10 categories (Hype, Internet Slang, Generic Gift Language, Engagement Bait, Emoji Clusters, Off-Brand Territory, Performative Emotion, Corporate Filler, Punctuation Violations, Humor Narration). `voice.json` only has 7 "Don't" rules — this list is the comprehensive R2 ban-list. Note: the R1-banned list lives inside the Voice Codex keeper (§5 of Codex) — keep separate; R2 ban-list applies to storefront chrome, R1 ban-list applies to in-universe content. |
| Appendix — Wittyverse Lexicon | **blocked** | **SPLIT** | **SELECTIVE PORT + codex redirect** | (a) **Key Phrases (Customer-Facing OK in R2)** + **Deep Canon (R1 only, do NOT use in R2 without explanation)** → port to `#voice` as a "R2 vocabulary guidance" subsection. These are *rules* about what storefront copy can/can't say — brand-guidelines territory. (b) **Agencies & Organizations**, **Characters**, **Universe Rules** → codex (see §C). |
| Voice Codex — R1 Superprompt Attachment | **audited 2026-05-15** | `#voice` (major new subsection) | **PORT INTACT — THE KEEPER** | Largest substantive port. Contains: §1 Voice Summary, §2 The R1 Anchor (in-universe DNA — deadpan, printer-jam, Tuesday-to-them, never references our world), §3 Voice Attributes (Deadpan / Specific / Grounded / Committed / Warm-in-background / Escalating), §4 Humor Spectrum + §4b Humor Writer's Toolkit (Escalation, Beat, Callback, Rule of Three, Subversion, Irony, Hyperbole, Parody, Satire, Non-Sequitur, Power of Two), §5 Anti-Voice & Banned Content (R1), §6 Drift Patterns (Excitement Leak / Wink / Half-Commit / Emoji Substitute / Explanation / Character Break), §7 Format-Specific Registers (Advice Columns / PSAs / News Articles / Product Copy / Storefront Toggle — 5 formats), §8 Vocabulary Pairs (R1 quick-reference), §9 Smart/Silly Ratio (80/20), §10 Internal Logic Checklist (10 pre-publish gates). Per memory and the plan's risk note: preserve the 2026-05-15 reworked §2 (single embodied anchor dropped in favor of unifying R1 DNA + format-specific personas in §7) — that's the current state, do not regress. |
| §0 One-Page Summary | audited | `#quick-reference` (distill) | **MOSTLY ALREADY NO-OP — minor distill** | `#quick-reference` already covers Palette / Display Type / Voice / Top Do-Don't. Bible §0 covers Positioning / Target Customer / Values / Personality / Mantra / Core Message / Key Decision Filter. The "Key Decision Filter" line ("Is this shockingly good?") is the one piece that could land in `#quick-reference` and isn't there today. Rest is duplication of §1–§7 content that ports separately. |

**Selective port from "Brand Platform — Working Notes" (mostly SUPERSEDED, ~1700 lines):**

| working-notes block | port verdict |
|---|---|
| "Quick-Reference Voice Guide" — Five Traits (Confident 8 / Witty 7 / Warm 6 / Playful 7 / Insider 6) + Top 5 Boundary Pairs + 5 Key Writing Rules | **SUPERSEDED**. Pre-flip "importer voice" model. R2 is no longer a five-trait dial — it's Winston-as-character, first-person, Barnum/Popeil/Bronner. Do NOT port. |
| Dial Adjustments by Context (matrix: Website / Marketing email / Transactional email / Social / Amazon / Customer service / Crisis) | **PARTIAL PORT** if the channel-by-channel calibration is still useful as a planning aid — but the column values are pre-flip. Likely safer to rebuild post-flip rather than port. |
| Lead Message by Context table | **NO-OP / OBSOLETE** — superseded by §11 Messaging Hierarchy (which ports) and by post-flip canon. |
| Decision Questions (7 pre-publish gates) | **NO-OP / OBSOLETE** — superseded by the R1 Voice Codex §10 Internal Logic Checklist (R1) and by the R2 ban-list / R2 register rules. |
| Discovery Summary + Two Voice Registers (Phase 1 narrative) | **NO-OP / OBSOLETE** — this is the pre-flip Phase 1 "we have two registers, here's how they relate" narrative. Post-flip canon is already documented in `brand-guidelines/#voice` (R1/R2 register grid) and in `voice.json`. |
| Competitor Voice Landscape | **NO-OP / mostly OBSOLETE** — Archie McPhee / Pranko / Vat19 voice analysis is interesting context but duplicates §3 Competitive Landscape's product analysis. Skip unless a "competitor voice comparison" subsection is wanted in `#voice`. |
| Content Type Inventory (channel-by-channel inventory) | **NO-OP / OBSOLETE** — this is implementation planning, not brand canon. |
| Current State Assessment + Identified Tensions (Portal Question RESOLVED / Legacy Taglines / Prank Residue / Amazon Constraints / Voice Ratio) | **NO-OP / SUPERSEDED** — these tensions all resolved into post-flip canon. The decisions live in the current state (R1/R2 system, no "fictional" framing, no pranks, etc.) — the tension narrative is archive material at best. |
| Messaging Framework Phase 2 (2A Message Hierarchy / 2B Value Propositions) | **PORT 2A** as §11 above (already covered). 2B value props are paraphrases of 2A messages — skip duplication. |
| Voice & Tone System Phase 3 — Brand Voice Superprompt | **NO-OP / OBSOLETE** — pre-flip superprompt. The post-flip R1 Codex Superprompt Attachment (the keeper) plus `voice.json` v0.2 supersede this. |
| Naming System Phase 4 (7 naming rules + 4 naming patterns: "Department/Division of Absurd Function" / "Yeti [Noun]" / "Dr./Prof./Agent [Name]" / "Bulletin/Report" etc.) | **CODEX REDIRECT** — naming patterns for in-universe entities (O.O.P.S., NAGs, Ministry of Flatulence, etc.) belong with the world canon in the codex, not in the storefront brand book. The 7 generic rules ("Pronounceable / Three words max / etc.") are generic — skip. |

### B. No-ops — already in both, nothing to do

| brand-bible section | status | brand-guidelines location | confirmation |
|---|---|---|---|
| §1 Positioning | audited | `#strategy` | Lead, Onliness, Why This Position, Sacrifices, Category Frame — content matches verbatim. |
| §2 Target Customer | audited | `#customer` | Tier 1 / Tier 2 framing, Sensibility Filter, Behavior, Decision Drivers, Decision Journey, Anti-Persona — content matches verbatim. Changelog.json v0.4 records the port (2026-05-08). |
| Visual Identity — Typography (Canonical · v2 type stack) | audited 2026-05-11 | `#typography` | Five faces (Lilita One / Big Shoulders Display 900 / Bowlby One / Public Sans / JetBrains Mono) match. Type Scale table, Pairings & Don'ts (with NEVER 3 / NEVER 15 / NEVER 4 / NEVER 17) match. Changelog v0.7 confirms the body-face swap from Inter to Public Sans landed in both. |
| Visual Identity — Color (Canonical · v2 palette) | audited 2026-05-11 | `#color` | 11 tokens (`--purple` / `--purple-mid` / `--purple-deep` / `--purple-darker` / `--lime` / `--lime-deep` / `--orange` / `--orange-deep` / `--cream` / `--white` / `--ink`) confirmed in `tokens.css`. Changelog v0.6 explicitly records the canon-flip alignment. The orange-fill wordmark's lime back-shadow update (2026-05-15) landed in both per changelog v0.7. |
| §14 [REMOVED in audit] | removed | n/a | Skip. Portfolio territory now covered in §1's "What This Position Sacrifices." |
| §15 [REMOVED in audit] | removed | n/a | Skip. Platform-validation tests were a one-time exercise. |

### C. Codex redirects — world canon, delete from brand-bible

| brand-bible section | what it contains | codex destination |
|---|---|---|
| **Appendix — Known Wittyverse Canon** | Organizations (O.O.P.S., NAGs, Ministry of Flatulence, Parking Gods, Special Feces Forces, Wittyverse Patent Office) · Characters (Betty Yeti retired, Dr. W. Yeti PhD = Winston alias) · Products (Child Chucker, Dehydrated Water, Headlight Fluid, Human Cone, Eye Bleach, Gift of Nothing, Computer Antifreeze, Shart Survival Kits, XS Condoms, Bad Parking Cards, Hand Sanitizer) · World Rules (no real-world agencies, magic is mundane, no dystopia, etc.) | **wittyverse-codex** Truths + Entities. Plan-aligned per memory: codex still needs to be populated "based on solving theory." This appendix is the seed material. |
| **§9b Universe-Side Origin (Winston's Discovery)** | Winston as Earth-born treasure-hunter, Himalayas, the cave portal, the dimension named "Wittyverse" after himself ("Witty" nickname → narcissist move), "Yeti" alias chosen for the creature he was hunting, fake PhD credentials, the Willy-Wonka-style warehouse-and-fulfillment layer near the portal staffed by Wittyverse residents | **wittyverse-codex** — Winston Truth / Origin Story. **Preserve the "Storefront Discipline" reminder** (NEVER name NC / Himalayas / cave / portal coordinates / Winston's real surname in customer-facing copy; CAN name Winston / "Dr. W. Yeti PhD" / the Wittyverse) — that's a brand-guidelines rule, not codex content. Port the discipline reminder to `#voice` as a "Voice everywhere. Face nowhere." adjunct. |
| **Appendix — Wittyverse Lexicon: Agencies / Characters / Universe Rules** | Subset of the same world-canon material as above (with slightly different framing — short table format) | **wittyverse-codex** Entities + world Truths. Note the Key Phrases / Deep Canon sub-tables stay (port to `#voice` per §A above). |
| **"Brand Platform — Working Notes" naming patterns** | "Department / Division of [Absurd Function]" / "Yeti [Noun]" / "Dr./Prof./Agent [Name]" / "Bulletin / Report / Advisory / Directive #[Number]" naming methodology + the 7 generic naming rules | Patterns: **wittyverse-codex** Methodologies / Conventions. Generic rules: skip (not load-bearing). |
| **Visual Identity Research & Direction-Setting** (mostly) | 2021 yeti mark / blue-orange-yellow palette / Rubber Vloeren typeface · Palette D (purple #5C27A3 + hot orange + dark ink + clean white + teal #2DB88A) · Four-Font Portal Architecture (Clash Display + General Sans + Space Grotesk + Clash Grotesk) · "Clever Studio" mood direction · Liquid Death / Omega Mart / The Onion aspirational references · Phase 1 anti-direction + perception gap + concept statement | **DELETE — historical Witty Yeti / pre-flip exploration record.** Superseded by the canonical v2 Typography (Lilita One + BSD + Bowlby One + Public Sans + JetBrains Mono) and canonical v2 Color (11-token palette w/ no teal). Some pieces have residual value: Anti-Direction list + the aspirational references (Liquid Death / Omega Mart / The Onion) could land as a short "References" card under `#visual-system` if wanted. Rest is archive-only — leave the markdown in Workspace as historical, do not port. |

### D. Cross-refs to scrub before deletion

Grep on `brand-bible` across `D:/Claude/wittyverse/` finds:

- `brand-guidelines/index.html` — canon-links in `#strategy` and `#customer` point to `../../Workspace/Wittyverse/derived/brand/brand-bible.md` and `../brand-bible/#2-target-customer`. **Update**: drop the cross-section link; keep the Workspace markdown link if treating brand-bible.md as historical archive.
- `brand-guidelines/data/changelog.json` — v0.3, v0.4, v0.6, v0.7 reference "brand bible §1" / "§2" / "§4D Typography" as the source-of-truth that the page was ported from. **Leave alone** — these are historical changelog entries, not live links.
- `index.html` (homepage) — has the brand-bible card (commit `048b7b3`). **Replace** per Step 4 in this plan.
- `brand-one-pager/index.html` — added recently (uncommitted per git status). **Audit** for brand-bible references before deletion.
- `body-face-comparison.html` — uncommitted test artifact. **Audit** but likely safe (font-comparison tool, not brand reference).
- `docs/plans/2026-05-15-wittyverse-landing-v1-design.md` — another in-flight plan. **Audit** for any references that block this cleanup.
- `.playwright-mcp/page-*.yml` — Playwright snapshots. **Ignore** (test artifacts).

### E. Risks & decisions surfaced by this audit

1. **§6 Brand Personality reconciliation needed.** Two layers — abstract brand persona (Wickedly Clever / Unflappably Deadpan / etc.) and Winston-the-operator voice (Showman / Brass-plate confident / etc.) — coexist by intent per post-flip Q1 ("keep abstract"), but only the Winston layer is in `brand-guidelines/#voice` today. Decide where the abstract layer lives before porting §6. Recommended: new `#personality` subsection under `#voice`, above the R1/R2 register grid, so writers see "brand DNA" before "register mechanics."
2. **"Working Notes" decay is heavier than the plan assumed.** The plan's Step 2 table sends Brand Platform Working Notes (blocked) → `#voice` working artifacts. Most of that ~1700-line block is **superseded, not blocked**. Recommend dropping the "working artifacts" bucket from `#voice` and instead extracting only the §11 Messaging Hierarchy table (already counted as a port target). Leaves a cleaner `#voice` section.
3. **Visual Identity Research is mostly archive, not blocked.** Same logic — superseded by canonical Typography + Color sections (which already match brand-guidelines). The plan's Step 2 row sending this to `#visual-system` should be downgraded to "skim for the 5-line References card; otherwise delete."
4. **R1 ban list vs R2 ban list.** The brand-bible has two separate ban-lists (Appendix B = R2 storefront, Voice Codex §5 = R1 in-universe) — they overlap but are NOT identical. Port both, keep them separate, label them clearly in `#voice`. The R1 list is part of the Voice Codex keeper; the R2 list is its own port.
5. **Storefront Discipline rule survives codex redirect.** When deleting §9b (Winston discovery → codex), the "Storefront Discipline" sub-bullet (NEVER name NC / Himalayas / cave / portal / real surname; CAN name Winston / Dr. W. Yeti PhD / Wittyverse) needs to land in `#voice` as a "Voice everywhere. Face nowhere." adjunct rule. Don't lose it in the migration.
6. **Voice Codex's 2026-05-15 §2 rework is the current state, not the prior single-embodied-anchor version.** Per the plan's existing risk note and per the bible's build.js header — preserve the rebuild that drops the single embodied R1 anchor in favor of "unifying R1 DNA + format-specific personas in §7." Easy to regress if porting from an older copy of the markdown.
7. **No drift between `brand-bible.md` (Workspace) and `brand-bible/index.html` (repo) was found** during this audit — the build pipeline is intact. Safe to treat the markdown as the single source for port content.

### F. Step 2 readiness

Net effect: roughly **half a dozen genuine port operations** (§3 + §4 + §5 + §7 + §8 + §10 + Appendix A + R2 Banned Words + Voice Codex Keeper), **two reconcile-then-port decisions** (§6 personality layer, §9 origin scope), **three selective skim-and-drop ports** (§11 messaging hierarchy alone, §12 visual mood only, R2-relevant lexicon entries only), and **two large delete-or-redirect operations** (Known Canon + most of Visual Identity Research). The "Brand Platform Working Notes" middle section largely **vanishes** — it's almost entirely pre-flip and superseded.

Awaiting sign-off before any Step 2 port.

---

## Step 2 Pre-port Decisions (resolved 2026-05-18)

User sign-off received with "proceed with your top recommendation." Decisions locked in below; any divergence flagged for override before execution.

1. **§6 Brand Personality home → new `#personality` subsection inside `#voice`**, placed *above* the R1/R2 register grid. Rationale: writers see "brand DNA" (Wickedly Clever / Unflappably Deadpan / Generous With Joy / Obsessively Crafted / Mischievous Not Malicious) before "register mechanics" — abstract → concrete. Coexists with the existing Winston-the-operator voice block (per post-flip Q1 "keep abstract").
2. **"Brand Platform Working Notes" treatment → drop the "working artifacts" bucket from `#voice` entirely.** Extract only §11 Messaging Hierarchy table. Rest is pre-flip and superseded (per §A delta findings — Quick-Reference Voice Guide, Dial Adjustments by Context, Lead Message by Context, Decision Questions, Discovery Summary, Phase 3 Superprompt, etc.).
3. **Step 3 retirement choice → Option B Redirect** (assistant default, flagged for user override). Replace `brand-bible/index.html` with a single notice page linking `brand-guidelines/` and the codex app. Delete `brand-bible/build.js`. Markdown source at `D:/Claude/Workspace/Wittyverse/derived/brand/brand-bible.md` stays archived. Affects Step 2 cross-ref scrub work: existing `brand-bible/#xxx` anchor links get rewritten to the new brand-guidelines anchor rather than deleted outright.
4. **R1/R2 ban list separation → port both, kept separate and clearly labeled:**
   - R2 storefront ban-list (Appendix B in brand-bible) → `#voice / Banned Words & Phrases (Storefront / R2)`
   - R1 in-universe ban-list (Voice Codex §5) → stays bundled inside the Voice Codex keeper subsection in `#voice`, labeled `Voice Codex / §5 Anti-Voice & Banned Content (In-universe / R1)`
5. **Batch 1 → §3 Competitive Landscape + §4 Mission/Vision + §5 Brand Values**, all to `#strategy` as new subsections. All audited, all independent of remaining unresolved decisions.

### Worktree
Step 2 execution moves to `D:/Claude/wittyverse/.worktrees/brand-docs-cleanup/` on branch `refactor/brand-docs-cleanup`. The main checkout stays for repo admin / plan-doc edits only.

### Pending decisions surfaced by §E that did NOT need resolving for Batch 1
- §9 Origin Narrative split (storefront-side Johnny arc port destination + the "Storefront Discipline" rule survival) — defer to Batch 2 or later.
- §12 Creative Direction Seeds partial-port destination details — defer to Batch 3 (visual system batch).
- Whether `#quick-reference` gains a "Key Decision Filter" card from §0 — defer; cosmetic, not blocking.

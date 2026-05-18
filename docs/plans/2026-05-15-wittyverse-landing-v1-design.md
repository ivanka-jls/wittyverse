# Wittyverse Landing Page — v1 Design

**Date:** 2026-05-15
**Status:** Design approved · ready for implementation plan (writing-plans)
**Source:** Brainstorming conversation 2026-05-15. Built on top of `homepage-wireframe.html` (current state) with brand bible §9b Winston canon and the canon-flip color v0.6 system.

---

## 1. Goal

Ship a single-page launch experience for Wittyverse.com that:
1. Lets cold visitors understand the premise in 3 seconds.
2. Converts gift-buyers into a Best Sellers purchase via Shopify Buy Buttons (or hand-off to Shopify storefront for catalog browsing).
3. Captures email for "The Winston Dispatch" newsletter.
4. Carries the **Depth Stack** — layered "leaks" of the Wittyverse world that reward exploration and return visits.

## 2. Architecture

- **Landing page (`wittyverse.com`)** — hand-coded HTML / CSS / JS, deployed to **Netlify** from the existing GitHub repo. Branch previews on every PR for design iteration.
- **Commerce backend** — Shopify (Witty Yeti store, already exists). Catalog, PDPs, cart, checkout, fulfillment all live there.
- **Bridge** — Shopify **Buy Buttons** embedded on Best Sellers for in-page Quick-Add. "Shop catalog" CTA links to the themed Shopify storefront. Storefront API + custom cart deferred to v2.

## 3. The canon rule that governs the page

**Voice everywhere. Face nowhere.**

- **"Dr. W. Yeti PhD"** (the alias) = always present. Credentials, signature, voice, brass-plate signage. The persona pitches every surface.
- **Winston the man** = never present. No headshot, no clear illustration, no avatar. Real surname, portal location, factory floor — all backstage.
- The **W. signature** is the recurring visual mark. That is the operator's face.
- **Performative secrecy is a brand virtue.** "Location classified · competitive reasons" / "Operator pseudonymous · by necessity" — proud declarations, never apologies.

This rule is now encoded in `brand-bible/index.html` §6, §9, §13 + working notes, and `brand-guidelines/index.html` Voice & Messaging section.

## 4. Voice registers

| Register | Voice | Used on |
|---|---|---|
| **R2** | Dr. W. Yeti PhD speaking — loud, first-person, P.T. Barnum × Ron Popeil × Dr. Bronner's energy | Headlines, CTAs, endorsements, About copy, hero, newsletter, Winston-attributed guarantees |
| **R1** | The operation documenting itself — bureaucratic plural, customs-form deadpan (NOT Winston speaking) | Product cards, shipping details, FAQ answers, compliance microlines, return policy |

The joke lives in the **proximity** — loud Winston *next to* deadpan goods. A product card written in Winston's voice breaks the joke.

## 5. Section list

| # | Section | Notes |
|---|---|---|
| 1 | Marquee strip | Always-on sitewide. ✦ separators, Cycle 247 anchor, Dispatched Tuesdays, free shipping over $40. R1 voice. |
| 2 | Masthead | Wordmark + "Founded, named & operated by Dr. W. Yeti PhD" credential plate · Cycle 247 pill · countdown (**status only** — no dual-duty newsletter hook) · cart icon · drop Search nav item for v1. |
| 3 | Hero | First-person Dr. Yeti headline. **Aggregate rating ★4.8 directly under headline.** Two CTAs: primary "Shop the catalog" w/ risk-reversal microcopy beneath; secondary "See this dispatch." Visual = goods/dock/hands, **never face**. |
| 4 | Browse Grid | **4 tiles, not 6** (paradox of choice for ~10-product launch). Organized by gift situation. |
| 5 | Best Sellers — "Dr. Yeti's Picks This Cycle" | 4 product cards · per-card Winston endorsement microline ("Personal pick. — W.") · Trust Seal Cluster component beside each Quick-Add. Shopify Buy Button wires the Quick-Add. |
| 6 | **NEW: "Winston Answers"** | 4–6 FAQ pairs. **Q in R2 (Dr. Yeti voice), A in R1 (operation deadpan).** Topics: shipping, returns, what arrives, payment trust, what's in the box. |
| 7 | Social Proof — Transmission Feed | Letters *to* Dr. Yeti ("Mr. Yeti —" / "Dr. Yeti —"). Aggregate rating + transmission feed only. **Cut the generic testimonial row** (or fold into feed entries). |
| 8 | At the Counter | Inverted from wireframe: NOT a portrait + bio + cert. Now: the **lol Patent Office cert as canon evidence** (the one piece of paperwork) + brief in-voice bio ("I do not give interviews. I do not pose. I send goods Tuesdays.") + signed-photo-w/-face-obscured-by-stamp if any visual presence needed. |
| 9 | Newsletter — "The Winston Dispatch" | First-person pitch, signed. "Earth-sector email address" field label. |
| 10 | Footer | 4-col link grid + compliance microline. Compliance line now leads with performative secrecy: *"Sole Authorized Importer · Earth Side · Manufacturing partners undisclosed · Location classified · Operator pseudonymous, by necessity · Dispatched Tuesdays from NC."* |
| — | Mobile sticky CTA bar | Sticky bottom on mobile: "Shop the catalog" + aggregate rating compact. Not a section. |
| — | Depth Stack | Sitewide enhancement layer. Layered on after static page ships. |

**Cuts from the wireframe** (over-built for v1):
- §10 standalone ambient leak widget (§6 Transmission Feed is the canonical surface; ambient widget competes).
- Browse Grid 6 → 4 tiles.
- Countdown's triple-duty (timer + status + newsletter hook) → status only.
- Triple social-proof stack in §6 → feed + aggregate rating only.
- "Search" nav item.

## 6. Trust Seal Cluster — reusable component

Recurring component beside every primary CTA (hero CTA, each Quick-Add, Subscribe, Checkout). Treat like a logo lockup: do not reorder, do not substitute, do not isolate a single seal.

Members (in order):
1. **Patent Office lol cert** thumbnail — canon "only paperwork that exists"
2. **Personal Guarantee · W.** — signed stamp
3. **Sole Authorized Importer · Earth** — brass-plate badge
4. **Dispatched Tuesdays · NC** — operational stamp

Placement: right of primary CTA on desktop; beneath on mobile.

## 7. Depth Stack — operating rules

Enhancement layer on top of a working static page. **Not** the design itself.

**Three commitments:**
1. **Static-first.** Page must convert with leaks disabled and `prefers-reduced-motion` honored.
2. **Two-purposes rule.** Every leak does two jobs from {guide-attention, build-emotion, maintain-curiosity, reinforce-premise, reward-return, surface-product}. Delight alone doesn't count.
3. **Cluster leaks in the 50–80% scroll zone** (page narrative climax). Hook section gets at most subtle hover-margin notes. Don't sprinkle evenly — drains attention budget.

**Trigger budget (in priority order):**
- Scroll position (primary)
- Hover (desktop only)
- Return-visit unlocks via localStorage (cap 1–2 new leaks per return)

**Banned triggers:** idle-time, mouse-jiggle, autoplay popups.

**The mystery is the engine.** Every leak is a glimpse of an operator you can't fully see. Users piece Winston together; he never reveals himself directly. This is what makes the rabbit-hole *work*.

**Tone discipline:** "postcards arriving, never spooky." Warm, slightly mysterious, never horror-adjacent.

## 8. Trust signals — the docs-mandated additions

1. **Aggregate rating, promoted above-the-fold** (under hero headline). Format: "★ 4.8 · 2,400 reviews" or real numbers.
2. **Trust microcopy beside every Quick-Add and the hero primary CTA.** E.g., "30-day returns · ships Tuesdays from NC. — W."
3. **§6 "Winston Answers"** — directly addresses the dominant cold-visitor objection ("is this a real store?").
4. **Reaction-buyer guarantee.** "Personally guaranteed. If it doesn't land the joke, I'll refund it myself. — W." — surfaces near Best Sellers + hero.
5. **Mobile sticky CTA bar** — 60%+ of impulse-gift traffic is mobile; CTA gets *more* prominent on mobile, not less.

## 9. Responsive

- **Design mobile-first at 375px.** Hero stacks (visual above text), Browse Grid → 2-col, Best Sellers → 2-col, FAQ stacks. Sticky CTA bar at bottom.
- **Breakpoint at 900px:** desktop layout kicks in. Hero side-by-side, grid 3–4 col.
- **At 1100px+:** full layout.
- `prefers-reduced-motion` is structural: it strips the Depth Stack and reveals the static foundation. If the static-only experience doesn't communicate the brand, the static page is broken — fix that before re-layering leaks.

## 10. Deferred to v2

- Custom cart-on-our-domain (Storefront API). v1 uses Buy Button overlay checkout.
- Wittyverse-side toggle (R1 internet aesthetic). v1 is single-mode.
- Search in masthead nav.
- Full Catalog page on the lander (live on Shopify-themed storefront instead).
- About page detail beyond §7 At-the-Counter.

## 11. Open questions (need user input)

1. **Success metric for v1.** Strategy docs require 2 measurable goals with baselines before design lock. Candidates: newsletter signups/wk, homepage → cart-add conversion %, returning visitor rate. **TODO: user picks 2.**
2. **Voice in Five Traits dial table** (brand bible §6, line 783). Current dials describe a more restrained voice than the new pitchman canon. Decision needed: (a) recalibrate dials (Confident → 9 or 10, Playful → 9, add "Pitchman" trait), or (b) treat dials as a *floor* that Dr. Yeti pushes past in hero/About/newsletter, or (c) split dials into separate R1 and R2 tables.
3. **Brand Voice Codex** (referenced in bible as authoritative for R1) may predate the persona-vs-operation distinction. Decision: parallel update pass, or leave for now.
4. **FAQ Q-voice vs. A-voice direction.** Sample copy commits to **Q in R2, A in R1**. Confirm or invert?

## 12. Sample copy (drafted in guidelines, repeated here for reference)

**Hero headline (R2):**
"I FOUND A DIMENSION. I NAMED IT AFTER ME. THE GOODS ARE LIVE."

**Product description (R1):**
"One unit. Origin: Wittyverse dimension. Classification: novelty consumer good, gift-grade. Dispatched Tuesdays from NC under standard consumer-goods entry. No assembly required. No returns on opened items. No questions answered regarding manufacturing."

**FAQ Q&A (split):**
- Q (Dr. Yeti, R2): *"How fast can you get one of these into a customer's hands? Because I personally hate waiting."*
- A (Operation, R1): "Orders received by Monday 11:59pm ET ship the following Tuesday from North Carolina. Domestic transit: 3–6 business days. Tracking is provided. Tuesdays are the only dispatch window."

**Newsletter pitch (R2):**
*"The Winston Dispatch — one signed letter from me each Tuesday, telling you exactly what cleared the dock, what almost didn't, and what I'd hand to my own brother-in-law. No filler, no algorithm, no committee. Subscribe and you'll never miss a manifest. — W."*

**Trust microcopy beside Quick-Add (R2):**
*"Personally guaranteed. If it doesn't land the joke, I'll refund it myself. — W."*

**Compliance microline, footer (R1):**
"Sole Authorized Importer, Earth Side · Manufacturing partners undisclosed · Location classified, competitive reasons · Operator pseudonymous, by necessity · Dispatched Tuesdays from NC."

## 13. Next step

Hand off to `writing-plans` skill to break this design into ordered implementation tasks (Netlify project setup, section-by-section build, Shopify Buy Button integration, Depth Stack layering, mobile + reduced-motion QA, launch checklist).

Pre-requisite for handoff: user resolves the 4 open questions in §11, OR explicitly punts them to v2 / case-by-case.

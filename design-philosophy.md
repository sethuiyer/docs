# The Design Philosophy

> **One-sentence version:** *We don't have a brand color. We have a brand discipline — tune every surface to what its reader is there to do.*

**Author:** Sethurathienam Iyer, Founder
**Date:** 2026-06-19
**Status:** Working document. Re-read quarterly.

---

## Executive Summary (90-second read)

ShunyaBar runs **five public site surfaces** and **ten shipped projects**, each with its own deployment. People notice. The honest answer to "why don't they all look the same?" is:

> **A customer evaluating a paid API and a scholar reading a 6,000-word essay do not have the same job. They should not get the same page.**

This document is the deliberate read of what we believe, what we share, what we don't share, and where the philosophy breaks. It is not a brand guide. It is a *decision procedure* for the next surface.

The five things we believe:

1. **Restraint earns trust.** Whitespace, generous line-height, no animated hero sections.
2. **Specificity beats decoration.** Real numbers, real names, real failure modes.
3. **Different readers get different surfaces.** A customer, a scholar, a curious visitor, and a recruiter each get the page that fits their task.
4. **The palette is honest about the work.** Navy and teal where the work is technical. Serif and paper where the work is reading. Warm where the work is human.
5. **Typography is the brand.** Everything else is decoration.

What is shared is in [`stylesheets/extra.css`](https://github.com/sethuiyer/sethuiyer.github.com/blob/main/src/stylesheets/extra.css): navy primary (`#183153`), teal accent (`#00796b`), the typographic system, the table treatment, the link behavior. What is *not* shared is everything else — every site chooses its own surface, layout, and reading rhythm.

Where the philosophy breaks: the personal portfolio site is the outlier. It carries a retro social-media palette that does not match the rest. We will fix it. We have not yet fixed it. That is honest.

---

## Why this document exists

Two readers asked the same question, separately, in the last month:

- "Why does navokoj look like an enterprise API page but your personal site looks like a Geocities reunion?"
- "Why does your research site use a serif and your product site use a sans?"

Both readers are correct that the surfaces diverge. Both readers deserve an answer that is not "I haven't gotten around to it." This document is that answer.

The short answer: **the divergence is deliberate.** The surfaces diverge because the readers diverge. A customer evaluating a paid MaxSAT API is not making the same decision as a scholar reading an essay on prime weighting. Putting them on the same page would insult both of them.

The longer answer is below.

---

## The single principle

> **Form follows reader, not form follows brand.**

A brand is a recognizable visual signature across surfaces. We do not have one. We have a *discipline*: each surface answers one question before any other — *what is the reader here to do?* — and the design follows from that answer.

This is not a new idea. It is what good technical writing has always done. A reference manual and a tutorial use different typography, different density, different examples, because they are solving different problems for different readers. We are applying the same logic to the surfaces themselves.

The cost is brand recognizability. If you scroll past three of our sites quickly, you might not realize they come from the same company. We accept that cost. The benefit is that each surface does its actual job, instead of carrying the same shell across readers who are not the same.

---

## What we actually believe

Seven principles, in order of how often they come up in decisions.

### 1. Restraint earns trust

The fastest signal that a page is a landing page is that it has too many things on it. Hero animation. Floating CTA. Stock illustration. Three-color gradient. A "trusted by" row of greyed-out logos we do not actually have permission to use.

We do not do that.

What restraint looks like in practice:

- **Line-height 1.72** in body text. Generous because reading is the task.
- **No underline on links by default.** Underline appears on hover, animated in. The page reads first; the links advertise second.
- **No hero images on product pages.** The product description is the hero. If you need an image to explain what the API does, the copy is not done.
- **Sticky table headers** but no other sticky anything.
- **Box-shadows that earn their place.** A 1px shadow on a table is a depth cue. A drop-shadow on every card is decoration.

Restraint is a forcing function. It says: *if you cannot defend this element against the reader's task, remove it.*

### 2. Specificity beats decoration

Every marketing page in our industry reaches for words like "powerful," "scalable," "next-generation," "AI-native." They mean nothing. They are the visual equivalent of stock photography.

What specificity looks like:

- **Numbers, not adjectives.** "100% solved in 73 seconds" beats "blazing-fast performance." "1.65M clauses in 278s" beats "enterprise scale."
- **Failure modes, not just wins.** The [limitations page](limitations.md) lists where the solver plateaus. That page exists because *trusting a vendor who hides their failure modes is a worse outcome than not using them.*
- **Honest numbers, even ugly ones.** "11% conversion from rate-limited to billed" appears in [the bottleneck audit](marketing/bottleneck.md). Hiding it would feel better for one quarter and worse for every quarter after.
- **Real names of real things.** Engines are called `nano`, `mini`, `pro`, `qstate`, `ensemble`. Not "TurboSolve Pro™." Not "AI-MaxSAT-X." Names you can grep for. Names you can argue with.

A reader who arrives at a page with specific numbers and acknowledged failure modes will trust specific claims. A reader who arrives at "industry-leading" will not.

### 3. Different readers get different surfaces

The five surfaces are tuned to five different reader tasks:

| Reader | Task | Surface |
|---|---|---|
| Customer evaluating a paid API | "Should I trust this with my problem?" | `navokoj.shunyabar.foo` |
| Visitor asking "who is this company?" | "Are these people serious?" | `shunyabar.foo` |
| Scholar reading a 6,000-word essay | "Let me read this carefully." | `research.shunyabar.foo` |
| Curious reader / recruiter | "Who is the person behind this?" | `sethuiyer.github.io` |
| Engineer wanting the technical artifact | "Show me the code and the benchmarks." | Per-project `sethuiyer.github.io/<project>` |

The mistake most one-person companies make is building one site and trying to serve all five readers with it. The result is a site that does nothing well. We chose five narrow sites that each do one thing well.

### 4. The palette is honest about the work

Color is not decoration. Color tells the reader what kind of work is happening on the page.

| Work type | Palette | Why |
|---|---|---|
| Technical / engineering | Deep navy `#183153`, teal accent `#00796b` | Reads as serious, technical, calm. Matches the engineering tone of the API docs. |
| Long-form reading | Warm paper-cream background, charcoal text | Reads as scholarship, not product. The page is for sitting with. |
| Personal / human | Warmer, more saturated, more human-tone | Reads as a person, not a company. Some risk of feeling "off-brand." We accept it. |
| Scholarship / per-project | Project-specific, often green/teal or amber | Each project gets to feel like its own thing. |

The personal site is the deliberate exception. A founder's portfolio is allowed to look like a person, not a company. Trying to make it match the navy-and-teal of the product surfaces would make it feel like a marketing piece about a person, which is the worst of both.

### 5. Typography is the brand

We do not have a logo worth speaking of. We do not have a brand mark. What we have is a typographic system:

- **System fonts** on the documentation sites (fast, accessible, no FOUT).
- **A serif** (Iowan, Charter, or similar fallback chain) on the long-form research essays, where the work is reading.
- **A sans** (system default) on the product surfaces, where the work is scanning.
- **One accent color, used sparingly.** Teal `#00796b` for links, code accents, and active nav state. Nowhere else.
- **Generous line-height.** `1.72` on body. This is the single biggest readability lever, and we never compromise it.
- **Sticky table headers with a hover row-highlight.** So tables are usable, not decorative.

If you remember one thing about ShunyaBar's design after scrolling past three sites quickly, it should be: *the typography feels like someone who respects my time wrote this.*

### 6. The page reads first; the links advertise second

Underlines on links appear on hover, animated in over 200ms. By default, links are bold teal. This is a small choice with a large effect: the page reads as continuous prose, and the links reveal themselves when you need them.

Most marketing pages do the opposite. They underline every link aggressively because the page is a navigation surface. We are writing documents, not building navigation. The reader came to read. The links are there when they want them. Until then, prose.

### 7. Tables are first-class content

In a documentation-heavy site, tables are not decoration. They are the primary medium for comparison, for benchmark data, for pricing, for engine specs. We treat them accordingly:

- **Soft borders** (`1px solid var(--sb-border)`) so the table reads as a single object.
- **Sticky headers** so the column meaning stays visible as you scroll.
- **Hover row-highlight** so the eye can track across rows.
- **Left accent border** on code blocks and KaTeX panels, so they feel embedded rather than pasted in.
- **Responsive:** tables become horizontally scrollable on small screens, with a fade gradient on the right edge so the reader knows there is more.

Tables are where our work lives. They are designed like the work matters.

---

## The surfaces (and what each one is for)

### 1. `navokoj.shunyabar.foo` — Customer evaluation

**Reader's question:** "Should I trust this MaxSAT API with my production problem?"

**What we tune for:**

- **Specificity over fluff.** Real benchmark numbers on the homepage. Real failure modes linked from the homepage.
- **Proof of competence.** The "What customers run it on" section leads with academic benchmarks, then production data, then research breakthroughs. Provenance is explicit.
- **Honest limitations, prominently linked.** Not buried in a footer. Linked from the H2 above the fold.
- **No stock imagery, no animated hero.** A single product description is the hero.

**Palette:** Navy primary, teal accent, paper-near-white background. This is the canonical ShunyaBar surface.

**What it is not:** It is not a marketing brochure. It is a working document that earns the right to be called a product page.

### 2. `shunyabar.foo` — Trust and authority

**Reader's question:** "Who is ShunyaBar Labs, and what do they stand for?"

**What we tune for:**

- **Calm, restrained, authoritative.** The page is the front door of the company. Visitors arrive expecting clarity, not energy.
- **The company line.** Mission, values, the five core projects surfaced, the team page if/when it exists.
- **No upsell.** This is not where you go to sign up. This is where you go to learn what the company is.

**Palette:** Darker, more minimalist, more authority-coded. The light/dark mode toggle is tuned more carefully here because the reader may spend longer on this surface.

### 3. `research.shunyyar.foo` — Long-form reading

**Reader's question:** "Let me sit with this essay for twenty minutes."

**What we tune for:**

- **Reading rhythm.** Serif typography. Wider line measure. No aggressive chrome. The page is paper, not app.
- **Citation density.** Footnotes, references, and bibliography styled like a journal article.
- **No popup, no sticky CTA, no exit intent.** Reading is the task. Interruption is failure.
- **Print-friendly.** If you print this, it should look like a typeset article.

**Palette:** Warm paper background (`#f7f9fc` or warmer), charcoal text, the teal accent used only for links. The site feels like a journal, not a tech company.

### 4. `sethuiyer.github.io` — Personal / human

**Reader's question:** "Who is this person? What have they shipped?"

**What we tune for:**

- **Personal voice.** First person, present tense, named projects with the dates they shipped.
- **Warmth over formality.** This is allowed to feel like a person because it is a person.
- **The portfolio is a project list with receipts.** Every claim links to a shipped artifact.

**Palette:** Warmer, more saturated, more human-tone. *This is the outlier and we know it.* It uses a retro social-media palette (deeper pinks, sunset oranges) that does not match the rest of the surfaces. We are keeping it deliberate but inconsistent, because making it match the navy-and-teal product surfaces would make it feel like a brochure about a person.

**Where the philosophy breaks:** right here. We have not yet reconciled the personal site with the company surfaces. We will. The honest version is: it's a known tension, not a finished decision.

### 5. Per-project GitHub Pages — Scholarship

**Reader's question:** "Show me the code and the benchmarks."

**What we tune for:**

- **Code first.** Repository link in the H1. README excerpt above the fold. Quick start within one scroll.
- **Benchmark table is the spine.** Each per-project site has a "results" table that is the page.
- **A short essay, not a marketing page.** 600–1,200 words explaining the project, then the artifact.

**Palette:** Project-specific. NitroSAT is amber-on-dark. Multiplicative-PINN is teal-on-paper. [Authorization Lattice](projects/authorization-lattice.md) is graphite. Each project gets to feel like its own thing. This is not incoherence — it is the discipline applied: each project's reader task is different, so each project's surface is different.

---

## The shared tokens (the only place we have a "brand")

If you want to see what is actually shared across the surfaces, the answer is in one file: [`stylesheets/extra.css`](https://github.com/sethuiyer/sethuiyer.github.com/blob/main/src/stylesheets/extra.css).

What is shared:

| Token | Value | Where it shows up |
|---|---|---|
| Primary foreground (header) | `#183153` navy | Header bar, active nav, footer |
| Accent | `#00796b` teal | Links, code left-border, active nav marker |
| Background (light) | `#f7f9fc` paper-near-white | All light-mode surfaces |
| Heading color | `#10243f` deep navy | All `h1`–`h4` |
| Link color | `#006d77` deep teal | All body links |
| Code background | `#eef3f7` soft grey-blue | All inline code, code blocks |
| Border | `#d8e2ea` soft blue-grey | All table borders, code borders |
| Type scale | 0.86rem body, 1.72 line-height | All documentation surfaces |
| Table style | sticky header, hover row-highlight, soft border | All benchmark/pricing/spec tables |
| Link behavior | no underline by default, animated underline on hover | All surfaces |

What is *not* shared:

- The serif/sans choice (reading vs. scanning)
- The layout grid (one-column reading vs. multi-column dashboard)
- The dark-mode treatment (paper-on-ink vs. ink-on-paper)
- Imagery (zero across all surfaces, by policy)
- Animation (effectively zero — only the link underline transition)

The shared tokens earn their place by being small. We are not exporting a 4,000-line design system. We are exporting twelve CSS variables and a typographic baseline. Anything beyond that should be defended per-surface.

---

## Where the philosophy breaks

A philosophy that does not name its failures is not a philosophy. It is a slogan. Here are the places the discipline is not yet winning.

### 1. The personal portfolio site is the outlier

It uses a retro social-media palette (deeper pinks, sunset oranges, a different typographic system). It does not match the navy-and-teal of the product surfaces. We have decided to keep the difference for now — a founder's portfolio is allowed to feel like a person — but we have *not* yet reconciled the visual gap. The honest version: the portfolio site is allowed to be different because it serves a different reader, but it should still feel like the same *hand* wrote it. Right now it does not.

**Action:** Re-tokenize the portfolio's color system to share the navy-and-teal foundation with the company surfaces, while keeping its warmer typography and personal-voice layout. Target: Q3 2026.

### 2. The product surface has no dashboard yet

The bottleneck audit showed that frontend users convert at 52% while API users convert at 11%. The site is a brochure, not a product surface. We do not yet have an in-page account dashboard, quota visualization, recent-solves table, or success-rate chart. The reader who arrives at navokoj.shunyabar.foo and clicks "Sign up" leaves the surface entirely and lands in Supabase. That is a conversion architecture problem, and it has a design consequence: *the product surface is not yet designed to retain the reader.* The bottleneck doc names the 90-day plan.

**Action:** Build the in-page account dashboard on navokoj.shunyabar.foo before the next check-in.

### 3. The chat is broken 28% of the time

The chat widget has a 28% error rate in production. It is broken enough that it should not be on the page at all. Either it gets rebuilt against the actual `/v1/solve` API, or it gets removed. Half a broken feature is worse than no feature. This is a design failure *because* the design made a promise the engineering could not keep.

**Action:** Decide before Q3.

### 4. The shared tokens are not documented as a system

`extra.css` is the only shared design file, and it has no prose documentation. If a new contributor opened the file cold, they would not know which tokens are deliberate and which are accidents. The fact that this document exists is the first step. The next step is annotating `extra.css` itself with comments explaining the intent behind each token.

**Action:** Annotate `extra.css` with intent comments before adding the next surface.

---

## What this is NOT

To be unambiguous:

- **This is not a brand guide.** We do not have a brand. We have a discipline.
- **This is not a design system.** There is no Figma library, no Storybook, no token export pipeline. There is a 455-line CSS file.
- **This is not a marketing style guide.** Marketing pages inherit the principles above, but each marketing surface is allowed to make its own decisions within them.
- **This is not a promise of consistency across all surfaces.** It is a promise that *every surface answers the reader's question deliberately.* Sometimes the answer is "make this feel like the rest of the company." Sometimes the answer is "make this feel like its own thing." Both are allowed.
- **This is not a finished document.** It is a working draft. We re-read it quarterly. If a principle stops earning its place, we remove it.

---

## How to apply this when adding a new surface

A decision procedure, in order:

1. **Who is the reader?** Name one reader, not a segment. "An ops engineer evaluating our hospital scheduling use case" beats "enterprise buyers."
2. **What is the reader here to do?** One sentence. "Read a 6,000-word essay and decide if the math holds up." "Compare three pricing tiers and pick one." "Sign up and run a test solve."
3. **What does the reader need to see in the first scroll?** Three things, no more. If you cannot defend a fourth, remove it.
4. **Which existing surface is the closest cousin?** Reuse its tokens and typographic decisions unless the reader's task is genuinely different.
5. **What is the failure mode of this surface?** Name it before you ship. "If the reader scrolls past the second paragraph, the page has failed." "If the reader leaves without finding the pricing table, the page has failed."
6. **Will the design defend the reader's task?** If an element does not defend the task, remove it.
7. **Will the design make a promise the engineering cannot keep?** If yes, do not ship it. The chat widget taught us this.

If, after answering those questions, the surface looks like one of the existing five, that is fine. If it looks different, that is also fine. Either way, *the difference must be defensible against the reader's task, not against visual brand consistency.*

---

## Change log

| Date | Change |
|---|---|
| 2026-06-19 | First version. Seven named principles, five-surface map, shared tokens, named failure modes. |
| _next review_ | _Q3 2026. Re-read after the portfolio site re-tokenization and the in-page dashboard ship. Add or remove principles based on what the data and the surfaces show._ |

---

*Authored by Sethurathienam Iyer, Founder, ShunyaBar Labs*
*Published 2026-06-19*

---

## See Also

- [Limitations](limitations.md) — honest failure modes (a principle we extend to design)
- [The Bottleneck](marketing/bottleneck.md) — funnel audit showing where design meets conversion
- [Glossary](glossary.md) — terms referenced across surfaces
- [The Arithmetic Manifold](core-vision.md) — what we're building
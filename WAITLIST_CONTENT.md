# tappd in — waitlist site content + build spec

> Single source of truth for the pre-launch waitlist site. Paste this into the builder.
> Everything inside `copy:` blocks is final website text. Ship it as written.
> App launches in ~20 days. Goal of this site: capture emails, prove demand, count how many people we can pull in month one.
> Voice law (from brandbook.md §9): lowercase everywhere except UPPERCASE micro-labels. NO em dashes, NO en dashes, anywhere, ever. Use periods, commas, parentheses, or "to" for ranges. Specific, confident, warm. No hype, no "crush it", no "journey".

---

## 0. what we are building (read first)

A one-page, scroll-driven waitlist site. Not a full marketing site. One job: a visitor lands, falls for the look in 3 seconds, scrolls through 4 killer features with a phone that animates as they go, sees a price that feels like theft, and drops their email.

Success = email captured. Secondary = they pick monthly vs yearly intent (free signal on what converts).

The whole thing has to look hand-built, not generated. The bar: screenshot any section, post it with no caption, and people should wonder what app it is. If it looks like every other SaaS landing page, it failed.

Stack already in place (`tlanding/`): TanStack Start + React 19, Tailwind v4, GSAP (ScrollTrigger), Framer Motion, shadcn/ui, lucide-react, a `waitlist.db` SQLite file for storing signups. Build with what is already installed.

---

## 1. brand quick-reference (the look)

Pulled from `brandbook.md`. This is "refined neo-brutalism", VOLT palette. Keep the attitude, drop the hostility.

### colors (VOLT)
| token | hex | role |
|---|---|---|
| background | `#F2ECDE` | bone cream (the page) |
| ink (foreground) | `#111111` | all text, ALL borders, ALL shadows |
| card | `#FBF7EC` | raised surfaces |
| cobalt (primary) | `#2B3AFF` | the ONLY cta color, active states |
| acid yellow (pop) | `#E8FF00` | the rare pop. reveals, marker-strokes, the price. text on it is always `#111111` |
| alert red | `#FF3B2F` | the strikethrough on "what other apps tell you" |
| muted taupe | `#4A453B` | secondary text |

Optional dark sections: navy-black `#0D0F1C` ground with cream `#F2ECDE` text and borders. Use sparingly for one or two "instrument panel" sections (the science one is a good candidate).

Rules: 80% of every screen is ink + cream. 2 to 3 bold colors max per section. Cobalt is the only button color. Yellow is an event, not a fill. No gradients. No blur. No frosted glass. Warm cream, not white. Warm ink `#111`, not pure black.

### type
- headings: **Bricolage Grotesque**, weight 700, lowercase, tight tracking (-0.5 to -1), NEVER italic.
- body / ui: **Hanken Grotesk**, 500 default, 400 for long paragraphs.
- buttons: Hanken Grotesk 700.
- micro-labels (eyebrows, tags): **Geist Mono**, 600, UPPERCASE, +1 letter-spacing.
- every number (prices, macros, stats, %): **Geist Mono**. always. this is the "we did the math" signal.
- scale: `11 · 12 · 14 · 16 · 18 · 24 · 32 · 52` and bigger for hero. big jumps, nothing in between.

### shape + depth
- borders: `3px` solid ink. on everything structural.
- radius: `10px` small (buttons, chips), `14px` cards, `100px` pills/badges. nested corners must be concentric (inner radius < outer).
- shadow: SOLID offset block, ZERO blur. ink colored. offset = importance. `8px` for the one hero element per section, `5px` standard cards, `3px` chips. exactly one `8px` shadow per section.
- press = the face slides into the shadow and the shadow vanishes. do this on every button.

### the one loud thing
Each section has exactly one loudest element (biggest shadow, boldest type, the accent). Everything else steps down. Pick it before styling.

### the deliberate deviation
One intentional rule-break per section so it reads human, not machine. A yellow marker-stroke under a heading. A number that runs oversized into the margin. One. Not five.

### motion
- entrances: 200 to 320ms, ease-out.
- tactile/playful: spring `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- the reveal count-up: ~800ms ease-out cubic.
- duration scales with distance. a chip is faster than a card.
- respect reduce-motion: skip to final state.

---

## 2. the page, section by section

Order matters. This is the scroll narrative: hook, problem, the 4 pillars, everything else we pack in, price, last call.

### nav (sticky, thin)
- left: wordmark `tappd in` with the cobalt dot after it (matches app).
- right: one ghost link `features`, one cobalt button `join waitlist` (scrolls to capture).
- on scroll past hero, nav gets a `3px` bottom border and the cream background goes solid.

copy:
- button: `join the waitlist`

---

### SECTION 1 — HERO (the hook + the phone)

Layout: left column = words, right column = the phone. On desktop side by side. On mobile the phone sits under the headline.

The phone shows our reveal screenshot (the screen where a struck-through generic number sits above our real, lower calorie target). Drop that screenshot at `/public/hero-reveal.png`. The phone is a thick brutalist frame: `3px` ink border, `14px` radius, `8px` ink offset shadow. This is the one loud thing of the hero.

copy:
- eyebrow (geist mono, uppercase): `EVIDENCE-FIRST FITNESS OS`
- headline (huge bricolage, lowercase): `the fitness app that shows its work.`
  - put `shows its work` inside a yellow brutalist box (the marker move from the app welcome screen).
- subhead (hanken, taupe): `most apps inflate your numbers to keep you happy. we calculate the real ones and cite the study for every single one.`
- primary cta (cobalt button): `join the waitlist`
- secondary line under cta (small): `20% off locked in for everyone who joins before launch.`
- trust micro-line (geist mono, tiny): `NO SPAM. ONE EMAIL AT LAUNCH.`

scroll animation (GSAP ScrollTrigger): the phone is pinned briefly as the user starts to scroll. As they scroll, the phone screen cross-fades through 3 to 4 app screenshots (reveal -> daily tracker -> meal scan -> workout dashboard). The frame stays put, only the inner screen swaps with a quick ease. The headline and subhead fade up and slightly out as the phone takes over. This is the "stuff changes as the phone moves" moment the founder wants. Keep it buttery, 60fps, and kill it for reduce-motion (just show the reveal screenshot static).

---

### SECTION 2 — THE PROBLEM (earn the rest)

A short, punchy "why every other app fails you" beat. Sets up why our accuracy matters. Dark navy section is allowed here for contrast.

copy:
- eyebrow: `THE PROBLEM`
- headline: `every tracker lies to you on day one.`
- body: `they hand you a maintenance number from a generic formula, assume you walk way more than you do, and never count the oil your food was cooked in. you eat to that number, the scale does not move, and you blame yourself. it was the math.`
- three stat cards (geist mono numbers, the loud row):
  - `4 apps` / `replaced by one. tracker, workout, coach, science library.`
  - `0 sources` / `cited by the apps you use now. we cite all of them.`
  - `~300 kcal` / `of cooking oil a day that goes untracked in most logs.`

---

### SECTION 3 — PILLAR 1: ACCURATE MAINTENANCE (the foundation)

This is the most important section. If the maintenance number is right, everything downstream works. Lead with it.

copy:
- eyebrow: `PILLAR 01 / THE NUMBER`
- headline: `we nail your maintenance. everyone else guesses.`
- body: `your calorie target is the foundation. get it wrong and your deficit, your macros, your progress, all of it is built on sand. we do not use lazy harris-benedict multipliers that assume you are active. we score your actual movement.`
- the NEAT explainer (this is our moat, show the machinery):
  - sub-head: `NEAT scoring, 0 to 100`
  - body: `we score your real daily movement from your steps, your sitting hours, your job type, and your cardio. desk worker who sits 10 hours and walks 3000 steps? we know your burn is lower than the apps assume, and we stop you from eating 400 phantom calories a day.`
  - show the multiplier ladder as a small brutalist table (geist mono):
    - `ULTRA LOW NEAT` -> `1.2x` -> `desk job, under 3k steps, sits 10h+`
    - `LOW NEAT` -> `1.3x` -> `mostly seated, limited steps`
    - `MODERATE NEAT` -> `1.45x` -> `decent daily movement`
    - `ACTIVE` -> `1.6x` -> `lots of steps, trains often`
    - `VERY ACTIVE` -> `1.75x` -> `manual labor plus training`
- the proof line (yellow "why?" chip): `built on mifflin-st jeor + a custom NEAT engine calibrated for low-movement lifestyles. tap any number in the app to read the study.`
- micro-tag: `MIFFLIN-ST JEOR · NEAT-SCORED · CONSERVATIVE BY DESIGN`

animation note: re-create the reveal here in web. a generic number (geist mono) sits full opacity, a red strike draws across it (220ms), it fades to muted, then the real lower number counts up inside a yellow `8px`-shadow box (~800ms). this is our signature moment, it has to live on the site too.

---

### SECTION 4 — PILLAR 2: NUTRITION TRACKING (four ways to log)

copy:
- eyebrow: `PILLAR 02 / FUEL`
- headline: `log a meal four ways. none of them are annoying.`
- body: `most apps give you one clunky search box. we give you four ways in, so logging never becomes the reason you quit.`
- the four logging methods (2x2 grid of brutalist cards, each with a lucide icon):
  1. `AI photo scan` (icon: camera): `snap your plate. gemini vision reads the dish and returns editable weights and portions. it never sneaks in oil, it flags it so you confirm.`
  2. `barcode scan` (icon: scan-barcode): `point at any packaged product. we match it locally first, then open food facts. done in a second.`
  3. `manual search` (icon: search): `a real database. desi staples (ifct 2017), usda whole foods, packaged brands, restaurant chains. debounced search, your last 30 foods one tap away.`
  4. `coach chat` (icon: message-circle): `just tell the coach what you ate. it logs it for you, confirms the weights, done.`
- the oil moat (its own highlighted strip, oil-orange accent, this is unfair advantage #1):
  - tag: `MANDATORY OIL CHECK`
  - line: `cooked food? we make you log the ghee, butter, or oil it was cooked in. it is the single biggest source of calories nobody counts. no other app forces this. we never auto-log it, you confirm it.`
- the depth strip (micros + more, show we go deeper than calories):
  - sub-head: `we count what the others ignore`
  - mini list (geist mono labels): `IRON · CALCIUM · B12 · VIT D · ZINC · FIBRE · SODIUM · MAGNESIUM · POTASSIUM · OMEGA-3`
  - body: `rolling 7-day micronutrient averages against ICMR and global RDA targets, so chronic gaps actually surface. plus supplement reminders, carb cycling (high, medium, low days that auto-shift on your training days), and a full hydration target.`
- proof line (yellow "why?" chip): `every macro and micro target maps to a cited study.`

---

### SECTION 5 — PILLAR 3: WORKOUT GENERATION (built for your life)

copy:
- eyebrow: `PILLAR 03 / TRAIN`
- headline: `a workout built around your week, not a template.`
- body: `tell us your experience, how many days you can train, how long each session, what equipment you actually have, and how hard you want to push. we generate a science-based split that fits, every exercise carrying its own rationale.`
- the inputs we respect (small chip row): `EXPERIENCE · DAYS PER WEEK · TIME PER SESSION · EQUIPMENT · INTENSITY · INJURIES`
- how it is built (2 steps, brutalist):
  1. `evidence-based skeleton`: `we build the split (push-pull-legs, upper-lower, full body, or fully custom) with volume targeted to the scientific hypertrophy sweet spot, 12 to 20 sets per muscle per week.`
  2. `mapped to a real exercise db`: `~200 curated compound and isolation movements, each with cues, target reps, RIR, rest timers, and the muscles it actually hits. no random youtube picks.`
- the weak-point engine (the standout, this is data nobody else shows):
  - sub-head: `sets per muscle: see exactly where you are lagging`
  - body: `we track your weekly volume per muscle group using fractional-volume math (primary movers count full, secondary count half). color-coded bars tell you the truth.`
  - the status bands (brutalist bar legend, color coded):
    - `UNDER 10 SETS` -> red -> `lagging. under-trained.`
    - `10 to 11` -> taupe -> `low. getting there.`
    - `12 to 20` -> cobalt/green -> `dialed. the growth sweet spot.`
    - `OVER 22` -> grey -> `junk volume. diminishing returns.`
  - line: `then it auto-suggests 2 to 3 exercises for whatever muscle you are neglecting most.`
- proof line (yellow "why?" chip): `volume targets cite schoenfeld et al. 2017.`

---

### SECTION 6 — PILLAR 4: THE LOGGER (generate, then log it right there)

copy:
- eyebrow: `PILLAR 04 / LOG`
- headline: `generated the workout. now log it in the same place.`
- body: `no switching apps. the plan you generated becomes the session you log. tap start, and every set is right there.`
- what the logger holds (feature chips / small cards):
  - `set-by-set logging`: `weight, reps, and RIR per set.`
  - `automatic PR tracking`: `every lift is matched to the exercise db, so personal records track themselves.`
  - `rest timers + tempo`: `built into every exercise.`
  - `crash recovery`: `close the app mid-session and your active workout is still there when you come back.`
  - `instant dashboard`: `weekly session strip, streaks, and your sets-per-muscle update the second you finish.`
- line: `every set you log feeds the volume engine in pillar 3. the loop closes.`

---

### SECTION 7 — THE COACH (the thing that ties it together)

This is the "shows its work" payoff. Worth its own section because it is the differentiator.

copy:
- eyebrow: `THE COACH`
- headline: `ask anything. it answers with the study attached.`
- body: `the coach already knows your numbers. your maintenance, your macros today, what you ate, how your last workout felt, your weak muscles, your diet prefs, the oil you logged. so the advice is about you, not a generic blog post.`
- the killer line (big, this is the brand): `even a basic question gets a real citation. it will not spit bro science at you. ever.`
- example exchange (show a brutalist chat bubble pair):
  - user bubble: `is 1.8g of protein per kg enough to build muscle?`
  - coach bubble (with a yellow "why?" / citation chip below it): `yes. past ~1.6g/kg the extra protein does almost nothing for muscle growth. 1.8 gives you a safe buffer. [morton et al. 2018, br j sports med]`
- mini feature row: `LOGS MEALS FOR YOU · DROPS WORKOUTS INTO YOUR PLAN · FULL CROSS-APP CONTEXT · NO EM-DASH ROBOT TALK`

---

### SECTION 8 — THE SCIENCE LIBRARY (proof, not vibes)

Good candidate for the dark navy "instrument panel" treatment.

copy:
- eyebrow: `SHOWS ITS WORK`
- headline: `a citation behind every claim.`
- body: `tap any number, any target, any recommendation in the app and a card opens: the claim, a plain-english explanation, a confidence rating (high, moderate, emerging), and the real peer-reviewed source with a DOI you can open. this is the whole point.`
- stat strip (geist mono): `PROTEIN · ENERGY BALANCE · NEAT · TRAINING VOLUME · MICRONUTRIENTS · SLEEP · RECOVERY · SUPPLEMENTS`
- line: `positioning, said plainly: stop trusting bro science. start being evidence-based.`

---

### SECTION 9 — EVERYTHING ELSE (the "all this for that price?" grid)

A dense grid of smaller features so the value feels absurd before they see the price. Small brutalist cards, lucide icons, tight copy. This section does the heavy lifting on "crazy for the price".

copy:
- eyebrow: `AND ALSO`
- headline: `the stuff four separate apps would charge you for.`
- grid items (one line each):
  - `offline-first`: `logs work with no signal. syncs when you are back.`
  - `voice logging`: `say what you ate, it parses it.`
  - `carb cycling`: `high, medium, low days that auto-shift on training days.`
  - `supplement reminders`: `never miss your creatine.`
  - `hydration targets`: `a real water goal, tracked.`
  - `bodyweight trends`: `time-series weight that feeds an adaptive TDEE.`
  - `recipe community`: `share and pull real recipes with real macros.`
  - `streaks + weekly strip`: `consistency you can see.`
  - `200+ exercise db`: `cues, RIR, rest, muscles, all built in.`
  - `desi + global foods`: `ifct 2017 staples and usda whole foods in one search.`
  - `instant screens`: `no loading spinners. everything renders populated.`
  - `your data, isolated`: `row-level security. nobody sees your logs but you.`

---

### SECTION 10 — PRICING (the founder offer)

This is the conversion beat. Make the price feel like a steal and the discount feel scarce (launch in 20 days, lock it now). Two plan cards, yearly is the hero (loudest, `8px` shadow, yellow "best value" pill). Show the strikethrough on the old price (red strike, brand-consistent).

copy:
- eyebrow: `FOUNDER PRICING`
- headline: `lock 20% off before we launch.`
- subhead: `join the waitlist now and your discount is locked for launch day. prices go up after.`

- plan card A — MONTHLY:
  - label: `monthly`
  - old price (struck through, red): `$10/mo`
  - price (huge geist mono): `$8.99` / `per month`
  - line: `cancel anytime.`
  - cta (ghost/secondary): `join for monthly`

- plan card B — YEARLY (the hero card):
  - pill (yellow): `BEST VALUE`
  - label: `yearly`
  - old price (struck through, red): `$59.99/yr`
  - price (huge geist mono): `$47.99` / `per year`
  - the hook line (geist mono, bold): `works out to $3.99/mo.`
  - line: `20% off, locked for launch.`
  - cta (cobalt, the loud button): `join for yearly`

- under both: `everything is included in both plans. no tiers, no upsells, no "pro" trap. one price, the whole app.`

note for builder: the plan a vs plan b choice should be captured with the email (a simple radio or "which plan are you eyeing" toggle). this is free intent data. default selection = yearly.

---

### SECTION 11 — WAITLIST CAPTURE (the whole point)

The main email form. Big, brutalist, impossible to miss. Yellow accent on the box. This anchors the bottom of the page and the nav button scrolls here.

copy:
- eyebrow: `LAUNCHING IN ~20 DAYS`
- headline: `get in before the price goes up.`
- subhead: `drop your email. you get one message on launch day with your founder discount and a download link. that is it.`
- input placeholder: `you@email.com`
- plan toggle (optional, above or beside): `monthly` / `yearly` (default yearly)
- submit button (cobalt, big, press-into-shadow): `lock my 20% off`
- success state (replace form with a yellow brutalist card): `you are in. check your inbox on launch day. tell a friend who still trusts myfitnesspal.`
- trust line under form (geist mono, tiny): `NO SPAM. NO SHARING YOUR EMAIL. ONE LAUNCH EMAIL.`
- live counter (optional but strong, geist mono): `[N] people already in line.` (pull a count from waitlist.db. only show it once it is a number worth showing, e.g. past 50.)

---

### SECTION 12 — FAQ

Short, brutalist accordion (shadcn accordion is already installed). Lowercase questions.

copy:
- `is it really evidence-based or is that marketing?` -> `every nutrition and training claim in the app maps to a citation card with a real DOI you can open. it is the core feature, not a tagline.`
- `do i need an account to start?` -> `you can set up and see your real numbers in about 2 minutes with no account. accounts are for syncing across devices.`
- `what makes your calorie number different?` -> `we score your actual daily movement (NEAT) instead of using a generic activity multiplier. for desk workers that is usually 300 to 400 calories lower, and that gap is why other apps stall you.`
- `android or ios?` -> `android first, at launch. ios after.`
- `what does the discount actually lock?` -> `join before launch and you keep 20% off ($8.99/mo or $47.99/yr) at launch. after launch the price goes to full.`
- `will my email get spammed?` -> `no. one email, on launch day. then you decide.`

---

### FOOTER
- wordmark + cobalt dot.
- one line: `tappd in. the fitness app that shows its work.`
- small links: `privacy` · `contact`.
- geist mono micro-line: `BUILT EVIDENCE-FIRST. 2026.`

---

## 3. waitlist mechanics (how to make it actually convert)

Research-backed patterns to build in. These are what separates a waitlist that gets 50 emails from one that gets thousands.

1. **single clear action.** one ask: the email. do not bury it under signup fields. email + optional plan toggle, nothing else. every extra field drops conversion.
2. **reduce risk in writing.** "one email on launch day, no spam" next to the button kills the #1 hesitation. we say it twice (hero + capture).
3. **scarcity that is true.** the 20% founder discount expiring at launch is real scarcity. lean on it. "~20 days", "price goes up after". do not fake-countdown if it is not real, but a real launch-day deadline is fair game.
4. **social proof / live counter.** "[N] people already in line" pulled from waitlist.db. only show once the number is respectable. a climbing number is the strongest nudge there is.
5. **show the product, do not just describe it.** the animated phone is the conversion engine. people join waitlists for things they can already picture using. the screenshots do more than any paragraph.
6. **capture intent for free.** the monthly vs yearly toggle tells us what people want to pay before we have charged anyone. default to yearly (anchors higher value).
7. **shareable success state.** after signup, give them a reason and a line to share ("tell a friend who still trusts myfitnesspal"). optionally a referral nudge later.
8. **one offer, no tiers.** decision fatigue kills waitlists. one product, two billing periods, done.
9. **mobile-first.** most of this traffic is a phone. the side-by-side hero stacks, the phone goes full width, buttons are thumb-sized. test the form on a real phone.
10. **speed.** the page has to load fast and the GSAP has to hold 60fps or the "premium" illusion breaks. lazy-load screenshots below the fold.

### what we are measuring (the validation goal)
- total emails captured (the headline number).
- monthly vs yearly split (pricing intent).
- scroll depth (did they reach pricing? where do they drop?).
- cta click vs submit (form friction).

---

## 4. GSAP / scroll animation spec

The phone is the star. Everything else is restrained entrances.

- **hero phone (the signature):** pin the phone for a short scroll distance with `ScrollTrigger`. as the user scrolls through the pin, cross-fade the inner screen through the sequence: `reveal -> daily tracker -> meal scan -> workout dashboard`. frame stays fixed, only the screen swaps. tie screen index to scroll progress. unpin and let it scroll away naturally.
- **the reveal recreation (pillar 1):** trigger when the section enters viewport. generic number full opacity, red strike draws left to right (220ms), number fades to muted, real number counts up in the yellow `8px`-shadow box (~800ms, ease-out cubic). fire once.
- **section entrances:** headings and cards fade up 16 to 24px on enter, ease-out, 200 to 320ms. stagger cards ~60ms apart (sequence reads more crafted than simultaneous).
- **stat numbers:** count up from 0 when they scroll into view (geist mono).
- **the sets-per-muscle bars:** animate width from 0 to value on enter, color per band.
- **buttons:** press-into-shadow on click (face translates by the shadow offset, shadow vanishes), spring easing `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- **nav:** background goes solid + `3px` bottom border once scrolled past hero.
- **reduce-motion:** detect it and skip every animation to its final state. static reveal screenshot, no count-ups, no pin. non-negotiable for accessibility.

performance: use GSAP for the scroll-pinned phone (ScrollTrigger is built for this), Framer Motion is fine for simple component entrances. do not animate layout-shifting properties, stick to transform and opacity. lazy-load the screenshot assets.

---

## 5. assets needed (drop these in `/public`)
- `hero-reveal.png` — the screenshot of the reveal screen (struck generic number above the real lower target). THE hero asset.
- `screen-tracker.png` — daily tracker home (macro summary, micro panel).
- `screen-scan.png` — the AI meal scan / confirm screen (orange ui).
- `screen-workout.png` — workout dashboard (sets per muscle bars).
- `screen-coach.png` — a coach chat with a visible citation chip.
- `logo.svg` / wordmark — already have `logosvg.svg` in the dir.
- fonts: Bricolage Grotesque, Hanken Grotesk, Geist Mono (self-host or via font service).

---

## 6. copy bank (grab-and-go, all on-voice)

taglines (pick the hero, reuse others as section seasoning):
- `the fitness app that shows its work.`
- `stop trusting bro science.`
- `every number cites a study.`
- `most apps inflate your numbers. we calculate the real ones.`
- `four apps. one price. all of it cited.`

button labels:
- `join the waitlist`
- `lock my 20% off`
- `join for yearly`
- `join for monthly`

micro-labels (geist mono, uppercase):
- `EVIDENCE-FIRST FITNESS OS`
- `LAUNCHING IN ~20 DAYS`
- `NO SPAM. ONE EMAIL AT LAUNCH.`
- `FOUNDER PRICING`

hard rules when writing any new copy:
- lowercase, except UPPERCASE micro-labels.
- zero em dashes, zero en dashes. periods, commas, parentheses, or "to" for ranges.
- numbers in geist mono, always.
- specific over generic. "300 to 400 calories lower" beats "more accurate".
- no "journey", no "crush it", no exclamation spam, no preaching.
</content>
</invoke>

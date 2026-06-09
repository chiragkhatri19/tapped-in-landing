# tappd in — waitlist go-to-market playbook

> How to launch and market the waitlist at `https://tappedin.site` without getting banned, and actually get validation.
> Built from current (2026) research on waitlist conversion + Reddit self-promotion rules. Sources at the bottom.

---

## 0. the one thing to understand first

Reddit will shadowban a new account that drops links in 5 subreddits on day one. It is nearly impossible to appeal. The entire strategy below is built around **not** doing that. Slow and value-first beats fast and banned. You have ~20 days, that is enough if you start the account warm-up now.

Your unfair advantage on Reddit specifically: fitness Reddit **hates** bro science and inflated MyFitnessPal numbers. Your whole product is "we cite the study and we do not inflate your TDEE." That is not a forced pitch on these subs, it is exactly what they argue about every day. Lead with the science, not the app.

---

## 1. is the website marketing it right? (honest read)

**Verdict: the depth is correct, do not cut it.** This is an evidence product for an audience that rewards rigor. A barebones page would undersell a thing that replaces four apps. The research says "less is more" about the **signup form**, not about the storytelling. So:

### keep
- Email-only capture (one field). This is the single biggest conversion lever and you already have it.
- The hero reveal (struck 2,400 -> real 2,050). Outcome-driven, instant, on-brand.
- The feature depth lower down. Reddit fitness folks will scroll and respect it.

### fix before you drive traffic (in priority order)
1. **Open Graph preview image.** This is the #1 thing right now. When you paste `tappedin.site` into Reddit or X, the unfurled card (image + title) is what people actually see and click. You have `og:title` and `og:description` but **no `og:image`**. Build one 1200x630 image: the wordmark, the tagline "the fitness app that shows its work", and the reveal screenshot. Without it your link looks broken and CTR tanks. Highest ROI thing you can do today.
2. **The live counter at "14 joined" is weak social proof.** Research is explicit: use a real counter or none, never a fake one (good, you removed the fake 14,300). But showing "14" actively hurts. Two options:
   - Hide the counter until it crosses ~50 to 100, then show it.
   - Or reframe from a count to scarcity: "first 500 get founder pricing locked" with a slot counter that counts **down**. Scarcity reads stronger than a small headcount.
3. **Mobile pass.** 83% of waitlist traffic is mobile, and Reddit/X traffic is almost entirely mobile. Your pinned scroll-lock animations are the riskiest thing on small screens. Test the whole scroll on a real phone before you post anywhere. If a pin feels janky on mobile, loosen it to a normal entrance on `<768px`.
4. **Hero has to win in 3 seconds.** ~80% never scroll past it. Make sure tagline + reveal + email field are all above the fold on both desktop and mobile. They mostly are, just confirm on mobile.

### honest expectation
Average waitlist page converts 2 to 5% of visitors. Good ones hit 10 to 15%. So 1,000 visitors is maybe 50 to 150 emails. Plan your traffic volume against that. Validation is not just the count, it is the **conversion rate** (do people who land actually sign up?) and the **quality of replies** you get on Reddit.

---

## 2. account prep (do this NOW, before any posting)

You need warm accounts. Cold accounts that post links get auto-flagged.

- [ ] Use a real Reddit account with some history. If you only have a fresh one, spend the next 10 to 14 days commenting genuinely (no links) in the fitness subs below. Aim for 100+ comment karma before you post anything promotional.
- [ ] Set an avatar, a bio, a few normal posts. Empty accounts look like spam.
- [ ] Same for X: profile pic, banner, bio with the link, 5 to 10 real posts before you push the waitlist hard.
- [ ] Verify your email and age the account a bit. Reddit weights account age.

The 90/10 rule is real: roughly **9 genuinely helpful comments for every 1 time you mention your product.** Track it loosely. If your history is all promo, you are done.

---

## 3. the subreddit map

> RULE: read each subreddit's sidebar/rules the day you post. Rules change, mods are strict, and "posting without reading rules = instant ban." The link policies below are accurate as of early 2026 but verify.

### tier A — founder / builder subs (direct links usually OK)
These exist for exactly this. Best place to post the waitlist link directly.

| subreddit | what it is | link policy | what to post |
|---|---|---|---|
| r/SideProject | builders sharing what they make | direct link OK, add flair, reply to comments | "I built an evidence-based fitness app that cites a study for every number. Waitlist is live." + screenshots |
| r/alphaandbetausers | people who WANT to test new apps | direct link OK | recruit early testers / waitlist signups directly |
| r/roastmystartup | feedback on your landing page | direct link OK, expect blunt feedback | "Roast my waitlist page for an evidence-first fitness app" |
| r/EntrepreneurRideAlong | build-journey founders | link usually OK in context | share the build story + waitlist |
| r/SaaS | software founders | weekly self-promo thread only | drop it in the weekly thread |
| r/startups | 1.8M founders | **megathread only** ("Share Your Startup"), no links in main posts | use the weekly thread |
| r/indiebiz / r/microsaas | small indie launches | link usually OK | launch post |
| r/IMadeThis | finished things you built | link OK | the page + the story |

### tier B — fitness / nutrition (NO direct links except designated threads)
This is your real audience, and it is the strictest. Win here with value, not links. The payoff is bigger because these are actual target users.

| subreddit | size / vibe | link policy | how to play it |
|---|---|---|---|
| r/Fitness | ~12M, anti-broscience | **Self-Promotion Saturday thread only** | contribute all week, drop the app in Saturday's thread |
| r/naturalbodybuilding | evidence-obsessed lifters | no promo, value first | perfect audience for "cites studies." Comment with real citations, mention app only if asked |
| r/nutrition | science-only, strict mods | no promo, peer-reviewed only | answer questions with DOIs. Your science library IS this sub's culture |
| r/loseit | supportive weight-loss | no promo, value first | the NEAT/desk-job accuracy angle lands hard here |
| r/leangains | cutting / recomp nerds | no promo | technical crowd, oil tracking + macro accuracy resonates |
| r/xxfitness | women's fitness | no promo, strict | value only, very community-protective |
| r/EatCheapAndHealthy | budget meals + macros | no promo | the food database angle |
| r/gainit | bulking | no promo | surplus / TDEE accuracy angle |

### tier C — Indian niche (you have IFCT desi staples + Indian-English voice)
Your product literally has desi foods and an Indian voice. Use it.

| subreddit | link policy | how to play it |
|---|---|---|
| r/IndianFitness | check sidebar, usually no direct promo | the "MyFitnessPal has no real Indian foods, ours does (IFCT 2017)" angle is gold here |
| r/india / r/bangalore | no promo, very strict | only if you have something genuinely useful, careful |
| r/nri / desi fitness groups | varies | desi-staples + global database angle |

### tier D — early adopters / beta
| subreddit | link policy | how to play it |
|---|---|---|
| r/androidapps | weekly app thread, read rules | you are Android-first, fits perfectly |
| r/betatests / r/TestMyApp | direct link OK | recruit testers into the waitlist |
| r/InternetIsBeautiful | one shot, must be genuinely novel/beautiful | only post once the site is flawless. Huge if it lands, strict mods |

---

## 4. what to actually post (templates)

The move is **value-first posts** where the app is a footnote, plus **direct posts** only in the link-friendly subs. Never paste the same text twice, Reddit flags duplicate templates as spam.

### template 1 — the value post (for fitness subs, NO link in body)
Use this style in r/loseit, r/Fitness comments, r/naturalbodybuilding. Teach something real. Mention the app once at the very bottom, no link. Let people search or DM.

> **title:** if you have a desk job, your tracker is probably overestimating your maintenance by 300 to 400 calories
>
> **body:** most apps put you on a "lightly active" multiplier by default. but NEAT (all the movement outside the gym) varies by up to ~2000 kcal/day between people, and if you sit 9 hours and walk 3k steps you are on the low end. (levine et al. 1999, Science). the fix is to score your actual movement (steps, sitting hours, job type) instead of picking a generic activity level. here is how I calculate mine... [genuinely useful breakdown]
>
> full disclosure at the bottom: I am building a fitness app around exactly this. not linking it here, just sharing the method because this sub helped me.

Why it works: it is true, it is useful, it cites a study (your whole brand), and the soft mention is allowed. People will ask for the link in comments, and a mod-safe "it's in my profile" is fine.

### template 2 — the direct launch post (for r/SideProject, r/alphaandbetausers, r/IMadeThis)
Link is fine here.

> **title:** I built a fitness app that cites a peer-reviewed study for every calorie and macro target. waitlist is live.
>
> **body:** every other tracker hands you a number from a generic formula and never shows its work. mine scores your real daily movement (NEAT) for an accurate maintenance number, forces you to log cooking oil (the #1 untracked calorie source), and every recommendation links to the actual study with a DOI you can open.
>
> launching on Android in a few weeks. waitlist gets 20% off locked in: https://tappedin.site
>
> would love feedback on the landing page and the positioning. blunt is fine.

### template 3 — the roast post (r/roastmystartup)
> **title:** roast my waitlist page — evidence-first fitness app, "shows its work"
>
> **body:** https://tappedin.site — tear apart the hero, the pricing, the copy, whatever. launching in ~3 weeks, want it sharp before I drive real traffic.

### template 4 — the Indian angle (r/IndianFitness, check rules first)
> **title:** built a tracker with actual Indian foods (IFCT 2017 data), not the broken crowdsourced entries on MFP
>
> **body:** got tired of every "roti" on MyFitnessPal having different calories. this uses the ICMR-NIN IFCT 2017 database for desi staples plus USDA for global foods, and it forces oil logging because that is where ghee/oil calories hide. evidence-based, cites studies. [soft mention or link per sub rules]

---

## 5. X / Twitter playbook

Different game: it is about consistency and a viral loop, not one big post.

### the build-in-public loop
1. Post the launch with the OG card and the link. Keep it short, lead with the reveal screenshot.
2. **Viral loop:** after someone joins the waitlist, give them a one-tap "I just joined" share (pre-filled tweet) instead of instant access. This shows who is actually excited and pulls their followers in. (This is the single most-cited waitlist tactic for X.)
3. Post 3 to 5x/week: a feature, a piece of the science, a build update, a "why other apps inflate your TDEE" thread. Transparency (user count, what you learned) builds trust and followers.
4. **Cross-promote:** find 5 to 10 indie hackers / fitness builders at your stage, share each other's launches. Community beats solo every time.

### launch thread template (X)
> most fitness apps lie to you on day one.
>
> they hand you a maintenance number from a generic formula, assume you walk way more than you do, and never count the oil your food was cooked in.
>
> I built the opposite. 🧵
>
> [2/] it scores your REAL daily movement (steps, sitting hours, job type) for an accurate maintenance number. desk workers are usually 300-400 cal lower than apps assume. that gap is why you stall.
>
> [3/] every single number cites a peer-reviewed study. tap it, read the paper. no bro science.
>
> [4/] mandatory oil tracking, AI photo scan, barcode, a coach that knows your numbers, workout generator + logger. four apps in one.
>
> [5/] launching on Android soon. waitlist gets 20% off locked for life 👇
> tappedin.site

Pin it. Reply to every comment. Quote-tweet your own thread when you hit milestones.

---

## 6. the sequence (your ~20 days)

**week 0 (now): prep + fix**
- Build the OG image, fix the counter, mobile pass on the site.
- Point `tappedin.site` DNS at the host, confirm SSL, confirm the form writes to the DB in production.
- Start warming Reddit + X accounts. Comment, no promo.

**week 1: soft, link-friendly subs + X start**
- Post in r/SideProject, r/roastmystartup, r/alphaandbetausers (spread across different days, not all at once).
- Start the X build-in-public posting.
- Fix the page based on the roast feedback. This early feedback is worth more than the signups.

**week 2: value posts in fitness subs + Saturday threads**
- Drop value posts (template 1) in r/loseit, r/naturalbodybuilding, r/nutrition. No links, pure value.
- Hit r/Fitness Self-Promotion Saturday.
- Indian angle in r/IndianFitness.
- Keep the X loop going.

**week 3: push + measure**
- r/androidapps weekly thread, r/betatests.
- If a value post did well, write a follow-up.
- Watch the numbers, double down on whatever channel converted best.

**spacing rule:** max 1 promotional post per day across all of Reddit. Different subs, different titles, different angles. Never copy-paste.

---

## 7. what to measure (real validation, not vanity)

- **Conversion rate** = signups ÷ unique visitors. This is the real signal. Under 2% means the page or the message is off. 10%+ means you have something.
- **Source breakdown:** which subreddit / which tweet drove signups. Kill what does not work, pour into what does.
- **Reply quality on Reddit:** are people saying "finally" and "I need this," or "another tracker"? The words matter more than the upvotes.
- **Monthly vs yearly intent** if you add the plan toggle (free signal on willingness to pay).
- **Scroll depth** (did they reach pricing?) if you can add basic analytics (Plausible/Umami are light and privacy-friendly).

Set a target now so you can call it: e.g. "300 emails and >5% conversion in 3 weeks = validated enough to push the launch." Pick your number.

---

## 8. hard don'ts

- Do not post the link in 5 subs in one day. Fastest path to a shadowban.
- Do not paste identical text across subs. Spam filter bait.
- Do not argue with mods. You will lose and get banned.
- Do not fake the counter or fake reviews. This audience smells it instantly and it is the opposite of your "we show our work" brand.
- Do not put a link in r/Fitness, r/nutrition, r/loseit outside their designated threads. Instant removal + possible ban.
- Do not buy karma or use bots. Detected and punished.

---

## sources
- [Waitlister — waitlist landing page optimization guide](https://waitlister.me/growth-hub/guides/waitlist-landing-page-optimization-guide)
- [LaunchList — waitlist landing pages that convert](https://getlaunchlist.com/blog/waitlist-landing-page-examples-that-convert)
- [KarmaGuy — Reddit self-promotion rules 2026](https://karmaguy.io/en/blog/reddit-self-promotion-rules)
- [KarmaGuy — how to avoid Reddit shadowbans](https://karmaguy.io/en/blog/how-to-avoid-shadowban-reddit)
- [redship — complete guide to Reddit self-promotion rules 2026](https://redship.io/blog/reddit-self-promotion-rules)
- [wappkit — promote on Reddit without getting banned](https://www.wappkit.com/blog/reddit-promotion-without-ban-guide-2025)
- [SaaSCity — best subreddits to promote your startup 2026](https://saascity.io/blog/best-subreddits-promote-startup-2026)
- [MakeUseOf — trustworthy fitness subreddits](https://www.makeuseof.com/trustworthy-subreddits-for-staying-fit-and-healthy/)
- [Teract — Twitter strategy for indie hackers 2026](https://www.teract.ai/resources/twitter-strategy-indie-hackers-2026)
- [Indie Hackers — finding users for your waiting list](https://www.indiehackers.com/product/mentionfunnel/everything-i-did-to-find-users-for-my-waiting-list--NI8bokqdCoq5KRe5CT-)

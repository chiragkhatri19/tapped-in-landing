import { chromium, devices } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...devices["iPhone 13"] });
const page = await ctx.newPage();
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
await page.goto("http://localhost:8083/", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

// hero first (no force needed, animates on mount)
await page.waitForTimeout(600);
await page.screenshot({ path: "feat-hero.png" });

// Force-reveal everything for the scrubbed sections + fill the rings
await page.evaluate(() => {
  document.querySelectorAll("main [class]").forEach((el) => { el.style.opacity = "1"; el.style.transform = "none"; });
  document.querySelectorAll(".streak-ring").forEach((c) => { c.style.strokeDashoffset = "0"; });
});
await page.waitForTimeout(300);

for (const id of ["sec-sleep", "sec-hydration", "sec-streak", "sec-f4"]) {
  await page.evaluate((i) => document.getElementById(i).scrollIntoView({ block: "center" }), id);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `feat-${id}.png` });
}
console.log("errors:", errs.length ? errs.join("; ") : "(none)");
await browser.close();

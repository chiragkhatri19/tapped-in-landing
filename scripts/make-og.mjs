// Generates public/og.png (1200x630) — the social unfurl card for Reddit/X/etc.
// Run: node scripts/make-og.mjs
// Uses system fonts (Arial/Courier) so it renders without bundling webfonts.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "public", "og.png");

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#F2ECDE"/>

  <!-- wordmark -->
  <g transform="translate(72,86)">
    <rect x="0" y="-26" width="34" height="34" rx="7" fill="#111111"/>
    <rect x="22" y="-4" width="9" height="9" fill="#2B3AFF"/>
    <text x="48" y="2" font-family="Arial, sans-serif" font-weight="900" font-size="30" fill="#111111" letter-spacing="-1">tappd in</text>
  </g>

  <!-- headline -->
  <g font-family="Arial, sans-serif" font-weight="900" letter-spacing="-3">
    <text x="70" y="248" font-size="82" fill="#111111">the fitness app</text>
    <text x="70" y="330" font-size="82" fill="#111111">that shows</text>
    <!-- yellow box: its work. -->
    <rect x="68" y="356" width="372" height="96" rx="14" fill="#E8FF00" stroke="#111111" stroke-width="4"/>
    <text x="92" y="426" font-size="82" fill="#111111">its work.</text>
  </g>

  <!-- subhead -->
  <text x="72" y="512" font-family="Arial, sans-serif" font-weight="500" font-size="27" fill="#4A453B">every calorie and macro cites a peer-reviewed study.</text>

  <!-- footer url + pill -->
  <text x="72" y="586" font-family="'Courier New', monospace" font-weight="700" font-size="23" fill="#111111" opacity="0.55">tappedin.site</text>
  <g transform="translate(316,566)">
    <rect x="0" y="0" width="196" height="30" rx="15" fill="#2B3AFF"/>
    <text x="98" y="21" text-anchor="middle" font-family="'Courier New', monospace" font-weight="700" font-size="14" fill="#FFFFFF" letter-spacing="1">JOIN THE WAITLIST</text>
  </g>

  <!-- right: phone reveal card (with hard offset shadow) -->
  <g transform="translate(760,150)">
    <rect x="8" y="8" width="372" height="332" rx="18" fill="#111111"/>
    <rect x="0" y="0" width="372" height="332" rx="18" fill="#0D0F1C" stroke="#111111" stroke-width="4"/>

    <text x="28" y="44" font-family="'Courier New', monospace" font-size="14" fill="#9BA3C0" letter-spacing="2">CALORIE TARGET</text>

    <text x="28" y="92" font-family="'Courier New', monospace" font-size="16" fill="#6b7390">other apps give you</text>
    <text x="28" y="124" font-family="'Courier New', monospace" font-weight="700" font-size="30" fill="#5a6075">2,400 kcal</text>
    <rect x="28" y="112" width="186" height="4" fill="#FF3B2F"/>

    <!-- yellow reveal box -->
    <rect x="28" y="150" width="316" height="118" rx="12" fill="#E8FF00" stroke="#111111" stroke-width="3"/>
    <text x="46" y="180" font-family="'Courier New', monospace" font-weight="700" font-size="13" fill="#5a5400" letter-spacing="1">YOUR REAL MAINTENANCE</text>
    <text x="44" y="244" font-family="'Courier New', monospace" font-weight="700" font-size="62" fill="#111111" letter-spacing="-2">2,050</text>
    <text x="250" y="244" font-family="'Courier New', monospace" font-weight="700" font-size="22" fill="#3a3a2a">kcal</text>

    <text x="28" y="300" font-family="'Courier New', monospace" font-size="14" fill="#6b7390">NEAT scored for a desk lifestyle</text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log("wrote", out);

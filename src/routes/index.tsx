import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { joinWaitlist, getWaitlistCount } from "../lib/api/waitlist.functions";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);
  // Mobile browsers fire a `resize` event every time the address bar slides in/out
  // during scroll. Left unchecked, that makes ScrollTrigger recalculate (and visibly
  // jump) on every scroll tick. ignoreMobileResize tells ScrollTrigger to ignore those
  // height-only mobile resizes so scrolling stays smooth and reveals fire reliably.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "tappd in" },
      {
        name: "description",
        content: "evidence-based fitness os. accurate NEAT-scored calorie targets, mandatory oil tracking, and a peer-reviewed study behind every number. join the waitlist.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tappedin.site" },
      { property: "og:title", content: "tappd in" },
      {
        property: "og:description",
        content: "accurate calorie targets, mandatory oil tracking, and a peer-reviewed study behind every number. join the waitlist for 20% off.",
      },
      { property: "og:image", content: "https://tappedin.site/og.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "tappd in. the fitness app that shows its work." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@tappd_in" },
      { name: "twitter:title", content: "tappd in" },
      {
        name: "twitter:description",
        content: "accurate calorie targets, mandatory oil tracking, and a study behind every number. join the waitlist for 20% off.",
      },
      { name: "twitter:image", content: "https://tappedin.site/og.png" },
    ],
  }),
  component: Index,
});

// Snappy mechanical spring physics (no sluggish bezier curves)
const springTransition = {
  type: "spring",
  stiffness: 450,
  damping: 26,
  mass: 0.8,
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

// Stagger container: orchestrates children entering one by one
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Wider stagger for card grids
const cardStaggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Fade-up child (used inside stagger containers)
const fadeUpChild = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// Scale-in child for cards
const scaleUpChild = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

// Reusable customizable Logo component based on logosvg.svg (with transparent background option)
interface LogoProps {
  size?: number;
  className?: string;
  dotColor?: string;
  iconColor?: string;
}

function Logo({
  size = 36,
  className = "",
  dotColor = "#2B3AFF",
  iconColor = "#111111",
}: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 select-none ${className}`}
      aria-label="tappd in logo"
    >
      <rect x="432" y="272" width="160" height="480" fill={iconColor} />
      <path
        d="M336 472C336 494.091 353.909 512 376 512H648C670.091 512 688 494.091 688 472V392C688 369.909 670.091 352 648 352H376C353.909 352 336 369.909 336 392V472Z"
        fill={iconColor}
      />
      <path d="M336 419H592V352H336V419Z" fill={iconColor} />
      <path d="M388 512H688V352H388V512Z" fill={iconColor} />
      <rect x="632" y="696" width="56" height="56" fill={dotColor} />
    </svg>
  );
}

function Index() {
  const [email, setEmail] = useState("");
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const [heroMousePos, setHeroMousePos] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeroMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.scrollTo(0, 0);

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    const ctx = gsap.context(() => {

    // ── HERO ENTRANCE (plays immediately on mount) ──────────────────────────
    gsap.timeline()
      .fromTo("header",               { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
      .fromTo(".hero-title",           { y: 30, opacity: 0  }, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, "-=0.2")
      .fromTo(".hero-subtitle",        { y: 18, opacity: 0  }, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }, "-=0.3")
      .fromTo(".hero-form-wrapper",    { y: 18, opacity: 0  }, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }, "-=0.3")
      .fromTo(".hero-console-wrapper", { x: 24, opacity: 0  }, { x: 0, opacity: 1, duration: 0.65, ease: "back.out(1.2)" }, "-=0.5");

    // ── SECTION TIMELINE FACTORY ─────────────────────────────────────────────
    // Both desktop and mobile PIN the section to the top of the viewport and SCRUB
    // the reveal to the scroll position: the section holds still, its content stays
    // in its start (hidden) state until you arrive, and then builds in at exactly the
    // pace you swipe/scroll — when the reveal is done the section releases and the next
    // one scrolls up. Mobile uses a tighter scrub and a shorter pin distance so each
    // section resolves in one deliberate swipe instead of a long drag.
    // IMPORTANT: animated elements keep their opacity-0 Tailwind class for SSR; the
    // fromTo() TO states (opacity:1) are what reveal them as the scrub advances.
    const buildTL = (trigger: string, end: string) => {
      // Mobile gets 65% of the desktop scroll distance — enough room to read
      // the text before the visual, without needing a marathon of swipes.
      const mobileEnd = end.replace(/\+=(\d+)/, (_, n) => `+=${Math.round(Number(n) * 0.65)}`);
      return gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top top",
          end: isDesktop ? end : mobileEnd,
          pin: true,
          // Lazier scrub: the animation lags behind the scroll finger/wheel
          // so users have time to see what's appearing rather than it flashing by.
          scrub: isDesktop ? 1.8 : 0.7,
          anticipatePin: 1,
        },
      });
    };

    // ── COMP — market problem ─────────────────────────────────────────────────
    // Cards stagger in slowly; strike-line is the payoff at the end.
    buildTL("#sec-comp", "+=800")
    .fromTo(".comp-card",        { opacity:0, scale:0.88, y:36 }, { opacity:1, scale:1, y:0, stagger:0.14, duration:0.6 })
    .to({}, { duration: 0.3 })                                       // brief pause so user reads the cards
    .fromTo(".price-strike-line",{ scaleX:0 },                    { scaleX:1, transformOrigin:"left center", duration:0.5 });

    // ── SOLUTION — evidence-based stack ──────────────────────────────────────
    // Left panel (text) enters first; card follows after a deliberate beat.
    const solTl = buildTL("#sec-solution", "+=1100")
      .fromTo(".sol-left-panel",   { opacity:0, x:-40 },        { opacity:1, x:0, duration:0.6 })
      .to({}, { duration: 0.5 })                                     // user reads the pitch before the card arrives
      .fromTo(".sol-card-wrapper", { opacity:0, scale:0.93 },   { opacity:1, scale:1, duration:0.7 }, "-=0.1");
    solTl.to(".sol-card-inner", { rotateY:180, duration:0.6 }, "+=0.3");
    solTl.fromTo(".sol-feature-item", { opacity:0, x:20 }, { opacity:1, x:0, stagger:0.22, duration:0.5 }, "-=0.6");

    // ── F1 — accurate maintenance ─────────────────────────────────────────────
    // Title → subtitle → text col (all text-first); then card fades in with number animation.
    const kcalObj = { val: 2400 };
    buildTL("#sec-f1", "+=1000")
    .fromTo(".f1-title",    { opacity:0, y:18 }, { opacity:1, y:0, duration:0.5 })
    .fromTo(".f1-subtitle", { opacity:0, y:18 }, { opacity:1, y:0, duration:0.5 }, "-=0.25")
    .fromTo(".f1-text-col", { opacity:0, x:-32 },{ opacity:1, x:0, duration:0.6 }, "-=0.25")
    .to({}, { duration: 0.5 })                                       // pause — read the copy
    .fromTo(".f1-card-col", { opacity:0, scale:0.93 }, { opacity:1, scale:1, duration:0.7 })
    .to("#f1-strike-line",  { scaleX:1, transformOrigin:"left center", duration:0.4 }, "+=0.15")
    .to(kcalObj, { val:2050, duration:0.7, onUpdate:() => { const el=document.getElementById("f1-kcal-val"); if(el) el.innerText=Math.round(kcalObj.val).toLocaleString()+" kcal"; } }, "-=0.2")
    .fromTo(".f1-tag", { opacity:0, y:10 }, { opacity:1, y:0, stagger:0.2, duration:0.4 });

    // ── F2 — AI photo scan ────────────────────────────────────────────────────
    // Text col first, hold for beam sweep, then reveal ingredients slowly.
    buildTL("#sec-f2", "+=1200")
    .fromTo(".f2-text-col",       { opacity:0, x:-32 },      { opacity:1, x:0,     duration:0.6 })
    .to({}, { duration: 0.5 })                                       // user reads before card appears
    .fromTo(".f2-card-col",       { opacity:0, scale:0.94 }, { opacity:1, scale:1, duration:0.6 }, "-=0.1")
    .to({},                       { duration: isDesktop ? 1.2 : 0.7 })  // beam sweeps
    .to(".f2-photo-phase",        { opacity:0, duration:0.5 })
    .fromTo(".f2-ingr-phase",     { opacity:0 },              { opacity:1,          duration:0.5 }, "-=0.2")
    .fromTo(".f2-ingr-item",      { opacity:0, x:-12 },       { opacity:1, x:0,     duration:0.4, stagger:0.14 }, "-=0.2")
    .fromTo(".f2-results-footer", { opacity:0, y:6 },         { opacity:1, y:0,     duration:0.4 })
    .fromTo(".f2-oil-badge",      { opacity:0, y:14 },        { opacity:1, y:0,     duration:0.5 });

    // ── F2B — four ways to log ────────────────────────────────────────────────
    buildTL("#sec-f2b", "+=850")
    .fromTo(".f2b-title",    { opacity:0, y:18 }, { opacity:1, y:0, duration:0.5 })
    .fromTo(".f2b-subtitle", { opacity:0, y:18 }, { opacity:1, y:0, duration:0.5 }, "-=0.25")
    .to({}, { duration: 0.4 })
    .fromTo(".f2b-method",   { opacity:0, y:30, scale:0.95 }, { opacity:1, y:0, scale:1, stagger:0.22, duration:0.55 });

    // ── F3 — workout generator ────────────────────────────────────────────────
    // Text first; chips stagger in after the card settles.
    buildTL("#sec-f3", "+=1000")
    .fromTo(".f3-text-col",   { opacity:0, x:-32 },       { opacity:1, x:0, duration:0.6 })
    .to({}, { duration: 0.45 })
    .fromTo(".f3-card-col",   { opacity:0, scale:0.94 },  { opacity:1, scale:1, duration:0.7 })
    .fromTo(".f3-input-chip", { opacity:0, scale:0.8, y:10 }, { opacity:1, scale:1, y:0, stagger:0.16, duration:0.45 }, "-=0.3")
    .fromTo(".f3-day-chip",   { opacity:0, x:-12 },        { opacity:1, x:0, stagger:0.2, duration:0.4 }, "-=0.2");

    // ── F3B — workout logger ──────────────────────────────────────────────────
    buildTL("#sec-f3b", "+=950")
    .fromTo(".f3b-text-col", { opacity:0, x:32 },       { opacity:1, x:0, duration:0.6 })
    .to({}, { duration: 0.4 })
    .fromTo(".f3b-card-col", { opacity:0, x:-32 },      { opacity:1, x:0, duration:0.6 })
    .fromTo(".f3b-set-row",  { opacity:0, x:-16 },      { opacity:1, x:0, stagger:0.26, duration:0.45 }, "-=0.3")
    .fromTo(".f3b-pr-row",   { opacity:0, y:14 },       { opacity:1, y:0, duration:0.4 }, "-=0.2")
    .fromTo(".f3b-vol-bar",  { opacity:0, scaleX:0, transformOrigin:"left center" }, { opacity:1, scaleX:1, stagger:0.2, duration:0.5 }, "-=0.2");

    // ── SLEEP — recovery ──────────────────────────────────────────────────────
    buildTL("#sec-sleep", "+=1000")
    .fromTo(".sleep-text-col", { opacity:0, x:-32 },      { opacity:1, x:0, duration:0.6 })
    .to({}, { duration: 0.5 })
    .fromTo(".sleep-card-col", { opacity:0, scale:0.94 }, { opacity:1, scale:1, duration:0.7 })
    .fromTo(".sleep-stat",     { opacity:0, y:16 },       { opacity:1, y:0, stagger:0.2, duration:0.45 }, "-=0.3")
    .fromTo(".sleep-stage",    { scaleX:0, transformOrigin:"left center" }, { scaleX:1, stagger:0.14, duration:0.45 }, "-=0.1")
    .fromTo(".sleep-source",   { opacity:0, y:10 },       { opacity:1, y:0, stagger:0.12, duration:0.4 }, "-=0.2");

    // ── HYDRATION — beyond water ──────────────────────────────────────────────
    buildTL("#sec-hydration", "+=1000")
    .fromTo(".hydr-text-col",  { opacity:0, x:32 },       { opacity:1, x:0, duration:0.6 })
    .to({}, { duration: 0.5 })
    .fromTo(".hydr-card-col",  { opacity:0, scale:0.94 }, { opacity:1, scale:1, duration:0.7 })
    .fromTo(".hydr-glass",     { opacity:0, scale:0.6, y:12 }, { opacity:1, scale:1, y:0, stagger:0.09, duration:0.45 }, "-=0.3")
    .fromTo(".hydr-electro",   { opacity:0, y:14 },       { opacity:1, y:0, stagger:0.18, duration:0.45 }, "-=0.1");

    // ── F4 — AI coach ─────────────────────────────────────────────────────────
    // Centered layout: text heading first, then chat card rises in, then bubbles.
    buildTL("#sec-f4", "+=1150")
    .fromTo(".f4-text-col",    { opacity:0, y:24 },         { opacity:1, y:0, duration:0.6 })
    .to({}, { duration: 0.5 })
    .fromTo("#f4-coach-chat",  { opacity:0, y:24, scale:0.93 }, { opacity:1, y:0, scale:1, duration:0.75 })
    .fromTo(".f4-chat-bubble", { opacity:0, y:12 },          { opacity:1, y:0, duration:0.4, stagger:0.28 }, "-=0.2");

    // ── STREAK — the four brutalist rings ─────────────────────────────────────
    const streakObj = { val: 0 };
    buildTL("#sec-streak", "+=1100")
    .fromTo(".streak-text-col", { opacity:0, x:-32 },      { opacity:1, x:0, duration:0.6 })
    .to({}, { duration: 0.5 })
    .fromTo(".streak-card-col", { opacity:0, scale:0.94 }, { opacity:1, scale:1, duration:0.7 })
    .fromTo(".streak-ring",     { strokeDashoffset:(_i: number, t: Element)=> Number((t as SVGCircleElement).getAttribute("data-c")) }, { strokeDashoffset:0, stagger:0.22, duration:0.85, ease:"power2.out" }, "-=0.3")
    .to(streakObj, { val:12, duration:0.65, onUpdate:()=>{ const el=document.querySelector(".streak-count"); if(el) el.textContent=String(Math.round(streakObj.val)); } }, "-=0.6")
    .fromTo(".streak-row",      { opacity:0, x:16 },       { opacity:1, x:0, stagger:0.18, duration:0.45 }, "-=0.4")
    .fromTo(".streak-legend",   { opacity:0, y:10 },       { opacity:1, y:0, stagger:0.12, duration:0.4 }, "-=0.3");

    // ── WHY BUTTON — evidence card explainer ─────────────────────────────────
    buildTL("#sec-why", "+=950")
    .fromTo(".why-title",    { opacity:0, y:18 }, { opacity:1, y:0, duration:0.55 })
    .fromTo(".why-subtitle", { opacity:0, y:22 }, { opacity:1, y:0, duration:0.55 }, "-=0.25")
    .fromTo(".why-desc",     { opacity:0, y:18 }, { opacity:1, y:0, stagger:0.18, duration:0.5 }, "-=0.25")
    .to({}, { duration: 0.4 })
    .fromTo(".why-card",     { opacity:0, x:40, scale:0.95 }, { opacity:1, x:0, scale:1, duration:0.7 });

    // ── SYS — system integrity ────────────────────────────────────────────────
    buildTL("#sec-sys", "+=850")
    .fromTo(".sys-title",    { opacity:0, y:18 }, { opacity:1, y:0, duration:0.55 })
    .fromTo(".sys-subtitle", { opacity:0, y:18 }, { opacity:1, y:0, duration:0.5 }, "-=0.25")
    .fromTo(".sys-desc",     { opacity:0, y:18 }, { opacity:1, y:0, duration:0.5 }, "-=0.25")
    .to({}, { duration: 0.4 })
    .fromTo(".sys-card",     { opacity:0, y:28, scale:0.94 }, { opacity:1, y:0, scale:1, stagger:0.16, duration:0.55 });

    // ── FAQ — light entrance, no pin ──────────────────────────────────────────
    gsap.timeline({ scrollTrigger: { trigger:"#sec-faq", start: isDesktop ? "top 75%" : "top 65%", once:true } })
    .fromTo(".faq-title",    { opacity:0, y:18 }, { opacity:1, y:0, duration:0.55, ease:"power2.out" })
    .fromTo(".faq-subtitle", { opacity:0, y:18 }, { opacity:1, y:0, duration:0.5,  ease:"power2.out" }, "-=0.25")
    .fromTo(".faq-item",     { opacity:0, y:22, scale:0.97 }, { opacity:1, y:0, scale:1, stagger:0.14, duration:0.55, ease:"back.out(1.2)" }, "-=0.2");

    // ── FOOTER ────────────────────────────────────────────────────────────────
    gsap.timeline({ scrollTrigger: { trigger:"#sec-foot", start:"top 75%", once:true } })
    .fromTo(".foot-box",     { opacity:0, y:44, scale:0.97 }, { opacity:1, y:0, scale:1, duration:0.85, ease:"power2.out" })
    .fromTo(".foot-title",   { opacity:0, y:14 }, { opacity:1, y:0, duration:0.5 }, "-=0.45")
    .fromTo(".foot-headline",{ opacity:0, y:18 }, { opacity:1, y:0, duration:0.6, ease:"power2.out" }, "-=0.3")
    .fromTo(".foot-desc",    { opacity:0, y:14 }, { opacity:1, y:0, duration:0.5 }, "-=0.3")
    .fromTo(".foot-badge",   { opacity:0, scale:0.88, rotate:-3 }, { opacity:1, scale:1, rotate:0, duration:0.6, ease:"back.out(1.2)" }, "-=0.3")
    .fromTo(".foot-form",    { opacity:0, y:18 }, { opacity:1, y:0, duration:0.5 }, "-=0.25")
    .fromTo(".foot-details", { opacity:0 },       { opacity:1, duration:0.5 }, "-=0.2");

    // Recalculate all trigger positions after every pin has inserted its spacer.
    // Without this, sections 2+ have stale offsets and their pins never activate.
    ScrollTrigger.refresh();

    }); // end gsap.context

    // Google Fonts load async and reflow text → positions go stale → re-refresh once fonts settle
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    // Only refresh on a real WIDTH change (device rotation / desktop resize). Mobile
    // address-bar show/hide changes height, not width — refreshing on those caused the
    // scroll jank and "animations don't fire" behavior. Debounced via rAF so a burst of
    // resize events collapses into a single refresh.
    let lastWidth = window.innerWidth;
    let resizeRaf = 0;
    const handleResize = () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      ctx.revert();
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  // Load waitlist count on mount
  useEffect(() => {
    getWaitlistCount()
      .then((res) => {
        setWaitlistCount(res.count);
      })
      .catch((err) => console.error("error loading count:", err));
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const result = await joinWaitlist({ data: { email } });
      setFeedback(result);
      if (result.success) {
        setEmail("");
        setWaitlistCount(result.count);
      }
    } catch (error) {
      setFeedback({
        success: false,
        message: "failed to join. try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="lowercase selection:bg-volt selection:text-ink font-sans bg-bone text-ink relative bg-dots overflow-x-clip">
      {/* SECTION 1: THE HERO */}
      <section
        id="sec-hero"
        className="min-h-mobile-section w-full flex flex-col relative overflow-hidden"
        onMouseMove={handleHeroMouseMove}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#111111_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(600px circle at ${heroMousePos.x}px ${heroMousePos.y}px, rgba(232,255,0,0.055), transparent 70%)` }}
        />

        {/* NAV */}
        <header className="w-full max-w-7xl mx-auto px-5 md:px-8 flex justify-between items-center pt-6 pb-2 z-10 flex-shrink-0">
          <div className="flex items-center gap-2.5 select-none">
            <Logo size={68} className="w-[60px] h-[60px] md:w-[68px] md:h-[68px]" />
            <span className="font-display font-black text-2xl md:text-2xl tracking-tighter lowercase leading-none">tappd in</span>
          </div>
          <div className="flex items-center gap-2 border-[3px] border-ink bg-card-light pl-2.5 pr-3.5 py-2 rounded-[10px] shadow-v5-sm select-none">
            <div className="hidden sm:flex -space-x-2.5">
              {(["a","m","s"] as const).map((l, i) => (
                <div key={l} className={`w-6 h-6 rounded-full border-[2px] border-ink flex items-center justify-center font-mono text-[9px] font-black ${["bg-bone text-ink","bg-electric-light text-bone","bg-pink text-bone"][i]}`}>{l}</div>
              ))}
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ink animate-volt-blink" />
                <span className="font-mono text-[8px] font-bold tracking-wider text-ink/60 uppercase">waitlist spots</span>
              </div>
              <span className="font-mono font-black text-xs text-ink">{500 - waitlistCount} of 500 left</span>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-5 md:px-8 flex items-center py-6 md:py-6 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center w-full">

            {/* LEFT */}
            <div className="col-span-1 lg:col-span-7 flex flex-col gap-5">
              <div className="hero-title opacity-0">
                <h1 className="font-display font-black text-[3.4rem] sm:text-[3.8rem] md:text-[4.8rem] lg:text-[5.2rem] tracking-tighter leading-[0.88] text-ink">
                  the fitness app<br />
                  that shows<br />
                  <span className="bg-volt border-[3px] border-ink rounded-[12px] shadow-v5-sm px-3 py-1 inline-block mt-1.5 leading-snug">
                    its work.
                  </span>
                </h1>
              </div>

              <p className="hero-subtitle font-sans font-medium text-[1.05rem] md:text-[1.15rem] text-muted-fg-light leading-relaxed max-w-[500px] opacity-0">
                most apps inflate your numbers to keep you happy. we calculate the real ones. then we cite the peer-reviewed study behind every single number.
              </p>

              <div className="hero-form-wrapper flex flex-col gap-3 opacity-0">
                <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-[480px]">
                  <input
                    type="email"
                    aria-label="email address"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    className="flex-1 bg-card-light text-ink border-[3px] border-ink rounded-[10px] px-5 py-3.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-electric-light shadow-v5-sm transition-all placeholder:text-ink/30"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-electric-light text-bone font-mono font-bold text-sm border-[3px] border-ink rounded-[10px] px-7 py-3.5 shadow-v5-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-v5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer whitespace-nowrap"
                  >
                    {isSubmitting ? "joining..." : "join the waitlist →"}
                  </button>
                </form>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="font-mono text-[10px] text-muted-fg-light">
                      monthly <span className="line-through opacity-40">$10</span>{" "}
                      <span className="font-bold text-ink">$7.99</span>
                      <span className="mx-1.5 opacity-30">·</span>
                      yearly <span className="line-through opacity-40">$59.99</span>{" "}
                      <span className="font-bold text-ink">$47.99</span>
                      <span className="text-ink/40 ml-1">(save 20%). locked at signup.</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-wider text-ink/30">
                    <span>✓ no spam</span>
                    <span className="opacity-40">·</span>
                    <span>✓ one email at launch</span>
                    <span className="opacity-40">·</span>
                    <span>✓ no credit card</span>
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                      className={`max-w-[480px] border-[2px] rounded-[8px] px-3 py-2 font-mono font-semibold text-[11px] flex items-center gap-2 ${feedback.success ? "bg-volt text-ink border-ink" : "bg-pink text-bone border-ink"}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      <span>{feedback.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT: PHONE MOCKUP */}
            <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-start">
              <div className="hero-console-wrapper opacity-0 relative select-none">
                {/* Phone frame */}
                <div style={{
                  width: 288, height: 586,
                  background: "linear-gradient(175deg,#3a3a3c 0%,#252527 40%,#1c1c1e 100%)",
                  borderRadius: 52, padding: 13,
                  boxShadow: "0 0 0 1.5px rgba(255,255,255,0.10), 0 0 0 2.5px #111, 0 50px 100px rgba(0,0,0,0.55), inset 0 1.5px 0 rgba(255,255,255,0.12)"
                }}>
                  {/* Physical buttons */}
                  <div style={{ position:"absolute", right:-4, top:108, width:4, height:52, background:"linear-gradient(180deg,#48484a,#2c2c2e)", borderRadius:"0 4px 4px 0", boxShadow:"inset -1px 0 0 rgba(255,255,255,0.06)" }} />
                  <div style={{ position:"absolute", left:-4, top:90, width:4, height:34, background:"linear-gradient(180deg,#48484a,#2c2c2e)", borderRadius:"4px 0 0 4px", boxShadow:"inset 1px 0 0 rgba(255,255,255,0.06)" }} />
                  <div style={{ position:"absolute", left:-4, top:134, width:4, height:34, background:"linear-gradient(180deg,#48484a,#2c2c2e)", borderRadius:"4px 0 0 4px", boxShadow:"inset 1px 0 0 rgba(255,255,255,0.06)" }} />
                  <div style={{ position:"absolute", left:-4, top:188, width:4, height:34, background:"linear-gradient(180deg,#48484a,#2c2c2e)", borderRadius:"4px 0 0 4px", boxShadow:"inset 1px 0 0 rgba(255,255,255,0.06)" }} />

                  {/* Screen */}
                  <div style={{ width:"100%", height:"100%", background:"#F2ECDE", borderRadius:40, overflow:"hidden", display:"flex", flexDirection:"column", position:"relative" }}>
                    {/* Screen edge gloss */}
                    <div style={{ position:"absolute", top:0, left:0, right:0, height:80, background:"linear-gradient(180deg,rgba(255,255,255,0.14) 0%,transparent 100%)", borderRadius:"40px 40px 0 0", pointerEvents:"none", zIndex:10 }} />

                    {/* Status bar */}
                    <div style={{ padding:"14px 18px 0", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0, position:"relative" }}>
                      <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:11, fontWeight:800, color:"#111111" }}>9:41</span>
                      {/* Dynamic Island */}
                      <div style={{ position:"absolute", left:"50%", top:10, transform:"translateX(-50%)", width:100, height:28, background:"#111111", borderRadius:22, zIndex:2 }} />
                      <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                        {/* Signal */}
                        <div style={{ display:"flex", gap:2, alignItems:"flex-end", height:10 }}>
                          {[40,60,80,100].map((h,i) => (
                            <div key={i} style={{ width:3, height:`${h}%`, background:"#111111", borderRadius:1.5, opacity: i < 3 ? 1 : 0.35 }} />
                          ))}
                        </div>
                        {/* WiFi */}
                        <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                          <path d="M6.5 7.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" fill="#111"/>
                          <path d="M3.5 5.5A4.2 4.2 0 0 1 6.5 4.4a4.2 4.2 0 0 1 3 1.1" stroke="#111" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                          <path d="M1.2 3.2A7 7 0 0 1 6.5 1a7 7 0 0 1 5.3 2.2" stroke="#111" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.4"/>
                        </svg>
                        {/* Battery */}
                        <div style={{ width:22, height:11, border:"1.5px solid rgba(17,17,17,0.8)", borderRadius:3, display:"flex", alignItems:"center", padding:"1.5px", position:"relative" }}>
                          <div style={{ position:"absolute", right:-4, top:"50%", transform:"translateY(-50%)", width:2.5, height:5.5, background:"rgba(17,17,17,0.6)", borderRadius:"0 1px 1px 0" }} />
                          <div style={{ width:"72%", height:"100%", background:"#111", borderRadius:1.5 }} />
                        </div>
                      </div>
                    </div>

                    {/* App content */}
                    <div style={{ flex:1, padding:"10px 16px 16px", display:"flex", flexDirection:"column", gap:8, minHeight:0, overflowY:"hidden" }}>
                      <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:7.5, color:"rgba(17,17,17,0.32)", textTransform:"uppercase", letterSpacing:"0.18em" }}>
                        tappd in · calorie calibration
                      </span>

                      {/* What other apps give you */}
                      <div>
                        <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:8.5, color:"rgba(17,17,17,0.38)", marginBottom:4 }}>other apps give you</div>
                        <div style={{ position:"relative", display:"inline-flex", alignItems:"center", gap:6 }}>
                          <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:22, fontWeight:700, color:"rgba(17,17,17,0.25)", lineHeight:1 }}>2,400 kcal</span>
                          <div style={{ position:"absolute", top:"50%", left:0, right:0, height:2.5, background:"#FF3B2F", transform:"translateY(-50%)", borderRadius:2 }} />
                          <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:7.5, color:"#FF3B2F", fontWeight:700, marginLeft:2 }}>wrong</span>
                        </div>
                      </div>

                      {/* The actual number */}
                      <div style={{ background:"#E8FF00", border:"2.5px solid #111", borderRadius:14, padding:"11px 15px", boxShadow:"4px 4px 0 #111" }}>
                        <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:7.5, color:"rgba(17,17,17,0.5)", textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:5 }}>
                          your real maintenance
                        </div>
                        <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
                          <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:42, fontWeight:900, color:"#111111", lineHeight:1, letterSpacing:"-0.03em" }}>2,050</span>
                          <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:14, fontWeight:700, color:"rgba(17,17,17,0.45)" }}>kcal</span>
                        </div>
                        <div style={{ display:"flex", justifyContent:"space-between", marginTop:4, paddingTop:4, borderTop:"1px solid rgba(17,17,17,0.12)" }}>
                          <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:7.5, color:"rgba(17,17,17,0.4)" }}>NEAT scored</span>
                          <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                            <div style={{ background:"rgba(0,194,168,0.18)", border:"1px solid rgba(0,194,168,0.4)", borderRadius:3, padding:"1px 5px" }}>
                              <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:6.5, fontWeight:700, color:"#00C2A8", textTransform:"uppercase" }}>why?</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Macro row */}
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:5 }}>
                        {[
                          { label:"protein", val:"160g", color:"#2B3AFF" },
                          { label:"carbs",   val:"220g", color:"#FF7A1A" },
                          { label:"fat",     val:"65g",  color:"#FF2B85" },
                        ].map(m => (
                          <div key={m.label} style={{ background:"rgba(17,17,17,0.05)", border:"1.5px solid rgba(17,17,17,0.1)", borderRadius:9, padding:"7px 4px", textAlign:"center" }}>
                            <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:14, fontWeight:900, color:m.color, lineHeight:1.1 }}>{m.val}</div>
                            <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:6.5, color:"rgba(17,17,17,0.35)", textTransform:"uppercase", letterSpacing:"0.07em", marginTop:2 }}>{m.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* NEAT inputs */}
                      <div style={{ background:"rgba(17,17,17,0.04)", border:"1.5px solid rgba(17,17,17,0.08)", borderRadius:11, padding:"9px 12px" }}>
                        <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:7, color:"rgba(17,17,17,0.28)", textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:7 }}>your real inputs</div>
                        {[
                          { k:"daily steps", v:"4,200" },
                          { k:"job type",    v:"desk job" },
                          { k:"sitting hrs", v:"9 hrs/day" },
                        ].map((row, i) => (
                          <div key={row.k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom: i < 2 ? 5 : 0, borderBottom: i < 2 ? "1px solid rgba(17,17,17,0.06)" : "none", marginBottom: i < 2 ? 5 : 0 }}>
                            <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:8.5, color:"rgba(17,17,17,0.38)" }}>{row.k}</span>
                            <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:8.5, fontWeight:700, color:"rgba(17,17,17,0.7)" }}>{row.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* SECTION 2: KINETIC MARQUEE */}
      <div className="relative w-full my-6" style={{ zIndex: 20 }}>
      <div className="w-[140vw] relative -left-[20vw] transform rotate-[-2deg] bg-ink py-4 md:py-5 border-y-[3px] border-ink flex select-none shadow-[0_15px_40px_rgba(17,17,17,0.5)]">
        <motion.div
          className="flex whitespace-nowrap text-volt font-mono font-semibold text-xl md:text-3xl tracking-tight gap-8 uppercase-none lowercase pr-8"
          animate={{ x: [0, "-50%"] }}
          transition={{
            ease: "linear",
            duration: 16,
            repeat: Infinity,
          }}
        >
          <span>
            evidence-based // nutrition · training · recovery · hydration // mathematically strict //
            no generic slop // all-in-one //{" "}
          </span>
          <span>
            evidence-based // nutrition · training · recovery · hydration // mathematically strict //
            no generic slop // all-in-one //{" "}
          </span>
        </motion.div>
      </div>
      </div>

      {/* SECTION 3.1: THE COMPETITOR COMPARISON */}
      <section
        id="sec-comp"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center">
          <div className="lg:col-span-4 flex flex-col justify-center">
            <span className="text-pink font-mono text-xs font-semibold tracking-wider block mb-2">
              01 // the market problem
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter leading-[0.9] text-ink mb-6">
              why pay $400+ a year?
            </h2>
            <p className="text-sm md:text-base font-sans font-medium text-muted-fg-light leading-relaxed mb-6">
              to cover all your health pillars - nutrition, training, weight, habits, and sleep - you're
              forced into seven separate subscriptions. seven apps that can't talk to each other,
              charging you over $400 a year for fragmented data silos.
            </p>
            <div className="border-[3px] border-ink bg-alert-light/10 rounded-[12px] p-5 shadow-v5 relative overflow-hidden select-none flex flex-col items-center justify-center text-center">
              <span className="font-mono text-[9px] font-bold text-alert-light uppercase tracking-wider">
                [total fragmented stack cost]
              </span>
              <div className="relative inline-block mt-1">
                <span className="text-4xl md:text-5xl font-mono font-black text-ink tracking-tight">
                  $401.94/yr
                </span>
                <div
                  className="price-strike-line absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-alert-light w-full origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <p className="font-mono text-[9px] text-ink/40 mt-2">7 apps · 7 bills · 0 shared data</p>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              { name: "myfitnesspal",  price: "$79.99/yr",  cat: "nutrition",   catColor: "bg-orange/15 text-orange",   limits: "food database only. ads, no calorie math, no coach." },
              { name: "cronometer",    price: "$49.99/yr",  cat: "nutrition",   catColor: "bg-orange/15 text-orange",   limits: "detailed micros, but tedious entry and complex ui." },
              { name: "cal ai",        price: "$120.00/yr", cat: "nutrition",   catColor: "bg-orange/15 text-orange",   limits: "photo logging only. no training, no evidence layer." },
              { name: "hevy",          price: "$23.99/yr",  cat: "workouts",    catColor: "bg-pink/15 text-pink",       limits: "clean workout logger. zero nutrition or weight sync." },
              { name: "lose it!",      price: "$39.99/yr",  cat: "weight",      catColor: "bg-violet/15 text-violet",   limits: "weight tracking only. generic math, popups, no citations." },
              { name: "habitica",      price: "$47.99/yr",  cat: "habits",      catColor: "bg-electric-light/15 text-electric-light", limits: "gamified habit tracking. no health data, no fitness sync." },
              { name: "sleep cycle",   price: "$39.99/yr",  cat: "sleep",       catColor: "bg-violet/20 text-violet",   limits: "sleep tracking only. no nutrition or training context." },
            ].map((app) => (
              <div
                key={app.name}
                className="comp-card border-[3px] border-ink bg-card-light/40 rounded-[10px] p-3 md:p-4 text-left font-mono text-xs select-none shadow-v5-sm flex flex-col gap-2"
              >
                <div className="flex justify-between items-start gap-1">
                  <span className="font-sans font-black text-[11px] md:text-sm text-ink leading-tight">{app.name}</span>
                  <span className="bg-alert-light/10 text-alert-light font-bold px-1.5 py-0.5 rounded text-[9px] flex-shrink-0">{app.price}</span>
                </div>
                <span className={`self-start font-mono font-bold text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-[4px] border border-current/20 ${app.catColor}`}>{app.cat}</span>
                <p className="text-[9px] md:text-[10px] text-muted-fg-light font-sans leading-normal">{app.limits}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3.2: THE SOLUTION */}
      <section
        id="sec-solution"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center">
          <div className="lg:col-span-5 flex flex-col justify-center sol-left-panel opacity-0 will-change-gpu">
            <span className="text-pink font-mono text-xs font-semibold tracking-wider block mb-2">
              02 // the unified solution
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter leading-[0.9] text-ink mb-6">
              evidence-based science.
            </h2>
            <p className="text-sm md:text-base font-sans font-medium text-muted-fg-light leading-relaxed">
              tappd in puts calorie math, food logging, training, sleep, hydration, and coaching into one place. every pillar talks to the others. one subscription, the whole stack.
            </p>
          </div>
          <div className="lg:col-span-7 flex flex-col items-center justify-center sol-card-wrapper opacity-0 will-change-gpu">
            {/* 3D Flip Card Container */}
            <div className="w-full max-w-[580px] h-[430px] sm:h-[440px] md:h-[520px] select-none" style={{ perspective: "1200px" }}>
              <div className="sol-card-inner relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                
                {/* CARD FRONT: pricing and branding */}
                <div 
                  className="absolute inset-0 w-full h-full bg-card-light border-[3px] border-ink rounded-[14px] p-4 sm:p-5 md:p-8 shadow-v5 flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Logo size={48} dotColor="#E8FF00" iconColor="#111111" />
                      <div className="flex flex-col">
                        <span className="font-display font-black text-2xl tracking-tighter lowercase leading-none">tappd in</span>
                        <span className="font-mono text-[10px] text-muted-fg-light uppercase tracking-wider">[fitness context engine]</span>
                      </div>
                    </div>
                    <div className="bg-card-light text-ink border-[2px] border-ink px-3 py-1 rounded-full text-xs font-mono font-semibold shadow-v5-sm">
                      beta access open
                    </div>
                  </div>

                  <div className="my-auto flex flex-col gap-4 sm:gap-6">
                    <div className="text-center font-mono">
                      <span className="text-[11px] font-bold text-pink block uppercase tracking-wider mb-1">
                        // simple, honest pricing
                      </span>
                      <h3 className="text-xl sm:text-3xl font-display font-black text-ink lowercase tracking-tight">
                        one sub. all features.
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Monthly sub card */}
                      <div className="border-[2px] border-ink bg-bone rounded-[10px] p-3 sm:p-5 shadow-v5-sm flex flex-col justify-between min-h-[115px] sm:min-h-[140px] relative overflow-hidden">
                        <div className="absolute right-[-24px] top-[12px] rotate-[35deg] bg-pink text-bone text-[8px] font-mono font-bold py-1 px-8 border-b-2 border-ink">
                          beta rate
                        </div>
                        <span className="font-mono text-[10px] sm:text-xs font-bold text-muted-fg-light">monthly plan</span>
                        <div className="mt-1 sm:mt-2 flex flex-col">
                          <span className="text-[11px] sm:text-sm font-mono text-ink/40 line-through">$10/mo</span>
                          <span className="text-xl sm:text-3xl font-display font-black text-ink leading-none">$7.99/mo</span>
                        </div>
                        <span className="font-mono text-[8px] sm:text-[9px] text-muted-fg-light mt-1 sm:mt-3 block">cancel anytime. no commitment.</span>
                      </div>

                      {/* Yearly sub card */}
                      <div className="border-[2px] border-ink bg-volt/15 rounded-[10px] p-3 sm:p-5 shadow-v5-sm flex flex-col justify-between min-h-[115px] sm:min-h-[140px] relative overflow-hidden">
                        <div className="absolute right-[-24px] top-[12px] rotate-[35deg] bg-electric-dark text-bone text-[8px] font-mono font-bold py-1 px-8 border-b-2 border-ink">
                          save 20%
                        </div>
                        <span className="font-mono text-[10px] sm:text-xs font-bold text-muted-fg-light">yearly plan</span>
                        <div className="mt-1 sm:mt-2 flex flex-col">
                          <span className="text-[11px] sm:text-sm font-mono text-ink/40 line-through">$59.99/yr</span>
                          <span className="text-xl sm:text-3xl font-display font-black text-ink leading-none">$47.99/yr</span>
                        </div>
                        <span className="font-mono text-[8px] sm:text-[9px] text-muted-fg-light mt-1 sm:mt-3 block">billed annually. best value.</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-ink/10 pt-3 font-mono text-[9px] sm:text-[10px] text-muted-fg-light">
                    <span>waitlist price is locked at signup. no credit card needed.</span>
                  </div>
                </div>

                {/* CARD BACK: feature checklist */}
                <div 
                  className="absolute inset-0 w-full h-full bg-navy text-bone border-[3px] border-ink rounded-[14px] p-4 sm:p-5 md:p-8 shadow-v5 flex flex-col justify-between"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="flex justify-between items-start border-b border-bone/10 pb-3">
                    <div className="flex items-center gap-3">
                      <Logo size={40} dotColor="#E8FF00" iconColor="#F2ECDE" />
                      <span className="font-display font-black text-xl tracking-tighter text-bone lowercase">what you get</span>
                    </div>
                    <div className="bg-electric text-bone border-[2px] border-bone px-3 py-1 rounded-full text-xs font-mono font-semibold">
                      all-in-one features
                    </div>
                  </div>

                  <div className="my-auto flex flex-col gap-2.5 sm:gap-4 py-2 sm:py-4">
                    {/* Feature 1 */}
                    <div className="sol-feature-item flex items-start gap-2.5 opacity-0">
                      <span className="font-mono text-volt text-xs sm:text-sm font-bold">[01]</span>
                      <div className="flex flex-col">
                        <span className="font-sans font-bold text-xs sm:text-sm text-bone">track your food, four ways</span>
                        <span className="font-sans text-[10px] sm:text-xs text-muted-fg-dark leading-normal">
                          snap a photo, scan a barcode, search it, or just tell the coach what you ate.
                        </span>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="sol-feature-item flex items-start gap-2.5 opacity-0">
                      <span className="font-mono text-volt text-xs sm:text-sm font-bold">[02]</span>
                      <div className="flex flex-col">
                        <span className="font-sans font-bold text-xs sm:text-sm text-bone">build and log your workouts</span>
                        <span className="font-sans text-[10px] sm:text-xs text-muted-fg-dark leading-normal">
                          get a science-based plan made for your week, then log every set right inside it.
                        </span>
                      </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="sol-feature-item flex items-start gap-2.5 opacity-0">
                      <span className="font-mono text-volt text-xs sm:text-sm font-bold">[03]</span>
                      <div className="flex flex-col">
                        <span className="font-sans font-bold text-xs sm:text-sm text-bone">a coach that knows the science</span>
                        <span className="font-sans text-[10px] sm:text-xs text-muted-fg-dark leading-normal">
                          ask anything. every answer is backed by a real study. bring a claim from instagram and it tells you if it holds up.
                        </span>
                      </div>
                    </div>

                    {/* Feature 4 */}
                    <div className="sol-feature-item flex items-start gap-2.5 opacity-0">
                      <span className="font-mono text-volt text-xs sm:text-sm font-bold">[04]</span>
                      <div className="flex flex-col">
                        <span className="font-sans font-bold text-xs sm:text-sm text-bone">a calorie target that is actually yours</span>
                        <span className="font-sans text-[10px] sm:text-xs text-muted-fg-dark leading-normal">
                          we score how much you really move each day, so your number is not a generic guess.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-bone/10 pt-3 font-mono text-[9px] sm:text-[10px] text-muted-fg-dark">
                    <span>*tap any number in the app to read the study behind it.</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FEATURE 01: MAINTENANCE ESTIMATION */}
      <section
        id="sec-f1"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        <div className="flex flex-col gap-3 mb-6 md:mb-10">
          <span className="f1-title text-pink font-mono text-xs font-semibold tracking-wider block opacity-0">
            03 // the foundation
          </span>
          <h2 className="f1-subtitle text-3xl md:text-5xl font-display font-black tracking-tighter leading-none opacity-0">
            get the number right first.
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center">
          <div className="lg:col-span-5 flex flex-col relative f1-text-col opacity-0 will-change-gpu">
            <span className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-ink/5 select-none leading-none mb-1">
              01
            </span>
            <span className="text-pink font-mono text-xs font-semibold tracking-wider block mb-1">
              the foundation
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight mb-3 text-ink leading-tight">
              real maintenance, no guesses
            </h3>
            <p className="text-sm md:text-base font-sans text-muted-fg-light leading-relaxed">
              most apps guess your maintenance calories using generic activity multipliers. get this number wrong, and every deficit, surplus, and macro calculation on top of it is wrong. we calculate it accurately based on your actual lifestyle, steps, and activity. by working with your true maintenance instead of generic guesses, you will reach your goals faster and healthier.
            </p>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-4 w-full f1-card-col opacity-0 will-change-gpu">
            <div
              className="w-full text-left bg-volt text-ink border-[3px] border-ink rounded-[14px] p-6 md:p-8 select-none"
              style={{
                boxShadow: "5px 5px 0px 0px var(--color-ink)",
              }}
            >
              <div>
                <div className="relative inline-block font-mono text-xs sm:text-sm md:text-base opacity-70 mb-3 max-w-full">
                  <span className="hidden sm:inline">
                    what other apps assume you burn: 2,400 kcal
                  </span>
                  <span className="sm:hidden">
                    other apps assume: 2,400 kcal
                  </span>
                  <div
                    id="f1-strike-line"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-alert-light w-full origin-left"
                    style={{
                      transform: "scaleX(0)",
                    }}
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <span className="text-xs font-mono font-semibold tracking-wider text-muted-fg-light mb-1 block">
                    [calculating neat-aware calibration]
                  </span>
                  <span
                    id="f1-kcal-val"
                    className="text-5xl md:text-7xl font-mono font-semibold tracking-tighter leading-none block"
                  >
                    2,400 kcal
                  </span>
                </div>
                <div className="mt-8 text-xs font-mono font-semibold border-t-2 border-ink/20 pt-4 flex justify-between items-center opacity-70">
                  <span>[scored from your real life]</span>
                  <span>recalculates every 3 weeks</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5 mt-2">
              <span className="f1-tag font-mono text-xs border-[2px] border-ink bg-card-light rounded-lg px-4 py-2 shadow-v5-sm opacity-0 translate-y-4">
                desk hours
              </span>
              <span className="f1-tag font-mono text-xs border-[2px] border-ink bg-card-light rounded-lg px-4 py-2 shadow-v5-sm opacity-0 translate-y-4">
                daily steps
              </span>
              <span className="f1-tag font-mono text-xs border-[2px] border-ink bg-card-light rounded-lg px-4 py-2 shadow-v5-sm opacity-0 translate-y-4">
                job type
              </span>
              <span className="f1-tag font-mono text-xs border-[2px] border-ink bg-card-light rounded-lg px-4 py-2 shadow-v5-sm opacity-0 translate-y-4">
                commute
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 02: AI PHOTO SCAN */}
      <section
        id="sec-f2"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        {/* AI scan — left: text, right: scan result card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center">
          <div className="lg:col-span-5 flex flex-col f2-text-col opacity-0">
            <span className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-ink/5 select-none leading-none mb-1">02</span>
            <span className="text-pink font-mono text-xs font-semibold tracking-wider block mb-1">nutrition</span>
            <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight mb-3 text-ink leading-tight">
              snap your plate. get the macros.
            </h3>
            <p className="text-sm md:text-base font-sans text-muted-fg-light leading-relaxed mb-6">
              take a photo of any dish. the app reads what is on the plate, gives you editable weights and portions, and lets you adjust before anything gets logged. nothing is automatic.
            </p>
            <div className="f2-oil-badge bg-volt/15 border-[3px] border-ink rounded-[10px] px-4 py-3 shadow-v5-sm opacity-0">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink/60 block mb-1">⚠ oil detected · roasted cauliflower</span>
              <p className="font-sans font-bold text-sm text-ink">
                roasted means oil. we flag it and make you log it separately. olive oil, ghee, butter. the hidden calories nobody else counts. we do.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 f2-card-col opacity-0">
            <div className="bg-card-light border-[3px] border-ink rounded-[14px] p-4 md:p-6 shadow-v5-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[10px] font-bold text-ink/40 uppercase tracking-wider">snap your plate</span>
                <span className="bg-electric-light text-bone font-mono text-[9px] font-bold px-2.5 py-1 rounded-full border-[2px] border-ink">ai scan</span>
              </div>

              {/* Dual-phase container: photo and ingredients occupy the same space */}
              <div className="relative border-[2px] border-ink/20 rounded-[10px] aspect-square overflow-hidden mb-4">

                {/* PHASE 1 — food photo + scanning beam */}
                <div className="f2-photo-phase absolute inset-0">
                  <img
                    src="/chicken-bowl.jpg"
                    alt="buffalo chicken bowl with brown rice and roasted cauliflower"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-ink/5 via-transparent to-ink/20 pointer-events-none" />
                  <div className="f2-scanning-ui absolute inset-0">
                    <div className="scan-beam-animate h-[2px] bg-electric-light shadow-[0_0_18px_8px_rgba(43,58,255,0.5)]" />
                    <div className="scan-beam-animate h-20 bg-gradient-to-b from-electric-light/12 to-transparent" style={{ marginTop: "-80px" }} />
                    <div className="absolute top-3 left-3 w-7 h-7 border-t-[3px] border-l-[3px] border-electric-light" />
                    <div className="absolute top-3 right-3 w-7 h-7 border-t-[3px] border-r-[3px] border-electric-light" />
                    <div className="absolute bottom-3 left-3 w-7 h-7 border-b-[3px] border-l-[3px] border-electric-light" />
                    <div className="absolute bottom-3 right-3 w-7 h-7 border-b-[3px] border-r-[3px] border-electric-light" />
                  </div>
                </div>

                {/* PHASE 2 — ingredient list, fades in as photo fades out */}
                <div className="f2-ingr-phase absolute inset-0 bg-card-light p-4 flex flex-col opacity-0">
                  <span className="font-mono text-[9px] font-bold text-ink/40 uppercase tracking-wider mb-3">identified ingredients</span>
                  <div className="flex flex-col gap-2.5 flex-1">
                    {[
                      "shredded buffalo chicken",
                      "brown rice, cooked",
                      "roasted cauliflower",
                      "spring onion, sliced",
                      "red chili, fresh",
                      "lemon juice, squeezed",
                      "olive oil (for roasting)",
                    ].map((item) => (
                      <div key={item} className="f2-ingr-item flex items-center gap-2.5 opacity-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-electric-light flex-shrink-0" />
                        <span className="font-sans text-sm font-medium text-ink">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-mono text-[8px] text-muted-fg-light mt-3 pt-2 border-t border-ink/10">
                    * template estimate. confirm and adjust weights before logging.
                  </p>
                </div>
              </div>

              <div className="f2-results-footer flex justify-between items-center pt-2 border-t border-ink/10 opacity-0">
                <span className="font-mono text-[9px] text-muted-fg-light">all weights are editable before logging</span>
                <span className="font-mono text-xs font-black text-electric-light">confirm →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 02B: FOUR WAYS TO LOG */}
      <section
        id="sec-f2b"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        <div className="mb-7 md:mb-12">
          <span className="f2b-title font-mono text-xs font-semibold tracking-wider text-pink block mb-3 opacity-0">02 // logging methods</span>
          <h2 className="f2b-subtitle text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter leading-none opacity-0">
            four ways in.<br/>none of them annoying.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              num: "01",
              title: "ai photo scan",
              body: "snap your plate. the app reads the dish, gives you editable weights, and asks about oil if it was cooked.",
              note: "snap and confirm. nothing auto-logged.",
              accent: "bg-electric-light",
            },
            {
              num: "02",
              title: "barcode scan",
              body: "point at any packaged product. it reads the label and pulls up the macros instantly.",
              note: "over 1.4 million products",
              accent: "bg-orange",
            },
            {
              num: "03",
              title: "manual search",
              body: "search from desi staples, whole foods, and packaged brands. your 30 most recent foods are one tap away.",
              note: "your history pre-loaded",
              accent: "bg-teal",
            },
            {
              num: "04",
              title: "log from chat",
              body: "tell the coach what you ate. it understands, confirms the weights, and logs it without switching screens.",
              note: "just describe it in plain english",
              accent: "bg-violet",
            },
          ].map((m) => (
            <div key={m.num} className="f2b-method border-[3px] border-ink rounded-[12px] bg-card-light p-5 shadow-v5-sm opacity-0 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-muted-fg-light">{m.num}</span>
                <div className={`w-2.5 h-2.5 rounded-full ${m.accent} border-[2px] border-ink`} />
              </div>
              <h4 className="font-display font-black text-lg tracking-tight text-ink leading-tight">{m.title}</h4>
              <p className="font-sans text-sm text-muted-fg-light leading-relaxed flex-1">{m.body}</p>
              <span className="font-mono text-[9px] text-ink/35 uppercase tracking-wider">{m.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE 03: WORKOUT GENERATOR */}
      <section
        id="sec-f3"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center">
          <div className="lg:col-span-5 flex flex-col f3-text-col opacity-0">
            <span className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-ink/5 select-none leading-none mb-1">03</span>
            <span className="text-pink font-mono text-xs font-semibold tracking-wider block mb-1">workout generator</span>
            <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight mb-3 text-ink leading-tight">
              built around your week, not a template.
            </h3>
            <p className="text-sm md:text-base font-sans text-muted-fg-light leading-relaxed mb-5">
              tell us how many days you can train, how long each session, what equipment you have, your experience level, and how hard you want to push. we generate a split with volume targets backed by research, and every exercise carries a rationale.
            </p>
            <div className="flex flex-wrap gap-2">
              {["days per week", "session length", "equipment", "experience", "intensity", "injury notes"].map((chip) => (
                <span key={chip} className="f3-input-chip font-mono text-[9px] font-bold uppercase tracking-wide border-[2px] border-ink rounded-[6px] px-2.5 py-1 bg-card-light shadow-v5-sm opacity-0">{chip}</span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 f3-card-col opacity-0">
            <div className="bg-card-light border-[3px] border-ink rounded-[14px] p-4 md:p-6 shadow-v5-lg">
              <div className="flex justify-between items-center mb-5 pb-4 border-b border-ink/10">
                <span className="font-mono text-[10px] font-bold text-ink/40 uppercase tracking-wider">generated plan</span>
                <span className="bg-volt text-ink border-[2px] border-ink font-mono text-[9px] font-bold px-2.5 py-1 rounded-[6px]">push · pull · legs</span>
              </div>
              {/* Week layout */}
              <div className="flex flex-col gap-1.5 mb-5">
                {[
                  { day: "mon", name: "push A", muscles: "chest · shoulders · triceps",   active: true  },
                  { day: "tue", name: "pull A", muscles: "back · biceps · rear delts",    active: false },
                  { day: "wed", name: "rest",   muscles: "active recovery",               active: false },
                  { day: "thu", name: "legs A", muscles: "quads · hamstrings · glutes",   active: false },
                  { day: "fri", name: "push B", muscles: "chest · shoulders · triceps",   active: false },
                  { day: "sat", name: "pull B", muscles: "back · biceps",                 active: false },
                ].map((row) => (
                  <div key={row.day} className={`f3-day-chip flex justify-between items-center font-mono text-[11px] px-3 py-2 rounded-[8px] border-[2px] border-ink opacity-0 ${row.active ? "bg-volt text-ink shadow-v5-sm" : "bg-bone text-muted-fg-light"}`}>
                    <div className="flex items-center gap-3">
                      <span className={`font-bold text-[10px] uppercase ${row.active ? "text-ink" : "text-electric-light"}`}>{row.day}</span>
                      <span className={`font-bold ${row.active ? "text-ink" : "text-ink/70"}`}>{row.name}</span>
                    </div>
                    <span className={`text-[9px] ${row.active ? "text-ink/60" : "text-ink/30"}`}>{row.muscles}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-ink/10">
                <span className="font-mono text-[9px] text-muted-fg-light">*volume targets cite schoenfeld et al. 2017</span>
                <span className="bg-teal/15 border border-teal/40 text-teal font-mono text-[8px] font-bold px-2 py-0.5 rounded">evidence-based</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 03B: WORKOUT LOGGER */}
      <section
        id="sec-f3b"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center">
          {/* LEFT: active session card */}
          <div className="lg:col-span-7 f3b-card-col opacity-0">
            <div className="bg-navy text-bone border-[3px] border-ink rounded-[14px] p-4 md:p-6 shadow-v5-lg">
              <div className="flex justify-between items-center mb-5 pb-4 border-b border-bone/10">
                <div>
                  <span className="font-mono text-[9px] text-bone/40 uppercase tracking-wider block">active session</span>
                  <span className="font-display font-black text-xl text-bone tracking-tight">push day A</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-volt" />
                  </span>
                  <span className="font-mono text-[9px] font-bold text-volt uppercase">logging</span>
                </div>
              </div>
              {/* Exercise block */}
              <div className="mb-4">
                <div className="flex justify-between items-baseline mb-3">
                  <span className="font-display font-black text-lg text-bone tracking-tight">incline dumbbell press</span>
                  <span className="font-mono text-[9px] text-bone/40">4 sets · 8-12 reps · RIR 2</span>
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { set: "set 1", weight: "34 kg", reps: "10", status: "logged" },
                    { set: "set 2", weight: "34 kg", reps: "9",  status: "logged" },
                    { set: "set 3", weight: "34 kg", reps: "8",  status: "logged" },
                    { set: "set 4", weight: "34 kg", reps: "",   status: "active" },
                  ].map((row, i) => (
                    <div key={i} className={`f3b-set-row flex justify-between items-center font-mono text-xs px-3 py-2 rounded-[8px] border-[2px] opacity-0 ${row.status === "logged" ? "border-bone/15 bg-bone/5 text-bone/70" : "border-volt bg-volt/10 text-volt"}`}>
                      <span>{row.set}</span>
                      <span>{row.weight}</span>
                      <span>{row.reps ? `${row.reps} reps` : "logging..."}</span>
                      <span className={`text-[9px] font-bold ${row.status === "logged" ? "text-bone/30" : "text-volt"}`}>{row.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* PR row */}
              <div className="f3b-pr-row bg-volt/10 border border-volt/30 rounded-[8px] px-3 py-2 mb-4 opacity-0">
                <span className="font-mono text-[9px] font-bold text-volt uppercase tracking-wide block">pr matched</span>
                <span className="font-mono text-[10px] text-bone/70">34kg x 10 ties your best. push to 36kg next session.</span>
              </div>
              {/* Volume bars */}
              <div className="border-t border-bone/10 pt-4">
                <span className="font-mono text-[9px] text-bone/35 uppercase tracking-wider block mb-2.5">weekly volume so far</span>
                {[
                  { muscle: "chest",     sets: 14, max: 20 },
                  { muscle: "shoulders", sets: 10, max: 20 },
                  { muscle: "triceps",   sets: 8,  max: 20 },
                ].map((v) => (
                  <div key={v.muscle} className="flex items-center gap-3 mb-1.5">
                    <span className="font-mono text-[8px] text-bone/45 w-16 flex-shrink-0">{v.muscle}</span>
                    <div className="flex-1 bg-bone/8 h-1.5 rounded-full overflow-hidden">
                      <div className="f3b-vol-bar h-full bg-volt rounded-full opacity-0" style={{ width: `${(v.sets / v.max) * 100}%` }} />
                    </div>
                    <span className="font-mono text-[8px] text-bone/40 w-10 text-right">{v.sets}/20</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* RIGHT: text */}
          <div className="lg:col-span-5 flex flex-col f3b-text-col opacity-0">
            <span className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-ink/5 select-none leading-none mb-1">03b</span>
            <span className="text-pink font-mono text-xs font-semibold tracking-wider block mb-1">workout logger</span>
            <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight mb-3 text-ink leading-tight">
              log every set. the data does the rest.
            </h3>
            <p className="text-sm md:text-base font-sans text-muted-fg-light leading-relaxed mb-5">
              your generated plan becomes your active session. log weight, reps, and reps-in-reserve for every set. personal records track themselves. close the app mid-session and your progress is still there when you come back.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { title: "automatic PR detection",     body: "every lift is matched to your history. no manual tracking." },
                { title: "live volume tracker",         body: "weekly sets per muscle update as you log, showing exactly where you stand." },
                { title: "rest timers + tempo cues",   body: "built into every exercise. never guess how long to rest." },
                { title: "crash recovery",             body: "close the app mid-session. your active workout is still there when you come back." },
              ].map((f) => (
                <div key={f.title} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange mt-[7px] flex-shrink-0" />
                  <div>
                    <span className="font-mono text-[10px] font-bold text-ink uppercase tracking-wide block mb-0.5">{f.title}</span>
                    <span className="font-sans text-sm text-muted-fg-light">{f.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 05: SLEEP & RECOVERY */}
      <section
        id="sec-sleep"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center">
          {/* LEFT: text */}
          <div className="lg:col-span-5 flex flex-col sleep-text-col opacity-0">
            <span className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-ink/5 select-none leading-none mb-1">05</span>
            <span className="text-violet font-mono text-xs font-semibold tracking-wider block mb-1">recovery // the third pillar</span>
            <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight mb-3 text-ink leading-tight">
              your recovery, finally in the equation.
            </h3>
            <p className="text-sm md:text-base font-sans text-muted-fg-light leading-relaxed mb-5">
              nutrition and training only pay off if you recover. sync sleep straight from apple health, oura, whoop, or garmin - or log it by hand in two taps. we score the night, track your trend, and feed it back into your calories and training load. now it's the full stack: fuel, train, recover.
            </p>
            <div className="flex flex-wrap gap-2">
              {["apple health", "oura", "whoop", "garmin", "manual"].map((src) => (
                <span key={src} className="sleep-source font-mono text-[9px] font-bold uppercase tracking-wide border-[2px] border-ink rounded-[6px] px-2.5 py-1 bg-card-light shadow-v5-sm opacity-0">{src}</span>
              ))}
            </div>
          </div>
          {/* RIGHT: sleep card */}
          <div className="lg:col-span-7 sleep-card-col opacity-0">
            <div className="bg-navy text-bone border-[3px] border-ink rounded-[14px] p-4 md:p-6 shadow-v5-lg">
              <div className="flex justify-between items-center mb-5 pb-4 border-b border-bone/10">
                <div>
                  <span className="font-mono text-[9px] text-bone/40 uppercase tracking-wider block">last night</span>
                  <span className="font-display font-black text-xl text-bone tracking-tight lowercase">sleep report</span>
                </div>
                <span className="bg-teal/15 border-[2px] border-teal/40 text-teal font-mono text-[9px] font-bold px-2.5 py-1 rounded-full">synced · apple health</span>
              </div>
              {/* duration + score */}
              <div className="flex items-end justify-between mb-5">
                <div className="sleep-stat flex flex-col">
                  <span className="font-mono text-[9px] text-bone/40 uppercase tracking-wider mb-1">time asleep</span>
                  <span className="font-mono font-black text-4xl md:text-5xl text-bone leading-none tracking-tight">7h 12m</span>
                </div>
                <div className="sleep-stat flex flex-col items-center bg-bone/5 border-[2px] border-bone/15 rounded-[10px] px-4 py-2">
                  <span className="font-mono text-[8px] text-bone/40 uppercase tracking-wider">score</span>
                  <span className="font-mono font-black text-3xl text-teal leading-none">84</span>
                </div>
              </div>
              {/* stage bar */}
              <div className="mb-2">
                <div className="flex h-6 rounded-[6px] overflow-hidden border-[2px] border-ink">
                  <div className="sleep-stage bg-electric-light" style={{ width: "22%" }} />
                  <div className="sleep-stage bg-violet" style={{ width: "24%" }} />
                  <div className="sleep-stage bg-teal" style={{ width: "48%" }} />
                  <div className="sleep-stage bg-bone/20" style={{ width: "6%" }} />
                </div>
                <div className="flex justify-between mt-2 font-mono text-[8px] text-bone/45 uppercase tracking-wide">
                  <span><span className="text-electric-light">■</span> deep 1h36</span>
                  <span><span className="text-violet">■</span> rem 1h44</span>
                  <span><span className="text-teal">■</span> light 3h28</span>
                  <span><span className="text-bone/40">■</span> awake 24m</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-3 mt-3 border-t border-bone/10 font-mono text-[9px] text-bone/40">
                <span>*fed into today's calorie + training load.</span>
                <span className="text-teal font-bold">+12 min vs your avg</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 06: HYDRATION */}
      <section
        id="sec-hydration"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center">
          {/* LEFT: hydration card */}
          <div className="lg:col-span-7 hydr-card-col opacity-0">
            <div className="bg-card-light border-[3px] border-ink rounded-[14px] p-4 md:p-6 shadow-v5-lg">
              <div className="flex justify-between items-center mb-5">
                <span className="font-mono text-[10px] font-bold text-ink/40 uppercase tracking-wider">hydration · today</span>
                <span className="bg-electric-light text-bone font-mono text-[9px] font-bold px-2.5 py-1 rounded-full border-[2px] border-ink">tap to add</span>
              </div>
              {/* total */}
              <div className="flex items-end gap-2 mb-4">
                <span className="hydr-total font-mono font-black text-4xl md:text-5xl text-ink leading-none tracking-tight">1.8L</span>
                <span className="font-mono text-sm text-ink/40 mb-1">/ 2.5L goal</span>
              </div>
              {/* glasses - SVG-based for real glass shape */}
              <div className="grid grid-cols-8 gap-1.5 mb-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="hydr-glass opacity-0 flex flex-col items-center">
                    <svg viewBox="0 0 32 48" width="100%" className="overflow-visible">
                      {/* glass outline */}
                      <path
                        d="M4 4 L28 4 L24 44 Q24 46 20 46 L12 46 Q8 46 8 44 Z"
                        fill={i < 6 ? "rgba(232,255,0,0.12)" : "rgba(17,17,17,0.04)"}
                        stroke="#111111"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      {/* water fill */}
                      {i < 6 && (
                        <clipPath id={`glass-clip-${i}`}>
                          <path d="M4.5 4.5 L27.5 4.5 L23.7 43.5 Q23.7 45.2 20 45.2 L12 45.2 Q8.3 45.2 8.3 43.5 Z" />
                        </clipPath>
                      )}
                      {i < 6 && (
                        <rect
                          x="0" y="4" width="32" height="42"
                          fill="#E8FF00"
                          fillOpacity="0.75"
                          clipPath={`url(#glass-clip-${i})`}
                        />
                      )}
                      {/* rim highlight */}
                      <line x1="5" y1="7" x2="27" y2="7" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round" />
                      {/* + on unfilled glass */}
                      {i === 6 && (
                        <text x="16" y="29" textAnchor="middle" fontFamily="'Geist Mono',monospace" fontSize="14" fontWeight="900" fill="rgba(17,17,17,0.3)">+</text>
                      )}
                    </svg>
                  </div>
                ))}
              </div>
              <span className="font-mono text-[9px] text-ink/35 block mb-4">each glass = 300ml · tap to log, hold to set a custom amount</span>
              {/* electrolytes */}
              <div className="border-t border-ink/10 pt-4">
                <span className="font-mono text-[9px] font-bold text-ink/40 uppercase tracking-wider block mb-3">electrolytes - not just water</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { n: "sodium", v: "1.6 / 2g", pct: 80, c: "bg-orange" },
                    { n: "potassium", v: "2.9 / 3.5g", pct: 72, c: "bg-violet" },
                    { n: "magnesium", v: "310 / 400mg", pct: 64, c: "bg-teal" },
                  ].map((e) => (
                    <div key={e.n} className="hydr-electro opacity-0">
                      <span className="font-sans font-bold text-[10px] text-ink block mb-1">{e.n}</span>
                      <div className="h-1.5 bg-ink/10 rounded-full overflow-hidden mb-1"><div className={`h-full ${e.c} rounded-full`} style={{ width: `${e.pct}%` }} /></div>
                      <span className="font-mono text-[8px] text-ink/45">{e.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT: text */}
          <div className="lg:col-span-5 flex flex-col hydr-text-col opacity-0">
            <span className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-ink/5 select-none leading-none mb-1">06</span>
            <span className="text-electric-light font-mono text-xs font-semibold tracking-wider block mb-1">hydration // beyond water</span>
            <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight mb-3 text-ink leading-tight">
              hydration is more than ounces.
            </h3>
            <p className="text-sm md:text-base font-sans text-muted-fg-light leading-relaxed">
              tap a glass, log 300ml - the fastest way to stay on top of water. but real hydration is electrolytes too. we track sodium, potassium, and magnesium against targets scaled to your sweat, training, and climate, so you actually absorb the water instead of just drinking it.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURE 04: THE AI COACH */}
      <section
        id="sec-f4"
        className="w-full flex flex-col justify-center max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        <div className="flex flex-col items-center text-center mb-6 md:mb-12 f4-text-col opacity-0 will-change-gpu">
          <span className="text-pink font-mono text-xs font-semibold tracking-wider block mb-2 uppercase">
            04 // the coach
          </span>
          <h3 className="text-3xl md:text-5xl font-display font-black tracking-tight mb-4 text-ink leading-tight lowercase">
            science-backed coaching
          </h3>
          <p className="text-sm md:text-base font-sans text-muted-fg-light leading-relaxed max-w-2xl">
            the coach knows your numbers. your calories today, your last workout, how your training volume is stacking up, what you ate. it answers from that context, not from a generic playbook. every response cites a study. no bro science, no invented claims. and now you can just talk to it - ask out loud mid-workout and hear the answer back.
          </p>
        </div>

        <div 
          id="f4-coach-chat" 
          className="w-full max-w-2xl mx-auto bg-navy text-bone border-[3px] border-ink rounded-[14px] p-4 sm:p-5 md:p-8 shadow-v5 flex flex-col justify-between sm:min-h-[360px] md:min-h-[420px] f4-card-col opacity-0 will-change-gpu"
        >
          <div>
            <div className="flex justify-between items-start mb-5 border-b border-bone/10 pb-4">
              <div className="flex items-center gap-3">
                <Logo size={40} dotColor="#E8FF00" iconColor="#F2ECDE" />
                <div className="flex flex-col text-left">
                  <span className="font-display font-black text-xl tracking-tighter text-bone lowercase leading-none">tappd coach</span>
                  <span className="font-mono text-[9px] text-muted-fg-dark uppercase tracking-wider mt-1">[active · voice enabled]</span>
                </div>
              </div>
              <div className="bg-volt text-ink border-[2px] border-ink px-3 py-1 rounded-full text-xs font-mono font-semibold animate-pulse shadow-v5-sm">
                active
              </div>
            </div>
            
            <div className="flex flex-col gap-3 font-mono text-xs mb-4 mt-2">
              {/* User turn 1 */}
              <div className="f4-chat-bubble self-end max-w-[78%] bg-bone/10 border border-bone/20 text-bone rounded-[10px] px-3 py-2.5 text-right opacity-0 text-[11px] font-sans">
                why's my bench stalling?
              </div>

              {/* Coach turn 1 */}
              <div className="f4-chat-bubble self-start max-w-[95%] bg-card-light text-ink rounded-[10px] px-4 py-3 text-left font-sans leading-snug border-[3px] border-ink shadow-v5-sm opacity-0 relative text-[11px] sm:text-xs">
                <div className="absolute -top-3 left-3 bg-pink text-bone border-[2px] border-ink px-2 py-0.5 rounded text-[8px] font-mono uppercase tracking-wider select-none">coach</div>
                your protein averaged 133g over the past 3 days. your target is 165g. that's a 32g gap on your hardest recovery days. under-fuelled repair slows strength gains even when training is consistent.
              </div>

              {/* Study citation */}
              <div className="f4-chat-bubble self-start flex items-center gap-2 bg-teal/10 border border-teal/30 rounded-[8px] px-3 py-2 opacity-0">
                <span className="bg-teal/15 border border-teal/35 text-teal font-mono text-[7px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide flex-shrink-0">study</span>
                <span className="font-mono text-[10px] text-bone/60">Morton RW et al. · Br J Sports Med · 2018</span>
              </div>

              {/* User turn 2 */}
              <div className="f4-chat-bubble self-end max-w-[78%] bg-bone/10 border border-bone/20 text-bone rounded-[10px] px-3 py-2.5 text-right opacity-0 text-[11px] font-sans">
                i thought i was eating enough
              </div>

              {/* Coach turn 2 */}
              <div className="f4-chat-bubble self-start max-w-[95%] bg-navy/80 border border-bone/15 text-bone rounded-[10px] px-4 py-3 text-left font-sans leading-snug opacity-0 text-[11px]">
                your calorie total was fine - you hit close to your target. the protein was the gap. carbs and fat filled those calories instead. same total, wrong split.
                <div className="mt-2 pt-2 border-t border-bone/10 font-mono text-[9px] text-bone/40">
                  23g short tonight. want me to build a meal around closing it?
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            <div className="bg-bone/5 border border-bone/10 text-bone/45 text-[10px] font-mono px-3 py-2.5 rounded-[8px] flex items-center gap-3 select-none">
              {/* mic button */}
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-pink border-[2px] border-ink flex items-center justify-center">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0d0f1c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="2" width="6" height="11" rx="3" fill="#0d0f1c" stroke="none" />
                  <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                </svg>
              </span>
              {/* live waveform */}
              <span className="flex items-center gap-[3px] h-4 flex-1">
                {[40, 75, 55, 95, 60, 85, 45, 70, 50, 90, 55, 65, 42, 80, 50].map((h, i) => (
                  <span key={i} className="voice-bar w-[3px] bg-volt rounded-full" style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }} />
                ))}
              </span>
              <span className="flex-shrink-0 text-bone/50">hold to talk</span>
            </div>
            <div className="pt-3 border-t border-bone/10 flex justify-between items-center select-none text-[9px] text-bone/45 font-mono">
              <span>*every response cites a real study. ask it to show you.</span>
              <span className="font-bold">coach active</span>
            </div>
          </div>
        </div>

      </section>

      {/* FEATURE 07: STREAK RINGS */}
      <section
        id="sec-streak"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center">
          {/* LEFT: text */}
          <div className="lg:col-span-5 flex flex-col streak-text-col opacity-0">
            <span className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-ink/5 select-none leading-none mb-1">07</span>
            <span className="text-pink font-mono text-xs font-semibold tracking-wider block mb-1">consistency // the four rings</span>
            <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight mb-3 text-ink leading-tight">
              close four rings. keep the streak.
            </h3>
            <p className="text-sm md:text-base font-sans text-muted-fg-light leading-relaxed mb-5">
              one ring per pillar - nutrition, hydration, sleep, and training. hit all four targets in a day and the day counts. miss one and the ring stays open. no vanity metrics, no participation trophies: the streak only moves when you do the work across every pillar.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { n: "nutrition", c: "bg-orange" },
                { n: "hydration", c: "bg-electric-light" },
                { n: "sleep", c: "bg-violet" },
                { n: "training", c: "bg-pink" },
              ].map((p) => (
                <span key={p.n} className="streak-legend flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wide border-[2px] border-ink rounded-[6px] px-2.5 py-1 bg-card-light shadow-v5-sm opacity-0">
                  <span className={`w-2 h-2 rounded-full ${p.c} border border-ink`} />{p.n}
                </span>
              ))}
            </div>
          </div>
          {/* RIGHT: rings card */}
          <div className="lg:col-span-7 streak-card-col opacity-0">
            <div className="bg-navy text-bone border-[3px] border-ink rounded-[14px] p-5 md:p-8 shadow-v5-lg flex flex-col sm:flex-row items-center gap-6 md:gap-8">
              {/* rings */}
              <div className="relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] flex-shrink-0">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  {[
                    { r: 90, c: "var(--color-orange)" },
                    { r: 68, c: "var(--color-electric-light)" },
                    { r: 46, c: "var(--color-violet)" },
                    { r: 24, c: "var(--color-pink)" },
                  ].map((ring, i) => {
                    const C = 2 * Math.PI * ring.r;
                    return (
                      <g key={i}>
                        <circle cx="100" cy="100" r={ring.r} fill="none" stroke="rgba(231,218,187,0.10)" strokeWidth="15" />
                        <circle
                          className="streak-ring"
                          cx="100" cy="100" r={ring.r}
                          fill="none" stroke={ring.c} strokeWidth="15" strokeLinecap="butt"
                          strokeDasharray={C} strokeDashoffset={C} data-c={C}
                        />
                      </g>
                    );
                  })}
                </svg>
                {/* center streak count */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="streak-count font-mono font-black text-4xl text-bone leading-none">12</span>
                  <span className="font-mono text-[8px] text-bone/50 uppercase tracking-[0.2em] mt-1">day streak</span>
                </div>
              </div>
              {/* breakdown */}
              <div className="flex-1 w-full flex flex-col gap-3">
                <div className="flex items-center justify-between pb-3 border-b border-bone/10">
                  <span className="font-display font-black text-lg text-bone tracking-tight lowercase">today's rings</span>
                  <span className="bg-volt text-ink border-[2px] border-ink font-mono text-[8px] font-black px-2 py-0.5 rounded-full uppercase">4 / 4 closed</span>
                </div>
                {[
                  { n: "nutrition", v: "2,050 / 2,050 kcal", dot: "bg-orange" },
                  { n: "hydration", v: "2.5 / 2.5 L", dot: "bg-electric-light" },
                  { n: "sleep", v: "7h 12m · scored", dot: "bg-violet" },
                  { n: "training", v: "push day a · done", dot: "bg-pink" },
                ].map((row) => (
                  <div key={row.n} className="streak-row flex items-center justify-between opacity-0">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${row.dot} border border-bone/30`} />
                      <span className="font-sans font-bold text-xs text-bone">{row.n}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-bone/50">{row.v}</span>
                      <span className="font-mono text-teal text-xs font-black">✓</span>
                    </div>
                  </div>
                ))}
                <div className="pt-3 border-t border-bone/10 font-mono text-[9px] text-bone/40">
                  *all four closed today - streak safe. longest: 41 days.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: WHY BUTTON */}
      <section
        id="sec-why"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">

          {/* LEFT */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <span className="why-title font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-teal opacity-0">
              BUILT INTO EVERY SCREEN
            </span>
            <div className="why-subtitle opacity-0">
              <h2 className="font-display font-black text-[2rem] md:text-[3rem] lg:text-[3.6rem] tracking-tighter leading-[0.9] text-ink">
                tap why.<br />read the paper.
              </h2>
            </div>
            <p className="why-desc font-sans font-medium text-base md:text-lg text-muted-fg-light leading-relaxed max-w-md opacity-0">
              everywhere the app gives you a number or tells you to do something, there is a yellow <span className="bg-volt border border-ink text-ink font-mono text-[10px] font-black px-1.5 py-0.5 rounded-[4px] mx-0.5">why?</span> chip. tap it. you get the study in plain english, the confidence level, and a link straight to the real paper.
            </p>
            <div className="why-desc flex flex-col gap-4 opacity-0">
              {[
                { label: "plain english tldr", desc: "what the study actually found, in two sentences. no jargon." },
                { label: "confidence level", desc: "high, moderate, or emerging. so you know how settled the science is." },
                { label: "the real study", desc: "one tap opens the actual paper. read it yourself. verify us." },
              ].map((f) => (
                <div key={f.label} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal mt-[7px] flex-shrink-0" />
                  <div>
                    <span className="font-mono text-[10px] font-bold text-ink uppercase tracking-wide block mb-0.5">{f.label}</span>
                    <span className="font-sans text-sm text-muted-fg-light leading-relaxed">{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — live demo card */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <div className="why-card opacity-0 w-full max-w-lg">
              <div className="bg-card-light border-[3px] border-ink rounded-[14px] overflow-hidden shadow-v5-lg">

                {/* App-style header bar */}
                <div className="bg-navy px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Logo size={28} dotColor="#E8FF00" iconColor="#F2ECDE" />
                    <span className="font-display font-black text-base text-bone tracking-tight">your targets</span>
                  </div>
                  <span className="font-mono text-[9px] text-bone/35 uppercase tracking-wider">tap why? for the study</span>
                </div>

                {/* Target rows */}
                <div className="px-5 divide-y divide-ink/8">
                  {[
                    { label: "maintenance", val: "2,050 kcal", active: false },
                    { label: "fat loss target", val: "1,710 kcal", active: false },
                    { label: "protein target", val: "160g", active: true },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center py-3.5">
                      <span className="font-sans text-sm font-medium text-muted-fg-light">{row.label}</span>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-sm font-black text-ink">{row.val}</span>
                        <span className={`border-[2px] border-ink font-mono text-[9px] font-black px-1.5 py-0.5 rounded-[5px] shadow-v5-sm select-none cursor-pointer ${row.active ? "bg-volt text-ink" : "bg-bone text-ink/35"}`}>
                          why?
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Open evidence panel */}
                <div className="mx-4 my-4 bg-navy rounded-[10px] p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <span className="font-mono text-[9px] font-bold text-teal uppercase tracking-wider">protein target · 160g</span>
                      <p className="font-sans text-sm text-bone/85 leading-relaxed mt-2">
                        1.6 to 2.4g per kg of bodyweight maximises muscle growth. past this range, extra protein has no measurable benefit.
                      </p>
                    </div>
                    <span className="bg-teal/15 border border-teal/35 text-teal font-mono text-[7px] font-bold px-2 py-0.5 rounded uppercase tracking-wide flex-shrink-0 mt-0.5">HIGH</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-bone/10">
                    <div>
                      <span className="font-mono text-[8px] text-bone/45 block">Morton RW et al.</span>
                      <span className="font-mono text-[8px] text-bone/30">British Journal of Sports Medicine · 2018</span>
                    </div>
                    <span className="bg-teal/15 border border-teal/35 text-teal font-mono text-[9px] font-bold px-3 py-1.5 rounded-[6px] flex items-center gap-1">
                      read study →
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: THE SCIENCE LIBRARY */}
      <section
        id="sec-sys"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        <div className="flex flex-col gap-4 mb-6 md:mb-10">
          <span className="sys-title text-teal font-mono text-xs font-semibold tracking-wider block opacity-0">
            05 // the science
          </span>
          <h2 className="sys-subtitle text-3xl md:text-5xl font-display font-black tracking-tighter leading-none opacity-0">
            a citation behind every number.
          </h2>
          <p className="sys-desc text-base md:text-lg font-sans font-medium text-muted-fg-light max-w-2xl opacity-0">
            tap any calorie target, macro split, or training recommendation in the app. a card opens with the claim in plain english, a confidence rating, and a link to the actual study. open it. read it. verify us.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              category: "PROTEIN",
              claim: "1.6 to 2.4g of protein per kg is all you need to maximise muscle growth. past that, the extra does nearly nothing.",
              author: "morton rw et al.",
              journal: "br j sports med",
              year: "2018",
            },
            {
              category: "FAT LOSS",
              claim: "a 300 to 500 kcal deficit loses fat at a sustainable rate without the muscle loss or metabolic adaptation that crash diets cause.",
              author: "hall kd et al.",
              journal: "obesity",
              year: "2012",
            },
            {
              category: "TRAINING VOLUME",
              claim: "10 to 20 sets per muscle per week is the evidence-based sweet spot for hypertrophy. under 10 you leave gains on the table.",
              author: "schoenfeld bj et al.",
              journal: "j strength cond res",
              year: "2017",
            },
            {
              category: "NEAT",
              claim: "daily movement outside the gym can vary calorie burn by up to 2,000 kcal between two people of the same size. most apps ignore this.",
              author: "levine ja et al.",
              journal: "science",
              year: "1999",
            },
          ].map((card) => (
            <div key={card.category} className="sys-card bg-navy text-bone border-[3px] border-ink rounded-[12px] p-5 shadow-v5-sm opacity-0 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[9px] font-bold text-teal uppercase tracking-wider">{card.category}</span>
                <span className="bg-teal/15 border border-teal/35 text-teal font-mono text-[7px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wide">
                  HIGH
                </span>
              </div>
              <p className="font-sans text-sm text-bone/90 leading-relaxed flex-1 mb-5">
                {card.claim}
              </p>
              <div className="border-t border-bone/10 pt-3 mt-auto">
                <span className="font-mono text-[8.5px] text-bone/45 block leading-relaxed">
                  {card.author} · {card.journal} · {card.year}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="sys-card mt-8 font-mono text-[10px] text-muted-fg-light text-center opacity-0">
          every card in the app carries a real doi. tap it and the paper opens. we show our work.
        </p>
      </section>

      {/* SECTION FAQ */}
      <section
        id="sec-faq"
        className="w-full flex flex-col justify-center max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        <div className="flex flex-col gap-3 mb-6 md:mb-10">
          <span className="faq-title text-pink font-mono text-xs font-semibold tracking-wider block opacity-0">
            06 // faq
          </span>
          <h2 className="faq-subtitle text-3xl md:text-5xl font-display font-black tracking-tighter leading-none opacity-0">
            fair questions.
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {[
            {
              q: "is it actually evidence-based, or is that marketing?",
              a: "every number in the app links to a published study. tap any calorie target, macro recommendation, or training guideline and you get the paper, the confidence level, and a plain-english summary. we cap protein at 1.6 to 2.4g per kg because that is what the meta-analyses show. not our opinion, the research.",
            },
            {
              q: "why is your calorie number different from other apps?",
              a: "other apps apply a generic activity multiplier. we score your actual movement: daily steps, sitting hours, job type, commute. for a desk job with under 5,000 steps, the real maintenance is often 300 to 400 kcal lower than what other apps give you. that gap is why progress stalls.",
            },
            {
              q: "do i need an account to get started?",
              a: "no. you can see your real maintenance target in about two minutes with no account needed. accounts unlock cross-device sync.",
            },
            {
              q: "android or ios?",
              a: "android first, ios shortly after. join the waitlist and you receive your download link on launch day.",
            },
            {
              q: "what exactly does the 20% off lock in?",
              a: "join before launch and your price is fixed: $7.99 per month on the monthly plan or $47.99 per year on the yearly plan. after launch both prices increase. no action needed after joining - the rate is locked at the moment you submit.",
            },
            {
              q: "what happens to my email after i join?",
              a: "one email on launch day with your download link. nothing else. no drip campaigns, no newsletters, no upsells. you decide what to do from there.",
            },
          ].map((item) => (
            <details
              key={item.q}
              className="faq-item group border-[3px] border-ink rounded-[10px] bg-card-light shadow-v5-sm overflow-hidden opacity-0 will-change-gpu"
            >
              <summary className="flex justify-between items-center px-5 py-4 cursor-pointer select-none list-none font-sans font-bold text-sm md:text-base text-ink gap-4">
                <span>{item.q}</span>
                <span className="flex-shrink-0 font-mono text-base font-black text-ink group-open:rotate-45 transition-transform duration-200 w-5 h-5 flex items-center justify-center border-[2px] border-ink rounded-[4px]">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 pt-1 font-sans text-sm text-muted-fg-light leading-relaxed border-t border-ink/10">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* SECTION 7: FOOTER & WAITING LIST */}
      <section
        id="sec-foot"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 md:min-h-screen"
      >
        <div className="foot-box bg-navy text-bone border-[3px] border-ink rounded-[14px] p-8 md:p-12 shadow-v5-lg flex flex-col justify-between gap-12 opacity-0 will-change-gpu">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-bone/10 pb-8">
            <div className="max-w-2xl flex flex-col gap-4">
              <span className="foot-badge text-volt font-mono text-xs font-semibold tracking-wider opacity-0">
                waitlist · early access pricing
              </span>
              <h2 className="foot-title text-3xl md:text-5xl lg:text-7xl font-display font-black tracking-tighter leading-[0.9] text-bone flex flex-wrap items-center gap-3 opacity-0">
                <span>stop guessing.</span>
                <span className="foot-headline inline-flex items-center gap-3 text-volt opacity-0">
                  <Logo
                    size={64}
                    dotColor="#E8FF00"
                    iconColor="#F2ECDE"
                    className="translate-y-2"
                  />
                  tappd in.
                </span>
              </h2>
              <p className="foot-desc text-base md:text-lg font-sans font-medium text-muted-fg-dark leading-relaxed max-w-md opacity-0">
                one email on launch day. your price is locked the moment you submit. no spam, no upsells, no surprise charges.
              </p>
            </div>
            <div className="bg-volt text-ink border-[3px] border-ink rounded-[10px] p-5 shadow-v5-lg-dark max-w-xs select-none">
              <span className="font-mono text-xs font-semibold block mb-1">
                EARLY ACCESS PRICING. LOCKED AT SIGNUP.
              </span>
              <span className="text-2xl font-display font-black leading-none block">
                20% off. forever.
              </span>
              <div className="mt-3 flex flex-col gap-1.5 font-mono text-[10px] text-ink/70">
                <div className="flex justify-between items-center">
                  <span>monthly</span>
                  <span><span className="line-through">$10/mo</span> → <span className="font-black text-ink">$7.99/mo</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span>yearly</span>
                  <span><span className="line-through">$59.99/yr</span> → <span className="font-black text-ink">$47.99/yr</span></span>
                </div>
              </div>
              <p className="text-[10px] font-mono mt-2 text-ink/60">
                no credit card required. price locks the moment you join.
              </p>
            </div>
          </div>
          <div className="w-full">
            <form
              onSubmit={handleFormSubmit}
              className="foot-form flex flex-col sm:flex-row gap-4 max-w-2xl select-none opacity-0"
              aria-label="waitlist capture"
            >
              <div className="flex-1 relative">
                <input
                  type="email"
                  id="waitlist-email-bottom"
                  aria-label="email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  className="w-full bg-transparent text-bone font-bold placeholder:text-bone/30 text-base border-[3px] border-bone rounded-[10px] px-5 py-4 outline-none transition-all duration-100 shadow-v5-dark focus:shadow-v5-lg-dark focus:translate-x-[-2px] focus:translate-y-[-2px] lowercase focus:ring-2 focus:ring-volt"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-electric-dark text-bone border-[3px] border-bone rounded-[10px] px-8 py-4 font-sans font-bold text-base md:text-lg cursor-pointer flex items-center justify-center gap-2 select-none transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 tap:translate-x-0.5 tap:translate-y-0.5"
                style={{
                  boxShadow: "3px 3px 0px 0px var(--color-bone)",
                }}
              >
                {isSubmitting ? "joining..." : "join waitlist →"}
              </button>
            </form>
            <AnimatePresence mode="wait">
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mt-4 max-w-2xl border-[3px] rounded-[10px] px-4 py-3 font-mono font-semibold text-xs flex items-center gap-2 ${
                    feedback.success
                      ? "bg-volt text-ink border-volt shadow-v5-sm"
                      : "bg-pink text-bone border-pink shadow-v5-sm-dark"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current" />
                  <span>{feedback.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="foot-details border-t border-bone/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs font-mono font-semibold text-muted-fg-dark gap-4 opacity-0">
            <div className="flex items-center gap-2">
              <span>© 2026 tappd in. all rights reserved.</span>
            </div>
            <span className="font-mono">the fitness app that shows its work.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

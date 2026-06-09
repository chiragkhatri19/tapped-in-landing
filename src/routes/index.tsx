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

    // On mobile, scroll-locked pins feel janky and break layout. Below 768px we
    // drop pin+scrub and just play each timeline once when the section scrolls in.
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    // scrub:0.4 makes the animation track the scroll tightly (snappy, not laggy).
    // Shorter pin distances (set per-section below) mean each section resolves in
    // a quick flick of the wheel, so nothing drags and attention never drifts.
    const mkST = (trigger: string, end: string) =>
      isDesktop
        ? { trigger, start: "top top", end, pin: true, scrub: 1, anticipatePin: 1 }
        : { trigger, start: "top 85%", once: true };

    const ctx = gsap.context(() => {

    // ── HERO ENTRANCE (plays immediately on mount) ──────────────────────────
    gsap.timeline()
      .fromTo("header",               { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
      .fromTo(".hero-title",           { y: 30, opacity: 0  }, { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }, "-=0.2")
      .fromTo(".hero-subtitle",        { y: 18, opacity: 0  }, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }, "-=0.3")
      .fromTo(".hero-form-wrapper",    { y: 18, opacity: 0  }, { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" }, "-=0.3")
      .fromTo(".hero-console-wrapper", { x: 24, opacity: 0  }, { x: 0, opacity: 1, duration: 0.65, ease: "back.out(1.2)" }, "-=0.5");

    // ── SCROLL-LOCKED PINNED ANIMATIONS ─────────────────────────────────────
    // Each section pins to viewport top; animation scrubs with scroll.
    // IMPORTANT: all animated elements keep their opacity-0 Tailwind class for SSR.
    // We use fromTo() with explicit {opacity:1} TO states so GSAP doesn't read the
    // Tailwind opacity-0 as the natural "TO" state (which would keep elements invisible).
    // ScrollTrigger.refresh() at the end recalculates positions after all pins are set,
    // accounting for the spacer each pin inserts for subsequent sections.

    // ── COMP — market problem ─────────────────────────────────────────────────
    gsap.timeline({
      scrollTrigger: mkST("#sec-comp", "+=600")
    })
    .fromTo(".comp-card",        { opacity:0, scale:0.88, y:32 }, { opacity:1, scale:1, y:0, stagger:0.1 })
    .fromTo(".price-strike-line",{ scaleX:0 },                    { scaleX:1, transformOrigin:"left center" }, "-=0.4");

    // ── SOLUTION — evidence-based stack ──────────────────────────────────────
    gsap.timeline({
      scrollTrigger: mkST("#sec-solution", "+=900")
    })
    .fromTo(".sol-left-panel",   { opacity:0, x:-40 },        { opacity:1, x:0 })
    .fromTo(".sol-card-wrapper", { opacity:0, scale:0.93 },   { opacity:1, scale:1 }, "-=0.4")
    .to(".sol-card-inner",       { rotateY:180 },                               "+=0.2")
    .fromTo(".sol-feature-item", { opacity:0, x:20 },         { opacity:1, x:0, stagger:0.18 }, "-=0.8");

    // ── F1 — accurate maintenance ─────────────────────────────────────────────
    const kcalObj = { val: 2400 };
    gsap.timeline({
      scrollTrigger: mkST("#sec-f1", "+=800")
    })
    .fromTo(".f1-title",    { opacity:0, y:16 }, { opacity:1, y:0 })
    .fromTo(".f1-subtitle", { opacity:0, y:16 }, { opacity:1, y:0 }, "-=0.3")
    .fromTo(".f1-text-col", { opacity:0, x:-32 },{ opacity:1, x:0 }, "-=0.3")
    .fromTo(".f1-card-col", { opacity:0, scale:0.93 }, { opacity:1, scale:1 }, "-=0.4")
    .to("#f1-strike-line",  { scaleX:1, transformOrigin:"left center" }, "+=0.1")
    .to(kcalObj, { val:2050, onUpdate:() => { const el=document.getElementById("f1-kcal-val"); if(el) el.innerText=Math.round(kcalObj.val).toLocaleString()+" kcal"; } }, "-=0.2")
    .fromTo(".f1-tag", { opacity:0, y:10 }, { opacity:1, y:0, stagger:0.15 });

    // ── F2 — AI photo scan ────────────────────────────────────────────────────
    gsap.timeline({
      scrollTrigger: mkST("#sec-f2", "+=700")
    })
    .fromTo(".f2-text-col",  { opacity:0, x:-32 },      { opacity:1, x:0 })
    .fromTo(".f2-card-col",  { opacity:0, scale:0.94 }, { opacity:1, scale:1 }, "-=0.4")
    .fromTo(".f2-scan-item", { opacity:0, x:-12 },      { opacity:1, x:0, stagger:0.18 }, "-=0.3")
    .fromTo(".f2-oil-badge", { opacity:0, y:12 },       { opacity:1, y:0 }, "-=0.2");

    // ── F2B — four ways to log ────────────────────────────────────────────────
    gsap.timeline({
      scrollTrigger: mkST("#sec-f2b", "+=650")
    })
    .fromTo(".f2b-title",    { opacity:0, y:16 }, { opacity:1, y:0 })
    .fromTo(".f2b-subtitle", { opacity:0, y:16 }, { opacity:1, y:0 }, "-=0.3")
    .fromTo(".f2b-method",   { opacity:0, y:28, scale:0.95 }, { opacity:1, y:0, scale:1, stagger:0.18 }, "-=0.3");

    // ── F3 — workout generator ────────────────────────────────────────────────
    gsap.timeline({
      scrollTrigger: mkST("#sec-f3", "+=750")
    })
    .fromTo(".f3-text-col",   { opacity:0, x:-32 },       { opacity:1, x:0 })
    .fromTo(".f3-card-col",   { opacity:0, scale:0.94 },  { opacity:1, scale:1 }, "-=0.4")
    .fromTo(".f3-input-chip", { opacity:0, scale:0.8, y:10 }, { opacity:1, scale:1, y:0, stagger:0.12 }, "-=0.3")
    .fromTo(".f3-day-chip",   { opacity:0, x:-12 },        { opacity:1, x:0, stagger:0.15 }, "-=0.2");

    // ── F3B — workout logger ──────────────────────────────────────────────────
    gsap.timeline({
      scrollTrigger: mkST("#sec-f3b", "+=700")
    })
    .fromTo(".f3b-card-col", { opacity:0, x:-32 },      { opacity:1, x:0 })
    .fromTo(".f3b-text-col", { opacity:0, x:32 },       { opacity:1, x:0 }, "-=0.4")
    .fromTo(".f3b-set-row",  { opacity:0, x:-16 },      { opacity:1, x:0, stagger:0.22 }, "-=0.3")
    .fromTo(".f3b-pr-row",   { opacity:0, y:12 },       { opacity:1, y:0 }, "-=0.2")
    .fromTo(".f3b-vol-bar",  { opacity:0, scaleX:0, transformOrigin:"left center" }, { opacity:1, scaleX:1, stagger:0.15 }, "-=0.2");

    // ── F4 — AI coach ─────────────────────────────────────────────────────────
    gsap.timeline({
      scrollTrigger: mkST("#sec-f4", "+=700")
    })
    .fromTo(".f4-text-col",  { opacity:0, x:32 },        { opacity:1, x:0 })
    .fromTo("#f4-coach-chat",{ opacity:0, y:20, scale:0.93 }, { opacity:1, y:0, scale:1 }, "-=0.4")
    .fromTo(".f4-chat-bubble:nth-child(1)", { opacity:0, y:12 }, { opacity:1, y:0 }, "-=0.2")
    .fromTo(".f4-chat-bubble:nth-child(2)", { opacity:0, y:16, scale:0.95 }, { opacity:1, y:0, scale:1 }, "-=0.1");

    // ── WHY BUTTON — evidence card explainer ─────────────────────────────────
    gsap.timeline({
      scrollTrigger: mkST("#sec-why", "+=700")
    })
    .fromTo(".why-title",    { opacity:0, y:16 }, { opacity:1, y:0 })
    .fromTo(".why-subtitle", { opacity:0, y:20 }, { opacity:1, y:0 }, "-=0.3")
    .fromTo(".why-desc",     { opacity:0, y:16 }, { opacity:1, y:0, stagger:0.12 }, "-=0.3")
    .fromTo(".why-card",     { opacity:0, x:36, scale:0.95 }, { opacity:1, x:0, scale:1 }, "-=0.5");

    // ── SYS — system integrity ────────────────────────────────────────────────
    gsap.timeline({
      scrollTrigger: mkST("#sec-sys", "+=600")
    })
    .fromTo(".sys-title",    { opacity:0, y:16 }, { opacity:1, y:0 })
    .fromTo(".sys-subtitle", { opacity:0, y:16 }, { opacity:1, y:0 }, "-=0.3")
    .fromTo(".sys-desc",     { opacity:0, y:16 }, { opacity:1, y:0 }, "-=0.3")
    .fromTo(".sys-card",     { opacity:0, y:24, scale:0.94 }, { opacity:1, y:0, scale:1, stagger:0.1 }, "-=0.2");

    // ── FAQ — light entrance, no pin ──────────────────────────────────────────
    gsap.timeline({ scrollTrigger: { trigger:"#sec-faq", start:"top 75%", once:true } })
    .fromTo(".faq-title",    { opacity:0, y:16 }, { opacity:1, y:0, duration:0.4, ease:"power2.out" })
    .fromTo(".faq-subtitle", { opacity:0, y:16 }, { opacity:1, y:0, duration:0.4, ease:"power2.out" }, "-=0.25")
    .fromTo(".faq-item",     { opacity:0, y:20, scale:0.97 }, { opacity:1, y:0, scale:1, stagger:0.1, duration:0.45, ease:"back.out(1.2)" }, "-=0.2");

    // ── FOOTER ────────────────────────────────────────────────────────────────
    gsap.timeline({ scrollTrigger: { trigger:"#sec-foot", start:"top 75%", once:true } })
    .fromTo(".foot-box",     { opacity:0, y:40, scale:0.97 }, { opacity:1, y:0, scale:1, duration:0.7, ease:"power2.out" })
    .fromTo(".foot-title",   { opacity:0, y:12 }, { opacity:1, y:0, duration:0.4 }, "-=0.4")
    .fromTo(".foot-headline",{ opacity:0, y:16 }, { opacity:1, y:0, duration:0.5, ease:"power2.out" }, "-=0.3")
    .fromTo(".foot-desc",    { opacity:0, y:12 }, { opacity:1, y:0, duration:0.4 }, "-=0.3")
    .fromTo(".foot-badge",   { opacity:0, scale:0.88, rotate:-3 }, { opacity:1, scale:1, rotate:0, duration:0.5, ease:"back.out(1.2)" }, "-=0.3")
    .fromTo(".foot-form",    { opacity:0, y:16 }, { opacity:1, y:0, duration:0.4 }, "-=0.2")
    .fromTo(".foot-details", { opacity:0 },       { opacity:1, duration:0.4 }, "-=0.2");

    // Recalculate all trigger positions after every pin has inserted its spacer.
    // Without this, sections 2+ have stale offsets and their pins never activate.
    ScrollTrigger.refresh();

    }); // end gsap.context

    // Google Fonts load async and reflow text → positions go stale → re-refresh once fonts settle
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    // Re-calculate on resize / orientation change (phone rotation invalidates all positions)
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      ctx.revert();
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
    <main className="lowercase selection:bg-volt selection:text-ink font-sans bg-bone text-ink relative bg-dots overflow-x-hidden">
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
            <Logo size={68} className="w-[52px] h-[52px] md:w-[68px] md:h-[68px]" />
            <span className="font-display font-black text-2xl tracking-tighter lowercase leading-none">tappd in</span>
          </div>
          <div className="flex items-center gap-2 border-[3px] border-ink bg-volt pl-2.5 pr-3.5 py-2 rounded-[10px] shadow-v5-sm select-none">
            <div className="hidden sm:flex -space-x-2.5">
              {(["a","m","s"] as const).map((l, i) => (
                <div key={l} className={`w-6 h-6 rounded-full border-[2px] border-ink flex items-center justify-center font-mono text-[9px] font-black ${["bg-bone text-ink","bg-electric-light text-bone","bg-pink text-bone"][i]}`}>{l}</div>
              ))}
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ink animate-volt-blink" />
                <span className="font-mono text-[8px] font-bold tracking-wider text-ink/60 uppercase">founder spots</span>
              </div>
              <span className="font-mono font-black text-xs text-ink">{500 - waitlistCount} of 500 left</span>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-5 md:px-8 flex items-center py-8 md:py-10 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full">

            {/* LEFT */}
            <div className="col-span-1 lg:col-span-7 flex flex-col gap-5">
              <div className="hero-title opacity-0">
                <h1 className="font-display font-black text-[2.1rem] sm:text-[3.2rem] md:text-[4.2rem] lg:text-[5rem] tracking-tighter leading-[0.9] text-ink">
                  the fitness app<br />
                  that shows<br />
                  <span className="bg-volt border-[3px] border-ink rounded-[12px] shadow-v5-sm px-3 py-0.5 inline-block mt-1 leading-snug">
                    its work.
                  </span>
                </h1>
              </div>

              <p className="hero-subtitle font-sans font-medium text-base md:text-[1.05rem] text-muted-fg-light leading-relaxed max-w-[480px] opacity-0">
                most apps inflate your numbers to keep you happy. we calculate the real ones and cite the study behind every single one.
              </p>

              <div className="hero-form-wrapper flex flex-col gap-2.5 opacity-0">
                <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-[460px]">
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
                    {isSubmitting ? "joining..." : "join the waitlist"}
                  </button>
                </form>
                <div className="flex flex-col gap-1">
                  <p className="font-mono text-[10px] text-muted-fg-light">
                    monthly <span className="line-through opacity-40">$10</span>{" "}
                    <span className="font-bold text-ink">$7.99</span>
                    <span className="mx-1.5 opacity-30">·</span>
                    yearly <span className="line-through opacity-40">$59.99</span>{" "}
                    <span className="font-bold text-ink">$47.99</span>
                    <span className="text-ink/40 ml-1">(save 20%). locked at signup.</span>
                  </p>
                  <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink/30">
                    NO SPAM · ONE EMAIL AT LAUNCH · NO CREDIT CARD
                  </p>
                </div>
                <AnimatePresence mode="wait">
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                      className={`max-w-[460px] border-[2px] rounded-[8px] px-3 py-2 font-mono font-semibold text-[11px] flex items-center gap-2 ${feedback.success ? "bg-volt text-ink border-ink" : "bg-pink text-bone border-ink"}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      <span>{feedback.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT: IPHONE-STYLE MOCKUP — hidden on mobile, too narrow to be useful */}
            <div className="hidden lg:flex lg:col-span-5 justify-end">
              <div className="hero-console-wrapper opacity-0 relative select-none">
                {/* iPhone graphite frame */}
                <div style={{
                  width: 260, height: 528,
                  background: "linear-gradient(160deg,#2e2e30 0%,#1a1a1c 100%)",
                  borderRadius: 46, padding: 11,
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 40px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)"
                }}>
                  {/* Physical side buttons */}
                  <div style={{ position:"absolute", right:-4, top:98, width:4, height:42, background:"#3a3a3c", borderRadius:"0 3px 3px 0" }} />
                  <div style={{ position:"absolute", left:-4, top:82, width:4, height:30, background:"#3a3a3c", borderRadius:"3px 0 0 3px" }} />
                  <div style={{ position:"absolute", left:-4, top:120, width:4, height:30, background:"#3a3a3c", borderRadius:"3px 0 0 3px" }} />

                  {/* Screen — light mode (app's bone cream) */}
                  <div style={{ width:"100%", height:"100%", background:"#F2ECDE", borderRadius:37, overflow:"hidden", display:"flex", flexDirection:"column" }}>
                    {/* Status bar + dynamic island */}
                    <div style={{ padding:"10px 16px 0", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0, position:"relative" }}>
                      <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:11, fontWeight:700, color:"#111111" }}>9:41</span>
                      {/* Dynamic island */}
                      <div style={{ position:"absolute", left:"50%", top:8, transform:"translateX(-50%)", width:90, height:26, background:"#111111", borderRadius:20 }} />
                      <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                        <div style={{ display:"flex", gap:2, alignItems:"flex-end", height:11 }}>
                          {[30,50,70,100].map((h,i) => (
                            <div key={i} style={{ width:3, height:`${h}%`, background:"#111111", borderRadius:1 }} />
                          ))}
                        </div>
                        <div style={{ width:20, height:10, border:"1.5px solid #111", borderRadius:2, display:"flex", alignItems:"center", padding:"1px 1px", position:"relative", marginLeft:2 }}>
                          <div style={{ position:"absolute", right:-3, top:"50%", transform:"translateY(-50%)", width:2, height:6, background:"#111", borderRadius:"0 1px 1px 0" }} />
                          <div style={{ width:"68%", height:"100%", background:"#111", borderRadius:1 }} />
                        </div>
                      </div>
                    </div>

                    {/* App content */}
                    <div style={{ flex:1, padding:"12px 16px 14px", display:"flex", flexDirection:"column", gap:9, minHeight:0 }}>
                      {/* Mini breadcrumb */}
                      <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:7.5, color:"rgba(17,17,17,0.35)", textTransform:"uppercase", letterSpacing:"0.18em" }}>
                        tappd in · calorie target
                      </span>

                      {/* Crossed-out generic */}
                      <div>
                        <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:9, color:"rgba(17,17,17,0.38)", marginBottom:3 }}>other apps give you</div>
                        <div style={{ position:"relative", display:"inline-block" }}>
                          <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:21, fontWeight:700, color:"rgba(17,17,17,0.28)", lineHeight:1 }}>2,400 kcal</span>
                          <div style={{ position:"absolute", top:"50%", left:0, right:0, height:2.5, background:"#FF3B2F", transform:"translateY(-50%)" }} />
                        </div>
                      </div>

                      {/* THE REVEAL — yellow box */}
                      <div style={{ background:"#E8FF00", border:"2.5px solid #111", borderRadius:12, padding:"10px 14px", boxShadow:"4px 4px 0 #111" }}>
                        <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:7.5, color:"rgba(17,17,17,0.5)", textTransform:"uppercase", letterSpacing:"0.14em", marginBottom:4 }}>
                          your real maintenance
                        </div>
                        <div style={{ display:"flex", alignItems:"baseline", gap:5 }}>
                          <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:40, fontWeight:900, color:"#111111", lineHeight:1, letterSpacing:"-0.03em" }}>2,050</span>
                          <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:14, fontWeight:700, color:"rgba(17,17,17,0.5)" }}>kcal</span>
                        </div>
                        <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:7.5, color:"rgba(17,17,17,0.4)", marginTop:3 }}>
                          NEAT scored · desk lifestyle
                        </div>
                      </div>

                      {/* Macro row */}
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6 }}>
                        {[
                          { label:"protein", val:"160g", color:"#2B3AFF" },
                          { label:"carbs",   val:"220g", color:"#FF7A1A" },
                          { label:"fat",     val:"65g",  color:"#FF2B85" },
                        ].map(m => (
                          <div key={m.label} style={{ background:"rgba(17,17,17,0.04)", border:"1px solid rgba(17,17,17,0.1)", borderRadius:8, padding:"7px 4px", textAlign:"center" }}>
                            <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:13, fontWeight:900, color:m.color }}>{m.val}</div>
                            <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:7, color:"rgba(17,17,17,0.35)", textTransform:"uppercase", letterSpacing:"0.08em" }}>{m.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* NEAT inputs */}
                      <div style={{ background:"rgba(17,17,17,0.04)", border:"1px solid rgba(17,17,17,0.08)", borderRadius:10, padding:"8px 11px" }}>
                        <div style={{ fontFamily:"'Geist Mono',monospace", fontSize:7, color:"rgba(17,17,17,0.3)", textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:6 }}>your inputs</div>
                        {[
                          { k:"daily steps", v:"4,200" },
                          { k:"job type",    v:"desk job" },
                          { k:"sitting",     v:"9 hrs/day" },
                        ].map(row => (
                          <div key={row.k} style={{ display:"flex", justifyContent:"space-between", paddingBottom:3 }}>
                            <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:8.5, color:"rgba(17,17,17,0.4)" }}>{row.k}</span>
                            <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:8.5, fontWeight:700, color:"rgba(17,17,17,0.7)" }}>{row.v}</span>
                          </div>
                        ))}
                      </div>

                      {/* Citation chip */}
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:"auto" }}>
                        <div style={{ background:"rgba(0,194,168,0.12)", border:"1px solid rgba(0,194,168,0.35)", borderRadius:4, padding:"2px 7px" }}>
                          <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:7, fontWeight:700, color:"#00C2A8", textTransform:"uppercase", letterSpacing:"0.1em" }}>why?</span>
                        </div>
                        <span style={{ fontFamily:"'Geist Mono',monospace", fontSize:7.5, color:"rgba(17,17,17,0.28)" }}>backed by published research</span>
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
      <div className="overflow-hidden w-full my-8" style={{ contain: "paint" }}>
      <div className="w-[110vw] relative -left-[5vw] transform rotate-[-2deg] bg-ink py-4 md:py-5 border-y-[3px] border-ink flex select-none shadow-[0_15px_30px_rgba(17,17,17,0.45)] z-30">
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
            evidence-based // mathematically strict // no generic slop // evidence-based //
            mathematically strict // no generic slop //{" "}
          </span>
          <span>
            evidence-based // mathematically strict // no generic slop // evidence-based //
            mathematically strict // no generic slop //{" "}
          </span>
        </motion.div>
      </div>
      </div>

      {/* SECTION 3.1: THE COMPETITOR COMPARISON */}
      <section
        id="sec-comp"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center">
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-pink font-mono text-xs font-semibold tracking-wider block mb-2">
              01 // the market problem
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter leading-[0.9] text-ink mb-6">
              why pay $380+ a year?
            </h2>
            <p className="text-sm md:text-base font-sans font-medium text-muted-fg-light leading-relaxed mb-6">
              to build a complete, calibrated metabolic stack, you are forced to subscribe to six
              separate apps. they charge you over $380 a year for fragmented data silos that cannot
              communicate.
            </p>
            <div className="border-[3px] border-ink bg-alert-light/10 rounded-[12px] p-5 shadow-v5 relative overflow-hidden select-none flex flex-col items-center justify-center text-center">
              <span className="font-mono text-[9px] font-bold text-alert-light uppercase tracking-wider">
                [total fragmented stack cost]
              </span>
              <div className="relative inline-block mt-1">
                <span className="text-4xl md:text-5xl font-mono font-black text-ink tracking-tight">
                  $385.95/yr
                </span>
                <div
                  className="price-strike-line absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-alert-light w-full origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { name: "myfitnesspal", price: "$79.99/yr", limits: "food database only. pays to scan barcodes, spammy ads, no calorie math." },
              { name: "macrofactor", price: "$71.99/yr", limits: "metabolic math, but manual logging only. no workouts, no coach." },
              { name: "hevy", price: "$23.99/yr", limits: "clean workout logger. completely isolated from nutrition and weight." },
              { name: "cronometer", price: "$49.99/yr", limits: "detailed micros, but tedious entry, complex ui, no coaching context." },
              { name: "cal ai", price: "$120.00/yr", limits: "photo logging, but expensive, no training, no evidence validation." },
              { name: "lose it!", price: "$39.99/yr", limits: "weight tracking, but generic calorie math, no citations, popups." },
            ].map((app) => (
              <div
                key={app.name}
                className="comp-card border-[3px] border-ink bg-card-light/40 rounded-[10px] p-3 md:p-4 text-left font-mono text-xs select-none shadow-v5-sm flex flex-col gap-2"
              >
                <div className="flex justify-between items-start gap-1">
                  <span className="font-sans font-black text-[11px] md:text-sm text-ink leading-tight">{app.name}</span>
                  <span className="bg-alert-light/10 text-alert-light font-bold px-1.5 py-0.5 rounded text-[9px] flex-shrink-0">{app.price}</span>
                </div>
                <p className="text-[9px] md:text-[10px] text-muted-fg-light font-sans leading-normal">{app.limits}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3.2: THE SOLUTION */}
      <section
        id="sec-solution"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen"
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
              tappd in puts calorie calculation, food logging, training, and coaching into one place. your numbers talk to each other. one subscription, the whole thing.
            </p>
          </div>
          <div className="lg:col-span-7 flex flex-col items-center justify-center sol-card-wrapper opacity-0 will-change-gpu">
            {/* 3D Flip Card Container */}
            <div className="w-full max-w-[580px] h-[320px] sm:h-[400px] md:h-[520px] select-none" style={{ perspective: "1200px" }}>
              <div className="sol-card-inner relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                
                {/* CARD FRONT: pricing and branding */}
                <div 
                  className="absolute inset-0 w-full h-full bg-card-light border-[3px] border-ink rounded-[14px] p-5 md:p-8 shadow-v5 flex flex-col justify-between"
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
                    <div className="bg-volt text-ink border-[2px] border-ink px-3 py-1 rounded-full text-xs font-mono font-semibold shadow-v5-sm">
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
                  className="absolute inset-0 w-full h-full bg-navy text-bone border-[3px] border-ink rounded-[14px] p-5 md:p-8 shadow-v5 flex flex-col justify-between"
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
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen"
      >
        <div className="flex flex-col gap-3 mb-10">
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
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen"
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
            <div className="f2-oil-badge bg-volt border-[3px] border-ink rounded-[10px] px-4 py-3 shadow-v5-sm opacity-0">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-ink/60 block mb-1">the detail no other app has</span>
              <p className="font-sans font-bold text-sm text-ink">
                cooked meal? we flag it and make you log the oil separately. ghee, butter, coconut oil. the calories nobody counts. we count them.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 f2-card-col opacity-0">
            <div className="bg-card-light border-[3px] border-ink rounded-[14px] p-5 md:p-6 shadow-v5-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-[10px] font-bold text-ink/40 uppercase tracking-wider">ai scan result</span>
                <span className="bg-electric-light text-bone font-mono text-[9px] font-bold px-2.5 py-1 rounded-full border-[2px] border-ink">ai scan</span>
              </div>
              {/* Mock food image area */}
              <div className="relative bg-ink/6 border-[2px] border-ink/20 rounded-[10px] h-28 mb-4 overflow-hidden flex items-center justify-center">
                <div className="absolute inset-3 border border-dashed border-ink/20 rounded-[6px]" />
                <div className="absolute left-0 right-0 h-[2px] bg-electric-light/60 shadow-[0_0_8px_rgba(43,58,255,0.5)]" style={{ top: "55%" }} />
                <span className="font-mono text-[9px] text-ink/30 uppercase tracking-widest">scanning image</span>
              </div>
              {/* Detected ingredients */}
              <div className="flex flex-col gap-2 mb-4">
                <span className="font-mono text-[9px] text-muted-fg-light uppercase tracking-wider">detected</span>
                {[
                  { name: "grilled salmon fillet", weight: "180g", kcal: "320 kcal" },
                  { name: "sweet potato, baked", weight: "150g", kcal: "130 kcal" },
                  { name: "asparagus, steamed",  weight: "80g",  kcal: "18 kcal" },
                ].map((item) => (
                  <div key={item.name} className="f2-scan-item flex justify-between items-center font-mono text-xs py-2 px-3 bg-bone border border-ink/10 rounded-[7px] opacity-0">
                    <div className="flex flex-col">
                      <span className="font-bold text-ink text-[11px]">{item.name}</span>
                      <span className="text-muted-fg-light text-[9px]">{item.weight} · editable</span>
                    </div>
                    <span className="font-black text-ink">{item.kcal}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-ink/10">
                <span className="font-mono text-[9px] text-muted-fg-light">*pulled from icmr-nin, usda, and open food facts</span>
                <span className="font-mono text-xs font-black text-ink">468 kcal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 02B: FOUR WAYS TO LOG */}
      <section
        id="sec-f2b"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen"
      >
        <div className="mb-12">
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
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen"
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
            <div className="bg-card-light border-[3px] border-ink rounded-[14px] p-5 md:p-6 shadow-v5-lg">
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
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center">
          {/* LEFT: active session card */}
          <div className="lg:col-span-7 f3b-card-col opacity-0">
            <div className="bg-navy text-bone border-[3px] border-ink rounded-[14px] p-5 md:p-6 shadow-v5-lg">
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

      {/* FEATURE 04: THE AI COACH */}
      <section
        id="sec-f4"
        className="w-full flex flex-col justify-center max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen"
      >
        <div className="flex flex-col items-center text-center mb-8 md:mb-12 f4-text-col opacity-0 will-change-gpu">
          <span className="text-pink font-mono text-xs font-semibold tracking-wider block mb-2 uppercase">
            04 // the coach
          </span>
          <h3 className="text-3xl md:text-5xl font-display font-black tracking-tight mb-4 text-ink leading-tight lowercase">
            science-backed coaching
          </h3>
          <p className="text-sm md:text-base font-sans text-muted-fg-light leading-relaxed max-w-2xl">
            the coach knows your numbers. your calories today, your last workout, how your training volume is stacking up, what you ate. it answers from that context, not from a generic playbook. every response cites a study. no bro science, no invented claims.
          </p>
        </div>

        <div 
          id="f4-coach-chat" 
          className="w-full max-w-2xl mx-auto bg-navy text-bone border-[3px] border-ink rounded-[14px] p-5 md:p-8 shadow-v5 flex flex-col justify-between sm:min-h-[360px] md:min-h-[420px] f4-card-col opacity-0 will-change-gpu"
        >
          <div>
            <div className="flex justify-between items-start mb-5 border-b border-bone/10 pb-4">
              <div className="flex items-center gap-3">
                <Logo size={40} dotColor="#E8FF00" iconColor="#F2ECDE" />
                <div className="flex flex-col text-left">
                  <span className="font-display font-black text-xl tracking-tighter text-bone lowercase leading-none">tappd coach</span>
                  <span className="font-mono text-[9px] text-muted-fg-dark uppercase tracking-wider mt-1">[active coach engine]</span>
                </div>
              </div>
              <div className="bg-volt text-ink border-[2px] border-ink px-3 py-1 rounded-full text-xs font-mono font-semibold animate-pulse shadow-v5-sm">
                active
              </div>
            </div>
            
            <div className="flex-1 flex flex-col gap-4 font-mono text-xs mb-6 mt-4">
              {/* User bubble */}
              <div className="f4-chat-bubble self-end max-w-[85%] bg-bone/10 border border-bone/20 text-bone rounded-lg px-3 py-2 font-semibold text-right opacity-0 text-[11px] sm:text-xs">
                why's my bench stalling?
              </div>
              {/* Coach response - HIGHLIGHTED */}
              <div className="f4-chat-bubble self-start max-w-[90%] bg-volt text-ink rounded-lg px-4 py-3 text-left font-sans font-bold leading-normal border-[3px] border-ink shadow-v5-sm opacity-0 relative text-xs sm:text-sm my-1.5">
                <div className="absolute -top-3 left-3 bg-pink text-bone border-[2px] border-ink px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-mono uppercase tracking-wider shadow-v5-none select-none">
                  coach response
                </div>
                your protein is 32g short, 3 days this week. bump it to 165g.
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            <div className="bg-bone/5 border border-bone/10 text-bone/45 text-[10px] font-mono px-4 py-3 rounded-[8px] flex justify-between items-center select-none">
              <span>ask anything (e.g., how's my training frequency?) ...</span>
              <span className="w-1.5 h-3.5 bg-volt animate-pulse" />
            </div>
            <div className="pt-3 border-t border-bone/10 flex justify-between items-center select-none text-[9px] text-bone/45 font-mono">
              <span>*every response cites a real study. ask it to show you.</span>
              <span className="font-bold">coach active</span>
            </div>
          </div>
        </div>

      </section>

      {/* SECTION: WHY BUTTON */}
      <section
        id="sec-why"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen"
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
              <div className="bg-card-light border-[3px] border-ink rounded-[14px] p-5 shadow-v5-lg">

                {/* Header row */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-ink/10">
                  <span className="font-mono text-[10px] font-bold text-ink/40 uppercase tracking-wider">your daily targets</span>
                  <span className="font-mono text-[9px] text-muted-fg-light">tap [why?] on anything</span>
                </div>

                {/* Recommendation rows */}
                <div className="flex flex-col gap-0 mb-4">
                  {[
                    { label: "maintenance", val: "2,050 kcal" },
                    { label: "fat loss target", val: "1,710 kcal" },
                    { label: "protein", val: "160g" },
                  ].map((row, i) => (
                    <div key={row.label} className={`flex justify-between items-center py-2.5 ${i < 2 ? "border-b border-ink/8" : ""}`}>
                      <span className="font-sans text-sm font-medium text-muted-fg-light">{row.label}</span>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-sm font-black text-ink">{row.val}</span>
                        <span className={`border-[2px] border-ink font-mono text-[9px] font-black px-1.5 py-0.5 rounded-[5px] shadow-v5-sm select-none ${i === 2 ? "bg-volt text-ink" : "bg-bone text-ink/50"}`}>
                          why?
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expanded evidence card — shows what opens on tap */}
                <div className="bg-navy border-[2px] border-ink rounded-[10px] overflow-hidden">
                  <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-bone/10">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[8px] font-bold text-teal uppercase tracking-wider">protein</span>
                      <span className="w-1 h-1 rounded-full bg-bone/20" />
                      <span className="font-mono text-[8px] text-bone/40">why your target is 160g</span>
                    </div>
                    <span className="bg-teal/15 border border-teal/35 text-teal font-mono text-[7px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                      HIGH
                    </span>
                  </div>
                  <div className="px-4 py-3 flex flex-col gap-3">
                    <p className="font-sans text-sm text-bone/85 leading-relaxed">
                      protein intakes of 1.6 to 2.4g/kg per day maximise muscle growth and retention. past this range, extra protein has no measurable benefit. those calories are better spent on carbs.
                    </p>
                    <div className="flex items-center justify-between pt-2.5 border-t border-bone/10">
                      <div>
                        <span className="font-mono text-[8.5px] text-bone/50 block">morton rw et al.</span>
                        <span className="font-mono text-[8.5px] text-bone/35 block">british journal of sports medicine · 2018</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-teal/15 border border-teal/35 text-teal font-mono text-[9px] font-bold px-3 py-1.5 rounded-[6px]">
                        <span>read study</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="font-mono text-[9px] text-muted-fg-light text-center mt-4 pt-3 border-t border-ink/8">
                  every why? card links to the actual study. tap and it opens. read it yourself.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: THE SCIENCE LIBRARY */}
      <section
        id="sec-sys"
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen"
      >
        <div className="flex flex-col gap-4 mb-10">
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
        className="w-full flex flex-col justify-center max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen"
      >
        <div className="flex flex-col gap-3 mb-10">
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
              q: "is it really evidence-based or is that marketing?",
              a: "it is real. every claim in the app links to an actual published study you can open and read yourself. for example, we cap the protein target at 1.8g per kg because the research shows more than that does almost nothing for muscle. that is not our opinion, it is what the studies found.",
            },
            {
              q: "what makes your calorie number different from myfitnesspal?",
              a: "most apps assume you move more than you do. we actually score your daily movement (your steps, your sitting hours, your job). for someone with a desk job, the real number is often 300 to 400 calories lower than what other apps hand you. that gap is exactly why the scale stops moving.",
            },
            {
              q: "do i need an account to start?",
              a: "no. you can set up and see your real maintenance number in about 2 minutes with no account. accounts are for syncing across devices.",
            },
            {
              q: "android or ios?",
              a: "android first. ios shortly after. join the waitlist and you get the download link on launch day.",
            },
            {
              q: "what does the 20% off actually lock?",
              a: "join before launch and you keep the founder rate forever: $7.99/mo on monthly or $47.99/yr on yearly. after launch, prices go to $10/mo and $59.99/yr.",
            },
            {
              q: "will my email get spammed?",
              a: "no. one email on launch day with your download link. that is it. you decide what to do after.",
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
        className="w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen"
      >
        <div className="foot-box bg-navy text-bone border-[3px] border-ink rounded-[14px] p-8 md:p-12 shadow-v5-lg flex flex-col justify-between gap-12 opacity-0 will-change-gpu">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-bone/10 pb-8">
            <div className="max-w-2xl flex flex-col gap-4">
              <span className="foot-badge text-volt font-mono text-xs font-semibold tracking-wider opacity-0">
                waitlist · founder pricing
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
                one email on launch day. your founder discount is locked the moment you submit. no spam, no upsells, no surprise charges.
              </p>
            </div>
            <div className="bg-volt text-ink border-[3px] border-ink rounded-[10px] p-5 shadow-v5-lg-dark max-w-xs select-none">
              <span className="font-mono text-xs font-semibold block mb-1">
                FOUNDER PRICING. LOCKED AT SIGNUP.
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

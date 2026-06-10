import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-BCbsrueW.mjs";
import { g as gsapWithCSS, S as ScrollTrigger, O as Observer, a as ScrollToPlugin } from "../_libs/gsap.mjs";
import "../_libs/seroval.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const joinWaitlist = createServerFn({
  method: "POST"
}).inputValidator(objectType({
  email: stringType().email()
})).handler(createSsrRpc("b232b7d28df608ca66400bfe3954e980a68804a3e2aca52359abaab8e51da368"));
const getWaitlistCount = createServerFn({
  method: "GET"
}).handler(createSsrRpc("5338d8458f92f0c0a4eb17982746ff1114500791b6ef7234bac0a3231a3950df"));
if (typeof window !== "undefined") {
  gsapWithCSS.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin);
}
function Logo({
  size = 36,
  className = "",
  dotColor = "#2B3AFF",
  iconColor = "#111111"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: size, height: size, viewBox: "0 0 1024 1024", fill: "none", xmlns: "http://www.w3.org/2000/svg", className: `flex-shrink-0 select-none ${className}`, "aria-label": "tappd in logo", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "432", y: "272", width: "160", height: "480", fill: iconColor }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M336 472C336 494.091 353.909 512 376 512H648C670.091 512 688 494.091 688 472V392C688 369.909 670.091 352 648 352H376C353.909 352 336 369.909 336 392V472Z", fill: iconColor }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M336 419H592V352H336V419Z", fill: iconColor }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M388 512H688V352H388V512Z", fill: iconColor }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "632", y: "696", width: "56", height: "56", fill: dotColor })
  ] });
}
function Index() {
  const [email, setEmail] = reactExports.useState("");
  const [waitlistCount, setWaitlistCount] = reactExports.useState(0);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [feedback, setFeedback] = reactExports.useState(null);
  const [heroMousePos, setHeroMousePos] = reactExports.useState({
    x: 0,
    y: 0
  });
  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeroMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const mkST = (trigger, end) => isDesktop ? {
      trigger,
      start: "top top",
      end,
      pin: true,
      scrub: 1,
      anticipatePin: 1
    } : {
      trigger,
      start: "top 82%",
      once: true
    };
    const ctx = gsapWithCSS.context(() => {
      gsapWithCSS.timeline().fromTo("header", {
        y: -30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      }).fromTo(".hero-title", {
        y: 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power2.out"
      }, "-=0.2").fromTo(".hero-subtitle", {
        y: 18,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out"
      }, "-=0.3").fromTo(".hero-form-wrapper", {
        y: 18,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out"
      }, "-=0.3").fromTo(".hero-console-wrapper", {
        x: 24,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 0.65,
        ease: "back.out(1.2)"
      }, "-=0.5").fromTo(".scroll-prompt", {
        y: 12,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out"
      }, "-=0.2");
      gsapWithCSS.timeline({
        scrollTrigger: mkST("#sec-comp", "+=600")
      }).fromTo(".comp-card", {
        opacity: 0,
        scale: 0.88,
        y: 32
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.1
      }).fromTo(".price-strike-line", {
        scaleX: 0
      }, {
        scaleX: 1,
        transformOrigin: "left center"
      }, "-=0.4");
      gsapWithCSS.timeline({
        scrollTrigger: mkST("#sec-solution", "+=900")
      }).fromTo(".sol-left-panel", {
        opacity: 0,
        x: -40
      }, {
        opacity: 1,
        x: 0
      }).fromTo(".sol-card-wrapper", {
        opacity: 0,
        scale: 0.93
      }, {
        opacity: 1,
        scale: 1
      }, "-=0.4").to(".sol-card-inner", {
        rotateY: 180
      }, "+=0.2").fromTo(".sol-feature-item", {
        opacity: 0,
        x: 20
      }, {
        opacity: 1,
        x: 0,
        stagger: 0.18
      }, "-=0.8");
      const kcalObj = {
        val: 2400
      };
      gsapWithCSS.timeline({
        scrollTrigger: mkST("#sec-f1", "+=800")
      }).fromTo(".f1-title", {
        opacity: 0,
        y: 16
      }, {
        opacity: 1,
        y: 0
      }).fromTo(".f1-subtitle", {
        opacity: 0,
        y: 16
      }, {
        opacity: 1,
        y: 0
      }, "-=0.3").fromTo(".f1-text-col", {
        opacity: 0,
        x: -32
      }, {
        opacity: 1,
        x: 0
      }, "-=0.3").fromTo(".f1-card-col", {
        opacity: 0,
        scale: 0.93
      }, {
        opacity: 1,
        scale: 1
      }, "-=0.4").to("#f1-strike-line", {
        scaleX: 1,
        transformOrigin: "left center"
      }, "+=0.1").to(kcalObj, {
        val: 2050,
        onUpdate: () => {
          const el = document.getElementById("f1-kcal-val");
          if (el) el.innerText = Math.round(kcalObj.val).toLocaleString() + " kcal";
        }
      }, "-=0.2").fromTo(".f1-tag", {
        opacity: 0,
        y: 10
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.15
      });
      gsapWithCSS.timeline({
        scrollTrigger: mkST("#sec-f2", "+=700")
      }).fromTo(".f2-text-col", {
        opacity: 0,
        x: -32
      }, {
        opacity: 1,
        x: 0
      }).fromTo(".f2-card-col", {
        opacity: 0,
        scale: 0.94
      }, {
        opacity: 1,
        scale: 1
      }, "-=0.4").fromTo(".f2-scan-item", {
        opacity: 0,
        x: -12
      }, {
        opacity: 1,
        x: 0,
        stagger: 0.18
      }, "-=0.3").fromTo(".f2-oil-badge", {
        opacity: 0,
        y: 12
      }, {
        opacity: 1,
        y: 0
      }, "-=0.2");
      gsapWithCSS.timeline({
        scrollTrigger: mkST("#sec-f2b", "+=650")
      }).fromTo(".f2b-title", {
        opacity: 0,
        y: 16
      }, {
        opacity: 1,
        y: 0
      }).fromTo(".f2b-subtitle", {
        opacity: 0,
        y: 16
      }, {
        opacity: 1,
        y: 0
      }, "-=0.3").fromTo(".f2b-method", {
        opacity: 0,
        y: 28,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.18
      }, "-=0.3");
      gsapWithCSS.timeline({
        scrollTrigger: mkST("#sec-f3", "+=750")
      }).fromTo(".f3-text-col", {
        opacity: 0,
        x: -32
      }, {
        opacity: 1,
        x: 0
      }).fromTo(".f3-card-col", {
        opacity: 0,
        scale: 0.94
      }, {
        opacity: 1,
        scale: 1
      }, "-=0.4").fromTo(".f3-input-chip", {
        opacity: 0,
        scale: 0.8,
        y: 10
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.12
      }, "-=0.3").fromTo(".f3-day-chip", {
        opacity: 0,
        x: -12
      }, {
        opacity: 1,
        x: 0,
        stagger: 0.15
      }, "-=0.2");
      gsapWithCSS.timeline({
        scrollTrigger: mkST("#sec-f3b", "+=700")
      }).fromTo(".f3b-card-col", {
        opacity: 0,
        x: -32
      }, {
        opacity: 1,
        x: 0
      }).fromTo(".f3b-text-col", {
        opacity: 0,
        x: 32
      }, {
        opacity: 1,
        x: 0
      }, "-=0.4").fromTo(".f3b-set-row", {
        opacity: 0,
        x: -16
      }, {
        opacity: 1,
        x: 0,
        stagger: 0.22
      }, "-=0.3").fromTo(".f3b-pr-row", {
        opacity: 0,
        y: 12
      }, {
        opacity: 1,
        y: 0
      }, "-=0.2").fromTo(".f3b-vol-bar", {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "left center"
      }, {
        opacity: 1,
        scaleX: 1,
        stagger: 0.15
      }, "-=0.2");
      gsapWithCSS.timeline({
        scrollTrigger: mkST("#sec-f4", "+=700")
      }).fromTo(".f4-text-col", {
        opacity: 0,
        x: 32
      }, {
        opacity: 1,
        x: 0
      }).fromTo("#f4-coach-chat", {
        opacity: 0,
        y: 20,
        scale: 0.93
      }, {
        opacity: 1,
        y: 0,
        scale: 1
      }, "-=0.4").fromTo(".f4-chat-bubble:nth-child(1)", {
        opacity: 0,
        y: 12
      }, {
        opacity: 1,
        y: 0
      }, "-=0.2").fromTo(".f4-chat-bubble:nth-child(2)", {
        opacity: 0,
        y: 16,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1
      }, "-=0.1");
      gsapWithCSS.timeline({
        scrollTrigger: mkST("#sec-why", "+=700")
      }).fromTo(".why-title", {
        opacity: 0,
        y: 16
      }, {
        opacity: 1,
        y: 0
      }).fromTo(".why-subtitle", {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0
      }, "-=0.3").fromTo(".why-desc", {
        opacity: 0,
        y: 16
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.12
      }, "-=0.3").fromTo(".why-card", {
        opacity: 0,
        x: 36,
        scale: 0.95
      }, {
        opacity: 1,
        x: 0,
        scale: 1
      }, "-=0.5");
      gsapWithCSS.timeline({
        scrollTrigger: mkST("#sec-sys", "+=600")
      }).fromTo(".sys-title", {
        opacity: 0,
        y: 16
      }, {
        opacity: 1,
        y: 0
      }).fromTo(".sys-subtitle", {
        opacity: 0,
        y: 16
      }, {
        opacity: 1,
        y: 0
      }, "-=0.3").fromTo(".sys-desc", {
        opacity: 0,
        y: 16
      }, {
        opacity: 1,
        y: 0
      }, "-=0.3").fromTo(".sys-card", {
        opacity: 0,
        y: 24,
        scale: 0.94
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1
      }, "-=0.2");
      gsapWithCSS.timeline({
        scrollTrigger: {
          trigger: "#sec-faq",
          start: "top 75%",
          once: true
        }
      }).fromTo(".faq-title", {
        opacity: 0,
        y: 16
      }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }).fromTo(".faq-subtitle", {
        opacity: 0,
        y: 16
      }, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.25").fromTo(".faq-item", {
        opacity: 0,
        y: 20,
        scale: 0.97
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.45,
        ease: "back.out(1.2)"
      }, "-=0.2");
      gsapWithCSS.timeline({
        scrollTrigger: {
          trigger: "#sec-foot",
          start: "top 75%",
          once: true
        }
      }).fromTo(".foot-box", {
        opacity: 0,
        y: 40,
        scale: 0.97
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power2.out"
      }).fromTo(".foot-title", {
        opacity: 0,
        y: 12
      }, {
        opacity: 1,
        y: 0,
        duration: 0.4
      }, "-=0.4").fromTo(".foot-headline", {
        opacity: 0,
        y: 16
      }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.3").fromTo(".foot-desc", {
        opacity: 0,
        y: 12
      }, {
        opacity: 1,
        y: 0,
        duration: 0.4
      }, "-=0.3").fromTo(".foot-badge", {
        opacity: 0,
        scale: 0.88,
        rotate: -3
      }, {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 0.5,
        ease: "back.out(1.2)"
      }, "-=0.3").fromTo(".foot-form", {
        opacity: 0,
        y: 16
      }, {
        opacity: 1,
        y: 0,
        duration: 0.4
      }, "-=0.2").fromTo(".foot-details", {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.4
      }, "-=0.2");
      ScrollTrigger.refresh();
    });
    return () => {
      ctx.revert();
    };
  }, []);
  reactExports.useEffect(() => {
    getWaitlistCount().then((res) => {
      setWaitlistCount(res.count);
    }).catch((err) => console.error("error loading count:", err));
  }, []);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setFeedback(null);
    try {
      const result = await joinWaitlist({
        data: {
          email
        }
      });
      setFeedback(result);
      if (result.success) {
        setEmail("");
        setWaitlistCount(result.count);
      }
    } catch (error) {
      setFeedback({
        success: false,
        message: "failed to join. try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "lowercase selection:bg-volt selection:text-ink font-sans bg-bone text-ink relative bg-dots overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "sec-hero", className: "min-h-screen w-full flex flex-col relative overflow-hidden", onMouseMove: handleHeroMouseMove, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(#111111_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
        background: `radial-gradient(600px circle at ${heroMousePos.x}px ${heroMousePos.y}px, rgba(232,255,0,0.055), transparent 70%)`
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "w-full max-w-7xl mx-auto px-5 md:px-8 flex justify-between items-center pt-6 pb-2 z-10 flex-shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: 68, className: "w-[52px] h-[52px] md:w-[68px] md:h-[68px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-2xl tracking-tighter lowercase leading-none", children: "tappd in" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-[3px] border-ink bg-volt pl-2.5 pr-3.5 py-2 rounded-[10px] shadow-v5-sm select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:flex -space-x-2.5", children: ["a", "m", "s"].map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-6 h-6 rounded-full border-[2px] border-ink flex items-center justify-center font-mono text-[9px] font-black ${["bg-bone text-ink", "bg-electric-light text-bone", "bg-pink text-bone"][i]}`, children: l }, l)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col leading-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-ink animate-volt-blink" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8px] font-bold tracking-wider text-ink/60 uppercase", children: "founder spots" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-black text-xs text-ink", children: [
              500 - waitlistCount,
              " of 500 left"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full max-w-7xl mx-auto px-5 md:px-8 flex items-center py-8 md:py-10 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 lg:col-span-7 flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-title opacity-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-black text-[2.1rem] sm:text-[3.2rem] md:text-[4.2rem] lg:text-[5rem] tracking-tighter leading-[0.9] text-ink", children: [
            "the fitness app",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "that shows",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-volt border-[3px] border-ink rounded-[12px] shadow-v5-sm px-3 py-0.5 inline-block mt-1 leading-snug", children: "its work." })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hero-subtitle font-sans font-medium text-base md:text-[1.05rem] text-muted-fg-light leading-relaxed max-w-[480px] opacity-0", children: "most apps inflate your numbers to keep you happy. we calculate the real ones and cite the study behind every single one." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-form-wrapper flex flex-col gap-2.5 opacity-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleFormSubmit, className: "flex flex-col sm:flex-row gap-2.5 max-w-[460px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", "aria-label": "email address", placeholder: "you@email.com", value: email, onChange: (e) => setEmail(e.target.value), className: "flex-1 bg-card-light text-ink border-[3px] border-ink rounded-[10px] px-5 py-3.5 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-electric-light shadow-v5-sm transition-all placeholder:text-ink/30", required: true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "bg-electric-light text-bone font-mono font-bold text-sm border-[3px] border-ink rounded-[10px] px-7 py-3.5 shadow-v5-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-v5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer whitespace-nowrap", children: isSubmitting ? "joining..." : "join the waitlist" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-fg-light", children: [
                "monthly ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-through opacity-40", children: "$10" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-ink", children: "$7.99" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1.5 opacity-30", children: "·" }),
                "yearly ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-through opacity-40", children: "$59.99" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-ink", children: "$47.99" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-ink/40 ml-1", children: "(save 20%). locked at signup." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] font-bold uppercase tracking-wider text-ink/30", children: "NO SPAM · ONE EMAIL AT LAUNCH · NO CREDIT CARD" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: feedback && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
              opacity: 0,
              y: 5
            }, animate: {
              opacity: 1,
              y: 0
            }, exit: {
              opacity: 0,
              y: -5
            }, className: `max-w-[460px] border-[2px] rounded-[8px] px-3 py-2 font-mono font-semibold text-[11px] flex items-center gap-2 ${feedback.success ? "bg-volt text-ink border-ink" : "bg-pink text-bone border-ink"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: feedback.message })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex lg:col-span-5 justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-console-wrapper opacity-0 relative select-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          width: 260,
          height: 528,
          background: "linear-gradient(160deg,#2e2e30 0%,#1a1a1c 100%)",
          borderRadius: 46,
          padding: 11,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 40px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            position: "absolute",
            right: -4,
            top: 98,
            width: 4,
            height: 42,
            background: "#3a3a3c",
            borderRadius: "0 3px 3px 0"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            position: "absolute",
            left: -4,
            top: 82,
            width: 4,
            height: 30,
            background: "#3a3a3c",
            borderRadius: "3px 0 0 3px"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            position: "absolute",
            left: -4,
            top: 120,
            width: 4,
            height: 30,
            background: "#3a3a3c",
            borderRadius: "3px 0 0 3px"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            width: "100%",
            height: "100%",
            background: "#F2ECDE",
            borderRadius: 37,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              padding: "10px 16px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
              position: "relative"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                fontFamily: "'Geist Mono',monospace",
                fontSize: 11,
                fontWeight: 700,
                color: "#111111"
              }, children: "9:41" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                position: "absolute",
                left: "50%",
                top: 8,
                transform: "translateX(-50%)",
                width: 90,
                height: 26,
                background: "#111111",
                borderRadius: 20
              } }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: 4
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-end",
                  height: 11
                }, children: [30, 50, 70, 100].map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  width: 3,
                  height: `${h}%`,
                  background: "#111111",
                  borderRadius: 1
                } }, i)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                  width: 20,
                  height: 10,
                  border: "1.5px solid #111",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  padding: "1px 1px",
                  position: "relative",
                  marginLeft: 2
                }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    position: "absolute",
                    right: -3,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 2,
                    height: 6,
                    background: "#111",
                    borderRadius: "0 1px 1px 0"
                  } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    width: "68%",
                    height: "100%",
                    background: "#111",
                    borderRadius: 1
                  } })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              flex: 1,
              padding: "12px 16px 14px",
              display: "flex",
              flexDirection: "column",
              gap: 9,
              minHeight: 0
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                fontFamily: "'Geist Mono',monospace",
                fontSize: 7.5,
                color: "rgba(17,17,17,0.35)",
                textTransform: "uppercase",
                letterSpacing: "0.18em"
              }, children: "tappd in · calorie target" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  fontFamily: "'Geist Mono',monospace",
                  fontSize: 9,
                  color: "rgba(17,17,17,0.38)",
                  marginBottom: 3
                }, children: "other apps give you" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                  position: "relative",
                  display: "inline-block"
                }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    fontFamily: "'Geist Mono',monospace",
                    fontSize: 21,
                    fontWeight: 700,
                    color: "rgba(17,17,17,0.28)",
                    lineHeight: 1
                  }, children: "2,400 kcal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    right: 0,
                    height: 2.5,
                    background: "#FF3B2F",
                    transform: "translateY(-50%)"
                  } })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                background: "#E8FF00",
                border: "2.5px solid #111",
                borderRadius: 12,
                padding: "10px 14px",
                boxShadow: "4px 4px 0 #111"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  fontFamily: "'Geist Mono',monospace",
                  fontSize: 7.5,
                  color: "rgba(17,17,17,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  marginBottom: 4
                }, children: "your real maintenance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                  display: "flex",
                  alignItems: "baseline",
                  gap: 5
                }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    fontFamily: "'Geist Mono',monospace",
                    fontSize: 40,
                    fontWeight: 900,
                    color: "#111111",
                    lineHeight: 1,
                    letterSpacing: "-0.03em"
                  }, children: "2,050" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    fontFamily: "'Geist Mono',monospace",
                    fontSize: 14,
                    fontWeight: 700,
                    color: "rgba(17,17,17,0.5)"
                  }, children: "kcal" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  fontFamily: "'Geist Mono',monospace",
                  fontSize: 7.5,
                  color: "rgba(17,17,17,0.4)",
                  marginTop: 3
                }, children: "NEAT scored · desk lifestyle" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 6
              }, children: [{
                label: "protein",
                val: "160g",
                color: "#2B3AFF"
              }, {
                label: "carbs",
                val: "220g",
                color: "#FF7A1A"
              }, {
                label: "fat",
                val: "65g",
                color: "#FF2B85"
              }].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                background: "rgba(17,17,17,0.04)",
                border: "1px solid rgba(17,17,17,0.1)",
                borderRadius: 8,
                padding: "7px 4px",
                textAlign: "center"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  fontFamily: "'Geist Mono',monospace",
                  fontSize: 13,
                  fontWeight: 900,
                  color: m.color
                }, children: m.val }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  fontFamily: "'Geist Mono',monospace",
                  fontSize: 7,
                  color: "rgba(17,17,17,0.35)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em"
                }, children: m.label })
              ] }, m.label)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                background: "rgba(17,17,17,0.04)",
                border: "1px solid rgba(17,17,17,0.08)",
                borderRadius: 10,
                padding: "8px 11px"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  fontFamily: "'Geist Mono',monospace",
                  fontSize: 7,
                  color: "rgba(17,17,17,0.3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: 6
                }, children: "your inputs" }),
                [{
                  k: "daily steps",
                  v: "4,200"
                }, {
                  k: "job type",
                  v: "desk job"
                }, {
                  k: "sitting",
                  v: "9 hrs/day"
                }].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: 3
                }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    fontFamily: "'Geist Mono',monospace",
                    fontSize: 8.5,
                    color: "rgba(17,17,17,0.4)"
                  }, children: row.k }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    fontFamily: "'Geist Mono',monospace",
                    fontSize: 8.5,
                    fontWeight: 700,
                    color: "rgba(17,17,17,0.7)"
                  }, children: row.v })
                ] }, row.k))
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: "auto"
              }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  background: "rgba(0,194,168,0.12)",
                  border: "1px solid rgba(0,194,168,0.35)",
                  borderRadius: 4,
                  padding: "2px 7px"
                }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                  fontFamily: "'Geist Mono',monospace",
                  fontSize: 7,
                  fontWeight: 700,
                  color: "#00C2A8",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em"
                }, children: "why?" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                  fontFamily: "'Geist Mono',monospace",
                  fontSize: 7.5,
                  color: "rgba(17,17,17,0.28)"
                }, children: "backed by published research" })
              ] })
            ] })
          ] })
        ] }) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden w-full my-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[110vw] relative -left-[5vw] transform rotate-[-2deg] bg-ink py-4 md:py-5 border-y-[3px] border-ink flex select-none shadow-[0_15px_30px_rgba(17,17,17,0.45)] z-30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { className: "flex whitespace-nowrap text-volt font-mono font-semibold text-xl md:text-3xl tracking-tight gap-8 uppercase-none lowercase pr-8", animate: {
      x: [0, "-50%"]
    }, transition: {
      ease: "linear",
      duration: 16,
      repeat: Infinity
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "evidence-based // mathematically strict // no generic slop // evidence-based // mathematically strict // no generic slop //",
        " "
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "evidence-based // mathematically strict // no generic slop // evidence-based // mathematically strict // no generic slop //",
        " "
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "sec-comp", className: "w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-pink font-mono text-xs font-semibold tracking-wider block mb-2", children: "01 // the market problem" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter leading-[0.9] text-ink mb-6", children: "why pay $380+ a year?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base font-sans font-medium text-muted-fg-light leading-relaxed mb-6", children: "to build a complete, calibrated metabolic stack, you are forced to subscribe to six separate apps. they charge you over $380 a year for fragmented data silos that cannot communicate." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-[3px] border-ink bg-alert-light/10 rounded-[12px] p-5 shadow-v5 relative overflow-hidden select-none flex flex-col items-center justify-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] font-bold text-alert-light uppercase tracking-wider", children: "[total fragmented stack cost]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl md:text-5xl font-mono font-black text-ink tracking-tight", children: "$385.95/yr" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "price-strike-line absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-alert-light w-full origin-left", style: {
              transform: "scaleX(0)"
            } })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4", children: [{
        name: "myfitnesspal",
        price: "$79.99/yr",
        limits: "food database only. pays to scan barcodes, spammy ads, no calorie math."
      }, {
        name: "macrofactor",
        price: "$71.99/yr",
        limits: "metabolic math, but manual logging only. no workouts, no coach."
      }, {
        name: "hevy",
        price: "$23.99/yr",
        limits: "clean workout logger. completely isolated from nutrition and weight."
      }, {
        name: "cronometer",
        price: "$49.99/yr",
        limits: "detailed micros, but tedious entry, complex ui, no coaching context."
      }, {
        name: "cal ai",
        price: "$120.00/yr",
        limits: "photo logging, but expensive, no training, no evidence validation."
      }, {
        name: "lose it!",
        price: "$39.99/yr",
        limits: "weight tracking, but generic calorie math, no citations, popups."
      }].map((app) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "comp-card border-[3px] border-ink bg-card-light/40 rounded-[10px] p-3 md:p-4 text-left font-mono text-xs select-none shadow-v5-sm flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans font-black text-[11px] md:text-sm text-ink leading-tight", children: app.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-alert-light/10 text-alert-light font-bold px-1.5 py-0.5 rounded text-[9px] flex-shrink-0", children: app.price })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] md:text-[10px] text-muted-fg-light font-sans leading-normal", children: app.limits })
      ] }, app.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "sec-solution", className: "w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 flex flex-col justify-center sol-left-panel opacity-0 will-change-gpu", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-pink font-mono text-xs font-semibold tracking-wider block mb-2", children: "02 // the unified solution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter leading-[0.9] text-ink mb-6", children: "evidence-based science." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base font-sans font-medium text-muted-fg-light leading-relaxed", children: "tappd in puts calorie calculation, food logging, training, and coaching into one place. your numbers talk to each other. one subscription, the whole thing." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 flex flex-col items-center justify-center sol-card-wrapper opacity-0 will-change-gpu", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-[580px] h-[320px] sm:h-[400px] md:h-[520px] select-none", style: {
        perspective: "1200px"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sol-card-inner relative w-full h-full", style: {
        transformStyle: "preserve-3d"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 w-full h-full bg-card-light border-[3px] border-ink rounded-[14px] p-5 md:p-8 shadow-v5 flex flex-col justify-between", style: {
          backfaceVisibility: "hidden"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: 48, dotColor: "#E8FF00", iconColor: "#111111" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-2xl tracking-tighter lowercase leading-none", children: "tappd in" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-fg-light uppercase tracking-wider", children: "[fitness context engine]" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-volt text-ink border-[2px] border-ink px-3 py-1 rounded-full text-xs font-mono font-semibold shadow-v5-sm", children: "beta access open" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-auto flex flex-col gap-4 sm:gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-pink block uppercase tracking-wider mb-1", children: "// simple, honest pricing" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl sm:text-3xl font-display font-black text-ink lowercase tracking-tight", children: "one sub. all features." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-[2px] border-ink bg-bone rounded-[10px] p-3 sm:p-5 shadow-v5-sm flex flex-col justify-between min-h-[115px] sm:min-h-[140px] relative overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-[-24px] top-[12px] rotate-[35deg] bg-pink text-bone text-[8px] font-mono font-bold py-1 px-8 border-b-2 border-ink", children: "beta rate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] sm:text-xs font-bold text-muted-fg-light", children: "monthly plan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 sm:mt-2 flex flex-col", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] sm:text-sm font-mono text-ink/40 line-through", children: "$10/mo" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl sm:text-3xl font-display font-black text-ink leading-none", children: "$7.99/mo" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8px] sm:text-[9px] text-muted-fg-light mt-1 sm:mt-3 block", children: "cancel anytime. no commitment." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-[2px] border-ink bg-volt/15 rounded-[10px] p-3 sm:p-5 shadow-v5-sm flex flex-col justify-between min-h-[115px] sm:min-h-[140px] relative overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-[-24px] top-[12px] rotate-[35deg] bg-electric-dark text-bone text-[8px] font-mono font-bold py-1 px-8 border-b-2 border-ink", children: "save 20%" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] sm:text-xs font-bold text-muted-fg-light", children: "yearly plan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 sm:mt-2 flex flex-col", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] sm:text-sm font-mono text-ink/40 line-through", children: "$59.99/yr" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl sm:text-3xl font-display font-black text-ink leading-none", children: "$47.99/yr" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8px] sm:text-[9px] text-muted-fg-light mt-1 sm:mt-3 block", children: "billed annually. best value." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-ink/10 pt-3 font-mono text-[9px] sm:text-[10px] text-muted-fg-light", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "waitlist price is locked at signup. no credit card needed." }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 w-full h-full bg-navy text-bone border-[3px] border-ink rounded-[14px] p-5 md:p-8 shadow-v5 flex flex-col justify-between", style: {
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start border-b border-bone/10 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: 40, dotColor: "#E8FF00", iconColor: "#F2ECDE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-xl tracking-tighter text-bone lowercase", children: "what you get" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-electric text-bone border-[2px] border-bone px-3 py-1 rounded-full text-xs font-mono font-semibold", children: "all-in-one features" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-auto flex flex-col gap-2.5 sm:gap-4 py-2 sm:py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sol-feature-item flex items-start gap-2.5 opacity-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-volt text-xs sm:text-sm font-bold", children: "[01]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans font-bold text-xs sm:text-sm text-bone", children: "track your food, four ways" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-[10px] sm:text-xs text-muted-fg-dark leading-normal", children: "snap a photo, scan a barcode, search it, or just tell the coach what you ate." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sol-feature-item flex items-start gap-2.5 opacity-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-volt text-xs sm:text-sm font-bold", children: "[02]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans font-bold text-xs sm:text-sm text-bone", children: "build and log your workouts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-[10px] sm:text-xs text-muted-fg-dark leading-normal", children: "get a science-based plan made for your week, then log every set right inside it." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sol-feature-item flex items-start gap-2.5 opacity-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-volt text-xs sm:text-sm font-bold", children: "[03]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans font-bold text-xs sm:text-sm text-bone", children: "a coach that knows the science" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-[10px] sm:text-xs text-muted-fg-dark leading-normal", children: "ask anything. every answer is backed by a real study. bring a claim from instagram and it tells you if it holds up." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sol-feature-item flex items-start gap-2.5 opacity-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-volt text-xs sm:text-sm font-bold", children: "[04]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans font-bold text-xs sm:text-sm text-bone", children: "a calorie target that is actually yours" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-[10px] sm:text-xs text-muted-fg-dark leading-normal", children: "we score how much you really move each day, so your number is not a generic guess." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center border-t border-bone/10 pt-3 font-mono text-[9px] sm:text-[10px] text-muted-fg-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "*tap any number in the app to read the study behind it." }) })
        ] })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "sec-f1", className: "w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "f1-title text-pink font-mono text-xs font-semibold tracking-wider block opacity-0", children: "03 // the foundation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "f1-subtitle text-3xl md:text-5xl font-display font-black tracking-tighter leading-none opacity-0", children: "get the number right first." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 flex flex-col relative f1-text-col opacity-0 will-change-gpu", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-ink/5 select-none leading-none mb-1", children: "01" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-pink font-mono text-xs font-semibold tracking-wider block mb-1", children: "the foundation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl font-display font-black tracking-tight mb-3 text-ink leading-tight", children: "real maintenance, no guesses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base font-sans text-muted-fg-light leading-relaxed", children: "most apps guess your maintenance calories using generic activity multipliers. get this number wrong, and every deficit, surplus, and macro calculation on top of it is wrong. we calculate it accurately based on your actual lifestyle, steps, and activity. by working with your true maintenance instead of generic guesses, you will reach your goals faster and healthier." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 flex flex-col gap-4 w-full f1-card-col opacity-0 will-change-gpu", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full text-left bg-volt text-ink border-[3px] border-ink rounded-[14px] p-6 md:p-8 select-none", style: {
            boxShadow: "5px 5px 0px 0px var(--color-ink)"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block font-mono text-xs sm:text-sm md:text-base opacity-70 mb-3 max-w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "what other apps assume you burn: 2,400 kcal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "other apps assume: 2,400 kcal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "f1-strike-line", className: "absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-alert-light w-full origin-left", style: {
                transform: "scaleX(0)"
              } })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col mt-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-semibold tracking-wider text-muted-fg-light mb-1 block", children: "[calculating neat-aware calibration]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: "f1-kcal-val", className: "text-5xl md:text-7xl font-mono font-semibold tracking-tighter leading-none block", children: "2,400 kcal" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 text-xs font-mono font-semibold border-t-2 border-ink/20 pt-4 flex justify-between items-center opacity-70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "[scored from your real life]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "recalculates every 3 weeks" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2.5 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "f1-tag font-mono text-xs border-[2px] border-ink bg-card-light rounded-lg px-4 py-2 shadow-v5-sm opacity-0 translate-y-4", children: "desk hours" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "f1-tag font-mono text-xs border-[2px] border-ink bg-card-light rounded-lg px-4 py-2 shadow-v5-sm opacity-0 translate-y-4", children: "daily steps" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "f1-tag font-mono text-xs border-[2px] border-ink bg-card-light rounded-lg px-4 py-2 shadow-v5-sm opacity-0 translate-y-4", children: "job type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "f1-tag font-mono text-xs border-[2px] border-ink bg-card-light rounded-lg px-4 py-2 shadow-v5-sm opacity-0 translate-y-4", children: "commute" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "sec-f2", className: "w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 flex flex-col f2-text-col opacity-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-ink/5 select-none leading-none mb-1", children: "02" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-pink font-mono text-xs font-semibold tracking-wider block mb-1", children: "nutrition" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl font-display font-black tracking-tight mb-3 text-ink leading-tight", children: "snap your plate. get the macros." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base font-sans text-muted-fg-light leading-relaxed mb-6", children: "take a photo of any dish. the app reads what is on the plate, gives you editable weights and portions, and lets you adjust before anything gets logged. nothing is automatic." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "f2-oil-badge bg-volt border-[3px] border-ink rounded-[10px] px-4 py-3 shadow-v5-sm opacity-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] font-bold uppercase tracking-wider text-ink/60 block mb-1", children: "the detail no other app has" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-sans font-bold text-sm text-ink", children: "cooked meal? we flag it and make you log the oil separately. ghee, butter, coconut oil. the calories nobody counts. we count them." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 f2-card-col opacity-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card-light border-[3px] border-ink rounded-[14px] p-5 md:p-6 shadow-v5-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-bold text-ink/40 uppercase tracking-wider", children: "ai scan result" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-electric-light text-bone font-mono text-[9px] font-bold px-2.5 py-1 rounded-full border-[2px] border-ink", children: "ai scan" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-ink/6 border-[2px] border-ink/20 rounded-[10px] h-28 mb-4 overflow-hidden flex items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-3 border border-dashed border-ink/20 rounded-[6px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 h-[2px] bg-electric-light/60 shadow-[0_0_8px_rgba(43,58,255,0.5)]", style: {
            top: "55%"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-ink/30 uppercase tracking-widest", children: "scanning image" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-fg-light uppercase tracking-wider", children: "detected" }),
          [{
            name: "grilled salmon fillet",
            weight: "180g",
            kcal: "320 kcal"
          }, {
            name: "sweet potato, baked",
            weight: "150g",
            kcal: "130 kcal"
          }, {
            name: "asparagus, steamed",
            weight: "80g",
            kcal: "18 kcal"
          }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "f2-scan-item flex justify-between items-center font-mono text-xs py-2 px-3 bg-bone border border-ink/10 rounded-[7px] opacity-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-ink text-[11px]", children: item.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-fg-light text-[9px]", children: [
                item.weight,
                " · editable"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-ink", children: item.kcal })
          ] }, item.name))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-3 border-t border-ink/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-fg-light", children: "*pulled from icmr-nin, usda, and open food facts" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-black text-ink", children: "468 kcal" })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "sec-f2b", className: "w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "f2b-title font-mono text-xs font-semibold tracking-wider text-pink block mb-3 opacity-0", children: "02 // logging methods" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "f2b-subtitle text-3xl md:text-4xl lg:text-5xl font-display font-black tracking-tighter leading-none opacity-0", children: [
          "four ways in.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "none of them annoying."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [{
        num: "01",
        title: "ai photo scan",
        body: "snap your plate. the app reads the dish, gives you editable weights, and asks about oil if it was cooked.",
        note: "snap and confirm. nothing auto-logged.",
        accent: "bg-electric-light"
      }, {
        num: "02",
        title: "barcode scan",
        body: "point at any packaged product. it reads the label and pulls up the macros instantly.",
        note: "over 1.4 million products",
        accent: "bg-orange"
      }, {
        num: "03",
        title: "manual search",
        body: "search from desi staples, whole foods, and packaged brands. your 30 most recent foods are one tap away.",
        note: "your history pre-loaded",
        accent: "bg-teal"
      }, {
        num: "04",
        title: "log from chat",
        body: "tell the coach what you ate. it understands, confirms the weights, and logs it without switching screens.",
        note: "just describe it in plain english",
        accent: "bg-violet"
      }].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "f2b-method border-[3px] border-ink rounded-[12px] bg-card-light p-5 shadow-v5-sm opacity-0 flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-bold text-muted-fg-light", children: m.num }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-2.5 h-2.5 rounded-full ${m.accent} border-[2px] border-ink` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display font-black text-lg tracking-tight text-ink leading-tight", children: m.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-sans text-sm text-muted-fg-light leading-relaxed flex-1", children: m.body }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-ink/35 uppercase tracking-wider", children: m.note })
      ] }, m.num)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "sec-f3", className: "w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 flex flex-col f3-text-col opacity-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-ink/5 select-none leading-none mb-1", children: "03" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-pink font-mono text-xs font-semibold tracking-wider block mb-1", children: "workout generator" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl font-display font-black tracking-tight mb-3 text-ink leading-tight", children: "built around your week, not a template." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base font-sans text-muted-fg-light leading-relaxed mb-5", children: "tell us how many days you can train, how long each session, what equipment you have, your experience level, and how hard you want to push. we generate a split with volume targets backed by research, and every exercise carries a rationale." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["days per week", "session length", "equipment", "experience", "intensity", "injury notes"].map((chip) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "f3-input-chip font-mono text-[9px] font-bold uppercase tracking-wide border-[2px] border-ink rounded-[6px] px-2.5 py-1 bg-card-light shadow-v5-sm opacity-0", children: chip }, chip)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 f3-card-col opacity-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card-light border-[3px] border-ink rounded-[14px] p-5 md:p-6 shadow-v5-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-5 pb-4 border-b border-ink/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-bold text-ink/40 uppercase tracking-wider", children: "generated plan" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-volt text-ink border-[2px] border-ink font-mono text-[9px] font-bold px-2.5 py-1 rounded-[6px]", children: "push · pull · legs" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5 mb-5", children: [{
          day: "mon",
          name: "push A",
          muscles: "chest · shoulders · triceps",
          active: true
        }, {
          day: "tue",
          name: "pull A",
          muscles: "back · biceps · rear delts",
          active: false
        }, {
          day: "wed",
          name: "rest",
          muscles: "active recovery",
          active: false
        }, {
          day: "thu",
          name: "legs A",
          muscles: "quads · hamstrings · glutes",
          active: false
        }, {
          day: "fri",
          name: "push B",
          muscles: "chest · shoulders · triceps",
          active: false
        }, {
          day: "sat",
          name: "pull B",
          muscles: "back · biceps",
          active: false
        }].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `f3-day-chip flex justify-between items-center font-mono text-[11px] px-3 py-2 rounded-[8px] border-[2px] border-ink opacity-0 ${row.active ? "bg-volt text-ink shadow-v5-sm" : "bg-bone text-muted-fg-light"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold text-[10px] uppercase ${row.active ? "text-ink" : "text-electric-light"}`, children: row.day }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-bold ${row.active ? "text-ink" : "text-ink/70"}`, children: row.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] ${row.active ? "text-ink/60" : "text-ink/30"}`, children: row.muscles })
        ] }, row.day)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center pt-3 border-t border-ink/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-fg-light", children: "*volume targets cite schoenfeld et al. 2017" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-teal/15 border border-teal/40 text-teal font-mono text-[8px] font-bold px-2 py-0.5 rounded", children: "evidence-based" })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "sec-f3b", className: "w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-14 items-start md:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 f3b-card-col opacity-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-navy text-bone border-[3px] border-ink rounded-[14px] p-5 md:p-6 shadow-v5-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-5 pb-4 border-b border-bone/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-bone/40 uppercase tracking-wider block", children: "active session" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-xl text-bone tracking-tight", children: "push day A" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2.5 w-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-volt" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] font-bold text-volt uppercase", children: "logging" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-baseline mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-lg text-bone tracking-tight", children: "incline dumbbell press" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-bone/40", children: "4 sets · 8-12 reps · RIR 2" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: [{
            set: "set 1",
            weight: "34 kg",
            reps: "10",
            status: "logged"
          }, {
            set: "set 2",
            weight: "34 kg",
            reps: "9",
            status: "logged"
          }, {
            set: "set 3",
            weight: "34 kg",
            reps: "8",
            status: "logged"
          }, {
            set: "set 4",
            weight: "34 kg",
            reps: "",
            status: "active"
          }].map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `f3b-set-row flex justify-between items-center font-mono text-xs px-3 py-2 rounded-[8px] border-[2px] opacity-0 ${row.status === "logged" ? "border-bone/15 bg-bone/5 text-bone/70" : "border-volt bg-volt/10 text-volt"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: row.set }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: row.weight }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: row.reps ? `${row.reps} reps` : "logging..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] font-bold ${row.status === "logged" ? "text-bone/30" : "text-volt"}`, children: row.status })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "f3b-pr-row bg-volt/10 border border-volt/30 rounded-[8px] px-3 py-2 mb-4 opacity-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] font-bold text-volt uppercase tracking-wide block", children: "pr matched" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-bone/70", children: "34kg x 10 ties your best. push to 36kg next session." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-bone/10 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-bone/35 uppercase tracking-wider block mb-2.5", children: "weekly volume so far" }),
          [{
            muscle: "chest",
            sets: 14,
            max: 20
          }, {
            muscle: "shoulders",
            sets: 10,
            max: 20
          }, {
            muscle: "triceps",
            sets: 8,
            max: 20
          }].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8px] text-bone/45 w-16 flex-shrink-0", children: v.muscle }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 bg-bone/8 h-1.5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "f3b-vol-bar h-full bg-volt rounded-full opacity-0", style: {
              width: `${v.sets / v.max * 100}%`
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[8px] text-bone/40 w-10 text-right", children: [
              v.sets,
              "/20"
            ] })
          ] }, v.muscle))
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 flex flex-col f3b-text-col opacity-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-ink/5 select-none leading-none mb-1", children: "03b" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-pink font-mono text-xs font-semibold tracking-wider block mb-1", children: "workout logger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl font-display font-black tracking-tight mb-3 text-ink leading-tight", children: "log every set. the data does the rest." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base font-sans text-muted-fg-light leading-relaxed mb-5", children: "your generated plan becomes your active session. log weight, reps, and reps-in-reserve for every set. personal records track themselves. close the app mid-session and your progress is still there when you come back." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [{
          title: "automatic PR detection",
          body: "every lift is matched to your history. no manual tracking."
        }, {
          title: "live volume tracker",
          body: "weekly sets per muscle update as you log, showing exactly where you stand."
        }, {
          title: "rest timers + tempo cues",
          body: "built into every exercise. never guess how long to rest."
        }, {
          title: "crash recovery",
          body: "close the app mid-session. your active workout is still there when you come back."
        }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-orange mt-[7px] flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-bold text-ink uppercase tracking-wide block mb-0.5", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-sm text-muted-fg-light", children: f.body })
          ] })
        ] }, f.title)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "sec-f4", className: "w-full flex flex-col justify-center max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center mb-8 md:mb-12 f4-text-col opacity-0 will-change-gpu", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-pink font-mono text-xs font-semibold tracking-wider block mb-2 uppercase", children: "04 // the coach" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl md:text-5xl font-display font-black tracking-tight mb-4 text-ink leading-tight lowercase", children: "science-backed coaching" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base font-sans text-muted-fg-light leading-relaxed max-w-2xl", children: "the coach knows your numbers. your calories today, your last workout, how your training volume is stacking up, what you ate. it answers from that context, not from a generic playbook. every response cites a study. no bro science, no invented claims." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "f4-coach-chat", className: "w-full max-w-2xl mx-auto bg-navy text-bone border-[3px] border-ink rounded-[14px] p-5 md:p-8 shadow-v5 flex flex-col justify-between sm:min-h-[360px] md:min-h-[420px] f4-card-col opacity-0 will-change-gpu", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-5 border-b border-bone/10 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: 40, dotColor: "#E8FF00", iconColor: "#F2ECDE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-black text-xl tracking-tighter text-bone lowercase leading-none", children: "tappd coach" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-fg-dark uppercase tracking-wider mt-1", children: "[active coach engine]" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-volt text-ink border-[2px] border-ink px-3 py-1 rounded-full text-xs font-mono font-semibold animate-pulse shadow-v5-sm", children: "active" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-4 font-mono text-xs mb-6 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "f4-chat-bubble self-end max-w-[85%] bg-bone/10 border border-bone/20 text-bone rounded-lg px-3 py-2 font-semibold text-right opacity-0 text-[11px] sm:text-xs", children: "why's my bench stalling?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "f4-chat-bubble self-start max-w-[90%] bg-volt text-ink rounded-lg px-4 py-3 text-left font-sans font-bold leading-normal border-[3px] border-ink shadow-v5-sm opacity-0 relative text-xs sm:text-sm my-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-3 bg-pink text-bone border-[2px] border-ink px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-mono uppercase tracking-wider shadow-v5-none select-none", children: "coach response" }),
              "your protein is 32g short, 3 days this week. bump it to 165g."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mt-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-bone/5 border border-bone/10 text-bone/45 text-[10px] font-mono px-4 py-3 rounded-[8px] flex justify-between items-center select-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ask anything (e.g., how's my training frequency?) ..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-3.5 bg-volt animate-pulse" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-bone/10 flex justify-between items-center select-none text-[9px] text-bone/45 font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "*every response cites a real study. ask it to show you." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "coach active" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "sec-why", className: "w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 flex flex-col gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "why-title font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-teal opacity-0", children: "BUILT INTO EVERY SCREEN" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "why-subtitle opacity-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-black text-[2rem] md:text-[3rem] lg:text-[3.6rem] tracking-tighter leading-[0.9] text-ink", children: [
          "tap why.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "read the paper."
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "why-desc font-sans font-medium text-base md:text-lg text-muted-fg-light leading-relaxed max-w-md opacity-0", children: [
          "everywhere the app gives you a number or tells you to do something, there is a yellow ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-volt border border-ink text-ink font-mono text-[10px] font-black px-1.5 py-0.5 rounded-[4px] mx-0.5", children: "why?" }),
          " chip. tap it. you get the study in plain english, the confidence level, and a link straight to the real paper."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "why-desc flex flex-col gap-4 opacity-0", children: [{
          label: "plain english tldr",
          desc: "what the study actually found, in two sentences. no jargon."
        }, {
          label: "confidence level",
          desc: "high, moderate, or emerging. so you know how settled the science is."
        }, {
          label: "the real study",
          desc: "one tap opens the actual paper. read it yourself. verify us."
        }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-teal mt-[7px] flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-bold text-ink uppercase tracking-wide block mb-0.5", children: f.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-sm text-muted-fg-light leading-relaxed", children: f.desc })
          ] })
        ] }, f.label)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 flex justify-center lg:justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "why-card opacity-0 w-full max-w-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card-light border-[3px] border-ink rounded-[14px] p-5 shadow-v5-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 pb-4 border-b border-ink/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-bold text-ink/40 uppercase tracking-wider", children: "your daily targets" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-fg-light", children: "tap [why?] on anything" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-0 mb-4", children: [{
          label: "maintenance",
          val: "2,050 kcal"
        }, {
          label: "fat loss target",
          val: "1,710 kcal"
        }, {
          label: "protein",
          val: "160g"
        }].map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex justify-between items-center py-2.5 ${i < 2 ? "border-b border-ink/8" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-sm font-medium text-muted-fg-light", children: row.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-black text-ink", children: row.val }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `border-[2px] border-ink font-mono text-[9px] font-black px-1.5 py-0.5 rounded-[5px] shadow-v5-sm select-none ${i === 2 ? "bg-volt text-ink" : "bg-bone text-ink/50"}`, children: "why?" })
          ] })
        ] }, row.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-navy border-[2px] border-ink rounded-[10px] overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 pt-3 pb-2 border-b border-bone/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8px] font-bold text-teal uppercase tracking-wider", children: "protein" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 rounded-full bg-bone/20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8px] text-bone/40", children: "why your target is 160g" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-teal/15 border border-teal/35 text-teal font-mono text-[7px] font-bold px-2 py-0.5 rounded uppercase tracking-wide", children: "HIGH" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-sans text-sm text-bone/85 leading-relaxed", children: "protein intakes of 1.6 to 2.4g/kg per day maximise muscle growth and retention. past this range, extra protein has no measurable benefit. those calories are better spent on carbs." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2.5 border-t border-bone/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8.5px] text-bone/50 block", children: "morton rw et al." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8.5px] text-bone/35 block", children: "british journal of sports medicine · 2018" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-teal/15 border border-teal/35 text-teal font-mono text-[9px] font-bold px-3 py-1.5 rounded-[6px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "read study" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "→" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-muted-fg-light text-center mt-4 pt-3 border-t border-ink/8", children: "every why? card links to the actual study. tap and it opens. read it yourself." })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "sec-sys", className: "w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sys-title text-teal font-mono text-xs font-semibold tracking-wider block opacity-0", children: "05 // the science" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "sys-subtitle text-3xl md:text-5xl font-display font-black tracking-tighter leading-none opacity-0", children: "a citation behind every number." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sys-desc text-base md:text-lg font-sans font-medium text-muted-fg-light max-w-2xl opacity-0", children: "tap any calorie target, macro split, or training recommendation in the app. a card opens with the claim in plain english, a confidence rating, and a link to the actual study. open it. read it. verify us." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [{
        category: "PROTEIN",
        claim: "1.6 to 2.4g of protein per kg is all you need to maximise muscle growth. past that, the extra does nearly nothing.",
        author: "morton rw et al.",
        journal: "br j sports med",
        year: "2018"
      }, {
        category: "FAT LOSS",
        claim: "a 300 to 500 kcal deficit loses fat at a sustainable rate without the muscle loss or metabolic adaptation that crash diets cause.",
        author: "hall kd et al.",
        journal: "obesity",
        year: "2012"
      }, {
        category: "TRAINING VOLUME",
        claim: "10 to 20 sets per muscle per week is the evidence-based sweet spot for hypertrophy. under 10 you leave gains on the table.",
        author: "schoenfeld bj et al.",
        journal: "j strength cond res",
        year: "2017"
      }, {
        category: "NEAT",
        claim: "daily movement outside the gym can vary calorie burn by up to 2,000 kcal between two people of the same size. most apps ignore this.",
        author: "levine ja et al.",
        journal: "science",
        year: "1999"
      }].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sys-card bg-navy text-bone border-[3px] border-ink rounded-[12px] p-5 shadow-v5-sm opacity-0 flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] font-bold text-teal uppercase tracking-wider", children: card.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-teal/15 border border-teal/35 text-teal font-mono text-[7px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wide", children: "HIGH" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-sans text-sm text-bone/90 leading-relaxed flex-1 mb-5", children: card.claim }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-bone/10 pt-3 mt-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[8.5px] text-bone/45 block leading-relaxed", children: [
          card.author,
          " · ",
          card.journal,
          " · ",
          card.year
        ] }) })
      ] }, card.category)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "sys-card mt-8 font-mono text-[10px] text-muted-fg-light text-center opacity-0", children: "every card in the app carries a real doi. tap it and the paper opens. we show our work." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "sec-faq", className: "w-full flex flex-col justify-center max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "faq-title text-pink font-mono text-xs font-semibold tracking-wider block opacity-0", children: "06 // faq" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "faq-subtitle text-3xl md:text-5xl font-display font-black tracking-tighter leading-none opacity-0", children: "fair questions." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: [{
        q: "is it really evidence-based or is that marketing?",
        a: "it is real. every claim in the app links to an actual published study you can open and read yourself. for example, we cap the protein target at 1.8g per kg because the research shows more than that does almost nothing for muscle. that is not our opinion, it is what the studies found."
      }, {
        q: "what makes your calorie number different from myfitnesspal?",
        a: "most apps assume you move more than you do. we actually score your daily movement (your steps, your sitting hours, your job). for someone with a desk job, the real number is often 300 to 400 calories lower than what other apps hand you. that gap is exactly why the scale stops moving."
      }, {
        q: "do i need an account to start?",
        a: "no. you can set up and see your real maintenance number in about 2 minutes with no account. accounts are for syncing across devices."
      }, {
        q: "android or ios?",
        a: "android first. ios shortly after. join the waitlist and you get the download link on launch day."
      }, {
        q: "what does the 20% off actually lock?",
        a: "join before launch and you keep the founder rate forever: $7.99/mo on monthly or $47.99/yr on yearly. after launch, prices go to $10/mo and $59.99/yr."
      }, {
        q: "will my email get spammed?",
        a: "no. one email on launch day with your download link. that is it. you decide what to do after."
      }].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("details", { className: "faq-item group border-[3px] border-ink rounded-[10px] bg-card-light shadow-v5-sm overflow-hidden opacity-0 will-change-gpu", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("summary", { className: "flex justify-between items-center px-5 py-4 cursor-pointer select-none list-none font-sans font-bold text-sm md:text-base text-ink gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.q }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 font-mono text-base font-black text-ink group-open:rotate-45 transition-transform duration-200 w-5 h-5 flex items-center justify-center border-[2px] border-ink rounded-[4px]", children: "+" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-5 pt-1 font-sans text-sm text-muted-fg-light leading-relaxed border-t border-ink/10", children: item.a })
      ] }, item.q)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "sec-foot", className: "w-full flex flex-col justify-center max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 md:min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "foot-box bg-navy text-bone border-[3px] border-ink rounded-[14px] p-8 md:p-12 shadow-v5-lg flex flex-col justify-between gap-12 opacity-0 will-change-gpu", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-bone/10 pb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "foot-badge text-volt font-mono text-xs font-semibold tracking-wider opacity-0", children: "waitlist · founder pricing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "foot-title text-3xl md:text-5xl lg:text-7xl font-display font-black tracking-tighter leading-[0.9] text-bone flex flex-wrap items-center gap-3 opacity-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "stop guessing." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "foot-headline inline-flex items-center gap-3 text-volt opacity-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { size: 64, dotColor: "#E8FF00", iconColor: "#F2ECDE", className: "translate-y-2" }),
              "tappd in."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "foot-desc text-base md:text-lg font-sans font-medium text-muted-fg-dark leading-relaxed max-w-md opacity-0", children: "one email on launch day. your founder discount is locked the moment you submit. no spam, no upsells, no surprise charges." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-volt text-ink border-[3px] border-ink rounded-[10px] p-5 shadow-v5-lg-dark max-w-xs select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold block mb-1", children: "FOUNDER PRICING. LOCKED AT SIGNUP." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-display font-black leading-none block", children: "20% off. forever." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-col gap-1.5 font-mono text-[10px] text-ink/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "monthly" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-through", children: "$10/mo" }),
                " → ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-ink", children: "$7.99/mo" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "yearly" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-through", children: "$59.99/yr" }),
                " → ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-ink", children: "$47.99/yr" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono mt-2 text-ink/60", children: "no credit card required. price locks the moment you join." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleFormSubmit, className: "foot-form flex flex-col sm:flex-row gap-4 max-w-2xl select-none opacity-0", "aria-label": "waitlist capture", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", id: "waitlist-email-bottom", "aria-label": "email address", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@domain.com", className: "w-full bg-transparent text-bone font-bold placeholder:text-bone/30 text-base border-[3px] border-bone rounded-[10px] px-5 py-4 outline-none transition-all duration-100 shadow-v5-dark focus:shadow-v5-lg-dark focus:translate-x-[-2px] focus:translate-y-[-2px] lowercase focus:ring-2 focus:ring-volt", disabled: isSubmitting }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isSubmitting, className: "bg-electric-dark text-bone border-[3px] border-bone rounded-[10px] px-8 py-4 font-sans font-bold text-base md:text-lg cursor-pointer flex items-center justify-center gap-2 select-none transition-all duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 tap:translate-x-0.5 tap:translate-y-0.5", style: {
            boxShadow: "3px 3px 0px 0px var(--color-bone)"
          }, children: isSubmitting ? "joining..." : "join waitlist →" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: feedback && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          y: -10
        }, className: `mt-4 max-w-2xl border-[3px] rounded-[10px] px-4 py-3 font-mono font-semibold text-xs flex items-center gap-2 ${feedback.success ? "bg-volt text-ink border-volt shadow-v5-sm" : "bg-pink text-bone border-pink shadow-v5-sm-dark"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-current" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: feedback.message })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "foot-details border-t border-bone/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs font-mono font-semibold text-muted-fg-dark gap-4 opacity-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "© 2026 tappd in. all rights reserved." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "the fitness app that shows its work." })
      ] })
    ] }) })
  ] });
}
export {
  Index as component
};

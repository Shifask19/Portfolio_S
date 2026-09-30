"use client";

import { useEffect, useState } from "react";
import { Download, GithubIcon, LinkedinIcon, Mail, ChevronDown, Terminal, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/content/profile";

const ROTATING_TITLES = [
  "Software Engineer",
  "AI / ML Builder",
  "QA Automation",
  "Full-Stack Dev",
];

const CODE_LINES = [
  { text: "class ShifaShaikh:", color: "text-accent-400" },
  { text: '  role = "Software Engineer"', color: "text-blue-400" },
  { text: '  stack = ["Python","React","AI/ML"]', color: "text-purple-400" },
  { text: '  open_to_work = True', color: "text-emerald-400" },
  { text: "", color: "" },
  { text: "  def build(self, idea):", color: "text-accent-400" },
  { text: '    return ship(idea) ✨', color: "text-yellow-400" },
];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [codeVisible, setCodeVisible] = useState(0);

  // Typewriter for titles
  useEffect(() => {
    if (shouldReduceMotion) return;
    const target = ROTATING_TITLES[titleIdx];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
      } else {
        setTitleIdx((i) => (i + 1) % ROTATING_TITLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, titleIdx, shouldReduceMotion]);

  // Animate code lines sequentially
  useEffect(() => {
    if (shouldReduceMotion) { setCodeVisible(CODE_LINES.length); return; }
    if (codeVisible < CODE_LINES.length) {
      const t = setTimeout(() => setCodeVisible((v) => v + 1), 280);
      return () => clearTimeout(t);
    }
  }, [codeVisible, shouldReduceMotion]);

  const fade = shouldReduceMotion ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 } };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Grid + gradient background */}
      <div
        className="absolute inset-0 dot-grid opacity-60 dark:opacity-100"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 gradient-mesh"
        aria-hidden="true"
      />

      {/* Glowing orbs */}
      {!shouldReduceMotion && (
        <>
          <div
            className="pointer-events-none absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-accent-500/6 blur-[120px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-emerald-500/5 blur-[100px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-accent-500/3 blur-[80px]"
            aria-hidden="true"
          />
        </>
      )}

      <div className="container-max relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-32 lg:py-0">
        {/* Left: Text content */}
        <div className="flex flex-col items-start gap-6 text-left">
          {/* Status badge */}
          <motion.div
            {...fade}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-500/30 bg-accent-500/8 text-accent-700 dark:text-accent-400 text-sm font-medium"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
            </span>
            Available for fresher roles
          </motion.div>

          {/* Name */}
          <motion.h1
            {...fade}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="heading-xl text-slate-900 dark:text-slate-50 leading-tight"
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text block sm:inline">{profile.name}</span>
          </motion.h1>

          {/* Rotating role */}
          <motion.div
            {...fade}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2"
            aria-label={`Specialisation: ${ROTATING_TITLES[titleIdx]}`}
          >
            <span className="text-xl sm:text-2xl font-mono font-semibold text-slate-500 dark:text-slate-400">
              &gt;
            </span>
            <span className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-200 min-h-[2rem] flex items-center">
              {shouldReduceMotion ? profile.title : displayed}
              {!shouldReduceMotion && (
                <span
                  className="inline-block w-0.5 h-6 bg-accent-500 ml-0.5 cursor-blink"
                  aria-hidden="true"
                />
              )}
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            {...fade}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg"
          >
            {profile.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fade}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href={profile.resumeUrl}
              download
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-500 text-white font-semibold hover:bg-accent-600 transition-all shadow-glow-sm hover:shadow-glow hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
              aria-label="Download resume as PDF"
            >
              <Download size={17} aria-hidden="true" />
              Download Resume
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:border-accent-500/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
            >
              <Sparkles size={17} aria-hidden="true" />
              Get in touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            {...fade}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-3"
          >
            {[
              { href: profile.github, label: "GitHub profile (opens in new tab)", icon: <GithubIcon size={19} aria-hidden="true" /> },
              { href: `https://${profile.linkedin}`, label: "LinkedIn profile (opens in new tab)", icon: <LinkedinIcon size={19} aria-hidden="true" /> },
              { href: `mailto:${profile.email}`, label: `Send email to ${profile.email}`, icon: <Mail size={19} aria-hidden="true" /> },
            ].map(({ href, label, icon }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-accent-500 dark:hover:text-accent-400 hover:border-accent-500/50 hover:bg-accent-500/5 transition-all"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: Code terminal card */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, x: 40, scale: 0.96 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:block"
          aria-hidden="true"
        >
          <div className="relative">
            {/* Glow behind the card */}
            <div className="absolute inset-0 bg-accent-500/10 blur-3xl rounded-3xl scale-95" />
            {/* Terminal card */}
            <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white/90 dark:bg-[#0c1224]/90 backdrop-blur-sm shadow-card dark:shadow-card-dark overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/40">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <div className="flex items-center gap-1.5 ml-3 text-xs text-slate-400 font-mono">
                  <Terminal size={11} />
                  <span>shifa.py</span>
                </div>
              </div>
              {/* Code body */}
              <div className="p-6 font-mono text-sm space-y-1.5 min-h-[220px]">
                {CODE_LINES.slice(0, codeVisible).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${line.color || "text-slate-300"} whitespace-pre`}
                  >
                    {line.text || "\u00A0"}
                  </motion.div>
                ))}
                {codeVisible < CODE_LINES.length && (
                  <span className="inline-block w-2 h-4 bg-accent-500 cursor-blink" />
                )}
              </div>
            </div>

            {/* Floating stat chips */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-card text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
            >
              <span className="text-accent-500">⚡</span> 6+ Projects
            </motion.div>
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-card text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5"
            >
              <span className="text-emerald-500">🏆</span> Hackathon Winner
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!shouldReduceMotion && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-600 hover:text-accent-500 transition-colors"
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Scroll down to next section"
        >
          <ChevronDown size={26} aria-hidden="true" />
        </motion.button>
      )}
    </section>
  );
}

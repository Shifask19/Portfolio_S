"use client";

import { motion } from "framer-motion";
import { Mail, GithubIcon, LinkedinIcon, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { profile } from "@/content/profile";
import { useInView } from "@/hooks/useInView";

export function Contact() {
  const [ref, inView] = useInView({ threshold: 0.12 });

  return (
    <section
      id="contact"
      className="section-padding relative bg-slate-50/60 dark:bg-[#0a0a14]/60 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 gradient-mesh opacity-60"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 dot-grid opacity-40 dark:opacity-60"
        aria-hidden="true"
      />

      <div className="container-max relative z-10">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Centered heading */}
          <div className="text-center mb-12">
            <p className="text-accent-600 dark:text-accent-400 text-sm font-semibold uppercase tracking-widest mb-3">
              Get in touch
            </p>
            <h2
              id="contact-heading"
              className="heading-lg text-slate-900 dark:text-slate-100 mb-5"
            >
              Let&apos;s <span className="gradient-text">connect</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              I&apos;m actively looking for fresher opportunities in software engineering,
              AI/ML, and QA. If you think I&apos;d be a good fit, reach out — I&apos;d love to chat.
            </p>
          </div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-center"
          >
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-accent-500 text-white font-bold text-base hover:bg-accent-600 transition-all shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
              aria-label={`Send email to ${profile.email}`}
            >
              <Sparkles size={18} aria-hidden="true" />
              Say hello
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <p className="mt-3 text-xs text-slate-400 font-mono">{profile.email}</p>
          </motion.div>

          {/* Contact cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: <Mail size={22} aria-hidden="true" />,
                label: "Email",
                value: "shifashaikhriyaz",
                href: `mailto:${profile.email}`,
                external: false,
              },
              {
                icon: <LinkedinIcon size={22} aria-hidden="true" />,
                label: "LinkedIn",
                value: "shifa-shaikh",
                href: `https://${profile.linkedin}`,
                external: true,
              },
              {
                icon: <GithubIcon size={22} aria-hidden="true" />,
                label: "GitHub",
                value: "Shifask19",
                href: profile.github,
                external: true,
              },
            ].map((card, i) => (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="card-base card-hover flex flex-col items-center gap-3 text-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
                aria-label={`${card.label}: ${card.value}${card.external ? " (opens in new tab)" : ""}`}
              >
                <div className="p-3 rounded-xl bg-accent-500/10 text-accent-500 group-hover:bg-accent-500 group-hover:text-white group-hover:scale-110 transition-all">
                  {card.icon}
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">
                    {card.label}
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    {card.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
            <MapPin size={13} aria-hidden="true" />
            <span>Based in {profile.location}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

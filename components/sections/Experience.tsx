"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Calendar } from "lucide-react";
import { experiences } from "@/content/experience";
import { useInView } from "@/hooks/useInView";

/* Visual identity per company */
const COMPANY_META: Record<string, { initials: string; color: string; bg: string }> = {
  QSpiders: { initials: "QS", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10 dark:bg-blue-500/15" },
  "Infosys Springboard": { initials: "IS", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500/10 dark:bg-purple-500/15" },
};

export function Experience() {
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <section
      id="experience"
      className="section-padding relative bg-slate-50/60 dark:bg-[#0a0a14]/60 overflow-hidden"
      aria-labelledby="experience-heading"
    >
      {/* Accent glow */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-500/4 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-max relative z-10">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent-600 dark:text-accent-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Work experience
          </p>
          <h2
            id="experience-heading"
            className="heading-lg text-slate-900 dark:text-slate-100 mb-14"
          >
            Where I&apos;ve worked
          </h2>

          {/* Timeline */}
          <div className="relative max-w-3xl">
            {/* Vertical line */}
            <div
              className="absolute left-[22px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-500 via-accent-500/40 to-transparent"
              aria-hidden="true"
            />

            <ol className="space-y-8" aria-label="Work experience timeline">
              {experiences.map((exp, i) => {
                const meta = COMPANY_META[exp.company] ?? {
                  initials: exp.company.slice(0, 2).toUpperCase(),
                  color: "text-accent-600 dark:text-accent-400",
                  bg: "bg-accent-500/10",
                };
                return (
                  <motion.li
                    key={`${exp.company}-${exp.period}`}
                    initial={{ opacity: 0, x: -32 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.18 }}
                    className="relative pl-14"
                  >
                    {/* Timeline dot with company initial */}
                    <div
                      className={`absolute left-0 top-1 h-11 w-11 rounded-xl ${meta.bg} border border-slate-200 dark:border-slate-700/60 flex items-center justify-center shadow-sm`}
                      aria-hidden="true"
                    >
                      <span className={`text-xs font-bold font-mono ${meta.color}`}>
                        {meta.initials}
                      </span>
                    </div>

                    <div className="card-base card-hover">
                      {/* Header row */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base leading-tight">
                            {exp.role}
                          </h3>
                          <p className={`text-sm font-semibold mt-0.5 ${meta.color}`}>
                            {exp.company}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                          <span className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full font-medium">
                            <Calendar size={11} aria-hidden="true" />
                            {exp.period}
                          </span>
                          {exp.current && (
                            <span className="flex items-center gap-1 text-xs text-accent-600 dark:text-accent-400 bg-accent-500/10 border border-accent-500/20 px-2.5 py-1.5 rounded-full font-semibold">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent-500 animate-pulse" aria-hidden="true" />
                              Current
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2.5" aria-label="Responsibilities and achievements">
                        {exp.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-400"
                          >
                            <CheckCircle2
                              size={15}
                              className="text-accent-500 mt-0.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span className="leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

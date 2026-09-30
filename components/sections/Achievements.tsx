"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Award, Medal, BadgeCheck } from "lucide-react";
import { achievements, certifications } from "@/content/certifications";
import { useInView } from "@/hooks/useInView";

const iconMap = {
  trophy: Trophy,
  star: Star,
  award: Award,
  medal: Medal,
};

const iconColors: Record<string, string> = {
  trophy: "text-yellow-500",
  star: "text-blue-500",
  award: "text-purple-500",
  medal: "text-orange-500",
};

const iconBg: Record<string, string> = {
  trophy: "bg-yellow-500/10 dark:bg-yellow-500/15",
  star: "bg-blue-500/10 dark:bg-blue-500/15",
  award: "bg-purple-500/10 dark:bg-purple-500/15",
  medal: "bg-orange-500/10 dark:bg-orange-500/15",
};

export function Achievements() {
  const [ref, inView] = useInView({ threshold: 0.08 });

  return (
    <section
      id="achievements"
      className="section-padding relative overflow-hidden"
      aria-labelledby="achievements-heading"
    >
      {/* Accent glow */}
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 bg-accent-500/4 rounded-full blur-[120px] pointer-events-none"
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
            Achievements & certifications
          </p>
          <h2
            id="achievements-heading"
            className="heading-lg text-slate-900 dark:text-slate-100 mb-12"
          >
            Recognition & learning
          </h2>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Achievements column */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                <Trophy size={12} aria-hidden="true" /> Highlights
              </p>
              <div className="space-y-4">
                {achievements.map((ach, i) => {
                  const Icon = iconMap[ach.icon];
                  const color = iconColors[ach.icon] ?? "text-accent-500";
                  const bg = iconBg[ach.icon] ?? "bg-accent-500/10";
                  return (
                    <motion.div
                      key={ach.title}
                      initial={{ opacity: 0, x: -24 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.45, delay: i * 0.1 }}
                      className="card-base card-hover flex items-start gap-4 group"
                    >
                      <div className={`p-3 rounded-xl ${bg} shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon size={20} className={color} aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm leading-snug">
                          {ach.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                          {ach.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Certifications column */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                <BadgeCheck size={12} aria-hidden="true" /> Certifications
              </p>
              <div className="space-y-2.5">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, x: 24 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="group flex items-center gap-3 px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1224] hover:border-accent-500/30 hover:bg-accent-500/2 dark:hover:bg-accent-500/5 transition-all"
                  >
                    <div
                      className="h-2 w-2 rounded-full bg-accent-500/60 group-hover:bg-accent-500 transition-colors shrink-0"
                      aria-hidden="true"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {cert.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{cert.issuer}</p>
                    </div>
                    <BadgeCheck
                      size={14}
                      className="text-accent-500/50 group-hover:text-accent-500 transition-colors shrink-0"
                      aria-hidden="true"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

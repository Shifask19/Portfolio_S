"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Globe, Database, Brain, BarChart2, Cloud, TestTube2,
} from "lucide-react";
import { skillCategories } from "@/content/skills";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const CATEGORY_META: Record<string, { icon: React.ReactNode; gradient: string; description: string }> = {
  languages: {
    icon: <Code2 size={18} aria-hidden="true" />,
    gradient: "from-blue-500/10 to-blue-600/5 dark:from-blue-500/15 dark:to-blue-600/8",
    description: "Core programming languages",
  },
  web: {
    icon: <Globe size={18} aria-hidden="true" />,
    gradient: "from-accent-500/10 to-emerald-500/5 dark:from-accent-500/15 dark:to-emerald-600/8",
    description: "Frontend & backend frameworks",
  },
  databases: {
    icon: <Database size={18} aria-hidden="true" />,
    gradient: "from-orange-500/10 to-orange-600/5 dark:from-orange-500/15 dark:to-orange-600/8",
    description: "SQL & NoSQL databases",
  },
  aiml: {
    icon: <Brain size={18} aria-hidden="true" />,
    gradient: "from-purple-500/10 to-purple-600/5 dark:from-purple-500/15 dark:to-purple-600/8",
    description: "Machine learning & AI tools",
  },
  data: {
    icon: <BarChart2 size={18} aria-hidden="true" />,
    gradient: "from-cyan-500/10 to-cyan-600/5 dark:from-cyan-500/15 dark:to-cyan-600/8",
    description: "Data analysis & visualisation",
  },
  cloud: {
    icon: <Cloud size={18} aria-hidden="true" />,
    gradient: "from-sky-500/10 to-sky-600/5 dark:from-sky-500/15 dark:to-sky-600/8",
    description: "Cloud, DevOps & tooling",
  },
  testing: {
    icon: <TestTube2 size={18} aria-hidden="true" />,
    gradient: "from-pink-500/10 to-pink-600/5 dark:from-pink-500/15 dark:to-pink-600/8",
    description: "Test automation & QA",
  },
};

const ICON_COLORS: Record<string, string> = {
  languages: "text-blue-500",
  web: "text-accent-500",
  databases: "text-orange-500",
  aiml: "text-purple-500",
  data: "text-cyan-500",
  cloud: "text-sky-500",
  testing: "text-pink-500",
};

export function Skills() {
  const [ref, inView] = useInView({ threshold: 0.05 });
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = [
    { id: "all", label: "All" },
    ...skillCategories.map((c) => ({ id: c.id, label: c.label })),
  ];

  const visible =
    activeFilter === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeFilter);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section
      id="skills"
      className="section-padding relative bg-slate-50/60 dark:bg-[#0a0a14]/60 overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Subtle grid bg */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30 dark:opacity-20" aria-hidden="true" />

      <div className="container-max relative z-10">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-accent-600 dark:text-accent-400 text-sm font-semibold uppercase tracking-widest mb-2">
                Technical skills
              </p>
              <h2
                id="skills-heading"
                className="heading-lg text-slate-900 dark:text-slate-100"
              >
                What I work with
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-xs text-right hidden sm:block">
              {skillCategories.reduce((a, c) => a + c.skills.length, 0)} skills across{" "}
              {skillCategories.length} categories
            </p>
          </div>

          {/* Filter tabs */}
          <div
            className="flex flex-wrap gap-2 mb-10"
            role="tablist"
            aria-label="Filter skills by category"
          >
            {filters.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={activeFilter === f.id}
                onClick={() => setActiveFilter(f.id)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                  activeFilter === f.id
                    ? "bg-accent-500 text-white shadow-glow-sm"
                    : "bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-accent-500/40 hover:text-accent-600 dark:hover:text-accent-400"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Skill cards */}
          <motion.div
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((cat) => {
                const meta = CATEGORY_META[cat.id];
                const iconColor = ICON_COLORS[cat.id] ?? "text-accent-500";
                return (
                  <motion.div
                    key={cat.id}
                    variants={cardVariants}
                    layout
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={cn(
                      "card-base card-hover group relative overflow-hidden",
                      "bg-gradient-to-br",
                      meta?.gradient ?? "from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
                    )}
                  >
                    {/* Card header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn("p-2 rounded-lg bg-white dark:bg-slate-800/80 shadow-sm border border-slate-200/80 dark:border-slate-700/50", iconColor)}>
                        {meta?.icon ?? <Code2 size={18} aria-hidden="true" />}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                          {cat.label}
                        </h3>
                        {meta?.description && (
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                            {meta.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/50 hover:border-accent-500/40 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Subtle count */}
                    <p className="mt-3 text-[10px] text-slate-400 font-mono">
                      {cat.skills.length} skill{cat.skills.length !== 1 ? "s" : ""}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GithubIcon, ExternalLink, ArrowRight, Search, Folder } from "lucide-react";
import { projects, type ProjectTag } from "@/content/projects";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const ALL_TAGS: { id: ProjectTag | "All"; label: string }[] = [
  { id: "All", label: "All" },
  { id: "AI/ML", label: "AI / ML" },
  { id: "Full-stack", label: "Full-stack" },
  { id: "Data", label: "Data" },
  { id: "Java", label: "Java" },
  { id: "Testing", label: "Testing" },
];

/* Unique gradient per project for visual variety */
const PROJECT_GRADIENTS: Record<string, string> = {
  "agri-advisor":         "from-green-500/20 via-emerald-400/10 to-teal-500/5",
  "store-intelligence":   "from-blue-500/20 via-cyan-400/10 to-sky-500/5",
  "guardian-earth":       "from-orange-500/20 via-amber-400/10 to-yellow-500/5",
  "email-triage-agent":   "from-purple-500/20 via-violet-400/10 to-pink-500/5",
  "investment-tracker":   "from-slate-500/20 via-slate-400/10 to-zinc-500/5",
  "fraudshield-ai":       "from-red-500/20 via-rose-400/10 to-pink-500/5",
};

const PROJECT_ICONS: Record<string, string> = {
  "agri-advisor":         "🌾",
  "store-intelligence":   "🏪",
  "guardian-earth":       "🌍",
  "email-triage-agent":   "📧",
  "investment-tracker":   "📈",
  "fraudshield-ai":       "🛡️",
};

export function FeaturedProjects() {
  const [ref, inView] = useInView({ threshold: 0.04 });
  const [activeTag, setActiveTag] = useState<ProjectTag | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  const filterProjects = (list: typeof projects) =>
    list.filter((p) => {
      const tagMatch = activeTag === "All" || p.tags.includes(activeTag as ProjectTag);
      const searchMatch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return tagMatch && searchMatch;
    });

  const visibleFeatured = filterProjects(featured);
  const visibleOthers = filterProjects(others);

  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden"
      aria-labelledby="projects-heading"
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-500/3 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-max relative z-10">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <p className="text-accent-600 dark:text-accent-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Projects
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
            <h2
              id="projects-heading"
              className="heading-lg text-slate-900 dark:text-slate-100"
            >
              Things I&apos;ve built
            </h2>
            <Link
              href="/projects"
              className="flex items-center gap-1.5 text-sm font-medium text-accent-600 dark:text-accent-400 hover:gap-2.5 transition-all shrink-0"
            >
              View all projects <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-2xl text-sm leading-relaxed">
            From hackathon sprints to side projects — built with real-world stacks, shipped with care.
          </p>

          {/* Filters + search */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by tag">
              {ALL_TAGS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTag(t.id)}
                  aria-pressed={activeTag === t.id}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all",
                    activeTag === t.id
                      ? "bg-accent-500 text-white shadow-glow-sm"
                      : "bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-accent-500/40"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="relative sm:ml-auto">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                type="search"
                placeholder="Search projects…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 w-full sm:w-56"
                aria-label="Search projects by name or technology"
              />
            </div>
          </div>

          {/* Featured grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            <AnimatePresence mode="popLayout">
              {visibleFeatured.map((project, i) => {
                const gradient = PROJECT_GRADIENTS[project.slug] ?? "from-accent-500/10 via-slate-100 dark:via-slate-800 to-transparent";
                const emoji = PROJECT_ICONS[project.slug] ?? "💡";
                return (
                  <motion.article
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="group card-base card-hover flex flex-col overflow-hidden !p-0"
                    aria-label={`Project: ${project.title}`}
                  >
                    {/* Card header visual */}
                    <div
                      className={cn(
                        "relative h-36 bg-gradient-to-br flex items-center justify-center overflow-hidden border-b border-slate-200 dark:border-slate-700/80",
                        gradient
                      )}
                      role="img"
                      aria-label={`${project.title} visual`}
                    >
                      {/* Background pattern */}
                      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
                      {/* Emoji icon */}
                      <span className="text-5xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                        {emoji}
                      </span>
                      {/* Role badge top-right */}
                      {project.role && (
                        <span className="absolute top-3 right-3 badge-accent text-[10px]">
                          {project.role}
                        </span>
                      )}
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-1 p-5">
                      <h3 className="heading-md text-slate-900 dark:text-slate-100 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors mb-2 leading-snug">
                        {project.title}
                      </h3>

                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.slice(0, 4).map((t) => (
                          <span key={t} className="badge-muted text-[10px]">
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="badge-muted text-[10px]">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-3 mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                            aria-label={`View ${project.title} on GitHub (opens in new tab)`}
                          >
                            <GithubIcon size={13} aria-hidden="true" />
                            GitHub
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                            aria-label={`View ${project.title} live demo (opens in new tab)`}
                          >
                            <ExternalLink size={13} aria-hidden="true" />
                            Demo
                          </a>
                        )}
                        {project.hasCaseStudy && (
                          <Link
                            href={`/projects/${project.slug}`}
                            className="ml-auto flex items-center gap-1 text-xs font-semibold text-accent-600 dark:text-accent-400 hover:gap-1.5 transition-all"
                            aria-label={`Read case study for ${project.title}`}
                          >
                            Case study <ArrowRight size={12} aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Other projects */}
          {visibleOthers.length > 0 && (
            <>
              <div className="flex items-center gap-3 mb-5">
                <Folder size={16} className="text-slate-400" aria-hidden="true" />
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  More projects
                </h3>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence mode="popLayout">
                  {visibleOthers.map((project, i) => (
                    <motion.article
                      key={project.slug}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      className="card-base card-hover group"
                      aria-label={`Project: ${project.title}`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xl">
                          {PROJECT_ICONS[project.slug] ?? "💡"}
                        </span>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-accent-500 transition-colors"
                            aria-label={`${project.title} on GitHub`}
                          >
                            <GithubIcon size={14} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1.5 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map((t) => (
                          <span key={t} className="badge-muted text-[10px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </>
          )}

          {visibleFeatured.length === 0 && visibleOthers.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <Search size={32} className="mx-auto mb-3 opacity-40" aria-hidden="true" />
              <p>No projects match the current filter.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

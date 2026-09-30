import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GithubIcon, ExternalLink } from "lucide-react";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Projects",
  description: `All projects by ${profile.name} — AI/ML, full-stack, data and more.`,
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-max">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors mb-8"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back home
        </Link>

        <h1 className="heading-lg text-slate-900 dark:text-slate-100 mb-4">
          All Projects
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mb-12">
          {projects.length} projects across AI/ML, full-stack, data engineering and QA.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="card-base card-hover flex flex-col"
              aria-label={`Project: ${project.title}`}
            >
              {/* Placeholder */}
              <div
                className="h-36 rounded-xl mb-4 bg-gradient-to-br from-accent-500/10 via-slate-100 dark:via-slate-800 to-accent-500/5 flex items-center justify-center text-accent-500/30 font-mono text-xs border border-slate-200 dark:border-slate-700"
                role="img"
                aria-label={`${project.title} screenshot placeholder`}
              >
                {`< ${project.slug} />`}
              </div>

              <h2 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                {project.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span key={t} className="badge-muted text-[11px]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-auto">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                    aria-label={`${project.title} GitHub (opens in new tab)`}
                  >
                    <GithubIcon size={14} aria-hidden="true" />
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
                    aria-label={`${project.title} live demo (opens in new tab)`}
                  >
                    <ExternalLink size={14} aria-hidden="true" />
                    Demo
                  </a>
                )}
                {project.hasCaseStudy && (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="ml-auto text-sm font-medium text-accent-600 dark:text-accent-400 hover:underline"
                  >
                    Case study →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

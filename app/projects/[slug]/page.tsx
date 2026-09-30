import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, GithubIcon, ExternalLink } from "lucide-react";
import { projects } from "@/content/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.hasCaseStudy)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project || !project.hasCaseStudy) notFound();

  // Dynamically import MDX
  let CaseStudy: React.ComponentType | null = null;
  try {
    const mod = await import(`@/content/projects/${slug}.mdx`);
    CaseStudy = mod.default;
  } catch {
    // MDX not found
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-max max-w-3xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors mb-8"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to projects
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="badge-accent">
                {tag}
              </span>
            ))}
            {project.role && (
              <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {project.role}
              </span>
            )}
          </div>

          <h1 className="heading-lg text-slate-900 dark:text-slate-100 mb-3">
            {project.title}
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-6">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <span key={t} className="badge-muted">
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium hover:opacity-90 transition-opacity"
                aria-label="View on GitHub (opens in new tab)"
              >
                <GithubIcon size={16} aria-hidden="true" />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors"
                aria-label="View live demo (opens in new tab)"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Live demo
              </a>
            )}
          </div>
        </header>

        <hr className="border-slate-200 dark:border-slate-800 mb-10" />

        {/* MDX content */}
        {CaseStudy ? (
          <article className="prose-portfolio prose prose-slate dark:prose-invert">
            <CaseStudy />
          </article>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 text-sm">
              Case study coming soon. Check the{" "}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-600 dark:text-accent-400 hover:underline"
              >
                GitHub repository
              </a>{" "}
              for more details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

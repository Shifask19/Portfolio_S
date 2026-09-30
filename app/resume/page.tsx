import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Download, MapPin, Mail, GithubIcon, LinkedinIcon } from "lucide-react";
import { profile } from "@/content/profile";
import { experiences } from "@/content/experience";
import { skillCategories } from "@/content/skills";
import { projects } from "@/content/projects";
import { achievements, certifications } from "@/content/certifications";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name} — Software Engineer, AI/ML, QA`,
};

export default function ResumePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 5);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container-max max-w-4xl">
        {/* Controls — hidden on print */}
        <div className="flex items-center gap-4 mb-8 print:hidden">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back home
          </Link>
          <a
            href={profile.resumeUrl}
            download
            className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors"
            aria-label="Download resume PDF"
          >
            <Download size={15} aria-hidden="true" />
            Download PDF
          </a>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Print
          </button>
        </div>

        {/* Resume body */}
        <div className="bg-white dark:bg-[#0f1628] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 print:shadow-none print:border-0 print:p-0">
          {/* Header */}
          <header className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
              {profile.name}
            </h1>
            <p className="text-accent-600 dark:text-accent-400 font-semibold mb-3">
              {profile.title}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin size={13} aria-hidden="true" />
                {profile.location}
              </span>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-1 hover:text-accent-600">
                <Mail size={13} aria-hidden="true" />
                {profile.email}
              </a>
              <a href={`https://${profile.linkedin}`} className="flex items-center gap-1 hover:text-accent-600" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon size={13} aria-hidden="true" />
                LinkedIn
              </a>
              <a href={profile.github} className="flex items-center gap-1 hover:text-accent-600" target="_blank" rel="noopener noreferrer">
                <GithubIcon size={13} aria-hidden="true" />
                GitHub
              </a>
            </div>
          </header>

          <ResumeSection title="Education">
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                {profile.education.degree}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {profile.education.institution} ({profile.education.affiliation})
              </p>
              <p className="text-sm text-slate-500">
                {profile.education.period} · CGPA {profile.education.cgpa}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Coursework: {profile.education.coursework.join(", ")}
              </p>
            </div>
          </ResumeSection>

          <ResumeSection title="Experience">
            {experiences.map((exp) => (
              <div key={exp.company} className="mb-5 last:mb-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-accent-600 dark:text-accent-400">{exp.company}</p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{exp.period}</span>
                </div>
                <ul className="mt-2 space-y-1 list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                  {exp.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </div>
            ))}
          </ResumeSection>

          <ResumeSection title="Featured Projects">
            {featuredProjects.map((p) => (
              <div key={p.slug} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                    {p.title}
                  </h3>
                  {p.role && <span className="text-xs text-accent-600">({p.role})</span>}
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-accent-600 ml-auto">
                      GitHub ↗
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {p.description}
                </p>
                <p className="text-xs text-slate-400 mt-1">{p.tech.join(" · ")}</p>
              </div>
            ))}
          </ResumeSection>

          <ResumeSection title="Skills">
            <div className="grid sm:grid-cols-2 gap-3">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    {cat.label}:
                  </span>{" "}
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {cat.skills.join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </ResumeSection>

          <ResumeSection title="Achievements">
            <ul className="space-y-1 list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
              {achievements.map((a) => <li key={a.title}>{a.title}</li>)}
            </ul>
          </ResumeSection>

          <ResumeSection title="Certifications">
            <div className="flex flex-wrap gap-2">
              {certifications.map((c) => (
                <span key={c.title} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {c.title}
                </span>
              ))}
            </div>
          </ResumeSection>
        </div>
      </div>
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8" aria-labelledby={`resume-${title.toLowerCase()}`}>
      <h2
        id={`resume-${title.toLowerCase()}`}
        className="text-xs font-bold uppercase tracking-widest text-accent-600 dark:text-accent-400 mb-4"
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

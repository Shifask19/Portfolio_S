import Link from "next/link";
import { GithubIcon, LinkedinIcon, Mail, Heart } from "lucide-react";
import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer
      className="relative border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#08080e]"
      role="contentinfo"
    >
      {/* Subtle top glow line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-64 bg-gradient-to-r from-transparent via-accent-500/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container-max py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="font-bold text-sm gradient-text-subtle tracking-tight">
            {profile.name}
          </span>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            Built with
            <Heart size={10} className="text-accent-500 inline mx-0.5" aria-hidden="true" />
            Next.js · Tailwind · Framer Motion
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-1">
          {[
            { href: profile.github, label: "GitHub (opens in new tab)", icon: <GithubIcon size={17} aria-hidden="true" /> },
            { href: `https://${profile.linkedin}`, label: "LinkedIn (opens in new tab)", icon: <LinkedinIcon size={17} aria-hidden="true" /> },
            { href: `mailto:${profile.email}`, label: `Email ${profile.email}`, icon: <Mail size={17} aria-hidden="true" /> },
          ].map(({ href, label, icon }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="p-2.5 rounded-xl text-slate-400 hover:text-accent-500 hover:bg-accent-500/8 transition-all"
              aria-label={label}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}

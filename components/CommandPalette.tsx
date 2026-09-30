"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Search,
  User,
  Code2,
  Briefcase,
  Award,
  Mail,
  GithubIcon,
  LinkedinIcon,
  Moon,
  Sun,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

type CommandItem = {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const { resolvedTheme, toggle } = useTheme();

  const scrollTo = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const commands: CommandItem[] = [
    {
      id: "hero",
      label: "Go to Hero",
      icon: <User size={16} />,
      action: () => scrollTo("hero"),
      group: "Navigation",
    },
    {
      id: "about",
      label: "Go to About",
      icon: <User size={16} />,
      action: () => scrollTo("about"),
      group: "Navigation",
    },
    {
      id: "skills",
      label: "Go to Skills",
      icon: <Code2 size={16} />,
      action: () => scrollTo("skills"),
      group: "Navigation",
    },
    {
      id: "projects",
      label: "Go to Projects",
      icon: <Code2 size={16} />,
      action: () => scrollTo("projects"),
      group: "Navigation",
    },
    {
      id: "experience",
      label: "Go to Experience",
      icon: <Briefcase size={16} />,
      action: () => scrollTo("experience"),
      group: "Navigation",
    },
    {
      id: "achievements",
      label: "Go to Achievements",
      icon: <Award size={16} />,
      action: () => scrollTo("achievements"),
      group: "Navigation",
    },
    {
      id: "contact",
      label: "Go to Contact",
      icon: <Mail size={16} />,
      action: () => scrollTo("contact"),
      group: "Navigation",
    },
    {
      id: "theme",
      label: `Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode`,
      icon: resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
      action: () => {
        toggle();
        setOpen(false);
      },
      group: "Actions",
    },
    {
      id: "github-profile",
      label: "Open GitHub Profile",
      description: profile.github,
      icon: <GithubIcon size={16} />,
      action: () => {
        window.open(profile.github, "_blank");
        setOpen(false);
      },
      group: "Links",
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      description: profile.linkedin,
      icon: <LinkedinIcon size={16} />,
      action: () => {
        window.open(`https://${profile.linkedin}`, "_blank");
        setOpen(false);
      },
      group: "Links",
    },
    ...projects
      .filter((p) => p.featured && p.github)
      .map((p) => ({
        id: `project-${p.slug}`,
        label: p.title,
        description: "Open GitHub repo",
        icon: <ExternalLink size={16} />,
        action: () => {
          window.open(p.github, "_blank");
          setOpen(false);
        },
        group: "Projects",
      })),
  ];

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.group.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  // Group results
  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = [];
    acc[cmd.group].push(cmd);
    return acc;
  }, {});

  // Keyboard shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery("");
        setSelected(0);
      }
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter") {
        filtered[selected]?.action();
      }
    },
    [filtered, selected]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0f1628] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Search */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <Search size={18} className="text-slate-400 shrink-0" aria-hidden="true" />
          <input
            type="text"
            className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none text-sm"
            placeholder="Type a command or search…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Search commands"
          />
          <kbd className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2" role="listbox">
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group}>
              <div className="px-4 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {group}
              </div>
              {items.map((cmd) => {
                const globalIdx = filtered.indexOf(cmd);
                return (
                  <button
                    key={cmd.id}
                    role="option"
                    aria-selected={selected === globalIdx}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors",
                      selected === globalIdx
                        ? "bg-accent-500/10 text-accent-700 dark:text-accent-400"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    )}
                    onClick={cmd.action}
                    onMouseEnter={() => setSelected(globalIdx)}
                  >
                    <span className="text-slate-400 dark:text-slate-500 shrink-0">
                      {cmd.icon}
                    </span>
                    <span className="flex-1 font-medium">{cmd.label}</span>
                    {cmd.description && (
                      <span className="text-xs text-slate-400 truncate max-w-[140px]">
                        {cmd.description}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-slate-400">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>

        <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700 flex items-center gap-4 text-xs text-slate-400">
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span>ESC close</span>
        </div>
      </div>
    </div>
  );
}

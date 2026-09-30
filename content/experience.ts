export type Experience = {
  role: string;
  company: string;
  period: string;
  current: boolean;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    role: "Python Full-Stack Developer Trainee",
    company: "QSpiders",
    period: "April 2026 – Present",
    current: true,
    highlights: [
      "Full-stack development training with Python, React and related tooling.",
      "Test automation using Selenium WebDriver and TestNG.",
      "Manual testing aligned with SDLC / STLC practices.",
    ],
  },
  {
    role: "Python Developer Intern",
    company: "Infosys Springboard",
    period: "Jan 2025 – Mar 2025",
    current: false,
    highlights: [
      "Built an automated check-extraction tool with PDF parsing, data validation and CSV export.",
      "Followed OOP principles; integrated with PostgreSQL for persistent storage.",
      "Exposed REST APIs and consumed third-party services for data enrichment.",
    ],
  },
];

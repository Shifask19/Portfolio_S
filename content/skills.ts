export type SkillCategory = {
  label: string;
  id: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    label: "Languages",
    id: "languages",
    skills: ["Python", "Java", "C", "SQL"],
  },
  {
    label: "Web",
    id: "web",
    skills: ["React", "Next.js", "Node.js", "Tailwind CSS", "FastAPI", "Flask"],
  },
  {
    label: "Databases",
    id: "databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Firebase / Firestore"],
  },
  {
    label: "AI / ML",
    id: "aiml",
    skills: [
      "scikit-learn",
      "YOLOv8 + ByteTrack",
      "Hugging Face",
      "RAG / LangChain / ChromaDB (exposure)",
    ],
  },
  {
    label: "Data",
    id: "data",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "Tableau"],
  },
  {
    label: "Cloud / Tools",
    id: "cloud",
    skills: [
      "AWS",
      "Google Cloud",
      "Docker",
      "Git / GitHub",
      "Linux / Shell",
      "Postman",
    ],
  },
  {
    label: "Testing",
    id: "testing",
    skills: [
      "Selenium WebDriver",
      "TestNG",
      "JUnit",
      "Manual Testing (SDLC / STLC)",
    ],
  },
];

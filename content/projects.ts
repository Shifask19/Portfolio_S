export type ProjectTag = "AI/ML" | "Full-stack" | "Data" | "Testing" | "Java";

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: ProjectTag[];
  tech: string[];
  github: string;
  demo?: string;
  featured: boolean;
  role?: string;
  hasCaseStudy: boolean;
};

export const projects: Project[] = [
  {
    slug: "agri-advisor",
    title: "AgriAdvisor",
    description:
      "AI/ML assistant and e-commerce platform for farmers with crop recommendation and disease detection models, plus IoT hardware sensors.",
    tags: ["AI/ML", "Full-stack"],
    tech: ["React", "TypeScript", "Firebase", "Python", "scikit-learn"],
    github: "https://github.com/Shifask19/AgriAdvisor",
    featured: true,
    role: "Team Lead",
    hasCaseStudy: true,
  },
  {
    slug: "store-intelligence",
    title: "Store Intelligence Pipeline",
    description:
      "Retail video analytics pipeline built for a Purplle hackathon. Detects and tracks customers in-store using computer vision.",
    tags: ["AI/ML"],
    tech: ["YOLOv8", "ByteTrack", "FastAPI", "Python"],
    github: "https://github.com/Shifask19/store-intelligence",
    featured: true,
    hasCaseStudy: true,
  },
  {
    slug: "fraudshield-ai",
    title: "FraudShield AI",
    description:
      "Fraud detection system built for the ET AI Hackathon 2.0. Applies machine learning to identify anomalous financial transactions.",
    tags: ["AI/ML"],
    tech: ["Python", "scikit-learn", "FastAPI"],
    github: "https://github.com/Shifask19/fraudshield-ai",
    featured: true,
    hasCaseStudy: true,
  },
  {
    slug: "email-triage-agent",
    title: "Email Triage Agent",
    description:
      "Agent-evaluation environment for the Meta PyTorch OpenEnv Hackathon. Classifies and routes support emails using Hugging Face inference.",
    tags: ["AI/ML"],
    tech: ["Hugging Face", "FastAPI", "Docker", "Python"],
    github: "https://github.com/Shifask19/email-triage",
    featured: true,
    hasCaseStudy: true,
  },
  {
    slug: "guardian-earth",
    title: "Guardian Earth",
    description:
      "AI disaster prediction platform and Global Sustainability Challenge regional finalist. Predicts natural disaster risk from environmental data.",
    tags: ["AI/ML", "Full-stack"],
    tech: ["React", "Node.js", "Flask", "scikit-learn", "Python"],
    github:
      "https://github.com/Shifask19/Guardian-Earth-AI-Powered-Disaster-Management-Platform",
    featured: true,
    hasCaseStudy: true,
  },
  {
    slug: "investment-tracker",
    title: "Investment Portfolio Tracker",
    description:
      "Java OOP application with JDBC and a multi-table MySQL schema (clients, holdings, transactions) featuring joins, views and validation.",
    tags: ["Java", "Full-stack"],
    tech: ["Java", "Spring Boot", "MySQL", "JDBC"],
    github: "",
    featured: true,
    hasCaseStudy: true,
  },
  // ── Smaller cards ──────────────────────────────────────────────────────────
  {
    slug: "cricket-analysis",
    title: "Cricket Performance Data Analysis",
    description:
      "Data analysis and interactive dashboards built on ODI/T20 cricket datasets using Python and BI tools.",
    tags: ["Data"],
    tech: ["Python", "Pandas", "Power BI", "Tableau"],
    github: "",
    featured: false,
    hasCaseStudy: false,
  },
  {
    slug: "library-management",
    title: "Library Management System",
    description:
      "Role-based library management web app with real-time Firestore sync and Tailwind UI.",
    tags: ["Full-stack"],
    tech: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    github: "",
    featured: false,
    hasCaseStudy: false,
  },
  {
    slug: "smart-city-complaints",
    title: "Smart City Civic Complaint Management",
    description:
      "Civic complaint portal for smart city use cases with real-time status tracking on Firestore.",
    tags: ["Full-stack"],
    tech: ["React", "Firestore"],
    github: "",
    featured: false,
    hasCaseStudy: false,
  },
  {
    slug: "chat-app",
    title: "Computer Network Chat App",
    description:
      "Multi-client TCP chat application demonstrating socket programming and multithreaded server design.",
    tags: ["Full-stack"],
    tech: ["Python", "TCP Sockets", "Multithreading"],
    github: "",
    featured: false,
    hasCaseStudy: false,
  },
];

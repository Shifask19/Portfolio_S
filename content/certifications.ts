export type Achievement = {
  title: string;
  description: string;
  icon: "trophy" | "star" | "award" | "medal";
};

export type Certification = {
  title: string;
  issuer: string;
};

export const achievements: Achievement[] = [
  {
    title: "1st Place — Elder Care Reminder System Hackathon",
    description: "Won first place for an IoT-based reminder system for elderly care.",
    icon: "trophy",
  },
  {
    title: "Global Sustainability Challenge — Regional Finalist",
    description:
      "Guardian Earth project selected as a regional finalist in the Global Sustainability Challenge.",
    icon: "award",
  },
  {
    title: "GHC & GHCI Scholar 2024",
    description:
      "Selected as a scholar for Grace Hopper Celebration (GHC) and Grace Hopper Celebration India (GHCI) 2024.",
    icon: "star",
  },
  {
    title: "Top 100 of 90,000+ — Women Who Master Hackathon",
    description:
      "Ranked in the top 100 out of more than 90,000 participants in the Women Who Master Hackathon, organised by Aspire for Her and Logitech.",
    icon: "medal",
  },
];

export const certifications: Certification[] = [
  { title: "AWS Academy Cloud Foundations", issuer: "Amazon Web Services" },
  { title: "Google Cybersecurity Professional Certificate", issuer: "Google" },
  { title: "Google Cloud Certificates", issuer: "Google Cloud" },
  { title: "Google Generative AI Study Jam 2024", issuer: "Google" },
  { title: "Amazon ML Summer School 2025", issuer: "Amazon" },
  { title: "Postman API Student Expert", issuer: "Postman" },
  { title: "NIELIT Unmanned Aerial System Bootcamp", issuer: "NIELIT" },
  { title: "20+ Unstop Certificates", issuer: "Unstop" },
];

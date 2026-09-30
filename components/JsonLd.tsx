import { profile } from "@/content/profile";

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.seo.siteUrl,
    email: profile.email,
    jobTitle: "Software Engineer",
    description: profile.seo.description,
    sameAs: [
      `https://${profile.linkedin}`,
      profile.github,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chhatrapati Sambhajinagar",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.institution,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

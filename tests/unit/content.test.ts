import { describe, it, expect } from "vitest";
import { profile } from "../../content/profile";
import { projects } from "../../content/projects";
import { experiences } from "../../content/experience";
import { skillCategories } from "../../content/skills";
import { achievements, certifications } from "../../content/certifications";

describe("profile", () => {
  it("has a name", () => expect(profile.name).toBeTruthy());
  it("has a valid email", () =>
    expect(profile.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/));
  it("has a valid github URL", () =>
    expect(profile.github).toMatch(/^https:\/\//));
  it("has a siteUrl", () =>
    expect(profile.seo.siteUrl).toMatch(/^https:\/\//));
  it("has education details", () => {
    expect(profile.education.degree).toBeTruthy();
    expect(profile.education.institution).toBeTruthy();
    expect(profile.education.cgpa).toBeTruthy();
  });
});

describe("projects", () => {
  it("has at least one project", () => expect(projects.length).toBeGreaterThan(0));

  projects.forEach((project) => {
    describe(`project: ${project.title}`, () => {
      it("has a slug", () => expect(project.slug).toBeTruthy());
      it("has a title", () => expect(project.title).toBeTruthy());
      it("has a description", () => expect(project.description).toBeTruthy());
      it("has at least one tag", () => expect(project.tags.length).toBeGreaterThan(0));
      it("has at least one tech", () => expect(project.tech.length).toBeGreaterThan(0));
      it("github link is well-formed if present", () => {
        if (project.github) {
          expect(project.github).toMatch(/^https:\/\//);
        }
      });
      it("demo link is well-formed if present", () => {
        if (project.demo) {
          expect(project.demo).toMatch(/^https:\/\//);
        }
      });
    });
  });
});

describe("experiences", () => {
  it("has at least one experience", () =>
    expect(experiences.length).toBeGreaterThan(0));

  experiences.forEach((exp) => {
    it(`experience '${exp.company}' has required fields`, () => {
      expect(exp.role).toBeTruthy();
      expect(exp.company).toBeTruthy();
      expect(exp.period).toBeTruthy();
      expect(exp.highlights.length).toBeGreaterThan(0);
    });
  });
});

describe("skillCategories", () => {
  it("has at least one category", () =>
    expect(skillCategories.length).toBeGreaterThan(0));

  skillCategories.forEach((cat) => {
    it(`category '${cat.label}' has skills`, () => {
      expect(cat.skills.length).toBeGreaterThan(0);
    });
  });
});

describe("achievements and certifications", () => {
  it("has achievements", () => expect(achievements.length).toBeGreaterThan(0));
  it("has certifications", () =>
    expect(certifications.length).toBeGreaterThan(0));

  achievements.forEach((a) => {
    it(`achievement '${a.title}' has description`, () =>
      expect(a.description).toBeTruthy());
  });
});

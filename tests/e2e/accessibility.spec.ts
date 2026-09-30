import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility", () => {
  test("home page has no critical accessibility violations", async ({ page }) => {
    await page.goto("/");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations.filter((v) => v.impact === "critical")).toHaveLength(0);
  });

  test("projects page has no critical accessibility violations", async ({ page }) => {
    await page.goto("/projects");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations.filter((v) => v.impact === "critical")).toHaveLength(0);
  });

  test("skip to main content link is present", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.getByRole("link", { name: /skip to main/i });
    await expect(skipLink).toBeAttached();
  });

  test("all images have alt text", async ({ page }) => {
    await page.goto("/");
    const images = page.getByRole("img");
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).not.toBeNull();
    }
  });
});

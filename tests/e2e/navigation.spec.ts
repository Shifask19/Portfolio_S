import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page title is correct", async ({ page }) => {
    await expect(page).toHaveTitle(/Shifa Shaikh/);
  });

  test("navbar is visible", async ({ page }) => {
    await expect(page.getByRole("banner")).toBeVisible();
  });

  test("hero section renders name", async ({ page }) => {
    await expect(page.getByText("Shifa Shaikh")).toBeVisible();
  });

  test("about section is reachable", async ({ page }) => {
    await page.getByRole("button", { name: "About" }).click();
    await expect(page.getByRole("region", { name: /about/i })).toBeInViewport({ ratio: 0.1 });
  });

  test("theme toggle works", async ({ page }) => {
    const html = page.locator("html");
    const before = await html.getAttribute("class");
    await page.getByRole("button", { name: /switch to/i }).click();
    const after = await html.getAttribute("class");
    expect(before).not.toEqual(after);
  });

  test("download resume link exists", async ({ page }) => {
    const link = page.getByRole("link", { name: /download resume/i }).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "/resume.pdf");
  });

  test("projects section has project cards", async ({ page }) => {
    await page.goto("/#projects");
    await page.getByRole("article").first().waitFor();
    const cards = page.getByRole("article");
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test("command palette opens with Ctrl+K", async ({ page }) => {
    await page.keyboard.press("Control+k");
    await expect(page.getByRole("dialog", { name: /command palette/i })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: /command palette/i })).not.toBeVisible();
  });

  test("contact section has social links", async ({ page }) => {
    await page.goto("/#contact");
    await expect(page.getByRole("link", { name: /linkedin/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /github/i }).first()).toBeVisible();
  });
});

test.describe("Projects page", () => {
  test("loads all projects", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByRole("heading", { name: "All Projects" })).toBeVisible();
    const cards = page.getByRole("article");
    expect(await cards.count()).toBeGreaterThan(0);
  });
});

test.describe("Case study page", () => {
  test("agri-advisor case study loads", async ({ page }) => {
    await page.goto("/projects/agri-advisor");
    await expect(page.getByRole("heading", { name: /AgriAdvisor/i })).toBeVisible();
  });
});

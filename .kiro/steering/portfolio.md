---
inclusion: always
---

# Portfolio project rules

- This is a personal portfolio for **Shifa Shaikh**, a fresher software engineer.
- **Never invent** skills, projects, metrics, dates or certifications. Use `TODO(Shifa)` placeholders where content is missing.
- Content lives exclusively in `/content/` (`profile.ts`, `projects.ts`, `experience.ts`, `skills.ts`, `certifications.ts`) and MDX files under `/content/projects/`. Components never hard-code text.
- Stack: **Next.js 15 App Router**, **TypeScript (strict)**, **Tailwind CSS**, **Framer Motion**, **MDX**. Static-first; no backend except Next.js route handlers.
- Every component needs: accessibility check (semantic HTML, alt text, ARIA labels, keyboard navigation), mobile layout, and visible focus states.
- Respect `prefers-reduced-motion` for all Framer Motion animations.
- Secrets via environment variables only. Never commit keys. Reference `.env.example` for required vars.
- Keep components small (one responsibility). All text comes from `/content/`.
- Accessibility: WCAG AA contrast, visible focus rings, semantic heading order, alt text on every image.
- After any code change, run `npm run typecheck` and `npm test` to verify.

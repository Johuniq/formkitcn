# Contributing to formkitcn

First off — thank you for even considering contributing. Whether it's a one-line fix or a whole new feature, every contribution makes this project better for everyone. We genuinely appreciate it.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Code Style](#code-style)
- [Making Changes](#making-changes)
- [Adding a New Field Type](#adding-a-new-field-type)
- [Commit Messages](#commit-messages)
- [Pull Requests](#pull-requests)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Need Help?](#need-help)

## Getting Started

1. **Fork** the repo on GitHub.
2. **Clone** your fork locally:

   ```bash
   git clone https://github.com/YOUR_USERNAME/formkitcn.git
   cd formkitcn
   ```

3. **Install dependencies** (we use [Bun](https://bun.sh), but npm/yarn/pnpm work fine too):

   ```bash
   bun install
   ```

4. **Start the dev server:**

   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) — you should see the landing page. Head to `/builder` to see the form builder.

## Development Workflow

```bash
# Run the dev server with hot reload
bun dev

# Lint your code
bun run lint

# Build for production (good to run before submitting a PR)
bun run build
```

## Project Structure

Here's the quick version — see the README for a more detailed breakdown.

```
app/                  → Next.js pages (App Router)
app/builder/page.tsx  → The main form builder (this is where the magic happens)
components/builder/   → Builder-specific UI (canvas, palette, properties, preview)
components/landing/   → Marketing page components
components/ui/        → shadcn/ui component library
data/                 → Template definitions
hooks/                → Custom React hooks (undo-redo, mobile detection)
lib/export-react.ts   → Code generation — turns the form schema into a React component
types/form.ts         → All TypeScript types, field definitions, validation logic
```

## Code Style

We keep things simple:

- **TypeScript** — everything is typed. No `any` unless absolutely necessary (and if you do, leave a comment explaining why).
- **Functional components** with hooks — no class components.
- **Named exports** are preferred over default exports (except for Next.js pages/layouts).
- **Tailwind CSS** for styling — avoid inline styles or CSS modules.
- **shadcn/ui** components for UI — don't reinvent the wheel. If shadcn/ui has it, use it.

ESLint handles formatting. Just run `bun run lint` before committing and you're good.

## Making Changes

1. Create a branch from `main`:

   ```bash
   git checkout -b feat/your-feature-name
   # or: fix/the-bug-you-found
   ```

2. Make your changes. Keep commits small and focused — one logical change per commit.

3. Make sure things still work:

   ```bash
   bun run lint
   bun run build
   ```

4. Push and open a PR.

## Adding a New Field Type

This is one of the most common contributions. Here's the checklist:

1. **Add the type** to the `FieldType` union in `types/form.ts`.
2. **Add it to `FIELD_TYPES`** array (same file) with a label and Lucide icon name.
3. **Add validation options** in `VALIDATION_OPTIONS` (same file).
4. **Render it** in `FormCanvas.tsx` — add a case to the field rendering switch.
5. **Render it in preview** — add a case in `FormPreview.tsx`.
6. **Add Zod generation** — add a case in `lib/export-react.ts` so the exported code handles your new field.
7. **Add it to the code export renderer** — further down in `export-react.ts`, add the JSX for your field.
8. **Test it** — drag the field onto the canvas, configure it, preview it, export it. Make sure the generated code is valid.

If you're not sure about any step, just open a draft PR and we'll help you figure it out.

## Commit Messages

We loosely follow [Conventional Commits](https://www.conventionalcommits.org/). Don't stress about it too much, but it helps keep the changelog readable:

```
feat: add color picker field type
fix: prevent crash when deleting last field in step
docs: update README with new field types
refactor: simplify validation logic in export-react
chore: update dependencies
```

## Pull Requests

When you open a PR:

- **Fill out the template** — describe what you changed and why.
- **Keep it focused** — one feature or fix per PR. Big PRs are hard to review.
- **Include screenshots** if you changed anything visual.
- **Link the issue** if there's one (use `Closes #123` in the PR description).

We try to review PRs within a few days. If it's been a week and you haven't heard back, feel free to ping us.

## Reporting Bugs

Found a bug? [Open an issue](https://github.com/johuniq/formkitcn/issues/new?template=bug_report.md) and include:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Browser + OS (if relevant)
- Screenshots or a screen recording (if visual)

The more detail, the faster we can fix it.

## Suggesting Features

Got an idea? [Open a feature request](https://github.com/johuniq/formkitcn/issues/new?template=feature_request.md). Tell us:

- What problem does it solve?
- How would it work from a user's perspective?
- Are you willing to work on it? (Totally fine if not — just helps us prioritize.)

## Need Help?

If you're stuck, confused, or just want to say hi — open a [discussion](https://github.com/johuniq/formkitcn/discussions) or drop a comment on any issue. There are no dumb questions here.

---

Thanks again for contributing. You're making forms less painful for everyone. 🙌

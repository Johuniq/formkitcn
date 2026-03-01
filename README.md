<div align="center">

# formkitcn

**The open-source, drag-and-drop form builder for React — powered by shadcn/ui.**

Build production-ready forms visually. Get clean, copy-paste-ready code with react-hook-form and Zod validation. No lock-in, no accounts, no nonsense.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-black)](https://ui.shadcn.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Live Demo](https://formkitcn.jolyui.dev) · [Report a Bug](https://github.com/Johuniq/formkitcn/issues/new?template=bug_report.md) · [Request a Feature](https://github.com/Johuniq/formkitcn/issues/new?template=feature_request.md)

</div>

---

## Why formkitcn?

We got tired of writing the same form boilerplate over and over. You know the drill — set up react-hook-form, wire up Zod schemas, copy in the shadcn/ui components, hook everything together… for every single form.

**formkitcn** lets you skip all of that. Drag fields onto a canvas, tweak the settings, and export a clean React component that's ready to drop into your project. The generated code uses the same tools you'd pick yourself — shadcn/ui, react-hook-form, and Zod — so it fits right into your existing codebase.

No vendor lock-in. No proprietary runtime. Just clean code you own.

## Features

- **22 field types** — Text, email, password, number, phone, URL, textarea, select, checkbox, radio, date, datetime, time, file, toggle, slider, rating, color, hidden, heading, paragraph, and divider.
- **Drag-and-drop canvas** — Reorder, duplicate, and delete fields with a visual builder powered by dnd-kit.
- **Zod validation** — Min/max, regex, email, custom rules — all generated automatically in the exported code.
- **Conditional logic** — Show or hide fields based on other field values (equals, not equals, contains, empty, not empty).
- **Multi-step forms** — Split your form into wizard-style steps with per-step validation.
- **Live preview** — See your form working in real time, with actual validation, as you build it.
- **One-click code export** — Get a complete React component with react-hook-form, Zod schema, and shadcn/ui — ready to paste.
- **JSON schema output** — Copy the raw schema to integrate with your own rendering pipeline.
- **Undo / redo** — Full history with Ctrl+Z / Ctrl+Y support.
- **Template gallery** — Pre-built templates for contact forms, signups, surveys, job applications, and more.
- **Autosave** — Your work is saved to localStorage as you go. Never lose a draft.
- **Mobile-responsive** — The builder adapts its panel layout on smaller screens.
- **Fully open source** — MIT licensed. Fork it, extend it, make it yours.

## Tech Stack

| Layer                         | Tool                                                                    |
| ----------------------------- | ----------------------------------------------------------------------- |
| Framework                     | [Next.js 16](https://nextjs.org) (App Router, Turbopack)                |
| UI Components                 | [shadcn/ui](https://ui.shadcn.com) (Radix UI + Tailwind CSS)            |
| Styling                       | [Tailwind CSS v4](https://tailwindcss.com)                              |
| Drag & Drop                   | [@dnd-kit](https://dndkit.com)                                          |
| Animations                    | [Framer Motion](https://www.framer.com/motion)                          |
| Form Handling (exported code) | [react-hook-form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| State                         | React hooks + custom `useUndoRedo` hook                                 |
| Package Manager               | [Bun](https://bun.sh) (npm/yarn/pnpm work too)                          |

## Getting Started

### Prerequisites

- **Node.js 18+** (or [Bun](https://bun.sh))
- **Git**

### Installation

```bash
# Clone the repo
git clone https://github.com/johuniq/formkitcn.git
cd formkitcn

# Install dependencies
bun install
# or: npm install / yarn / pnpm install

# Start the dev server
bun dev
# or: npm run dev / yarn dev / pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and start building forms.

### Build for Production

```bash
bun run build
bun start
```

## Project Structure

Here's a quick tour so you know where things live:

```
formkitcn/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (providers, metadata, SEO)
│   ├── page.tsx            # Landing page
│   ├── not-found.tsx       # 404 page
│   └── builder/
│       └── page.tsx        # ⭐ The main form builder app
├── components/
│   ├── builder/            # Builder-specific components
│   │   ├── FieldPalette.tsx    # Left sidebar — drag fields from here
│   │   ├── FormCanvas.tsx      # Center — the drop zone / canvas
│   │   ├── FieldProperties.tsx # Right sidebar — configure selected field
│   │   ├── FormPreview.tsx     # Live preview panel
│   │   ├── SchemaOutput.tsx    # JSON schema viewer
│   │   └── TemplateGallery.tsx # Template picker modal
│   ├── landing/            # Marketing / landing page sections
│   ├── seo/                # JSON-LD structured data components
│   └── ui/                 # shadcn/ui component library
├── data/
│   └── form-templates.ts   # Pre-built form template definitions
├── hooks/
│   ├── use-undo-redo.ts    # Generic undo/redo state hook
│   └── use-mobile.tsx      # Responsive breakpoint hook
├── lib/
│   ├── export-react.ts     # 🔥 Generates the React + Zod + RHF component code
│   ├── seo-config.ts       # Centralized SEO constants
│   └── utils.ts            # cn() and other shared utilities
├── types/
│   └── form.ts             # TypeScript types, validation logic, field definitions
└── public/                 # Static assets
```

## How It Works

1. **Pick a template** or start from scratch on the `/builder` page.
2. **Drag fields** from the palette on the left onto the canvas.
3. **Configure** each field — label, placeholder, validation rules, conditional visibility — in the properties panel.
4. **Preview** your form in real time with working validation.
5. **Export** → get a self-contained React component using `react-hook-form`, `zod`, and shadcn/ui components. Paste it into your project. Done.

The exported code has **zero dependency on formkitcn**. It's just standard React code that uses the same libraries you already know.

## Contributing

We'd love your help! Whether it's fixing a typo, adding a new field type, or building a whole new feature — all contributions are welcome.

Please read our [Contributing Guide](CONTRIBUTING.md) to get started. The short version:

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Make your changes
4. Run `bun run lint` and `bun run build` to make sure nothing's broken
5. Open a PR

See [open issues](https://github.com/johuniq/formkitcn/issues) for things to work on. Issues labeled **`good first issue`** are great starting points.

## Roadmap

Here's what we're thinking about next. No promises on timelines, but PRs for any of these are very welcome:

- [ ] **Form themes** — Light/dark/custom theme support for exported forms
- [ ] **Cloud save** — Optional account to save and share forms
- [ ] **Form analytics** — Track submissions, completion rates, drop-offs
- [ ] **Webhook integration** — POST form data to any endpoint
- [ ] **AI field suggestions** — Describe your form, get fields auto-generated
- [ ] **Import from JSON** — Paste a schema to re-hydrate the builder
- [ ] **Accessibility audit** — WCAG 2.1 AA compliance checker for generated forms
- [ ] **More export targets** — Vue, Svelte, plain HTML
- [ ] **Embeddable widget** — `<script>` tag to embed forms anywhere
- [ ] **Custom field plugins** — Let users register their own field types

Got an idea? [Open a feature request](https://github.com/johuniq/formkitcn/issues/new?template=feature_request.md).

## License

This project is licensed under the [MIT License](LICENSE) — do whatever you want with it. Seriously.

## Acknowledgements

formkitcn wouldn't exist without these amazing projects:

- [shadcn/ui](https://ui.shadcn.com) — The beautiful component library at the heart of everything
- [Next.js](https://nextjs.org) — The React framework that makes this fast
- [dnd-kit](https://dndkit.com) — Smooth drag-and-drop primitives
- [react-hook-form](https://react-hook-form.com) — Performant form state management
- [Zod](https://zod.dev) — TypeScript-first schema validation
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS that just works
- [Framer Motion](https://www.framer.com/motion) — Silky smooth animations
- [Lucide](https://lucide.dev) — Clean, consistent icons

---

<div align="center">

**If formkitcn saves you time, consider giving it a ⭐ on GitHub.**

It helps others find the project and makes us mass-produce serotonin.

[⭐ Star on GitHub](https://github.com/johuniq/formkitcn)

</div>

# Changelog

All notable changes to formkitcn will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-03-01

### 🎉 Initial Release

The very first public release of formkitcn! Here's what's inside:

### Added

- **Visual form builder** with drag-and-drop canvas powered by dnd-kit
- **22 field types**: text, email, password, number, phone, URL, textarea, select, checkbox, radio, date, datetime, time, file, toggle, slider, rating, color, hidden, heading, paragraph, separator
- **Field properties panel** for configuring labels, placeholders, validation rules, and conditional visibility
- **Zod validation engine** with support for min, max, regex, email, and required rules
- **Conditional field logic** — show/hide fields based on equals, not equals, contains, empty, and not empty operators
- **Multi-step form support** — create wizard-style flows with per-step validation
- **Live form preview** with working validation feedback
- **One-click code export** — generates a clean React component using react-hook-form, Zod, and shadcn/ui
- **JSON schema output** — copy the raw form schema for custom integrations
- **Undo / redo** with full history support (Ctrl+Z / Ctrl+Y)
- **Template gallery** with 5 pre-built forms: Contact, Sign Up, Customer Survey, Job Application, Event Registration
- **Autosave to localStorage** — drafts are preserved across sessions
- **Responsive builder layout** — adapts panels for smaller screens
- **Landing page** with features, how it works, template showcase, and CTA sections
- **SEO** — comprehensive metadata, Open Graph, Twitter Cards, JSON-LD structured data, sitemap, robots.txt, and web manifest
- **Dark theme** — the entire app ships in a polished dark UI

### Technical

- Built on Next.js 16 (App Router) with Turbopack
- Tailwind CSS v4 with custom design tokens
- Full TypeScript coverage
- shadcn/ui component library (Radix UI primitives)
- Framer Motion animations
- Edge-rendered dynamic OG images

---

[1.0.0]: https://github.com/johuniq/formkitcn/releases/tag/v1.0.0

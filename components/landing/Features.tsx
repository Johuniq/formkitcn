"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Download,
  Eye,
  GitBranch,
  Layers,
  Shield,
  SlidersHorizontal,
  Smartphone,
  Undo2,
} from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "18+ Field Types",
    desc: "Text, email, slider, date, color, toggle, file uploads, headings, dividers, and more.",
  },
  {
    icon: SlidersHorizontal,
    title: "Drag & Drop Builder",
    desc: "Reorder, duplicate, and configure fields with an intuitive visual canvas.",
  },
  {
    icon: Shield,
    title: "Validation Engine",
    desc: "Min/max, regex, email, required — all with custom error messages and Zod export.",
  },
  {
    icon: GitBranch,
    title: "Conditional Logic",
    desc: "Show or hide fields based on other field values with equals, contains, and more.",
  },
  {
    icon: Code2,
    title: "Schema Output",
    desc: "Real-time JSON schema preview, ready to copy or integrate into your codebase.",
  },
  {
    icon: Download,
    title: "React Export",
    desc: "Download a production-ready React component with react-hook-form + Zod validation.",
  },
  {
    icon: Eye,
    title: "Live Preview",
    desc: "See your form render in real time, complete with validation and multi-step navigation.",
  },
  {
    icon: Undo2,
    title: "Undo / Redo",
    desc: "Full history tracking with Ctrl+Z / Ctrl+Shift+Z and autosave with draft recovery.",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    desc: "Fully responsive builder with dedicated mobile panel layout.",
  },
];

const Features = () => (
  <section
    id="features"
    className="relative py-28 px-6"
    aria-labelledby="features-heading"
  >
    <div
      className="absolute inset-0 grid-pattern opacity-10"
      aria-hidden="true"
    />
    <div className="relative z-10 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-border bg-surface-2 font-mono text-xs text-muted-foreground">
          Features
        </span>
        <h2
          id="features-heading"
          className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4"
        >
          Everything you need,{" "}
          <span className="gradient-text">nothing you don&apos;t</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          A complete form building toolkit built on shadcn/ui, designed for
          developers who value speed, flexibility, and clean output.
        </p>
      </motion.div>

      <div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        role="list"
        aria-label="FormKitCN features"
      >
        {features.map((f, i) => (
          <motion.article
            key={f.title}
            role="listitem"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            className="gradient-border rounded-xl p-5 group hover:bg-surface-2/50 transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
              <f.icon className="w-4.5 h-4.5 text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">
              {f.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {f.desc}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default Features;

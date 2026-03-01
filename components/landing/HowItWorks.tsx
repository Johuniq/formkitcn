"use client";

import { motion } from "framer-motion";
import { Download, MousePointerClick, Settings2 } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    num: "01",
    title: "Drag & drop fields",
    desc: "Pick from 18+ field types and drop them onto the canvas. Reorder with drag handles.",
  },
  {
    icon: Settings2,
    num: "02",
    title: "Configure & validate",
    desc: "Set labels, placeholders, validation rules, conditional visibility, and multi-step flows.",
  },
  {
    icon: Download,
    num: "03",
    title: "Export & ship",
    desc: "Download a production-ready React component with react-hook-form, Zod, and conditional logic baked in.",
  },
];

const HowItWorks = () => (
  <section
    id="how-it-works"
    className="relative py-28 px-6 border-t border-border/40"
    aria-labelledby="how-it-works-heading"
  >
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-border bg-surface-2 font-mono text-xs text-muted-foreground">
          How it works
        </span>
        <h2
          id="how-it-works-heading"
          className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4"
        >
          Three steps to <span className="gradient-text">production forms</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          From idea to exported React code in under a minute.
        </p>
      </motion.div>

      <ol
        className="grid md:grid-cols-3 gap-6"
        aria-label="Steps to build a form"
      >
        {steps.map((s, i) => (
          <motion.li
            key={s.num}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="relative list-none"
          >
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-border to-transparent -translate-x-6 z-0"
                aria-hidden="true"
              />
            )}

            <div className="relative z-10 gradient-border rounded-xl p-6 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <span
                  className="font-mono text-2xl font-bold text-primary/20"
                  aria-hidden="true"
                >
                  {s.num}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;

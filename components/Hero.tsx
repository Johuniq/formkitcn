"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-24 sm:py-32"
      aria-labelledby="hero-heading"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 grid-pattern opacity-30"
        aria-hidden="true"
      />

      {/* Glow orbs */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          <span className="gradient-text">formkitcn</span>
          <br />
          <span className="text-foreground">The shadcn/ui</span>
          <br />
          <span className="text-muted-foreground">form builder</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Open-source drag-and-drop form builder powered by{" "}
          <strong className="text-foreground font-medium">shadcn/ui</strong>.
          Zod validation, react-hook-form, multi-step flows, conditional logic,
          and instant code export.{" "}
          <span className="text-foreground font-medium">
            Stop rebuilding forms.
          </span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link
            href="/builder"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow hover:glow-strong transition-shadow"
            aria-label="Open the FormKitCN drag-and-drop form builder"
          >
            Open Builder
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/#features"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border bg-surface-2 text-foreground font-medium text-sm hover:bg-surface-3 transition-colors"
            aria-label="Learn more about FormKitCN features"
          >
            <Code2 className="w-4 h-4" aria-hidden="true" />
            Learn More
          </Link>
        </motion.div>

        {/* Code preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-16 max-w-lg mx-auto gradient-border rounded-lg overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface-1">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
            </div>
            <span className="text-[11px] font-mono text-muted-foreground ml-2">
              schema.ts
            </span>
          </div>
          <pre className="p-4 text-left text-xs font-mono leading-relaxed overflow-x-auto">
            <code>
              <span className="text-muted-foreground">
                {"// That's it. Seriously.\n"}
              </span>
              <span className="text-primary">{"const"}</span>
              {" form = "}
              <span className="text-primary">{"formkitcn"}</span>
              {"({\n"}
              {"  "}
              <span className="text-accent">fields</span>
              {': ["name", "email"],\n'}
              {"  "}
              <span className="text-accent">validation</span>
              {': "zod",\n'}
              {"  "}
              <span className="text-accent">autosave</span>
              {": "}
              <span className="text-primary">true</span>
              {",\n"}
              {"  "}
              <span className="text-accent">steps</span>
              {': ["info", "confirm"],\n'}
              {"});"}
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

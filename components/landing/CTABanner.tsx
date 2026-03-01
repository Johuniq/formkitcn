"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const CTABanner = () => {
  return (
    <section
      className="relative py-28 px-6 border-t border-border/40 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Background effects */}
      <div
        className="absolute inset-0 grid-pattern opacity-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/8 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-[250px] h-[200px] rounded-full bg-accent/6 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-primary/20 bg-primary/5 font-mono text-xs text-primary">
            <Sparkles className="w-3 h-3" aria-hidden="true" />
            Free & open source
          </div>

          <h2
            id="cta-heading"
            className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight"
          >
            Ready to stop
            <br />
            <span className="gradient-text">rebuilding forms?</span>
          </h2>

          <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
            Build your next React form in under a minute with shadcn/ui
            components. Drag, configure, export — ship production-ready code
            instantly.
          </p>

          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/builder"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow hover:glow-strong transition-shadow"
              aria-label="Start building forms for free with FormKitCN"
            >
              Start Building — It&apos;s Free
              <ArrowRight
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                aria-hidden="true"
              />
            </Link>
          </div>

          <p className="mt-5 text-[11px] font-mono text-muted-foreground/30">
            No sign-up · No credit card · No limits
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;

"use client";

import { motion } from "framer-motion";
import { ArrowRight, Layers } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl"
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto flex items-center justify-between h-12 px-6"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="FormKitCN — Go to homepage"
        >
          <Layers className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="font-mono text-sm font-semibold text-foreground">
            formkitcn
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/builder"
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs glow hover:glow-strong transition-shadow"
            aria-label="Open the form builder"
          >
            Open Builder
            <ArrowRight
              className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;

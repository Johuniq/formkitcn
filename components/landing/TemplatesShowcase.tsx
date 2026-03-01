"use client";

import { FORM_TEMPLATES } from "@/data/form-templates";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Bug,
  CalendarCheck,
  ClipboardList,
  Mail,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Mail,
  UserPlus,
  ClipboardList,
  Briefcase,
  CalendarCheck,
  Bug,
};

const categoryColors: Record<string, string> = {
  basic: "bg-primary/10 text-primary",
  business: "bg-accent/10 text-accent",
  feedback: "bg-destructive/10 text-destructive",
};

const TemplatesShowcase = () => {
  const router = useRouter();

  return (
    <section className="relative py-28 px-6 border-t border-border/40">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-border bg-surface-2 font-mono text-xs text-muted-foreground">
            Templates
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Start from a <span className="gradient-text">template</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Pre-built forms for common use cases. Load one, customize it, export
            it.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FORM_TEMPLATES.map((t, i) => {
            const Icon = iconMap[t.icon] || Mail;
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="gradient-border rounded-xl p-5 group cursor-pointer hover:bg-surface-2/50 transition-colors"
                onClick={() => router.push("/builder")}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${categoryColors[t.category] || ""}`}
                  >
                    {t.category}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {t.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {t.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground/50">
                    {t.fields.length} fields
                    {t.multiStepEnabled ? ` · ${t.steps.length} steps` : ""}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TemplatesShowcase;

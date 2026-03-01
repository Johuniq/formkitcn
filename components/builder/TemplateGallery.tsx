"use client";

import { motion } from "framer-motion";
import {
  Mail, UserPlus, ClipboardList, Briefcase, CalendarCheck, Bug,
  Layers, ArrowRight
} from "lucide-react";
import { FORM_TEMPLATES, FormTemplate } from "@/data/form-templates";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Mail, UserPlus, ClipboardList, Briefcase, CalendarCheck, Bug,
};

const categoryLabels: Record<string, string> = {
  basic: "Basic",
  business: "Business",
  feedback: "Feedback",
};

const TemplateCard = ({
  template,
  onSelect,
  index,
}: {
  template: FormTemplate;
  onSelect: (template: FormTemplate) => void;
  index: number;
}) => {
  const Icon = iconMap[template.icon] || Layers;

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onSelect(template)}
      className="group w-full text-left rounded-xl border border-border/50 bg-surface-2/30 p-4 hover:border-primary/30 hover:bg-surface-2/60 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-foreground">{template.name}</span>
            {template.multiStepEnabled && (
              <Badge variant="secondary" className="text-[9px] font-mono bg-primary/10 text-primary border-0 px-1.5 py-0">
                multi-step
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{template.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] font-mono text-muted-foreground/70">
              {template.fields.length} fields
            </span>
            {template.multiStepEnabled && (
              <span className="text-[10px] font-mono text-muted-foreground/70">
                · {template.steps.length} steps
              </span>
            )}
            <ArrowRight className="w-3 h-3 text-muted-foreground/30 ml-auto group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>
    </motion.button>
  );
};

const TemplateGallery = ({
  onSelect,
  onClose,
}: {
  onSelect: (template: FormTemplate) => void;
  onClose: () => void;
}) => {
  const categories = ["basic", "business", "feedback"] as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <h2 className="text-lg font-bold text-foreground">Templates</h2>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">Pick a starting point</p>
        </div>
        <button
          onClick={onClose}
          className="text-xs font-mono text-muted-foreground hover:text-foreground px-3 py-1.5 rounded border border-border hover:bg-surface-2 transition-colors"
        >
          Start blank
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="max-w-2xl mx-auto p-6 space-y-6">
          {categories.map((cat) => {
            const templates = FORM_TEMPLATES.filter((t) => t.category === cat);
            if (templates.length === 0) return null;
            return (
              <div key={cat}>
                <h3 className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
                  {categoryLabels[cat]}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {templates.map((template, i) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onSelect={onSelect}
                      index={i}
                    />
                  ))}
                </div>
                <Separator className="mt-6" />
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default TemplateGallery;

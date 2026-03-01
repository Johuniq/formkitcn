"use client";

import { FormField, FormSchema, FormStep } from "@/types/form";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const generateZodSchema = (fields: FormField[], steps: FormStep[], multiStep: boolean): string => {
  const fieldToZod = (f: FormField) => {
    if (f.type === "heading" || f.type === "separator" || f.type === "paragraph" || f.type === "hidden") return null;
    let rule = "";
    switch (f.type) {
      case "email": rule = "z.string().email()"; break;
      case "number":
      case "slider":
      case "rating": rule = "z.number()"; break;
      case "checkbox":
      case "toggle": rule = "z.boolean()"; break;
      case "date":
      case "datetime": rule = "z.date()"; break;
      case "file": rule = "z.instanceof(File)"; break;
      case "url":
      case "phone":
      case "color":
      case "time": rule = "z.string()"; break;
      case "select":
      case "radio":
        if (f.options?.length) {
          rule = `z.enum([${f.options.filter(Boolean).map(o => `"${o}"`).join(", ")}])`;
        } else {
          rule = "z.string()";
        }
        break;
      default: rule = "z.string()";
    }
    if (!f.required && f.type !== "checkbox" && f.type !== "toggle") {
      rule += ".optional()";
    }
    const key = f.label.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    return `  ${key}: ${rule},`;
  };

  if (multiStep && steps.length > 1) {
    const stepSchemas = steps.map((step, i) => {
      const stepFields = fields.filter((f) => f.step === i);
      const stepKey = step.title.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
      const lines = stepFields.map(fieldToZod).filter(Boolean);
      return `const ${stepKey}Schema = z.object({\n${lines.join("\n")}\n});`;
    });

    const stepKeys = steps.map((s) => s.title.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, ""));
    const combined = `const formSchema = z.object({\n${stepKeys.map(k => `  ${k}: ${k}Schema,`).join("\n")}\n});`;

    return `import { z } from "zod";\n\n${stepSchemas.join("\n\n")}\n\n${combined}`;
  }

  const lines = fields.map(fieldToZod).filter(Boolean);
  return `import { z } from "zod";\n\nconst formSchema = z.object({\n${lines.join("\n")}\n});`;
};

const generateJSON = (fields: FormField[], steps: FormStep[], multiStep: boolean): string => {
  const schema: FormSchema = {
    id: "form_" + Date.now().toString(36),
    name: "My Form",
    fields: fields.map(f => ({
      id: f.id,
      type: f.type,
      label: f.label,
      placeholder: f.placeholder,
      required: f.required,
      options: f.options,
      step: f.step,
    })),
    steps: multiStep ? steps : undefined,
    settings: {
      autosave: true,
      multiStep,
      submitLabel: "Submit",
    },
  };
  return JSON.stringify(schema, null, 2);
};

const SchemaOutput = ({
  fields,
  steps,
  multiStepEnabled,
}: {
  fields: FormField[];
  steps: FormStep[];
  multiStepEnabled: boolean;
}) => {
  const [tab, setTab] = useState<"zod" | "json">("zod");
  const [copied, setCopied] = useState(false);

  const code = tab === "zod"
    ? generateZodSchema(fields, steps, multiStepEnabled)
    : generateJSON(fields, steps, multiStepEnabled);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-surface-1">
        <div className="flex gap-1">
          {(["zod", "json"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                tab === t
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-primary" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {fields.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground font-mono">Add fields to generate schema</p>
          </div>
        ) : (
          <motion.pre
            key={tab + fields.length + String(multiStepEnabled)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-mono leading-relaxed text-foreground"
          >
            <code>{code}</code>
          </motion.pre>
        )}
      </div>
    </div>
  );
};

export default SchemaOutput;

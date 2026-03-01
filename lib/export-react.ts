import { FormField, FormStep, FieldCondition } from "@/types/form";

const toKey = (label: string) =>
  label.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "") || "field";

const zodType = (f: FormField): string => {
  let rule = "";
  switch (f.type) {
    case "email": rule = "z.string().email({ message: \"Invalid email\" })"; break;
    case "number": rule = "z.coerce.number()"; break;
    case "checkbox":
    case "toggle": rule = "z.boolean()"; break;
    case "date":
    case "datetime":
    case "time":
    case "color":
    case "url":
    case "phone": rule = "z.string()"; break;
    case "slider":
    case "rating": rule = "z.number()"; break;
    case "file": rule = "z.any()"; break;
    case "heading":
    case "paragraph":
    case "separator":
    case "hidden": return ""; // layout/hidden, skip
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

  // Add validation rules
  if (f.validation?.length) {
    for (const v of f.validation) {
      if (v.type === "min" && v.value != null) {
        rule += f.type === "number"
          ? `.min(${v.value}${v.message ? `, { message: "${v.message}" }` : ""})`
          : `.min(${v.value}${v.message ? `, { message: "${v.message}" }` : ""})`;
      }
      if (v.type === "max" && v.value != null) {
        rule += `.max(${v.value}${v.message ? `, { message: "${v.message}" }` : ""})`;
      }
      if (v.type === "pattern" && v.value) {
        rule += `.regex(/${v.value}/${v.message ? `, { message: "${v.message}" }` : ""})`;
      }
    }
  }

  // Fields with conditions should always be optional in the schema
  if (f.condition?.fieldId) {
    if (f.type !== "checkbox" && f.type !== "toggle") {
      rule += ".optional()";
    }
  } else if (!f.required && f.type !== "checkbox" && f.type !== "toggle") {
    rule += ".optional()";
  } else if (f.required && (f.type === "text" || f.type === "password" || f.type === "textarea" || f.type === "email")) {
    rule += `.min(1, { message: "${f.label} is required" })`;
  }

  return rule;
};

const conditionCheck = (condition: FieldCondition, keyMap: Map<string, string>): string => {
  const depKey = keyMap.get(condition.fieldId);
  if (!depKey) return "";
  const watchVar = `watch("${depKey}")`;
  switch (condition.operator) {
    case "equals": return `String(${watchVar} ?? "") === "${condition.value || ""}"`;
    case "not_equals": return `String(${watchVar} ?? "") !== "${condition.value || ""}"`;
    case "contains": return `String(${watchVar} ?? "").includes("${condition.value || ""}")`;
    case "not_empty": return `String(${watchVar} ?? "").trim().length > 0`;
    case "empty": return `!String(${watchVar} ?? "").trim()`;
    default: return "true";
  }
};

const wrapConditional = (jsx: string, field: FormField, keyMap: Map<string, string>): string => {
  if (!field.condition?.fieldId) return jsx;
  const check = conditionCheck(field.condition, keyMap);
  if (!check) return jsx;
  return `        {${check} && (
          <>
${jsx.split("\n").map(l => "  " + l).join("\n")}
          </>
        )}`;
};

const fieldJSX = (f: FormField, key: string): string => {
  const errorBlock = `{errors.${key} && <p className="text-sm text-red-500">{errors.${key}?.message as string}</p>}`;

  switch (f.type) {
    case "heading":
      return `        <h3 className="text-lg font-semibold pt-2">${f.label}</h3>`;

    case "paragraph":
      return `        <p className="text-sm text-gray-500">${f.placeholder || f.label}</p>`;

    case "hidden":
      return `        <input type="hidden" {...register("${key}")} />`;

    case "separator":
      return `        <hr className="border-border" />`;

    case "rating":
      return `        <div className="space-y-2">
          <label className="text-sm font-medium">${f.label}${f.required ? " *" : ""}</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setValue("${key}", star)}
                className={\`text-2xl \${(watch("${key}") || 0) >= star ? "text-yellow-400" : "text-gray-300"}\`}
              >
                ★
              </button>
            ))}
          </div>
          ${errorBlock}
        </div>`;

    case "datetime":
      return `        <div className="space-y-2">
          <label htmlFor="${key}" className="text-sm font-medium">${f.label}${f.required ? " *" : ""}</label>
          <input type="datetime-local" id="${key}" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register("${key}")} />
          ${errorBlock}
        </div>`;

    case "textarea":
      return `        <div className="space-y-2">
          <label htmlFor="${key}" className="text-sm font-medium">${f.label}${f.required ? " *" : ""}</label>
          <textarea
            id="${key}"
            placeholder="${f.placeholder || ""}"
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            {...register("${key}")}
          />
          ${errorBlock}
        </div>`;

    case "select":
      return `        <div className="space-y-2">
          <label htmlFor="${key}" className="text-sm font-medium">${f.label}${f.required ? " *" : ""}</label>
          <select
            id="${key}"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            {...register("${key}")}
          >
            <option value="">${f.placeholder || "Select..."}</option>
${(f.options || []).map(o => `            <option value="${o}">${o}</option>`).join("\n")}
          </select>
          ${errorBlock}
        </div>`;

    case "radio":
      return `        <div className="space-y-2">
          <label className="text-sm font-medium">${f.label}${f.required ? " *" : ""}</label>
          <div className="flex flex-col gap-2">
${(f.options || []).map(o => `            <label className="flex items-center gap-2 text-sm">
              <input type="radio" value="${o}" {...register("${key}")} />
              ${o}
            </label>`).join("\n")}
          </div>
          ${errorBlock}
        </div>`;

    case "checkbox":
    case "toggle":
      return `        <div className="flex items-center gap-2">
          <input type="checkbox" id="${key}" {...register("${key}")} />
          <label htmlFor="${key}" className="text-sm font-medium">${f.label}</label>
          ${errorBlock}
        </div>`;

    case "date":
      return `        <div className="space-y-2">
          <label htmlFor="${key}" className="text-sm font-medium">${f.label}${f.required ? " *" : ""}</label>
          <input type="date" id="${key}" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register("${key}")} />
          ${errorBlock}
        </div>`;

    case "time":
      return `        <div className="space-y-2">
          <label htmlFor="${key}" className="text-sm font-medium">${f.label}${f.required ? " *" : ""}</label>
          <input type="time" id="${key}" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register("${key}")} />
          ${errorBlock}
        </div>`;

    case "file":
      return `        <div className="space-y-2">
          <label htmlFor="${key}" className="text-sm font-medium">${f.label}${f.required ? " *" : ""}</label>
          <input type="file" id="${key}" className="text-sm" {...register("${key}")} />
          ${errorBlock}
        </div>`;

    case "slider":
      return `        <div className="space-y-2">
          <label htmlFor="${key}" className="text-sm font-medium">${f.label}${f.required ? " *" : ""}</label>
          <input type="range" id="${key}" min="0" max="100" className="w-full" {...register("${key}", { valueAsNumber: true })} />
          ${errorBlock}
        </div>`;

    case "color":
      return `        <div className="space-y-2">
          <label htmlFor="${key}" className="text-sm font-medium">${f.label}${f.required ? " *" : ""}</label>
          <input type="color" id="${key}" className="h-10 w-20 rounded-md border border-input cursor-pointer" {...register("${key}")} />
          ${errorBlock}
        </div>`;

    case "url":
      return `        <div className="space-y-2">
          <label htmlFor="${key}" className="text-sm font-medium">${f.label}${f.required ? " *" : ""}</label>
          <input type="url" id="${key}" placeholder="${f.placeholder || "https://example.com"}" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register("${key}")} />
          ${errorBlock}
        </div>`;

    case "phone":
      return `        <div className="space-y-2">
          <label htmlFor="${key}" className="text-sm font-medium">${f.label}${f.required ? " *" : ""}</label>
          <input type="tel" id="${key}" placeholder="${f.placeholder || "+1 (555) 000-0000"}" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register("${key}")} />
          ${errorBlock}
        </div>`;

    default:
      return `        <div className="space-y-2">
          <label htmlFor="${key}" className="text-sm font-medium">${f.label}${f.required ? " *" : ""}</label>
          <input type="${f.type}" id="${key}" placeholder="${f.placeholder || ""}" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" {...register("${key}")} />
          ${errorBlock}
        </div>`;
  }
};

export function generateReactComponent(
  fields: FormField[],
  steps: FormStep[],
  multiStep: boolean
): string {
  const keys = fields.map((f) => toKey(f.label));
  // deduplicate keys
  const usedKeys = new Map<string, number>();
  const uniqueKeys = keys.map((k) => {
    const count = usedKeys.get(k) || 0;
    usedKeys.set(k, count + 1);
    return count > 0 ? `${k}_${count}` : k;
  });

  // Build id -> key map for condition references
  const keyMap = new Map<string, string>();
  fields.forEach((f, i) => keyMap.set(f.id, uniqueKeys[i]));

  const hasConditions = fields.some((f) => f.condition?.fieldId);

  const zodFields = fields
    .map((f, i) => {
      const z = zodType(f);
      return z ? `  ${uniqueKeys[i]}: ${z},` : null;
    })
    .filter(Boolean)
    .join("\n");

  const formFields = fields
    .map((f, i) => wrapConditional(fieldJSX(f, uniqueKeys[i]), f, keyMap))
    .join("\n\n");

  const stepLogic = multiStep && steps.length > 1;

  let stepContent = "";
  if (stepLogic) {
    const stepBlocks = steps.map((step, si) => {
      const stepFields = fields
        .map((f, i) => ({ f, key: uniqueKeys[i] }))
        .filter(({ f }) => f.step === si);
      const jsx = stepFields.map(({ f, key }) => wrapConditional(fieldJSX(f, key), f, keyMap)).join("\n\n");
      return `      {step === ${si} && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">${step.title}</h2>
${jsx}
        </div>
      )}`;
    }).join("\n\n");

    stepContent = `
  const [step, setStep] = useState(0);
  const totalSteps = ${steps.length};

${stepBlocks}`;
  }

  const needsUseState = stepLogic;

  const hasRating = fields.some((f) => f.type === "rating");
  const needsWatch = hasConditions || hasRating;
  const needsSetValue = hasRating;

  return `"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
${needsUseState ? 'import { useState } from "react";\n' : ""}
const formSchema = z.object({
${zodFields}
});

type FormData = z.infer<typeof formSchema>;

export default function GeneratedForm() {
  const {
    register,
    handleSubmit,${needsWatch ? "\n    watch," : ""}${needsSetValue ? "\n    setValue," : ""}
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
${stepLogic ? stepContent : ""}
  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // TODO: Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-6 p-6">
${stepLogic ? `      {/* Step indicators */}
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={\`h-1 flex-1 rounded-full \${i <= step ? "bg-blue-500" : "bg-gray-200"}\`}
          />
        ))}
      </div>

      {/* Step content rendered above */}

      <div className="flex gap-3 pt-4">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Back
          </button>
        )}
        {step < totalSteps - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>` : `${formFields}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>`}
    </form>
  );
}
`;
}

export function downloadFile(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/typescript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

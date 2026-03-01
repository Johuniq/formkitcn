export interface FieldCondition {
  fieldId: string;
  operator: "equals" | "not_equals" | "contains" | "not_empty" | "empty";
  value?: string;
}

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule[];
  options?: string[];
  step?: number;
  condition?: FieldCondition;
}

export const CONDITION_OPERATORS: { value: FieldCondition["operator"]; label: string }[] = [
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not equals" },
  { value: "contains", label: "Contains" },
  { value: "not_empty", label: "Is not empty" },
  { value: "empty", label: "Is empty" },
];

export function evaluateCondition(
  condition: FieldCondition | undefined,
  values: Record<string, string>,
): boolean {
  if (!condition || !condition.fieldId) return true;
  const val = values[condition.fieldId] || "";
  switch (condition.operator) {
    case "equals": return val === (condition.value || "");
    case "not_equals": return val !== (condition.value || "");
    case "contains": return val.includes(condition.value || "");
    case "not_empty": return val.trim().length > 0;
    case "empty": return val.trim().length === 0;
    default: return true;
  }
}

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "datetime"
  | "file"
  | "toggle"
  | "url"
  | "phone"
  | "slider"
  | "color"
  | "time"
  | "rating"
  | "hidden"
  | "heading"
  | "paragraph"
  | "separator";

export interface ValidationRule {
  type: "required" | "min" | "max" | "pattern" | "email" | "custom";
  value?: string | number;
  message: string;
}

export interface FormSchema {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
  steps?: FormStep[];
  settings: FormSettings;
}

export interface FormStep {
  id: string;
  title: string;
  fieldIds: string[];
}

export interface FormSettings {
  autosave: boolean;
  multiStep: boolean;
  submitLabel: string;
}

export const VALIDATION_OPTIONS: Record<FieldType, ValidationRule["type"][]> = {
  text: ["required", "min", "max", "pattern"],
  email: ["required", "email"],
  password: ["required", "min", "max", "pattern"],
  number: ["required", "min", "max"],
  textarea: ["required", "min", "max"],
  select: ["required"],
  checkbox: ["required"],
  radio: ["required"],
  date: ["required"],
  datetime: ["required"],
  file: ["required"],
  toggle: ["required"],
  url: ["required", "pattern"],
  phone: ["required", "pattern"],
  slider: ["required", "min", "max"],
  color: ["required"],
  time: ["required"],
  rating: ["required", "min", "max"],
  hidden: [],
  heading: [],
  paragraph: [],
  separator: [],
};

export const VALIDATION_LABELS: Record<ValidationRule["type"], string> = {
  required: "Required",
  min: "Min Length",
  max: "Max Length",
  pattern: "Regex Pattern",
  email: "Email Format",
  custom: "Custom",
};

export function validateField(field: FormField, value: string): string | null {
  if (field.type === "heading" || field.type === "separator" || field.type === "paragraph" || field.type === "hidden") return null;

  if (field.required && !value.trim()) {
    const customMsg = field.validation?.find((v) => v.type === "required")?.message;
    return customMsg || `${field.label} is required`;
  }

  if (!value && !field.required) return null;

  const rules = field.validation || [];
  for (const rule of rules) {
    switch (rule.type) {
      case "min":
        if (field.type === "number" || field.type === "slider") {
          if (Number(value) < Number(rule.value)) return rule.message || `Minimum value is ${rule.value}`;
        } else {
          if (value.length < Number(rule.value)) return rule.message || `Minimum ${rule.value} characters`;
        }
        break;
      case "max":
        if (field.type === "number" || field.type === "slider") {
          if (Number(value) > Number(rule.value)) return rule.message || `Maximum value is ${rule.value}`;
        } else {
          if (value.length > Number(rule.value)) return rule.message || `Maximum ${rule.value} characters`;
        }
        break;
      case "pattern":
        try {
          if (rule.value && !new RegExp(String(rule.value)).test(value)) {
            return rule.message || "Invalid format";
          }
        } catch {}
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return rule.message || "Invalid email address";
        }
        break;
    }
  }
  return null;
}

export const FIELD_TYPES: { type: FieldType; label: string; icon: string }[] = [
  { type: "text", label: "Text", icon: "Type" },
  { type: "email", label: "Email", icon: "Mail" },
  { type: "password", label: "Password", icon: "Lock" },
  { type: "number", label: "Number", icon: "Hash" },
  { type: "phone", label: "Phone", icon: "Phone" },
  { type: "url", label: "URL", icon: "Link" },
  { type: "textarea", label: "Textarea", icon: "AlignLeft" },
  { type: "select", label: "Select", icon: "ChevronDown" },
  { type: "checkbox", label: "Checkbox", icon: "CheckSquare" },
  { type: "radio", label: "Radio", icon: "Circle" },
  { type: "date", label: "Date", icon: "Calendar" },
  { type: "datetime", label: "Date & Time", icon: "CalendarClock" },
  { type: "time", label: "Time", icon: "Clock" },
  { type: "file", label: "File", icon: "Upload" },
  { type: "toggle", label: "Toggle", icon: "ToggleLeft" },
  { type: "slider", label: "Slider", icon: "SlidersHorizontal" },
  { type: "rating", label: "Rating", icon: "Star" },
  { type: "color", label: "Color", icon: "Palette" },
  { type: "hidden", label: "Hidden", icon: "EyeOff" },
  { type: "heading", label: "Heading", icon: "Heading" },
  { type: "paragraph", label: "Paragraph", icon: "FileText" },
  { type: "separator", label: "Divider", icon: "Minus" },
];

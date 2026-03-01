"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  evaluateCondition,
  FormField,
  FormStep,
  validateField,
} from "@/types/form";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
  Upload,
} from "lucide-react";
import { useCallback, useState } from "react";

const FieldInput = ({
  field,
  value,
  error,
  touched,
  onChange,
  onBlur,
}: {
  field: FormField;
  value: string;
  error: string | null;
  touched: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
}) => {
  const hasError = touched && !!error;
  const errorClass = hasError
    ? "border-destructive/60 focus-visible:ring-destructive/30"
    : "";

  switch (field.type) {
    case "heading":
      return (
        <h3 className="text-lg font-semibold text-foreground pt-2">
          {field.label}
        </h3>
      );

    case "separator":
      return <Separator className="my-2" />;

    case "paragraph":
      return (
        <p className="text-sm text-muted-foreground leading-relaxed">
          {field.placeholder || field.label}
        </p>
      );

    case "hidden":
      return (
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-surface-2/50 border border-dashed border-border">
          <span className="text-[10px] font-mono text-muted-foreground/50">
            Hidden: {field.label}
          </span>
        </div>
      );

    case "rating": {
      const ratingVal = value ? Number(value) : 0;
      return (
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => {
                onChange(String(star));
                onBlur();
              }}
              className="p-0.5 transition-colors"
            >
              <Star
                className={cn(
                  "w-6 h-6 transition-colors",
                  star <= ratingVal
                    ? "fill-primary text-primary"
                    : "text-border hover:text-primary/40",
                )}
              />
            </button>
          ))}
          {ratingVal > 0 && (
            <span className="text-xs font-mono text-muted-foreground ml-2">
              {ratingVal}/5
            </span>
          )}
        </div>
      );
    }

    case "datetime":
      return (
        <Input
          type="datetime-local"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={errorClass}
        />
      );

    case "textarea":
      return (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={field.placeholder}
          rows={3}
          className={errorClass}
        />
      );

    case "select":
      return (
        <Select
          value={value || undefined}
          onValueChange={(v) => {
            onChange(v);
            onBlur();
          }}
        >
          <SelectTrigger
            className={
              hasError ? "border-destructive/60 focus:ring-destructive/30" : ""
            }
          >
            <SelectValue placeholder={field.placeholder || "Select..."} />
          </SelectTrigger>
          <SelectContent>
            {(field.options || []).filter(Boolean).map((o) => (
              <SelectItem key={o} value={o}>
                {o}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "checkbox":
      return (
        <div className="flex items-center gap-3">
          <Checkbox
            id={field.id}
            checked={value === "true"}
            onCheckedChange={(checked) => {
              onChange(String(!!checked));
              onBlur();
            }}
          />
          <Label
            htmlFor={field.id}
            className="text-sm font-normal text-foreground cursor-pointer"
          >
            {field.placeholder || field.label}
          </Label>
        </div>
      );

    case "radio":
      return (
        <RadioGroup
          value={value}
          onValueChange={(v) => {
            onChange(v);
            onBlur();
          }}
        >
          {(field.options || ["Option 1", "Option 2"])
            .filter(Boolean)
            .map((o) => (
              <div key={o} className="flex items-center gap-3">
                <RadioGroupItem value={o} id={`${field.id}-${o}`} />
                <Label
                  htmlFor={`${field.id}-${o}`}
                  className="text-sm font-normal text-foreground cursor-pointer"
                >
                  {o}
                </Label>
              </div>
            ))}
        </RadioGroup>
      );

    case "toggle":
      return (
        <div className="flex items-center gap-3">
          <Switch
            id={field.id}
            checked={value === "true"}
            onCheckedChange={(checked) => {
              onChange(String(checked));
              onBlur();
            }}
          />
          <Label
            htmlFor={field.id}
            className="text-sm font-normal text-foreground cursor-pointer"
          >
            {field.placeholder || field.label}
          </Label>
        </div>
      );

    case "file":
      return (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors hover:border-primary/30 cursor-pointer ${hasError ? "border-destructive/40 bg-destructive/5" : "border-border"}`}
        >
          <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
          <p className="text-xs text-muted-foreground font-mono">
            Drop files or click to upload
          </p>
        </div>
      );

    case "date": {
      const dateValue = value ? new Date(value) : undefined;
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !dateValue && "text-muted-foreground",
                hasError && "border-destructive/60",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateValue ? (
                format(dateValue, "PPP")
              ) : (
                <span>{field.placeholder || "Pick a date"}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateValue}
              onSelect={(d) => {
                onChange(d ? d.toISOString() : "");
                onBlur();
              }}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      );
    }

    case "time":
      return (
        <Input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={errorClass}
        />
      );

    case "slider": {
      const sliderVal = value ? Number(value) : 50;
      return (
        <div className="space-y-3">
          <Slider
            value={[sliderVal]}
            onValueChange={(v) => {
              onChange(String(v[0]));
              onBlur();
            }}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
            <span>0</span>
            <span className="text-foreground font-medium">{sliderVal}</span>
            <span>100</span>
          </div>
        </div>
      );
    }

    case "color": {
      return (
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg border border-border cursor-pointer overflow-hidden"
            style={{ backgroundColor: value || "#3b82f6" }}
          >
            <input
              type="color"
              value={value || "#3b82f6"}
              onChange={(e) => {
                onChange(e.target.value);
                onBlur();
              }}
              className="w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <Input
            value={value || "#3b82f6"}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            className={cn("font-mono text-xs flex-1", errorClass)}
            placeholder="#000000"
          />
        </div>
      );
    }

    case "url":
      return (
        <Input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={field.placeholder || "https://example.com"}
          className={errorClass}
        />
      );

    case "phone":
      return (
        <Input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={field.placeholder || "+1 (555) 000-0000"}
          className={errorClass}
        />
      );

    default:
      return (
        <Input
          type={field.type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={field.placeholder}
          className={errorClass}
        />
      );
  }
};

const ProgressBar = ({
  steps,
  currentStep,
}: {
  steps: FormStep[];
  currentStep: number;
}) => (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-3">
      {steps.map((step, i) => (
        <div
          key={step.id}
          className="flex items-center flex-1 last:flex-initial"
        >
          <div className="flex flex-col items-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-mono font-bold transition-all ${
                i < currentStep
                  ? "bg-primary text-primary-foreground"
                  : i === currentStep
                    ? "border-2 border-primary text-primary bg-primary/10"
                    : "border border-border text-muted-foreground bg-surface-2"
              }`}
            >
              {i < currentStep ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span
              className={`text-[10px] font-mono mt-1.5 whitespace-nowrap ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}
            >
              {step.title}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 mx-2 mt-[-14px]">
              <div className="h-px bg-border relative">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-primary"
                  initial={false}
                  animate={{ width: i < currentStep ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  style={{ height: 1 }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

const FormPreview = ({
  fields,
  steps,
  multiStepEnabled,
}: {
  fields: FormField[];
  steps: FormStep[];
  multiStepEnabled: boolean;
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const stepFields = multiStepEnabled
    ? fields.filter((f) => f.step === currentStep)
    : fields;

  const visibleFields = stepFields.filter((f) =>
    evaluateCondition(f.condition, values),
  );

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleChange = useCallback(
    (fieldId: string, value: string) => {
      setValues((prev) => ({ ...prev, [fieldId]: value }));
      const field = fields.find((f) => f.id === fieldId);
      if (field && touched[fieldId]) {
        setErrors((prev) => ({
          ...prev,
          [fieldId]: validateField(field, value),
        }));
      }
    },
    [fields, touched],
  );

  const handleBlur = useCallback(
    (fieldId: string) => {
      setTouched((prev) => ({ ...prev, [fieldId]: true }));
      const field = fields.find((f) => f.id === fieldId);
      if (field) {
        setErrors((prev) => ({
          ...prev,
          [fieldId]: validateField(field, values[fieldId] || ""),
        }));
      }
    },
    [fields, values],
  );

  const validateStep = useCallback(() => {
    let hasErrors = false;
    const newErrors: Record<string, string | null> = {};
    const newTouched: Record<string, boolean> = {};
    visibleFields.forEach((field) => {
      newTouched[field.id] = true;
      const error = validateField(field, values[field.id] || "");
      newErrors[field.id] = error;
      if (error) hasErrors = true;
    });
    setTouched((prev) => ({ ...prev, ...newTouched }));
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return !hasErrors;
  }, [visibleFields, values]);

  const handleNext = () => {
    if (validateStep()) {
      if (multiStepEnabled && !isLastStep) {
        setCurrentStep((s) => s + 1);
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-surface-1">
        <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Preview
        </h3>
        {multiStepEnabled && (
          <span className="text-[11px] font-mono text-muted-foreground">
            {currentStep + 1} / {steps.length}
          </span>
        )}
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        {fields.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground font-mono">
              Add fields to see preview
            </p>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            {multiStepEnabled && steps.length > 1 && (
              <ProgressBar steps={steps} currentStep={currentStep} />
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {multiStepEnabled && (
                  <h4 className="text-sm font-semibold text-foreground mb-4">
                    {steps[currentStep]?.title}
                  </h4>
                )}

                {visibleFields.length === 0 && multiStepEnabled ? (
                  <p className="text-xs text-muted-foreground font-mono py-8 text-center">
                    No fields in this step yet
                  </p>
                ) : (
                  visibleFields.map((field, i) => {
                    const fieldError = errors[field.id];
                    const fieldTouched = touched[field.id];
                    const isLayout =
                      field.type === "heading" ||
                      field.type === "separator" ||
                      field.type === "paragraph" ||
                      field.type === "hidden";
                    return (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={isLayout ? "" : "space-y-1.5"}
                      >
                        {!isLayout &&
                          field.type !== "checkbox" &&
                          field.type !== "toggle" && (
                            <Label className="text-sm font-medium text-foreground flex items-center gap-1">
                              {field.label}
                              {field.required && (
                                <span className="text-primary text-xs">*</span>
                              )}
                            </Label>
                          )}
                        <FieldInput
                          field={field}
                          value={values[field.id] || ""}
                          error={fieldError || null}
                          touched={!!fieldTouched}
                          onChange={(val) => handleChange(field.id, val)}
                          onBlur={() => handleBlur(field.id)}
                        />
                        {!isLayout && (
                          <AnimatePresence>
                            {fieldTouched && fieldError && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex items-center gap-1.5"
                              >
                                <AlertCircle className="w-3 h-3 text-destructive flex-shrink-0" />
                                <span className="text-xs text-destructive">
                                  {fieldError}
                                </span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex gap-3">
              {multiStepEnabled && !isFirstStep && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
                  className="gap-1.5"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="flex-1 glow hover:glow-strong transition-shadow gap-1.5"
              >
                {multiStepEnabled && !isLastStep ? (
                  <>
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormPreview;

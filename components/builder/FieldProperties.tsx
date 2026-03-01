"use client";

import { FormField, FieldCondition, ValidationRule, VALIDATION_OPTIONS, VALIDATION_LABELS, CONDITION_OPERATORS } from "@/types/form";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ShieldCheck, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ValidationRuleEditor = ({
  rule,
  index,
  onChange,
  onRemove,
}: {
  rule: ValidationRule;
  index: number;
  onChange: (index: number, updates: Partial<ValidationRule>) => void;
  onRemove: (index: number) => void;
}) => {
  const needsValue = ["min", "max", "pattern"].includes(rule.type);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="rounded-lg border border-border/60 bg-surface-2/50 p-2.5 space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-primary/60" />
          <span className="text-[10px] font-mono text-primary/80 font-medium">
            {VALIDATION_LABELS[rule.type]}
          </span>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onRemove(index)} className="h-5 w-5 text-muted-foreground/40 hover:text-destructive">
          <X className="w-3 h-3" />
        </Button>
      </div>

      {needsValue && (
        <Input
          type={rule.type === "pattern" ? "text" : "number"}
          value={rule.value ?? ""}
          onChange={(e) => onChange(index, { value: rule.type === "pattern" ? e.target.value : Number(e.target.value) })}
          placeholder={rule.type === "pattern" ? "^[A-Za-z]+$" : "0"}
          className="text-xs font-mono h-7"
        />
      )}

      <Input
        type="text"
        value={rule.message}
        onChange={(e) => onChange(index, { message: e.target.value })}
        placeholder="Error message..."
        className="text-xs h-7"
      />
    </motion.div>
  );
};

const FieldProperties = ({
  field,
  onChange,
  fullWidth,
  allFields,
}: {
  field: FormField | null;
  onChange: (id: string, updates: Partial<FormField>) => void;
  fullWidth?: boolean;
  allFields?: FormField[];
}) => {
  if (!field) {
    return (
      <div className={`${fullWidth ? "w-full" : "w-64"} border-l border-border bg-background p-6 flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center mx-auto mb-3">
            <span className="text-muted-foreground/30 text-lg">⚙</span>
          </div>
          <p className="text-xs text-muted-foreground/40 font-medium">
            Select a field to edit
          </p>
        </div>
      </div>
    );
  }

  const availableValidations = VALIDATION_OPTIONS[field.type] || [];
  const currentRules = field.validation || [];
  const usedTypes = currentRules.map((r) => r.type);
  const addableRules = availableValidations.filter((t) => !usedTypes.includes(t) && t !== "required");

  const handleAddRule = (type: ValidationRule["type"]) => {
    onChange(field.id, { validation: [...currentRules, { type, message: "", value: type === "min" ? 1 : type === "max" ? 100 : undefined }] });
  };

  const handleUpdateRule = (index: number, updates: Partial<ValidationRule>) => {
    onChange(field.id, { validation: currentRules.map((r, i) => (i === index ? { ...r, ...updates } : r)) });
  };

  const handleRemoveRule = (index: number) => {
    onChange(field.id, { validation: currentRules.filter((_, i) => i !== index) });
  };

  return (
    <motion.div
      key={field.id}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      className={`${fullWidth ? "w-full" : "w-64"} border-l border-border bg-background p-4 overflow-y-auto`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Properties
        </h3>
        <Badge variant="secondary" className="text-[9px] font-mono bg-primary/8 text-primary/70 border-0 uppercase">
          {field.type}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-[11px] font-medium text-muted-foreground/70">Label</Label>
          <Input value={field.label} onChange={(e) => onChange(field.id, { label: e.target.value })} className="h-8 text-[13px]" />
        </div>

        <div className="space-y-1">
          <Label className="text-[11px] font-medium text-muted-foreground/70">Placeholder</Label>
          <Input value={field.placeholder || ""} onChange={(e) => onChange(field.id, { placeholder: e.target.value })} className="h-8 text-[13px]" />
        </div>

        <div className="flex items-center justify-between py-1">
          <Label className="text-[11px] font-medium text-muted-foreground/70">Required</Label>
          <Switch checked={!!field.required} onCheckedChange={(v) => onChange(field.id, { required: v })} />
        </div>

        {(field.type === "select" || field.type === "radio") && (
          <div className="space-y-1">
            <Label className="text-[11px] font-medium text-muted-foreground/70">Options</Label>
            <Textarea
              value={(field.options || []).join("\n")}
              onChange={(e) => onChange(field.id, { options: e.target.value.split("\n") })}
              rows={3}
              className="font-mono text-xs resize-none"
              placeholder="One per line"
            />
          </div>
        )}

        <Separator className="my-1" />

        {/* Validation */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              Validation
            </span>
            {currentRules.length > 0 && (
              <Badge variant="secondary" className="text-[9px] font-mono bg-primary/8 text-primary/70 border-0">
                {currentRules.length}
              </Badge>
            )}
          </div>

          <div className="space-y-1.5 mb-2">
            <AnimatePresence>
              {currentRules.map((rule, i) => (
                <ValidationRuleEditor key={`${rule.type}-${i}`} rule={rule} index={i} onChange={handleUpdateRule} onRemove={handleRemoveRule} />
              ))}
            </AnimatePresence>
          </div>

          {addableRules.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {addableRules.map((type) => (
                <Button key={type} variant="outline" size="sm" onClick={() => handleAddRule(type)} className="h-6 px-2 text-[9px] font-mono border-dashed gap-1 text-muted-foreground/60">
                  <Plus className="w-2.5 h-2.5" />
                  {VALIDATION_LABELS[type]}
                </Button>
              ))}
            </div>
          )}

          {availableValidations.length <= 1 && (
            <p className="text-[10px] text-muted-foreground/30">No extra validation available</p>
          )}
        </div>

        <Separator className="my-1" />

        {/* Conditional Visibility */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              Visibility
            </span>
            {field.condition?.fieldId && (
              <Badge variant="secondary" className="text-[9px] font-mono bg-accent/20 text-accent border-0">
                Conditional
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between py-1 mb-2">
            <Label className="text-[11px] font-medium text-muted-foreground/70 flex items-center gap-1.5">
              <Eye className="w-3 h-3" />
              Show conditionally
            </Label>
            <Switch
              checked={!!field.condition}
              onCheckedChange={(checked) => {
                if (checked) {
                  onChange(field.id, { condition: { fieldId: "", operator: "not_empty" } });
                } else {
                  onChange(field.id, { condition: undefined });
                }
              }}
            />
          </div>

          {field.condition && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 rounded-lg border border-border/60 bg-surface-2/50 p-2.5"
            >
              <div className="space-y-1">
                <Label className="text-[10px] font-medium text-muted-foreground/60">When field</Label>
                <Select
                  value={field.condition.fieldId || ""}
                  onValueChange={(v) => onChange(field.id, { condition: { ...field.condition!, fieldId: v } })}
                >
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue placeholder="Select a field..." />
                  </SelectTrigger>
                  <SelectContent>
                    {(allFields || [])
                      .filter((f) => f.id !== field.id && f.type !== "heading" && f.type !== "separator")
                      .map((f) => (
                        <SelectItem key={f.id} value={f.id} className="text-xs">
                          {f.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-[10px] font-medium text-muted-foreground/60">Operator</Label>
                <Select
                  value={field.condition.operator}
                  onValueChange={(v) => onChange(field.id, { condition: { ...field.condition!, operator: v as FieldCondition["operator"] } })}
                >
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CONDITION_OPERATORS.map((op) => (
                      <SelectItem key={op.value} value={op.value} className="text-xs">
                        {op.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {!["not_empty", "empty"].includes(field.condition.operator) && (
                <div className="space-y-1">
                  <Label className="text-[10px] font-medium text-muted-foreground/60">Value</Label>
                  <Input
                    value={field.condition.value || ""}
                    onChange={(e) => onChange(field.id, { condition: { ...field.condition!, value: e.target.value } })}
                    className="h-7 text-xs font-mono"
                    placeholder="Expected value..."
                  />
                </div>
              )}
            </motion.div>
          )}
        </div>

        <Separator className="my-1" />

        <div className="text-[10px] font-mono text-muted-foreground/30 truncate">
          {field.id}
        </div>
      </div>
    </motion.div>
  );
};

export default FieldProperties;

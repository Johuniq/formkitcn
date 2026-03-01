"use client";

import { Button } from "@/components/ui/button";
import { FormField, FormStep } from "@/types/form";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Eye, GripVertical, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";

const SortableField = ({
  field,
  onRemove,
  onDuplicate,
  onSelect,
  isSelected,
}: {
  field: FormField;
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, height: 0 }}
      className={`group flex items-center gap-3 px-3 py-3 rounded-lg border transition-all cursor-pointer ${
        isSelected
          ? "border-primary/40 bg-primary/[0.06] shadow-[0_0_0_1px_hsl(217_91%_60%/0.1)]"
          : "border-border/60 bg-surface-2/50 hover:bg-surface-2 hover:border-border"
      } ${isDragging ? "opacity-40 z-50" : ""}`}
      onClick={() => onSelect(field.id)}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-0.5 -ml-1"
      >
        <GripVertical className="w-3.5 h-3.5 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-foreground truncate">
            {field.label}
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-md bg-surface-3/80 text-muted-foreground/70 uppercase tracking-wide">
            {field.type}
          </span>
          {field.required && (
            <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
          )}
          {field.condition?.fieldId && (
            <Eye className="w-3 h-3 text-accent/60 flex-shrink-0" />
          )}
        </div>
      </div>

      <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate(field.id);
          }}
          className="p-1.5 rounded-md hover:bg-surface-3 text-muted-foreground/50 hover:text-foreground transition-colors"
          title="Duplicate"
        >
          <Copy className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(field.id);
          }}
          className="p-1.5 rounded-md hover:bg-surface-3 text-muted-foreground/50 hover:text-foreground transition-colors"
        >
          <Pencil className="w-3 h-3" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(field.id);
          }}
          className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground/50 hover:text-destructive transition-colors"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
};

const FormCanvas = ({
  fields,
  onRemove,
  onDuplicate,
  selectedId,
  onSelect,
  multiStepEnabled,
  steps,
  activeStepIndex,
  onStepChange,
  onAddStep,
  onRemoveStep,
  onRenameStep,
  editingStepId,
  onEditingStepChange,
}: {
  fields: FormField[];
  onRemove: (id: string) => void;
  onDuplicate: (id: string) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
  multiStepEnabled: boolean;
  steps: FormStep[];
  activeStepIndex: number;
  onStepChange: (index: number) => void;
  onAddStep: () => void;
  onRemoveStep: (index: number) => void;
  onRenameStep: (index: number, title: string) => void;
  editingStepId: string | null;
  onEditingStepChange: (id: string | null) => void;
}) => {
  const { isOver, setNodeRef } = useDroppable({ id: "canvas" });
  const [renameValue, setRenameValue] = useState("");

  const startRename = (step: FormStep) => {
    onEditingStepChange(step.id);
    setRenameValue(step.title);
  };

  const commitRename = (index: number) => {
    if (renameValue.trim()) onRenameStep(index, renameValue.trim());
    onEditingStepChange(null);
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Canvas header */}
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-border bg-background">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Canvas
        </span>
        <span className="text-[10px] font-mono text-muted-foreground/40">
          {fields.length} field{fields.length !== 1 ? "s" : ""}
          {multiStepEnabled && ` · step ${activeStepIndex + 1}/${steps.length}`}
        </span>
      </div>

      {/* Step tabs */}
      {multiStepEnabled && (
        <div className="flex items-center gap-1 px-3 py-1.5 border-b border-border bg-background overflow-x-auto">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center">
              {editingStepId === step.id ? (
                <input
                  autoFocus
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onBlur={() => commitRename(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitRename(i);
                    if (e.key === "Escape") onEditingStepChange(null);
                  }}
                  className="px-2 py-1 rounded-md text-xs font-mono bg-surface-2 border border-primary/40 text-foreground w-24 focus:outline-none"
                />
              ) : (
                <button
                  onClick={() => onStepChange(i)}
                  onDoubleClick={() => startRename(step)}
                  className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeStepIndex === i
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-2"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                      activeStepIndex === i
                        ? "border-primary/40 bg-primary/10"
                        : "border-border"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {step.title}
                  {steps.length > 1 && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveStep(i);
                      }}
                      className="ml-0.5 opacity-0 group-hover:opacity-100 hover:text-destructive transition-all"
                    >
                      <X className="w-3 h-3" />
                    </span>
                  )}
                </button>
              )}
            </div>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={onAddStep}
            className="h-7 w-7 text-muted-foreground/40 hover:text-primary"
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>
        </div>
      )}

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-5 overflow-y-auto transition-colors ${isOver ? "drop-zone-active" : ""}`}
      >
        {fields.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-14 h-14 rounded-2xl border border-dashed border-border/80 flex items-center justify-center mb-3">
              <Plus className="w-5 h-5 text-muted-foreground/30" />
            </div>
            <p className="text-sm text-muted-foreground/50 font-medium">
              Drop fields here
            </p>
            {multiStepEnabled && (
              <p className="text-[11px] text-muted-foreground/30 mt-1">
                Adding to {steps[activeStepIndex]?.title}
              </p>
            )}
          </div>
        ) : (
          <SortableContext
            items={fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-1.5 max-w-lg mx-auto">
              <AnimatePresence>
                {fields.map((field) => (
                  <SortableField
                    key={field.id}
                    field={field}
                    onRemove={onRemove}
                    onDuplicate={onDuplicate}
                    onSelect={onSelect}
                    isSelected={selectedId === field.id}
                  />
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
};

export default FormCanvas;

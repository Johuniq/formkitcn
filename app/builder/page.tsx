"use client";

import FieldPalette from "@/components/builder/FieldPalette";
import FieldProperties from "@/components/builder/FieldProperties";
import FormCanvas from "@/components/builder/FormCanvas";
import FormPreview from "@/components/builder/FormPreview";
import SchemaOutput from "@/components/builder/SchemaOutput";
import TemplateGallery from "@/components/builder/TemplateGallery";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FormTemplate } from "@/data/form-templates";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useUndoRedo } from "@/hooks/use-undo-redo";
import { downloadFile, generateReactComponent } from "@/lib/export-react";
import { FieldType, FormField, FormStep } from "@/types/form";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Code2,
  Columns3,
  Download,
  Eye,
  Layers,
  LayoutTemplate,
  ListOrdered,
  PanelLeft,
  Redo2,
  Settings2,
  Undo2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type RightPanel = "preview" | "schema";
type MobilePanel = "palette" | "canvas" | "properties" | "output";

const STORAGE_KEY = "formkitcn-draft";
const AUTOSAVE_DELAY = 1500;

interface FormState {
  fields: FormField[];
  steps: FormStep[];
  multiStepEnabled: boolean;
}

interface DraftState extends FormState {
  savedAt: number;
}

let fieldCounter = 0;

const createField = (type: FieldType, step: number): FormField => {
  fieldCounter++;
  const labels: Record<FieldType, string> = {
    text: "Text Field",
    email: "Email",
    password: "Password",
    number: "Number",
    textarea: "Message",
    select: "Dropdown",
    checkbox: "Checkbox",
    radio: "Radio Group",
    date: "Date",
    datetime: "Date & Time",
    file: "File Upload",
    toggle: "Toggle",
    url: "URL",
    phone: "Phone",
    slider: "Slider",
    color: "Color Picker",
    time: "Time",
    rating: "Rating",
    hidden: "Hidden Field",
    heading: "Section Heading",
    paragraph: "Description",
    separator: "Divider",
  };
  return {
    id: `field_${fieldCounter}_${Date.now()}`,
    type,
    label: labels[type] || "Field",
    placeholder: `Enter ${labels[type]?.toLowerCase() || "value"}...`,
    required: false,
    options:
      type === "select" || type === "radio"
        ? ["Option 1", "Option 2", "Option 3"]
        : undefined,
    step,
  };
};

let stepCounter = 0;
const createStep = (): FormStep => {
  stepCounter++;
  return {
    id: `step_${stepCounter}_${Date.now()}`,
    title: `Step ${stepCounter}`,
    fieldIds: [],
  };
};

const loadDraft = (): DraftState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw) as DraftState;
    if (draft.fields?.length > 0 || draft.steps?.length > 1) return draft;
    return null;
  } catch {
    return null;
  }
};

const saveDraft = (state: DraftState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

const defaultStep = createStep();

const BuilderPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [initialized, setInitialized] = useState(false);

  const draft = useRef(loadDraft());
  const hasDraft = !!draft.current;
  const initialState: FormState = draft.current
    ? {
        fields: draft.current.fields,
        steps: draft.current.steps,
        multiStepEnabled: draft.current.multiStepEnabled,
      }
    : { fields: [], steps: [defaultStep], multiStepEnabled: false };

  const {
    state: formState,
    set: setFormState,
    undo,
    redo,
    canUndo,
    canRedo,
    resetHistory,
  } = useUndoRedo<FormState>(initialState);
  const { fields, steps, multiStepEnabled } = formState;

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [rightPanel, setRightPanel] = useState<RightPanel>("preview");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const [showTemplates, setShowTemplates] = useState(!hasDraft);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>("canvas");

  useEffect(() => {
    if (draft.current && !initialized) {
      fieldCounter = Math.max(
        fieldCounter,
        draft.current.fields.reduce((m, f) => {
          const n = f.id.match(/^field_(\d+)/);
          return n ? Math.max(m, parseInt(n[1])) : m;
        }, 0),
      );
      stepCounter = Math.max(
        stepCounter,
        draft.current.steps.reduce((m, s) => {
          const n = s.id.match(/^step_(\d+)/);
          return n ? Math.max(m, parseInt(n[1])) : m;
        }, 0),
      );
      const ago = Date.now() - draft.current.savedAt;
      const agoText =
        ago < 60000
          ? "just now"
          : ago < 3600000
            ? `${Math.floor(ago / 60000)}m ago`
            : `${Math.floor(ago / 3600000)}h ago`;
      toast({
        title: "Draft restored",
        description: `${draft.current.fields.length} field${draft.current.fields.length !== 1 ? "s" : ""} recovered (${agoText}).`,
      });
    }
    setInitialized(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    if (!initialized) return;
    setSaveStatus("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveDraft({ ...formState, savedAt: Date.now() });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, AUTOSAVE_DELAY);
    return () => clearTimeout(saveTimer.current);
  }, [formState, initialized]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod || e.key.toLowerCase() !== "z") return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      e.preventDefault();
      e.shiftKey ? redo() : undo();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const currentStepFields = multiStepEnabled
    ? fields.filter((f) => f.step === activeStepIndex)
    : fields;
  const selectedField = fields.find((f) => f.id === selectedId) || null;

  const updateFields = useCallback(
    (updater: (fields: FormField[]) => FormField[]) => {
      setFormState((prev) => ({ ...prev, fields: updater(prev.fields) }));
    },
    [setFormState],
  );

  const updateSteps = useCallback(
    (updater: (steps: FormStep[]) => FormStep[]) => {
      setFormState((prev) => ({ ...prev, steps: updater(prev.steps) }));
    },
    [setFormState],
  );

  const handleDragStart = useCallback(
    (e: DragStartEvent) => setActiveId(String(e.active.id)),
    [],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null);
      const { active, over } = event;
      if (!over) return;
      if (String(active.id).startsWith("palette-")) {
        const type = active.data.current?.type as FieldType;
        if (type) {
          const f = createField(type, activeStepIndex);
          updateFields((p) => [...p, f]);
          setSelectedId(f.id);
        }
        return;
      }
      if (active.id !== over.id) {
        updateFields((prev) => {
          const oi = prev.findIndex((f) => f.id === active.id),
            ni = prev.findIndex((f) => f.id === over.id);
          return oi === -1 || ni === -1 ? prev : arrayMove(prev, oi, ni);
        });
      }
    },
    [activeStepIndex, updateFields],
  );

  const handleRemove = useCallback(
    (id: string) => {
      updateFields((p) => p.filter((f) => f.id !== id));
      if (selectedId === id) setSelectedId(null);
    },
    [selectedId, updateFields],
  );
  const handleDuplicate = useCallback(
    (id: string) => {
      updateFields((prev) => {
        const idx = prev.findIndex((f) => f.id === id);
        if (idx === -1) return prev;
        const source = prev[idx];
        fieldCounter++;
        const clone = {
          ...source,
          id: `field_${fieldCounter}_${Date.now()}`,
          label: `${source.label} (copy)`,
        };
        const next = [...prev];
        next.splice(idx + 1, 0, clone);
        return next;
      });
    },
    [updateFields],
  );
  const handleFieldChange = useCallback(
    (id: string, u: Partial<FormField>) => {
      updateFields((p) => p.map((f) => (f.id === id ? { ...f, ...u } : f)));
    },
    [updateFields],
  );
  const handleAddStep = useCallback(() => {
    const s = createStep();
    updateSteps((p) => [...p, s]);
    setActiveStepIndex(steps.length);
  }, [updateSteps, steps.length]);

  const handleRemoveStep = useCallback(
    (index: number) => {
      if (steps.length <= 1) return;
      setFormState((prev) => ({
        ...prev,
        steps: prev.steps.filter((_, i) => i !== index),
        fields: prev.fields
          .filter((f) => f.step !== index)
          .map((f) => ({
            ...f,
            step: f.step !== undefined && f.step > index ? f.step - 1 : f.step,
          })),
      }));
      setActiveStepIndex((p) => Math.min(p, steps.length - 2));
    },
    [steps.length, setFormState],
  );

  const handleRenameStep = useCallback(
    (i: number, t: string) => {
      updateSteps((p) => p.map((s, j) => (j === i ? { ...s, title: t } : s)));
    },
    [updateSteps],
  );

  const toggleMultiStep = useCallback(() => {
    setFormState((prev) => {
      const e = !prev.multiStepEnabled;
      return {
        ...prev,
        multiStepEnabled: e,
        fields: e ? prev.fields.map((f) => ({ ...f, step: 0 })) : prev.fields,
        steps: e && prev.steps.length === 0 ? [createStep()] : prev.steps,
      };
    });
    setActiveStepIndex(0);
  }, [setFormState]);

  const handleClearDraft = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    stepCounter = 0;
    fieldCounter = 0;
    resetHistory({
      fields: [],
      steps: [createStep()],
      multiStepEnabled: false,
    });
    setActiveStepIndex(0);
    setSelectedId(null);
    toast({ title: "Draft cleared", description: "Started fresh." });
  }, [toast, resetHistory]);

  const handleLoadTemplate = useCallback(
    (template: FormTemplate) => {
      const ts = Date.now();
      const nf = template.fields.map((f, i) => ({
        ...f,
        id: `field_${++fieldCounter}_${ts + i}`,
      }));
      const ns = template.steps.map((s, i) => ({
        ...s,
        id: `step_${++stepCounter}_${ts + i}`,
      }));
      resetHistory({
        fields: nf,
        steps: ns,
        multiStepEnabled: template.multiStepEnabled,
      });
      setActiveStepIndex(0);
      setSelectedId(null);
      setShowTemplates(false);
      toast({
        title: `"${template.name}" loaded`,
        description: `${nf.length} fields ready.`,
      });
    },
    [resetHistory, toast],
  );

  // Auto-switch to properties on mobile when a field is selected
  useEffect(() => {
    if (isMobile && selectedId && mobilePanel === "canvas") {
      setMobilePanel("properties");
    }
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTapAdd = useCallback(
    (type: FieldType) => {
      const f = createField(type, activeStepIndex);
      updateFields((p) => [...p, f]);
      setSelectedId(f.id);
      setMobilePanel("canvas");
      toast({
        title: `${f.label} added`,
        description: "Tap to edit properties.",
      });
    },
    [activeStepIndex, updateFields, toast],
  );

  const mobileTabs: {
    key: MobilePanel;
    icon: React.FC<{ className?: string }>;
    label: string;
  }[] = [
    { key: "palette", icon: PanelLeft, label: "Fields" },
    { key: "canvas", icon: Columns3, label: "Canvas" },
    { key: "properties", icon: Settings2, label: "Props" },
    { key: "output", icon: Eye, label: "Preview" },
  ];

  return (
    <div className="h-screen flex flex-col bg-background relative">
      {/* Header */}
      <header className="flex items-center justify-between h-11 px-2 md:px-3 border-b border-border bg-background shrink-0">
        <div className="flex items-center gap-1.5 md:gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => router.push("/")}
                className="p-1.5 rounded-md hover:bg-surface-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              Home
            </TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="h-4 hidden md:block" />

          <div className="flex items-center gap-1.5 hidden md:flex">
            <Layers className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-[13px] font-semibold text-foreground">
              formkitcn
            </span>
          </div>

          <Separator orientation="vertical" className="h-4 hidden md:block" />

          {/* Save indicator */}
          <div className="flex items-center gap-1">
            <div
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                saveStatus === "saving"
                  ? "bg-accent animate-pulse-glow"
                  : saveStatus === "saved"
                    ? "bg-primary"
                    : "bg-muted-foreground/20"
              }`}
            />
            <span
              className={`text-[10px] font-mono transition-colors hidden sm:inline ${
                saveStatus === "saving"
                  ? "text-accent"
                  : saveStatus === "saved"
                    ? "text-primary/70"
                    : "text-muted-foreground/30"
              }`}
            >
              {saveStatus === "saving"
                ? "saving"
                : saveStatus === "saved"
                  ? "saved"
                  : ""}
            </span>
          </div>

          {/* Undo/Redo */}
          <div className="flex items-center gap-0.5 ml-1">
            <button
              onClick={undo}
              disabled={!canUndo}
              className={`p-1 rounded-md transition-colors ${canUndo ? "text-muted-foreground/60 hover:text-foreground hover:bg-surface-2" : "text-muted-foreground/15 cursor-not-allowed"}`}
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo}
              className={`p-1 rounded-md transition-colors ${canRedo ? "text-muted-foreground/60 hover:text-foreground hover:bg-surface-2" : "text-muted-foreground/15 cursor-not-allowed"}`}
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-1.5">
          <button
            onClick={handleClearDraft}
            className="text-[11px] font-mono text-muted-foreground/40 hover:text-destructive transition-colors px-2 py-1 rounded-md hover:bg-destructive/5"
          >
            Clear
          </button>

          <button
            onClick={() => {
              if (fields.length === 0) {
                toast({
                  title: "Nothing to export",
                  description: "Add fields first.",
                });
                return;
              }
              const code = generateReactComponent(
                fields,
                steps,
                multiStepEnabled,
              );
              downloadFile(code, "GeneratedForm.tsx");
              toast({
                title: "Exported!",
                description: "GeneratedForm.tsx downloaded.",
              });
            }}
            className="flex items-center gap-1.5 px-2 md:px-2.5 py-1 rounded-md text-[11px] font-medium text-primary/70 hover:text-primary hover:bg-primary/10 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={() => setShowTemplates(true)}
            className="flex items-center gap-1.5 px-2 md:px-2.5 py-1 rounded-md text-[11px] font-medium text-muted-foreground/60 hover:text-foreground hover:bg-surface-2 transition-all"
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Templates</span>
          </button>

          <Separator orientation="vertical" className="h-4 hidden sm:block" />

          <button
            onClick={toggleMultiStep}
            className={`flex items-center gap-1.5 px-2 md:px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              multiStepEnabled
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground/60 hover:text-foreground hover:bg-surface-2"
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Steps</span>
          </button>

          {/* Desktop-only: Preview/Schema toggle */}
          {!isMobile && (
            <>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center bg-surface-2/50 rounded-lg p-0.5">
                {[
                  { key: "preview" as RightPanel, icon: Eye, label: "Preview" },
                  { key: "schema" as RightPanel, icon: Code2, label: "Schema" },
                ].map(({ key, icon: Icon, label }) => (
                  <button
                    key={key}
                    onClick={() => setRightPanel(key)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
                      rightPanel === key
                        ? "bg-surface-3 text-foreground shadow-sm"
                        : "text-muted-foreground/50 hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main content */}
      {isMobile ? (
        /* ─── Mobile layout: single panel at a time ─── */
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobilePanel}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
                className="h-full"
              >
                {mobilePanel === "palette" && (
                  <div className="h-full">
                    <FieldPalette fullWidth onTapAdd={handleTapAdd} />
                  </div>
                )}
                {mobilePanel === "canvas" && (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  >
                    <FormCanvas
                      fields={currentStepFields}
                      onRemove={handleRemove}
                      onDuplicate={handleDuplicate}
                      selectedId={selectedId}
                      onSelect={setSelectedId}
                      multiStepEnabled={multiStepEnabled}
                      steps={steps}
                      activeStepIndex={activeStepIndex}
                      onStepChange={setActiveStepIndex}
                      onAddStep={handleAddStep}
                      onRemoveStep={handleRemoveStep}
                      onRenameStep={handleRenameStep}
                      editingStepId={editingStepId}
                      onEditingStepChange={setEditingStepId}
                    />
                    <DragOverlay>
                      {activeId && activeId.startsWith("palette-") && (
                        <div className="px-3 py-2 rounded-lg border border-primary/30 bg-surface-2 text-sm text-foreground glow font-medium shadow-lg">
                          {activeId.replace("palette-", "")}
                        </div>
                      )}
                    </DragOverlay>
                  </DndContext>
                )}
                {mobilePanel === "properties" && (
                  <div className="h-full overflow-y-auto">
                    <FieldProperties
                      field={selectedField}
                      onChange={handleFieldChange}
                      fullWidth
                      allFields={fields}
                    />
                  </div>
                )}
                {mobilePanel === "output" && (
                  <div className="h-full flex flex-col">
                    {/* Mini toggle for preview/schema on mobile */}
                    <div className="flex items-center gap-1 p-2 border-b border-border bg-background">
                      {[
                        {
                          key: "preview" as RightPanel,
                          icon: Eye,
                          label: "Preview",
                        },
                        {
                          key: "schema" as RightPanel,
                          icon: Code2,
                          label: "Schema",
                        },
                      ].map(({ key, icon: Icon, label }) => (
                        <button
                          key={key}
                          onClick={() => setRightPanel(key)}
                          className={`flex-1 flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all ${
                            rightPanel === key
                              ? "bg-surface-3 text-foreground shadow-sm"
                              : "text-muted-foreground/50 hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {rightPanel === "preview" ? (
                        <FormPreview
                          fields={fields}
                          steps={steps}
                          multiStepEnabled={multiStepEnabled}
                        />
                      ) : (
                        <SchemaOutput
                          fields={fields}
                          steps={steps}
                          multiStepEnabled={multiStepEnabled}
                        />
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom tab bar */}
          <nav className="flex items-center border-t border-border bg-background shrink-0 safe-area-bottom">
            {mobileTabs.map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setMobilePanel(key)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2 transition-colors ${
                  mobilePanel === key
                    ? "text-primary"
                    : "text-muted-foreground/50 hover:text-muted-foreground"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] font-medium">{label}</span>
                {mobilePanel === key && (
                  <motion.div
                    layoutId="mobile-tab-indicator"
                    className="w-4 h-0.5 rounded-full bg-primary mt-0.5"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>
      ) : (
        /* ─── Desktop layout: side-by-side panels ─── */
        <div className="flex-1 flex overflow-hidden">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <FieldPalette />
            <FormCanvas
              fields={currentStepFields}
              onRemove={handleRemove}
              onDuplicate={handleDuplicate}
              selectedId={selectedId}
              onSelect={setSelectedId}
              multiStepEnabled={multiStepEnabled}
              steps={steps}
              activeStepIndex={activeStepIndex}
              onStepChange={setActiveStepIndex}
              onAddStep={handleAddStep}
              onRemoveStep={handleRemoveStep}
              onRenameStep={handleRenameStep}
              editingStepId={editingStepId}
              onEditingStepChange={setEditingStepId}
            />
            <DragOverlay>
              {activeId && activeId.startsWith("palette-") && (
                <div className="px-3 py-2 rounded-lg border border-primary/30 bg-surface-2 text-sm text-foreground glow font-medium shadow-lg">
                  {activeId.replace("palette-", "")}
                </div>
              )}
            </DragOverlay>
          </DndContext>

          <FieldProperties
            field={selectedField}
            onChange={handleFieldChange}
            allFields={fields}
          />

          <div className="border-l border-border w-[360px] flex flex-col bg-background">
            <motion.div
              key={rightPanel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col"
            >
              {rightPanel === "preview" ? (
                <FormPreview
                  fields={fields}
                  steps={steps}
                  multiStepEnabled={multiStepEnabled}
                />
              ) : (
                <SchemaOutput
                  fields={fields}
                  steps={steps}
                  multiStepEnabled={multiStepEnabled}
                />
              )}
            </motion.div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showTemplates && (
          <TemplateGallery
            onSelect={handleLoadTemplate}
            onClose={() => setShowTemplates(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BuilderPage;

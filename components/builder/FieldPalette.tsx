"use client";

import { useDraggable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import {
  Type, Mail, Lock, Hash, AlignLeft, ChevronDown,
  CheckSquare, Circle, Calendar, Upload, ToggleLeft, GripVertical, Plus,
  Phone, Link, Clock, SlidersHorizontal, Palette, Heading, Minus,
  CalendarClock, Star, EyeOff, FileText,
} from "lucide-react";
import { FieldType, FIELD_TYPES } from "@/types/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Type, Mail, Lock, Hash, AlignLeft, ChevronDown,
  CheckSquare, Circle, Calendar, Upload, ToggleLeft,
  Phone, Link, Clock, SlidersHorizontal, Palette, Heading, Minus,
  CalendarClock, Star, EyeOff, FileText,
};

const DraggableField = ({ type, label, icon }: { type: FieldType; label: string; icon: string }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type, fromPalette: true },
  });

  const Icon = iconMap[icon];
  const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          className={`drag-field group flex items-center gap-2.5 px-3 py-2 rounded-lg border border-transparent bg-transparent hover:bg-surface-2 hover:border-border transition-all text-sm ${
            isDragging ? "opacity-40 scale-95" : ""
          }`}
        >
          <div className="w-7 h-7 rounded-md bg-primary/8 group-hover:bg-primary/12 flex items-center justify-center transition-colors flex-shrink-0">
            {Icon && <Icon className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary transition-colors" />}
          </div>
          <span className="text-foreground/80 group-hover:text-foreground font-medium text-[13px] transition-colors">{label}</span>
          <GripVertical className="w-3 h-3 text-muted-foreground/0 group-hover:text-muted-foreground/40 ml-auto transition-colors" />
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" className="text-xs font-mono">
        Drag to add {label.toLowerCase()}
      </TooltipContent>
    </Tooltip>
  );
};

const TappableField = ({ type, label, icon, onTap }: { type: FieldType; label: string; icon: string; onTap: (type: FieldType) => void }) => {
  const Icon = iconMap[icon];

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => onTap(type)}
      className="group flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-border/50 bg-surface-2/30 hover:bg-surface-2 active:bg-primary/10 transition-all text-left"
    >
      <div className="w-9 h-9 rounded-lg bg-primary/10 group-active:bg-primary/20 flex items-center justify-center transition-colors flex-shrink-0">
        {Icon && <Icon className="w-4 h-4 text-primary/80 group-active:text-primary transition-colors" />}
      </div>
      <span className="text-foreground/90 font-medium text-sm flex-1">{label}</span>
      <Plus className="w-4 h-4 text-muted-foreground/30 group-active:text-primary transition-colors" />
    </motion.button>
  );
};

const FieldPalette = ({ fullWidth, onTapAdd }: { fullWidth?: boolean; onTapAdd?: (type: FieldType) => void }) => {
  const isTapMode = fullWidth && onTapAdd;

  return (
    <div className={`${fullWidth ? "w-full" : "w-56"} border-r border-border bg-background flex flex-col h-full`}>
      <div className="px-4 pt-4 pb-2">
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          Components
        </h3>
        {isTapMode && (
          <p className="text-[11px] text-muted-foreground/40 mt-1">
            Tap to add to canvas
          </p>
        )}
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className={isTapMode ? "space-y-1.5 pb-4 px-1" : "space-y-0.5 pb-4"}>
          {FIELD_TYPES.map((field, i) => (
            <motion.div
              key={field.type}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.025 }}
            >
              {isTapMode ? (
                <TappableField {...field} onTap={onTapAdd} />
              ) : (
                <DraggableField {...field} />
              )}
            </motion.div>
          ))}
        </div>
      </ScrollArea>
      {!isTapMode && (
        <>
          <Separator />
          <div className="p-3">
            <p className="text-[10px] text-muted-foreground/50 font-mono text-center">
              Drag to canvas
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FieldPalette;

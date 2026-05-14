"use client";

import { Lock, ChevronDown, ChevronUp } from "lucide-react";
import { Stage } from "@/lib/types";

interface StageCardProps {
  stage: Stage;
  isExpanded: boolean;
  onToggle: () => void;
  completedTasks: number;
  totalTasks: number;
  children?: React.ReactNode;
}

export function StageCard({
  stage,
  isExpanded,
  onToggle,
  completedTasks,
  totalTasks,
  children,
}: StageCardProps) {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  if (stage.locked) {
    return (
      <div className="rounded-xl border border-border bg-muted/50 p-6 opacity-60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Lock className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-foreground">{stage.title}</h3>
              <p className="text-sm text-muted-foreground">{stage.subtitle}</p>
            </div>
          </div>
          <span className="text-sm text-muted-foreground">
            {stage.pointsRange[0]}-{stage.pointsRange[1]} pts
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-6 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <span className="font-serif text-lg text-primary">{stage.id}</span>
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground">{stage.title}</h3>
            <p className="text-sm text-muted-foreground">{stage.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-sm font-medium text-foreground">
              {completedTasks}/{totalTasks}
            </span>
            <span className="text-sm text-muted-foreground"> tasks</span>
          </div>
          <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>
      
      {isExpanded && children && (
        <div className="border-t border-border p-6 space-y-6">
          {children}
        </div>
      )}
    </div>
  );
}

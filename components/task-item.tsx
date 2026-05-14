"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  ShieldCheck,
  FileText,
  Video,
  BookOpen,
  Headphones,
  Wrench,
  ExternalLink,
  Link as LinkIcon,
} from "lucide-react";
import { Task, Resource } from "@/lib/types";

interface TaskItemProps {
  task: Task;
  isChecked: boolean;
  notes: string;
  link: string;
  onToggle: () => void;
  onNotesChange: (notes: string) => void;
  onLinkChange: (link: string) => void;
}

const resourceIcons: Record<Resource["type"], React.ElementType> = {
  article: FileText,
  video: Video,
  book: BookOpen,
  podcast: Headphones,
  tool: Wrench,
};

export function TaskItem({
  task,
  isChecked,
  notes,
  link,
  onToggle,
  onNotesChange,
  onLinkChange,
}: TaskItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`rounded-lg border transition-all ${
        isChecked
          ? "border-success/30 bg-success/5"
          : "border-border bg-card"
      }`}
    >
      {/* Task Header */}
      <div className="flex items-start gap-3 p-4">
        <button
          onClick={onToggle}
          className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition-all ${
            isChecked
              ? "border-success bg-success text-white"
              : "border-border hover:border-primary"
          }`}
        >
          {isChecked && <Check className="h-4 w-4" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-sm font-medium ${
                isChecked ? "text-muted-foreground line-through" : "text-foreground"
              }`}
            >
              {task.label}
            </span>
            
            {/* Badges */}
            {task.badges.includes("gate") && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                <ShieldCheck className="h-3 w-3" />
                Gate
              </span>
            )}
            {task.badges.includes("northstar") && (
              <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">
                <Star className="h-3 w-3" />
                North Star
              </span>
            )}
          </div>

          <div className="mt-1 flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              +{task.points} pts
            </span>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              {isExpanded ? "Hide details" : "Show details"}
              {isExpanded ? (
                <ChevronUp className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border px-4 py-4 space-y-4">
          {/* Why, How, Evidence */}
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Why
              </h4>
              <p className="mt-1 text-sm text-foreground">{task.why}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                How
              </h4>
              <p className="mt-1 text-sm text-foreground">{task.how}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Evidence
              </h4>
              <p className="mt-1 text-sm text-foreground">{task.evidence}</p>
            </div>
          </div>

          {/* Resources */}
          {task.resources.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Resources
              </h4>
              <div className="flex flex-wrap gap-2">
                {task.resources.map((resource, index) => {
                  const Icon = resourceIcons[resource.type];
                  return (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {resource.title}
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes and Link */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                <FileText className="h-3 w-3" />
                Your Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => onNotesChange(e.target.value)}
                placeholder="Add your notes here..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[80px] resize-y"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                <LinkIcon className="h-3 w-3" />
                Document Link
              </label>
              <input
                type="url"
                value={link}
                onChange={(e) => onLinkChange(e.target.value)}
                placeholder="https://docs.google.com/..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

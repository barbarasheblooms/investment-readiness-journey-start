"use client";

import { TaskGroup as TaskGroupType } from "@/lib/types";
import { TaskItem } from "./task-item";

interface TaskGroupProps {
  group: TaskGroupType;
  checkedTasks: Record<string, boolean>;
  notes: Record<string, string>;
  links: Record<string, string>;
  onTaskToggle: (taskId: string) => void;
  onNotesChange: (taskId: string, notes: string) => void;
  onLinkChange: (taskId: string, link: string) => void;
}

export function TaskGroup({
  group,
  checkedTasks,
  notes,
  links,
  onTaskToggle,
  onNotesChange,
  onLinkChange,
}: TaskGroupProps) {
  const completedCount = group.tasks.filter((t) => checkedTasks[t.id]).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground">{group.title}</h4>
        <span className="text-sm text-muted-foreground">
          {completedCount}/{group.tasks.length}
        </span>
      </div>
      
      <div className="space-y-2">
        {group.tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            isChecked={checkedTasks[task.id] || false}
            notes={notes[task.id] || ""}
            link={links[task.id] || ""}
            onToggle={() => onTaskToggle(task.id)}
            onNotesChange={(value) => onNotesChange(task.id, value)}
            onLinkChange={(value) => onLinkChange(task.id, value)}
          />
        ))}
      </div>
    </div>
  );
}

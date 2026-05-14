"use client";

import { CheckCircle2 } from "lucide-react";
import { Milestone } from "@/lib/types";

interface MilestoneTrackProps {
  milestones: Milestone[];
  currentScore: number;
}

export function MilestoneTrack({ milestones, currentScore }: MilestoneTrackProps) {
  const getCurrentMilestoneIndex = () => {
    for (let i = milestones.length - 1; i >= 0; i--) {
      if (currentScore >= milestones[i].points) {
        return i;
      }
    }
    return 0;
  };

  const currentIndex = getCurrentMilestoneIndex();

  return (
    <div className="w-full py-4">
      <div className="relative flex items-center justify-between">
        {/* Progress line background */}
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-secondary" />
        
        {/* Progress line filled */}
        <div
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-primary transition-all duration-500"
          style={{
            width: `${(currentIndex / (milestones.length - 1)) * 100}%`,
          }}
        />

        {/* Milestone points */}
        {milestones.map((milestone, index) => {
          const isCompleted = currentScore >= milestone.points;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={milestone.id}
              className="relative z-10 flex flex-col items-center"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground"
                } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-medium">{milestone.points}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium ${
                  isCompleted ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {milestone.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

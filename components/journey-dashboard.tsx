"use client";

import { useState, useMemo } from "react";
import { Cloud, Loader2 } from "lucide-react";
import { useJourney } from "@/hooks/use-journey";
import { STAGES, MILESTONES, MAX_POINTS } from "@/lib/journey-data";
import { ProgressRing } from "./progress-ring";
import { MilestoneTrack } from "./milestone-track";
import { StageCard } from "./stage-card";
import { TaskGroup } from "./task-group";
import { EmailCapture } from "./email-capture";
import { GrowReadyModal } from "./grow-ready-modal";

export function JourneyDashboard() {
  const {
    journey,
    isLoading,
    isSaving,
    showEmailCapture,
    showGrowReady,
    setShowGrowReady,
    initializeJourney,
    toggleTask,
    updateNotes,
    updateLink,
  } = useJourney();

  const [expandedStages, setExpandedStages] = useState<Record<number, boolean>>({
    1: true, // Stage 1 expanded by default
  });

  // Calculate stats for each stage
  const stageStats = useMemo(() => {
    const stats: Record<number, { completed: number; total: number }> = {};
    
    STAGES.forEach((stage) => {
      let completed = 0;
      let total = 0;
      
      stage.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          total++;
          if (journey?.checked[task.id]) {
            completed++;
          }
        });
      });
      
      stats[stage.id] = { completed, total };
    });
    
    return stats;
  }, [journey?.checked]);

  const toggleStage = (stageId: number) => {
    setExpandedStages((prev) => ({
      ...prev,
      [stageId]: !prev[stageId],
    }));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      {showEmailCapture && (
        <EmailCapture onSubmit={initializeJourney} isLoading={isLoading} />
      )}

      {showGrowReady && (
        <GrowReadyModal onClose={() => setShowGrowReady(false)} />
      )}

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-5xl px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-2xl text-foreground">
                  Investment Readiness Journey
                </h1>
                {journey?.name && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Welcome back, {journey.name}
                  </p>
                )}
              </div>
              
              {/* Sync indicator */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Cloud className="h-4 w-4" />
                    Synced
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-5xl px-4 py-8">
          {/* Progress Section */}
          <div className="mb-8 rounded-xl border border-border bg-card p-6">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
              <div className="flex flex-col items-center md:items-start">
                <h2 className="font-serif text-xl text-foreground">
                  Stage 1: Problem Validation Fit
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Complete tasks to unlock the next stage
                </p>
              </div>
              
              <ProgressRing
                score={journey?.score || 0}
                maxScore={MAX_POINTS}
                size={160}
                strokeWidth={10}
              />
            </div>

            {/* Milestones */}
            <div className="mt-6">
              <MilestoneTrack
                milestones={MILESTONES}
                currentScore={journey?.score || 0}
              />
            </div>
          </div>

          {/* Stages */}
          <div className="space-y-4">
            {STAGES.map((stage) => (
              <StageCard
                key={stage.id}
                stage={stage}
                isExpanded={expandedStages[stage.id] || false}
                onToggle={() => toggleStage(stage.id)}
                completedTasks={stageStats[stage.id]?.completed || 0}
                totalTasks={stageStats[stage.id]?.total || 0}
              >
                {stage.groups.map((group) => (
                  <TaskGroup
                    key={group.id}
                    group={group}
                    checkedTasks={journey?.checked || {}}
                    notes={journey?.notes || {}}
                    links={journey?.links || {}}
                    onTaskToggle={toggleTask}
                    onNotesChange={updateNotes}
                    onLinkChange={updateLink}
                  />
                ))}
              </StageCard>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-12 border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Powered by{" "}
              <span className="font-medium text-primary">SheBlooms</span>
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}

"use client";

import { useState, useMemo } from "react";
import { useJourney } from "@/hooks/use-journey";
import { STAGES, MILESTONES, MAX_POINTS, AREAS, RAISE_GATE } from "@/lib/journey-data";
import { EmailCapture } from "./email-capture";
import { GrowReadyModal } from "./grow-ready-modal";
import { ChevronDown } from "lucide-react";

const getMilestoneForScore = (score: number) => {
  for (let i = MILESTONES.length - 1; i >= 0; i--) {
    if (score >= MILESTONES[i].minScore) return MILESTONES[i];
  }
  return MILESTONES[0];
};

export function JourneyDashboard() {
  const {
    journey,
    isLoading,
    showEmailCapture,
    showGrowReady,
    setShowGrowReady,
    initializeJourney,
    toggleTask,
    updateNotes,
    updateLink,
  } = useJourney();

  const [expandedStages, setExpandedStages] = useState<Record<number, boolean>>({
    1: true,
  });
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [expandedTasks, setExpandedTasks] = useState<Record<string, "detail" | "resources" | "notes" | null>>({});

  // Calculate stats
  const stats = useMemo(() => {
    let completedTasks = 0;
    let totalTasks = 0;
    const areaScores: Record<string, { completed: number; total: number }> = {};
    
    AREAS.forEach(area => {
      areaScores[area.id] = { completed: 0, total: 0 };
    });

    STAGES.forEach((stage) => {
      stage.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          totalTasks++;
          if (task.area) {
            areaScores[task.area].total++;
          }
          if (journey?.checked[task.id]) {
            completedTasks++;
            if (task.area) {
              areaScores[task.area].completed++;
            }
          }
        });
      });
    });

    return { completedTasks, totalTasks, areaScores };
  }, [journey?.checked]);

  const currentMilestone = getMilestoneForScore(journey?.score || 0);
  const scorePercent = ((journey?.score || 0) / MAX_POINTS) * 100;
  const ringOffset = 175.9 - (175.9 * scorePercent) / 100;

  const toggleStage = (stageId: number) => {
    setExpandedStages((prev) => ({ ...prev, [stageId]: !prev[stageId] }));
  };

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const toggleTaskSection = (taskId: string, section: "detail" | "resources" | "notes") => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: prev[taskId] === section ? null : section,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F1F1F6]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#657dfe] border-t-transparent" />
      </div>
    );
  }

  if (showEmailCapture) {
    return <EmailCapture onSubmit={initializeJourney} isLoading={isLoading} />;
  }

  return (
    <>
      {showGrowReady && (
        <GrowReadyModal onClose={() => setShowGrowReady(false)} />
      )}

      <div className="min-h-screen bg-[#F1F1F6] font-sans">
        <div className="mx-auto max-w-[900px] px-6 pb-24 pt-10">
          {/* Brand */}
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#657dfe]">
              <svg className="h-4 w-4" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M7 1v12M1 7h12" />
              </svg>
            </div>
            <span className="font-serif text-xl text-[#657dfe]">SheBlooms</span>
            <div className="mx-2 h-5 w-px bg-[#d8d9e5]" />
            <span className="text-sm text-[#555]">Founder Journey</span>
          </div>

          {/* Sticky Header */}
          <div className="sticky top-0 z-50 bg-[#F1F1F6] pb-2 pt-3">
            {/* Score Card */}
            <div className="mb-2.5 rounded-xl border border-[#d8d9e5] bg-white p-4">
              <div className="mb-2 flex items-center gap-4">
                {/* Ring with label */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#888]">
                    Your score
                  </div>
                  <div className="relative h-[72px] w-[72px]">
                  <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
                    <circle cx="36" cy="36" r="28" fill="none" stroke="#d8d9e5" strokeWidth="6" />
                    <circle
                      cx="36"
                      cy="36"
                      r="28"
                      fill="none"
                      stroke="#657dfe"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray="175.9"
                      strokeDashoffset={175.9 - (175.9 * scorePercent) / 100}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-serif text-xl text-black">{journey?.score || 0}</span>
                    <span className="text-[10px] text-[#888]">/ 100</span>
                  </div>
                  </div>
                </div>

                {/* Score Meta */}
                <div className="min-w-0 flex-1">
                  <div
                    className="mb-1.5 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                    style={{ backgroundColor: currentMilestone.bgColor, color: currentMilestone.color }}
                  >
                    {currentMilestone.label}
                  </div>
                  <div className="mb-2 text-[11px] text-[#555]">
                    {stats.completedTasks} of {stats.totalTasks} tasks complete
                  </div>
                  
                  {/* Milestone Track */}
                  <div className="relative h-1 rounded bg-[#d8d9e5]">
                    <div
                      className="h-full rounded bg-[#657dfe] transition-all duration-500"
                      style={{ width: `${scorePercent}%` }}
                    />
                    {MILESTONES.map((ms) => (
                      <div
                        key={ms.id}
                        className="absolute top-[-3px] h-[10px] w-[10px] rounded-full border-2 border-white shadow-[0_0_0_1px_#d8d9e5] transition-colors duration-300"
                        style={{
                          left: `${(ms.minScore / MAX_POINTS) * 100}%`,
                          transform: "translateX(-50%)",
                          backgroundColor: (journey?.score || 0) >= ms.minScore ? "#657dfe" : "#d8d9e5",
                        }}
                      />
                    ))}
                  </div>
                  <div className="relative mt-1.5 h-4 text-[9px] text-[#aaa]">
                    {MILESTONES.map((ms, i) => (
                      <span
                        key={ms.id}
                        className={`absolute whitespace-nowrap ${(journey?.score || 0) >= ms.minScore ? "font-semibold text-black" : ""}`}
                        style={{
                          left: `${(ms.minScore / MAX_POINTS) * 100}%`,
                          transform: i === 0 ? "translateX(0)" : i === MILESTONES.length - 1 ? "translateX(-100%)" : "translateX(-50%)",
                        }}
                      >
                        {ms.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Raise Application */}
              <div className="rounded-lg bg-[#F1F1F6] px-3 py-2">
                <div className="mb-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#888]">
                  Raise Application
                </div>
                <div className="mb-1 text-[12px] font-medium text-black">
                  {(journey?.score || 0) >= RAISE_GATE 
                    ? "You're eligible!" 
                    : `Need ${RAISE_GATE - (journey?.score || 0)} more points`}
                </div>
                <div className="mb-1 h-[3px] overflow-hidden rounded bg-[#d8d9e5]">
                  <div
                    className="h-full rounded bg-[#657dfe] transition-all duration-500"
                    style={{ width: `${Math.min(100, ((journey?.score || 0) / RAISE_GATE) * 100)}%` }}
                  />
                </div>
                <div className="text-[10px] text-[#888]">
                  {Math.round(((journey?.score || 0) / RAISE_GATE) * 100)}% toward Raise gate (min. {RAISE_GATE} pts)
                </div>
              </div>
            </div>

            {/* Areas Card */}
            <div className="rounded-xl border border-[#d8d9e5] bg-white p-4">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#888]">
                How investors see you
              </div>
              <div className="grid grid-cols-5 gap-3">
                {AREAS.map((area) => {
                  const areaStats = stats.areaScores[area.id];
                  const percent = areaStats.total > 0 ? (areaStats.completed / areaStats.total) * 100 : 0;
                  return (
                    <div key={area.id}>
                      <div className="mb-0.5 text-[11px] font-semibold" style={{ color: area.color }}>
                        {area.label}
                      </div>
                      <div className="mb-0.5 h-1 overflow-hidden rounded bg-[#d8d9e5]">
                        <div
                          className="h-full rounded transition-all duration-500"
                          style={{ width: `${percent}%`, backgroundColor: area.color }}
                        />
                      </div>
                      <div className="text-[10px] text-[#aaa]">
                        {areaStats.completed}/{areaStats.total}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Raise Eligible Banner */}
          {(journey?.score || 0) >= RAISE_GATE && (
            <div
              className="mb-3 flex cursor-pointer items-center gap-3 rounded-xl bg-gradient-to-br from-[#657dfe] to-[#8a9ffe] px-4 py-3 transition-opacity hover:opacity-95"
              onClick={() => setShowGrowReady(true)}
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-lg text-white">
                &#9733;
              </div>
              <div className="flex-1">
                <div className="text-[12px] font-semibold text-white">You&apos;re eligible for Raise</div>
                <div className="text-[11px] text-white/85">
                  Your score qualifies you to apply for the SheBlooms Raise program.
                </div>
              </div>
              <button className="flex-shrink-0 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#657dfe] transition-colors hover:bg-[#eef0ff]">
                Book a call
              </button>
            </div>
          )}

          {/* Stages */}
          <div className="space-y-2.5">
            {STAGES.map((stage) => {
              const stageTasksTotal = stage.groups.reduce((acc, g) => acc + g.tasks.length, 0);
              const stageTasksCompleted = stage.groups.reduce(
                (acc, g) => acc + g.tasks.filter((t) => journey?.checked[t.id]).length,
                0
              );
              const stagePercent = stageTasksTotal > 0 ? (stageTasksCompleted / stageTasksTotal) * 100 : 0;
              const stagePoints = stage.groups.reduce(
                (acc, g) => acc + g.tasks.filter((t) => journey?.checked[t.id]).reduce((a, t) => a + t.points, 0),
                0
              );
              const stageMaxPoints = stage.groups.reduce((acc, g) => acc + g.tasks.reduce((a, t) => a + t.points, 0), 0);
              const isExpanded = expandedStages[stage.id] || false;
              const isLocked = stage.id > 1;

              if (isLocked) {
                return (
                  <div key={stage.id} className="rounded-xl border border-[#d8d9e5] bg-white opacity-55">
                    <div className="flex items-center gap-2.5 px-4 py-2.5">
                      <div
                        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                        style={{ backgroundColor: stage.bgColor, color: stage.color }}
                      >
                        {stage.id}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-medium text-black">{stage.name}</div>
                        <div className="text-[11px] text-[#888]">{stage.subtitle}</div>
                      </div>
                      <span className="rounded-full bg-[#F1F1F6] px-2 py-0.5 text-[10px] font-medium text-[#aaa]">
                        Locked
                      </span>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={stage.id}
                  className="overflow-hidden rounded-xl border border-[#d8d9e5] bg-white transition-shadow hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                >
                  {/* Stage Header */}
                  <div
                    className="flex cursor-pointer select-none items-center gap-2.5 px-4 py-2.5 transition-colors hover:bg-[#f7f7fb]"
                    onClick={() => toggleStage(stage.id)}
                  >
                    <div
                      className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                      style={{ backgroundColor: stage.bgColor, color: stage.color }}
                    >
                      {stage.id}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] font-medium text-black">{stage.name}</div>
                      <div className="text-[11px] text-[#888]">{stage.subtitle}</div>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <span className="text-[11px] font-semibold" style={{ color: stage.color }}>
                        {stagePoints}/{stageMaxPoints} pts
                      </span>
                      <span className="text-[11px] text-[#888]">{stageTasksCompleted}/{stageTasksTotal}</span>
                      <div className="h-[3px] w-14 overflow-hidden rounded bg-[#d8d9e5]">
                        <div
                          className="h-full rounded transition-all duration-300"
                          style={{ width: `${stagePercent}%`, backgroundColor: stage.color }}
                        />
                      </div>
                      <ChevronDown
                        className={`h-4 w-4 text-[#aaa] transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Stage Body */}
                  {isExpanded && (
                    <div className="border-t border-[#d8d9e5]">
                      {/* North Star Metric */}
                      {stage.northStarMetric && (
                        <div className="flex items-start gap-2.5 border-b border-[#d8d9e5] bg-[#f7f7fb] px-4 py-3">
                          <div
                            className="min-h-[36px] w-0.5 flex-shrink-0 self-stretch rounded-sm"
                            style={{ backgroundColor: stage.color }}
                          />
                          <div>
                            <div className="mb-0.5 text-[8px] font-semibold uppercase tracking-[0.09em] text-[#aaa]">
                              North Star Metric
                            </div>
                            <div className="mb-0.5 text-xs font-semibold text-black">
                              {stage.northStarMetric.title}
                            </div>
                            <div className="text-[11px] leading-relaxed text-[#555]">
                              {stage.northStarMetric.description}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Groups */}
                      {stage.groups.map((group) => {
                        const groupCompleted = group.tasks.filter((t) => journey?.checked[t.id]).length;
                        const isGroupExpanded = expandedGroups[group.id] !== false; // default open

                        return (
                          <div key={group.id}>
                            {/* Group Header */}
                            <div
                              className="flex cursor-pointer select-none items-center gap-2 border-t border-[#d8d9e5] bg-[#f7f7fb] px-4 py-2 transition-colors hover:bg-[#eeeef5]"
                              onClick={() => toggleGroup(group.id)}
                            >
                              <span className="flex-1 text-[9px] font-semibold uppercase tracking-[0.07em] text-[#888]">
                                {group.name}
                              </span>
                              <span className="text-[10px] text-[#aaa]">
                                {groupCompleted}/{group.tasks.length}
                              </span>
                              <ChevronDown
                                className={`h-3 w-3 text-[#aaa] transition-transform ${isGroupExpanded ? "rotate-180" : ""}`}
                              />
                            </div>

                            {/* Tasks */}
                            {isGroupExpanded &&
                              group.tasks.map((task) => {
                                const isChecked = journey?.checked[task.id] || false;
                                const expandedSection = expandedTasks[task.id];

                                return (
                                  <div
                                    key={task.id}
                                    className={`border-t border-[#eeeef5] ${isChecked ? "task-done" : ""}`}
                                  >
                                    {/* Task Main */}
                                    <div
                                      className="flex cursor-pointer items-start gap-2.5 px-4 py-2.5 transition-colors hover:bg-[#f7f7fb]"
                                      onClick={() => toggleTask(task.id, task.points)}
                                    >
                                      {/* Checkbox */}
                                      <div
                                        className={`mt-0.5 flex h-4 w-4 flex-shrink-0 cursor-pointer items-center justify-center rounded border-[1.5px] transition-all ${
                                          isChecked
                                            ? "border-[#657dfe] bg-[#657dfe]"
                                            : "border-[#d8d9e5] bg-white"
                                        }`}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleTask(task.id, task.points);
                                        }}
                                      >
                                        {isChecked && (
                                          <svg className="h-2.5 w-2.5" viewBox="0 0 12 10" fill="none">
                                            <path
                                              d="M1 5L4.5 8.5L11 1.5"
                                              stroke="white"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        )}
                                      </div>

                                      {/* Task Body */}
                                      <div className="min-w-0 flex-1">
                                        <div
                                          className={`mb-1.5 text-xs leading-relaxed ${
                                            isChecked ? "text-[#aaa] line-through" : "text-black"
                                          }`}
                                        >
                                          {task.title}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-1">
                                          {task.badges?.includes("gate") && (
                                            <span className="rounded-full border border-[#e8c86a] bg-[#fffaeb] px-2 py-0.5 text-[9px] font-medium text-[#92610a]">
                                              Gate
                                            </span>
                                          )}
                                          {task.badges?.includes("north-star") && (
                                            <span className="rounded-full border border-[#d4a820] bg-[#fffbf0] px-2 py-0.5 text-[9px] font-medium text-[#7c5e0a]">
                                              North Star
                                            </span>
                                          )}
                                          <span className="rounded-full bg-[#F1F1F6] px-2 py-0.5 text-[9px] font-medium text-[#555]">
                                            +{task.points} pts
                                          </span>
                                        </div>
                                      </div>

                                      {/* Task Actions */}
                                      <div className="flex flex-shrink-0 items-center gap-1.5 pt-0.5">
                                        <button
                                          className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold transition-all ${
                                            expandedSection === "detail"
                                              ? "border-[#657dfe] bg-[#eef0ff] text-[#657dfe]"
                                              : "border-[#d8d9e5] bg-white text-[#888] hover:bg-[#F1F1F6] hover:text-[#555]"
                                          }`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleTaskSection(task.id, "detail");
                                          }}
                                        >
                                          Details
                                        </button>
                                        {task.resources && task.resources.length > 0 && (
                                          <button
                                            className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold transition-all ${
                                              expandedSection === "resources"
                                                ? "border-[#657dfe] bg-[#eef0ff] text-[#657dfe]"
                                                : "border-[#d8d9e5] bg-white text-[#888] hover:bg-[#F1F1F6] hover:text-[#555]"
                                            }`}
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleTaskSection(task.id, "resources");
                                            }}
                                          >
                                            Resources
                                          </button>
                                        )}
                                        <button
                                          className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold transition-all ${
                                            expandedSection === "notes"
                                              ? "border-[#657dfe] bg-[#eef0ff] text-[#657dfe]"
                                              : "border-[#d8d9e5] bg-white text-[#888] hover:bg-[#F1F1F6] hover:text-[#555]"
                                          }`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleTaskSection(task.id, "notes");
                                          }}
                                        >
                                          Notes
                                        </button>
                                      </div>
                                    </div>

                                    {/* Task Detail */}
                                    {expandedSection === "detail" && task.detail && (
                                      <div className="border-t border-[#eeeef5] bg-[#f7f7fb] px-4 pb-3">
                                        {task.detail.why && (
                                          <div className="pt-2.5">
                                            <div className="mb-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#aaa]">
                                              Why
                                            </div>
                                            <div className="text-[11px] leading-relaxed text-[#333]">
                                              {task.detail.why}
                                            </div>
                                          </div>
                                        )}
                                        {task.detail.how && (
                                          <div className="pt-2.5">
                                            <div className="mb-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#aaa]">
                                              How
                                            </div>
                                            <div className="text-[11px] leading-relaxed text-[#333]">
                                              {task.detail.how}
                                            </div>
                                          </div>
                                        )}
                                        {task.detail.evidence && (
                                          <div className="pt-2.5">
                                            <div className="mb-1 text-[8px] font-bold uppercase tracking-[0.08em] text-[#aaa]">
                                              Evidence
                                            </div>
                                            <div className="text-[11px] leading-relaxed text-[#333]">
                                              {task.detail.evidence}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {/* Task Resources */}
                                    {expandedSection === "resources" && task.resources && (
                                      <div className="px-4 pb-3">
                                        <div className="border-t border-[#eeeef5] pt-2.5 text-[9px] font-semibold uppercase tracking-[0.07em] text-[#888]">
                                          Recommended Resources
                                        </div>
                                        <div className="mt-2 space-y-1.5">
                                          {task.resources.map((res, idx) => (
                                            <a
                                              key={idx}
                                              href={res.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="flex items-start gap-2.5 rounded-[10px] border border-[#d8d9e5] bg-white px-3 py-2.5 transition-all hover:border-[#657dfe] hover:shadow-[0_2px_8px_rgba(101,125,254,0.1)]"
                                            >
                                              <div
                                                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[9px] font-bold uppercase tracking-[0.05em] ${
                                                  res.type === "book"
                                                    ? "bg-[#faeeda] text-[#854f0b]"
                                                    : res.type === "video"
                                                    ? "bg-[#fbeaf0] text-[#993556]"
                                                    : res.type === "article"
                                                    ? "bg-[#e6f1fb] text-[#185fa5]"
                                                    : res.type === "podcast"
                                                    ? "bg-[#eeedfe] text-[#534ab7]"
                                                    : "bg-[#e1f5ee] text-[#0f6e56]"
                                                }`}
                                              >
                                                {res.type.slice(0, 4)}
                                              </div>
                                              <div className="min-w-0 flex-1">
                                                <div className="text-[11px] font-semibold text-black">
                                                  {res.title}
                                                </div>
                                                {res.author && (
                                                  <div className="text-[10px] text-[#888]">{res.author}</div>
                                                )}
                                                {res.description && (
                                                  <div className="mt-0.5 text-[10px] leading-relaxed text-[#aaa]">
                                                    {res.description}
                                                  </div>
                                                )}
                                              </div>
                                              <span className="mt-1.5 flex-shrink-0 text-sm text-[#d8d9e5]">→</span>
                                            </a>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Task Notes */}
                                    {expandedSection === "notes" && (
                                      <div className="px-4 pb-3">
                                        <div className="border-t border-[#eeeef5] pt-2.5 text-[9px] font-semibold uppercase tracking-[0.07em] text-[#888]">
                                          Your Notes
                                        </div>
                                        <p className="mb-1.5 mt-2 text-[11px] italic text-[#aaa]">
                                          {task.notesPrompt || "Add your notes, insights, or evidence here..."}
                                        </p>
                                        <textarea
                                          className="w-full resize-y rounded-lg border border-[#d8d9e5] bg-white px-3 py-2.5 text-[11px] leading-relaxed text-black outline-none transition-colors focus:border-[#657dfe]"
                                          style={{ minHeight: "80px" }}
                                          placeholder="Type your notes..."
                                          value={journey?.notes[task.id] || ""}
                                          onChange={(e) => updateNotes(task.id, e.target.value)}
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                        <div className="mt-2 flex items-center gap-2">
                                          <span className="whitespace-nowrap text-[10px] font-medium text-[#888]">
                                            Evidence link:
                                          </span>
                                          <input
                                            type="url"
                                            className="flex-1 rounded-lg border border-[#d8d9e5] bg-white px-2.5 py-1.5 text-[11px] text-black outline-none transition-colors placeholder:text-[#aaa] focus:border-[#657dfe]"
                                            placeholder="https://..."
                                            value={journey?.links[task.id] || ""}
                                            onChange={(e) => updateLink(task.id, e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                          />
                                        </div>
                                      </div>
                                    )}

                                    {/* Gate Footer */}
                                    {task.badges?.includes("gate") && task.gateMessage && (
                                      <div className="border-t border-[#e8c86a] bg-[#fffcf0] px-4 py-2.5 text-[11px] leading-relaxed text-[#7a5008]">
                                        <strong className="font-semibold">Gate Task:</strong> {task.gateMessage}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-[#d8d9e5] pt-4">
            <span className="text-[11px] text-[#aaa]">
              SheBlooms Venture · Founder Journey
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

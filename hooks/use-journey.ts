"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { FounderJourney } from "@/lib/types";
import { STAGES } from "@/lib/journey-data";

const LOCAL_STORAGE_KEY = "founder_journey_local";

export function useJourney() {
  const [journey, setJourney] = useState<FounderJourney | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [showGrowReady, setShowGrowReady] = useState(false);

  const supabase = createClient();

  // Calculate score from checked tasks
  const calculateScore = useCallback((checked: Record<string, boolean>) => {
    let score = 0;
    STAGES.forEach((stage) => {
      if (!stage.locked) {
        stage.groups.forEach((group) => {
          group.tasks.forEach((task) => {
            if (checked[task.id]) {
              score += task.points;
            }
          });
        });
      }
    });
    return score;
  }, []);

  // Load journey from localStorage first, then try Supabase
  useEffect(() => {
    const loadJourney = async () => {
      // Check localStorage first
      const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
      
      if (localData) {
        try {
          const parsed = JSON.parse(localData) as FounderJourney;
          setJourney(parsed);
          setIsLoading(false);
          
          // Try to sync with Supabase
          if (parsed.email) {
            const { data } = await supabase
              .from("founder_journey_v2")
              .select("*")
              .eq("email", parsed.email)
              .single();
            
            if (data) {
              // Merge data - prefer Supabase if it has newer changes
              const mergedJourney: FounderJourney = {
                ...parsed,
                id: data.id,
                checked: { ...parsed.checked, ...data.checked },
                notes: { ...parsed.notes, ...data.notes },
                links: { ...parsed.links, ...data.links },
                score: Math.max(parsed.score, data.score),
                grow_ready_shown: parsed.grow_ready_shown || data.grow_ready_shown,
              };
              setJourney(mergedJourney);
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mergedJourney));
            }
          }
        } catch {
          // Invalid local data, show email capture
          setShowEmailCapture(true);
        }
      } else {
        setShowEmailCapture(true);
      }
      
      setIsLoading(false);
    };

    loadJourney();
  }, [supabase]);

  // Save journey to both localStorage and Supabase
  const saveJourney = useCallback(
    async (updatedJourney: FounderJourney) => {
      setIsSaving(true);
      
      // Always save to localStorage immediately
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedJourney));
      setJourney(updatedJourney);

      // Try to save to Supabase
      try {
        const { data: existing } = await supabase
          .from("founder_journey_v2")
          .select("id")
          .eq("email", updatedJourney.email)
          .single();

        if (existing) {
          await supabase
            .from("founder_journey_v2")
            .update({
              checked: updatedJourney.checked,
              notes: updatedJourney.notes,
              links: updatedJourney.links,
              score: updatedJourney.score,
              grow_ready_shown: updatedJourney.grow_ready_shown,
            })
            .eq("email", updatedJourney.email);
        } else {
          await supabase.from("founder_journey_v2").insert({
            email: updatedJourney.email,
            name: updatedJourney.name,
            checked: updatedJourney.checked,
            notes: updatedJourney.notes,
            links: updatedJourney.links,
            score: updatedJourney.score,
            grow_ready_shown: updatedJourney.grow_ready_shown,
          });
        }
      } catch (error) {
        console.error("Failed to save to Supabase:", error);
      }

      setIsSaving(false);
    },
    [supabase]
  );

  // Initialize journey with email
  const initializeJourney = useCallback(
    async (data: { name: string; email: string }) => {
      setIsLoading(true);

      // Check if user exists in Supabase
      const { data: existing } = await supabase
        .from("founder_journey_v2")
        .select("*")
        .eq("email", data.email)
        .single();

      let newJourney: FounderJourney;

      if (existing) {
        newJourney = {
          id: existing.id,
          email: existing.email,
          name: existing.name || data.name,
          checked: existing.checked || {},
          notes: existing.notes || {},
          links: existing.links || {},
          score: existing.score || 0,
          grow_ready_shown: existing.grow_ready_shown || false,
        };
      } else {
        newJourney = {
          email: data.email,
          name: data.name,
          checked: {},
          notes: {},
          links: {},
          score: 0,
          grow_ready_shown: false,
        };

        // Insert new user
        await supabase.from("founder_journey_v2").insert(newJourney);
      }

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newJourney));
      setJourney(newJourney);
      setShowEmailCapture(false);
      setIsLoading(false);
    },
    [supabase]
  );

  // Toggle task completion
  const toggleTask = useCallback(
    (taskId: string) => {
      if (!journey) return;

      const newChecked = { ...journey.checked };
      newChecked[taskId] = !newChecked[taskId];
      
      const newScore = calculateScore(newChecked);
      
      const updatedJourney: FounderJourney = {
        ...journey,
        checked: newChecked,
        score: newScore,
      };

      // Check if user just hit 20 points and hasn't seen the modal
      if (newScore >= 20 && !journey.grow_ready_shown) {
        updatedJourney.grow_ready_shown = true;
        setShowGrowReady(true);
      }

      saveJourney(updatedJourney);
    },
    [journey, calculateScore, saveJourney]
  );

  // Update notes
  const updateNotes = useCallback(
    (taskId: string, notes: string) => {
      if (!journey) return;

      const updatedJourney: FounderJourney = {
        ...journey,
        notes: { ...journey.notes, [taskId]: notes },
      };

      saveJourney(updatedJourney);
    },
    [journey, saveJourney]
  );

  // Update link
  const updateLink = useCallback(
    (taskId: string, link: string) => {
      if (!journey) return;

      const updatedJourney: FounderJourney = {
        ...journey,
        links: { ...journey.links, [taskId]: link },
      };

      saveJourney(updatedJourney);
    },
    [journey, saveJourney]
  );

  return {
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
  };
}

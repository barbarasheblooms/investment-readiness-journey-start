"use client";

import { Trophy, X } from "lucide-react";

interface GrowReadyModalProps {
  onClose: () => void;
}

export function GrowReadyModal({ onClose }: GrowReadyModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-card p-8 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 hover:bg-muted transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
          <Trophy className="h-10 w-10 text-success" />
        </div>

        <h2 className="font-serif text-3xl text-foreground">
          Congratulations!
        </h2>
        
        <p className="mt-4 text-muted-foreground">
          You&apos;ve completed Stage 1 and achieved <strong>Pre-seed Ready</strong> status
          for Problem Validation Fit!
        </p>

        <p className="mt-4 text-sm text-muted-foreground">
          You&apos;ve demonstrated strong understanding of your problem space, target
          market, and solution hypothesis. Keep building on this foundation!
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-primary px-4 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Continue Your Journey
        </button>
      </div>
    </div>
  );
}

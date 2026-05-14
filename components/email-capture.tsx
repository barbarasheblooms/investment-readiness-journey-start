"use client";

import { useState } from "react";

interface EmailCaptureProps {
  onSubmit: (data: { name: string; email: string }) => void;
  isLoading?: boolean;
}

export function EmailCapture({ onSubmit, isLoading }: EmailCaptureProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isButtonEnabled = isValidEmail && !isLoading;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!isValidEmail) {
      setError("Please enter a valid email.");
      return;
    }

    onSubmit({ name: name.trim(), email: email.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl mx-4">
        {/* Logo */}
        <div className="mb-5 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#657dfe]">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <span className="font-serif text-lg text-[#657dfe]">SheBlooms</span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
          Investment Readiness Journey
        </h1>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Track your path to raise. Complete each checkpoint, watch your score climb, and know the exact moment you&apos;re ready to raise.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#657dfe] focus:outline-none focus:ring-2 focus:ring-[#657dfe]/20"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-[#657dfe] focus:outline-none focus:ring-2 focus:ring-[#657dfe]/20"
            />
          </div>

          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          <button
            type="submit"
            disabled={!isButtonEnabled}
            className={`w-full rounded-lg px-4 py-3 text-sm font-medium transition-all ${
              isButtonEnabled
                ? "bg-[#657dfe] text-white hover:bg-[#5570f0] cursor-pointer"
                : "bg-[#e0e4f0] text-[#a0a8c0] cursor-not-allowed"
            }`}
          >
            {isLoading ? "Loading..." : "Start my journey"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Your progress is saved and synced across devices.
        </p>
      </div>
    </div>
  );
}

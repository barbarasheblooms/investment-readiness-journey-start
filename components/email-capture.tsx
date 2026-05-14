"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface EmailCaptureProps {
  onSubmit: (data: { name: string; email: string }) => void;
  isLoading?: boolean;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function EmailCapture({ onSubmit, isLoading }: EmailCaptureProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const emailIsValid = isValidEmail(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!emailIsValid) {
      setError("Por favor, insira um email válido.");
      return;
    }

    onSubmit({ name: name.trim(), email: email.trim() });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f8]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <span className="font-serif text-xl text-foreground italic">SheBlooms</span>
        <span className="text-xs font-medium tracking-widest text-muted-foreground">
          INVESTMENT READINESS CHECK
        </span>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-sm">
          {/* Check Icon */}
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary">
            <Check className="h-7 w-7 text-primary" strokeWidth={2.5} />
          </div>

          {/* Title */}
          <h1 className="font-serif text-2xl text-foreground mb-3">
            Your score is ready.
          </h1>
          <p className="text-muted-foreground mb-8">
            Where should we send your full investment readiness report?
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-foreground placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Work email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3.5 text-foreground placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || !emailIsValid}
              className={`w-full rounded-lg px-4 py-4 font-medium transition-colors ${
                emailIsValid
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Loading..." : "Reveal my Readiness Score →"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            By continuing you create a free SheBlooms account. No spam, ever.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © 2026 SheBlooms · <a href="https://sheblooms.com" className="text-primary hover:underline">sheblooms.com</a>
      </footer>
    </div>
  );
}

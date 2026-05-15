"use client";

import { X } from "lucide-react";

interface GrowReadyModalProps {
  onClose: () => void;
}

export function GrowReadyModal({ onClose }: GrowReadyModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-5">
      <div className="relative w-full max-w-[420px] rounded-[20px] bg-white p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-[#F1F1F6] text-[13px] text-[#888] hover:bg-[#e8e8f0] transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef0ff] text-[26px]">
          &#9733;
        </div>

        <div className="mb-2 text-[9px] font-bold uppercase tracking-wider text-[#9a9690]">
          Milestone reached
        </div>

        <h2 className="font-serif text-2xl text-black mb-2.5 leading-tight">
          You&apos;re eligible for Raise
        </h2>
        
        <p className="text-[13px] text-[#555] leading-relaxed mb-5">
          Your score qualifies you to apply for the SheBlooms Raise program. 
          This is your opportunity to connect with investors and take your startup to the next level.
        </p>

        <div className="flex flex-col gap-2 mb-5 p-3.5 bg-[#F1F1F6] rounded-[10px]">
          <div className="flex items-center gap-2.5 text-[12px] text-[#222]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#657dfe] flex-shrink-0" />
            Access to investor network
          </div>
          <div className="flex items-center gap-2.5 text-[12px] text-[#222]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#657dfe] flex-shrink-0" />
            Pitch preparation support
          </div>
          <div className="flex items-center gap-2.5 text-[12px] text-[#222]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#657dfe] flex-shrink-0" />
            Data room review
          </div>
          <div className="flex items-center gap-2.5 text-[12px] text-[#222]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#657dfe] flex-shrink-0" />
            1:1 advisor sessions
          </div>
        </div>

        <a
          href="https://sheblooms.com/raise"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-[10px] bg-[#657dfe] py-3.5 text-center text-[13px] font-semibold text-white transition-colors hover:bg-[#4f6de0] mb-2"
        >
          Apply to Raise Program
        </a>

        <button
          onClick={onClose}
          className="w-full rounded-[10px] bg-[#F1F1F6] py-3.5 text-center text-[13px] font-medium text-[#888] transition-colors hover:bg-[#e8e8f0]"
        >
          Continue Journey
        </button>
      </div>
    </div>
  );
}

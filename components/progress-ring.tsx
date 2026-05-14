"use client";

interface ProgressRingProps {
  score: number;
  maxScore: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({
  score,
  maxScore,
  size = 200,
  strokeWidth = 12,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(score / maxScore, 1);
  const offset = circumference - progress * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-secondary"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-primary transition-all duration-500 ease-out"
        />
      </svg>
      {/* Score display */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-serif text-5xl font-normal text-foreground">
          {score}
        </span>
        <span className="text-sm text-muted-foreground">of {maxScore} pts</span>
      </div>
    </div>
  );
}

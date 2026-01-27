import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/useCountUp";
import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface CircularProgressCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  target: number;
  unit?: string;
  variant?: "primary" | "accent" | "info";
  className?: string;
}

export function CircularProgressCard({
  icon: Icon,
  label,
  value,
  target,
  unit = "",
  variant = "primary",
  className,
}: CircularProgressCardProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const percentage = Math.min((value / target) * 100, 100);
  const circumference = 2 * Math.PI * 36;
  
  const animatedValue = useCountUp({ end: value, duration: 1500 });
  const animatedPercentage = useCountUp({ end: percentage, duration: 1500 });

  // Animate the progress ring
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Trigger confetti when reaching 100%
  useEffect(() => {
    if (percentage >= 100 && !hasTriggeredConfetti && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      // Delay confetti to sync with count-up animation
      const timer = setTimeout(() => {
        // First burst
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { x, y },
          colors: ['#4CAF50', '#66BB6A', '#81C784', '#FFD700', '#FFA500'],
          ticks: 200,
          gravity: 1.2,
          scalar: 0.8,
          shapes: ['circle', 'square'],
        });

        // Second burst with stars
        setTimeout(() => {
          confetti({
            particleCount: 30,
            spread: 80,
            origin: { x, y },
            colors: ['#4CAF50', '#66BB6A', '#FFD700'],
            ticks: 150,
            gravity: 0.8,
            scalar: 1,
            shapes: ['star'],
          });
        }, 150);

        setHasTriggeredConfetti(true);
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [percentage, hasTriggeredConfetti]);

  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;

  const variantStyles = {
    primary: {
      card: "bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5",
      stroke: "stroke-primary",
      trackStroke: "stroke-primary/20",
      textColor: "text-primary",
    },
    accent: {
      card: "bg-gradient-to-br from-orange-500/15 via-orange-500/10 to-orange-500/5",
      stroke: "stroke-orange-500",
      trackStroke: "stroke-orange-500/20",
      textColor: "text-orange-500",
    },
    info: {
      card: "bg-gradient-to-br from-health-info/15 via-health-info/10 to-health-info/5",
      stroke: "stroke-health-info",
      trackStroke: "stroke-health-info/20",
      textColor: "text-health-info",
    },
  };

  const styles = variantStyles[variant];
  const isCompleted = percentage >= 100;

  return (
    <div 
      ref={cardRef}
      className={cn(
        "relative p-4 rounded-3xl transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col items-center h-full min-h-[180px]",
        styles.card,
        isCompleted && "ring-2 ring-primary/50 shadow-lg",
        className
      )}
    >
      {/* Completed badge */}
      {isCompleted && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
          ✓
        </div>
      )}

      {/* Circular Progress */}
      <div className="relative w-16 h-16 mb-2">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 80 80">
          {/* Background track */}
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            strokeWidth="6"
            className={styles.trackStroke}
          />
          {/* Progress arc */}
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            className={cn(
              styles.stroke, 
              "transition-all duration-1000 ease-out",
              isCompleted && "drop-shadow-[0_0_6px_rgba(76,175,80,0.6)]"
            )}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        {/* Center icon */}
        <div className={cn(
          "absolute inset-0 flex items-center justify-center transition-transform duration-300",
          isCompleted && "scale-110"
        )}>
          <Icon className={cn("w-5 h-5", styles.textColor)} />
        </div>
      </div>

      {/* Label */}
      <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold text-center mb-1">
        {label}
      </p>

      {/* Value */}
      <div className="flex items-baseline justify-center gap-0.5">
        <span className={cn("text-lg font-black tracking-tight tabular-nums", styles.textColor)}>
          {Number(animatedValue).toLocaleString()}
        </span>
        <span className="text-[10px] text-muted-foreground font-medium">
          / {target.toLocaleString()} {unit}
        </span>
      </div>

      {/* Percentage */}
      <p className={cn(
        "text-xs font-bold text-center mt-1 tabular-nums transition-all duration-300",
        styles.textColor,
        isCompleted && "scale-110"
      )}>
        {Math.round(Number(animatedPercentage))}%
      </p>
    </div>
  );
}

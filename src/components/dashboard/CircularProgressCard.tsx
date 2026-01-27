import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/useCountUp";
import { useState, useEffect } from "react";

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

  return (
    <div 
      className={cn(
        "relative p-4 rounded-3xl transition-all duration-300 hover:scale-[1.02] cursor-pointer",
        styles.card,
        className
      )}
    >
      {/* Circular Progress */}
      <div className="flex justify-center mb-2">
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
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
              className={cn(styles.stroke, "transition-all duration-1000 ease-out")}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className={cn("w-6 h-6", styles.textColor)} />
          </div>
        </div>
      </div>

      {/* Label */}
      <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold text-center mb-1">
        {label}
      </p>

      {/* Value */}
      <div className="flex items-baseline justify-center gap-1">
        <span className="text-xl font-black text-foreground tracking-tight tabular-nums">
          {Number(animatedValue).toLocaleString()}
        </span>
        <span className="text-xs text-muted-foreground font-medium">
          / {target.toLocaleString()} {unit}
        </span>
      </div>

      {/* Percentage */}
      <p className={cn("text-xs font-bold text-center mt-1 tabular-nums", styles.textColor)}>
        {Math.round(Number(animatedPercentage))}%
      </p>
    </div>
  );
}

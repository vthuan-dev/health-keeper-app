import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonBadgeProps {
  current: number;
  previous: number;
  unit?: string;
  className?: string;
}

export function ComparisonBadge({ current, previous, unit = "", className }: ComparisonBadgeProps) {
  const diff = current - previous;
  const percentChange = previous > 0 ? Math.round((diff / previous) * 100) : 0;
  
  const isPositive = diff > 0;
  const isNeutral = diff === 0;
  
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold",
        isNeutral && "bg-muted text-muted-foreground",
        isPositive && "bg-primary/15 text-primary",
        !isPositive && !isNeutral && "bg-destructive/15 text-destructive",
        className
      )}
    >
      {isNeutral ? (
        <Minus className="w-3 h-3" />
      ) : isPositive ? (
        <TrendingUp className="w-3 h-3" />
      ) : (
        <TrendingDown className="w-3 h-3" />
      )}
      <span>
        {isPositive && "+"}
        {diff.toLocaleString()}
        {unit && ` ${unit}`}
      </span>
      {!isNeutral && (
        <span className="opacity-70">({percentChange > 0 ? "+" : ""}{percentChange}%)</span>
      )}
    </div>
  );
}

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/hooks/useCountUp";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "primary" | "accent" | "info";
  className?: string;
}

export function StatsCard({
  icon: Icon,
  label,
  value,
  unit,
  subtitle,
  trend,
  trendValue,
  variant = "default",
  className,
}: StatsCardProps) {
  // Parse numeric value for animation
  const numericValue = typeof value === "string" 
    ? parseFloat(value.replace(/,/g, "")) 
    : value;
  const hasDecimals = String(value).includes(".");
  const decimals = hasDecimals ? 1 : 0;
  
  const animatedValue = useCountUp({ 
    end: numericValue, 
    duration: 1200,
    decimals 
  });

  const variantStyles = {
    default: {
      card: "bg-card",
      iconBg: "bg-muted",
      iconColor: "text-muted-foreground",
      ring: "ring-muted",
    },
    primary: {
      card: "bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5",
      iconBg: "bg-primary",
      iconColor: "text-primary-foreground",
      ring: "ring-primary/30",
    },
    accent: {
      card: "bg-gradient-to-br from-orange-500/15 via-orange-500/10 to-orange-500/5",
      iconBg: "bg-gradient-to-br from-orange-500 to-amber-500",
      iconColor: "text-white",
      ring: "ring-orange-500/30",
    },
    info: {
      card: "bg-gradient-to-br from-health-info/15 via-health-info/10 to-health-info/5",
      iconBg: "bg-health-info",
      iconColor: "text-white",
      ring: "ring-health-info/30",
    },
  };

  const styles = variantStyles[variant];

  // Format with commas
  const formattedValue = typeof animatedValue === "number" 
    ? animatedValue.toLocaleString() 
    : Number(animatedValue).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  return (
    <div 
      className={cn(
        "relative p-4 rounded-3xl transition-all duration-300 hover:scale-[1.02] cursor-pointer",
        styles.card,
        className
      )}
    >
      {/* Icon Circle */}
      <div className="flex items-center justify-between mb-3">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shadow-lg ring-4",
          styles.iconBg,
          styles.ring
        )}>
          <Icon className={cn("w-5 h-5", styles.iconColor)} />
        </div>
        
        {trend && trendValue && (
          <span
            className={cn(
              "text-[10px] font-bold px-2 py-1 rounded-full",
              trend === "up" && "bg-primary/20 text-primary",
              trend === "down" && "bg-destructive/20 text-destructive",
              trend === "neutral" && "bg-muted text-muted-foreground"
            )}
          >
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trendValue}
          </span>
        )}
      </div>

      {/* Label */}
      <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">
        {label}
      </p>

      {/* Value */}
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-foreground tracking-tight tabular-nums">
          {formattedValue}
        </span>
        {unit && (
          <span className="text-sm text-muted-foreground font-medium">{unit}</span>
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1 font-medium opacity-80">
          {subtitle}
        </p>
      )}
    </div>
  );
}

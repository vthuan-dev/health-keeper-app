import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "primary" | "accent";
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
  const variantStyles = {
    default: "bg-card",
    primary: "bg-primary/5 border-primary/20",
    accent: "bg-accent border-accent-foreground/10",
  };

  const iconStyles = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent text-accent-foreground",
  };

  return (
    <Card className={cn("border shadow-sm", variantStyles[variant], className)}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className={cn("p-1.5 rounded-lg", iconStyles[variant])}>
            <Icon className="w-4 h-4" />
          </div>
          {trend && trendValue && (
            <span
              className={cn(
                "text-[10px] font-medium px-1.5 py-0.5 rounded-full",
                trend === "up" && "bg-health-success/10 text-health-success",
                trend === "down" && "bg-destructive/10 text-destructive",
                trend === "neutral" && "bg-muted text-muted-foreground"
              )}
            >
              {trend === "up" && "↑"}
              {trend === "down" && "↓"}
              {trendValue}
            </span>
          )}
        </div>

        <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
        <div className="flex items-baseline gap-0.5">
          <span className="text-xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
        </div>
        {subtitle && (
          <p className="text-[10px] text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

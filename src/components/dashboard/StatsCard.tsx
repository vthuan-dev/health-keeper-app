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
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className={cn("p-2 rounded-lg", iconStyles[variant])}>
            <Icon className="w-5 h-5" />
          </div>
          {trend && trendValue && (
            <span
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
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

        <div className="mt-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{label}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

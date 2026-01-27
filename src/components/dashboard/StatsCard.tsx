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
  const variantStyles = {
    default: "bg-card hover:shadow-md",
    primary: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 hover:shadow-primary/10",
    accent: "bg-gradient-to-br from-health-warning/10 to-health-warning/5 border-health-warning/20 hover:shadow-health-warning/10",
    info: "bg-gradient-to-br from-health-info/10 to-health-info/5 border-health-info/20 hover:shadow-health-info/10",
  };

  const iconStyles = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/15 text-primary",
    accent: "bg-health-warning/15 text-health-warning",
    info: "bg-health-info/15 text-health-info",
  };

  return (
    <Card className={cn(
      "border shadow-sm transition-all duration-300 cursor-pointer", 
      variantStyles[variant], 
      className
    )}>
      <CardContent className="p-3.5">
        <div className="flex items-center justify-between mb-3">
          <div className={cn("p-2 rounded-xl", iconStyles[variant])}>
            <Icon className="w-4 h-4" />
          </div>
          {trend && trendValue && (
            <span
              className={cn(
                "text-[10px] font-semibold px-2 py-1 rounded-full",
                trend === "up" && "bg-primary/15 text-primary",
                trend === "down" && "bg-destructive/15 text-destructive",
                trend === "neutral" && "bg-muted text-muted-foreground"
              )}
            >
              {trend === "up" && "↑ "}
              {trend === "down" && "↓ "}
              {trendValue}
            </span>
          )}
        </div>

        <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-foreground tracking-tight">{value}</span>
          {unit && <span className="text-sm text-muted-foreground font-medium">{unit}</span>}
        </div>
        {subtitle && (
          <p className="text-[11px] text-muted-foreground mt-1 font-medium">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
}

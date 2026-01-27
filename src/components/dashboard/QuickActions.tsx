import { Scale, Utensils, Footprints, Pill, Activity, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface QuickAction {
  icon: React.ElementType;
  label: string;
  path: string;
  gradient: string;
  iconColor: string;
}

const actions: QuickAction[] = [
  {
    icon: Scale,
    label: "Cân nặng",
    path: "/health-metrics?tab=weight",
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Utensils,
    label: "Bữa ăn",
    path: "/nutrition",
    gradient: "from-health-warning/20 to-health-warning/5",
    iconColor: "text-health-warning",
  },
  {
    icon: Activity,
    label: "Hoạt động",
    path: "/activities",
    gradient: "from-health-info/20 to-health-info/5",
    iconColor: "text-health-info",
  },
  {
    icon: Heart,
    label: "Sức khỏe",
    path: "/health-metrics",
    gradient: "from-destructive/20 to-destructive/5",
    iconColor: "text-destructive",
  },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-foreground">Thao tác nhanh</h2>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="group flex flex-col items-center gap-2 p-3 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 active:scale-95"
            >
              <div className={cn(
                "p-3 rounded-xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110",
                action.gradient
              )}>
                <Icon className={cn("w-5 h-5", action.iconColor)} />
              </div>
              <span className="text-xs font-semibold text-foreground text-center leading-tight">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

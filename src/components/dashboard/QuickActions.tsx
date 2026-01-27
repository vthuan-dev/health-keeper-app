import { Scale, Utensils, Footprints, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface QuickAction {
  icon: React.ElementType;
  label: string;
  path: string;
  color: string;
  bgColor: string;
}

const actions: QuickAction[] = [
  {
    icon: Scale,
    label: "Cân nặng",
    path: "/health-metrics?tab=weight",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Utensils,
    label: "Bữa ăn",
    path: "/nutrition",
    color: "text-health-warning",
    bgColor: "bg-health-warning/10",
  },
  {
    icon: Footprints,
    label: "Hoạt động",
    path: "/activities",
    color: "text-health-info",
    bgColor: "bg-health-info/10",
  },
  {
    icon: Pill,
    label: "Nhắc nhở",
    path: "/reminders",
    color: "text-health-accent",
    bgColor: "bg-health-accent/10",
  },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="px-4">
      <h2 className="text-sm font-semibold text-foreground mb-3">Thao tác nhanh</h2>
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.path}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border hover:shadow-md transition-all active:scale-95"
            >
              <div className={cn("p-3 rounded-full", action.bgColor)}>
                <Icon className={cn("w-5 h-5", action.color)} />
              </div>
              <span className="text-xs font-medium text-foreground text-center">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

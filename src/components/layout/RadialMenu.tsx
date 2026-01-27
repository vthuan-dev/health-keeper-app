import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Scale, Heart, Activity, Droplets, Utensils, Footprints, Pill, Stethoscope, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuickMenuItem {
  id: string;
  icon: string;
  label: string;
  path: string;
  color: string;
  bgColor: string;
  gradient: string;
}

export const allMenuItems: QuickMenuItem[] = [
  { id: "weight", icon: "Scale", label: "Cân nặng", path: "/health-metrics?tab=weight&add=true", color: "text-primary", bgColor: "bg-primary", gradient: "from-emerald-400 to-teal-500" },
  { id: "blood-pressure", icon: "Heart", label: "Huyết áp", path: "/health-metrics?tab=blood-pressure&add=true", color: "text-rose-500", bgColor: "bg-rose-500", gradient: "from-rose-400 to-pink-500" },
  { id: "heart-rate", icon: "Activity", label: "Nhịp tim", path: "/health-metrics?tab=heart-rate&add=true", color: "text-sky-500", bgColor: "bg-sky-500", gradient: "from-sky-400 to-blue-500" },
  { id: "blood-sugar", icon: "Droplets", label: "Đường huyết", path: "/health-metrics?tab=blood-sugar&add=true", color: "text-amber-500", bgColor: "bg-amber-500", gradient: "from-amber-400 to-orange-500" },
  { id: "meal", icon: "Utensils", label: "Bữa ăn", path: "/nutrition?add=true", color: "text-emerald-500", bgColor: "bg-emerald-500", gradient: "from-green-400 to-emerald-500" },
  { id: "activity", icon: "Footprints", label: "Hoạt động", path: "/activities?add=true", color: "text-violet-500", bgColor: "bg-violet-500", gradient: "from-violet-400 to-purple-500" },
  { id: "medicine", icon: "Pill", label: "Nhắc thuốc", path: "/reminders?add=true", color: "text-cyan-500", bgColor: "bg-cyan-500", gradient: "from-cyan-400 to-teal-500" },
  { id: "appointment", icon: "Stethoscope", label: "Lịch khám", path: "/appointments?add=true", color: "text-orange-500", bgColor: "bg-orange-500", gradient: "from-orange-400 to-red-500" },
];

const defaultSelectedIds = ["weight", "blood-pressure", "heart-rate", "meal", "activity"];

const iconMap: Record<string, LucideIcon> = {
  Scale, Heart, Activity, Droplets, Utensils, Footprints, Pill, Stethoscope
};

export function getSelectedMenuItems(): QuickMenuItem[] {
  const savedIds = localStorage.getItem("quickMenuItems");
  const selectedIds = savedIds ? JSON.parse(savedIds) : defaultSelectedIds;
  return allMenuItems.filter(item => selectedIds.includes(item.id));
}

export function saveSelectedMenuItems(ids: string[]) {
  localStorage.setItem("quickMenuItems", JSON.stringify(ids));
}

interface RadialMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RadialMenu({ isOpen, onClose }: RadialMenuProps) {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  const [menuItems, setMenuItems] = useState<QuickMenuItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setMenuItems(getSelectedMenuItems());
      setMounted(true);
      setTimeout(() => setAnimateItems(true), 50);
    } else {
      setAnimateItems(false);
      const timer = setTimeout(() => setMounted(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleItemClick = (path: string) => {
    onClose();
    setTimeout(() => navigate(path), 250);
  };

  if (!mounted) return null;

  // Calculate positions in a semi-circle above the button (for 5 items)
  const getItemPosition = (index: number, total: number) => {
    const startAngle = -160;
    const endAngle = -20;
    const angleStep = (endAngle - startAngle) / (total - 1);
    const angle = startAngle + (angleStep * index);
    const radian = (angle * Math.PI) / 180;
    const radius = 130;
    
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    };
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop with gradient */}
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-400",
          animateItems 
            ? "bg-gradient-to-t from-background via-background/95 to-background/80 backdrop-blur-md opacity-100" 
            : "opacity-0"
        )}
        onClick={onClose}
      />
      
      {/* Decorative circles */}
      <div className={cn(
        "absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full border border-primary/10 transition-all duration-500",
        animateItems ? "scale-100 opacity-100" : "scale-50 opacity-0"
      )} />
      <div className={cn(
        "absolute bottom-16 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full border border-primary/5 transition-all duration-700",
        animateItems ? "scale-100 opacity-100" : "scale-50 opacity-0"
      )} />
      
      {/* Menu Container */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-7">
        <div className="relative">
          {/* Menu Items */}
          {menuItems.map((item, index) => {
            const Icon = iconMap[item.icon];
            const pos = getItemPosition(index, menuItems.length);
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.path)}
                className={cn(
                  "absolute flex flex-col items-center gap-2 transition-all ease-out group",
                  animateItems 
                    ? "opacity-100 scale-100 duration-400" 
                    : "opacity-0 scale-0 duration-300"
                )}
                style={{
                  transform: animateItems 
                    ? `translate(${pos.x}px, ${pos.y}px)` 
                    : 'translate(0, 0)',
                  transitionDelay: animateItems ? `${index * 50}ms` : `${(menuItems.length - index) * 30}ms`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-32px',
                  marginTop: '-32px',
                }}
              >
                {/* Icon circle with gradient and glow */}
                <div className="relative">
                  <div className={cn(
                    "absolute inset-0 rounded-full blur-lg opacity-50 transition-opacity group-hover:opacity-80",
                    `bg-gradient-to-br ${item.gradient}`
                  )} />
                  <div className={cn(
                    "relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl",
                    "transition-all duration-200 group-hover:scale-110 group-active:scale-95",
                    "ring-4 ring-white/20 dark:ring-white/10",
                    `bg-gradient-to-br ${item.gradient}`
                  )}>
                    <Icon className="w-7 h-7 text-white drop-shadow-md" strokeWidth={2.5} />
                  </div>
                </div>
                
                {/* Label */}
                <span className={cn(
                  "text-xs font-semibold text-foreground whitespace-nowrap",
                  "px-2.5 py-1 rounded-full",
                  "bg-card/90 dark:bg-card/80 backdrop-blur-sm shadow-lg",
                  "border border-border/50",
                  "transition-all duration-200 group-hover:scale-105"
                )}>
                  {item.label}
                </span>
              </button>
            );
          })}
          
          {/* Close Button with glow */}
          <div className="relative">
            <div className={cn(
              "absolute inset-0 rounded-full blur-xl transition-opacity duration-300",
              "bg-gradient-to-br from-primary to-primary/50",
              animateItems ? "opacity-60" : "opacity-0"
            )} />
            <button
              onClick={onClose}
              className={cn(
                "relative w-16 h-16 rounded-full gradient-primary shadow-2xl",
                "flex items-center justify-center transition-all duration-300",
                "ring-4 ring-primary/20",
                "hover:scale-105 active:scale-95",
                animateItems ? "rotate-0" : "rotate-180"
              )}
            >
              <X className="w-7 h-7 text-primary-foreground" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Hint text */}
      <div className={cn(
        "absolute bottom-28 left-0 right-0 text-center transition-all duration-500",
        animateItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <p className="text-xs text-muted-foreground">Chọn để thêm nhanh</p>
      </div>
    </div>
  );
}
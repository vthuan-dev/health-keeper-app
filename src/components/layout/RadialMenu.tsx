import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  X, 
  Weight, 
  HeartPulse, 
  ActivitySquare, 
  Droplet, 
  UtensilsCrossed, 
  Dumbbell, 
  PillBottle, 
  CalendarHeart,
  LucideIcon 
} from "lucide-react";
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
  { id: "weight", icon: "Weight", label: "Cân nặng", path: "/health-metrics?tab=weight&add=true", color: "text-primary", bgColor: "bg-primary", gradient: "from-emerald-400 to-teal-600" },
  { id: "blood-pressure", icon: "HeartPulse", label: "Huyết áp", path: "/health-metrics?tab=blood-pressure&add=true", color: "text-rose-500", bgColor: "bg-rose-500", gradient: "from-rose-400 to-pink-600" },
  { id: "heart-rate", icon: "ActivitySquare", label: "Nhịp tim", path: "/health-metrics?tab=heart-rate&add=true", color: "text-sky-500", bgColor: "bg-sky-500", gradient: "from-sky-400 to-blue-600" },
  { id: "blood-sugar", icon: "Droplet", label: "Đường huyết", path: "/health-metrics?tab=blood-sugar&add=true", color: "text-amber-500", bgColor: "bg-amber-500", gradient: "from-amber-400 to-orange-600" },
  { id: "meal", icon: "UtensilsCrossed", label: "Bữa ăn", path: "/nutrition?add=true", color: "text-emerald-500", bgColor: "bg-emerald-500", gradient: "from-lime-400 to-green-600" },
  { id: "activity", icon: "Dumbbell", label: "Hoạt động", path: "/activities?add=true", color: "text-violet-500", bgColor: "bg-violet-500", gradient: "from-violet-400 to-purple-600" },
  { id: "medicine", icon: "PillBottle", label: "Nhắc thuốc", path: "/reminders?add=true", color: "text-cyan-500", bgColor: "bg-cyan-500", gradient: "from-cyan-400 to-teal-600" },
  { id: "appointment", icon: "CalendarHeart", label: "Lịch khám", path: "/appointments?add=true", color: "text-orange-500", bgColor: "bg-orange-500", gradient: "from-orange-400 to-red-600" },
];

const defaultSelectedIds = ["weight", "blood-pressure", "heart-rate", "meal", "activity"];

const iconMap: Record<string, LucideIcon> = {
  Weight, HeartPulse, ActivitySquare, Droplet, UtensilsCrossed, Dumbbell, PillBottle, CalendarHeart
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
      {/* Subtle backdrop */}
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-300",
          animateItems 
            ? "bg-black/20 backdrop-blur-[2px] opacity-100" 
            : "opacity-0"
        )}
        onClick={onClose}
      />
      
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
                  "absolute transition-all ease-out group",
                  animateItems 
                    ? "opacity-100 scale-100 duration-300" 
                    : "opacity-0 scale-0 duration-200"
                )}
                style={{
                  transform: animateItems 
                    ? `translate(${pos.x}px, ${pos.y}px)` 
                    : 'translate(0, 0)',
                  transitionDelay: animateItems ? `${index * 40}ms` : `${(menuItems.length - index) * 20}ms`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-28px',
                  marginTop: '-28px',
                }}
              >
                {/* Icon circle with gradient */}
                <div className="relative">
                  <div className={cn(
                    "absolute inset-0 rounded-full blur-md opacity-40 transition-opacity group-hover:opacity-70",
                    `bg-gradient-to-br ${item.gradient}`
                  )} />
                  <div className={cn(
                    "relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl",
                    "transition-all duration-200 group-hover:scale-110 group-active:scale-95",
                    `bg-gradient-to-br ${item.gradient}`
                  )}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </button>
            );
          })}
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className={cn(
              "relative w-14 h-14 rounded-full gradient-primary shadow-xl",
              "flex items-center justify-center transition-all duration-300",
              "hover:scale-105 active:scale-95",
              animateItems ? "rotate-0" : "rotate-180"
            )}
          >
            <X className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
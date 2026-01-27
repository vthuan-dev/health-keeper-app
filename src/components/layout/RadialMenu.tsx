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
}

export const allMenuItems: QuickMenuItem[] = [
  { id: "weight", icon: "Scale", label: "Cân nặng", path: "/health-metrics?tab=weight&add=true", color: "text-primary", bgColor: "bg-primary" },
  { id: "blood-pressure", icon: "Heart", label: "Huyết áp", path: "/health-metrics?tab=blood-pressure&add=true", color: "text-rose-500", bgColor: "bg-rose-500" },
  { id: "heart-rate", icon: "Activity", label: "Nhịp tim", path: "/health-metrics?tab=heart-rate&add=true", color: "text-sky-500", bgColor: "bg-sky-500" },
  { id: "blood-sugar", icon: "Droplets", label: "Đường huyết", path: "/health-metrics?tab=blood-sugar&add=true", color: "text-amber-500", bgColor: "bg-amber-500" },
  { id: "meal", icon: "Utensils", label: "Bữa ăn", path: "/nutrition?add=true", color: "text-emerald-500", bgColor: "bg-emerald-500" },
  { id: "activity", icon: "Footprints", label: "Hoạt động", path: "/activities?add=true", color: "text-violet-500", bgColor: "bg-violet-500" },
  { id: "medicine", icon: "Pill", label: "Nhắc thuốc", path: "/reminders?add=true", color: "text-cyan-500", bgColor: "bg-cyan-500" },
  { id: "appointment", icon: "Stethoscope", label: "Lịch khám", path: "/appointments?add=true", color: "text-orange-500", bgColor: "bg-orange-500" },
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
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleItemClick = (path: string) => {
    onClose();
    setTimeout(() => navigate(path), 200);
  };

  if (!mounted) return null;

  // Calculate positions in a semi-circle above the button (for 5 items)
  const getItemPosition = (index: number, total: number) => {
    const startAngle = -150;
    const endAngle = -30;
    const angleStep = (endAngle - startAngle) / (total - 1);
    const angle = startAngle + (angleStep * index);
    const radian = (angle * Math.PI) / 180;
    const radius = 100;
    
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    };
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
          animateItems ? "opacity-100" : "opacity-0"
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
                  "absolute flex flex-col items-center gap-1.5 transition-all duration-300 ease-out",
                  animateItems ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )}
                style={{
                  transform: animateItems 
                    ? `translate(${pos.x}px, ${pos.y}px)` 
                    : 'translate(0, 0)',
                  transitionDelay: `${index * 40}ms`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-28px',
                  marginTop: '-28px',
                }}
              >
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95",
                  item.bgColor
                )}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-[10px] font-semibold text-foreground whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className={cn(
              "relative w-14 h-14 rounded-full gradient-primary shadow-xl flex items-center justify-center transition-all duration-300",
              animateItems ? "rotate-0" : "rotate-45"
            )}
          >
            <X className="w-6 h-6 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Scale, Heart, Activity, Droplets, Utensils, Footprints, Pill, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
  color: string;
  bgColor: string;
}

const menuItems: MenuItem[] = [
  { icon: Scale, label: "Cân nặng", path: "/health-metrics?tab=weight&add=true", color: "text-primary", bgColor: "bg-primary" },
  { icon: Heart, label: "Huyết áp", path: "/health-metrics?tab=blood-pressure&add=true", color: "text-rose-500", bgColor: "bg-rose-500" },
  { icon: Activity, label: "Nhịp tim", path: "/health-metrics?tab=heart-rate&add=true", color: "text-sky-500", bgColor: "bg-sky-500" },
  { icon: Droplets, label: "Đường huyết", path: "/health-metrics?tab=blood-sugar&add=true", color: "text-amber-500", bgColor: "bg-amber-500" },
  { icon: Utensils, label: "Bữa ăn", path: "/nutrition?add=true", color: "text-emerald-500", bgColor: "bg-emerald-500" },
  { icon: Footprints, label: "Hoạt động", path: "/activities?add=true", color: "text-violet-500", bgColor: "bg-violet-500" },
  { icon: Pill, label: "Nhắc thuốc", path: "/reminders?add=true", color: "text-cyan-500", bgColor: "bg-cyan-500" },
  { icon: Stethoscope, label: "Lịch khám", path: "/appointments?add=true", color: "text-orange-500", bgColor: "bg-orange-500" },
];

interface RadialMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RadialMenu({ isOpen, onClose }: RadialMenuProps) {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Small delay for staggered animation
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

  // Calculate positions in a semi-circle above the button
  const getItemPosition = (index: number, total: number) => {
    // Arrange items in an arc from -135deg to -45deg (upper semicircle)
    const startAngle = -150;
    const endAngle = -30;
    const angleStep = (endAngle - startAngle) / (total - 1);
    const angle = startAngle + (angleStep * index);
    const radian = (angle * Math.PI) / 180;
    const radius = 120; // Distance from center
    
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
      
      {/* Menu Container - positioned at bottom center */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-7">
        <div className="relative">
          {/* Menu Items */}
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const pos = getItemPosition(index, menuItems.length);
            
            return (
              <button
                key={item.path}
                onClick={() => handleItemClick(item.path)}
                className={cn(
                  "absolute flex flex-col items-center gap-1 transition-all duration-300 ease-out",
                  animateItems 
                    ? "opacity-100 scale-100" 
                    : "opacity-0 scale-50"
                )}
                style={{
                  transform: animateItems 
                    ? `translate(${pos.x}px, ${pos.y}px)` 
                    : 'translate(0, 0)',
                  transitionDelay: `${index * 30}ms`,
                  left: '50%',
                  top: '50%',
                  marginLeft: '-24px',
                  marginTop: '-24px',
                }}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95",
                  item.bgColor
                )}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] font-medium text-foreground whitespace-nowrap bg-card/90 px-2 py-0.5 rounded-full shadow-sm">
                  {item.label}
                </span>
              </button>
            );
          })}
          
          {/* Close Button (center) */}
          <button
            onClick={onClose}
            className={cn(
              "relative w-12 h-12 rounded-full gradient-primary shadow-lg flex items-center justify-center transition-all duration-300",
              animateItems ? "rotate-0" : "rotate-45"
            )}
          >
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}
import { Home, Activity, BarChart3, User, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { RadialMenu } from "./RadialMenu";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  isCenter?: boolean;
}

const navItems: NavItem[] = [
  { icon: Home, label: "Trang chủ", path: "/" },
  { icon: Activity, label: "Hoạt động", path: "/activities" },
  { icon: Plus, label: "Thêm", path: "/add", isCenter: true },
  { icon: BarChart3, label: "Thống kê", path: "/statistics" },
  { icon: User, label: "Hồ sơ", path: "/profile" },
];

export function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <RadialMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border pb-safe">
        <div className="flex items-center justify-around h-14 max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            if (item.isCenter) {
              return (
                <button
                  key={item.path}
                  onClick={() => setIsMenuOpen(true)}
                  className={cn(
                    "relative -mt-5 flex items-center justify-center w-12 h-12 rounded-full gradient-primary shadow-health transition-all duration-300",
                    isMenuOpen 
                      ? "rotate-45 scale-90" 
                      : "rotate-0 scale-100 hover:scale-105 active:scale-95"
                  )}
                  aria-label={item.label}
                >
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </button>
              );
            }

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors min-w-[56px]",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}

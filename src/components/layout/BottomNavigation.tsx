import { Home, Activity, BarChart3, User, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

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

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border pb-safe">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          if (item.isCenter) {
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative -mt-6 flex items-center justify-center w-14 h-14 rounded-full gradient-primary shadow-health-lg transition-transform hover:scale-105 active:scale-95"
                aria-label={item.label}
              >
                <Icon className="w-6 h-6 text-primary-foreground" />
              </button>
            );
          }

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={item.label}
            >
              <Icon className={cn("w-5 h-5", active && "animate-bounce-soft")} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

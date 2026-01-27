import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  userName?: string;
  avatarUrl?: string;
}

export function DashboardHeader({ userName = "Nguyễn Văn A", avatarUrl }: DashboardHeaderProps) {
  const navigate = useNavigate();
  const greeting = getGreeting();
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(-2)
    .toUpperCase();

  return (
    <header className="flex items-center justify-between px-4 py-4 bg-gradient-to-r from-primary/5 to-transparent">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="w-12 h-12 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
            <AvatarImage src={avatarUrl} alt={userName} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-health-accent text-primary-foreground font-bold text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground font-medium">{greeting}</p>
          <h1 className="text-lg font-bold text-foreground tracking-tight">{userName}</h1>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative w-10 h-10 rounded-full hover:bg-primary/10"
          onClick={() => navigate("/notifications")}
        >
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="w-10 h-10 rounded-full hover:bg-primary/10"
          onClick={() => navigate("/profile")}
        >
          <Settings className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Chào buổi sáng 👋";
  if (hour < 18) return "Chào buổi chiều ☀️";
  return "Chào buổi tối 🌙";
}

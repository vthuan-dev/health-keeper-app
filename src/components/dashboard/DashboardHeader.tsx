import { Bell, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName?: string;
  avatarUrl?: string;
}

export function DashboardHeader({ userName = "Nguyễn Văn A", avatarUrl }: DashboardHeaderProps) {
  const greeting = getGreeting();
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(-2)
    .toUpperCase();

  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2.5">
        <Avatar className="w-10 h-10 border-2 border-primary/20">
          <AvatarImage src={avatarUrl} alt={userName} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xs text-muted-foreground">{greeting}</p>
          <h1 className="text-base font-semibold text-foreground">{userName}</h1>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative w-9 h-9">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-destructive rounded-full" />
        </Button>
        <Button variant="ghost" size="icon" className="w-9 h-9">
          <Settings className="w-4 h-4" />
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

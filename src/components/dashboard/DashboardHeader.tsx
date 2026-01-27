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
    <header className="flex items-center justify-between px-4 py-4">
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12 border-2 border-primary/20">
          <AvatarImage src={avatarUrl} alt={userName} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-muted-foreground">{greeting}</p>
          <h1 className="text-lg font-semibold text-foreground">{userName}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="w-5 h-5" />
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

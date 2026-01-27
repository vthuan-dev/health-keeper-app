import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarUrl?: string;
  initials?: string;
}

export function ProfileHeader({ name, email, avatarUrl, initials = "NA" }: ProfileHeaderProps) {
  return (
    <div className="text-center mb-4">
      <div className="relative inline-block">
        <Avatar className="w-20 h-20 border-4 border-primary/20">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback className="text-xl bg-primary/10 text-primary">{initials}</AvatarFallback>
        </Avatar>
        <Button
          size="icon"
          className="absolute bottom-0 right-0 w-7 h-7 rounded-full gradient-primary"
        >
          <Camera className="w-3.5 h-3.5" />
        </Button>
      </div>
      <h1 className="text-lg font-bold mt-2">{name}</h1>
      <p className="text-xs text-muted-foreground">{email}</p>
    </div>
  );
}

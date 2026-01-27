import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatarUrl?: string;
  initials?: string;
}

export function ProfileHeader({ name, email, avatarUrl, initials = "NA" }: ProfileHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 h-32 gradient-primary rounded-b-3xl" />
      
      {/* Settings Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 z-10"
        onClick={() => navigate("/profile/edit")}
      >
        <Settings className="w-5 h-5" />
      </Button>
      
      {/* Profile Content */}
      <div className="relative pt-16 pb-4 flex flex-col items-center">
        {/* Avatar with glow effect */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl scale-110" />
          <Avatar className="w-24 h-24 border-4 border-background shadow-xl relative">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary/20 to-primary/40 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full gradient-primary shadow-lg border-2 border-background"
          >
            <Camera className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Name & Email */}
        <h1 className="text-xl font-bold mt-4">{name}</h1>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}

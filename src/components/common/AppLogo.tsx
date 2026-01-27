import { Heart, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function AppLogo({ size = "md", showText = true, className }: AppLogoProps) {
  const sizeConfig = {
    sm: { icon: "w-6 h-6", container: "w-10 h-10", text: "text-lg" },
    md: { icon: "w-8 h-8", container: "w-14 h-14", text: "text-xl" },
    lg: { icon: "w-12 h-12", container: "w-20 h-20", text: "text-2xl" },
  };

  const config = sizeConfig[size];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className={cn("relative gradient-primary rounded-2xl flex items-center justify-center shadow-health", config.container)}>
        <Heart className={cn("text-primary-foreground", config.icon)} fill="currentColor" />
        <Leaf 
          className="absolute -bottom-1 -right-1 w-5 h-5 text-health-accent rotate-45" 
          fill="currentColor"
        />
      </div>
      {showText && (
        <h1 className={cn("font-bold text-foreground", config.text)}>
          Health<span className="text-primary">Care</span>
        </h1>
      )}
    </div>
  );
}

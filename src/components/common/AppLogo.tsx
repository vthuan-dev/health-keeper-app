import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo.png";

interface AppLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function AppLogo({ size = "md", showText = true, className }: AppLogoProps) {
  const sizeConfig = {
    sm: { logo: "w-12 h-12", text: "text-lg" },
    md: { logo: "w-16 h-16", text: "text-xl" },
    lg: { logo: "w-24 h-24", text: "text-2xl" },
  };

  const config = sizeConfig[size];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <img 
        src={logoImage} 
        alt="HealthCare Logo" 
        className={cn("object-contain drop-shadow-lg", config.logo)}
      />
      {showText && (
        <h1 className={cn("font-bold text-foreground", config.text)}>
          Health<span className="text-primary">Care</span>
        </h1>
      )}
    </div>
  );
}

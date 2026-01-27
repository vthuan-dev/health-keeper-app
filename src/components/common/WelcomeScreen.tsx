import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo.png";

interface WelcomeScreenProps {
  onComplete: () => void;
}

export function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [stage, setStage] = useState(0);
  // Stage 0: Initial
  // Stage 1: Logo appears
  // Stage 2: Text appears  
  // Stage 3: Fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 100),
      setTimeout(() => setStage(2), 600),
      setTimeout(() => setStage(3), 2000),
      setTimeout(() => onComplete(), 2500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-500",
        stage >= 3 ? "opacity-0" : "opacity-100"
      )}
      style={{
        background: "linear-gradient(180deg, #3B82F6 0%, #60A5FA 15%, #FFFFFF 40%, #FFFFFF 60%, #60A5FA 85%, #3B82F6 100%)"
      }}
    >
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(
          "absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5 transition-all duration-1000",
          stage >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )} />
        <div className={cn(
          "absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-white/5 transition-all duration-1000 delay-200",
          stage >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )} />
        <div className={cn(
          "absolute top-1/4 right-10 w-20 h-20 rounded-full bg-white/10 transition-all duration-700 delay-300",
          stage >= 1 ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )} />
        <div className={cn(
          "absolute bottom-1/3 left-10 w-16 h-16 rounded-full bg-white/10 transition-all duration-700 delay-500",
          stage >= 1 ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )} />
      </div>

      {/* Logo */}
      <div className={cn(
        "relative transition-all duration-700 ease-out",
        stage >= 1 ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 translate-y-10"
      )}>
        {/* Glow effect */}
        <div className="absolute inset-0 blur-3xl bg-white/30 rounded-full scale-150" />
        
        {/* Logo container with pulse animation */}
        <div className={cn(
          "relative w-32 h-32 flex items-center justify-center",
          stage >= 1 && stage < 3 ? "animate-pulse" : ""
        )}>
          <img 
            src={logoImage} 
            alt="HealthCare Logo" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* App Name */}
      <div className={cn(
        "mt-8 text-center transition-all duration-500 delay-100",
        stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}>
        <h1 className="text-3xl font-bold text-white tracking-wide">
          Health<span className="text-emerald-200">Care</span>
        </h1>
        <p className={cn(
          "text-white/70 text-sm mt-2 transition-all duration-500 delay-300",
          stage >= 2 ? "opacity-100" : "opacity-0"
        )}>
          Chăm sóc sức khỏe mỗi ngày
        </p>
      </div>

      {/* Loading dots */}
      <div className={cn(
        "absolute bottom-20 flex gap-2 transition-all duration-500",
        stage >= 2 ? "opacity-100" : "opacity-0"
      )}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-white/60"
            style={{
              animation: stage >= 2 ? `bounce 1s ease-in-out ${i * 0.15}s infinite` : 'none',
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
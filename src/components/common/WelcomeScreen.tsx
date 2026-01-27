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
      setTimeout(() => setStage(3), 2500),
      setTimeout(() => onComplete(), 3000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div 
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-500 max-w-md mx-auto",
        stage >= 3 ? "opacity-0" : "opacity-100"
      )}
      style={{
        background: "linear-gradient(180deg, #3B82F6 0%, #60A5FA 15%, #FFFFFF 40%, #FFFFFF 60%, #60A5FA 85%, #3B82F6 100%)"
      }}
    >
      {/* Floating bubbles - smaller on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/30 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 25 + 10}px`,
              height: `${Math.random() * 25 + 10}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20 + 10}%`,
              animation: `floatUp ${Math.random() * 4 + 4}s ease-in-out ${Math.random() * 2}s infinite`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
        {/* Larger decorative bubbles */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`large-${i}`}
            className="absolute rounded-full border border-white/20 bg-white/10"
            style={{
              width: `${Math.random() * 50 + 40}px`,
              height: `${Math.random() * 50 + 40}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 30 + 20}%`,
              animation: `floatUp ${Math.random() * 6 + 6}s ease-in-out ${Math.random() * 3}s infinite`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      {/* Decorative circles - responsive sizes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={cn(
          "absolute -top-16 -left-16 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-blue-400/10 transition-all duration-1000",
          stage >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )} />
        <div className={cn(
          "absolute -bottom-20 -right-20 w-52 h-52 sm:w-96 sm:h-96 rounded-full bg-blue-400/10 transition-all duration-1000 delay-200",
          stage >= 1 ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )} />
        <div className={cn(
          "absolute top-1/4 right-4 w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-blue-300/20 transition-all duration-700 delay-300",
          stage >= 1 ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )} />
        <div className={cn(
          "absolute bottom-1/3 left-4 w-10 h-10 sm:w-16 sm:h-16 rounded-full bg-blue-300/20 transition-all duration-700 delay-500",
          stage >= 1 ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )} />
      </div>

      {/* Logo - responsive size */}
      <div className={cn(
        "relative transition-all duration-700 ease-out",
        stage >= 1 ? "scale-100 opacity-100 translate-y-0" : "scale-50 opacity-0 translate-y-10"
      )}>
        {/* Glow effect */}
        <div className="absolute inset-0 blur-3xl bg-white/30 rounded-full scale-150" />
        
        {/* Logo container with pulse animation - responsive */}
        <div className={cn(
          "relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center",
          stage >= 1 && stage < 3 ? "animate-pulse" : ""
        )}>
          <img 
            src={logoImage} 
            alt="HealthCare Logo" 
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* App Name - responsive text */}
      <div className={cn(
        "mt-6 sm:mt-8 text-center transition-all duration-500 delay-100 px-4",
        stage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      )}>
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 tracking-wide">
          Health<span className="text-blue-400">Care</span>
        </h1>
        <p className={cn(
          "text-blue-500/70 text-xs sm:text-sm mt-2 transition-all duration-500 delay-300",
          stage >= 2 ? "opacity-100" : "opacity-0"
        )}>
          Chăm sóc sức khỏe mỗi ngày
        </p>
      </div>

      {/* Loading dots - responsive position */}
      <div className={cn(
        "absolute bottom-16 sm:bottom-20 flex gap-2 transition-all duration-500",
        stage >= 2 ? "opacity-100" : "opacity-0"
      )}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-blue-500/60"
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
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) scale(0.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
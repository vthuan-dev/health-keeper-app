import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animation?: "fade-up" | "fade-in" | "scale" | "slide-left" | "slide-right";
}

export function AnimatedContainer({ 
  children, 
  delay = 0, 
  className,
  animation = "fade-up"
}: AnimatedContainerProps) {
  const animationClasses = {
    "fade-up": "animate-[fadeUp_0.5s_ease-out_forwards]",
    "fade-in": "animate-[fadeIn_0.4s_ease-out_forwards]",
    "scale": "animate-[scaleIn_0.4s_ease-out_forwards]",
    "slide-left": "animate-[slideLeft_0.4s_ease-out_forwards]",
    "slide-right": "animate-[slideRight_0.4s_ease-out_forwards]",
  };

  return (
    <div
      className={cn(
        "opacity-0",
        animationClasses[animation],
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// Staggered list animation wrapper
interface StaggeredListProps {
  children: ReactNode[];
  baseDelay?: number;
  staggerDelay?: number;
  className?: string;
  animation?: "fade-up" | "fade-in" | "scale" | "slide-left" | "slide-right";
}

export function StaggeredList({
  children,
  baseDelay = 100,
  staggerDelay = 80,
  className,
  animation = "fade-up"
}: StaggeredListProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimatedContainer
          key={index}
          delay={baseDelay + index * staggerDelay}
          animation={animation}
        >
          {child}
        </AnimatedContainer>
      ))}
    </div>
  );
}

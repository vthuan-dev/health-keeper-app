import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = (pass: string): { level: number; label: string; color: string } => {
    if (!pass) return { level: 0, label: "", color: "" };
    
    let score = 0;
    
    // Length checks
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    
    // Character type checks
    if (/[a-z]/.test(pass)) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^a-zA-Z0-9]/.test(pass)) score++;

    if (score <= 2) return { level: 1, label: "Yếu", color: "bg-destructive" };
    if (score <= 4) return { level: 2, label: "Trung bình", color: "bg-health-warning" };
    if (score <= 5) return { level: 3, label: "Mạnh", color: "bg-health-info" };
    return { level: 4, label: "Rất mạnh", color: "bg-primary" };
  };

  const strength = getStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i <= strength.level ? strength.color : "bg-muted"
            )}
          />
        ))}
      </div>
      <p className={cn(
        "text-[10px] font-medium",
        strength.level === 1 && "text-destructive",
        strength.level === 2 && "text-health-warning",
        strength.level === 3 && "text-health-info",
        strength.level === 4 && "text-primary"
      )}>
        Độ mạnh: {strength.label}
      </p>
    </div>
  );
}

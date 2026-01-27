import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SettingItemProps {
  icon: React.ElementType;
  label: string;
  description?: string;
  hasSwitch?: boolean;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  onClick?: () => void;
  to?: string;
  isDestructive?: boolean;
}

export function SettingItem({ 
  icon: Icon, 
  label,
  description,
  hasSwitch, 
  checked,
  onCheckedChange,
  onClick,
  to,
  isDestructive 
}: SettingItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (hasSwitch) return;
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={cn(
        "flex items-center gap-3 px-4 py-3.5 transition-all duration-200",
        !hasSwitch && "cursor-pointer hover:bg-muted/50 active:scale-[0.99]"
      )}
      onClick={handleClick}
    >
      <div className={cn(
        "p-2 rounded-xl",
        isDestructive 
          ? "bg-destructive/10" 
          : "bg-muted"
      )}>
        <Icon className={cn(
          "w-4.5 h-4.5",
          isDestructive ? "text-destructive" : "text-foreground"
        )} />
      </div>
      
      <div className="flex-1 min-w-0">
        <span className={cn(
          "text-sm font-medium block",
          isDestructive && "text-destructive"
        )}>
          {label}
        </span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
      
      {hasSwitch ? (
        <Switch 
          checked={checked} 
          onCheckedChange={onCheckedChange}
        />
      ) : (
        <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
      )}
    </div>
  );
}

interface SettingsListProps {
  title?: string;
  children: React.ReactNode;
}

export function SettingsList({ title, children }: SettingsListProps) {
  return (
    <div className="px-4 mt-4">
      {title && (
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
          {title}
        </h3>
      )}
      <Card className="overflow-hidden">
        <CardContent className="p-0 divide-y divide-border/50">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}

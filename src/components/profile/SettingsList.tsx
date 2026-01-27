import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SettingItemProps {
  icon: React.ElementType;
  label: string;
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
      className={`flex items-center justify-between px-3 py-2.5 ${!hasSwitch ? 'cursor-pointer hover:bg-muted/50 active:bg-muted transition-colors' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2.5">
        <Icon className={`w-4 h-4 ${isDestructive ? "text-destructive" : "text-muted-foreground"}`} />
        <span className={`text-sm ${isDestructive ? "text-destructive" : ""}`}>{label}</span>
      </div>
      {hasSwitch ? (
        <Switch 
          checked={checked} 
          onCheckedChange={onCheckedChange}
          className="scale-90" 
        />
      ) : (
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      )}
    </div>
  );
}

interface SettingsListProps {
  children: React.ReactNode;
}

export function SettingsList({ children }: SettingsListProps) {
  return (
    <Card>
      <CardContent className="p-0 divide-y divide-border">
        {children}
      </CardContent>
    </Card>
  );
}

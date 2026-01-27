import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Camera, 
  User, 
  Bell, 
  Moon, 
  Shield, 
  HelpCircle, 
  LogOut,
  ChevronRight,
  Scale,
  Ruler,
  Calendar
} from "lucide-react";

export default function Profile() {
  return (
    <AppLayout>
      <div className="px-4 py-4 animate-fade-in">
        {/* Profile Header */}
        <div className="text-center mb-4">
          <div className="relative inline-block">
            <Avatar className="w-20 h-20 border-4 border-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="text-xl bg-primary/10 text-primary">NA</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full gradient-primary"
            >
              <Camera className="w-3.5 h-3.5" />
            </Button>
          </div>
          <h1 className="text-lg font-bold mt-2">Nguyễn Văn A</h1>
          <p className="text-xs text-muted-foreground">nguyenvana@email.com</p>
        </div>

        {/* Health Stats */}
        <Card className="mb-4">
          <CardContent className="p-3">
            <h2 className="text-xs font-semibold mb-2 text-muted-foreground">THÔNG TIN SỨC KHỎE</h2>
            <div className="grid grid-cols-4 gap-2 text-center">
              <StatItem icon={Calendar} value="32" label="Tuổi" color="text-primary" bg="bg-primary/10" />
              <StatItem icon={Ruler} value="175" label="cm" color="text-health-info" bg="bg-health-info/10" />
              <StatItem icon={Scale} value="68.5" label="kg" color="text-health-accent" bg="bg-health-accent/10" />
              <StatItem icon={User} value="22.4" label="BMI" color="text-primary" bg="bg-primary/10" />
            </div>
          </CardContent>
        </Card>

        {/* Settings List */}
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            <SettingItem icon={User} label="Chỉnh sửa hồ sơ" />
            <SettingItem icon={Bell} label="Thông báo" hasSwitch defaultChecked />
            <SettingItem icon={Moon} label="Chế độ tối" hasSwitch />
            <SettingItem icon={Shield} label="Quyền riêng tư" />
            <SettingItem icon={HelpCircle} label="Trợ giúp" />
            <SettingItem icon={LogOut} label="Đăng xuất" isDestructive />
          </CardContent>
        </Card>

        <p className="text-center text-[10px] text-muted-foreground mt-4">
          Phiên bản 1.0.0
        </p>
      </div>
    </AppLayout>
  );
}

interface StatItemProps {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
  bg: string;
}

function StatItem({ icon: Icon, value, label, color, bg }: StatItemProps) {
  return (
    <div>
      <div className={`p-1.5 rounded-full ${bg} w-8 h-8 flex items-center justify-center mx-auto mb-1`}>
        <Icon className={`w-3.5 h-3.5 ${color}`} />
      </div>
      <p className="text-sm font-bold">{value}</p>
      <p className="text-[9px] text-muted-foreground">{label}</p>
    </div>
  );
}

interface SettingItemProps {
  icon: React.ElementType;
  label: string;
  hasSwitch?: boolean;
  defaultChecked?: boolean;
  isDestructive?: boolean;
}

function SettingItem({ icon: Icon, label, hasSwitch, defaultChecked, isDestructive }: SettingItemProps) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5">
      <div className="flex items-center gap-2.5">
        <Icon className={`w-4 h-4 ${isDestructive ? "text-destructive" : "text-muted-foreground"}`} />
        <span className={`text-sm ${isDestructive ? "text-destructive" : ""}`}>{label}</span>
      </div>
      {hasSwitch ? (
        <Switch defaultChecked={defaultChecked} className="scale-90" />
      ) : (
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      )}
    </div>
  );
}

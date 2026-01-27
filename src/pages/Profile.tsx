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
      <div className="px-4 py-6 animate-fade-in">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">NA</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-primary"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          <h1 className="text-xl font-bold mt-3">Nguyễn Văn A</h1>
          <p className="text-sm text-muted-foreground">nguyenvana@email.com</p>
        </div>

        {/* Health Stats */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h2 className="text-sm font-semibold mb-3">Thông tin sức khỏe</h2>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="p-2 rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mx-auto mb-1">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <p className="text-lg font-bold">32</p>
                <p className="text-xs text-muted-foreground">Tuổi</p>
              </div>
              <div>
                <div className="p-2 rounded-full bg-health-info/10 w-10 h-10 flex items-center justify-center mx-auto mb-1">
                  <Ruler className="w-4 h-4 text-health-info" />
                </div>
                <p className="text-lg font-bold">175</p>
                <p className="text-xs text-muted-foreground">cm</p>
              </div>
              <div>
                <div className="p-2 rounded-full bg-health-accent/10 w-10 h-10 flex items-center justify-center mx-auto mb-1">
                  <Scale className="w-4 h-4 text-health-accent" />
                </div>
                <p className="text-lg font-bold">68.5</p>
                <p className="text-xs text-muted-foreground">kg</p>
              </div>
              <div>
                <div className="p-2 rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mx-auto mb-1">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <p className="text-lg font-bold">22.4</p>
                <p className="text-xs text-muted-foreground">BMI</p>
              </div>
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
            <SettingItem icon={HelpCircle} label="Trợ giúp & Hỗ trợ" />
            <SettingItem icon={LogOut} label="Đăng xuất" isDestructive />
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Phiên bản 1.0.0
        </p>
      </div>
    </AppLayout>
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
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        <Icon className={`w-5 h-5 ${isDestructive ? "text-destructive" : "text-muted-foreground"}`} />
        <span className={`font-medium ${isDestructive ? "text-destructive" : ""}`}>{label}</span>
      </div>
      {hasSwitch ? (
        <Switch defaultChecked={defaultChecked} />
      ) : (
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      )}
    </div>
  );
}

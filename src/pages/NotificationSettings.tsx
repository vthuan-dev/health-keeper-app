import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Pill, Dumbbell, Activity, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface NotificationSettings {
  medicine: boolean;
  exercise: boolean;
  metrics: boolean;
  weeklyReport: boolean;
}

const defaultSettings: NotificationSettings = {
  medicine: true,
  exercise: true,
  metrics: false,
  weeklyReport: true,
};

export default function NotificationSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem("notificationSettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (key: keyof NotificationSettings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    localStorage.setItem("notificationSettings", JSON.stringify(newSettings));
    toast({
      title: newSettings[key] ? "Đã bật thông báo" : "Đã tắt thông báo",
      description: `Cài đặt thông báo đã được cập nhật.`,
    });
  };

  const notifications = [
    {
      key: "medicine" as const,
      icon: Pill,
      title: "Nhắc nhở uống thuốc",
      description: "Nhận thông báo khi đến giờ uống thuốc",
      color: "text-health-warning",
      bg: "bg-health-warning/10",
    },
    {
      key: "exercise" as const,
      icon: Dumbbell,
      title: "Nhắc nhở tập thể dục",
      description: "Nhận thông báo về lịch tập luyện",
      color: "text-health-accent",
      bg: "bg-health-accent/10",
    },
    {
      key: "metrics" as const,
      icon: Activity,
      title: "Nhắc nhở đo chỉ số",
      description: "Nhắc đo huyết áp, đường huyết, cân nặng",
      color: "text-health-danger",
      bg: "bg-health-danger/10",
    },
    {
      key: "weeklyReport" as const,
      icon: Calendar,
      title: "Báo cáo sức khỏe hàng tuần",
      description: "Nhận tổng kết sức khỏe mỗi tuần",
      color: "text-health-info",
      bg: "bg-health-info/10",
    },
  ];

  return (
    <AppLayout>
      <div className="px-4 py-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">Cài đặt thông báo</h1>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Quản lý các loại thông báo bạn muốn nhận từ ứng dụng
        </p>

        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {notifications.map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${item.bg}`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <Switch
                  checked={settings[item.key]}
                  onCheckedChange={() => handleToggle(item.key)}
                  className="scale-90"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <p className="text-center text-[10px] text-muted-foreground mt-4">
          Bạn có thể thay đổi cài đặt này bất cứ lúc nào
        </p>
      </div>
    </AppLayout>
  );
}

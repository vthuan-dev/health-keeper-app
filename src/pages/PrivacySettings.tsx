import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  ArrowLeft, 
  Eye, 
  Lock, 
  Trash2, 
  Shield 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PrivacySettings {
  hideHealthInfo: boolean;
  requireAuth: boolean;
}

const defaultSettings: PrivacySettings = {
  hideHealthInfo: false,
  requireAuth: false,
};

export default function PrivacySettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState<PrivacySettings>(defaultSettings);

  useEffect(() => {
    const saved = localStorage.getItem("privacySettings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleToggle = (key: keyof PrivacySettings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    localStorage.setItem("privacySettings", JSON.stringify(newSettings));
    toast({
      title: "Đã cập nhật",
      description: "Cài đặt quyền riêng tư đã được lưu.",
    });
  };

  const handleDeleteData = () => {
    localStorage.clear();
    toast({
      title: "Đã xóa dữ liệu",
      description: "Tất cả dữ liệu cá nhân đã được xóa.",
      variant: "destructive",
    });
    navigate("/auth");
  };

  return (
    <AppLayout>
      <div className="px-4 py-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">Quyền riêng tư</h1>
        </div>

        <p className="text-xs text-muted-foreground mb-4">
          Quản lý cài đặt bảo mật và quyền riêng tư của bạn
        </p>

        {/* Privacy Options */}
        <Card className="mb-4">
          <CardContent className="p-0 divide-y divide-border">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Eye className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Ẩn thông tin sức khỏe</p>
                  <p className="text-xs text-muted-foreground">Che các chỉ số trên màn hình chính</p>
                </div>
              </div>
              <Switch
                checked={settings.hideHealthInfo}
                onCheckedChange={() => handleToggle("hideHealthInfo")}
                className="scale-90"
              />
            </div>

            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-health-info/10">
                  <Lock className="w-4 h-4 text-health-info" />
                </div>
                <div>
                  <p className="text-sm font-medium">Xác thực khi mở app</p>
                  <p className="text-xs text-muted-foreground">Yêu cầu mật khẩu/vân tay mỗi lần mở</p>
                </div>
              </div>
              <Switch
                checked={settings.requireAuth}
                onCheckedChange={() => handleToggle("requireAuth")}
                className="scale-90"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Info */}
        <Card className="mb-4">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Bảo mật dữ liệu</p>
                <p className="text-xs text-muted-foreground">
                  Dữ liệu của bạn được mã hóa và lưu trữ an toàn trên thiết bị
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delete Data */}
        <Card className="border-destructive/20">
          <CardContent className="p-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-destructive/10">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-destructive">Xóa tất cả dữ liệu</p>
                      <p className="text-xs text-muted-foreground">Xóa vĩnh viễn toàn bộ dữ liệu cá nhân</p>
                    </div>
                  </div>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-[90%] rounded-lg">
                <AlertDialogHeader>
                  <AlertDialogTitle>Xác nhận xóa dữ liệu?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Hành động này không thể hoàn tác. Tất cả dữ liệu sức khỏe, cài đặt và thông tin cá nhân sẽ bị xóa vĩnh viễn.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Hủy</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteData} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Xóa dữ liệu
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

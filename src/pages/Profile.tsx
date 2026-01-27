import { AppLayout } from "@/components/layout/AppLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { HealthStatsCard } from "@/components/profile/HealthStatsCard";
import { SettingsList, SettingItem } from "@/components/profile/SettingsList";
import { 
  User, 
  Bell, 
  Moon, 
  Shield, 
  HelpCircle, 
  LogOut 
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { toast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  age: number;
  height: number;
  weight: number;
}

const defaultProfile: UserProfile = {
  name: "Nguyễn Văn A",
  email: "nguyenvana@email.com",
  age: 32,
  height: 175,
  weight: 68.5,
};

export default function Profile() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    const savedNotifications = localStorage.getItem("notificationsEnabled");
    if (savedNotifications !== null) {
      setNotificationsEnabled(JSON.parse(savedNotifications));
    }
  }, []);

  const loadProfile = () => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  };

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    loadProfile();
    toast({
      title: "Đã cập nhật!",
      description: "Hồ sơ đã được làm mới.",
    });
  };

  const handleNotificationToggle = (checked: boolean) => {
    setNotificationsEnabled(checked);
    localStorage.setItem("notificationsEnabled", JSON.stringify(checked));
  };

  const handleDarkModeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    navigate("/auth");
  };

  const bmi = profile.weight / Math.pow(profile.height / 100, 2);

  return (
    <AppLayout>
      <PullToRefresh onRefresh={handleRefresh} className="h-full">
        <div className="animate-fade-in pb-6">
          <ProfileHeader 
            name={profile.name}
            email={profile.email}
            initials={profile.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
          />

          <HealthStatsCard 
            stats={{
              age: profile.age,
              height: profile.height,
              weight: profile.weight,
              bmi: bmi,
            }}
          />

          <SettingsList title="Tài khoản">
            <SettingItem 
              icon={User} 
              label="Chỉnh sửa hồ sơ" 
              description="Cập nhật thông tin cá nhân"
              to="/profile/edit" 
            />
            <SettingItem 
              icon={Bell} 
              label="Thông báo" 
              description={notificationsEnabled ? "Đang bật" : "Đang tắt"}
              hasSwitch 
              checked={notificationsEnabled}
              onCheckedChange={handleNotificationToggle}
            />
          </SettingsList>

          <SettingsList title="Tùy chỉnh">
            <SettingItem 
              icon={Moon} 
              label="Chế độ tối" 
              description={theme === "dark" ? "Đang bật" : "Đang tắt"}
              hasSwitch 
              checked={theme === "dark"}
              onCheckedChange={handleDarkModeToggle}
            />
            <SettingItem 
              icon={Shield} 
              label="Quyền riêng tư" 
              description="Quản lý bảo mật"
              to="/profile/privacy" 
            />
          </SettingsList>

          <SettingsList title="Hỗ trợ">
            <SettingItem 
              icon={HelpCircle} 
              label="Trợ giúp" 
              description="FAQ & Liên hệ"
              to="/profile/help" 
            />
            <SettingItem 
              icon={LogOut} 
              label="Đăng xuất" 
              isDestructive 
              onClick={() => setShowLogoutDialog(true)}
            />
          </SettingsList>

          <p className="text-center text-[10px] text-muted-foreground mt-6">
            HealthCare v1.0.0
          </p>

          <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
            <AlertDialogContent className="max-w-[90%] rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle>Đăng xuất?</AlertDialogTitle>
                <AlertDialogDescription>
                  Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">Hủy</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleLogout} 
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
                >
                  Đăng xuất
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PullToRefresh>
    </AppLayout>
  );
}

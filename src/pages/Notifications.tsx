import { AppLayout } from "@/components/layout/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Pill, 
  Calendar, 
  Footprints, 
  Droplets,
  Heart,
  CheckCircle2,
  Trash2,
  Clock
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "reminder" | "health" | "appointment" | "activity";
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: "pill" | "calendar" | "footprints" | "droplets" | "heart";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "reminder",
    title: "Uống thuốc huyết áp",
    message: "Đã đến giờ uống thuốc Lisinopril 10mg",
    time: "5 phút trước",
    read: false,
    icon: "pill"
  },
  {
    id: "2",
    type: "health",
    title: "Nhắc nhở uống nước",
    message: "Bạn cần uống thêm 500ml nước để đạt mục tiêu 2L hôm nay",
    time: "15 phút trước",
    read: false,
    icon: "droplets"
  },
  {
    id: "3",
    type: "activity",
    title: "Mục tiêu bước chân",
    message: "Tuyệt vời! Bạn đã đi được 4,230 bước. Còn 5,770 bước nữa!",
    time: "30 phút trước",
    read: false,
    icon: "footprints"
  },
  {
    id: "4",
    type: "appointment",
    title: "Lịch khám sắp tới",
    message: "Khám tổng quát với BS. Nguyễn Văn B vào ngày mai lúc 9:00 AM",
    time: "1 giờ trước",
    read: true,
    icon: "calendar"
  },
  {
    id: "5",
    type: "health",
    title: "Nhịp tim cao",
    message: "Nhịp tim của bạn đang ở mức 95 bpm. Hãy nghỉ ngơi một chút.",
    time: "2 giờ trước",
    read: true,
    icon: "heart"
  },
  {
    id: "6",
    type: "reminder",
    title: "Uống vitamin",
    message: "Đừng quên uống vitamin D vào buổi sáng",
    time: "3 giờ trước",
    read: true,
    icon: "pill"
  },
  {
    id: "7",
    type: "activity",
    title: "Hoàn thành mục tiêu calo",
    message: "Chúc mừng! Bạn đã đốt cháy 1,800 kcal hôm qua",
    time: "Hôm qua",
    read: true,
    icon: "footprints"
  },
];

const iconMap = {
  pill: Pill,
  calendar: Calendar,
  footprints: Footprints,
  droplets: Droplets,
  heart: Heart
};

const typeColors = {
  reminder: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
  health: "bg-red-500/20 text-red-600 dark:text-red-400",
  appointment: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
  activity: "bg-primary/20 text-primary"
};

const typeLabels = {
  reminder: "Nhắc nhở",
  health: "Sức khỏe",
  appointment: "Lịch hẹn",
  activity: "Hoạt động"
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = activeTab === "all" 
    ? notifications 
    : activeTab === "unread"
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === activeTab);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Thông báo</h1>
              <p className="text-sm text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} chưa đọc` : "Tất cả đã đọc"}
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={markAllAsRead}
              className="text-primary"
            >
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Đọc tất cả
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all" className="text-xs">Tất cả</TabsTrigger>
            <TabsTrigger value="unread" className="text-xs relative">
              Chưa đọc
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="reminder" className="text-xs">Nhắc</TabsTrigger>
            <TabsTrigger value="health" className="text-xs">Sức khỏe</TabsTrigger>
            <TabsTrigger value="activity" className="text-xs">Hoạt động</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4 space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card className="p-8 text-center">
                <Bell className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                <p className="text-muted-foreground">Không có thông báo</p>
              </Card>
            ) : (
              filteredNotifications.map((notification) => {
                const IconComponent = iconMap[notification.icon];
                return (
                  <Card 
                    key={notification.id}
                    className={cn(
                      "p-4 transition-all duration-200 cursor-pointer hover:shadow-md",
                      !notification.read && "border-l-4 border-l-primary bg-primary/5"
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        typeColors[notification.type]
                      )}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className={cn(
                                "font-medium text-sm",
                                !notification.read && "font-semibold"
                              )}>
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary" className="text-[10px] px-2 py-0">
                                {typeLabels[notification.type]}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {notification.time}
                              </span>
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

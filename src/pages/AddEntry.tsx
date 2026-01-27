import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Scale, 
  Heart, 
  Activity, 
  Droplets,
  Utensils, 
  Footprints, 
  Pill,
  Stethoscope
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AddOption {
  icon: React.ElementType;
  label: string;
  description: string;
  path: string;
  color: string;
  bgColor: string;
}

const options: AddOption[] = [
  {
    icon: Scale,
    label: "Cân nặng",
    description: "Ghi lại cân nặng hôm nay",
    path: "/health-metrics?tab=weight&add=true",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Heart,
    label: "Huyết áp",
    description: "Đo huyết áp của bạn",
    path: "/health-metrics?tab=blood-pressure&add=true",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Activity,
    label: "Nhịp tim",
    description: "Ghi lại nhịp tim",
    path: "/health-metrics?tab=heart-rate&add=true",
    color: "text-health-info",
    bgColor: "bg-health-info/10",
  },
  {
    icon: Droplets,
    label: "Đường huyết",
    description: "Kiểm tra đường huyết",
    path: "/health-metrics?tab=blood-sugar&add=true",
    color: "text-health-warning",
    bgColor: "bg-health-warning/10",
  },
  {
    icon: Utensils,
    label: "Bữa ăn",
    description: "Thêm bữa ăn mới",
    path: "/nutrition?add=true",
    color: "text-health-accent",
    bgColor: "bg-health-accent/10",
  },
  {
    icon: Footprints,
    label: "Hoạt động",
    description: "Ghi lại hoạt động",
    path: "/activities?add=true",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Pill,
    label: "Nhắc thuốc",
    description: "Tạo nhắc nhở mới",
    path: "/reminders?add=true",
    color: "text-health-info",
    bgColor: "bg-health-info/10",
  },
  {
    icon: Stethoscope,
    label: "Lịch khám",
    description: "Đặt lịch hẹn khám",
    path: "/appointments?add=true",
    color: "text-health-warning",
    bgColor: "bg-health-warning/10",
  },
];

export default function AddEntry() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-4 py-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-2">Thêm mới</h1>
        <p className="text-muted-foreground mb-6">Chọn loại dữ liệu bạn muốn ghi lại</p>

        <div className="grid grid-cols-2 gap-4">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.path}
                className="cursor-pointer hover:shadow-md transition-all active:scale-95"
                onClick={() => navigate(option.path)}
              >
                <CardContent className="p-4">
                  <div className={cn("p-3 rounded-xl w-fit mb-3", option.bgColor)}>
                    <Icon className={cn("w-6 h-6", option.color)} />
                  </div>
                  <h3 className="font-semibold text-foreground">{option.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}

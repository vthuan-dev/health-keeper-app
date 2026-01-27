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
    description: "Ghi cân nặng",
    path: "/health-metrics?tab=weight&add=true",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Heart,
    label: "Huyết áp",
    description: "Đo huyết áp",
    path: "/health-metrics?tab=blood-pressure&add=true",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Activity,
    label: "Nhịp tim",
    description: "Ghi nhịp tim",
    path: "/health-metrics?tab=heart-rate&add=true",
    color: "text-health-info",
    bgColor: "bg-health-info/10",
  },
  {
    icon: Droplets,
    label: "Đường huyết",
    description: "Kiểm tra",
    path: "/health-metrics?tab=blood-sugar&add=true",
    color: "text-health-warning",
    bgColor: "bg-health-warning/10",
  },
  {
    icon: Utensils,
    label: "Bữa ăn",
    description: "Thêm bữa ăn",
    path: "/nutrition?add=true",
    color: "text-health-accent",
    bgColor: "bg-health-accent/10",
  },
  {
    icon: Footprints,
    label: "Hoạt động",
    description: "Ghi hoạt động",
    path: "/activities?add=true",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Pill,
    label: "Nhắc thuốc",
    description: "Tạo nhắc nhở",
    path: "/reminders?add=true",
    color: "text-health-info",
    bgColor: "bg-health-info/10",
  },
  {
    icon: Stethoscope,
    label: "Lịch khám",
    description: "Đặt lịch hẹn",
    path: "/appointments?add=true",
    color: "text-health-warning",
    bgColor: "bg-health-warning/10",
  },
];

export default function AddEntry() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-4 py-4 animate-fade-in">
        <h1 className="text-xl font-bold text-foreground mb-1">Thêm mới</h1>
        <p className="text-xs text-muted-foreground mb-4">Chọn loại dữ liệu cần ghi</p>

        <div className="grid grid-cols-2 gap-3">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.path}
                className="cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
                onClick={() => navigate(option.path)}
              >
                <CardContent className="p-3">
                  <div className={cn("p-2.5 rounded-xl w-fit mb-2", option.bgColor)}>
                    <Icon className={cn("w-5 h-5", option.color)} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{option.label}</h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{option.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}

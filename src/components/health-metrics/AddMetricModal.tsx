import { useState } from "react";
import { Scale, Heart, Activity, Droplets, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type MetricType = "weight" | "blood-pressure" | "heart-rate" | "blood-sugar";

interface AddMetricModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metricType: MetricType;
}

const metricConfig = {
  weight: {
    title: "Thêm cân nặng",
    icon: Scale,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  "blood-pressure": {
    title: "Thêm huyết áp",
    icon: Heart,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  "heart-rate": {
    title: "Thêm nhịp tim",
    icon: Activity,
    color: "text-health-info",
    bgColor: "bg-health-info/10",
  },
  "blood-sugar": {
    title: "Thêm đường huyết",
    icon: Droplets,
    color: "text-health-warning",
    bgColor: "bg-health-warning/10",
  },
};

export function AddMetricModal({ open, onOpenChange, metricType }: AddMetricModalProps) {
  const config = metricConfig[metricType];
  const Icon = config.icon;

  const [formData, setFormData] = useState({
    value: "",
    systolic: "",
    diastolic: "",
    activity: "",
    meal: "",
    time: new Date().toTimeString().slice(0, 5),
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Đã lưu thành công!",
      description: `Chỉ số ${config.title.replace("Thêm ", "")} đã được ghi nhận.`,
    });
    onOpenChange(false);
    setFormData({
      value: "",
      systolic: "",
      diastolic: "",
      activity: "",
      meal: "",
      time: new Date().toTimeString().slice(0, 5),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={cn("p-2.5 rounded-xl", config.bgColor)}>
              <Icon className={cn("w-5 h-5", config.color)} />
            </div>
            <DialogTitle className="text-lg">{config.title}</DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {/* Weight field */}
          {metricType === "weight" && (
            <div className="space-y-2">
              <Label className="text-xs">Cân nặng (kg)</Label>
              <Input
                type="number"
                step="0.1"
                placeholder="68.5"
                className="h-10"
                value={formData.value}
                onChange={(e) => handleChange("value", e.target.value)}
                required
              />
            </div>
          )}

          {/* Blood pressure fields */}
          {metricType === "blood-pressure" && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Tâm thu (mmHg)</Label>
                <Input
                  type="number"
                  placeholder="120"
                  className="h-10"
                  value={formData.systolic}
                  onChange={(e) => handleChange("systolic", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Tâm trương (mmHg)</Label>
                <Input
                  type="number"
                  placeholder="80"
                  className="h-10"
                  value={formData.diastolic}
                  onChange={(e) => handleChange("diastolic", e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {/* Heart rate fields */}
          {metricType === "heart-rate" && (
            <>
              <div className="space-y-2">
                <Label className="text-xs">Nhịp tim (BPM)</Label>
                <Input
                  type="number"
                  placeholder="72"
                  className="h-10"
                  value={formData.value}
                  onChange={(e) => handleChange("value", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Trạng thái</Label>
                <Select value={formData.activity} onValueChange={(v) => handleChange("activity", v)}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rest">Nghỉ ngơi</SelectItem>
                    <SelectItem value="after-exercise">Sau tập luyện</SelectItem>
                    <SelectItem value="during-exercise">Đang tập</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Blood sugar fields */}
          {metricType === "blood-sugar" && (
            <>
              <div className="space-y-2">
                <Label className="text-xs">Đường huyết (mg/dL)</Label>
                <Input
                  type="number"
                  placeholder="100"
                  className="h-10"
                  value={formData.value}
                  onChange={(e) => handleChange("value", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Thời điểm đo</Label>
                <Select value={formData.meal} onValueChange={(v) => handleChange("meal", v)}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Chọn thời điểm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fasting">Trước ăn sáng</SelectItem>
                    <SelectItem value="after-breakfast">Sau ăn sáng</SelectItem>
                    <SelectItem value="before-lunch">Trước ăn trưa</SelectItem>
                    <SelectItem value="after-lunch">Sau ăn trưa</SelectItem>
                    <SelectItem value="before-dinner">Trước ăn tối</SelectItem>
                    <SelectItem value="after-dinner">Sau ăn tối</SelectItem>
                    <SelectItem value="bedtime">Trước khi ngủ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Time input */}
          <div className="space-y-2">
            <Label className="text-xs">Thời gian đo</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="time"
                className="h-10 pl-9"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-10"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" className="flex-1 h-10 gradient-primary">
              Lưu
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

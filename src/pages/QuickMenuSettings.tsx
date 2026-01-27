import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { 
  IconWeight,
  IconHeartRateMonitor,
  IconWaveSine,
  IconDropletFilled,
  IconSoup,
  IconRun,
  IconPillFilled,
  IconStethoscope,
  TablerIcon
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { allMenuItems, saveSelectedMenuItems, QuickMenuItem } from "@/components/layout/RadialMenu";
import { toast } from "@/hooks/use-toast";

const iconMap: Record<string, TablerIcon> = {
  IconWeight, IconHeartRateMonitor, IconWaveSine, IconDropletFilled, IconSoup, IconRun, IconPillFilled, IconStethoscope
};

export default function QuickMenuSettings() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("quickMenuItems");
    if (saved) {
      setSelectedIds(JSON.parse(saved));
    } else {
      setSelectedIds(["weight", "blood-pressure", "heart-rate", "meal", "activity"]);
    }
  }, []);

  const toggleItem = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        if (prev.length <= 3) {
          toast({
            title: "Tối thiểu 3 mục",
            description: "Bạn cần chọn ít nhất 3 mục cho menu nhanh.",
            variant: "destructive",
          });
          return prev;
        }
        return prev.filter(i => i !== id);
      } else {
        if (prev.length >= 5) {
          toast({
            title: "Tối đa 5 mục",
            description: "Bạn chỉ có thể chọn tối đa 5 mục cho menu nhanh.",
            variant: "destructive",
          });
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const handleSave = () => {
    saveSelectedMenuItems(selectedIds);
    toast({
      title: "Đã lưu!",
      description: "Cài đặt menu nhanh đã được cập nhật.",
    });
    navigate(-1);
  };

  return (
    <AppLayout hideNav>
      <div className="px-4 py-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold">Tùy chỉnh Menu nhanh</h1>
            <p className="text-xs text-muted-foreground">Chọn 3-5 mục hiển thị khi nhấn nút +</p>
          </div>
        </div>

        {/* Selected count */}
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-sm text-muted-foreground">
            Đã chọn: <span className="font-semibold text-foreground">{selectedIds.length}/5</span>
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  n <= selectedIds.length ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>

        {/* Items List */}
        <Card>
          <CardContent className="p-0 divide-y divide-border/50">
            {allMenuItems.map((item) => {
              const Icon = iconMap[item.icon];
              const isSelected = selectedIds.includes(item.id);
              
              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 transition-colors cursor-pointer",
                    isSelected ? "bg-primary/5" : "hover:bg-muted/50"
                  )}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    isSelected ? item.bgColor : "bg-muted"
                  )}>
                    <Icon className={cn(
                      "w-5 h-5 transition-colors",
                      isSelected ? "text-white" : "text-muted-foreground"
                    )} />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground">{item.path.split("?")[0]}</p>
                  </div>
                  
                  <Checkbox 
                    checked={isSelected}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button 
          className="w-full mt-6 gradient-primary"
          onClick={handleSave}
        >
          Lưu thay đổi
        </Button>
      </div>
    </AppLayout>
  );
}
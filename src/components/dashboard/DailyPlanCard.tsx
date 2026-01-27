import { Sparkles, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DailyPlanCard() {
  return (
    <Card className="mx-4 overflow-hidden border-0 shadow-health gradient-primary">
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1.5">
            <div className="p-1 bg-primary-foreground/20 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="text-xs font-medium text-primary-foreground/90">
              Kế hoạch AI hôm nay
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 p-0.5 h-auto"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-2">
          <h3 className="text-base font-semibold text-primary-foreground leading-tight">
            Sáng nay hãy bắt đầu với 30 phút đi bộ! 🚶
          </h3>
          <p className="text-xs text-primary-foreground/80 mt-1 leading-relaxed">
            Hôm nay nên ăn khoảng 1,800 calo và uống đủ 2L nước.
          </p>
        </div>

        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex -space-x-1">
            <span className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center text-[10px]">
              🏃
            </span>
            <span className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center text-[10px]">
              🥗
            </span>
            <span className="w-5 h-5 rounded-full bg-primary-foreground/20 flex items-center justify-center text-[10px]">
              💧
            </span>
          </div>
          <span className="text-[10px] text-primary-foreground/70">
            3 mục tiêu hôm nay
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

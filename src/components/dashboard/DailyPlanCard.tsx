import { Sparkles, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DailyPlanCard() {
  return (
    <Card className="mx-4 overflow-hidden border-0 shadow-health gradient-primary">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary-foreground/20 rounded-lg">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-primary-foreground/90">
              Kế hoạch AI hôm nay
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 p-1 h-auto"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="mt-3 space-y-2">
          <h3 className="text-lg font-semibold text-primary-foreground">
            Sáng nay hãy bắt đầu với 30 phút đi bộ! 🚶
          </h3>
          <p className="text-sm text-primary-foreground/80">
            Dựa trên mục tiêu giảm cân của bạn, hôm nay nên ăn khoảng 1,800 calo và uống đủ 2L nước.
          </p>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="flex -space-x-1">
            <span className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs">
              🏃
            </span>
            <span className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs">
              🥗
            </span>
            <span className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs">
              💧
            </span>
          </div>
          <span className="text-xs text-primary-foreground/70">
            3 mục tiêu hôm nay
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

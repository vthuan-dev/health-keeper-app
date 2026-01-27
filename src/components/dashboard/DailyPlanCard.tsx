import { Sparkles, ChevronRight, Target, Droplets, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DailyPlanCard() {
  return (
    <Card className="mx-4 overflow-hidden border-0 shadow-lg bg-gradient-to-br from-primary via-primary to-health-primary-dark">
      <CardContent className="p-4 relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-white/90">
                Kế hoạch AI hôm nay
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/80 hover:text-white hover:bg-white/10 h-8 w-8 p-0 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Main content */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white leading-snug">
              Sáng nay hãy bắt đầu với 30 phút đi bộ! 🚶
            </h3>
            <p className="text-sm text-white/75 mt-1.5 leading-relaxed">
              Hôm nay nên ăn khoảng 1,800 calo và uống đủ 2L nước.
            </p>
          </div>

          {/* Goals */}
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-2.5 backdrop-blur-sm">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-white/70">Bước chân</p>
                <p className="text-sm font-bold text-white">8,000</p>
              </div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-white/70">Calo</p>
                <p className="text-sm font-bold text-white">1,800</p>
              </div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-white/70">Nước</p>
                <p className="text-sm font-bold text-white">2L</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

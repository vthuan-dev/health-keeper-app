import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footprints, Flame, Clock, Plus } from "lucide-react";

export default function Activities() {
  return (
    <AppLayout>
      <div className="px-4 py-4 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">Hoạt động</h1>
          <Button size="sm" className="h-8 gap-1 gradient-primary text-xs">
            <Plus className="w-3.5 h-3.5" />
            Thêm
          </Button>
        </div>
        
        {/* Daily Summary - Progress Ring */}
        <Card className="mb-4 gradient-primary border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                  <circle
                    cx="40" cy="40" r="34"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="40" cy="40" r="34"
                    stroke="white"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(4230 / 10000) * 213.6} 213.6`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-primary-foreground">42%</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-primary-foreground">4,230</p>
                <p className="text-xs text-primary-foreground/80">bước hôm nay</p>
                <p className="text-[10px] text-primary-foreground/60 mt-1">Mục tiêu: 10,000 bước</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Card>
            <CardContent className="p-3 flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-health-warning/10">
                <Flame className="w-4 h-4 text-health-warning" />
              </div>
              <div>
                <p className="text-lg font-bold">320</p>
                <p className="text-[10px] text-muted-foreground">Calo đốt</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-primary/10">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold">45</p>
                <p className="text-[10px] text-muted-foreground">Phút vận động</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity List */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold">Hôm nay</h2>
          <Button variant="ghost" size="sm" className="text-primary text-xs h-auto py-0.5 px-2">
            Xem tất cả
          </Button>
        </div>
        <div className="space-y-2">
          {[
            { name: "Đi bộ buổi sáng", time: "07:30", duration: "30p", calories: 150, icon: "🚶" },
            { name: "Yoga", time: "12:00", duration: "15p", calories: 80, icon: "🧘" },
            { name: "Đạp xe", time: "17:00", duration: "45p", calories: 200, icon: "🚴" },
          ].map((activity, i) => (
            <Card key={i}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{activity.name}</p>
                  <p className="text-[10px] text-muted-foreground">{activity.time} • {activity.duration}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary">{activity.calories}</p>
                  <p className="text-[10px] text-muted-foreground">kcal</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Clock, Plus } from "lucide-react";
import { WeeklyChart } from "@/components/activities/WeeklyChart";
import { ComparisonBadge } from "@/components/activities/ComparisonBadge";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { toast } from "@/hooks/use-toast";

// Mock data - today vs yesterday
const initialStats = { steps: 4230, calories: 320, minutes: 45 };
const yesterdayStats = { steps: 5800, calories: 280, minutes: 38 };

export default function Activities() {
  const [todayStats, setTodayStats] = useState(initialStats);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Simulate updated data
    setTodayStats({
      steps: initialStats.steps + Math.floor(Math.random() * 500),
      calories: initialStats.calories + Math.floor(Math.random() * 50),
      minutes: initialStats.minutes + Math.floor(Math.random() * 10),
    });
    setLastUpdated(new Date());
    
    toast({
      title: "Đã cập nhật!",
      description: "Dữ liệu hoạt động đã được làm mới.",
    });
  };

  return (
    <AppLayout>
      <PullToRefresh onRefresh={handleRefresh} className="h-full">
        <div className="px-4 py-4 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-foreground">Hoạt động</h1>
              <p className="text-[10px] text-muted-foreground">
                Cập nhật: {lastUpdated.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
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
                      strokeDasharray={`${(todayStats.steps / 10000) * 213.6} 213.6`}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-primary-foreground">
                      {Math.round((todayStats.steps / 10000) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-2xl font-bold text-primary-foreground">{todayStats.steps.toLocaleString()}</p>
                    <ComparisonBadge
                      current={todayStats.steps}
                      previous={yesterdayStats.steps}
                      className="bg-white/20 text-white"
                    />
                  </div>
                  <p className="text-xs text-primary-foreground/80">bước hôm nay</p>
                  <p className="text-[10px] text-primary-foreground/60 mt-1">Mục tiêu: 10,000 bước</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid with Comparison */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 rounded-full bg-health-warning/10">
                    <Flame className="w-4 h-4 text-health-warning" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">{todayStats.calories}</p>
                    <p className="text-[10px] text-muted-foreground">Calo đốt</p>
                  </div>
                </div>
                <ComparisonBadge
                  current={todayStats.calories}
                  previous={yesterdayStats.calories}
                />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold">{todayStats.minutes}</p>
                    <p className="text-[10px] text-muted-foreground">Phút vận động</p>
                  </div>
                </div>
                <ComparisonBadge
                  current={todayStats.minutes}
                  previous={yesterdayStats.minutes}
                  unit="p"
                />
              </CardContent>
            </Card>
          </div>

          {/* Weekly Chart */}
          <div className="mb-4">
            <WeeklyChart />
          </div>

          {/* Activity List */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold">Hôm nay</h2>
            <Button variant="ghost" size="sm" className="text-primary text-xs h-auto py-0.5 px-2">
              Xem tất cả
            </Button>
          </div>
          <div className="space-y-2 pb-4">
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
      </PullToRefresh>
    </AppLayout>
  );
}

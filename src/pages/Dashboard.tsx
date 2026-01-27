import { useState } from "react";
import { Scale, Footprints, Flame } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DailyPlanCard } from "@/components/dashboard/DailyPlanCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { CircularProgressCard } from "@/components/dashboard/CircularProgressCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TodayReminders } from "@/components/dashboard/TodayReminders";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { toast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [stats, setStats] = useState({
    weight: 68.5,
    steps: 4230,
    calories: 1250,
  });

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStats({
      weight: 68.5,
      steps: stats.steps + Math.floor(Math.random() * 300),
      calories: stats.calories + Math.floor(Math.random() * 100),
    });
    toast({
      title: "Đã cập nhật!",
      description: "Dữ liệu đã được làm mới.",
    });
  };

  return (
    <AppLayout>
      <PullToRefresh onRefresh={handleRefresh} className="h-full">
        <div className="animate-fade-in space-y-5 pb-4">
          {/* Header */}
          <DashboardHeader userName="Nguyễn Văn A" />

          {/* AI Daily Plan Card */}
          <DailyPlanCard />

          {/* Quick Stats */}
          <div className="px-4">
            <h2 className="text-base font-bold text-foreground mb-3">Chỉ số hôm nay</h2>
            <div className="grid grid-cols-3 gap-3">
              <StatsCard
                icon={Scale}
                label="Cân nặng"
                value={stats.weight}
                unit="kg"
                subtitle="BMI: 22.4"
                variant="primary"
              />
              <CircularProgressCard
                icon={Footprints}
                label="Bước chân"
                value={stats.steps}
                target={10000}
                unit="bước"
                variant="info"
              />
              <CircularProgressCard
                icon={Flame}
                label="Calo"
                value={stats.calories}
                target={1800}
                unit="kcal"
                variant="accent"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Today's Reminders */}
          <TodayReminders />
        </div>
      </PullToRefresh>
    </AppLayout>
  );
}

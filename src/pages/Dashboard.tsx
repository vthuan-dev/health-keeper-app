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
import { AnimatedContainer } from "@/components/common/AnimatedContainer";

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
        <div className="space-y-5 pb-4">
          {/* Header */}
          <AnimatedContainer delay={0}>
            <DashboardHeader userName="Nguyễn Văn A" />
          </AnimatedContainer>

          {/* AI Daily Plan Card */}
          <AnimatedContainer delay={100} animation="slide-left">
            <DailyPlanCard />
          </AnimatedContainer>

          {/* Quick Stats */}
          <div className="px-4">
            <AnimatedContainer delay={200}>
              <h2 className="text-base font-bold text-foreground mb-3">Chỉ số hôm nay</h2>
            </AnimatedContainer>
            <div className="grid grid-cols-3 gap-3">
              <AnimatedContainer delay={250} animation="scale">
                <StatsCard
                  icon={Scale}
                  label="Cân nặng"
                  value={stats.weight}
                  unit="kg"
                  subtitle="BMI: 22.4"
                  variant="primary"
                />
              </AnimatedContainer>
              <AnimatedContainer delay={300} animation="scale">
                <CircularProgressCard
                  icon={Footprints}
                  label="Bước chân"
                  value={stats.steps}
                  target={10000}
                  unit="bước"
                  variant="info"
                />
              </AnimatedContainer>
              <AnimatedContainer delay={350} animation="scale">
                <CircularProgressCard
                  icon={Flame}
                  label="Calo"
                  value={stats.calories}
                  target={1800}
                  unit="kcal"
                  variant="accent"
                />
              </AnimatedContainer>
            </div>
          </div>

          {/* Quick Actions */}
          <AnimatedContainer delay={400}>
            <QuickActions />
          </AnimatedContainer>

          {/* Today's Reminders */}
          <AnimatedContainer delay={500} animation="fade-up">
            <TodayReminders />
          </AnimatedContainer>
        </div>
      </PullToRefresh>
    </AppLayout>
  );
}

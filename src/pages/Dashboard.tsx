import { Scale, Footprints, Flame } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DailyPlanCard } from "@/components/dashboard/DailyPlanCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { TodayReminders } from "@/components/dashboard/TodayReminders";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <DashboardHeader userName="Nguyễn Văn A" />

        {/* AI Daily Plan Card */}
        <div className="mt-2">
          <DailyPlanCard />
        </div>

        {/* Quick Stats */}
        <div className="px-4 mt-6">
          <h2 className="text-sm font-semibold text-foreground mb-3">Chỉ số hôm nay</h2>
          <div className="grid grid-cols-3 gap-3">
            <StatsCard
              icon={Scale}
              label="Cân nặng"
              value="68.5"
              unit="kg"
              subtitle="BMI: 22.4"
              variant="primary"
            />
            <StatsCard
              icon={Footprints}
              label="Bước chân"
              value="4,230"
              trend="up"
              trendValue="12%"
              variant="default"
            />
            <StatsCard
              icon={Flame}
              label="Calo"
              value="1,250"
              unit="kcal"
              subtitle="Mục tiêu: 1,800"
              variant="accent"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <QuickActions />
        </div>

        {/* Today's Reminders */}
        <div className="mt-6">
          <TodayReminders />
        </div>
      </div>
    </AppLayout>
  );
}

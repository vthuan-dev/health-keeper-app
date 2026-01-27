import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, Heart, Activity, Droplets, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeightTab } from "@/components/health-metrics/WeightTab";
import { BloodPressureTab } from "@/components/health-metrics/BloodPressureTab";
import { HeartRateTab } from "@/components/health-metrics/HeartRateTab";
import { BloodSugarTab } from "@/components/health-metrics/BloodSugarTab";
import { AddMetricModal } from "@/components/health-metrics/AddMetricModal";

type MetricType = "weight" | "blood-pressure" | "heart-rate" | "blood-sugar";

const tabs = [
  { id: "weight", label: "Cân nặng", icon: Scale },
  { id: "blood-pressure", label: "Huyết áp", icon: Heart },
  { id: "heart-rate", label: "Nhịp tim", icon: Activity },
  { id: "blood-sugar", label: "Đường huyết", icon: Droplets },
];

export default function HealthMetrics() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("tab") || "weight";
  const [activeTab, setActiveTab] = useState<MetricType>(defaultTab as MetricType);
  const [isModalOpen, setIsModalOpen] = useState(searchParams.get("add") === "true");

  return (
    <AppLayout>
      <div className="px-4 py-4 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-foreground">Chỉ số sức khỏe</h1>
          <Button 
            size="sm" 
            className="h-8 gap-1 gradient-primary text-xs"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-3.5 h-3.5" />
            Thêm
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as MetricType)}>
          <TabsList className="grid w-full grid-cols-4 h-auto p-1 bg-muted/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex flex-col gap-1 py-2 px-1 data-[state=active]:bg-card data-[state=active]:shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[9px] font-medium leading-tight">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="weight" className="mt-4">
            <WeightTab />
          </TabsContent>
          <TabsContent value="blood-pressure" className="mt-4">
            <BloodPressureTab />
          </TabsContent>
          <TabsContent value="heart-rate" className="mt-4">
            <HeartRateTab />
          </TabsContent>
          <TabsContent value="blood-sugar" className="mt-4">
            <BloodSugarTab />
          </TabsContent>
        </Tabs>

        <AddMetricModal 
          open={isModalOpen} 
          onOpenChange={setIsModalOpen}
          metricType={activeTab}
        />
      </div>
    </AppLayout>
  );
}

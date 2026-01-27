import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Scale, Heart, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { PullToRefresh } from "@/components/common/PullToRefresh";
import { toast } from "@/hooks/use-toast";
import { AnimatedContainer } from "@/components/common/AnimatedContainer";

const initialWeightData = [
  { day: "T2", value: 69.2 },
  { day: "T3", value: 69.0 },
  { day: "T4", value: 68.8 },
  { day: "T5", value: 68.7 },
  { day: "T6", value: 68.5 },
  { day: "T7", value: 68.5 },
  { day: "CN", value: 68.4 },
];

const initialActivityData = [
  { day: "T2", steps: 8200 },
  { day: "T3", steps: 6500 },
  { day: "T4", steps: 9100 },
  { day: "T5", steps: 7300 },
  { day: "T6", steps: 4230 },
  { day: "T7", steps: 10500 },
  { day: "CN", steps: 5000 },
];

export default function Statistics() {
  const [weightData, setWeightData] = useState(initialWeightData);
  const [activityData, setActivityData] = useState(initialActivityData);

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setActivityData(prev => prev.map(d => ({
      ...d,
      steps: d.steps + Math.floor(Math.random() * 200) - 100
    })));
    toast({
      title: "Đã cập nhật!",
      description: "Thống kê đã được làm mới.",
    });
  };

  return (
    <AppLayout>
      <PullToRefresh onRefresh={handleRefresh} className="h-full">
        <div className="px-4 py-4 pb-4">
          <AnimatedContainer delay={0}>
            <h1 className="text-xl font-bold text-foreground mb-4">Thống kê</h1>
          </AnimatedContainer>

          <AnimatedContainer delay={100}>
            <Tabs defaultValue="week" className="mb-4">
              <TabsList className="grid w-full grid-cols-3 h-9">
                <TabsTrigger value="week" className="text-xs">7 ngày</TabsTrigger>
                <TabsTrigger value="month" className="text-xs">30 ngày</TabsTrigger>
                <TabsTrigger value="quarter" className="text-xs">3 tháng</TabsTrigger>
              </TabsList>
            </Tabs>
          </AnimatedContainer>

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <AnimatedContainer delay={150} animation="scale">
              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-2.5 text-center">
                  <Scale className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="text-base font-bold">-0.8</p>
                  <p className="text-[9px] text-muted-foreground">kg</p>
                </CardContent>
              </Card>
            </AnimatedContainer>
            <AnimatedContainer delay={200} animation="scale">
              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-2.5 text-center">
                  <Activity className="w-4 h-4 text-health-info mx-auto mb-1" />
                  <p className="text-base font-bold">50.8k</p>
                  <p className="text-[9px] text-muted-foreground">bước</p>
                </CardContent>
              </Card>
            </AnimatedContainer>
            <AnimatedContainer delay={250} animation="scale">
              <Card className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-2.5 text-center">
                  <Heart className="w-4 h-4 text-destructive mx-auto mb-1" />
                  <p className="text-base font-bold">72</p>
                  <p className="text-[9px] text-muted-foreground">BPM</p>
                </CardContent>
              </Card>
            </AnimatedContainer>
          </div>

          {/* Weight Chart */}
          <AnimatedContainer delay={300} animation="slide-left">
            <Card className="mb-3 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <TrendingDown className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold">Cân nặng</span>
                  <span className="text-[10px] text-muted-foreground ml-auto">-0.8 kg tuần này</span>
                </div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                      <XAxis 
                        dataKey="day" 
                        tick={{ fontSize: 9 }} 
                        stroke="hsl(var(--muted-foreground))" 
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        domain={["dataMin - 0.3", "dataMax + 0.3"]} 
                        tick={{ fontSize: 9 }} 
                        stroke="hsl(var(--muted-foreground))"
                        axisLine={false}
                        tickLine={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>

          {/* Activity Chart */}
          <AnimatedContainer delay={400} animation="slide-left">
            <Card className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <Activity className="w-3.5 h-3.5 text-health-info" />
                  <span className="text-xs font-semibold">Hoạt động</span>
                  <span className="text-[10px] text-muted-foreground ml-auto">TB: 7,261 bước/ngày</span>
                </div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                      <XAxis 
                        dataKey="day" 
                        tick={{ fontSize: 9 }} 
                        stroke="hsl(var(--muted-foreground))"
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fontSize: 9 }} 
                        stroke="hsl(var(--muted-foreground))"
                        axisLine={false}
                        tickLine={false}
                      />
                      <Bar 
                        dataKey="steps" 
                        fill="hsl(var(--primary))" 
                        radius={[3, 3, 0, 0]} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>
      </PullToRefresh>
    </AppLayout>
  );
}

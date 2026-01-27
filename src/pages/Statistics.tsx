import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Activity, Scale, Heart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const weightData = [
  { day: "T2", value: 69.2 },
  { day: "T3", value: 69.0 },
  { day: "T4", value: 68.8 },
  { day: "T5", value: 68.7 },
  { day: "T6", value: 68.5 },
  { day: "T7", value: 68.5 },
  { day: "CN", value: 68.4 },
];

const activityData = [
  { day: "T2", steps: 8200, calories: 320 },
  { day: "T3", steps: 6500, calories: 280 },
  { day: "T4", steps: 9100, calories: 350 },
  { day: "T5", steps: 7300, calories: 300 },
  { day: "T6", steps: 4230, calories: 180 },
  { day: "T7", steps: 10500, calories: 420 },
  { day: "CN", steps: 5000, calories: 200 },
];

export default function Statistics() {
  return (
    <AppLayout>
      <div className="px-4 py-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-6">Thống kê</h1>

        <Tabs defaultValue="week" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">7 ngày</TabsTrigger>
            <TabsTrigger value="month">30 ngày</TabsTrigger>
            <TabsTrigger value="quarter">3 tháng</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card>
            <CardContent className="p-3 text-center">
              <Scale className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-lg font-bold">-0.8</p>
              <p className="text-xs text-muted-foreground">kg tuần này</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Activity className="w-5 h-5 text-health-info mx-auto mb-1" />
              <p className="text-lg font-bold">50,830</p>
              <p className="text-xs text-muted-foreground">bước</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Heart className="w-5 h-5 text-destructive mx-auto mb-1" />
              <p className="text-lg font-bold">72</p>
              <p className="text-xs text-muted-foreground">BPM TB</p>
            </CardContent>
          </Card>
        </div>

        {/* Weight Chart */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-primary" />
              Xu hướng cân nặng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis domain={["dataMin - 0.5", "dataMax + 0.5"]} tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-health-info" />
              Hoạt động hàng tuần
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Bar dataKey="steps" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

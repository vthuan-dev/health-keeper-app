import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Scale, Trash2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const mockData = [
  { date: "15/01", value: 70.2, time: "07:30" },
  { date: "16/01", value: 69.8, time: "07:15" },
  { date: "17/01", value: 69.5, time: "07:45" },
  { date: "18/01", value: 69.3, time: "07:20" },
  { date: "19/01", value: 69.0, time: "07:30" },
  { date: "20/01", value: 68.7, time: "07:25" },
  { date: "21/01", value: 68.5, time: "07:35" },
];

export function WeightTab() {
  const currentWeight = mockData[mockData.length - 1].value;
  const previousWeight = mockData[0].value;
  const change = currentWeight - previousWeight;
  const isDown = change < 0;

  return (
    <div className="space-y-4">
      {/* Current Value Card */}
      <Card className="overflow-hidden">
        <div className="gradient-primary p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-primary-foreground/80">Cân nặng hiện tại</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold text-primary-foreground">{currentWeight}</span>
                <span className="text-sm text-primary-foreground/80">kg</span>
              </div>
            </div>
            <div className="text-right">
              <div className={cn(
                "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                isDown ? "bg-primary-foreground/20 text-primary-foreground" : "bg-destructive/20 text-destructive-foreground"
              )}>
                {isDown ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                {Math.abs(change).toFixed(1)} kg
              </div>
              <p className="text-[10px] text-primary-foreground/60 mt-1">7 ngày qua</p>
            </div>
          </div>
        </div>
        
        {/* BMI Info */}
        <CardContent className="p-3 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Scale className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Chỉ số BMI</p>
                <p className="text-sm font-semibold">22.4 <span className="text-xs font-normal text-primary">Bình thường</span></p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Mục tiêu</p>
              <p className="text-sm font-semibold">65.0 kg</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Card */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold">Xu hướng 7 ngày</p>
            <span className="text-[10px] text-muted-foreground">Cập nhật hôm nay</span>
          </div>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 9 }} 
                  stroke="hsl(var(--muted-foreground))"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  domain={["dataMin - 0.5", "dataMax + 0.5"]} 
                  tick={{ fontSize: 9 }} 
                  stroke="hsl(var(--muted-foreground))"
                  axisLine={false}
                  tickLine={false}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#weightGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div>
        <p className="text-xs font-semibold mb-2">Lịch sử ghi nhận</p>
        <div className="space-y-2">
          {mockData.slice().reverse().map((record, i) => (
            <Card key={i} className="group">
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Scale className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{record.value} kg</p>
                    <p className="text-[10px] text-muted-foreground">{record.date} • {record.time}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

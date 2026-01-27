import { Card, CardContent } from "@/components/ui/card";
import { Droplets, Trash2, Coffee, Utensils, Moon } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mockData = [
  { date: "15/01", value: 105, time: "07:00", meal: "Trước ăn sáng" },
  { date: "16/01", value: 98, time: "07:15", meal: "Trước ăn sáng" },
  { date: "17/01", value: 112, time: "09:00", meal: "Sau ăn sáng" },
  { date: "18/01", value: 95, time: "07:30", meal: "Trước ăn sáng" },
  { date: "19/01", value: 102, time: "07:00", meal: "Trước ăn sáng" },
  { date: "20/01", value: 108, time: "12:30", meal: "Sau ăn trưa" },
  { date: "21/01", value: 100, time: "07:00", meal: "Trước ăn sáng" },
];

const mealIcons: Record<string, React.ElementType> = {
  "Trước ăn sáng": Coffee,
  "Sau ăn sáng": Utensils,
  "Sau ăn trưa": Utensils,
  "Trước khi ngủ": Moon,
};

export function BloodSugarTab() {
  const current = mockData[mockData.length - 1];
  const avg = Math.round(mockData.reduce((a, b) => a + b.value, 0) / mockData.length);

  const getStatus = (value: number, meal: string) => {
    const isFasting = meal.includes("Trước");
    if (isFasting) {
      if (value < 100) return { label: "Bình thường", color: "text-primary" };
      if (value < 126) return { label: "Tiền ĐTĐ", color: "text-health-warning" };
      return { label: "Cao", color: "text-destructive" };
    } else {
      if (value < 140) return { label: "Bình thường", color: "text-primary" };
      if (value < 200) return { label: "Hơi cao", color: "text-health-warning" };
      return { label: "Cao", color: "text-destructive" };
    }
  };

  const status = getStatus(current.value, current.meal);

  return (
    <div className="space-y-4">
      {/* Current Value Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-health-warning to-health-warning/80 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-primary-foreground/80">Đường huyết hiện tại</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold text-primary-foreground">{current.value}</span>
                <span className="text-sm text-primary-foreground/80">mg/dL</span>
              </div>
              <p className="text-[10px] text-primary-foreground/60 mt-1">{current.meal}</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Droplets className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
        </div>
        
        <CardContent className="p-3 bg-card">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <p className="text-lg font-bold">{avg}</p>
              <p className="text-[9px] text-muted-foreground">Trung bình 7 ngày</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50 text-center">
              <p className={cn("text-lg font-bold", status.color)}>{status.label}</p>
              <p className="text-[9px] text-muted-foreground">Tình trạng</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Card */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold">Xu hướng 7 ngày</p>
            <span className="text-[10px] text-muted-foreground">mg/dL</span>
          </div>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="bloodSugarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--health-warning))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--health-warning))" stopOpacity={0}/>
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
                  domain={[70, 140]} 
                  tick={{ fontSize: 9 }} 
                  stroke="hsl(var(--muted-foreground))"
                  axisLine={false}
                  tickLine={false}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--health-warning))"
                  strokeWidth={2}
                  fill="url(#bloodSugarGradient)"
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
          {mockData.slice().reverse().map((record, i) => {
            const s = getStatus(record.value, record.meal);
            const MealIcon = mealIcons[record.meal] || Droplets;
            return (
              <Card key={i} className="group">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-health-warning/20 to-health-warning/5 flex items-center justify-center">
                      <MealIcon className="w-4 h-4 text-health-warning" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{record.value} mg/dL <span className={`text-xs font-normal ${s.color}`}>{s.label}</span></p>
                      <p className="text-[10px] text-muted-foreground">{record.date} • {record.time} • {record.meal}</p>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

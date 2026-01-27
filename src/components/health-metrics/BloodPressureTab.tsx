import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Heart, Trash2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Button } from "@/components/ui/button";

const mockData = [
  { date: "15/01", systolic: 125, diastolic: 82, time: "08:00" },
  { date: "16/01", systolic: 122, diastolic: 80, time: "08:15" },
  { date: "17/01", systolic: 128, diastolic: 85, time: "08:00" },
  { date: "18/01", systolic: 120, diastolic: 78, time: "08:30" },
  { date: "19/01", systolic: 118, diastolic: 76, time: "08:00" },
  { date: "20/01", systolic: 121, diastolic: 79, time: "08:20" },
  { date: "21/01", systolic: 119, diastolic: 77, time: "08:00" },
];

export function BloodPressureTab() {
  const current = mockData[mockData.length - 1];

  const getStatus = (sys: number, dia: number) => {
    if (sys < 120 && dia < 80) return { label: "Bình thường", color: "text-primary" };
    if (sys < 130 && dia < 85) return { label: "Hơi cao", color: "text-health-warning" };
    return { label: "Cao", color: "text-destructive" };
  };

  const status = getStatus(current.systolic, current.diastolic);

  return (
    <div className="space-y-4">
      {/* Current Value Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-destructive/90 to-destructive p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-destructive-foreground/80">Huyết áp hiện tại</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold text-destructive-foreground">{current.systolic}/{current.diastolic}</span>
                <span className="text-sm text-destructive-foreground/80">mmHg</span>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full bg-destructive-foreground/20 flex items-center justify-center">
              <Heart className="w-7 h-7 text-destructive-foreground" fill="currentColor" />
            </div>
          </div>
        </div>
        
        <CardContent className="p-3 bg-card">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2 rounded-lg bg-muted/50">
              <p className="text-lg font-bold">{current.systolic}</p>
              <p className="text-[9px] text-muted-foreground">Tâm thu</p>
            </div>
            <div className="p-2 rounded-lg bg-muted/50">
              <p className="text-lg font-bold">{current.diastolic}</p>
              <p className="text-[9px] text-muted-foreground">Tâm trương</p>
            </div>
            <div className="p-2 rounded-lg bg-muted/50">
              <p className={`text-sm font-bold ${status.color}`}>{status.label}</p>
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
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-destructive" />
                <span className="text-[9px] text-muted-foreground">Tâm thu</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-health-info" />
                <span className="text-[9px] text-muted-foreground">Tâm trương</span>
              </div>
            </div>
          </div>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 9 }} 
                  stroke="hsl(var(--muted-foreground))"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  domain={[60, 140]} 
                  tick={{ fontSize: 9 }} 
                  stroke="hsl(var(--muted-foreground))"
                  axisLine={false}
                  tickLine={false}
                />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--destructive))", strokeWidth: 0, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  stroke="hsl(var(--health-info))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--health-info))", strokeWidth: 0, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div>
        <p className="text-xs font-semibold mb-2">Lịch sử ghi nhận</p>
        <div className="space-y-2">
          {mockData.slice().reverse().map((record, i) => {
            const s = getStatus(record.systolic, record.diastolic);
            return (
              <Card key={i} className="group">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{record.systolic}/{record.diastolic} <span className={`text-xs font-normal ${s.color}`}>{s.label}</span></p>
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

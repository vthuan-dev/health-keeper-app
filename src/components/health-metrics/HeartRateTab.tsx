import { Card, CardContent } from "@/components/ui/card";
import { Activity, Trash2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mockData = [
  { date: "15/01", value: 75, time: "07:00", activity: "Nghỉ ngơi" },
  { date: "16/01", value: 72, time: "07:15", activity: "Nghỉ ngơi" },
  { date: "17/01", value: 78, time: "07:00", activity: "Sau tập" },
  { date: "18/01", value: 68, time: "07:30", activity: "Nghỉ ngơi" },
  { date: "19/01", value: 74, time: "07:00", activity: "Nghỉ ngơi" },
  { date: "20/01", value: 70, time: "07:20", activity: "Nghỉ ngơi" },
  { date: "21/01", value: 72, time: "07:00", activity: "Nghỉ ngơi" },
];

export function HeartRateTab() {
  const current = mockData[mockData.length - 1];
  const avg = Math.round(mockData.reduce((a, b) => a + b.value, 0) / mockData.length);
  const min = Math.min(...mockData.map(d => d.value));
  const max = Math.max(...mockData.map(d => d.value));

  const getStatus = (bpm: number) => {
    if (bpm < 60) return { label: "Thấp", color: "text-health-info" };
    if (bpm <= 100) return { label: "Bình thường", color: "text-primary" };
    return { label: "Cao", color: "text-destructive" };
  };

  const status = getStatus(current.value);

  return (
    <div className="space-y-4">
      {/* Current Value Card */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-br from-health-info to-health-info/80 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-primary-foreground/80">Nhịp tim hiện tại</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold text-primary-foreground">{current.value}</span>
                <span className="text-sm text-primary-foreground/80">BPM</span>
              </div>
              <p className="text-[10px] text-primary-foreground/60 mt-1">{current.activity}</p>
            </div>
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center animate-pulse">
                <Activity className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
        
        <CardContent className="p-3 bg-card">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2 rounded-lg bg-muted/50">
              <p className="text-lg font-bold">{min}</p>
              <p className="text-[9px] text-muted-foreground">Thấp nhất</p>
            </div>
            <div className="p-2 rounded-lg bg-primary/10">
              <p className="text-lg font-bold text-primary">{avg}</p>
              <p className="text-[9px] text-muted-foreground">Trung bình</p>
            </div>
            <div className="p-2 rounded-lg bg-muted/50">
              <p className="text-lg font-bold">{max}</p>
              <p className="text-[9px] text-muted-foreground">Cao nhất</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Card */}
      <Card>
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold">Xu hướng 7 ngày</p>
            <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", 
              status.color === "text-primary" ? "bg-primary/10" : "bg-destructive/10",
              status.color
            )}>
              {status.label}
            </span>
          </div>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="heartRateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--health-info))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--health-info))" stopOpacity={0}/>
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
                  domain={[50, 100]} 
                  tick={{ fontSize: 9 }} 
                  stroke="hsl(var(--muted-foreground))"
                  axisLine={false}
                  tickLine={false}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--health-info))"
                  strokeWidth={2}
                  fill="url(#heartRateGradient)"
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
            const s = getStatus(record.value);
            return (
              <Card key={i} className="group">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-health-info/20 to-health-info/5 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-health-info" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{record.value} BPM <span className={`text-xs font-normal ${s.color}`}>{s.label}</span></p>
                      <p className="text-[10px] text-muted-foreground">{record.date} • {record.time} • {record.activity}</p>
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

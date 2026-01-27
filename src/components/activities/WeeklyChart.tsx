import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DayData {
  day: string;
  steps: number;
  target: number;
}

const weekData: DayData[] = [
  { day: "T2", steps: 8500, target: 10000 },
  { day: "T3", steps: 6200, target: 10000 },
  { day: "T4", steps: 9800, target: 10000 },
  { day: "T5", steps: 7400, target: 10000 },
  { day: "T6", steps: 11200, target: 10000 },
  { day: "T7", steps: 5600, target: 10000 },
  { day: "CN", steps: 4230, target: 10000 },
];

export function WeeklyChart() {
  const maxSteps = Math.max(...weekData.map((d) => d.steps), 10000);
  const today = 6; // Sunday = index 6

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Tuần này</h3>
          <p className="text-xs text-muted-foreground">
            TB: {Math.round(weekData.reduce((a, b) => a + b.steps, 0) / 7).toLocaleString()} bước
          </p>
        </div>

        {/* Bar Chart */}
        <div className="flex items-end justify-between gap-2 h-24">
          {weekData.map((data, index) => {
            const heightPercent = (data.steps / maxSteps) * 100;
            const isToday = index === today;
            const reachedGoal = data.steps >= data.target;

            return (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full h-20 flex items-end justify-center">
                  <div
                    className={cn(
                      "w-full max-w-6 rounded-t-md transition-all duration-500",
                      isToday
                        ? "bg-primary"
                        : reachedGoal
                        ? "bg-primary/70"
                        : "bg-muted-foreground/30"
                    )}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px]",
                    isToday ? "font-bold text-primary" : "text-muted-foreground"
                  )}
                >
                  {data.day}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
            <span className="text-[10px] text-muted-foreground">Hôm nay</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-primary/70" />
            <span className="text-[10px] text-muted-foreground">Đạt mục tiêu</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-muted-foreground/30" />
            <span className="text-[10px] text-muted-foreground">Chưa đạt</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

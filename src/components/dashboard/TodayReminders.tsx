import { Clock, Pill, Droplets, Dumbbell, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Reminder {
  id: string;
  title: string;
  time: string;
  type: "medication" | "water" | "exercise" | "checkup";
  completed: boolean;
}

const mockReminders: Reminder[] = [
  { id: "1", title: "Uống vitamin D", time: "08:00", type: "medication", completed: true },
  { id: "2", title: "Uống 500ml nước", time: "10:00", type: "water", completed: true },
  { id: "3", title: "Tập yoga 15 phút", time: "12:00", type: "exercise", completed: false },
  { id: "4", title: "Thuốc huyết áp", time: "14:00", type: "medication", completed: false },
];

const typeConfig = {
  medication: { icon: Pill, color: "text-health-accent", bg: "bg-health-accent/10" },
  water: { icon: Droplets, color: "text-health-info", bg: "bg-health-info/10" },
  exercise: { icon: Dumbbell, color: "text-primary", bg: "bg-primary/10" },
  checkup: { icon: Clock, color: "text-health-warning", bg: "bg-health-warning/10" },
};

export function TodayReminders() {
  const pendingReminders = mockReminders.filter((r) => !r.completed);

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-foreground">Nhắc nhở hôm nay</h2>
        <Button variant="ghost" size="sm" className="text-primary text-xs h-auto py-1">
          Xem tất cả
        </Button>
      </div>

      <div className="space-y-2">
        {pendingReminders.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-4 text-center">
              <Check className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Tuyệt vời! Bạn đã hoàn thành tất cả nhắc nhở
              </p>
            </CardContent>
          </Card>
        ) : (
          pendingReminders.map((reminder) => {
            const config = typeConfig[reminder.type];
            const Icon = config.icon;

            return (
              <Card key={reminder.id} className="border">
                <CardContent className="p-3 flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", config.bg)}>
                    <Icon className={cn("w-4 h-4", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {reminder.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{reminder.time}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Xong
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

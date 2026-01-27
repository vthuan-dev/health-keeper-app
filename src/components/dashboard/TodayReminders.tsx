import { Clock, Pill, Droplets, Dumbbell, Check, ChevronRight } from "lucide-react";
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
  medication: { 
    icon: Pill, 
    color: "text-violet-500", 
    bg: "bg-violet-500/10",
    borderColor: "border-violet-500/20"
  },
  water: { 
    icon: Droplets, 
    color: "text-health-info", 
    bg: "bg-health-info/10",
    borderColor: "border-health-info/20"
  },
  exercise: { 
    icon: Dumbbell, 
    color: "text-primary", 
    bg: "bg-primary/10",
    borderColor: "border-primary/20"
  },
  checkup: { 
    icon: Clock, 
    color: "text-health-warning", 
    bg: "bg-health-warning/10",
    borderColor: "border-health-warning/20"
  },
};

export function TodayReminders() {
  const pendingReminders = mockReminders.filter((r) => !r.completed);
  const completedCount = mockReminders.filter((r) => r.completed).length;
  const totalCount = mockReminders.length;

  return (
    <div className="px-4 pb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-foreground">Nhắc nhở hôm nay</h2>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {completedCount}/{totalCount}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="text-primary text-xs h-8 gap-1 hover:bg-primary/10">
          Xem tất cả
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="space-y-2.5">
        {pendingReminders.length === 0 ? (
          <Card className="border-dashed border-primary/30 bg-primary/5">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">Tuyệt vời! 🎉</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Bạn đã hoàn thành tất cả nhắc nhở
              </p>
            </CardContent>
          </Card>
        ) : (
          pendingReminders.slice(0, 3).map((reminder, index) => {
            const config = typeConfig[reminder.type];
            const Icon = config.icon;

            return (
              <Card 
                key={reminder.id} 
                className={cn(
                  "border overflow-hidden transition-all duration-300 hover:shadow-md",
                  config.borderColor
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className={cn("p-3 flex items-center justify-center", config.bg)}>
                      <Icon className={cn("w-5 h-5", config.color)} />
                    </div>
                    <div className="flex-1 px-3 py-2.5">
                      <p className="text-sm font-semibold text-foreground">
                        {reminder.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {reminder.time}
                      </p>
                    </div>
                    <div className="pr-3">
                      <Button
                        size="sm"
                        className="h-8 px-4 text-xs font-semibold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                      >
                        Xong
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

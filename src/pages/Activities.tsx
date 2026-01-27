import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Footprints, Flame, Clock, TrendingUp } from "lucide-react";

export default function Activities() {
  return (
    <AppLayout>
      <div className="px-4 py-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground mb-6">Hoạt động</h1>
        
        {/* Daily Summary */}
        <Card className="mb-6 gradient-primary border-0">
          <CardContent className="p-6 text-center">
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-primary-foreground/30 flex items-center justify-center mb-4">
              <div className="text-center">
                <span className="text-3xl font-bold text-primary-foreground">4,230</span>
                <p className="text-xs text-primary-foreground/80">bước</p>
              </div>
            </div>
            <p className="text-primary-foreground/90">Mục tiêu: 10,000 bước</p>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-full bg-health-info/10">
                <Flame className="w-5 h-5 text-health-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">320</p>
                <p className="text-xs text-muted-foreground">Calo đốt</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs text-muted-foreground">Phút vận động</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity List */}
        <h2 className="text-lg font-semibold mb-3">Hoạt động gần đây</h2>
        <div className="space-y-3">
          {[
            { name: "Đi bộ buổi sáng", time: "07:30", duration: "30 phút", calories: 150 },
            { name: "Yoga", time: "12:00", duration: "15 phút", calories: 80 },
            { name: "Đạp xe", time: "17:00", duration: "45 phút", calories: 200 },
          ].map((activity, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Footprints className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.name}</p>
                    <p className="text-xs text-muted-foreground">{activity.time} • {activity.duration}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{activity.calories}</p>
                  <p className="text-xs text-muted-foreground">kcal</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

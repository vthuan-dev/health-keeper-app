import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Ruler, Scale, User } from "lucide-react";

interface HealthStats {
  age: number;
  height: number;
  weight: number;
  bmi: number;
}

interface HealthStatsCardProps {
  stats: HealthStats;
}

interface StatItemProps {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
  bg: string;
}

function StatItem({ icon: Icon, value, label, color, bg }: StatItemProps) {
  return (
    <div>
      <div className={`p-1.5 rounded-full ${bg} w-8 h-8 flex items-center justify-center mx-auto mb-1`}>
        <Icon className={`w-3.5 h-3.5 ${color}`} />
      </div>
      <p className="text-sm font-bold">{value}</p>
      <p className="text-[9px] text-muted-foreground">{label}</p>
    </div>
  );
}

export function HealthStatsCard({ stats }: HealthStatsCardProps) {
  return (
    <Card className="mb-4">
      <CardContent className="p-3">
        <h2 className="text-xs font-semibold mb-2 text-muted-foreground">THÔNG TIN SỨC KHỎE</h2>
        <div className="grid grid-cols-4 gap-2 text-center">
          <StatItem icon={Calendar} value={stats.age.toString()} label="Tuổi" color="text-primary" bg="bg-primary/10" />
          <StatItem icon={Ruler} value={stats.height.toString()} label="cm" color="text-health-info" bg="bg-health-info/10" />
          <StatItem icon={Scale} value={stats.weight.toString()} label="kg" color="text-health-accent" bg="bg-health-accent/10" />
          <StatItem icon={User} value={stats.bmi.toFixed(1)} label="BMI" color="text-primary" bg="bg-primary/10" />
        </div>
      </CardContent>
    </Card>
  );
}

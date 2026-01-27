import { Card, CardContent } from "@/components/ui/card";
import { Activity, Ruler, Scale, Heart } from "lucide-react";

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
  gradient: string;
}

function StatItem({ icon: Icon, value, label, gradient }: StatItemProps) {
  return (
    <div className="flex flex-col items-center p-3 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
      <div className={`p-2.5 rounded-xl ${gradient} mb-2`}>
        <Icon className="w-4 h-4 text-primary-foreground" />
      </div>
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
    </div>
  );
}

function getBMIStatus(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: "Thiếu cân", color: "text-health-info" };
  if (bmi < 25) return { label: "Bình thường", color: "text-health-accent" };
  if (bmi < 30) return { label: "Thừa cân", color: "text-health-warning" };
  return { label: "Béo phì", color: "text-destructive" };
}

export function HealthStatsCard({ stats }: HealthStatsCardProps) {
  const bmiStatus = getBMIStatus(stats.bmi);
  
  return (
    <Card className="mx-4 -mt-2 shadow-lg border-0 bg-card/80 backdrop-blur">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Thông tin sức khỏe
          </h2>
          <span className={`text-xs font-medium ${bmiStatus.color}`}>
            BMI: {bmiStatus.label}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <StatItem 
            icon={Heart} 
            value={stats.age.toString()} 
            label="Tuổi" 
            gradient="bg-gradient-to-br from-rose-500 to-pink-600" 
          />
          <StatItem 
            icon={Ruler} 
            value={stats.height.toString()} 
            label="cm" 
            gradient="bg-gradient-to-br from-blue-500 to-cyan-600" 
          />
          <StatItem 
            icon={Scale} 
            value={stats.weight.toString()} 
            label="kg" 
            gradient="bg-gradient-to-br from-amber-500 to-orange-600" 
          />
          <StatItem 
            icon={Activity} 
            value={stats.bmi.toFixed(1)} 
            label="BMI" 
            gradient="gradient-primary" 
          />
        </div>
      </CardContent>
    </Card>
  );
}

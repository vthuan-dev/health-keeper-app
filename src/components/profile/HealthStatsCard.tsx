import { Card, CardContent } from "@/components/ui/card";
import { Activity, Ruler, Scale, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

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
  iconBg: string;
  iconColor: string;
}

function StatItem({ icon: Icon, value, label, iconBg, iconColor }: StatItemProps) {
  return (
    <div className="flex flex-col items-center group">
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110",
        iconBg
      )}>
        <Icon className={cn("w-5 h-5", iconColor)} />
      </div>
      <p className="text-xl font-bold tracking-tight">{value}</p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{label}</p>
    </div>
  );
}

function getBMIStatus(bmi: number): { label: string; color: string; bg: string } {
  if (bmi < 18.5) return { label: "Thiếu cân", color: "text-blue-600", bg: "bg-blue-100" };
  if (bmi < 25) return { label: "Bình thường", color: "text-emerald-600", bg: "bg-emerald-100" };
  if (bmi < 30) return { label: "Thừa cân", color: "text-amber-600", bg: "bg-amber-100" };
  return { label: "Béo phì", color: "text-red-600", bg: "bg-red-100" };
}

export function HealthStatsCard({ stats }: HealthStatsCardProps) {
  const bmiStatus = getBMIStatus(stats.bmi);
  
  return (
    <Card className="mx-4 -mt-2 shadow-xl border-0 overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Thông tin sức khỏe
          </h2>
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-semibold",
            bmiStatus.bg,
            bmiStatus.color
          )}>
            BMI: {bmiStatus.label}
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2 p-4 bg-gradient-to-b from-muted/30 to-transparent">
          <StatItem 
            icon={Heart} 
            value={stats.age.toString()} 
            label="Tuổi" 
            iconBg="bg-rose-100 dark:bg-rose-500/20"
            iconColor="text-rose-500"
          />
          <StatItem 
            icon={Ruler} 
            value={stats.height.toString()} 
            label="cm" 
            iconBg="bg-sky-100 dark:bg-sky-500/20"
            iconColor="text-sky-500"
          />
          <StatItem 
            icon={Scale} 
            value={stats.weight.toString()} 
            label="kg" 
            iconBg="bg-emerald-100 dark:bg-emerald-500/20"
            iconColor="text-emerald-500"
          />
          <StatItem 
            icon={Activity} 
            value={stats.bmi.toFixed(1)} 
            label="BMI" 
            iconBg="bg-violet-100 dark:bg-violet-500/20"
            iconColor="text-violet-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}

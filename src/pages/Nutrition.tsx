import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  IconCoffee, 
  IconSun, 
  IconMoon,
  IconPlus,
  IconFlame,
  IconApple,
  IconMeat,
  IconBread
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Meal {
  id: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  name: string;
  calories: number;
  time: string;
}

const mealTypes = [
  { id: "breakfast", label: "Bữa sáng", icon: IconCoffee, color: "from-amber-400 to-orange-500" },
  { id: "lunch", label: "Bữa trưa", icon: IconSun, color: "from-emerald-400 to-teal-500" },
  { id: "dinner", label: "Bữa tối", icon: IconMoon, color: "from-indigo-400 to-purple-500" },
  { id: "snack", label: "Ăn vặt", icon: IconApple, color: "from-rose-400 to-pink-500" },
];

const mockMeals: Meal[] = [
  { id: "1", type: "breakfast", name: "Phở bò", calories: 450, time: "07:30" },
  { id: "2", type: "lunch", name: "Cơm sườn", calories: 650, time: "12:00" },
  { id: "3", type: "snack", name: "Trái cây", calories: 120, time: "15:30" },
];

export default function Nutrition() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(searchParams.get("add") === "true");
  const [meals, setMeals] = useState<Meal[]>(mockMeals);
  const [newMeal, setNewMeal] = useState({ type: "breakfast", name: "", calories: "" });

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const targetCalories = 2000;

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.calories) {
      toast({ title: "Vui lòng điền đầy đủ thông tin", variant: "destructive" });
      return;
    }
    
    const meal: Meal = {
      id: Date.now().toString(),
      type: newMeal.type as Meal["type"],
      name: newMeal.name,
      calories: parseInt(newMeal.calories),
      time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };
    
    setMeals([...meals, meal]);
    setNewMeal({ type: "breakfast", name: "", calories: "" });
    setIsAddOpen(false);
    toast({ title: "Đã thêm bữa ăn!" });
  };

  return (
    <AppLayout>
      <div className="px-4 py-4 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Dinh dưỡng</h1>
            <p className="text-xs text-muted-foreground">Theo dõi bữa ăn hôm nay</p>
          </div>
          <Button size="sm" className="gradient-primary" onClick={() => setIsAddOpen(true)}>
            <IconPlus className="w-4 h-4 mr-1" /> Thêm
          </Button>
        </div>

        {/* Calories Summary */}
        <Card className="mb-4 overflow-hidden">
          <div className="gradient-primary p-4">
            <div className="flex items-center justify-between text-primary-foreground">
              <div>
                <p className="text-sm opacity-80">Đã nạp hôm nay</p>
                <p className="text-3xl font-bold">{totalCalories}</p>
                <p className="text-sm opacity-80">/ {targetCalories} kcal</p>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center">
                <IconFlame className="w-10 h-10" />
              </div>
            </div>
            <div className="mt-3 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-full rounded-full transition-all"
                style={{ width: `${Math.min((totalCalories / targetCalories) * 100, 100)}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Macros */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { icon: IconBread, label: "Carbs", value: "180g", color: "text-amber-500", bg: "bg-amber-100" },
            { icon: IconMeat, label: "Protein", value: "65g", color: "text-rose-500", bg: "bg-rose-100" },
            { icon: IconApple, label: "Chất xơ", value: "25g", color: "text-emerald-500", bg: "bg-emerald-100" },
          ].map((macro) => (
            <Card key={macro.label}>
              <CardContent className="p-3 text-center">
                <div className={cn("w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center", macro.bg)}>
                  <macro.icon className={cn("w-5 h-5", macro.color)} />
                </div>
                <p className="text-lg font-bold">{macro.value}</p>
                <p className="text-[10px] text-muted-foreground">{macro.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Meals List */}
        <h2 className="text-sm font-semibold mb-2">Bữa ăn hôm nay</h2>
        <div className="space-y-2">
          {meals.map((meal) => {
            const mealType = mealTypes.find(t => t.id === meal.type)!;
            const Icon = mealType.icon;
            return (
              <Card key={meal.id}>
                <CardContent className="p-3 flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br", mealType.color)}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{meal.name}</p>
                    <p className="text-[10px] text-muted-foreground">{mealType.label} • {meal.time}</p>
                  </div>
                  <p className="text-sm font-semibold text-primary">{meal.calories} kcal</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add Meal Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-[90%] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Thêm bữa ăn</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {mealTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setNewMeal({ ...newMeal, type: type.id })}
                    className={cn(
                      "p-3 rounded-xl text-center transition-all",
                      newMeal.type === type.id 
                        ? `bg-gradient-to-br ${type.color} text-white` 
                        : "bg-muted hover:bg-muted/80"
                    )}
                  >
                    <Icon className="w-5 h-5 mx-auto mb-1" />
                    <span className="text-[10px] font-medium">{type.label}</span>
                  </button>
                );
              })}
            </div>
            <div>
              <Label>Tên món ăn</Label>
              <Input 
                placeholder="VD: Phở bò" 
                value={newMeal.name}
                onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Calories (kcal)</Label>
              <Input 
                type="number" 
                placeholder="VD: 450"
                value={newMeal.calories}
                onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
              />
            </div>
            <Button className="w-full gradient-primary" onClick={handleAddMeal}>
              Thêm bữa ăn
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
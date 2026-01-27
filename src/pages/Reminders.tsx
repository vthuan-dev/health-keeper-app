import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  IconPill,
  IconPlus,
  IconClock,
  IconCalendar,
  IconBell,
  IconCheck
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Reminder {
  id: string;
  name: string;
  dosage: string;
  times: string[];
  enabled: boolean;
  taken: boolean[];
}

const mockReminders: Reminder[] = [
  { id: "1", name: "Vitamin D", dosage: "1 viên", times: ["08:00"], enabled: true, taken: [true] },
  { id: "2", name: "Omega 3", dosage: "2 viên", times: ["08:00", "20:00"], enabled: true, taken: [true, false] },
  { id: "3", name: "Canxi", dosage: "1 viên", times: ["12:00"], enabled: false, taken: [false] },
];

const pillColors = [
  "from-rose-400 to-pink-500",
  "from-blue-400 to-indigo-500", 
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
  "from-violet-400 to-purple-500",
];

export default function Reminders() {
  const [searchParams] = useSearchParams();
  const [isAddOpen, setIsAddOpen] = useState(searchParams.get("add") === "true");
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);
  const [newReminder, setNewReminder] = useState({ name: "", dosage: "", time: "08:00" });

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const markTaken = (reminderId: string, timeIndex: number) => {
    setReminders(reminders.map(r => {
      if (r.id === reminderId) {
        const newTaken = [...r.taken];
        newTaken[timeIndex] = !newTaken[timeIndex];
        return { ...r, taken: newTaken };
      }
      return r;
    }));
    toast({ title: "Đã cập nhật!" });
  };

  const handleAddReminder = () => {
    if (!newReminder.name || !newReminder.dosage) {
      toast({ title: "Vui lòng điền đầy đủ thông tin", variant: "destructive" });
      return;
    }
    
    const reminder: Reminder = {
      id: Date.now().toString(),
      name: newReminder.name,
      dosage: newReminder.dosage,
      times: [newReminder.time],
      enabled: true,
      taken: [false],
    };
    
    setReminders([...reminders, reminder]);
    setNewReminder({ name: "", dosage: "", time: "08:00" });
    setIsAddOpen(false);
    toast({ title: "Đã thêm nhắc nhở!" });
  };

  const takenCount = reminders.reduce((sum, r) => sum + r.taken.filter(Boolean).length, 0);
  const totalCount = reminders.reduce((sum, r) => sum + r.times.length, 0);

  return (
    <AppLayout>
      <div className="px-4 py-4 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Nhắc thuốc</h1>
            <p className="text-xs text-muted-foreground">Quản lý thuốc và vitamin</p>
          </div>
          <Button size="sm" className="gradient-primary" onClick={() => setIsAddOpen(true)}>
            <IconPlus className="w-4 h-4 mr-1" /> Thêm
          </Button>
        </div>

        {/* Progress Card */}
        <Card className="mb-4 overflow-hidden">
          <div className="bg-gradient-to-br from-cyan-400 to-teal-500 p-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm opacity-80">Tiến độ hôm nay</p>
                <p className="text-3xl font-bold">{takenCount}/{totalCount}</p>
                <p className="text-sm opacity-80">lần uống thuốc</p>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center">
                <IconPill className="w-10 h-10" />
              </div>
            </div>
            <div className="mt-3 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-full rounded-full transition-all"
                style={{ width: `${totalCount > 0 ? (takenCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Reminders List */}
        <h2 className="text-sm font-semibold mb-2">Danh sách thuốc</h2>
        <div className="space-y-3">
          {reminders.map((reminder, idx) => (
            <Card key={reminder.id} className={cn(!reminder.enabled && "opacity-50")}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                    pillColors[idx % pillColors.length]
                  )}>
                    <IconPill className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{reminder.name}</p>
                      <Switch 
                        checked={reminder.enabled}
                        onCheckedChange={() => toggleReminder(reminder.id)}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{reminder.dosage}</p>
                    <div className="flex flex-wrap gap-2">
                      {reminder.times.map((time, timeIdx) => (
                        <button
                          key={timeIdx}
                          onClick={() => markTaken(reminder.id, timeIdx)}
                          className={cn(
                            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                            reminder.taken[timeIdx]
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          )}
                        >
                          {reminder.taken[timeIdx] ? (
                            <IconCheck className="w-3.5 h-3.5" />
                          ) : (
                            <IconClock className="w-3.5 h-3.5" />
                          )}
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Reminder Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-[90%] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Thêm nhắc thuốc</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Tên thuốc</Label>
              <Input 
                placeholder="VD: Vitamin D" 
                value={newReminder.name}
                onChange={(e) => setNewReminder({ ...newReminder, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Liều lượng</Label>
              <Input 
                placeholder="VD: 1 viên"
                value={newReminder.dosage}
                onChange={(e) => setNewReminder({ ...newReminder, dosage: e.target.value })}
              />
            </div>
            <div>
              <Label>Giờ uống</Label>
              <Input 
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
              />
            </div>
            <Button className="w-full gradient-primary" onClick={handleAddReminder}>
              Thêm nhắc nhở
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
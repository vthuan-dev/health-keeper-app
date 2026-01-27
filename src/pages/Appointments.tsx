import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  IconStethoscope,
  IconPlus,
  IconCalendar,
  IconClock,
  IconMapPin,
  IconUser
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
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  location: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

const mockAppointments: Appointment[] = [
  { 
    id: "1", 
    doctor: "BS. Nguyễn Văn A", 
    specialty: "Nội khoa", 
    location: "Bệnh viện Đa khoa Quốc tế",
    date: "2026-01-28",
    time: "09:00",
    status: "upcoming"
  },
  { 
    id: "2", 
    doctor: "BS. Trần Thị B", 
    specialty: "Da liễu", 
    location: "Phòng khám ABC",
    date: "2026-02-05",
    time: "14:30",
    status: "upcoming"
  },
  { 
    id: "3", 
    doctor: "BS. Lê Văn C", 
    specialty: "Tim mạch", 
    location: "Bệnh viện Chợ Rẫy",
    date: "2026-01-20",
    time: "10:00",
    status: "completed"
  },
];

const specialtyColors: Record<string, string> = {
  "Nội khoa": "from-blue-400 to-indigo-500",
  "Da liễu": "from-pink-400 to-rose-500",
  "Tim mạch": "from-red-400 to-rose-500",
  "Mắt": "from-cyan-400 to-teal-500",
  "Răng hàm mặt": "from-amber-400 to-orange-500",
  "default": "from-emerald-400 to-teal-500",
};

export default function Appointments() {
  const [searchParams] = useSearchParams();
  const [isAddOpen, setIsAddOpen] = useState(searchParams.get("add") === "true");
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [newAppt, setNewAppt] = useState({ 
    doctor: "", 
    specialty: "", 
    location: "", 
    date: "", 
    time: "09:00" 
  });

  const upcomingCount = appointments.filter(a => a.status === "upcoming").length;

  const handleAddAppointment = () => {
    if (!newAppt.doctor || !newAppt.specialty || !newAppt.date) {
      toast({ title: "Vui lòng điền đầy đủ thông tin", variant: "destructive" });
      return;
    }
    
    const appointment: Appointment = {
      id: Date.now().toString(),
      doctor: newAppt.doctor,
      specialty: newAppt.specialty,
      location: newAppt.location || "Chưa xác định",
      date: newAppt.date,
      time: newAppt.time,
      status: "upcoming",
    };
    
    setAppointments([...appointments, appointment]);
    setNewAppt({ doctor: "", specialty: "", location: "", date: "", time: "09:00" });
    setIsAddOpen(false);
    toast({ title: "Đã thêm lịch khám!" });
  };

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "EEEE, dd/MM/yyyy", { locale: vi });
  };

  return (
    <AppLayout>
      <div className="px-4 py-4 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Lịch khám</h1>
            <p className="text-xs text-muted-foreground">Quản lý lịch hẹn bác sĩ</p>
          </div>
          <Button size="sm" className="gradient-primary" onClick={() => setIsAddOpen(true)}>
            <IconPlus className="w-4 h-4 mr-1" /> Thêm
          </Button>
        </div>

        {/* Summary Card */}
        <Card className="mb-4 overflow-hidden">
          <div className="bg-gradient-to-br from-orange-400 to-red-500 p-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm opacity-80">Lịch hẹn sắp tới</p>
                <p className="text-3xl font-bold">{upcomingCount}</p>
                <p className="text-sm opacity-80">cuộc hẹn</p>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center">
                <IconStethoscope className="w-10 h-10" />
              </div>
            </div>
          </div>
        </Card>

        {/* Upcoming Appointments */}
        <h2 className="text-sm font-semibold mb-2">Sắp tới</h2>
        <div className="space-y-3 mb-4">
          {appointments.filter(a => a.status === "upcoming").map((appt) => {
            const colorClass = specialtyColors[appt.specialty] || specialtyColors.default;
            return (
              <Card key={appt.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                      colorClass
                    )}>
                      <IconStethoscope className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{appt.doctor}</p>
                      <p className="text-xs text-primary font-medium">{appt.specialty}</p>
                      <div className="flex flex-wrap gap-2 mt-2 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <IconCalendar className="w-3 h-3" />
                          {formatDate(appt.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <IconClock className="w-3 h-3" />
                          {appt.time}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
                        <IconMapPin className="w-3 h-3" />
                        {appt.location}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Past Appointments */}
        {appointments.filter(a => a.status === "completed").length > 0 && (
          <>
            <h2 className="text-sm font-semibold mb-2 text-muted-foreground">Đã hoàn thành</h2>
            <div className="space-y-3 opacity-60">
              {appointments.filter(a => a.status === "completed").map((appt) => (
                <Card key={appt.id}>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-muted">
                        <IconStethoscope className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{appt.doctor}</p>
                        <p className="text-[10px] text-muted-foreground">{appt.specialty} • {formatDate(appt.date)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Add Appointment Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-[90%] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Thêm lịch khám</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Bác sĩ</Label>
              <Input 
                placeholder="VD: BS. Nguyễn Văn A" 
                value={newAppt.doctor}
                onChange={(e) => setNewAppt({ ...newAppt, doctor: e.target.value })}
              />
            </div>
            <div>
              <Label>Chuyên khoa</Label>
              <Input 
                placeholder="VD: Nội khoa"
                value={newAppt.specialty}
                onChange={(e) => setNewAppt({ ...newAppt, specialty: e.target.value })}
              />
            </div>
            <div>
              <Label>Địa điểm</Label>
              <Input 
                placeholder="VD: Bệnh viện ABC"
                value={newAppt.location}
                onChange={(e) => setNewAppt({ ...newAppt, location: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Ngày khám</Label>
                <Input 
                  type="date"
                  value={newAppt.date}
                  onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
                />
              </div>
              <div>
                <Label>Giờ khám</Label>
                <Input 
                  type="time"
                  value={newAppt.time}
                  onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                />
              </div>
            </div>
            <Button className="w-full gradient-primary" onClick={handleAddAppointment}>
              Thêm lịch khám
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
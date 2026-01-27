import { AppLayout } from "@/components/layout/AppLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const profileSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().regex(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số"),
  age: z.coerce.number().min(1, "Tuổi phải lớn hơn 0").max(150, "Tuổi không hợp lệ"),
  gender: z.string().min(1, "Vui lòng chọn giới tính"),
  height: z.coerce.number().min(50, "Chiều cao tối thiểu 50cm").max(300, "Chiều cao tối đa 300cm"),
  weight: z.coerce.number().min(10, "Cân nặng tối thiểu 10kg").max(500, "Cân nặng tối đa 500kg"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const defaultProfile: ProfileFormData = {
  name: "Nguyễn Văn A",
  email: "nguyenvana@email.com",
  phone: "0901234567",
  age: 32,
  gender: "male",
  height: 175,
  weight: 68.5,
};

export default function EditProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: defaultProfile,
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      form.reset(JSON.parse(savedProfile));
    }
  }, [form]);

  const onSubmit = (data: ProfileFormData) => {
    localStorage.setItem("userProfile", JSON.stringify(data));
    toast({
      title: "Thành công!",
      description: "Thông tin hồ sơ đã được cập nhật.",
    });
    navigate("/profile");
  };

  return (
    <AppLayout>
      <div className="px-4 py-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">Chỉnh sửa hồ sơ</h1>
        </div>

        {/* Avatar */}
        <div className="text-center mb-4">
          <div className="relative inline-block">
            <Avatar className="w-20 h-20 border-4 border-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="text-xl bg-primary/10 text-primary">NA</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full gradient-primary"
            >
              <Camera className="w-3.5 h-3.5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Nhấn vào ảnh để thay đổi</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Personal Info */}
            <Card>
              <CardContent className="p-3 space-y-3">
                <h2 className="text-xs font-semibold text-muted-foreground">THÔNG TIN CÁ NHÂN</h2>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Họ và tên</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-9 text-sm" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" className="h-9 text-sm" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Số điện thoại</FormLabel>
                      <FormControl>
                        <Input {...field} type="tel" className="h-9 text-sm" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Health Info */}
            <Card>
              <CardContent className="p-3 space-y-3">
                <h2 className="text-xs font-semibold text-muted-foreground">THÔNG TIN SỨC KHỎE</h2>
                
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Tuổi</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" className="h-9 text-sm" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Giới tính</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue placeholder="Chọn" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Nam</SelectItem>
                            <SelectItem value="female">Nữ</SelectItem>
                            <SelectItem value="other">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Chiều cao (cm)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" step="0.1" className="h-9 text-sm" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Cân nặng (kg)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" step="0.1" className="h-9 text-sm" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full gradient-primary">
              Lưu thay đổi
            </Button>
          </form>
        </Form>
      </div>
    </AppLayout>
  );
}

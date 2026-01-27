import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { AppLogo } from "@/components/common/AppLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const forgotPasswordSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <AppLogo size="lg" className="mb-4" />
        <p className="text-sm text-muted-foreground text-center mb-8">
          Quản lý sức khỏe thông minh mỗi ngày
        </p>

        <div className="w-full">
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Đã gửi email!</h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để đặt lại mật khẩu.
              </p>
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl"
                onClick={() => navigate("/auth")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại đăng nhập
              </Button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/auth")}
                className="flex items-center gap-2 text-sm text-muted-foreground mb-6 hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại
              </button>

              <h2 className="text-xl font-semibold mb-2">Quên mật khẩu?</h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Nhập email của bạn để nhận link đặt lại mật khẩu
              </p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              placeholder="email@example.com"
                              className="pl-11 h-12 text-sm bg-muted/30 border-muted-foreground/20 rounded-xl"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 gradient-primary rounded-xl text-base font-semibold shadow-health"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang gửi..." : "Gửi link đặt lại"}
                  </Button>
                </form>
              </Form>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          © 2024 HealthCare. Bảo mật dữ liệu sức khỏe của bạn.
        </p>
      </div>
    </div>
  );
}

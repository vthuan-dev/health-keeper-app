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
        <AppLogo size="md" className="mb-6" />

        <Card className="w-full">
          <CardContent className="p-4">
            {isSuccess ? (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-lg font-semibold mb-2">Đã gửi email!</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn để đặt lại mật khẩu.
                </p>
                <Button
                  variant="outline"
                  className="w-full h-10"
                  onClick={() => navigate("/auth")}
                >
                  Quay lại đăng nhập
                </Button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/auth")}
                  className="flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Quay lại
                </button>

                <h2 className="text-lg font-semibold mb-1">Quên mật khẩu?</h2>
                <p className="text-xs text-muted-foreground mb-4">
                  Nhập email của bạn để nhận link đặt lại mật khẩu
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                placeholder="email@example.com"
                                className="pl-9 h-10 text-sm"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full h-10 gradient-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Đang gửi..." : "Gửi link đặt lại"}
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

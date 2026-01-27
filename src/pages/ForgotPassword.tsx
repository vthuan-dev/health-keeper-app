import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft, CheckCircle, ArrowRight, RefreshCw } from "lucide-react";
import { AppLogo } from "@/components/common/AppLogo";
import { AnimatedContainer } from "@/components/common/AnimatedContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type Step = "input" | "sent" | "resend";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<Step>("input");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setSubmittedEmail(data.email);
    setStep("sent");
  };

  const handleResend = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("resend");
  };

  const renderInputStep = () => (
    <AnimatedContainer animation="fade-up" delay={100} className="w-full">
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
            className="w-full h-12 gradient-primary rounded-xl text-base font-semibold shadow-health gap-2"
            disabled={isLoading}
          >
            {isLoading ? "Đang gửi..." : "Gửi link đặt lại"}
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </Button>
        </form>
      </Form>
    </AnimatedContainer>
  );

  const renderSentStep = () => (
    <AnimatedContainer animation="scale" delay={100} className="w-full text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-primary" />
      </div>
      
      <h2 className="text-xl font-semibold mb-2">Đã gửi email!</h2>
      <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
        Chúng tôi đã gửi link đặt lại mật khẩu đến:
      </p>
      <p className="text-sm font-medium text-primary mb-6">{submittedEmail}</p>
      
      <div className="bg-muted/50 rounded-xl p-4 mb-6">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Vui lòng kiểm tra hộp thư đến (và thư mục spam) để tìm email từ chúng tôi. 
          Link sẽ hết hạn sau 1 giờ.
        </p>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl gap-2"
          onClick={() => navigate("/auth")}
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại đăng nhập
        </Button>
        
        <button
          onClick={handleResend}
          disabled={isLoading}
          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 mx-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          {isLoading ? "Đang gửi lại..." : "Không nhận được? Gửi lại"}
        </button>
      </div>
    </AnimatedContainer>
  );

  const renderResendStep = () => (
    <AnimatedContainer animation="fade-in" delay={100} className="w-full text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <Mail className="w-10 h-10 text-primary" />
      </div>
      
      <h2 className="text-xl font-semibold mb-2">Đã gửi lại!</h2>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        Chúng tôi đã gửi lại link đặt lại mật khẩu đến <span className="font-medium text-primary">{submittedEmail}</span>
      </p>
      
      <div className="bg-muted/50 rounded-xl p-4 mb-6">
        <h4 className="text-sm font-medium mb-2">Vẫn không nhận được?</h4>
        <ul className="text-xs text-muted-foreground text-left space-y-1">
          <li>• Kiểm tra thư mục spam/junk</li>
          <li>• Đảm bảo email đúng chính tả</li>
          <li>• Chờ vài phút và thử lại</li>
        </ul>
      </div>

      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full h-12 rounded-xl gap-2"
          onClick={() => navigate("/auth")}
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại đăng nhập
        </Button>
        
        <button
          onClick={() => {
            setStep("input");
            form.reset();
          }}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Thử email khác
        </button>
      </div>
    </AnimatedContainer>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <AppLogo size="lg" className="mb-4" />
        <p className="text-sm text-muted-foreground text-center mb-8">
          Quản lý sức khỏe thông minh mỗi ngày
        </p>

        <div className="w-full">
          {step === "input" && renderInputStep()}
          {step === "sent" && renderSentStep()}
          {step === "resend" && renderResendStep()}
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

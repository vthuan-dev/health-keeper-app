import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MessageCircle,
  Info,
  Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "Làm thế nào để thêm dữ liệu sức khỏe?",
    answer: "Bạn có thể thêm dữ liệu sức khỏe bằng cách vào mục 'Chỉ số sức khỏe' và nhấn nút '+' để thêm các chỉ số như cân nặng, huyết áp, nhịp tim, đường huyết.",
  },
  {
    question: "Dữ liệu của tôi có được bảo mật không?",
    answer: "Tất cả dữ liệu của bạn được mã hóa và lưu trữ an toàn trên thiết bị. Chúng tôi không chia sẻ thông tin cá nhân với bất kỳ bên thứ ba nào.",
  },
  {
    question: "Làm sao để đặt nhắc nhở uống thuốc?",
    answer: "Vào mục 'Hoạt động' và chọn 'Thêm nhắc nhở'. Bạn có thể thiết lập thời gian, tần suất và nội dung nhắc nhở theo ý muốn.",
  },
  {
    question: "Ứng dụng có hỗ trợ đồng bộ thiết bị không?",
    answer: "Hiện tại ứng dụng đang lưu dữ liệu cục bộ trên thiết bị. Tính năng đồng bộ đám mây sẽ được cập nhật trong phiên bản tới.",
  },
  {
    question: "Tôi quên mật khẩu, phải làm sao?",
    answer: "Tại màn hình đăng nhập, nhấn 'Quên mật khẩu?' và nhập email đã đăng ký. Chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu qua email.",
  },
];

export default function HelpSupport() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-4 py-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">Trợ giúp</h1>
        </div>

        {/* FAQ Section */}
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-muted-foreground mb-2">CÂU HỎI THƯỜNG GẶP</h2>
          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                    <AccordionTrigger className="px-3 py-3 text-sm text-left hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-3 text-xs text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-muted-foreground mb-2">LIÊN HỆ HỖ TRỢ</h2>
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              <a href="mailto:support@healthapp.vn" className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors">
                <div className="p-2 rounded-full bg-primary/10">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-muted-foreground">support@healthapp.vn</p>
                </div>
              </a>

              <a href="tel:19001234" className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors">
                <div className="p-2 rounded-full bg-health-info/10">
                  <Phone className="w-4 h-4 text-health-info" />
                </div>
                <div>
                  <p className="text-sm font-medium">Hotline</p>
                  <p className="text-xs text-muted-foreground">1900 1234 (8:00 - 22:00)</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="p-2 rounded-full bg-health-accent/10">
                  <MessageCircle className="w-4 h-4 text-health-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Chat trực tuyến</p>
                  <p className="text-xs text-muted-foreground">Trả lời trong vòng 5 phút</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* About Section */}
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground mb-2">VỀ ỨNG DỤNG</h2>
          <Card>
            <CardContent className="p-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <Heart className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold">Health Care App</p>
                  <p className="text-xs text-muted-foreground">Phiên bản 1.0.0</p>
                </div>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  <span>Ứng dụng theo dõi sức khỏe toàn diện</span>
                </div>
                <p className="pl-5">© 2024 Health Care Team. All rights reserved.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

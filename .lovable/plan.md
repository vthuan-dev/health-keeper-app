

## 🏥 Ứng dụng Quản lý Sức khỏe - Kế hoạch MVP

Xây dựng ứng dụng quản lý sức khỏe với theme xanh lá tươi mát, tập trung vào giao diện đẹp và trải nghiệm người dùng tốt. Dữ liệu sẽ được lưu tạm trong browser (localStorage) để demo.

---

### 📦 Giai đoạn 1: Nền tảng & Thiết kế

**🎨 Thiết lập Design System**
- Cập nhật theme màu xanh lá (#4CAF50, #81C784, #388E3C, #66BB6A)
- Background xanh nhạt (#F1F8F4)
- Typography và spacing theo yêu cầu
- Components cơ bản: Buttons gradient, Cards với shadows, Input fields với icons

**🧭 Navigation**
- Bottom Navigation Bar với 5 tabs (Trang chủ, Hoạt động, Thêm +, Thống kê, Hồ sơ)
- Nút "+" nổi ở giữa với gradient xanh
- Hiệu ứng active/inactive cho tabs

---

### 📦 Giai đoạn 2: Authentication Screens

**🔐 Màn Đăng nhập**
- Logo trái tim + lá cây
- Form đăng nhập với validation
- Nút gradient xanh, link quên mật khẩu

**✍️ Màn Đăng ký**
- Form đăng ký với password strength indicator
- Checkbox điều khoản sử dụng

**🔑 Màn Quên/Đặt lại mật khẩu**
- Giao diện gửi email reset
- Success messages

---

### 📦 Giai đoạn 3: Dashboard & Hồ sơ

**🏠 Trang chủ (Dashboard)**
- Header với avatar, tên user, notification bell
- Daily Plan Card (mock AI content)
- 3 Quick Stats cards: Cân nặng/BMI, Bước chân, Calo
- Mini charts cho chỉ số sức khỏe
- 4 Quick Action buttons tròn
- Reminders Today section

**👤 Màn Hồ sơ**
- Avatar lớn với nút edit
- Thông tin cá nhân (tuổi, giới tính, chiều cao, cân nặng, BMI)
- Health summary stats
- Settings list với toggles

---

### 📦 Giai đoạn 4: Core Features (4 tính năng ưu tiên)

**📊 Theo dõi Chỉ số Sức khỏe**
- Tabs: Cân nặng, Huyết áp, Nhịp tim, Đường huyết
- Line charts với Recharts
- List các bản ghi với swipe-to-delete
- Modal thêm/sửa chỉ số
- Empty state khi chưa có dữ liệu

**🏃 Quản lý Hoạt động**
- Daily summary với progress ring
- List hoạt động đã ghi
- Weekly bar chart
- Modal thêm hoạt động (chọn loại, thời gian, calo)

**🍽️ Quản lý Dinh dưỡng**
- Circular progress calo hàng ngày
- Phân nhóm bữa ăn (Sáng, Trưa, Tối, Snack)
- Weekly calorie chart
- Modal thêm bữa ăn

**⏰ Nhắc nhở**
- List reminders với toggle on/off
- Filter theo type (thuốc, nước, tập thể dục, khám)
- Completed today section
- Modal tạo reminder với time picker

---

### 📦 Giai đoạn 5: Tính năng bổ sung

**📈 Thống kê**
- Date range picker (7 ngày/30 ngày/3 tháng)
- Overview cards với averages
- Weight trend chart
- Blood pressure dual-line chart
- Activity bar chart

**🤖 AI Chatbot (Mock)**
- Chat interface với bot/user bubbles
- Suggested questions chips
- Typing indicator animation
- Medical disclaimer banner
- Mock responses có sẵn

**📅 Kế hoạch hàng ngày (Mock AI)**
- Daily plan card với AI-generated content
- Sections: Thời gian thức, Lịch tập, Bữa ăn, Nghỉ ngơi, Lời khuyên
- Checklist items
- History screen

**🔔 Thông báo**
- List notifications (read/unread)
- Type icons và badges

**⚙️ Cài đặt**
- Notification toggles
- Unit preferences (kg/lb, cm/inch)
- Language selector
- Security options

---

### 🎯 Kết quả MVP

Một ứng dụng quản lý sức khỏe hoàn chỉnh về mặt giao diện với:
- 15+ màn hình theo đúng thiết kế
- Theme xanh lá đẹp mắt, thân thiện
- Dữ liệu demo lưu trong localStorage
- Sẵn sàng kết nối backend (Supabase) khi cần
- AI responses mock có thể thay bằng OpenAI API sau


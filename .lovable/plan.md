

## Kế hoạch: Implement trang Hồ sơ với các màn hình con

Xây dựng các màn hình con và chức năng tương tác cho trang Profile, giúp người dùng có thể bấm vào từng mục và xem chi tiết.

---

### 1. Tạo các màn hình con

**EditProfile (Chỉnh sửa hồ sơ)**
- Form chỉnh sửa thông tin cá nhân: Tên, Email, Số điện thoại
- Form chỉnh sửa thông tin sức khỏe: Tuổi, Giới tính, Chiều cao, Cân nặng
- Nút Upload/đổi avatar
- Nút Lưu với validation

**NotificationSettings (Cài đặt thông báo)**
- Danh sách các loại thông báo có thể bật/tắt:
  - Nhắc nhở uống thuốc
  - Nhắc nhở tập thể dục
  - Nhắc nhở đo chỉ số
  - Cập nhật sức khỏe hàng tuần
- Toggle switch cho từng loại

**PrivacySettings (Quyền riêng tư)**
- Các tùy chọn bảo mật:
  - Ẩn thông tin sức khỏe
  - Yêu cầu xác thực khi mở app
  - Xóa dữ liệu cá nhân
- Toggle và action buttons

**HelpSupport (Trợ giúp)**
- FAQ - Câu hỏi thường gặp (accordion)
- Liên hệ hỗ trợ (email, điện thoại)
- Về ứng dụng (phiên bản, thông tin)

---

### 2. Cập nhật Profile.tsx

- Thêm navigation handlers cho từng SettingItem
- Thêm onClick prop cho SettingItem component
- Xử lý đăng xuất (mock - redirect về /auth)
- Xử lý toggle Dark Mode với next-themes (đã có sẵn)
- Xử lý toggle Thông báo (lưu vào localStorage)

---

### 3. Cấu trúc files mới

```text
src/
├── pages/
│   ├── Profile.tsx (cập nhật)
│   ├── EditProfile.tsx (mới)
│   ├── NotificationSettings.tsx (mới)
│   ├── PrivacySettings.tsx (mới)
│   └── HelpSupport.tsx (mới)
├── components/
│   └── profile/
│       ├── ProfileHeader.tsx (tách ra)
│       ├── HealthStatsCard.tsx (tách ra)
│       └── SettingsList.tsx (tách ra)
```

---

### 4. Routing mới trong App.tsx

```text
/profile           - Trang hồ sơ chính
/profile/edit      - Chỉnh sửa hồ sơ
/profile/notifications - Cài đặt thông báo
/profile/privacy   - Quyền riêng tư
/profile/help      - Trợ giúp
```

---

### 5. Chi tiết kỹ thuật

**SettingItem Component**
- Thêm `onClick` prop để xử lý navigation
- Thêm `to` prop cho react-router navigation
- Hover effect và active state

**Dark Mode Toggle**
- Sử dụng `next-themes` (đã cài sẵn)
- Thêm ThemeProvider vào App.tsx
- Toggle switch cập nhật theme realtime

**Form Validation**
- Sử dụng react-hook-form + zod (đã dùng ở Auth)
- Validation cho email, số điện thoại
- Validation cho chiều cao, cân nặng (số dương)

**Data Storage (Mock)**
- Lưu user profile vào localStorage
- Load data khi component mount
- Update data khi submit form

---

### 6. Kết quả

Sau khi implement:
- Bấm "Chỉnh sửa hồ sơ" -> Mở trang EditProfile
- Bấm "Thông báo" -> Toggle ngay tại chỗ hoặc mở trang chi tiết
- Bấm "Chế độ tối" -> Toggle dark/light mode
- Bấm "Quyền riêng tư" -> Mở trang PrivacySettings
- Bấm "Trợ giúp" -> Mở trang HelpSupport
- Bấm "Đăng xuất" -> Hiển thị confirm dialog, sau đó redirect về /auth


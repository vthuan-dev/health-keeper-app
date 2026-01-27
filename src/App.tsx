import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import NotificationSettings from "./pages/NotificationSettings";
import PrivacySettings from "./pages/PrivacySettings";
import HelpSupport from "./pages/HelpSupport";
import QuickMenuSettings from "./pages/QuickMenuSettings";
import AddEntry from "./pages/AddEntry";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import HealthMetrics from "./pages/HealthMetrics";
import Nutrition from "./pages/Nutrition";
import Reminders from "./pages/Reminders";
import Appointments from "./pages/Appointments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/profile/notifications" element={<NotificationSettings />} />
            <Route path="/profile/privacy" element={<PrivacySettings />} />
            <Route path="/profile/help" element={<HelpSupport />} />
            <Route path="/profile/quick-menu" element={<QuickMenuSettings />} />
            <Route path="/add" element={<AddEntry />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/health-metrics" element={<HealthMetrics />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/appointments" element={<Appointments />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

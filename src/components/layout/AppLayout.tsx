import { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { AIChatbot } from "@/components/chatbot/AIChatbot";

interface AppLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function AppLayout({ children, hideNav = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <main className={hideNav ? "" : "pb-20"}>
        {children}
      </main>
      {!hideNav && <BottomNavigation />}
      {!hideNav && <AIChatbot />}
    </div>
  );
}

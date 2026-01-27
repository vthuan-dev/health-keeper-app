import { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";
import { AIChatbot } from "@/components/chatbot/AIChatbot";
import { PageTransition } from "@/components/common/PageTransition";

interface AppLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function AppLayout({ children, hideNav = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">
      <main className={hideNav ? "" : "pb-20"}>
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      {!hideNav && <BottomNavigation />}
      {!hideNav && <AIChatbot />}
    </div>
  );
}

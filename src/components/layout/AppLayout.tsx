import { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";

interface AppLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function AppLayout({ children, hideNav = false }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className={hideNav ? "" : "mb-nav pb-4"}>
        {children}
      </main>
      {!hideNav && <BottomNavigation />}
    </div>
  );
}

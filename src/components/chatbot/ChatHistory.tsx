import { History, Trash2, MessageCircle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface ChatSession {
  id: string;
  title: string;
  messages: Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatHistoryProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (session: ChatSession) => void;
  onNewChat: () => void;
  onDeleteSession: (sessionId: string) => void;
  onBack: () => void;
}

export function ChatHistory({
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onBack,
}: ChatHistoryProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Hôm nay";
    if (days === 1) return "Hôm qua";
    if (days < 7) return `${days} ngày trước`;
    return new Date(date).toLocaleDateString("vi-VN");
  };

  const groupedSessions = sessions.reduce((acc, session) => {
    const dateKey = formatDate(session.updatedAt);
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(session);
    return acc;
  }, {} as Record<string, ChatSession[]>);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-xl"
          onClick={onBack}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Lịch sử chat</h3>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="px-4 py-3">
        <Button
          onClick={onNewChat}
          className="w-full rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Cuộc trò chuyện mới
        </Button>
      </div>

      {/* Sessions List */}
      <ScrollArea className="flex-1 px-4">
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
              <History className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Chưa có lịch sử chat nào
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              Bắt đầu cuộc trò chuyện mới ngay!
            </p>
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {Object.entries(groupedSessions).map(([date, dateSessions]) => (
              <div key={date}>
                <p className="text-xs font-medium text-muted-foreground mb-2 px-1">
                  {date}
                </p>
                <div className="space-y-2">
                  {dateSessions.map((session) => (
                    <div
                      key={session.id}
                      className={cn(
                        "group relative rounded-xl border border-border/50 p-3 cursor-pointer transition-all hover:bg-muted/50 hover:border-primary/30",
                        currentSessionId === session.id &&
                          "bg-primary/5 border-primary/30"
                      )}
                      onClick={() => onSelectSession(session)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                          <MessageCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {session.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {session.messages.length} tin nhắn •{" "}
                            {new Date(session.updatedAt).toLocaleTimeString(
                              "vi-VN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteSession(session.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

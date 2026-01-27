import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles, Stethoscope, Heart, Apple, Dumbbell, Moon, History, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChatHistory, ChatSession } from "./ChatHistory";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface QuickAction {
  icon: React.ElementType;
  label: string;
  message: string;
}

const quickActions: QuickAction[] = [
  { icon: Heart, label: "Huyết áp", message: "Huyết áp của tôi cao, tôi nên làm gì?" },
  { icon: Apple, label: "Dinh dưỡng", message: "Chế độ ăn healthy cho người giảm cân?" },
  { icon: Dumbbell, label: "Tập luyện", message: "Bài tập cardio hiệu quả cho người mới?" },
  { icon: Moon, label: "Giấc ngủ", message: "Làm sao để ngủ ngon hơn?" },
];

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Xin chào! 👋 Tôi là **Bác sĩ AI** - trợ lý sức khỏe thông minh của bạn.\n\nTôi có thể giúp bạn:\n• Tư vấn về sức khỏe & dinh dưỡng\n• Phân tích các chỉ số cơ thể\n• Đề xuất bài tập phù hợp\n\nHãy hỏi tôi bất cứ điều gì! 🩺",
  timestamp: new Date(),
};

const STORAGE_KEY = "ai-doctor-chat-history";

const loadSessions = (): ChatSession[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const sessions = JSON.parse(data);
      return sessions.map((s: ChatSession) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt),
        messages: s.messages.map((m) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })),
      }));
    }
  } catch (e) {
    console.error("Failed to load chat history:", e);
  }
  return [];
};

const saveSessions = (sessions: ChatSession[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error("Failed to save chat history:", e);
  }
};

const generateTitle = (messages: Message[]): string => {
  const firstUserMessage = messages.find((m) => m.role === "user");
  if (firstUserMessage) {
    const title = firstUserMessage.content.slice(0, 40);
    return title.length < firstUserMessage.content.length ? `${title}...` : title;
  }
  return "Cuộc trò chuyện mới";
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>(() => loadSessions());
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current && !showHistory) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, showHistory]);

  // Save current session when messages change
  useEffect(() => {
    if (messages.length > 1 && currentSessionId) {
      setSessions((prev) => {
        const updated = prev.map((s) =>
          s.id === currentSessionId
            ? { ...s, messages, title: generateTitle(messages), updatedAt: new Date() }
            : s
        );
        saveSessions(updated);
        return updated;
      });
    }
  }, [messages, currentSessionId]);

  const startNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: "Cuộc trò chuyện mới",
      messages: [INITIAL_MESSAGE],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions((prev) => {
      const updated = [newSession, ...prev];
      saveSessions(updated);
      return updated;
    });
    setCurrentSessionId(newSession.id);
    setMessages([INITIAL_MESSAGE]);
    setShowHistory(false);
  };

  const selectSession = (session: ChatSession) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setShowHistory(false);
  };

  const deleteSession = (sessionId: string) => {
    setSessions((prev) => {
      const updated = prev.filter((s) => s.id !== sessionId);
      saveSessions(updated);
      return updated;
    });
    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
      setMessages([INITIAL_MESSAGE]);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Auto-create session if none exists
    if (!currentSessionId) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: "Cuộc trò chuyện mới",
        messages: [INITIAL_MESSAGE],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setSessions((prev) => {
        const updated = [newSession, ...prev];
        saveSessions(updated);
        return updated;
      });
      setCurrentSessionId(newSession.id);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Đó là một câu hỏi rất hay! 🎯\n\nDựa trên thông tin bạn cung cấp, tôi khuyên bạn nên:\n\n1. **Duy trì chế độ ăn cân bằng** - ưu tiên rau xanh và protein\n2. **Tập thể dục đều đặn** - ít nhất 30 phút/ngày\n3. **Uống đủ nước** - 2-3 lít mỗi ngày\n\nBạn có muốn tôi giải thích chi tiết hơn không? 💪",
        "Tôi hiểu lo lắng của bạn! 😊\n\nĐể có kết quả chính xác, bạn nên:\n\n• **Theo dõi chỉ số** hàng ngày\n• **Ghi chép** lại các triệu chứng\n• **Tham khảo bác sĩ** nếu cần thiết\n\nMột số lời khuyên: ngủ đủ 7-8 tiếng và giảm stress. 🌟",
        "Cảm ơn bạn đã chia sẻ! 🙏\n\nViệc theo dõi sức khỏe hàng ngày rất quan trọng. Dựa vào dữ liệu của bạn, tôi thấy:\n\n✅ **Điểm tốt**: Bạn đang duy trì thói quen tốt\n⚠️ **Cần cải thiện**: Có thể tăng cường vận động\n\nHãy tiếp tục cố gắng nhé! 💚",
        "Theo thông tin bạn cung cấp, đây là gợi ý của tôi: 📋\n\n**Chế độ ăn:**\n• Bổ sung rau xanh và trái cây\n• Hạn chế đường và muối\n• Ăn đủ protein\n\n**Vận động:**\n• Đi bộ 30 phút/ngày\n• Yoga hoặc stretching buổi sáng\n\nBạn cần tư vấn thêm gì không? 🥗",
      ];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => sendMessage(input);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    sendMessage(action.message);
  };

  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\n/g, '<br/>');
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95",
          "bg-gradient-to-br from-primary via-primary to-primary/80",
          "flex items-center justify-center group",
          "before:absolute before:inset-0 before:rounded-full before:bg-primary/20 before:animate-ping before:opacity-75",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
        aria-label="Mở chatbot bác sĩ AI"
      >
        <Stethoscope className="w-6 h-6 text-primary-foreground relative z-10 group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-health-accent to-primary rounded-full flex items-center justify-center shadow-lg border-2 border-background">
          <Sparkles className="w-2.5 h-2.5 text-primary-foreground" />
        </span>
      </button>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 transition-all duration-500 ease-out",
          "max-w-md mx-auto",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="bg-card border border-border/50 rounded-t-[28px] shadow-2xl overflow-hidden flex flex-col h-[75vh]">
          {/* Show History View or Chat View */}
          {showHistory ? (
            <ChatHistory
              sessions={sessions}
              currentSessionId={currentSessionId}
              onSelectSession={selectSession}
              onNewChat={startNewChat}
              onDeleteSession={deleteSession}
              onBack={() => setShowHistory(false)}
            />
          ) : (
            <>
              {/* Header */}
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-health-accent opacity-95" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoLTR2LTJoNHYtNGgydjRoNHYyaC00djR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                
                <div className="relative px-5 py-4 flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-background/20 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20 shadow-lg">
                      <Bot className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-primary rounded-full shadow-sm" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-primary-foreground text-base">Bác sĩ AI</h3>
                      <span className="px-2 py-0.5 bg-primary-foreground/20 rounded-full text-[10px] font-medium text-primary-foreground">
                        Online
                      </span>
                    </div>
                    <p className="text-xs text-primary-foreground/80 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Tư vấn sức khỏe thông minh 24/7
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary-foreground hover:bg-primary-foreground/20 rounded-xl h-10 w-10"
                      onClick={() => setShowHistory(true)}
                    >
                      <History className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary-foreground hover:bg-primary-foreground/20 rounded-xl h-10 w-10"
                      onClick={startNewChat}
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary-foreground hover:bg-primary-foreground/20 rounded-xl h-10 w-10"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

          {/* Messages */}
          <ScrollArea ref={scrollRef} className="flex-1 px-4 py-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 animate-fade-in",
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 border border-primary/10">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                      message.role === "user"
                        ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-tr-md"
                        : "bg-muted/80 text-foreground rounded-tl-md border border-border/50"
                    )}
                  >
                    <div 
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                    <p
                      className={cn(
                        "text-[10px] mt-2 flex items-center gap-1",
                        message.role === "user"
                          ? "text-primary-foreground/60 justify-end"
                          : "text-muted-foreground"
                      )}
                    >
                      {message.timestamp.toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {message.role === "user" && (
                        <span className="inline-flex">✓✓</span>
                      )}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shrink-0 shadow-md">
                      <User className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 animate-fade-in">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/10">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted/80 rounded-2xl rounded-tl-md px-4 py-4 border border-border/50">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions - Show only after first message */}
              {messages.length === 1 && !isTyping && (
                <div className="pt-2 animate-fade-in">
                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Gợi ý nhanh
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, idx) => {
                      const Icon = action.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(action)}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/50 border border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all text-left group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-xs font-medium text-foreground">{action.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border/50 bg-background/80 backdrop-blur-sm">
            <div className="flex gap-2 items-center">
              <div className="flex-1 relative">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập câu hỏi sức khỏe..."
                  className="w-full rounded-xl bg-muted/50 border-border/50 focus-visible:ring-primary/50 pr-4 h-11"
                />
              </div>
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                size="icon"
                className="rounded-xl h-11 w-11 shrink-0 bg-gradient-to-br from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-md"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <p className="text-[10px] text-muted-foreground">
                Được hỗ trợ bởi AI • Chỉ mang tính tham khảo
              </p>
            </div>
          </div>
            </>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

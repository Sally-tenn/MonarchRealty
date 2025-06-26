import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { MessageCircle, Send, Minus, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";

interface ChatMessage {
  id: string;
  message: string;
  response: string;
  timestamp: Date;
  isUser: boolean;
}

export default function AIChatbot() {
  const { isAuthenticated, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: chatHistory } = useQuery({
    queryKey: ['/api/ai/chat/history', { limit: 20 }],
    enabled: isAuthenticated && isOpen,
  });

  const chatMutation = useMutation({
    mutationFn: async ({ message, context }: { message: string; context?: any }) => {
      const response = await apiRequest('POST', '/api/ai/chat', { message, context });
      return response.json();
    },
    onSuccess: (data, variables) => {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        message: variables.message,
        response: data.response,
        timestamp: new Date(),
        isUser: false,
      };
      setLocalMessages(prev => [...prev, newMessage]);
      scrollToBottom();
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || chatMutation.isPending) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: message.trim(),
      response: "",
      timestamp: new Date(),
      isUser: true,
    };
    setLocalMessages(prev => [...prev, userMessage]);

    // Send to AI
    chatMutation.mutate({ 
      message: message.trim(),
      context: { userRole: user?.role }
    });
    
    setMessage("");
  };

  const allMessages = [...(chatHistory || []), ...localMessages].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <GlassCard className="w-96 max-w-[calc(100vw-3rem)] shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary-purple to-purple-600 rounded-full flex items-center justify-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <h4 className="font-semibold text-slate-dark font-['Poppins']">
                AI Assistant
              </h4>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 h-8 w-8 p-0"
              >
                <Minus size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
          
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {allMessages.length === 0 ? (
              <div className="glass-input p-3 rounded-xl">
                <p className="text-sm text-slate-700">
                  Hi! I'm your AI assistant. How can I help you with your real estate needs today?
                </p>
              </div>
            ) : (
              allMessages.map((msg, index) => (
                <div key={msg.id || index}>
                  {msg.isUser ? (
                    <div className="bg-primary-blue p-3 rounded-xl ml-8 text-white">
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  ) : (
                    <>
                      <div className="glass-input p-3 rounded-xl">
                        <p className="text-sm text-slate-700">{msg.message || 'User message'}</p>
                      </div>
                      <div className="glass-input p-3 rounded-xl ml-4">
                        <p className="text-sm text-slate-700">{msg.response}</p>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
            
            {chatMutation.isPending && (
              <div className="glass-input p-3 rounded-xl ml-4">
                <p className="text-sm text-slate-700">Thinking...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Ask me anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={chatMutation.isPending}
              className="glass-input flex-1 text-sm"
            />
            <Button
              type="submit"
              disabled={chatMutation.isPending || !message.trim()}
              className="bg-primary-blue hover:bg-blue-700 text-white px-4 py-2 transition-colors"
            >
              <Send size={16} />
            </Button>
          </form>
        </GlassCard>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full glass-card shadow-2xl hover:scale-110 transition-transform p-0"
        >
          <MessageCircle className="text-primary-blue" size={24} />
        </Button>
      )}
    </div>
  );
}

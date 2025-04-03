
import React, { useState, useRef, useEffect } from 'react';
import { Send, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    text: "Hi there! I'm your mental health assistant. How are you feeling today?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

const QUICK_REPLIES = [
  "I'm feeling anxious",
  "I need some coping strategies",
  "Tell me about stress management",
  "I'm having trouble sleeping"
];

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string = input) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('anxious') || lowerText.includes('anxiety')) {
      return "It sounds like you're feeling anxious. That's completely normal. Try taking a few deep breaths - breathe in for 4 counts, hold for 2, and exhale for 6. Would you like to try our guided breathing exercise?";
    } else if (lowerText.includes('sad') || lowerText.includes('depress')) {
      return "I'm sorry to hear you're feeling down. Remember that it's okay to have these feelings. Would it help to talk about what's causing you to feel this way?";
    } else if (lowerText.includes('sleep') || lowerText.includes('tired')) {
      return "Sleep difficulties can really affect our mental wellbeing. Consider establishing a calming bedtime routine and avoiding screens an hour before bed. Would you like some more specific sleep improvement tips?";
    } else if (lowerText.includes('stress') || lowerText.includes('overwhelm')) {
      return "When you're feeling overwhelmed, try breaking tasks into smaller steps. Focus on one thing at a time. Also, don't forget to celebrate small victories!";
    } else if (lowerText.includes('coping') || lowerText.includes('strategy')) {
      return "Some effective coping strategies include mindful breathing, progressive muscle relaxation, journaling, and talking with someone you trust. Would you like to explore any of these further?";
    } else {
      return "Thank you for sharing. How else can I support you today? Remember, I'm here to listen and offer guidance, but for immediate crisis support, please use the crisis button.";
    }
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-13rem)]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-poppins font-semibold text-sage">Chat Support</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">I'm an AI assistant here to support you. For emergencies, please use the crisis button.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="bg-white dark:bg-charcoal dark:bg-opacity-60 rounded-xl shadow-soft p-4 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`chat-bubble ${message.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`}>
                <p className="mb-1">{message.text}</p>
                <p className="text-xs opacity-70 text-right">{formatTime(message.timestamp)}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="chat-bubble chat-bubble-bot">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Quick replies */}
        {messages.length < 3 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {QUICK_REPLIES.map((reply) => (
              <Button
                key={reply}
                variant="outline"
                size="sm"
                className="text-xs bg-lavender/10 border-lavender/30 text-lavender/90 hover:bg-lavender/20"
                onClick={() => sendMessage(reply)}
              >
                {reply}
              </Button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage();
              }
            }}
          />
          <Button onClick={() => sendMessage()} className="bg-sage hover:bg-sage/90">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

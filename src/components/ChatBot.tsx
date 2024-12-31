import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useChat } from "@/contexts/ChatContext";
import { sendChatMessage } from "@/services/chatService";
import { MessageCircle, X, Maximize2, Minimize2, Plus, Paperclip, Mic, StopCircle } from "lucide-react";
import { useReactMediaRecorder } from "react-media-recorder";
import { toast } from "./ui/use-toast";
import { Message } from "@/contexts/ChatContext";

// Main ChatBot Component
export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const { currentChatId, createNewChat, addMessageToChat } = useChat();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!currentChatId) return;

    // Add user message to chat
    addMessageToChat(currentChatId, {
      text,
      isBot: false,
      timestamp: new Date(),
      type: "text"
    });

    try {
      // Send message to API and get response
      const response = await sendChatMessage(text);

      // Add bot response to chat
      addMessageToChat(currentChatId, {
        text: response,
        isBot: true,
        timestamp: new Date(),
        type: "text"
      });
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSendAudio = (blobUrl: string) => {
    if (currentChatId) {
      addMessageToChat(currentChatId, {
        text: "🎤 Voice Message",
        isBot: false,
        timestamp: new Date(),
        mediaUrl: blobUrl,
        type: "audio"
      });
    }
  };

  const handleSendFile = (file: File) => {
    if (currentChatId) {
      const reader = new FileReader();
      reader.onload = () => {
        addMessageToChat(currentChatId, {
          text: `📎 ${file.name}`,
          isBot: false,
          timestamp: new Date(),
          mediaUrl: reader.result as string,
          type: "file"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpen = () => {
    if (!currentChatId) {
      createNewChat();
    }
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsExpanded(false);
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isExpanded 
        ? "inset-0"
        : "bottom-8 right-8"
    }`}>
      {isOpen ? (
        <ChatWindow
          isExpanded={isExpanded}
          onClose={handleClose}
          onToggleExpand={() => setIsExpanded(!isExpanded)}
          onSendMessage={handleSendMessage}
          onSendAudio={handleSendAudio}
          onSendFile={handleSendFile}
        />
      ) : (
        <Button
          onClick={handleOpen}
          className={`rounded-full w-16 h-16 shadow-lg ${isAnimating ? 'animate-bounce hover:animate-none' : ''} relative`}
        >
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};

const ChatWindow = ({
  isExpanded,
  onClose,
  onToggleExpand,
  onSendMessage,
  onSendAudio,
  onSendFile
}: {
  isExpanded: boolean;
  onClose: () => void;
  onToggleExpand: () => void;
  onSendMessage: (text: string) => void;
  onSendAudio: (blobUrl: string) => void;
  onSendFile: (file: File) => void;
}) => {
  const { chats, currentChatId, createNewChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentChat = currentChatId ? chats.find(chat => chat.id === currentChatId) : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  return (
    <Card className={`transition-all duration-300 ${
      isExpanded 
        ? "w-full h-full rounded-none"
        : "w-96 h-[600px]"
    } flex flex-col overflow-hidden`}>
      <div className="p-3 border-b flex justify-between items-center bg-primary text-primary-foreground shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <h3 className="font-semibold">RamaDBK Assistant</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={createNewChat}
            className="h-8 w-8 hover:bg-primary-foreground/10"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleExpand} 
            className="h-8 w-8 hover:bg-primary-foreground/10"
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="h-8 w-8 hover:bg-primary-foreground/10"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="current" className="flex-1 flex flex-col min-h-0">
        <TabsList className="px-4 py-2 shrink-0 sticky top-[57px] bg-white z-10">
          <TabsTrigger value="current">Current Chat</TabsTrigger>
          <TabsTrigger value="history">Chat History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="flex-1 flex flex-col p-0 m-0 h-full">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {currentChat?.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="mt-auto border-t">
            <ChatInput 
              onSendMessage={onSendMessage}
              onSendAudio={onSendAudio}
              onSendFile={onSendFile}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="flex-1 p-4 m-0">
          <ScrollArea className="h-full">
            <div className="space-y-4">
              {chats.map((chat) => (
                <Card key={chat.id} className="p-4 cursor-pointer hover:bg-accent">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="h-4 w-4" />
                    <span className="font-medium">{chat.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {chat.messages[chat.messages.length - 1]?.text || "No messages"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(chat.createdAt).toLocaleDateString()}
                  </p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

// ChatMessage Component
const ChatMessage = ({ message }: { message: Message }) => {
  const renderMessage = (message: Message) => {
    switch (message.type) {
      case "audio":
        return (
          <audio controls src={message.mediaUrl} className="max-w-full">
            Your browser does not support the audio element.
          </audio>
        );
      case "file":
        return (
          <div className="flex flex-col">
            <span>{message.text}</span>
            <a 
              href={message.mediaUrl} 
              download 
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              Download File
            </a>
          </div>
        );
      default:
        return message.text;
    }
  };

  return (
    <div className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
      <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
        message.isBot
          ? "bg-secondary text-secondary-foreground"
          : "bg-primary text-primary-foreground"
      }`}>
        {renderMessage(message)}
      </div>
    </div>
  );
};

// ChatInput Component
const ChatInput = ({ 
  onSendMessage, 
  onSendAudio, 
  onSendFile 
}: { 
  onSendMessage: (text: string) => void;
  onSendAudio: (url: string) => void;
  onSendFile: (file: File) => void;
}) => {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    audio: true,
    onStop: (blobUrl) => {
      onSendAudio(blobUrl);
      setIsRecording(false);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload files smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      onSendFile(file);
    }
  };

  const handleVoiceRecord = () => {
    if (!isRecording) {
      startRecording();
      setIsRecording(true);
    } else {
      stopRecording();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileUpload}
          accept="image/*,application/pdf,.doc,.docx"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleVoiceRecord}
          className={isRecording ? "bg-red-100" : ""}
        >
          {isRecording ? (
            <StopCircle className="h-4 w-4 text-red-500" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
        <Button type="submit">Send</Button>
      </div>
    </form>
  );
};

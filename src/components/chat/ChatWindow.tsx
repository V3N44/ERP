import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { X, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { useChat } from "@/contexts/ChatContext";
import { MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";

interface ChatWindowProps {
  isExpanded: boolean;
  onClose: () => void;
  onToggleExpand: () => void;
  onSendMessage: (text: string) => void;
  onSendAudio: (blobUrl: string) => void;
  onSendFile: (file: File) => void;
}

export const ChatWindow = ({
  isExpanded,
  onClose,
  onToggleExpand,
  onSendMessage,
  onSendAudio,
  onSendFile
}: ChatWindowProps) => {
  const { chats, currentChatId } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentChat = currentChatId ? chats.find(chat => chat.id === currentChatId) : null;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChat?.messages]);

  return (
    <Card className={`transition-all duration-300 ${
      isExpanded 
        ? "w-full h-full rounded-none"
        : "w-96 h-[600px]"
    } flex flex-col`}>
      <div className="p-3 border-b flex justify-between items-center bg-primary text-primary-foreground">
        <h3 className="font-semibold">RamaDBK Assistant</h3>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleExpand} 
            className="h-8 w-8"
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
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="current" className="flex-1 flex flex-col">
        <TabsList className="px-4 py-2">
          <TabsTrigger value="current">Current Chat</TabsTrigger>
          <TabsTrigger value="history">Chat History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="flex-1 flex flex-col mt-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {currentChat?.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          
          <ChatInput 
            onSendMessage={onSendMessage}
            onSendAudio={onSendAudio}
            onSendFile={onSendFile}
          />
        </TabsContent>
        
        <TabsContent value="history" className="flex-1 mt-0">
          <ScrollArea className="h-full p-4">
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
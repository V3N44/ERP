import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { MessageCircle, X, Maximize2, Minimize2 } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatMessage } from "./chat/ChatMessage";
import { ChatInput } from "./chat/ChatInput";
import { sendMessageToGoogleApi } from "@/utils/googleApi";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { chats, currentChatId, createNewChat, addMessageToChat } = useChat();

  const currentChat = currentChatId 
    ? chats.find(chat => chat.id === currentChatId)
    : null;

  const handleSendMessage = async (text: string) => {
    if (!currentChatId) return;

    // Add user message
    addMessageToChat(currentChatId, {
      text,
      isBot: false,
      timestamp: new Date(),
      type: "text"
    });

    try {
      // Get response from Google API
      const apiKey = process.env.GOOGLE_API_KEY;
      if (!apiKey) {
        throw new Error('Google API key not found');
      }

      const response = await sendMessageToGoogleApi(text, apiKey);

      // Add bot response
      addMessageToChat(currentChatId, {
        text: response,
        isBot: true,
        timestamp: new Date(),
        type: "text"
      });
    } catch (error) {
      console.error('Error processing message:', error);
      addMessageToChat(currentChatId, {
        text: "I apologize, but I'm having trouble connecting to the service right now. Please try again later.",
        isBot: true,
        timestamp: new Date(),
        type: "text"
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isExpanded 
        ? "inset-0 bg-background/80 backdrop-blur-sm"
        : "bottom-8 right-8"
    }`}>
      {isOpen ? (
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
                onClick={toggleExpand} 
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
                onClick={() => setIsOpen(false)} 
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
                </div>
              </ScrollArea>
              
              <ChatInput 
                onSendMessage={handleSendMessage}
                onSendAudio={handleSendAudio}
                onSendFile={handleSendFile}
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
      ) : (
        <Button
          onClick={handleOpen}
          className="rounded-full w-16 h-16 shadow-lg animate-bounce hover:animate-none relative"
        >
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
};
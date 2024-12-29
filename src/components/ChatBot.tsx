import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import { useChat } from "@/contexts/ChatContext";
import { ChatWindow } from "./chat/ChatWindow";
import { sendMessageToGoogleApi } from "@/utils/googleApi";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const { currentChatId, createNewChat, addMessageToChat } = useChat();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 60000); // 60000ms = 1 minute

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className={`fixed z-50 transition-all duration-300 ${
      isExpanded 
        ? "inset-0 bg-background/80 backdrop-blur-sm"
        : "bottom-8 right-8"
    }`}>
      {isOpen ? (
        <ChatWindow
          isExpanded={isExpanded}
          onClose={() => setIsOpen(false)}
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
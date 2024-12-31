import { API_CONFIG } from '@/config/api';

interface ChatRequest {
  query: string;
  context_data?: Record<string, unknown[]>;
}

interface ChatResponse {
  response: string;
}

const CHAT_API_URL = 'http://127.0.0.1:8001/chat';

export const sendChatMessage = async (message: string, contextData?: Record<string, unknown[]>): Promise<string> => {
  try {
    // Encode the message for use in URL
    const encodedMessage = encodeURIComponent(message);
    const url = `${CHAT_API_URL}?query=${encodedMessage}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: API_CONFIG.headers,
    });

    if (!response.ok) {
      console.error('Chat API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url
      });
      throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
    }

    const data: ChatResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};
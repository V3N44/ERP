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
    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({
        query: message,
        context_data: contextData || {}
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
    }

    const data: ChatResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};
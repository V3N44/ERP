import { API_CONFIG } from '@/config/api';

interface ChatRequest {
  query: string;
  context_data?: Record<string, Array<Record<string, unknown>>>;
}

export const sendChatMessage = async (message: string) => {
  try {
    const response = await fetch(`${API_CONFIG.baseURL}/chat`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({
        query: message,
        context_data: {} // You can extend this with additional context if needed
      } as ChatRequest),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}
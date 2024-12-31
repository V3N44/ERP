import { API_CONFIG } from '@/config/api';

interface ChatRequest {
  query: string;
  context_data?: Record<string, unknown[]>;
}

interface ChatResponse {
  response: string;
}

export const sendChatMessage = async (message: string, contextData?: Record<string, unknown[]>): Promise<string> => {
  try {
    console.log('Sending chat message to:', `${API_CONFIG.baseURL}/chat`);
    
    const response = await fetch(`${API_CONFIG.baseURL}/chat`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({
        query: message,
        context_data: contextData || {}
      } as ChatRequest)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Chat API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
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
import { API_CONFIG } from '@/config/api';

interface ChatRequest {
  query: string;
  context_data?: Record<string, Array<Record<string, unknown>>>;
}

export const sendChatMessage = async (message: string) => {
  try {
    console.log('Sending chat message to:', `${API_CONFIG.baseURL}/chat`);
    
    const response = await fetch(`${API_CONFIG.baseURL}/chat`, {
      method: 'POST',
      headers: {
        ...API_CONFIG.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: message,
        context_data: {} // You can extend this with additional context if needed
      } as ChatRequest),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Chat API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Chat API Response:', data);
    return data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}
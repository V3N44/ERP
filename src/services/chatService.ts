import { API_CONFIG } from '@/config/api';

interface ChatRequest {
  query: string;
  context_data?: {
    [key: string]: unknown[];
  };
}

interface ChatResponse {
  response: string;
}

export const sendChatMessage = async (message: string, contextData?: Record<string, unknown[]>): Promise<string> => {
  try {
    const requestBody: ChatRequest = {
      query: message,
      context_data: contextData || {
        additionalProp1: [],
        additionalProp2: [],
        additionalProp3: []
      }
    };

    console.log('Sending chat request:', requestBody);

    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.baseURL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
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

export const resetChat = async (): Promise<string> => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_CONFIG.baseURL}/chat/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to reset chat: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error resetting chat:', error);
    throw error;
  }
};
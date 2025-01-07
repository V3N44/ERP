import { API_CONFIG } from '@/config/api';
import { CHAT_API_CONFIG } from '@/config/chatApi';

interface ChatRequest {
  query: string;
  context_data?: {
    additionalProp1: unknown[];
    additionalProp2: unknown[];
    additionalProp3: unknown[];
  };
}

interface ChatResponse {
  response: string;
}

const getChatToken = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No access token found');
  }
  return token;
};

export const sendChatMessage = async (message: string): Promise<string> => {
  try {
    const token = await getChatToken();
    const requestBody: ChatRequest = {
      query: message,
      context_data: {
        additionalProp1: [],
        additionalProp2: [],
        additionalProp3: []
      }
    };

    const response = await fetch(`${CHAT_API_CONFIG.baseURL}/chat`, {
      method: 'POST',
      headers: {
        ...CHAT_API_CONFIG.headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`Chat API Error: ${response.status}`);
    }

    const data: ChatResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error in chat service:', error);
    throw error;
  }
};

export const resetChat = async (): Promise<void> => {
  try {
    const token = await getChatToken();
    const response = await fetch(`${CHAT_API_CONFIG.baseURL}/chat/reset`, {
      method: 'POST',
      headers: {
        ...CHAT_API_CONFIG.headers,
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`Reset Chat API Error: ${response.status}`);
    }
  } catch (error) {
    console.error('Error resetting chat:', error);
    throw error;
  }
};
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

const CHAT_API_URL = 'http://127.0.0.1:8001/chat';

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

    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: {
        ...API_CONFIG.headers,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      credentials: 'omit',
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      console.error('Chat API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        body: await response.text()
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
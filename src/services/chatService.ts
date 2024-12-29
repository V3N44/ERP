import { API_CONFIG } from '@/config/api';

interface ChatRequest {
  query: string;
  context_data?: Record<string, Array<Record<string, unknown>>>;
}

interface ChatResponse {
  response: string;
  status: number;
  message?: string;
}

export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
  try {
    console.log('Sending chat message to:', `${API_CONFIG.baseURL}/chat`);
    console.log('Message:', message);
    
    const response = await fetch(`${API_CONFIG.baseURL}/chat`, {
      method: 'POST',
      headers: API_CONFIG.headers,
      body: JSON.stringify({
        query: message,
        context_data: {}
      } as ChatRequest),
    });

    const data = await response.text();
    console.log('Raw API Response:', data);

    if (!response.ok) {
      console.error('Chat API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: data
      });
      return {
        response: "Sorry, I'm having trouble connecting to the service. Please try again later.",
        status: response.status,
        message: `Error: ${response.status} ${response.statusText}`
      };
    }

    try {
      const jsonData = JSON.parse(data);
      console.log('Parsed Chat API Response:', jsonData);
      return {
        ...jsonData,
        status: response.status
      };
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      return {
        response: "Sorry, I received an invalid response format. Please try again.",
        status: response.status,
        message: "Invalid response format"
      };
    }
  } catch (error) {
    console.error('Error sending chat message:', error);
    return {
      response: "Sorry, there was an error processing your request. Please try again.",
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
};
// API configuration
export const API_CONFIG = {
  baseURL: "https://0db2-122-255-33-126.ngrok-free.app",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
};

// Create and export the api object for making HTTP requests
export const api = {
  baseURL: API_CONFIG.baseURL,
  headers: API_CONFIG.headers,
  post: async (path: string, data: any) => {
    try {
      console.log(`Making POST request to ${path} with data:`, data);
      
      const token = localStorage.getItem('access_token');
      const headers = {
        ...API_CONFIG.headers,
        'Authorization': token ? `Bearer ${token}` : '',
      };

      const response = await fetch(`${API_CONFIG.baseURL}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
        mode: 'cors',
        credentials: 'include'
      });
      
      console.log(`Response status:`, response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: `HTTP error! status: ${response.status}` }));
        console.error('API Error:', errorData);
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
      }
      throw error;
    }
  }
};

// Helper function to build URLs
export const buildUrl = (path: string) => {
  const baseUrl = API_CONFIG.baseURL;
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

// Helper function to get auth header
export const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? `Bearer ${token}` : '';
};

// Helper function to handle API responses
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('API Error:', errorData);
    throw new Error(errorData?.detail || `API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};
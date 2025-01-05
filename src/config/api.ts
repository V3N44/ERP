// API configuration
export const API_CONFIG = {
  baseURL: "https://d563-122-255-33-126.ngrok-free.app",
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    'Access-Control-Allow-Origin': '*'
  }
};

// Helper function to build URLs
export const buildUrl = (path: string): string => {
  const baseUrl = API_CONFIG.baseURL;
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

// Helper function to get auth header
export const getAuthHeader = (): { Authorization: string } | Record<string, never> => {
  const token = localStorage.getItem('access_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Helper function to handle API responses
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || `API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

// Helper function to get all headers combined
export const getHeaders = (): HeadersInit => ({
  ...API_CONFIG.headers,
  ...getAuthHeader()
});
// API configuration
export const API_CONFIG = {
  baseURL: "https://31b6-122-255-33-126.ngrok-free.app",
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true',
    'Access-Control-Allow-Origin': '*'
  }
};

// Helper function to build URLs
export const buildUrl = (path) => {
  const baseUrl = API_CONFIG.baseURL;
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

// Helper function to get auth header
export const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? `Bearer ${token}` : '';
};
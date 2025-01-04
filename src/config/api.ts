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
export const buildUrl = (path: string) => {
  const baseUrl = API_CONFIG.baseURL;
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

// Helper function to get auth header
export const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No access token found - please login first');
  }
  
  // Return complete headers object with auth
  return {
    ...API_CONFIG.headers,
    'Authorization': `Bearer ${token}`
  };
};

// Helper function to handle API responses
export const handleApiResponse = async (response: Response) => {
  if (!response.ok) {
    if (response.status === 401) {
      // Clear invalid token
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/'; // Redirect to login
      throw new Error('Authentication expired. Please login again.');
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Request failed with status ${response.status}`);
  }
  return response.json();
};
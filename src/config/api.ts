// API configuration
export const API_CONFIG = {
  baseURL: 'https://31b6-122-255-33-126.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const buildUrl = (path: string) => {
  return `${API_CONFIG.baseURL}${path}`;
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  return token ? `Bearer ${token}` : '';
};
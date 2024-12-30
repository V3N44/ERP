// API configuration
export const API_CONFIG = {
  baseURL: "https://6be3-122-255-33-126.ngrok-free.app",
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'ngrok-skip-browser-warning': 'true', // Add this header to skip ngrok browser warning
    'Access-Control-Allow-Origin': '*'
  }
};
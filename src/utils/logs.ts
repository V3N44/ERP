// Function to fetch system errors from localStorage
export const getSystemErrors = () => {
  try {
    const errors = localStorage.getItem('system_errors');
    return errors ? JSON.parse(errors) : [];
  } catch (error) {
    console.error('Error parsing system errors:', error);
    return [];
  }
};

// Function to fetch access logs from localStorage
export const getAccessLogs = () => {
  try {
    const logs = localStorage.getItem('access_logs');
    return logs ? JSON.parse(logs) : [];
  } catch (error) {
    console.error('Error parsing access logs:', error);
    return [];
  }
};

// Format error logs
export const formatErrorLogs = (errorLogs: any[]) => {
  return errorLogs.map((error: any, index: number) => ({
    id: index + 1,
    timestamp: new Date().toISOString(),
    level: error.status ? String(error.status) : "ERROR",
    severity: error.status >= 500 ? "high" : error.status >= 400 ? "medium" : "low",
    message: error.message || error.detail || "Unknown error",
    source: error.url ? new URL(error.url).pathname : "SystemService"
  }));
};

// Format access logs
export const formatAccessLogs = (accessLogs: any[]) => {
  return accessLogs.map((log: any, index: number) => ({
    id: index + 1,
    timestamp: new Date(log.timestamp || new Date()).toISOString(),
    user: log.user || 'anonymous',
    action: log.action || log.method || 'ACCESS',
    status: log.status || 'SUCCESS',
    ip: log.ip || log.clientIP || '127.0.0.1'
  }));
};
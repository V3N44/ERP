import { ErrorLog } from "@/types/logs";

export const formatErrorLogs = (logs: any[]): ErrorLog[] => {
  return logs.map(log => ({
    id: log.id || Math.random().toString(36).substr(2, 9),
    timestamp: log.timestamp || new Date().toISOString(),
    message: log.error || log.message || 'Unknown error',
    source: log.source || 'System',
    stack_trace: log.stack_trace || log.stackTrace || 'No stack trace available',
    severity: log.severity || 'medium',
    component: log.component || 'Unknown'
  }));
};

export const formatAccessLogs = (logs: any[]) => {
  return logs.map(log => ({
    id: log.id || Math.random().toString(36).substr(2, 9),
    timestamp: log.timestamp || new Date().toISOString(),
    user: log.user || 'anonymous',
    action: log.action || 'unknown',
    status: log.status || 'info',
    ip: log.ip || '0.0.0.0'
  }));
};

export const getSystemErrors = async () => {
  // Mock implementation - replace with actual API call
  return [];
};

export const getAccessLogs = async () => {
  // Mock implementation - replace with actual API call
  return [];
};
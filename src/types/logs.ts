export interface ErrorLog {
  id: string | number;
  timestamp: string;
  message: string;
  source: string;
  stack_trace?: string;
  severity: 'low' | 'medium' | 'high';
  component: string;
}
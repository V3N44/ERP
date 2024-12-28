export type UserRole = 'admin' | 'user' | 'sales' | 'purchasing' | 'accounting' | 'shipping';

export interface User {
  id?: number;
  email: string;
  username?: string;
  role: UserRole;
  name: string;
}
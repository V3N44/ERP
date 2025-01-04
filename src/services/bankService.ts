import { API_URL } from '@/config';

export interface Bank {
  id: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  branch: string;
  signature_picture?: string;
  balance: number;
}

export const getBanks = async (): Promise<Bank[]> => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(`${API_URL}/banks/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to fetch bank accounts');
  }

  return response.json();
};
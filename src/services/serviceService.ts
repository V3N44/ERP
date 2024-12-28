import { API_URL } from '@/config';

export const createService = async (data: {
  service_name: string;
  charge: number;
  service_vat_percent: number;
  description: string;
}) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_URL}/services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Service creation failed:', errorData);
    throw new Error(`Failed to create service: ${response.statusText}`);
  }

  return response.json();
};

export const getServices = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_URL}/services`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Service fetch failed:', errorData);
    throw new Error(`Failed to fetch services: ${response.statusText}`);
  }

  return response.json();
};
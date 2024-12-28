import { FreightForwarder } from "@/types/shipping";
import { API_URL } from "@/config";

export const createFreightForwarder = async (data: Omit<FreightForwarder, "id">): Promise<FreightForwarder> => {
  const response = await fetch(`${API_URL}/shipments/freight_forwarders/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to create freight forwarder');
  }

  return response.json();
};

export const getFreightForwarders = async (skip = 0, limit = 100): Promise<FreightForwarder[]> => {
  const response = await fetch(
    `${API_URL}/shipments/freight_forwarders/?skip=${skip}&limit=${limit}`,
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to fetch freight forwarders');
  }

  return response.json();
};

export const deleteFreightForwarder = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/shipments/freight_forwarders/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to delete freight forwarder');
  }
};
import { API_CONFIG } from "@/config/api";

export interface Lead {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  interested_in: string;
  notes: string;
}

export const createLead = async (leadData: Lead) => {
  const response = await fetch(`${API_CONFIG.baseURL}/leads/`, {
    method: 'POST',
    headers: {
      ...API_CONFIG.headers,
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify(leadData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create lead');
  }

  return response.json();
};
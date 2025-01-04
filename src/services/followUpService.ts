import { API_CONFIG, buildUrl } from "@/config/api";

export interface FollowUp {
  id?: number;
  customer: string;
  type: string;
  date: string;
  time: string;
  status: string;
  lead_id: number;
  user_id: number;
}

export const createFollowUp = async (followUp: Omit<FollowUp, 'id'>) => {
  const response = await fetch(buildUrl('/follow-ups/'), {
    method: 'POST',
    headers: API_CONFIG.headers,
    body: JSON.stringify(followUp)
  });

  if (!response.ok) {
    throw new Error('Failed to create follow-up');
  }

  return response.json();
};

export const getFollowUps = async () => {
  const response = await fetch(buildUrl('/follow-ups/'), {
    headers: API_CONFIG.headers
  });

  if (!response.ok) {
    throw new Error('Failed to fetch follow-ups');
  }

  return response.json();
};
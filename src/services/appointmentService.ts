import { API_URL } from '@/config';

interface AppointmentData {
  date: string;
  customer_id: number;
  service_id: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
}

export const createAppointment = async (data: AppointmentData) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_URL}/appointments/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Appointment creation failed:', errorData);
    throw new Error(`Failed to create appointment: ${response.statusText}`);
  }

  return response.json();
};
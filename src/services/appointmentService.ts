import { API_CONFIG, buildUrl } from '@/config/api';

export interface Appointment {
  id: number;
  date: string;
  customer_id: number;
  service_id: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
}

export interface CreateAppointmentData {
  date: string;
  customer_id: number;
  service_id: number;
  status: 'scheduled';
  notes: string;
}

export const createAppointment = async (data: CreateAppointmentData) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  console.log('Creating appointment with data:', data);

  const response = await fetch(buildUrl('/appointments/'), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      ...API_CONFIG.headers,
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

export const getAppointments = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  console.log('Fetching appointments...');

  const response = await fetch(buildUrl('/appointments/'), {
    headers: {
      'Authorization': `Bearer ${token}`,
      ...API_CONFIG.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Appointments fetch failed:', errorData);
    throw new Error(`Failed to fetch appointments: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Appointments fetched:', data);
  return data;
};
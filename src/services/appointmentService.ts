import { API_CONFIG, buildUrl, getAuthHeader } from '@/config/api';

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
  try {
    console.log('Creating appointment with data:', data);
    
    const response = await fetch(buildUrl('/appointments/'), {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        ...API_CONFIG.headers,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Appointment creation failed:', errorData);
      throw new Error(`Failed to create appointment: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Appointment created:', result);
    return result;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const getAppointments = async () => {
  try {
    console.log('Fetching appointments...');
    
    const response = await fetch(buildUrl('/appointments/'), {
      headers: {
        'Authorization': getAuthHeader(),
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
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};
import { API_CONFIG, buildUrl, getAuthHeader, handleApiResponse } from '@/config/api';

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
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });

    return handleApiResponse(response);
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const getAppointments = async () => {
  try {
    console.log('Fetching appointments...');
    
    const response = await fetch(buildUrl('/appointments/'), {
      headers: getAuthHeader(),
    });

    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};
import { ShippingOrder, CreateShipmentDTO } from "@/types/shipping";
import { API_URL } from "@/config";

export const getShippingOrders = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/shipments/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch shipping orders');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching shipping orders:', error);
    throw error;
  }
};

export const getShipmentLocations = async (shipmentId: string | number) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/shipments/${shipmentId}/locations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch shipment locations');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching shipment locations:', error);
    throw error;
  }
};

export const createShipmentLocation = async (data: {
  shipment_id: number;
  location: string;
  date: string;
  status: string;
}) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/shipment_locations/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create shipment location');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating shipment location:', error);
    throw error;
  }
};

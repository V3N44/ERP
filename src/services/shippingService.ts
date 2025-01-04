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
      if (response.status === 401) {
        throw new Error('Authentication expired. Please login again.');
      }
      throw new Error('Failed to fetch shipping orders');
    }

    const data = await response.json();
    console.log('Shipping orders response:', data);

    // Transform the API response to match our ShippingOrder type
    return data.map((order: any) => ({
      id: order.id,
      stock_number: order.stock_number || '',
      status: order.status || 'Pending',
      country: order.country || '',
      etd: order.etd || '',
      shipping_cost: order.shipping_cost || 0,
      insurance: order.insurance || 0,
      freight_forwarder_id: order.freight_forwarder_id,
      freight_forwarder: order.freight_forwarder ? {
        id: order.freight_forwarder.id,
        name: order.freight_forwarder.name,
        contact: order.freight_forwarder.contact,
        country: order.freight_forwarder.country
      } : undefined,
      createdAt: order.created_at,
      updatedAt: order.updated_at
    }));
  } catch (error) {
    console.error('Error fetching shipping orders:', error);
    throw error;
  }
};

export const createShippingOrder = async (data: CreateShipmentDTO): Promise<ShippingOrder> => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/shipments/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication expired. Please login again.');
      }
      throw new Error('Failed to create shipping order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating shipping order:', error);
    throw error;
  }
};

export const getShipmentLocations = async (shipmentId: string) => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/shipment_locations/?shipment_id=${shipmentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication expired. Please login again.');
      }
      throw new Error('Failed to fetch shipment locations');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching shipment locations:', error);
    throw error;
  }
};

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
      soNumber: order.so_number || '',
      stockNumber: order.stock_number || '',
      bookingStatus: order.status || 'Pending',
      shipType: order.ship_type || 'Container',
      forwarder: order.freight_forwarder ? order.freight_forwarder.name : '-',
      freightType: order.freight_type || 'Prepaid',
      pol: order.port_of_loading || '',
      pod: order.port_of_discharge || '',
      etd: order.etd || '',
      eta: order.eta || '',
      bookingNumber: order.booking_number,
      consignor: order.consignor,
      consignee: order.consignee,
      notify: order.notify,
      vessel: order.vessel,
      voyageNo: order.voyage_no,
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
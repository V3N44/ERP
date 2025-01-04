import { ShippingOrder, CreateShipmentDTO } from "@/types/shipping";
import { API_CONFIG, buildUrl, getAuthHeader, handleApiResponse } from "@/config/api";

export const getShippingOrders = async () => {
  try {
    const response = await fetch(buildUrl('/shipments/'), {
      headers: getAuthHeader(),
    });

    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching shipping orders:', error);
    throw error;
  }
};

export const getShipmentLocations = async (shipmentId: string | number) => {
  try {
    const response = await fetch(buildUrl(`/shipment_locations/${shipmentId}`), {
      headers: getAuthHeader(),
    });

    return handleApiResponse(response);
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
    const response = await fetch(buildUrl('/shipment_locations/'), {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });

    return handleApiResponse(response);
  } catch (error) {
    console.error('Error creating shipment location:', error);
    throw error;
  }
};

export const createShippingOrder = async (data: CreateShipmentDTO): Promise<ShippingOrder> => {
  try {
    const response = await fetch(buildUrl('/shipments/'), {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(data),
    });

    return handleApiResponse(response);
  } catch (error) {
    console.error('Error creating shipping order:', error);
    throw error;
  }
};
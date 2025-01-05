import { API_CONFIG, buildUrl } from '@/config/api';

export interface OrderItem {
  item_name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface OrderData {
  customer_id: number;
  contact_number: string;
  address: string;
  date: string;
  total: number;
  status: "Pending" | "Completed" | "Cancelled";
  items: OrderItem[];
}

export const createOrder = async (data: OrderData) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  console.log('Creating order with data:', data);

  const response = await fetch(buildUrl('/orders/'), {
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
    console.error('Order creation failed:', errorData);
    throw new Error(`Failed to create order: ${response.statusText}`);
  }

  return response.json();
};
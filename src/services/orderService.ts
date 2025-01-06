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
  role_id: number;
  items: OrderItem[];
}

export interface Order extends OrderData {
  id: number;
}

export const getOrders = async (skip = 0, limit = 100) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(buildUrl(`/orders/?skip=${skip}&limit=${limit}`), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Failed to fetch orders:', errorData);
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }

  return response.json();
};

export const createOrder = async (orderData: OrderData): Promise<Order> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(buildUrl('/orders/'), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('Failed to create order:', errorData);
    throw new Error(`Failed to create order: ${response.statusText}`);
  }

  return response.json();
};
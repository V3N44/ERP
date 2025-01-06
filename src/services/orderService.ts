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
    console.error('No authentication token found');
    throw new Error('No authentication token found');
  }

  console.log('Fetching orders with token:', token);
  console.log('Request URL:', buildUrl(`/orders/?skip=${skip}&limit=${limit}`));

  const response = await fetch(buildUrl(`/orders/?skip=${skip}&limit=${limit}`), {
    headers: {
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error Response:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText
    });
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('API Response:', data);
  return data;
};

export const createOrder = async (orderData: OrderData): Promise<Order> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    console.error('No authentication token found');
    throw new Error('No authentication token found');
  }

  console.log('Creating order with data:', orderData);

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
    const errorText = await response.text();
    console.error('API Error Response:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText
    });
    throw new Error(`Failed to create order: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('Created order response:', data);
  return data;
};
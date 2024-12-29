import { API_URL } from "@/config";

export interface Customer {
  id: number;
  name: string;
  mobile_number: string;
  email: string;
  vat_no: string;
  phone: string;
  cr_no: string;
  address1: string;
  address2: string;
  fax: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface GetCustomersParams {
  skip?: number;
  limit?: number;
}

export const getCustomers = async ({ skip = 0, limit = 100 }: GetCustomersParams = {}) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No access token found');
  }

  try {
    console.log('Fetching customers from:', `${API_URL}/customers/?skip=${skip}&limit=${limit}`);
    
    const response = await fetch(`${API_URL}/customers/?skip=${skip}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error response body:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error('Invalid content type:', contentType);
      throw new Error('Invalid response format: expected JSON');
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    // Ensure we're returning an array
    if (Array.isArray(data)) {
      return data;
    } else if (data && typeof data === 'object' && Array.isArray(data.items)) {
      return data.items;
    } else {
      console.warn('Unexpected API response format:', data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const updateCustomer = async (customerId: number, customerData: Partial<Customer>) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${API_URL}/customers/${customerId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) {
    throw new Error(`Failed to update customer: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const deleteCustomer = async (customerId: number) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${API_URL}/customers/${customerId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete customer: ${response.status} ${response.statusText}`);
  }

  return true;
};
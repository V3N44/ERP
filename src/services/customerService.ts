import { API_CONFIG } from "@/config/api";

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
    console.log('Fetching customers from:', `${API_CONFIG.baseURL}/customers/?skip=${skip}&limit=${limit}`);
    
    const response = await fetch(`${API_CONFIG.baseURL}/customers/?skip=${skip}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        ...API_CONFIG.headers,
      },
    });

    // First check if the response is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Check content type
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error('Invalid content type:', contentType);
      const responseText = await response.text();
      console.error('Response body:', responseText);
      throw new Error(`Invalid response format: Expected application/json but got ${contentType || 'unknown'}`);
    }

    // Try to parse the response as JSON
    try {
      const data = await response.json();
      console.log('API Response:', data);
      
      if (!Array.isArray(data)) {
        console.error('Unexpected API response format:', data);
        throw new Error('Invalid response format: expected array of customers');
      }

      return data as Customer[];
    } catch (error) {
      console.error('Error parsing JSON:', error);
      throw new Error('Failed to parse API response as JSON');
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

  const response = await fetch(`${API_CONFIG.baseURL}/customers/${customerId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      ...API_CONFIG.headers,
    },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error Response:', errorText);
    throw new Error(`Failed to update customer: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const deleteCustomer = async (customerId: number) => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${API_CONFIG.baseURL}/customers/${customerId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      ...API_CONFIG.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error Response:', errorText);
    throw new Error(`Failed to delete customer: ${response.status} ${response.statusText}`);
  }

  return true;
};
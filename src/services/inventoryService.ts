import { API_URL } from "@/config";
import { InventoryFormData } from "@/types/inventory";

export interface InventoryItem extends InventoryFormData {
  id: number;
}

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  const tokenType = localStorage.getItem('token_type') || 'Bearer';
  
  if (!token) {
    throw new Error('No access token found - please login first');
  }

  return `${tokenType} ${token}`;
};

export const getInventoryItems = async (
  skip: number = 0,
  limit: number = 100
): Promise<InventoryItem[]> => {
  try {
    console.log('Fetching inventory items with params:', { skip, limit });
    
    const authHeader = getAuthHeader();
    console.log('Using auth header:', authHeader);

    const response = await fetch(
      `${API_URL}/inventory/?skip=${skip}&limit=${limit}`,
      {
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Add this to include cookies
      }
    );

    if (!response.ok) {
      if (response.status === 403) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const errorMessage = user?.role 
          ? `Access denied. Your current role (${user.role}) does not have sufficient permissions.` 
          : 'Access denied. Please ensure you have the required permissions (admin or sales role).';
        throw new Error(errorMessage);
      }

      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch inventory items');
    }

    const data = await response.json();
    console.log('Successfully fetched inventory items:', data);
    return data;
  } catch (error) {
    console.error('Fetch inventory error:', error);
    throw error;
  }
};

export const createInventoryItem = async (data: InventoryFormData): Promise<InventoryItem> => {
  try {
    console.log('Creating inventory item with data:', data);
    
    const authHeader = getAuthHeader();
    console.log('Using auth header:', authHeader);

    const response = await fetch(`${API_URL}/inventory/`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Add this to include cookies
      body: JSON.stringify({
        ...data,
        category: data.category || "Vehicle",
        quantity: data.quantity || 1,
        price: data.price || 0,
        supplier_id: data.supplier_id || 0,
      }),
    });

    if (!response.ok) {
      if (response.status === 403) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const errorMessage = user?.role 
          ? `Access denied. Your current role (${user.role}) does not have sufficient permissions.` 
          : 'Access denied. Please ensure you have the required permissions (admin or sales role).';
        throw new Error(errorMessage);
      }

      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to create inventory item');
    }

    const responseData = await response.json();
    console.log('Successfully created inventory item:', responseData);
    return responseData;
  } catch (error) {
    console.error('Create inventory error:', error);
    throw error;
  }
};
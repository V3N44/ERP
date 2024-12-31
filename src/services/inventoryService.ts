import { API_URL } from "@/config";
import { InventoryFormData } from "@/types/inventory";
import { convertImageToBase64 } from "@/utils/imageUtils";

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

export const createInventoryItem = async (data: InventoryFormData, imageFile?: File): Promise<InventoryItem> => {
  try {
    console.log('Creating inventory item with data:', data);
    
    const authHeader = getAuthHeader();
    console.log('Using auth header:', authHeader);

    // Convert image to base64 if provided
    let imageData = null;
    if (imageFile) {
      imageData = await convertImageToBase64(imageFile);
      console.log('Image converted to base64');
    }

    const response = await fetch(`${API_URL}/inventory/`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      mode: 'cors',
      credentials: 'include',
      body: JSON.stringify({
        ...data,
        category: data.category || "Vehicle",
        quantity: data.quantity || 1,
        price: data.price || 0,
        supplier_id: data.supplier_id || 0,
        image_data: imageData // Send base64 image data
      }),
    });

    if (!response.ok) {
      if (response.status === 403) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const errorMessage = user?.role 
          ? `Access denied. Your current role (${user.role}) does not have sufficient permissions.` 
          : 'Access denied. Please ensure you have the required permissions.';
        throw new Error(errorMessage);
      }

      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.detail || `Failed to create inventory item (Status: ${response.status})`;
      console.error('API Error:', errorMessage);
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    console.log('Successfully created inventory item:', responseData);
    return responseData;
  } catch (error) {
    console.error('Create inventory error:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the inventory service. Please check your network connection and try again.');
    }
    throw error;
  }
};

export const getInventoryItems = async (
  skip: number = 0,
  limit: number = 100
): Promise<InventoryItem[]> => {
  try {
    console.log('Fetching inventory items with params:', { skip, limit });
    
    const authHeader = getAuthHeader();
    console.log('Using auth header:', authHeader);

    // Add cache-busting query parameter
    const timestamp = new Date().getTime();
    const response = await fetch(
      `${API_URL}/inventory/?skip=${skip}&limit=${limit}&_=${timestamp}`,
      {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        mode: 'cors',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      if (response.status === 403) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const errorMessage = user?.role 
          ? `Access denied. Your current role (${user.role}) does not have sufficient permissions.` 
          : 'Access denied. Please ensure you have the required permissions.';
        throw new Error(errorMessage);
      }

      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.detail || `Failed to fetch inventory items (Status: ${response.status})`;
      console.error('API Error:', errorMessage);
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Successfully fetched inventory items:', data);
    return data;
  } catch (error) {
    console.error('Fetch inventory error:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the inventory service. Please check your network connection and try again.');
    }
    throw error;
  }
};

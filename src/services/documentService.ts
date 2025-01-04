import { API_CONFIG, buildUrl, getAuthHeader, handleApiResponse } from '@/config/api';

export interface Document {
  id?: number;
  customer_id: number;
  file_name: string;
  file_path: string;
  uploaded_at: string;
}

export const getDocuments = async (skip: number = 0, limit: number = 100): Promise<Document[]> => {
  try {
    console.log('Fetching documents');
    
    const response = await fetch(
      buildUrl(`/documents/?skip=${skip}&limit=${limit}`),
      {
        headers: getAuthHeader(),
      }
    );

    return handleApiResponse(response);
  } catch (error) {
    console.error('Fetch documents error:', error);
    throw error;
  }
};

export const createDocument = async (documentData: Document): Promise<Document> => {
  try {
    console.log('Creating document with data:', documentData);
    
    const response = await fetch(buildUrl('/documents/'), {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(documentData),
    });

    return handleApiResponse(response);
  } catch (error) {
    console.error('Create document error:', error);
    throw error;
  }
};
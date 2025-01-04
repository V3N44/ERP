export interface Document {
  id?: number;
  customer_id: number;
  file_name: string;
  file_path: string;
  uploaded_at: string;
}

const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  const tokenType = localStorage.getItem('token_type') || 'Bearer';
  return `${tokenType} ${token}`;
};

export const createDocument = async (documentData: Document): Promise<Document> => {
  try {
    console.log('Creating document with data:', documentData);
    
    const response = await fetch('/api/documents/', {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(documentData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create document (Status: ${response.status})`);
    }

    const data = await response.json();
    console.log('Successfully created document:', data);
    return data;
  } catch (error) {
    console.error('Create document error:', error);
    throw error;
  }
};

export const getDocuments = async (): Promise<Document[]> => {
  try {
    console.log('Fetching documents');
    
    const response = await fetch('/api/documents/', {
      headers: {
        'Authorization': getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch documents (Status: ${response.status})`);
    }

    const data = await response.json();
    console.log('Successfully fetched documents:', data);
    return data;
  } catch (error) {
    console.error('Fetch documents error:', error);
    throw error;
  }
};
interface CreateEnquiryPayload {
  customer_id: number;
  details: string;
  date: string;
  status: string;
}

interface GetEnquiriesParams {
  skip?: number;
  limit?: number;
}

const API_URL = 'https://api.example.com/enquiries'; // Replace with your actual API URL

export const createEnquiry = async (payload: CreateEnquiryPayload) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Failed to create enquiry');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating enquiry:', error);
    throw error;
  }
};

export const getEnquiries = async ({ skip = 0, limit = 100 }: GetEnquiriesParams = {}) => {
  try {
    // For testing purposes, return mock data until the API is ready
    return [
      {
        id: 1,
        customer_id: 1,
        details: "Sample enquiry 1",
        date: new Date().toISOString(),
        status: "New"
      },
      {
        id: 2,
        customer_id: 2,
        details: "Sample enquiry 2",
        date: new Date().toISOString(),
        status: "In Progress"
      }
    ];

    // Uncomment this when the API is ready:
    /*
    const response = await fetch(`${API_URL}?skip=${skip}&limit=${limit}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch enquiries');
    }

    return await response.json();
    */
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    throw error;
  }
};
const API_URL = 'http://localhost:8000';

export const backofficeService = {
  async createInvoice(invoiceData: any) {
    const response = await fetch(`${API_URL}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(invoiceData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create invoice');
    }
    
    return response.json();
  },

  async calculateCosts(costData: any) {
    const response = await fetch(`${API_URL}/costs/calculate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(costData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to calculate costs');
    }
    
    return response.json();
  },

  async getReports() {
    const response = await fetch(`${API_URL}/reports`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch reports');
    }
    
    return response.json();
  }
};
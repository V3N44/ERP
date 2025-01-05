import { API_CONFIG } from "@/config/api";

export interface MonthlyBudget {
  id: number;
  month: number;
  year: number;
  budget_amount: number;
  remaining_amount?: number;
}

export const fetchMonthlyBudget = async (month: number, year: number): Promise<MonthlyBudget[]> => {
  const response = await fetch(
    `${API_CONFIG.baseURL}/monthly-budgets?month=${month}&year=${year}`,
    {
      headers: {
        ...API_CONFIG.headers,
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || `Failed to fetch budget information`);
  }

  return response.json();
};

export const createMonthlyBudget = async (data: {
  month: number;
  year: number;
  budget_amount: number;
}): Promise<MonthlyBudget> => {
  const response = await fetch(`${API_CONFIG.baseURL}/monthly-budgets`, {
    method: 'POST',
    headers: {
      ...API_CONFIG.headers,
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    // If budget already exists, try to fetch it
    if (responseData.detail === "Budget already exists for this month and year") {
      const existingBudgets = await fetchMonthlyBudget(data.month, data.year);
      if (existingBudgets && existingBudgets.length > 0) {
        return existingBudgets[0];
      }
    }
    throw new Error(responseData.detail || 'Failed to create budget');
  }

  return responseData;
};

export const updateMonthlyBudget = async (
  budgetId: number | null,
  data: { month: number; year: number; budget_amount: number }
): Promise<MonthlyBudget> => {
  if (!budgetId) {
    return createMonthlyBudget(data);
  }

  const response = await fetch(`${API_CONFIG.baseURL}/monthly-budgets/${budgetId}`, {
    method: 'PUT',
    headers: {
      ...API_CONFIG.headers,
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    body: JSON.stringify(data)
  });

  const responseData = await response.json();
  
  if (!response.ok) {
    throw new Error(responseData.detail || 'Failed to update budget');
  }

  return responseData;
};
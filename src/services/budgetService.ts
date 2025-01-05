import { API_CONFIG } from "@/config/api";

export interface MonthlyBudget {
  id: number;
  budget_amount: number;
  remaining_amount: number;
  month: number;
  year: number;
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

export const updateMonthlyBudget = async (
  budgetId: number | null,
  data: { month: number; year: number; budget_amount: number }
): Promise<MonthlyBudget> => {
  const method = budgetId ? 'PUT' : 'POST';
  const url = budgetId 
    ? `${API_CONFIG.baseURL}/monthly-budgets/${budgetId}`
    : `${API_CONFIG.baseURL}/monthly-budgets`;

  const response = await fetch(url, {
    method,
    headers: {
      ...API_CONFIG.headers,
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to update budget');
  }

  return response.json();
};
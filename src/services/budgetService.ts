import { api } from "@/config/api";

export interface MonthlyBudget {
  id: number;
  month: number;
  year: number;
  budget_amount: number;
  remaining_budget: number;
  created_at: string;
}

export const createMonthlyBudget = async (budget: Omit<MonthlyBudget, "id" | "remaining_budget" | "created_at">) => {
  try {
    console.log('Creating monthly budget:', budget);
    const response = await api.post('/monthly-budgets/', budget);
    console.log('Monthly budget created:', response);
    return response;
  } catch (error) {
    console.error('Error creating monthly budget:', error);
    throw error;
  }
};

export const fetchMonthlyBudgets = async () => {
  try {
    const response = await fetch(`${api.baseURL}/monthly-budgets/`, {
      headers: {
        ...api.headers,
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch budgets');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching monthly budgets:', error);
    throw error;
  }
};
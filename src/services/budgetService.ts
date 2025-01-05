import { api } from "@/config/api";

export interface MonthlyBudget {
  id: number;
  month: number;
  year: number;
  budget_amount: number;
  remaining_budget: number;
  created_at: string;
  money_orders?: {
    id: number;
    monthly_budget_id: number;
    reason: string;
    amount: number;
    status: string;
    created_at: string;
  }[];
}

export const createMonthlyBudget = async (budget: Omit<MonthlyBudget, "id" | "remaining_budget" | "created_at" | "money_orders">) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${api.baseURL}/monthly-budgets/`, {
      method: 'POST',
      headers: {
        ...api.headers,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(budget),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to create budget');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating monthly budget:', error);
    throw error;
  }
};

export const fetchCurrentMonthBudget = async (): Promise<MonthlyBudget | null> => {
  try {
    const token = localStorage.getItem('access_token');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
    // Get the current month's budget directly using query parameters
    const response = await fetch(
      `${api.baseURL}/monthly-budgets/current?month=${currentMonth}&year=${currentYear}`, {
      method: 'GET',
      headers: {
        ...api.headers,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch budget');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching current month budget:', error);
    throw error;
  }
};

export const getMonthlyBudgetDetails = async (budgetId: number): Promise<MonthlyBudget> => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${api.baseURL}/monthly-budgets/${budgetId}`, {
      method: 'GET',
      headers: {
        ...api.headers,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch budget details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching budget details:', error);
    throw error;
  }
};
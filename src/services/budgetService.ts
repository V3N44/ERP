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

export const updateMonthlyBudget = async (
  budgetId: number,
  budget: Partial<Pick<MonthlyBudget, "budget_amount">>
) => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${api.baseURL}/monthly-budgets/${budgetId}`, {
    method: 'PATCH',
    headers: {
      ...api.headers,
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(budget),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.detail || `Failed to update budget`);
  }

  return await response.json();
};

export const fetchCurrentMonthBudget = async (): Promise<MonthlyBudget | null> => {
  try {
    const token = localStorage.getItem('access_token');
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    
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

export const fetchAllBudgets = async (): Promise<MonthlyBudget[]> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  // First, get all budget IDs
  const response = await fetch(`${api.baseURL}/monthly-budgets`, {
    method: 'GET',
    headers: {
      ...api.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Error response:', errorData);
    throw new Error(errorData?.detail || 'Failed to fetch budgets');
  }

  const budgetIds = await response.json();
  
  // Then fetch details for each budget
  const budgetPromises = budgetIds.map((id: number) => getMonthlyBudgetDetails(id));
  return Promise.all(budgetPromises);
};

export const getMonthlyBudgetDetails = async (budgetId: number): Promise<MonthlyBudget> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${api.baseURL}/monthly-budgets/${budgetId}`, {
    method: 'GET',
    headers: {
      ...api.headers,
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || `Failed to fetch budget details for ID ${budgetId}`);
  }

  return await response.json();
};

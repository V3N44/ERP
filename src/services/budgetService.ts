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
    
    // First get all budgets to find the current month's budget ID
    const response = await fetch(`${api.baseURL}/monthly-budgets/`, {
      method: 'GET',
      headers: {
        ...api.headers,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch budgets');
    }

    const budgets = await response.json();
    const currentBudget = budgets.find((budget: MonthlyBudget) => 
      budget.month === currentMonth && budget.year === currentYear
    );

    if (!currentBudget) {
      return null;
    }

    // Now fetch the specific budget details
    const detailsResponse = await fetch(`${api.baseURL}/monthly-budgets/${currentBudget.id}`, {
      method: 'GET',
      headers: {
        ...api.headers,
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!detailsResponse.ok) {
      throw new Error('Failed to fetch budget details');
    }

    return await detailsResponse.json();
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
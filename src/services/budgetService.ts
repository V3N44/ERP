import { api } from "@/config/api";

export interface MonthlyBudget {
  month: number;
  year: number;
  budget_amount: number;
  id?: number;
  created_at?: string;
  remaining_budget?: number;
  money_orders?: MoneyOrder[];
}

export interface MoneyOrder {
  monthly_budget_id: number;
  reason: string;
  amount: number;
  id: number;
  status: string;
  created_at: string;
}

export const createMonthlyBudget = async (budget: MonthlyBudget) => {
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

export const getMonthlyBudgetDetails = async (budgetId: number) => {
  try {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${api.baseURL}/monthly-budgets/${budgetId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching budget details:', error);
    throw error;
  }
};
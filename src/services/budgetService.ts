import { api } from "@/config/api";

export interface MonthlyBudget {
  month: number;
  year: number;
  budget_amount: number;
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
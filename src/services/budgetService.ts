import { api } from "@/config/api";

export interface MonthlyBudget {
  month: number;
  year: number;
  budget_amount: number;
}

export const createMonthlyBudget = async (budget: MonthlyBudget) => {
  try {
    const response = await api.post('/monthly-budgets/', budget);
    return response;
  } catch (error) {
    console.error('Error creating monthly budget:', error);
    throw error;
  }
};
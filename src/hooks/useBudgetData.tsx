import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllBudgets, updateMonthlyBudget } from "@/services/budgetService";
import { useToast } from "@/hooks/use-toast";
import { getChartColor } from "@/utils/chartColors";

export interface SpendingData {
  name: string;
  value: number;
  color: string;
  orders: any[];
}

export const useBudgetData = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [spendingData, setSpendingData] = useState<SpendingData[]>([]);
  const [tempData, setTempData] = useState<SpendingData[]>([]);
  const [newBudgetAmount, setNewBudgetAmount] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: budgets } = useQuery({
    queryKey: ['budgets'],
    queryFn: fetchAllBudgets
  });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const currentBudget = budgets?.find(
    budget => budget.month === currentMonth && budget.year === currentYear
  );

  useEffect(() => {
    if (budgets && currentBudget) {
      const moneyOrdersByReason = currentBudget.money_orders?.reduce((acc: any, order: any) => {
        if (!acc[order.reason]) {
          acc[order.reason] = {
            total: 0,
            orders: []
          };
        }
        acc[order.reason].total += order.amount;
        acc[order.reason].orders.push(order);
        return acc;
      }, {}) || {};

      const newSpendingData = Object.entries(moneyOrdersByReason).map(([reason, data]: [string, any], index) => ({
        name: reason,
        value: data.total,
        color: getChartColor(index),
        orders: data.orders
      }));

      const totalSpent = newSpendingData.reduce((acc, item) => acc + item.value, 0);
      const remaining = currentBudget.budget_amount - totalSpent;
      
      if (remaining > 0) {
        newSpendingData.push({
          name: "Remaining",
          value: remaining,
          color: getChartColor(newSpendingData.length),
          orders: []
        });
      }

      setSpendingData(newSpendingData);
      setTempData(newSpendingData);
      setNewBudgetAmount(currentBudget.budget_amount.toString());
    }
  }, [budgets, currentBudget]);

  const handleSave = async () => {
    if (!currentBudget) return;

    try {
      const amount = parseFloat(newBudgetAmount);
      if (isNaN(amount) || amount <= 0) {
        toast({
          title: "Error",
          description: "Please enter a valid budget amount",
          variant: "destructive",
        });
        return;
      }

      await updateMonthlyBudget(currentBudget.id, { budget_amount: amount });
      
      toast({
        title: "Success",
        description: "Budget amount updated successfully",
      });
      
      queryClient.invalidateQueries({ queryKey: ['budgets'] });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update budget amount",
        variant: "destructive",
      });
    }
  };

  return {
    isEditing,
    setIsEditing,
    spendingData,
    tempData,
    setTempData,
    newBudgetAmount,
    setNewBudgetAmount,
    currentBudget,
    handleSave
  };
};
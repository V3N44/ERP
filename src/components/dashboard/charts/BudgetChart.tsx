import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Save } from "lucide-react";
import { fetchAllBudgets, updateMonthlyBudget } from "@/services/budgetService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { BudgetChartDisplay } from "./budget/BudgetChartDisplay";
import { BudgetChartLegend } from "./budget/BudgetChartLegend";
import { getChartColor } from "@/utils/chartColors";

export const BudgetChart = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [spendingData, setSpendingData] = useState<any[]>([]);
  const [tempData, setTempData] = useState<any[]>([]);
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
      // Group money orders by reason and calculate totals
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

      // Convert grouped data to chart format with colors
      const newSpendingData = Object.entries(moneyOrdersByReason).map(([reason, data]: [string, any], index) => ({
        name: reason,
        value: data.total,
        color: getChartColor(index),
        orders: data.orders
      }));

      // Calculate remaining budget
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

  const handleInputChange = (name: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setTempData(prev => 
      prev.map(item => 
        item.name === name ? { ...item, value: numValue } : item
      )
    );
  };

  const handleBudgetAmountChange = (value: string) => {
    setNewBudgetAmount(value);
  };

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

  const handleEdit = () => {
    setTempData(spendingData);
    setIsEditing(true);
  };

  const totalSpent = spendingData.reduce((acc, item) => 
    item.name !== "Remaining" ? acc + item.value : acc, 0
  );

  const totalBudget = currentBudget?.budget_amount || 0;
  const totalMoneyOrders = currentBudget?.money_orders?.reduce(
    (acc: number, order: any) => acc + order.amount, 
    0
  ) || 0;

  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-heading font-semibold text-gray-700">
          Monthly Budget Allocation
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={isEditing ? handleSave : handleEdit}
          className="h-8 w-8"
        >
          {isEditing ? (
            <Save className="h-4 w-4 text-gray-600" />
          ) : (
            <Edit2 className="h-4 w-4 text-gray-600" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <BudgetChartDisplay 
          spendingData={spendingData}
          totalSpent={totalSpent}
          totalBudget={totalBudget}
          totalMoneyOrders={totalMoneyOrders}
        />

        {isEditing && (
          <div className="mt-4 space-y-4">
            <div className="space-y-2 border p-3 rounded-lg">
              <label className="font-medium text-gray-700">Budget Amount</label>
              <Input
                type="number"
                value={newBudgetAmount}
                onChange={(e) => handleBudgetAmountChange(e.target.value)}
                className="h-8"
                min="0"
                step="0.01"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {tempData.map((item) => (
                <div key={item.name} className="space-y-2 border p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-gray-700">{item.name}</span>
                  </div>
                  <Input
                    type="number"
                    value={item.value}
                    onChange={(e) => handleInputChange(item.name, e.target.value)}
                    className="h-8"
                    disabled={item.name === "Remaining"}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <BudgetChartLegend spendingData={spendingData} />
      </CardContent>
    </Card>
  );
};
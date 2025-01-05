import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MoneyOrderList } from "@/components/backoffice/budget/MoneyOrderList";
import { AddMoneyOrderDialog } from "@/components/backoffice/budget/AddMoneyOrderDialog";
import { BudgetCards } from "@/components/backoffice/budget/BudgetCards";
import { createMonthlyBudget, fetchMonthlyBudget, updateMonthlyBudget } from "@/services/budgetService";
import { Plus } from "lucide-react";

export default function BudgetManagementPage() {
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [monthlyBudgetId, setMonthlyBudgetId] = useState<number | null>(null);
  const [shouldRefreshOrders, setShouldRefreshOrders] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchExistingBudget();
  }, []);

  useEffect(() => {
    setTotalSpent(monthlyBudget - remainingBudget);
  }, [monthlyBudget, remainingBudget]);

  const fetchExistingBudget = async () => {
    try {
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      
      const budgets = await fetchMonthlyBudget(month, year);
      
      if (budgets && budgets.length > 0) {
        const currentBudget = budgets[0];
        setMonthlyBudgetId(currentBudget.id);
        setMonthlyBudget(currentBudget.budget_amount);
        setRemainingBudget(currentBudget.remaining_amount ?? currentBudget.budget_amount);
      } else {
        const newBudget = await createMonthlyBudget({
          month,
          year,
          budget_amount: 0
        });
        setMonthlyBudgetId(newBudget.id);
        setMonthlyBudget(newBudget.budget_amount);
        setRemainingBudget(newBudget.budget_amount);
      }
    } catch (error) {
      console.error('Error fetching existing budget:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch budget information",
      });
    }
  };

  const handleUpdateBudget = async (newBudget: number) => {
    try {
      setIsSubmitting(true);
      if (!monthlyBudgetId) {
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const newBudgetData = await createMonthlyBudget({
          month,
          year,
          budget_amount: newBudget
        });

        setMonthlyBudgetId(newBudgetData.id);
        setMonthlyBudget(newBudget);
        setRemainingBudget(newBudgetData.remaining_amount ?? newBudget);
      } else {
        const date = new Date();
        const updatedBudget = await updateMonthlyBudget(monthlyBudgetId, {
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          budget_amount: newBudget
        });

        setMonthlyBudget(newBudget);
        setRemainingBudget(updatedBudget.remaining_amount ?? newBudget);
      }
      
      toast({
        title: "Success",
        description: `Monthly budget has been set to $${newBudget.toLocaleString()}`,
      });
    } catch (error) {
      console.error('Error updating budget:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update monthly budget",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOrderCreated = () => {
    setShouldRefreshOrders(prev => !prev);
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-purple-900">Budget Management</h1>
        <p className="text-gray-500">Manage your monthly budget and money orders</p>
      </div>
      
      <BudgetCards
        monthlyBudget={monthlyBudget}
        remainingBudget={remainingBudget}
        onUpdateBudget={handleUpdateBudget}
        totalSpent={totalSpent}
        isSubmitting={isSubmitting}
      />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-purple-900">Money Orders</h2>
        <Button 
          onClick={() => setShowAddDialog(true)}
          disabled={!monthlyBudgetId || isSubmitting}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Money Order
        </Button>
      </div>

      {monthlyBudgetId ? (
        <MoneyOrderList 
          remainingBudget={remainingBudget}
          onBudgetUpdate={setRemainingBudget}
          monthlyBudgetId={monthlyBudgetId}
          shouldRefresh={shouldRefreshOrders}
        />
      ) : (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
          Please set a monthly budget first to view and create money orders.
        </div>
      )}

      {monthlyBudgetId && (
        <AddMoneyOrderDialog
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          remainingBudget={remainingBudget}
          onBudgetUpdate={setRemainingBudget}
          monthlyBudgetId={monthlyBudgetId}
          onOrderCreated={handleOrderCreated}
        />
      )}
    </div>
  );
}
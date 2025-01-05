import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MoneyOrderList } from "@/components/backoffice/budget/MoneyOrderList";
import { AddMoneyOrderDialog } from "@/components/backoffice/budget/AddMoneyOrderDialog";
import { format } from "date-fns";
import { API_CONFIG } from "@/config/api";

export default function BudgetManagementPage() {
  const [monthlyBudget, setMonthlyBudget] = useState(1000);
  const [remainingBudget, setRemainingBudget] = useState(1000);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [monthlyBudgetId, setMonthlyBudgetId] = useState<number | null>(null);
  const [shouldRefreshOrders, setShouldRefreshOrders] = useState(false);
  const { toast } = useToast();
  const currentMonth = format(new Date(), 'MMMM yyyy');

  const handleUpdateBudget = async (newBudget: number) => {
    try {
      const date = new Date();
      const response = await fetch(`${API_CONFIG.baseURL}/monthly-budgets/`, {
        method: 'POST',
        headers: {
          ...API_CONFIG.headers,
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          budget_amount: newBudget
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update budget');
      }

      const data = await response.json();
      setMonthlyBudgetId(data.id);
      setMonthlyBudget(newBudget);
      setRemainingBudget(newBudget);
      
      toast({
        title: "Budget Updated",
        description: `Monthly budget has been set to $${newBudget}`,
      });
    } catch (error) {
      console.error('Error updating budget:', error);
      toast({
        title: "Error",
        description: "Failed to update monthly budget. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOrderCreated = () => {
    setShouldRefreshOrders(prev => !prev);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Budget Management</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={monthlyBudget}
                onChange={(e) => handleUpdateBudget(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-500">USD</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Current Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{currentMonth}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${remainingBudget}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-purple-900">Money Orders</h2>
        <Button 
          onClick={() => setShowAddDialog(true)}
          disabled={!monthlyBudgetId}
        >
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
        <div className="text-center py-4 text-gray-500">
          Please set a monthly budget first to view and create money orders.
        </div>
      )}

      <AddMoneyOrderDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        remainingBudget={remainingBudget}
        onBudgetUpdate={setRemainingBudget}
        monthlyBudgetId={monthlyBudgetId!}
        onOrderCreated={handleOrderCreated}
      />
    </div>
  );
}
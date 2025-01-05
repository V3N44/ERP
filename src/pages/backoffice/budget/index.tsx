import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { MoneyOrderList } from "@/components/backoffice/budget/MoneyOrderList";
import { AddMoneyOrderDialog } from "@/components/backoffice/budget/AddMoneyOrderDialog";
import { format } from "date-fns";

export default function BudgetManagementPage() {
  const [monthlyBudget, setMonthlyBudget] = useState(1000);
  const [remainingBudget, setRemainingBudget] = useState(1000);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { toast } = useToast();
  const currentMonth = format(new Date(), 'MMMM yyyy');

  const handleUpdateBudget = (newBudget: number) => {
    setMonthlyBudget(newBudget);
    setRemainingBudget(newBudget);
    toast({
      title: "Budget Updated",
      description: `Monthly budget has been set to $${newBudget}`,
    });
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
        <Button onClick={() => setShowAddDialog(true)}>New Money Order</Button>
      </div>

      <MoneyOrderList 
        remainingBudget={remainingBudget}
        onBudgetUpdate={setRemainingBudget}
      />

      <AddMoneyOrderDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        remainingBudget={remainingBudget}
        onBudgetUpdate={setRemainingBudget}
      />
    </div>
  );
}
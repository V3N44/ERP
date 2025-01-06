import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, Save } from "lucide-react";
import { BudgetChartDisplay } from "./budget/BudgetChartDisplay";
import { BudgetChartLegend } from "./budget/BudgetChartLegend";
import { BudgetEditForm } from "./budget/BudgetEditForm";
import { useBudgetData } from "@/hooks/useBudgetData";

export const BudgetChart = () => {
  const {
    isEditing,
    setIsEditing,
    spendingData,
    tempData,
    setTempData,
    newBudgetAmount,
    setNewBudgetAmount,
    currentBudget,
    handleSave
  } = useBudgetData();

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
          <BudgetEditForm
            tempData={tempData}
            newBudgetAmount={newBudgetAmount}
            onBudgetAmountChange={handleBudgetAmountChange}
            onInputChange={handleInputChange}
          />
        )}

        <BudgetChartLegend spendingData={spendingData} />
      </CardContent>
    </Card>
  );
};
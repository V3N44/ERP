import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { DollarSign, Calendar, PiggyBank, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BudgetCardsProps {
  monthlyBudget: number;
  remainingBudget: number;
  onUpdateBudget: (value: number) => void;
  totalSpent: number;
  isSubmitting?: boolean;
}

export const BudgetCards = ({ 
  monthlyBudget, 
  remainingBudget, 
  onUpdateBudget,
  totalSpent,
  isSubmitting 
}: BudgetCardsProps) => {
  const currentDate = new Date();
  const currentMonth = format(currentDate, 'MMMM yyyy');
  const spentPercentage = monthlyBudget > 0 ? (totalSpent / monthlyBudget) * 100 : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Monthly Budget Allocation</CardTitle>
          <DollarSign className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={monthlyBudget}
                onChange={(e) => onUpdateBudget(Number(e.target.value))}
                className="w-full"
                min="0"
                step="100"
                placeholder="Enter budget amount"
                disabled={isSubmitting}
              />
              <span className="text-sm text-gray-500">USD</span>
            </div>
            <p className="text-xs text-gray-500">Set your monthly budget allocation</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Current Period</CardTitle>
          <Calendar className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-purple-900">{currentMonth}</p>
          <p className="text-xs text-gray-500 mt-1">Active budget period</p>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-purple-900">${totalSpent.toLocaleString()}</p>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(spentPercentage, 100)}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">{spentPercentage.toFixed(1)}% of budget</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
          <PiggyBank className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-purple-900">${remainingBudget.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">Available to spend</p>
        </CardContent>
      </Card>
    </div>
  );
};
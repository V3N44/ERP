import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { DollarSign, Calendar, PiggyBank } from "lucide-react";

interface BudgetCardsProps {
  monthlyBudget: number;
  remainingBudget: number;
  onUpdateBudget: (value: number) => void;
}

export const BudgetCards = ({ monthlyBudget, remainingBudget, onUpdateBudget }: BudgetCardsProps) => {
  const currentDate = new Date();
  const currentMonth = format(currentDate, 'MMMM yyyy');

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Monthly Budget</CardTitle>
          <DollarSign className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={monthlyBudget}
              onChange={(e) => onUpdateBudget(Number(e.target.value))}
              className="w-full"
              min="0"
              step="100"
            />
            <span className="text-sm text-gray-500">USD</span>
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
        </CardContent>
      </Card>

      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
          <PiggyBank className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-purple-900">${remainingBudget.toLocaleString()}</p>
        </CardContent>
      </Card>
    </div>
  );
};
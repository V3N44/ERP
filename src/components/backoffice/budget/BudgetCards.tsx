import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface BudgetCardsProps {
  monthlyBudget: number;
  remainingBudget: number;
  onUpdateBudget: (value: number) => void;
}

export const BudgetCards = ({ monthlyBudget, remainingBudget, onUpdateBudget }: BudgetCardsProps) => {
  const currentMonth = format(new Date(), 'MMMM yyyy');

  return (
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
              onChange={(e) => onUpdateBudget(Number(e.target.value))}
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
  );
};
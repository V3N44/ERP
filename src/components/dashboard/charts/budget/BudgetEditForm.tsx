import { Input } from "@/components/ui/input";
import { SpendingData } from "@/hooks/useBudgetData";

interface BudgetEditFormProps {
  tempData: SpendingData[];
  newBudgetAmount: string;
  onBudgetAmountChange: (value: string) => void;
  onInputChange: (name: string, value: string) => void;
}

export const BudgetEditForm = ({
  tempData,
  newBudgetAmount,
  onBudgetAmountChange,
  onInputChange
}: BudgetEditFormProps) => {
  return (
    <div className="mt-4 space-y-4">
      <div className="space-y-2 border p-3 rounded-lg">
        <label className="font-medium text-gray-700">Budget Amount</label>
        <Input
          type="number"
          value={newBudgetAmount}
          onChange={(e) => onBudgetAmountChange(e.target.value)}
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
              onChange={(e) => onInputChange(item.name, e.target.value)}
              className="h-8"
              disabled={item.name === "Remaining"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
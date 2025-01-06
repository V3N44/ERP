interface BudgetChartCenterProps {
  totalSpent: number;
  totalBudget: number;
  totalMoneyOrders: number;
}

export const BudgetChartCenter = ({ 
  totalSpent, 
  totalBudget,
  totalMoneyOrders 
}: BudgetChartCenterProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center space-y-1">
      <p className="text-3xl font-bold text-gray-700">${totalSpent}</p>
      <p className="text-sm text-gray-500">of ${totalBudget}</p>
      <p className="text-xs text-blue-600 font-medium">
        Money Orders: ${totalMoneyOrders}
      </p>
    </div>
  );
};
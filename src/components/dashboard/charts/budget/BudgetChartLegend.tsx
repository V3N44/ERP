interface BudgetChartLegendProps {
  spendingData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const BudgetChartLegend = ({ spendingData }: BudgetChartLegendProps) => {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
      {spendingData.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm font-sans text-gray-600">
            {item.name} {item.name !== "Remaining" && `($${item.value})`}
          </span>
        </div>
      ))}
    </div>
  );
};
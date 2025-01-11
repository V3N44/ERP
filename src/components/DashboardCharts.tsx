import { EarningsChart } from "./dashboard/charts/EarningsChart";
import { ExpensesChart } from "./dashboard/charts/ExpensesChart";
import { BudgetChart } from "./dashboard/charts/BudgetChart";
import { SalesPurchaseChart } from "./dashboard/charts/SalesPurchaseChart";

export const DashboardCharts = () => {
  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="w-full min-h-[300px]">
          <EarningsChart />
        </div>
        <div className="w-full min-h-[300px]">
          <ExpensesChart />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="w-full min-h-[300px]">
          <SalesPurchaseChart />
        </div>
        <div className="w-full min-h-[300px]">
          <BudgetChart />
        </div>
      </div>
    </div>
  );
};
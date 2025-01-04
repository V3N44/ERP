import { EarningsChart } from "./dashboard/charts/EarningsChart";
import { ExpensesChart } from "./dashboard/charts/ExpensesChart";
import { BudgetChart } from "./dashboard/charts/BudgetChart";
import { SalesPurchaseChart } from "./dashboard/charts/SalesPurchaseChart";
import { FinancialGoals } from "./dashboard/FinancialGoals";

export const DashboardCharts = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EarningsChart />
        <ExpensesChart />
        <BudgetChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialGoals />
        <SalesPurchaseChart />
      </div>
    </div>
  );
};
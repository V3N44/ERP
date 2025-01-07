import { EarningsChart } from "./dashboard/charts/EarningsChart";
import { ExpensesChart } from "./dashboard/charts/ExpensesChart";
import { BudgetChart } from "./dashboard/charts/BudgetChart";
import { SalesPurchaseChart } from "./dashboard/charts/SalesPurchaseChart";
import { useState, useEffect } from "react";
import { InventoryItem } from "@/types/inventory";

export const DashboardCharts = () => {
  const [chartData, setChartData] = useState<{
    sales: InventoryItem[];
    purchases: InventoryItem[];
    dates: string[];
  }>({
    sales: [],
    purchases: [],
    dates: []
  });

  useEffect(() => {
    // Here you would typically fetch your sales and purchases data
    // For now, we'll use the mock data
    setChartData({
      sales: [],
      purchases: [],
      dates: []
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EarningsChart />
        <ExpensesChart />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SalesPurchaseChart data={chartData} />
        <BudgetChart />
      </div>
    </div>
  );
};
import React from 'react';
import { SalesPurchaseChart } from './dashboard/charts/SalesPurchaseChart';

interface ChartData {
  sales: any[];
  purchases: any[];
  dates: any[];
}

interface DashboardChartsProps {
  data: ChartData;
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ data }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div className="col-span-2">
        <SalesPurchaseChart data={data} />
      </div>
      <div className="col-span-1">
        {/* Placeholder for another chart component */}
      </div>
      <div className="col-span-1">
        {/* Placeholder for another chart component */}
      </div>
    </div>
  );
};

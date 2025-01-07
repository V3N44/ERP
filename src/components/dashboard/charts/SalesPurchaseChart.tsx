import { InventoryItem } from "@/types/inventory";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalesPurchaseChartProps {
  data: {
    sales: InventoryItem[];
    purchases: InventoryItem[];
    dates: string[];
  };
}

export const SalesPurchaseChart = ({ data }: SalesPurchaseChartProps) => {
  // Transform data for the chart
  const chartData = data.dates.map(date => {
    const salesCount = data.sales.filter(sale => 
      sale.created_at?.split('T')[0] === date
    ).length;
    
    const purchaseCount = data.purchases.filter(purchase => 
      purchase.created_at?.split('T')[0] === date
    ).length;

    return {
      date,
      sales: salesCount,
      purchases: purchaseCount
    };
  });

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Sales vs Purchases</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales" />
            <Line type="monotone" dataKey="purchases" stroke="#82ca9d" name="Purchases" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
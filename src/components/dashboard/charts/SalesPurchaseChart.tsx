import { Card } from "@/components/ui/card";
import { InventoryItem } from "@/services/inventoryService";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SalesPurchaseChartProps {
  data: InventoryItem[];
}

export const SalesPurchaseChart = ({ data }: SalesPurchaseChartProps) => {
  // Transform data for the chart
  const chartData = data.map((item) => ({
    name: format(new Date(), 'MMM dd'), // Use current date since created_at is not available
    sales: item.price,
    purchases: item.price * 0.8, // Example calculation
  }));

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Sales & Purchases Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="purchases" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
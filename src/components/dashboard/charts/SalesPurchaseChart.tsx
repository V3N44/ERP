import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartData {
  sales: Array<{
    created_at: string;
    amount: number;
  }>;
  purchases: Array<{
    created_at: string;
    amount: number;
  }>;
  dates: string[];
}

interface SalesPurchaseChartProps {
  data: ChartData;
}

export const SalesPurchaseChart: React.FC<SalesPurchaseChartProps> = ({ data }) => {
  const chartData = data.dates.map((date, index) => ({
    date,
    sales: data.sales.find(s => s.created_at === date)?.amount || 0,
    purchases: data.purchases.find(p => p.created_at === date)?.amount || 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales vs Purchases</CardTitle>
      </CardHeader>
      <CardContent>
        <LineChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          <Line type="monotone" dataKey="purchases" stroke="#82ca9d" />
        </LineChart>
      </CardContent>
    </Card>
  );
};
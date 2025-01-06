import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/orderService";
import { Loader2 } from "lucide-react";

export function SalesPurchaseChart() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(0, 100),
  });

  // Calculate weekly data from orders
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)); // Start from Monday

  const weeklyData = daysOfWeek.map((day, index) => {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + index);

    const dayOrders = orders?.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate.toDateString() === currentDate.toDateString();
    }) || [];

    const totalSales = dayOrders.reduce((sum, order) => sum + order.total, 0);
    const pacedOrders = dayOrders.filter(order => order.status === "Pending").reduce((sum, order) => sum + order.total, 0);

    return {
      name: day,
      sales: totalSales,
      paced: pacedOrders,
    };
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Sales Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[350px]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Sales Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis 
              stroke="#888888" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value}`} 
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, '']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '8px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="sales" 
              name="Total Sales" 
              fill="#8884d8" 
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="paced" 
              name="Paced Orders" 
              fill="#82ca9d" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
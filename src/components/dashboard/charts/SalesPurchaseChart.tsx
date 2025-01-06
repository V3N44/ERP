import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getInventoryItems } from "@/services/inventoryService";
import { getCustomers } from "@/services/customerService";

export const SalesPurchaseChart = () => {
  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getInventoryItems(0, 100),
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers({ skip: 0, limit: 100 }),
  });

  // Calculate monthly data based on inventory and customers
  const currentMonth = new Date().getMonth();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12;
    return {
      month: monthNames[monthIndex],
      sales: customers ? Math.round((customers.length / 6) * (i + 1)) : 0,
      purchases: inventory ? Math.round((inventory.length / 6) * (i + 1)) : 0,
    };
  }).reverse();

  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl">
      <CardHeader>
        <CardTitle className="text-sm font-heading font-semibold text-gray-700">
          Sales vs Purchases
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lastSixMonths}>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              dot={{ fill: '#8B5CF6' }}
            />
            <Line 
              type="monotone" 
              dataKey="purchases" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={{ fill: '#10B981' }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm font-sans text-gray-600">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm font-sans text-gray-600">Purchases</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
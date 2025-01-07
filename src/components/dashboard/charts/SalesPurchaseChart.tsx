import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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

  // Calculate daily data based on inventory and customers
  const currentDay = new Date().getDay();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const weekData = Array.from({ length: 7 }, (_, i) => {
    const dayIndex = (i + 1) % 7; // Start from Monday (1) to Sunday (0)
    const isCurrentDay = dayIndex === currentDay;
    return {
      day: dayNames[dayIndex],
      sales: customers ? Math.round((customers.length / 7) * (i + 1)) : 0,
      purchases: inventory ? Math.round((inventory.length / 7) * (i + 1)) : 0,
      isCurrentDay,
    };
  });

  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl">
      <CardHeader>
        <CardTitle className="text-sm font-heading font-semibold text-gray-700">
          Weekly Sales Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weekData}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={({ x, y, payload }) => (
                <text
                  x={x}
                  y={y + 10}
                  fill={payload.value === dayNames[currentDay] ? '#1F2937' : '#64748b'}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={payload.value === dayNames[currentDay] ? 'bold' : 'normal'}
                >
                  {payload.value}
                </text>
              )}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip />
            <Bar 
              dataKey="sales" 
              fill="#8B5CF6"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Bar 
              dataKey="purchases" 
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm font-sans text-gray-600">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm font-sans text-gray-600">Expenses</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getInventoryItems } from "@/services/inventoryService";
import { getCustomers } from "@/services/customerService";
import { format, isToday, startOfWeek, addDays } from "date-fns";

export const SalesPurchaseChart = () => {
  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getInventoryItems(0, 100),
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers({ skip: 0, limit: 100 }),
  });

  // Calculate weekly data starting from Monday
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekData = Array.from({ length: 7 }, (_, index) => {
    const currentDate = addDays(startOfCurrentWeek, index);
    const isCurrentDay = isToday(currentDate);
    
    return {
      day: format(currentDate, 'EEE'),
      date: format(currentDate, 'MMM dd'),
      sales: customers ? Math.round((customers.length / 7) * (index + 1)) : 0,
      purchases: inventory ? Math.round((inventory.length / 7) * (index + 1)) : 0,
      isCurrentDay,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-semibold">{`${label}`}</p>
          <p className="text-purple-500">{`Sales: ${payload[0].value}`}</p>
          <p className="text-emerald-500">{`Purchases: ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };

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
                  fill={weekData[payload.index].isCurrentDay ? '#8B5CF6' : '#64748b'}
                  textAnchor="middle"
                  fontSize={weekData[payload.index].isCurrentDay ? 14 : 12}
                  fontWeight={weekData[payload.index].isCurrentDay ? 'bold' : 'normal'}
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
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="sales" 
              fill={(data: any) => data.isCurrentDay ? '#8B5CF6' : '#C4B5FD'}
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="purchases" 
              fill={(data: any) => data.isCurrentDay ? '#10B981' : '#6EE7B7'}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getInventoryItems } from "@/services/inventoryService";
import { getOrders } from "@/services/orderService";
import { format, startOfWeek, addDays, isWithinInterval, startOfDay, endOfDay, isSameDay } from "date-fns";

export const SalesPurchaseChart = () => {
  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getInventoryItems(0, 100),
  });

  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(0, 100),
  });

  // Calculate weekly data based on orders
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Start from Monday

  const weeklySalesData = Array.from({ length: 7 }, (_, index) => {
    const currentDate = addDays(weekStart, index);
    const dayStr = format(currentDate, 'EEE');
    
    // Filter orders for the current day
    const dayOrders = orders?.filter(order => {
      const orderDate = new Date(order.date);
      return isWithinInterval(orderDate, {
        start: startOfDay(currentDate),
        end: endOfDay(currentDate)
      });
    }) || [];

    const daySales = dayOrders.reduce((sum, order) => sum + order.total, 0);
    const dayPurchases = inventory ? Math.round((inventory.length / 7) * (index + 1)) : 0;

    const isCurrentDay = isSameDay(currentDate, today);

    return {
      day: dayStr,
      date: format(currentDate, 'MMM dd'),
      sales: Math.round(daySales),
      purchases: dayPurchases,
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
          <LineChart data={weeklySalesData}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={({ x, y, payload }) => (
                <g transform={`translate(${x},${y})`}>
                  <text 
                    x={0} 
                    y={0} 
                    dy={16} 
                    textAnchor="middle" 
                    fill={payload.value === format(today, 'EEE') ? '#8B5CF6' : '#64748b'}
                    fontSize={12}
                    fontWeight={payload.value === format(today, 'EEE') ? 'bold' : 'normal'}
                  >
                    {payload.value}
                  </text>
                </g>
              )}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '8px'
              }}
              labelFormatter={(value, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.date;
                }
                return value;
              }}
              formatter={(value, name) => [
                `$${value}`,
                name === 'sales' ? 'Sales' : 'Purchases'
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              dot={(props) => {
                const isCurrentDay = props.payload.isCurrentDay;
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={isCurrentDay ? 6 : 4}
                    fill={isCurrentDay ? '#8B5CF6' : '#fff'}
                    stroke="#8B5CF6"
                    strokeWidth={2}
                  />
                );
              }}
            />
            <Line 
              type="monotone" 
              dataKey="purchases" 
              stroke="#10B981" 
              strokeWidth={2}
              dot={(props) => {
                const isCurrentDay = props.payload.isCurrentDay;
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={isCurrentDay ? 6 : 4}
                    fill={isCurrentDay ? '#10B981' : '#fff'}
                    stroke="#10B981"
                    strokeWidth={2}
                  />
                );
              }}
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
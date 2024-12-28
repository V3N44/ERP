import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const expensesData = [
  { day: "Mon", income: 300, spent: 250 },
  { day: "Tue", income: 400, spent: 300 },
  { day: "Wed", income: 500, spent: 450 },
  { day: "Thu", income: 450, spent: 400 },
  { day: "Fri", income: 300, spent: 200 },
  { day: "Sat", income: 400, spent: 350 },
  { day: "Sun", income: 350, spent: 300 },
];

export const ExpensesChart = () => {
  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-heading font-semibold text-gray-700">Track expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expensesData} barGap={8}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              hide={true}
            />
            <Tooltip 
              cursor={false}
              contentStyle={{
                background: 'transparent',
                border: 'none',
              }}
              labelStyle={{
                color: '#1a1a1a',
                fontWeight: '600'
              }}
              itemStyle={{
                color: '#1a1a1a'
              }}
              formatter={(value) => [`$${value}`, '']}
            />
            <Bar 
              dataKey="income" 
              fill="#E5E7EB" 
              radius={[20, 20, 20, 20]}
              maxBarSize={24}
            />
            <Bar 
              dataKey="spent" 
              fill="#10B981" 
              radius={[20, 20, 20, 20]}
              maxBarSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
            <span className="text-sm font-sans text-gray-600">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm font-sans text-gray-600">Spent</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Save } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/orderService";

export const ExpensesChart = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState([]);

  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(0, 100),
  });

  // Calculate weekly sales data
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)); // Start from Monday

  const weeklySalesData = daysOfWeek.map((day, index) => {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + index);

    const dayOrders = orders?.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate.toDateString() === currentDate.toDateString();
    }) || [];

    const dayRevenue = dayOrders.reduce((sum, order) => sum + order.total, 0);
    const dayExpenses = dayRevenue * 0.7; // Assuming 70% of revenue goes to expenses

    return {
      day,
      income: Math.round(dayRevenue),
      spent: Math.round(dayExpenses),
    };
  });

  const handleInputChange = (day: string, field: 'income' | 'spent', value: string) => {
    const numValue = parseFloat(value) || 0;
    setTempData(prev => 
      prev.map(item => 
        item.day === day ? { ...item, [field]: numValue } : item
      )
    );
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setTempData(weeklySalesData);
    setIsEditing(true);
  };

  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-heading font-semibold text-gray-700">
          Weekly Sales Distribution
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={isEditing ? handleSave : handleEdit}
          className="h-8 w-8"
        >
          {isEditing ? (
            <Save className="h-4 w-4 text-gray-600" />
          ) : (
            <Edit2 className="h-4 w-4 text-gray-600" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={isEditing ? tempData : weeklySalesData} barGap={8}>
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

        {isEditing && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {tempData.map((item) => (
              <div key={item.day} className="space-y-2 border p-3 rounded-lg">
                <div className="font-medium text-gray-700">{item.day}</div>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm text-gray-600">Income</label>
                    <Input
                      type="number"
                      value={item.income}
                      onChange={(e) => handleInputChange(item.day, 'income', e.target.value)}
                      className="h-8 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Spent</label>
                    <Input
                      type="number"
                      value={item.spent}
                      onChange={(e) => handleInputChange(item.day, 'spent', e.target.value)}
                      className="h-8 mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-200"></div>
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
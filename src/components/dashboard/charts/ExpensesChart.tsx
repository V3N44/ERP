import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Save } from "lucide-react";

const initialExpensesData = [
  { day: "Mon", income: 300, spent: 250 },
  { day: "Tue", income: 400, spent: 300 },
  { day: "Wed", income: 500, spent: 450 },
  { day: "Thu", income: 450, spent: 400 },
  { day: "Fri", income: 300, spent: 200 },
  { day: "Sat", income: 400, spent: 350 },
  { day: "Sun", income: 350, spent: 300 },
];

export const ExpensesChart = () => {
  const [expensesData, setExpensesData] = useState(initialExpensesData);
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(initialExpensesData);

  const handleInputChange = (day: string, field: 'income' | 'spent', value: string) => {
    const numValue = parseFloat(value) || 0;
    setTempData(prev => 
      prev.map(item => 
        item.day === day ? { ...item, [field]: numValue } : item
      )
    );
  };

  const handleSave = () => {
    setExpensesData(tempData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setTempData(expensesData);
    setIsEditing(true);
  };

  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-heading font-semibold text-gray-700">Track expenses</CardTitle>
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
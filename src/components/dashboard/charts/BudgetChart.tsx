import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Save } from "lucide-react";
import { fetchAllBudgets } from "@/services/budgetService";
import { useQuery } from "@tanstack/react-query";

const getColorForIndex = (index: number) => {
  const colors = ["#1EAEDB", "#45B6E0", "#67C3E6", "#89D0EC", "#D3E4FD"];
  return colors[index % colors.length];
};

export const BudgetChart = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [spendingData, setSpendingData] = useState<any[]>([]);
  const [tempData, setTempData] = useState<any[]>([]);

  const { data: budgets } = useQuery({
    queryKey: ['budgets'],
    queryFn: fetchAllBudgets
  });

  useEffect(() => {
    if (budgets) {
      // Get current month's budget
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      
      const currentBudget = budgets.find(
        budget => budget.month === currentMonth && budget.year === currentYear
      );

      if (currentBudget) {
        // Calculate total spent from money orders
        const totalSpent = currentBudget.money_orders?.reduce(
          (acc: number, order: any) => acc + order.amount, 
          0
        ) || 0;

        // Group money orders by reason
        const spendingByReason = currentBudget.money_orders?.reduce((acc: any, order: any) => {
          if (!acc[order.reason]) {
            acc[order.reason] = 0;
          }
          acc[order.reason] += order.amount;
          return acc;
        }, {}) || {};

        // Convert to chart data format
        const newSpendingData = Object.entries(spendingByReason).map(([reason, amount], index) => ({
          name: reason,
          value: amount,
          color: getColorForIndex(index)
        }));

        // Add remaining budget
        const remaining = currentBudget.budget_amount - totalSpent;
        if (remaining > 0) {
          newSpendingData.push({
            name: "Remaining",
            value: remaining,
            color: getColorForIndex(newSpendingData.length)
          });
        }

        setSpendingData(newSpendingData);
        setTempData(newSpendingData);
      }
    }
  }, [budgets]);

  const handleInputChange = (name: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setTempData(prev => 
      prev.map(item => 
        item.name === name ? { ...item, value: numValue } : item
      )
    );
  };

  const handleSave = () => {
    setSpendingData(tempData);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setTempData(spendingData);
    setIsEditing(true);
  };

  const totalSpent = spendingData.reduce((acc, item) => 
    item.name !== "Remaining" ? acc + item.value : acc, 0
  );

  const totalBudget = budgets?.find(budget => {
    const currentDate = new Date();
    return budget.month === currentDate.getMonth() + 1 && 
           budget.year === currentDate.getFullYear();
  })?.budget_amount || 0;

  return (
    <Card className="bg-white border-none shadow-sm rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-heading font-semibold text-gray-700">
          Monthly Budget Allocation
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
        <div className="relative">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={spendingData}
                cx="50%"
                cy="50%"
                innerRadius={85}
                outerRadius={95}
                startAngle={90}
                endAngle={-270}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {spendingData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-3xl font-bold text-gray-700">${totalSpent}</p>
            <p className="text-sm text-gray-500">of ${totalBudget}</p>
          </div>
        </div>

        {isEditing && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            {tempData.map((item) => (
              <div key={item.name} className="space-y-2 border p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="font-medium text-gray-700">{item.name}</span>
                </div>
                <Input
                  type="number"
                  value={item.value}
                  onChange={(e) => handleInputChange(item.name, e.target.value)}
                  className="h-8"
                  disabled={item.name === "Remaining"}
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          {spendingData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm font-sans text-gray-600">
                {item.name} {item.name !== "Remaining" && `($${item.value})`}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { BudgetChartCenter } from "./BudgetChartCenter";
import { getChartColor } from "@/utils/chartColors";

interface BudgetChartDisplayProps {
  spendingData: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  totalSpent: number;
  totalBudget: number;
  totalMoneyOrders: number;
}

export const BudgetChartDisplay = ({ 
  spendingData, 
  totalSpent, 
  totalBudget,
  totalMoneyOrders 
}: BudgetChartDisplayProps) => {
  return (
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
                fill={entry.color || getChartColor(index)} 
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <BudgetChartCenter 
        totalSpent={totalSpent} 
        totalBudget={totalBudget} 
        totalMoneyOrders={totalMoneyOrders}
      />
    </div>
  );
};
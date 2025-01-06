import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

const data = [
  { name: "Mon", sales: 400, paced: 240 },
  { name: "Tue", sales: 300, paced: 139 },
  { name: "Wed", sales: 520, paced: 380 },
  { name: "Thu", sales: 400, paced: 380 },
  { name: "Fri", sales: 592, paced: 430 },
  { name: "Sat", sales: 690, paced: 450 },
  { name: "Sun", sales: 390, paced: 210 },
];

export function SalesPurchaseChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Sales Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" name="Total Sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="paced" name="Paced Orders" fill="#82ca9d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
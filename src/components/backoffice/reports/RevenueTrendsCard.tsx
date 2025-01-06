import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface RevenueTrendsProps {
  data: Array<{
    month: string;
    revenue: number;
  }>;
}

export const RevenueTrendsCard = ({ data }: RevenueTrendsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#8884d8" 
                name="Revenue ($)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
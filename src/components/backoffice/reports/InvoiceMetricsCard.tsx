import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface InvoiceMetricsProps {
  data: Array<{
    month: string;
    invoices: number;
    revenue: number;
  }>;
}

export const InvoiceMetricsCard = ({ data }: InvoiceMetricsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="invoices" fill="#8884d8" name="Invoices Generated" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
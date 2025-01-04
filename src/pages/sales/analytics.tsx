import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { getInventoryItems } from "@/services/inventoryService";
import { getCustomers } from "@/services/customerService";

const AnalyticsPage = () => {
  // Fetch sales data
  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getInventoryItems(0, 100),
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers({ skip: 0, limit: 100 }),
  });

  // Calculate monthly data based on inventory and customers
  const currentMonth = new Date().getMonth();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12;
    return {
      month: monthNames[monthIndex],
      sales: customers ? Math.round((customers.length / 6) * (i + 1)) : 0,
      revenue: inventory ? Math.round((inventory.length * 50000 / 6) * (i + 1)) : 0,
    };
  }).reverse();

  // Calculate total revenue
  const totalRevenue = inventory ? inventory.length * 50000 : 0;
  const averageOrderValue = inventory && inventory.length > 0 ? totalRevenue / inventory.length : 0;
  const conversionRate = customers && inventory ? ((customers.length / inventory.length) * 100).toFixed(1) : 0;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Sales Analytics</h1>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">+15% from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageOrderValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+5% from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">+0.2 from last quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lastSixMonths}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    dot={{ fill: '#8884d8' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lastSixMonths}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="revenue" 
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { getInventoryItems } from "@/services/inventoryService";
import { getCustomers } from "@/services/customerService";
import { getOrders } from "@/services/orderService";

const AnalyticsPage = () => {
  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getInventoryItems(0, 100),
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers({ skip: 0, limit: 100 }),
  });

  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(0, 100),
  });

  // Calculate monthly data based on inventory, customers and orders
  const currentMonth = new Date().getMonth();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12;
    const monthDate = new Date();
    monthDate.setMonth(monthDate.getMonth() - i);
    monthDate.setDate(1); // Start of month
    const nextMonth = new Date(monthDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    // Filter orders for this month
    const monthOrders = orders?.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= monthDate && orderDate < nextMonth;
    }) || [];

    const monthlyRevenue = monthOrders.reduce((sum, order) => sum + order.total, 0);
    const monthlyOrderCount = monthOrders.length;

    return {
      month: monthNames[monthIndex],
      sales: monthlyOrderCount,
      revenue: monthlyRevenue,
    };
  }).reverse();

  // Calculate total revenue from orders
  const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0;
  const averageOrderValue = orders && orders.length > 0 ? totalRevenue / orders.length : 0;
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
            <p className="text-xs text-muted-foreground">From {orders?.length || 0} orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageOrderValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">From inventory to customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders?.length || 0}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
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
                    name="Orders"
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
            <CardTitle>Monthly Revenue</CardTitle>
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
                    name="Revenue"
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
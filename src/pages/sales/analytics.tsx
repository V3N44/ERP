import { useQuery } from "@tanstack/react-query";
import { getInventoryItems } from "@/services/inventoryService";
import { getCustomers } from "@/services/customerService";
import { getOrders } from "@/services/orderService";
import { MetricsCards } from "@/components/sales/MetricsCards";
import { TrendCharts } from "@/components/sales/TrendCharts";
import { OrdersTable } from "@/components/sales/OrdersTable";

const AnalyticsPage = () => {
  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getInventoryItems(0, 100),
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers({ skip: 0, limit: 100 }),
  });

  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(0, 100), // Using the pagination parameters
  });

  // Calculate total revenue and metrics
  const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0;
  const orderCount = orders?.length || 0;
  const averageOrderValue = orderCount > 0 ? totalRevenue / orderCount : 0;
  
  // Calculate inventory utilization rate (items sold vs total inventory)
  const inventoryCount = inventory?.length || 0;
  const utilizationRate = inventoryCount > 0 
    ? ((orderCount / inventoryCount) * 100).toFixed(1) 
    : 0;

  // Calculate monthly data
  const currentMonth = new Date().getMonth();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const monthIndex = (currentMonth - i + 12) % 12;
    const monthDate = new Date();
    monthDate.setMonth(monthDate.getMonth() - i);
    monthDate.setDate(1);
    const nextMonth = new Date(monthDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const monthOrders = orders?.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate >= monthDate && orderDate < nextMonth;
    }) || [];

    const monthlyRevenue = monthOrders.reduce((sum, order) => sum + order.total, 0);
    const monthlyOrderCount = monthOrders.length;

    return {
      month: monthNames[monthIndex],
      orders: monthlyOrderCount,
      revenue: monthlyRevenue,
    };
  }).reverse();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Sales Analytics</h1>

      <MetricsCards
        totalRevenue={totalRevenue}
        orderCount={orderCount}
        averageOrderValue={averageOrderValue}
        utilizationRate={utilizationRate}
      />

      <TrendCharts monthlyData={lastSixMonths} />

      <OrdersTable orders={orders} isLoading={isLoadingOrders} />
    </div>
  );
};

export default AnalyticsPage;
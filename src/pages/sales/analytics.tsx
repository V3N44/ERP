import { useQuery } from "@tanstack/react-query";
import { getInventoryItems } from "@/services/inventoryService";
import { getCustomers } from "@/services/customerService";
import { getOrders } from "@/services/orderService";
import { MetricsCards } from "@/components/sales/MetricsCards";
import { TrendCharts } from "@/components/sales/TrendCharts";
import { OrdersTable } from "@/components/sales/OrdersTable";
import { OrdersUpdate } from "@/components/sales/OrdersUpdate";
import { useToast } from "@/hooks/use-toast";
import { buildUrl } from "@/config/api";

const AnalyticsPage = () => {
  const { toast } = useToast();

  const { data: inventory } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => getInventoryItems(0, 100),
  });

  const { data: customers } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getCustomers({ skip: 0, limit: 100 }),
  });

  const { data: orders, isLoading: isLoadingOrders, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(0, 100),
  });

  // Calculate total revenue and metrics
  const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0;
  const orderCount = orders?.length || 0;
  const averageOrderValue = orderCount > 0 ? totalRevenue / orderCount : 0;
  
  const inventoryCount = inventory?.length || 0;
  const utilizationRate = inventoryCount > 0 
    ? ((orderCount / inventoryCount) * 100).toFixed(1) 
    : 0;

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

  const handleDeleteOrder = async (orderId: number) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(buildUrl(`/orders/${orderId}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete order: ${response.statusText}`);
      }

      await refetch(); // Refresh the orders data
      toast({
        title: "Success",
        description: "Order deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting order:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete order",
        variant: "destructive",
      });
    }
  };

  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch(buildUrl(`/orders/${orderId}`), {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update order status: ${response.statusText}`);
      }

      await refetch(); // Refresh the orders data
      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Sales Analytics</h1>

      <MetricsCards
        totalRevenue={totalRevenue}
        orderCount={orderCount}
        averageOrderValue={averageOrderValue}
        utilizationRate={utilizationRate}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <TrendCharts monthlyData={lastSixMonths} />
        {orders && (
          <OrdersUpdate 
            orders={orders} 
            onDeleteOrder={handleDeleteOrder}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>

      <OrdersTable orders={orders} isLoading={isLoadingOrders} />
    </div>
  );
};

export default AnalyticsPage;
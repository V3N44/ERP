import { useState } from "react";
import { SalesManagement } from "@/components/SalesManagement";
import { OrdersTable } from "@/components/sales/OrdersTable";
import { createOrder, OrderData, getOrders } from "@/services/orderService";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

const SalesOrdersPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(0, 100),
  });

  const handleCreateOrder = async (orderData: OrderData) => {
    try {
      setIsSubmitting(true);
      const response = await createOrder(orderData);
      toast({
        title: "Success",
        description: "Order created successfully",
      });
      console.log('Order created:', response);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create order",
      });
      console.error('Error creating order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Sales Orders</h1>
      <SalesManagement onSubmit={handleCreateOrder} isSubmitting={isSubmitting} />
      <div className="mt-8">
        <OrdersTable orders={orders} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SalesOrdersPage;
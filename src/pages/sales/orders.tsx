import { useState } from "react";
import { SalesManagement } from "@/components/SalesManagement";
import { createOrder, OrderData } from "@/services/orderService";
import { useToast } from "@/hooks/use-toast";

const SalesOrdersPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Sales Orders</h1>
      <SalesManagement onSubmit={handleCreateOrder} isSubmitting={isSubmitting} />
    </div>
  );
};

export default SalesOrdersPage;
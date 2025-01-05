import { useState } from "react";
import { SalesManagement } from "@/components/SalesManagement";
import { OrderData, createOrder } from "@/services/orderService";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateOrder = async (orderData: OrderData) => {
    try {
      setIsSubmitting(true);
      await createOrder(orderData);
      toast({
        title: "Success",
        description: "Order created successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create order",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <SalesManagement onSubmit={handleCreateOrder} isSubmitting={isSubmitting} />
    </div>
  );
}

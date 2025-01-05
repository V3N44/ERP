import { useState } from "react";
import { SalesManagement } from "@/components/SalesManagement";
import { OrderData } from "@/services/orderService";

const DashboardPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: OrderData) => {
    setIsSubmitting(true);
    try {
      // Handle the submission logic here
      console.log('Order submitted:', data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <SalesManagement 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default DashboardPage;
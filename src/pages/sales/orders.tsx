import { SalesManagement } from "@/components/SalesManagement";

const SalesOrdersPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Sales Orders</h1>
      <SalesManagement />
    </div>
  );
};

export default SalesOrdersPage;
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesManagement } from "@/components/SalesManagement";

const SalesPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Sales Management</h1>
      
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <SalesManagement />
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="text-center text-gray-500">
            Analytics section coming soon
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="text-center text-gray-500">
            Reports section coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesPage;
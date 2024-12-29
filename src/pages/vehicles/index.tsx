import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleInventory } from "@/components/VehicleInventory";

const VehiclesPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Vehicle Management</h1>
      
      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inventory">
          <VehicleInventory />
        </TabsContent>
        
        <TabsContent value="maintenance">
          <div className="text-center text-gray-500">
            Maintenance section coming soon
          </div>
        </TabsContent>
        
        <TabsContent value="documents">
          <div className="text-center text-gray-500">
            Documents section coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VehiclesPage;
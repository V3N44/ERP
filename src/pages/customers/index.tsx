import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomerSection } from "@/components/dashboard/CustomerSection";

const CustomersPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Customer Management</h1>
      
      <Tabs defaultValue="database" className="space-y-4">
        <TabsList>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="new">New Lead</TabsTrigger>
          <TabsTrigger value="follow-ups">Follow-ups</TabsTrigger>
        </TabsList>
        
        <TabsContent value="database">
          <CustomerSection />
        </TabsContent>
        
        <TabsContent value="new">
          <div className="text-center text-gray-500">
            New Lead section coming soon
          </div>
        </TabsContent>
        
        <TabsContent value="follow-ups">
          <div className="text-center text-gray-500">
            Follow-ups section coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomersPage;
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Administration</h1>
      
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <div className="text-center text-gray-500">
            Users management coming soon
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="text-center text-gray-500">
            Settings section coming soon
          </div>
        </TabsContent>
        
        <TabsContent value="reports">
          <div className="text-center text-gray-500">
            Reports section coming soon
          </div>
        </TabsContent>
        
        <TabsContent value="logs">
          <div className="text-center text-gray-500">
            System logs coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NotificationsPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Notifications</h1>
      
      <Tabs defaultValue="messages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="mail">Mail</TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages">
          <div className="text-center text-gray-500">
            Messages section coming soon
          </div>
        </TabsContent>
        
        <TabsContent value="calendar">
          <div className="text-center text-gray-500">
            Calendar section coming soon
          </div>
        </TabsContent>
        
        <TabsContent value="mail">
          <div className="text-center text-gray-500">
            Mail section coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationsPage;
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SupportPage = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Help & Support</h1>
      
      <Tabs defaultValue="docs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="docs">
          <div className="text-center text-gray-500">
            Documentation section coming soon
          </div>
        </TabsContent>
        
        <TabsContent value="contact">
          <div className="text-center text-gray-500">
            Contact section coming soon
          </div>
        </TabsContent>
        
        <TabsContent value="faqs">
          <div className="text-center text-gray-500">
            FAQs section coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportPage;
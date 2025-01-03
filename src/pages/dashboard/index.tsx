import { DashboardMetrics } from "@/components/DashboardMetrics";
import { DashboardCharts } from "@/components/DashboardCharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleInventory } from "@/components/VehicleInventory";
import { SalesManagement } from "@/components/SalesManagement";
import { Button } from "@/components/ui/button";
import { Users, PhoneCall, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomerSection } from "@/components/dashboard/CustomerSection";
import { ServiceSection } from "@/components/dashboard/ServiceSection";
import { FinanceSection } from "@/components/dashboard/FinanceSection";
import { AccountingSection } from "@/components/dashboard/AccountingSection";
import { FinancialGoals } from "@/components/dashboard/FinancialGoals";
import { useAuth } from "@/contexts/AuthContext";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAccountingUser = user?.role === "accounting" || user?.role === "admin";

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate("/service")}
          >
            <PhoneCall className="h-4 w-4" />
            Service Center
          </Button>
          <h1 className="text-2xl font-bold text-purple-900">Dashboard</h1>
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate("/customers/database")}
          >
            <Users className="h-4 w-4" />
            Customer Relations
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate("/finance")}
          >
            <DollarSign className="h-4 w-4" />
            Finance
          </Button>
        </div>
      </div>
      
      <DashboardMetrics />
      <DashboardCharts />
      <FinancialGoals />

      <Tabs defaultValue="service" className="space-y-4">
        <TabsList className="bg-white/50 backdrop-blur-sm">
          <TabsTrigger value="service">Service Center</TabsTrigger>
          <TabsTrigger value="inventory">Vehicle Inventory</TabsTrigger>
          <TabsTrigger value="sales">Sales Management</TabsTrigger>
          <TabsTrigger value="customers">Customer Relations</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          {isAccountingUser && <TabsTrigger value="accounting">Accounting</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="service" className="space-y-4">
          <ServiceSection />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <VehicleInventory />
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-4">
          <SalesManagement />
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <CustomerSection />
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <FinanceSection />
        </TabsContent>

        {isAccountingUser && (
          <TabsContent value="accounting" className="space-y-4">
            <AccountingSection />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default DashboardPage;
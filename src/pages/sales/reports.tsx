import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/services/orderService";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const ReportsPage = () => {
  const { toast } = useToast();
  
  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => getOrders(0, 100),
  });

  const generateMonthlySalesSummary = () => {
    if (!orders || orders.length === 0) {
      toast({
        title: "No data available",
        description: "There are no sales records to generate a report.",
        variant: "destructive",
      });
      return;
    }

    // Group orders by month
    const monthlyOrders = orders.reduce((acc, order) => {
      const monthYear = format(new Date(order.date), 'MMMM yyyy');
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(order);
      return acc;
    }, {});

    // Generate report content
    let reportContent = "Monthly Sales Summary Report\n\n";
    
    Object.entries(monthlyOrders).forEach(([monthYear, monthOrders]) => {
      const totalSales = monthOrders.reduce((sum, order) => sum + order.total, 0);
      const completedOrders = monthOrders.filter(order => order.status === "Completed").length;
      const pendingOrders = monthOrders.filter(order => order.status === "Pending").length;
      
      reportContent += `\n${monthYear}\n`;
      reportContent += "------------------------\n";
      reportContent += `Total Orders: ${monthOrders.length}\n`;
      reportContent += `Completed Orders: ${completedOrders}\n`;
      reportContent += `Pending Orders: ${pendingOrders}\n`;
      reportContent += `Total Sales: $${totalSales.toLocaleString()}\n`;
      reportContent += "\nOrder Details:\n";
      
      monthOrders.forEach(order => {
        reportContent += `\nOrder ID: ${order.id}\n`;
        reportContent += `Date: ${format(new Date(order.date), 'PP')}\n`;
        reportContent += `Status: ${order.status}\n`;
        reportContent += `Total Amount: $${order.total.toLocaleString()}\n`;
        reportContent += "Items:\n";
        order.items?.forEach(item => {
          reportContent += `  - ${item.item_name}: ${item.quantity} x $${item.price} = $${item.total}\n`;
        });
        reportContent += "------------------------\n";
      });
    });

    // Create and download the file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `sales_summary_${format(new Date(), 'MMM_yyyy')}.txt`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Report Generated",
      description: "Monthly sales summary has been downloaded successfully.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-900">Sales Reports</h1>
        <div className="space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={generateMonthlySalesSummary}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Monthly Summary
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Monthly Sales Summary", date: format(new Date(), 'MMMM yyyy'), size: "Generated on download" },
                { title: "Quarterly Performance Report", date: `Q${Math.floor((new Date().getMonth() + 3) / 3)} ${new Date().getFullYear()}`, size: "Coming soon" },
                { title: "Annual Revenue Analysis", date: new Date().getFullYear().toString(), size: "Coming soon" },
                { title: "Customer Demographics Report", date: format(new Date(), 'MMMM yyyy'), size: "Coming soon" },
                { title: "Vehicle Sales Distribution", date: format(new Date(), 'MMMM yyyy'), size: "Coming soon" }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">Generated: {report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">{report.size}</span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={index === 0 ? generateMonthlySalesSummary : undefined}
                      disabled={index !== 0}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
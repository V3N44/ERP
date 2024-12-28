import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin } from "lucide-react";

const TrackingPage = () => {
  // This is a placeholder. In a real application, this would be fetched from an API
  const shipments = [
    { 
      id: "SHP001", 
      destination: "Los Angeles, CA", 
      status: "In Transit",
      eta: "2024-03-15",
      carrier: "FedEx"
    },
    { 
      id: "SHP002", 
      destination: "Miami, FL", 
      status: "Delivered",
      eta: "2024-03-10",
      carrier: "UPS"
    },
    { 
      id: "SHP003", 
      destination: "Chicago, IL", 
      status: "Processing",
      eta: "2024-03-20",
      carrier: "DHL"
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Shipment Tracking</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Truck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Destinations</CardTitle>
            <MapPin className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Carrier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>
                    <Badge variant={
                      shipment.status === "Delivered" ? "default" :
                      shipment.status === "In Transit" ? "secondary" : "outline"
                    }>
                      {shipment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{shipment.eta}</TableCell>
                  <TableCell>{shipment.carrier}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackingPage;
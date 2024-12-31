import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShipmentUpdateForm } from "@/components/shipping/ShipmentUpdateForm";
import { useQuery } from "@tanstack/react-query";
import { getShippingOrders } from "@/services/shippingService";
import { format } from "date-fns";

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchedShipment, setSearchedShipment] = useState<any>(null);
  const { toast } = useToast();

  // Fetch all shipping orders
  const { data: shipments = [] } = useQuery({
    queryKey: ['shipping-orders'],
    queryFn: getShippingOrders,
  });

  const handleTrackingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a tracking number",
      });
      return;
    }

    // Find shipment by stock number (which is our tracking number)
    const foundShipment = shipments.find(s => s.stock_number === trackingNumber);
    if (foundShipment) {
      setSearchedShipment(foundShipment);
      toast({
        title: "Success",
        description: "Shipment found",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Not Found",
        description: "No shipment found with this tracking number",
      });
      setSearchedShipment(null);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900 dark:text-white">Shipment Tracking</h1>
      
      {/* Tracking Number Input Section */}
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Search className="h-5 w-5" />
            Track Your Shipment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTrackingSearch} className="flex gap-4">
            <Input
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Track
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Searched Shipment Details */}
      {searchedShipment && (
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Shipment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Tracking Number</p>
                <p className="text-lg">{searchedShipment.stock_number}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge variant={searchedShipment.status === "Delivered" ? "success" : "warning"}>
                  {searchedShipment.status || 'Pending'}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Destination Country</p>
                <p className="text-lg">{searchedShipment.country || '-'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Estimated Delivery Date</p>
                <p className="text-lg">
                  {searchedShipment.etd ? format(new Date(searchedShipment.etd), 'PPP') : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Shipping Cost</p>
                <p className="text-lg">{formatCurrency(searchedShipment.shipping_cost || 0)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Insurance</p>
                <p className="text-lg">{formatCurrency(searchedShipment.insurance || 0)}</p>
              </div>
              {searchedShipment.freight_forwarder && (
                <div className="col-span-2">
                  <p className="text-sm font-medium">Freight Forwarder</p>
                  <p className="text-lg">{searchedShipment.freight_forwarder.name || '-'}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Shipment Update Form */}
      <ShipmentUpdateForm />

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
            <Truck className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{shipments.filter(s => s.status !== 'Delivered').length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Destinations</CardTitle>
            <MapPin className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(shipments.map(s => s.country)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Shipments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking Number</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Estimated Delivery</TableHead>
                <TableHead>Shipping Cost</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>{shipment.stock_number}</TableCell>
                  <TableCell>{shipment.country}</TableCell>
                  <TableCell>
                    <Badge variant={shipment.status === "Delivered" ? "success" : "warning"}>
                      {shipment.status || 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {shipment.etd ? format(new Date(shipment.etd), 'PPP') : '-'}
                  </TableCell>
                  <TableCell>{formatCurrency(shipment.shipping_cost || 0)}</TableCell>
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
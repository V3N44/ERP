import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Truck, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ShipmentUpdateForm } from "@/components/shipping/ShipmentUpdateForm";

const TrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchedShipment, setSearchedShipment] = useState<any>(null);
  const { toast } = useToast();

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

    // Simulate finding a shipment (replace with actual API call)
    const foundShipment = shipments.find(s => s.trackingNumber === trackingNumber);
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
    }
  };

  // This is a placeholder. In a real application, this would be fetched from an API
  const shipments = [
    { 
      trackingNumber: "SHP001",
      origin: "Tokyo, Japan",
      destination: "Dubai, UAE",
      status: "In Transit",
      currentLocation: "Singapore",
      estimatedDelivery: "2024-03-15",
    },
    { 
      trackingNumber: "SHP002",
      origin: "Shanghai, China",
      destination: "Riyadh, KSA",
      status: "Delivered",
      currentLocation: "Riyadh",
      estimatedDelivery: "2024-03-10",
    },
  ];

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
                <p className="text-lg">{searchedShipment.trackingNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge variant={searchedShipment.status === "Delivered" ? "success" : "warning"}>
                  {searchedShipment.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Current Location</p>
                <p className="text-lg">{searchedShipment.currentLocation}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Estimated Delivery</p>
                <p className="text-lg">{searchedShipment.estimatedDelivery}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Origin</p>
                <p className="text-lg">{searchedShipment.origin}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Destination</p>
                <p className="text-lg">{searchedShipment.destination}</p>
              </div>
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

      {/* Shipments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking Number</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Location</TableHead>
                <TableHead>Estimated Delivery</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.trackingNumber}>
                  <TableCell>{shipment.trackingNumber}</TableCell>
                  <TableCell>{shipment.origin}</TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>
                    <Badge variant={shipment.status === "Delivered" ? "success" : "warning"}>
                      {shipment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{shipment.currentLocation}</TableCell>
                  <TableCell>{shipment.estimatedDelivery}</TableCell>
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
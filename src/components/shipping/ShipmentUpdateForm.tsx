import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/config";

export const ShipmentUpdateForm = () => {
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [country, setCountry] = useState("");
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [insurance, setInsurance] = useState<number>(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleUpdateShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber || !location || !status || !country) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    try {
      const updateData = {
        stock_number: trackingNumber,
        current_location: location,
        status: status,
        country: country,
        shipping_cost: shippingCost,
        insurance: insurance
      };

      console.log('Updating shipment status with:', updateData);

      // Update shipment status
      const updateResponse = await fetch(`${API_URL}/shipments/${trackingNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.detail || 'Failed to update shipment status');
      }

      // Create shipment location history
      const locationResponse = await fetch(`${API_URL}/shipment_locations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          shipment_id: trackingNumber,
          location: location,
          date: new Date().toISOString(),
          status: status
        }),
      });

      if (!locationResponse.ok) {
        const errorData = await locationResponse.json();
        throw new Error(errorData.detail || 'Failed to create location history');
      }

      // Invalidate and refetch queries
      await queryClient.invalidateQueries({ queryKey: ['shipping-orders'] });
      await queryClient.invalidateQueries({ queryKey: ['shipment-locations'] });

      toast({
        title: "Success",
        description: "Shipment details and location updated successfully",
      });

      // Reset form
      setTrackingNumber("");
      setLocation("");
      setStatus("");
      setCountry("");
      setShippingCost(0);
      setInsurance(0);
    } catch (error) {
      console.error('Error updating shipment:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update shipment details",
      });
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Update Shipment Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleUpdateShipment} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tracking Number</label>
            <Input
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Location</label>
            <Input
              placeholder="Enter current location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <Input
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Shipping Cost</label>
            <Input
              type="number"
              placeholder="Enter shipping cost"
              value={shippingCost}
              onChange={(e) => setShippingCost(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Insurance</label>
            <Input
              type="number"
              placeholder="Enter insurance amount"
              value={insurance}
              onChange={(e) => setInsurance(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select onValueChange={setStatus} value={status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Update Shipment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
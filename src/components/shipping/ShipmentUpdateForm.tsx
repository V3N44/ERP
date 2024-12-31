import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";

export const ShipmentUpdateForm = () => {
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const { toast } = useToast();

  const handleUpdateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !status) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    // Here you would typically make an API call to update the shipment
    toast({
      title: "Success",
      description: "Shipment details updated successfully",
    });
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
            <label className="text-sm font-medium">Current Location</label>
            <Input
              placeholder="Enter current location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
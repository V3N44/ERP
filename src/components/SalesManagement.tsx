import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { VehicleSelectionModal } from "./sales/VehicleSelectionModal";
import { Search } from "lucide-react";
import { SelectedVehicleDisplay } from "./sales/SelectedVehicleDisplay";

export const SalesManagement = () => {
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<unknown>(null);

  const handleVehicleSelect = (vehicle: unknown) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>New Sales Order</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-purple-700">Customer Information</h3>
                
                {/* Personal Information */}
                <div className="space-y-2">
                  <Label htmlFor="customerName">Full Name</Label>
                  <Input id="customerName" placeholder="Full Name" className="bg-white" />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation</Label>
                    <Input id="occupation" placeholder="Occupation" className="bg-white" />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Email Address" className="bg-white" />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Primary Phone</Label>
                    <Input id="phone" placeholder="Primary Phone" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="alternatePhone">Alternate Phone</Label>
                    <Input id="alternatePhone" placeholder="Alternate Phone" className="bg-white" />
                  </div>
                </div>
                
                {/* Address Information */}
                <div className="space-y-2">
                  <Label htmlFor="streetAddress">Street Address</Label>
                  <Input id="streetAddress" placeholder="Street Address" className="bg-white" />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input id="state" placeholder="State/Province" className="bg-white" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" placeholder="Postal Code" className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="Country" className="bg-white" />
                  </div>
                </div>

                {/* Identification */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="idType">ID Type</Label>
                    <select id="idType" className="w-full rounded-md border border-input bg-white px-3 py-2">
                      <option value="">Select ID Type</option>
                      <option value="passport">Passport</option>
                      <option value="driverLicense">Driver's License</option>
                      <option value="nationalId">National ID</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input id="idNumber" placeholder="ID Number" className="bg-white" />
                  </div>
                </div>
              </div>

              {/* Vehicle & Payment Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-purple-700">Vehicle & Payment Details</h3>
                
                {/* Vehicle Selection Section */}
                <div className="space-y-2">
                  <Label>Vehicle Selection</Label>
                  {selectedVehicle ? (
                    <SelectedVehicleDisplay
                      vehicle={selectedVehicle}
                      onChangeVehicle={() => setShowVehicleModal(true)}
                    />
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowVehicleModal(true)}
                    >
                      <Search className="mr-2 h-4 w-4" />
                      Select Vehicle from Inventory
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <select id="paymentMethod" className="w-full rounded-md border border-input bg-white px-3 py-2">
                    <option>Cash</option>
                    <option>Finance</option>
                    <option>Lease</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Any special requirements or notes" className="bg-white" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                disabled={!selectedVehicle}
              >
                Create Sales Order
              </Button>
            </div>
          </form>
        </ScrollArea>

        <VehicleSelectionModal
          open={showVehicleModal}
          onClose={() => setShowVehicleModal(false)}
          onSelect={handleVehicleSelect}
        />
      </CardContent>
    </Card>
  );
};

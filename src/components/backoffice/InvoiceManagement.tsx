import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, FileText, Download, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VehicleSelectionModal } from "../sales/VehicleSelectionModal";

export const InvoiceManagement = () => {
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const handleVehicleSelect = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setShowVehicleModal(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Invoice Management</h2>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Invoices</CardTitle>
            <Dialog open={showNewInvoice} onOpenChange={setShowNewInvoice}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Invoice
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Invoice</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="invoiceType">Invoice Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="proforma">Pro-forma Invoice</SelectItem>
                          <SelectItem value="general">General Invoice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client">Client</Label>
                      <Input id="client" placeholder="Select client" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Vehicle Details</Label>
                    {selectedVehicle ? (
                      <div className="p-4 border rounded-lg bg-white/50 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{selectedVehicle.make} {selectedVehicle.model}</h4>
                            <p className="text-sm text-gray-600">Stock No: {selectedVehicle.stockNo}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setShowVehicleModal(true)}
                          >
                            Change Vehicle
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <div>Year: {selectedVehicle.year}</div>
                          <div>Color: {selectedVehicle.color}</div>
                          <div>VIN: {selectedVehicle.vin}</div>
                          <div className="font-semibold text-purple-700">
                            Price: ${selectedVehicle.price?.toLocaleString()}
                          </div>
                        </div>
                      </div>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="auctionCharges">Auction Charges</Label>
                      <Input id="auctionCharges" type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="transportFees">Transport Fees</Label>
                      <Input id="transportFees" type="number" placeholder="0.00" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customCharges">Custom Charges</Label>
                      <Input id="customCharges" type="number" placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="otherFees">Other Fees</Label>
                      <Input id="otherFees" type="number" placeholder="0.00" />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowNewInvoice(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Create Invoice
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((invoice) => (
                <div
                  key={invoice}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-medium">Invoice #{invoice}</h3>
                      <p className="text-sm text-gray-500">Client Name {invoice}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <VehicleSelectionModal
        open={showVehicleModal}
        onClose={() => setShowVehicleModal(false)}
        onSelect={handleVehicleSelect}
      />
    </div>
  );
};
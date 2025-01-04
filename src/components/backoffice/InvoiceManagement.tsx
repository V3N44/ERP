import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, FileText, Download, Search, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VehicleSelectionModal } from "../sales/VehicleSelectionModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvoice } from "@/services/invoiceService";
import { useToast } from "@/hooks/use-toast";

export const InvoiceManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [formData, setFormData] = useState({
    customer_id: "",
    name: "",
    amount: "",
    status: "Unpaid" as const,
  });

  const createInvoiceMutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Success",
        description: "Invoice created successfully",
      });
      setShowNewInvoice(false);
      setFormData({
        customer_id: "",
        name: "",
        amount: "",
        status: "Unpaid",
      });
      setSelectedVehicle(null);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleVehicleSelect = (vehicle: any) => {
    setSelectedVehicle(vehicle);
    setShowVehicleModal(false);
    // Update form amount with vehicle price
    if (vehicle.price) {
      setFormData(prev => ({
        ...prev,
        amount: vehicle.price.toString(),
        name: `Invoice for ${vehicle.make} ${vehicle.model} (${vehicle.stockNo})`
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a vehicle",
      });
      return;
    }

    createInvoiceMutation.mutate({
      customer_id: parseInt(formData.customer_id),
      name: formData.name,
      date: new Date().toISOString(),
      amount: parseFloat(formData.amount),
      status: formData.status,
    });
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer_id">Customer ID</Label>
                      <Input
                        id="customer_id"
                        value={formData.customer_id}
                        onChange={(e) => setFormData(prev => ({ ...prev, customer_id: e.target.value }))}
                        placeholder="Enter customer ID"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Invoice Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter invoice name"
                        required
                      />
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

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowNewInvoice(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-purple-600 hover:bg-purple-700"
                      disabled={createInvoiceMutation.isPending}
                    >
                      {createInvoiceMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Create Invoice"
                      )}
                    </Button>
                  </div>
                </form>
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
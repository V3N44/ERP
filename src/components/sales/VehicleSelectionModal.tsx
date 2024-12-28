import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getInventoryItems, type InventoryItem } from "@/services/inventoryService";

interface VehicleSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (vehicle: any) => void;
}

export const VehicleSelectionModal = ({ open, onClose, onSelect }: VehicleSelectionModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: vehicles = [], isLoading } = useQuery<InventoryItem[]>({
    queryKey: ['inventory', 0, 100],
    queryFn: () => getInventoryItems(0, 100),
    enabled: open, // Only fetch when modal is open
  });

  const filteredVehicles = vehicles.filter(vehicle =>
    Object.values({
      make: vehicle.make,
      model: vehicle.model,
      stock_no: vehicle.stock_no,
      colour: vehicle.colour,
      registration_year: vehicle.registration_year,
    }).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Loading inventory...</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Select Vehicle from Inventory</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search inventory..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-auto max-h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stock No.</TableHead>
                <TableHead>Make</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>VIN</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVehicles.map((vehicle) => (
                <TableRow 
                  key={vehicle.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    onSelect({
                      stockNo: vehicle.stock_no,
                      make: vehicle.make,
                      model: vehicle.model,
                      year: vehicle.registration_year,
                      color: vehicle.colour,
                      price: vehicle.price,
                      vin: vehicle.chassis_number,
                      image_url: vehicle.image_url
                    });
                    onClose();
                  }}
                >
                  <TableCell>{vehicle.stock_no}</TableCell>
                  <TableCell>{vehicle.make}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.registration_year}</TableCell>
                  <TableCell>{vehicle.colour}</TableCell>
                  <TableCell>${vehicle.price?.toLocaleString()}</TableCell>
                  <TableCell className="font-mono">{vehicle.chassis_number}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
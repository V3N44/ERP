import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";

interface MaintenanceFormProps {
  onSubmit: (data: MaintenanceFormData) => void;
}

interface MaintenanceFormData {
  vehicleId: string;
  type: string;
  date: string;
  status: "scheduled" | "completed" | "overdue";
  notes: string;
}

export const MaintenanceForm = ({ onSubmit }: MaintenanceFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof MaintenanceFormData, string>>>({});
  
  const [formData, setFormData] = useState<MaintenanceFormData>({
    vehicleId: "",
    type: "",
    date: "",
    status: "scheduled",
    notes: "",
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof MaintenanceFormData, string>> = {};

    if (!formData.vehicleId) {
      newErrors.vehicleId = "Please select a vehicle";
    }

    if (!formData.type) {
      newErrors.type = "Please select maintenance type";
    }

    if (!formData.date) {
      newErrors.date = "Please select a date";
    }

    if (formData.notes.length < 10) {
      newErrors.notes = "Notes should be at least 10 characters";
    } else if (formData.notes.length > 500) {
      newErrors.notes = "Notes should not exceed 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setIsOpen(false);
      setFormData({
        vehicleId: "",
        type: "",
        date: "",
        status: "scheduled",
        notes: "",
      });
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Maintenance Record
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Add New Maintenance Record</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] px-1">
          <div className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Vehicle ID</Label>
                <Select
                  value={formData.vehicleId}
                  onValueChange={(value) => {
                    setFormData({ ...formData, vehicleId: value });
                    setErrors({ ...errors, vehicleId: undefined });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VH001">VH001 - Toyota Camry</SelectItem>
                    <SelectItem value="VH002">VH002 - Honda Civic</SelectItem>
                    <SelectItem value="VH003">VH003 - Ford F-150</SelectItem>
                  </SelectContent>
                </Select>
                {errors.vehicleId && (
                  <p className="text-sm text-red-500">{errors.vehicleId}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Maintenance Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => {
                    setFormData({ ...formData, type: value });
                    setErrors({ ...errors, type: undefined });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oil_change">Oil Change</SelectItem>
                    <SelectItem value="tire_rotation">Tire Rotation</SelectItem>
                    <SelectItem value="brake_service">Brake Service</SelectItem>
                    <SelectItem value="inspection">General Inspection</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && (
                  <p className="text-sm text-red-500">{errors.type}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => {
                    setFormData({ ...formData, date: e.target.value });
                    setErrors({ ...errors, date: undefined });
                  }}
                />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "scheduled" | "completed" | "overdue") => {
                    setFormData({ ...formData, status: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  value={formData.notes}
                  placeholder="Enter maintenance notes..."
                  className="h-32"
                  onChange={(e) => {
                    setFormData({ ...formData, notes: e.target.value });
                    setErrors({ ...errors, notes: undefined });
                  }}
                />
                {errors.notes && (
                  <p className="text-sm text-red-500">{errors.notes}</p>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button type="submit" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Record
                </Button>
              </div>
            </form>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
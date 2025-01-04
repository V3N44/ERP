import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MaintenanceRecord } from "@/services/maintenanceService";

interface MaintenanceFormFieldsProps {
  formData: Partial<MaintenanceRecord>;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
}

export const MaintenanceFormFields = ({ formData, errors, onChange }: MaintenanceFormFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label>Vehicle ID</Label>
        <Select
          value={formData.inventory_item_id?.toString()}
          onValueChange={(value) => onChange("inventory_item_id", parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Vehicle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">VH001 - Toyota Camry</SelectItem>
            <SelectItem value="2">VH002 - Honda Civic</SelectItem>
            <SelectItem value="3">VH003 - Ford F-150</SelectItem>
          </SelectContent>
        </Select>
        {errors.inventory_item_id && (
          <p className="text-sm text-red-500">{errors.inventory_item_id}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Date</Label>
        <Input
          type="date"
          value={formData.date?.split('T')[0]}
          onChange={(e) => onChange("date", e.target.value)}
        />
        {errors.date && (
          <p className="text-sm text-red-500">{errors.date}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Cost</Label>
        <Input
          type="number"
          value={formData.cost || ''}
          onChange={(e) => onChange("cost", parseFloat(e.target.value))}
          placeholder="Enter maintenance cost"
        />
        {errors.cost && (
          <p className="text-sm text-red-500">{errors.cost}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value: "Pending" | "In Progress" | "Completed") => onChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          placeholder="Enter maintenance description..."
          className="h-32"
          onChange={(e) => onChange("description", e.target.value)}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
      </div>
    </>
  );
};
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createAppointment } from "@/services/appointmentService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getServices } from "@/services/serviceService";
import { useToast } from "@/hooks/use-toast";

export const ServiceAppointments = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    customer_id: 0,
    service_id: 0,
    status: "scheduled" as const,
    notes: "",
  });

  // Fetch services - removed the parameters since getServices doesn't accept any
  const { data: services = [] } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  // Create appointment mutation
  const createAppointmentMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Appointment created successfully",
      });
      setIsOpen(false);
      setFormData({
        date: "",
        customer_id: 0,
        service_id: 0,
        status: "scheduled",
        notes: "",
      });
      // Optionally refresh appointments list if you have one
      // queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const handleInputChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAppointmentMutation.mutate({
      ...formData,
      date: new Date(formData.date).toISOString(),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Service Appointments</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Appointment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="date">
                  Date
                </label>
                <Input
                  id="date"
                  name="date"
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="customer_id">
                  Customer ID
                </label>
                <Input
                  id="customer_id"
                  name="customer_id"
                  type="number"
                  value={formData.customer_id || ""}
                  onChange={(e) => handleInputChange("customer_id", parseInt(e.target.value))}
                  placeholder="Enter customer ID"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="service_id">
                  Service
                </label>
                <Select
                  value={formData.service_id.toString()}
                  onValueChange={(value) => handleInputChange("service_id", parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id.toString()}>
                        {service.service_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="notes">
                  Notes
                </label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Enter appointment notes"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createAppointmentMutation.isPending}
                >
                  {createAppointmentMutation.isPending ? "Creating..." : "Save"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Service Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>2024-03-15</TableCell>
            <TableCell>John Smith</TableCell>
            <TableCell>Oil Change</TableCell>
            <TableCell>
              <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">
                Scheduled
              </span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2024-03-16</TableCell>
            <TableCell>Sarah Johnson</TableCell>
            <TableCell>Brake Service</TableCell>
            <TableCell>
              <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                Confirmed
              </span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
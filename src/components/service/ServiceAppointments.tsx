import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export const ServiceAppointments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    customer: "",
    serviceType: "",
    status: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Added:", formData);
    setIsOpen(false);
    setFormData({ date: "", customer: "", serviceType: "", status: "" });
  };

  return (
    <div className="space-y-4">
      {/* Add Button */}
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
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="customer">
                  Customer
                </label>
                <Input
                  id="customer"
                  name="customer"
                  type="text"
                  value={formData.customer}
                  onChange={handleInputChange}
                  placeholder="Enter customer name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="serviceType">
                  Service Type
                </label>
                <Input
                  id="serviceType"
                  name="serviceType"
                  type="text"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  placeholder="Enter service type"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="status">
                  Status
                </label>
                <Textarea
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  placeholder="Enter status (e.g., Scheduled, Confirmed)"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
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

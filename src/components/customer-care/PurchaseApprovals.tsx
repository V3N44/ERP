import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewPurchaseForm } from "./NewPurchaseForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export const PurchaseApprovals = () => {
  const [open, setOpen] = useState(false);
  const approvals = [
    { id: 1, item: "Vehicle Parts", amount: 5000, status: "pending", requester: "John Doe", date: "2024-02-20" },
    { id: 2, item: "Office Supplies", amount: 1200, status: "approved", requester: "Jane Smith", date: "2024-02-19" },
  ];

  const handleSuccess = () => {
    setOpen(false);
    // Refresh the approvals list here
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Purchase Approvals</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Purchase
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Purchase</DialogTitle>
            </DialogHeader>
            <ScrollArea className="max-h-[80vh]">
              <div className="p-4">
                <NewPurchaseForm onSuccess={handleSuccess} />
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Requester</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {approvals.map((approval) => (
            <TableRow key={approval.id}>
              <TableCell>{approval.item}</TableCell>
              <TableCell>${approval.amount}</TableCell>
              <TableCell>
                <Badge variant={approval.status === 'approved' ? 'success' : 'warning'}>
                  {approval.status}
                </Badge>
              </TableCell>
              <TableCell>{approval.requester}</TableCell>
              <TableCell>{approval.date}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewPurchaseForm } from "./NewPurchaseForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Purchase } from "@/types/purchases";

const fetchPurchases = async (): Promise<Purchase[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/purchases/`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch purchases');
  }
  
  return response.json();
};

const updatePurchaseStatus = async (id: number, status: 'approved' | 'rejected') => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/purchases/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error('Failed to update purchase status');
  }

  return response.json();
};

export const PurchaseApprovals = () => {
  const [open, setOpen] = useState(false);
  
  const { data: purchases = [], refetch } = useQuery({
    queryKey: ['purchases'],
    queryFn: fetchPurchases,
  });

  const handleSuccess = () => {
    setOpen(false);
    refetch();
    toast.success("Purchase created successfully");
  };

  const handleStatusUpdate = async (id: number, status: 'approved' | 'rejected') => {
    try {
      await updatePurchaseStatus(id, status);
      refetch();
      toast.success(`Purchase ${status} successfully`);
    } catch (error) {
      toast.error("Failed to update purchase status");
    }
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
            <TableHead>Date</TableHead>
            <TableHead>Challan No</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell>{new Date(purchase.purchase_date).toLocaleDateString()}</TableCell>
              <TableCell>{purchase.challan_no}</TableCell>
              <TableCell>${purchase.grand_total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={
                  purchase.status === 'approved' ? 'success' : 
                  purchase.status === 'rejected' ? 'destructive' : 
                  'warning'
                }>
                  {purchase.status || 'pending'}
                </Badge>
              </TableCell>
              <TableCell>{purchase.payment_type}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleStatusUpdate(purchase.id!, 'approved')}
                    disabled={purchase.status !== 'pending'}
                  >
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleStatusUpdate(purchase.id!, 'rejected')}
                    disabled={purchase.status !== 'pending'}
                  >
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
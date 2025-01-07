import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewPurchaseForm } from "./NewPurchaseForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Purchase } from "@/types/purchases";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditPurchaseDialog } from "./purchase-form/EditPurchaseDialog";
import { PurchaseTable } from "./purchase-table/PurchaseTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

const deletePurchase = async (id: number) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/purchases/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete purchase');
  }
};

export const PurchaseApprovals = () => {
  const [open, setOpen] = useState(false);
  const [editPurchase, setEditPurchase] = useState<Purchase | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState<number | null>(null);
  
  const queryClient = useQueryClient();
  
  const { data: purchases = [], isLoading } = useQuery({
    queryKey: ['purchases'],
    queryFn: fetchPurchases,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const handleSuccess = () => {
    setOpen(false);
    setEditPurchase(null);
    queryClient.invalidateQueries({ queryKey: ['purchases'] });
    toast.success("Purchase updated successfully");
  };

  const handleStatusUpdate = async (id: number, status: 'approved' | 'rejected') => {
    try {
      // Optimistic update
      queryClient.setQueryData(['purchases'], (old: Purchase[] | undefined) => {
        if (!old) return [];
        return old.map(p => p.id === id ? { ...p, status } : p);
      });

      await updatePurchaseStatus(id, status);
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      toast.success(`Purchase ${status} successfully`);
    } catch (error) {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      toast.error("Failed to update purchase status");
    }
  };

  const handleDelete = async () => {
    if (!selectedPurchaseId) return;
    
    try {
      // Optimistic update
      queryClient.setQueryData(['purchases'], (old: Purchase[] | undefined) => {
        if (!old) return [];
        return old.filter(p => p.id !== selectedPurchaseId);
      });

      await deletePurchase(selectedPurchaseId);
      setDeleteConfirmOpen(false);
      toast.success("Purchase deleted successfully");
    } catch (error) {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      toast.error("Failed to delete purchase");
    }
  };

  const openDeleteConfirm = (id: number) => {
    setSelectedPurchaseId(id);
    setDeleteConfirmOpen(true);
  };

  if (isLoading) {
    return <div className="flex justify-center p-4">Loading purchases...</div>;
  }

  const pendingPurchases = purchases.filter(p => p.status === 'pending');
  const historyPurchases = purchases.filter(p => p.status !== 'pending');

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

      <EditPurchaseDialog
        purchase={editPurchase!}
        open={!!editPurchase}
        onOpenChange={(open) => !open && setEditPurchase(null)}
        onSuccess={handleSuccess}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the purchase.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Approvals</TabsTrigger>
          <TabsTrigger value="history">Purchase History</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <PurchaseTable
            purchases={pendingPurchases}
            onStatusUpdate={handleStatusUpdate}
            onEdit={setEditPurchase}
            onDelete={openDeleteConfirm}
          />
        </TabsContent>

        <TabsContent value="history">
          <ScrollArea className="h-[500px]">
            <PurchaseTable
              purchases={historyPurchases}
              onStatusUpdate={handleStatusUpdate}
              onEdit={setEditPurchase}
              onDelete={openDeleteConfirm}
            />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
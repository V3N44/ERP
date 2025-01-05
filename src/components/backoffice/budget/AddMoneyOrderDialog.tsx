import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AddMoneyOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  remainingBudget: number;
  onBudgetUpdate: (newBudget: number) => void;
}

export function AddMoneyOrderDialog({
  open,
  onOpenChange,
  remainingBudget,
  onBudgetUpdate,
}: AddMoneyOrderDialogProps) {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderAmount = Number(amount);
    
    if (orderAmount > remainingBudget) {
      toast({
        variant: "destructive",
        title: "Budget Exceeded",
        description: `This order exceeds the remaining budget of $${remainingBudget}`,
      });
      return;
    }

    // Update remaining budget
    onBudgetUpdate(remainingBudget - orderAmount);
    
    // Reset form
    setAmount("");
    setReason("");
    
    // Close dialog
    onOpenChange(false);
    
    toast({
      title: "Money Order Created",
      description: "Your money order has been submitted for approval",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Money Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for money order"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create Order</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
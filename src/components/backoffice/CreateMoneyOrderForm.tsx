import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/config/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface CreateMoneyOrderFormProps {
  budgetId: number;
}

export const CreateMoneyOrderForm = ({ budgetId }: CreateMoneyOrderFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<{ reason?: string; amount?: string }>({});

  // Fetch money orders for the current budget
  const { data: moneyOrders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["moneyOrders", budgetId],
    queryFn: async () => {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${api.baseURL}/money-orders/${budgetId}`, {
        headers: {
          ...api.headers,
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch money orders');
      }
      return response.json();
    },
  });

  const createMoneyOrder = async (data: {
    monthly_budget_id: number;
    reason: string;
    amount: number;
  }) => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${api.baseURL}/money-orders/`, {
      method: "POST",
      headers: {
        ...api.headers,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to create money order");
    }

    return response.json();
  };

  const mutation = useMutation({
    mutationFn: createMoneyOrder,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Money order created successfully",
      });
      setReason("");
      setAmount("");
      setErrors({});
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
      queryClient.invalidateQueries({ queryKey: ["moneyOrders", budgetId] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    },
  });

  const validateForm = () => {
    const newErrors: { reason?: string; amount?: string } = {};
    let isValid = true;

    if (!reason.trim()) {
      newErrors.reason = "Reason is required";
      isValid = false;
    }

    const amountNumber = parseFloat(amount);
    if (!amount || isNaN(amountNumber)) {
      newErrors.amount = "Please enter a valid amount";
      isValid = false;
    } else if (amountNumber <= 0) {
      newErrors.amount = "Amount must be greater than 0";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      toast({
        title: "Warning",
        description: "Please check the form for errors",
        variant: "destructive",
      });
      return;
    }

    const amountNumber = parseFloat(amount);
    mutation.mutate({
      monthly_budget_id: budgetId,
      reason,
      amount: amountNumber,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="reason">Reason</Label>
          <Input
            id="reason"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setErrors((prev) => ({ ...prev, reason: undefined }));
            }}
            placeholder="Enter reason for money order"
            className={errors.reason ? "border-red-500" : ""}
          />
          {errors.reason && (
            <p className="text-sm text-red-500 mt-1">{errors.reason}</p>
          )}
        </div>
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setErrors((prev) => ({ ...prev, amount: undefined }));
            }}
            placeholder="Enter amount"
            min="0"
            step="0.01"
            className={errors.amount ? "border-red-500" : ""}
          />
          {errors.amount && (
            <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Money Order"
          )}
        </Button>
      </form>

      <div className="rounded-md border">
        <h2 className="text-lg font-semibold p-4 border-b">Money Orders</h2>
        {isLoadingOrders ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reason</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {moneyOrders?.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell>{order.reason}</TableCell>
                  <TableCell>${order.amount.toLocaleString()}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {format(new Date(order.created_at), "PPP")}
                  </TableCell>
                </TableRow>
              ))}
              {(!moneyOrders || moneyOrders.length === 0) && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    No money orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { API_CONFIG } from "@/config/api";

interface MoneyOrder {
  id: number;
  created_at: string;
  reason: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
}

interface MoneyOrderListProps {
  remainingBudget: number;
  onBudgetUpdate: (newBudget: number) => void;
  monthlyBudgetId: number;
  shouldRefresh: boolean;
}

export function MoneyOrderList({ remainingBudget, onBudgetUpdate, monthlyBudgetId, shouldRefresh }: MoneyOrderListProps) {
  const [orders, setOrders] = useState<MoneyOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/money-orders/?monthly_budget_id=${monthlyBudgetId}`, {
        headers: {
          ...API_CONFIG.headers,
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch money orders');
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching money orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (monthlyBudgetId) {
      fetchOrders();
    }
  }, [monthlyBudgetId, shouldRefresh]);

  if (isLoading) {
    return <div className="text-center py-4">Loading money orders...</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No money orders yet
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{format(new Date(order.created_at), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{order.reason}</TableCell>
                <TableCell>${order.amount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "approved" 
                        ? "success" 
                        : order.status === "rejected" 
                        ? "destructive" 
                        : "default"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
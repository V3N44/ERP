import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useState } from "react";

interface MoneyOrder {
  id: string;
  date: Date;
  reason: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
}

interface MoneyOrderListProps {
  remainingBudget: number;
  onBudgetUpdate: (newBudget: number) => void;
}

export function MoneyOrderList({ remainingBudget, onBudgetUpdate }: MoneyOrderListProps) {
  const [orders, setOrders] = useState<MoneyOrder[]>([]);

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
                <TableCell>{format(order.date, 'MMM dd, yyyy')}</TableCell>
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
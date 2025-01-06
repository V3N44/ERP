import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MoneyOrder {
  id: number;
  reason: string;
  amount: number;
  status: string;
  created_at: string;
}

interface MoneyOrdersTableProps {
  moneyOrders?: MoneyOrder[];
  isLoading: boolean;
}

export const MoneyOrdersTable = ({ moneyOrders, isLoading }: MoneyOrdersTableProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
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
        {moneyOrders?.map((order) => (
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
  );
};
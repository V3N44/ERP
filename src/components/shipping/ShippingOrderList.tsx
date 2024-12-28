import { ShippingOrder } from "@/types/shipping";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

interface ShippingOrderListProps {
  orders: ShippingOrder[];
  isLoading: boolean;
}

export const ShippingOrderList = ({ orders, isLoading }: ShippingOrderListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "default";
      case "Pending":
        return "secondary";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">SO Number</TableHead>
            <TableHead className="font-semibold">Stock Number</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Forwarder</TableHead>
            <TableHead className="font-semibold">ETD</TableHead>
            <TableHead className="font-semibold">ETA</TableHead>
            <TableHead className="font-semibold">POL</TableHead>
            <TableHead className="font-semibold">POD</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.soNumber || '-'}</TableCell>
              <TableCell>{order.stockNumber || '-'}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(order.bookingStatus)}>
                  {order.bookingStatus}
                </Badge>
              </TableCell>
              <TableCell>{order.forwarder || '-'}</TableCell>
              <TableCell>{formatDate(order.etd)}</TableCell>
              <TableCell>{formatDate(order.eta)}</TableCell>
              <TableCell>{order.pol || '-'}</TableCell>
              <TableCell>{order.pod || '-'}</TableCell>
            </TableRow>
          ))}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                No shipping orders found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
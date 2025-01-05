import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Order {
  id: number;
  date: string;
  customer_id: number;
  contact_number: string;
  address: string;
  total: number;
  status: string;
  vehicle?: {
    make: string;
    model: string;
    year: number;
    vin: string;
  };
}

interface OrdersTableProps {
  orders: Order[] | undefined;
  isLoading: boolean;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'MMM dd, yyyy');
  } catch {
    return 'Invalid Date';
  }
};

export const OrdersTable = ({ orders, isLoading }: OrdersTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Contact Number</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Vehicle Details</TableHead>
                  <TableHead className="text-right">Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{formatDate(order.date)}</TableCell>
                    <TableCell>{order.customer_id}</TableCell>
                    <TableCell>{order.contact_number}</TableCell>
                    <TableCell>{order.address}</TableCell>
                    <TableCell>
                      {order.vehicle ? (
                        <div className="text-sm">
                          <div>{order.vehicle.make} {order.vehicle.model}</div>
                          <div className="text-gray-500">
                            {order.vehicle.year} | VIN: {order.vehicle.vin}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">No vehicle details</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(order.total)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
                {(!orders || orders.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
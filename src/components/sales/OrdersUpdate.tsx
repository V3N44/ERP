import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrderItem {
  item_name: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: number;
  date: string;
  customer_id: number;
  contact_number: string;
  address: string;
  total: number;
  status: string;
  items: OrderItem[];
}

interface OrdersUpdateProps {
  orders: Order[];
  onDeleteOrder?: (orderId: number) => void;
  onUpdateStatus?: (orderId: number, newStatus: string) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const OrdersUpdate = ({ orders, onDeleteOrder, onUpdateStatus }: OrdersUpdateProps) => {
  const { toast } = useToast();
  
  // Get the 5 most recent orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const handleDelete = (orderId: number) => {
    if (onDeleteOrder) {
      onDeleteOrder(orderId);
      toast({
        title: "Order Deleted",
        description: `Order #${orderId} has been deleted successfully.`,
      });
    }
  };

  const handleStatusChange = (orderId: number, newStatus: string) => {
    if (onUpdateStatus) {
      onUpdateStatus(orderId, newStatus);
      toast({
        title: "Status Updated",
        description: `Order #${orderId} status has been updated to ${newStatus}.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Order Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="space-y-3 border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(order.date), "MMM dd, yyyy")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      defaultValue={order.status}
                      onValueChange={(value) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue>
                          <Badge
                            variant={
                              order.status === "Completed" ? "success" :
                              order.status === "Pending" ? "warning" : "destructive"
                            }
                            className="capitalize"
                          >
                            {order.status}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(order.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-1 bg-gray-50 p-3 rounded-md">
                  <p className="text-sm">
                    <span className="font-medium">Customer ID:</span> {order.customer_id}
                  </p>
                  {order.contact_number && (
                    <p className="text-sm">
                      <span className="font-medium">Contact:</span> {order.contact_number}
                    </p>
                  )}
                  {order.address && (
                    <p className="text-sm">
                      <span className="font-medium">Address:</span> {order.address}
                    </p>
                  )}
                </div>

                {order.items && order.items.length > 0 && (
                  <div className="space-y-2 bg-white border rounded-md p-3">
                    <p className="text-sm font-medium border-b pb-2">Order Items:</p>
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm flex justify-between items-center py-1">
                        <div>
                          <p className="text-gray-700">{item.item_name}</p>
                          <p className="text-gray-500">
                            {item.quantity}x @ {formatCurrency(item.price)}
                          </p>
                        </div>
                        <p className="font-medium">{formatCurrency(item.total)}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end pt-2 border-t">
                  <p className="font-medium text-lg">
                    Total: {formatCurrency(order.total)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
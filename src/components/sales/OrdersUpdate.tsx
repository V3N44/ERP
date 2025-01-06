import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const OrdersUpdate = ({ orders }: OrdersUpdateProps) => {
  // Get the 5 most recent orders
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

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
                  <Badge
                    variant={
                      order.status === "Completed" ? "success" :
                      order.status === "Pending" ? "warning" : "destructive"
                    }
                    className="capitalize"
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="space-y-1">
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
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Items:</p>
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm pl-2">
                        <p className="text-gray-700">{item.item_name}</p>
                        <p className="text-gray-500">
                          {item.quantity}x @ {formatCurrency(item.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-end">
                  <p className="font-medium">
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
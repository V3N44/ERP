import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface Order {
  id: number;
  date: string;
  customer_id: number;
  total: number;
  status: string;
}

interface OrdersUpdateProps {
  orders: Order[];
}

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
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div>
                <p className="font-medium">Order #{order.id}</p>
                <p className="text-sm text-gray-500">
                  Customer ID: {order.customer_id}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">${order.total.toLocaleString()}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(order.date), "MMM dd, yyyy")}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : order.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
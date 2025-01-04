import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { API_URL } from "@/config";
import { Purchase } from "@/types/purchases";

const fetchPurchaseHistory = async (): Promise<Purchase[]> => {
  const response = await fetch(`${API_URL}/purchases/`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch purchase history');
  }
  
  return response.json();
};

export const PurchaseHistory = () => {
  const { data: purchases = [], isLoading, error } = useQuery({
    queryKey: ['purchases-history'],
    queryFn: fetchPurchaseHistory,
  });

  if (isLoading) {
    return <div className="flex justify-center p-4">Loading purchase history...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error loading purchase history</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Purchase History</h3>
      <ScrollArea className="h-[500px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Challan No</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{new Date(purchase.purchase_date).toLocaleDateString()}</TableCell>
                <TableCell>{purchase.challan_no}</TableCell>
                <TableCell>{purchase.supplier_id}</TableCell>
                <TableCell>${purchase.grand_total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant={
                    purchase.status === 'approved' ? 'success' : 
                    purchase.status === 'rejected' ? 'destructive' : 
                    'warning'
                  }>
                    {purchase.status || 'pending'}
                  </Badge>
                </TableCell>
                <TableCell>{purchase.payment_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};
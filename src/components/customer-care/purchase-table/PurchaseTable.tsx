import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Pencil, Trash2 } from "lucide-react";
import { Purchase } from "@/types/purchases";

interface PurchaseTableProps {
  purchases: Purchase[];
  onStatusUpdate: (id: number, status: 'approved' | 'rejected') => void;
  onEdit: (purchase: Purchase) => void;
  onDelete: (id: number) => void;
}

export const PurchaseTable = ({ 
  purchases,
  onStatusUpdate,
  onEdit,
  onDelete
}: PurchaseTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Challan No</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Payment Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases.map((purchase) => (
          <TableRow key={purchase.id}>
            <TableCell>{new Date(purchase.purchase_date).toLocaleDateString()}</TableCell>
            <TableCell>{purchase.challan_no}</TableCell>
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
            <TableCell>
              <div className="flex gap-2">
                {purchase.status === 'pending' && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onStatusUpdate(purchase.id!, 'approved')}
                    >
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onStatusUpdate(purchase.id!, 'rejected')}
                    >
                      <XCircle className="h-4 w-4 text-red-600" />
                    </Button>
                  </>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(purchase)}
                >
                  <Pencil className="h-4 w-4 text-blue-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(purchase.id!)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
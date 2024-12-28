import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";

export const PurchaseApprovals = () => {
  const approvals = [
    { id: 1, item: "Vehicle Parts", amount: 5000, status: "pending", requester: "John Doe", date: "2024-02-20" },
    { id: 2, item: "Office Supplies", amount: 1200, status: "approved", requester: "Jane Smith", date: "2024-02-19" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Purchase Approvals</h3>
        <Button variant="outline">New Request</Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Requester</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {approvals.map((approval) => (
            <TableRow key={approval.id}>
              <TableCell>{approval.item}</TableCell>
              <TableCell>${approval.amount}</TableCell>
              <TableCell>
                <Badge variant={approval.status === 'approved' ? 'success' : 'warning'}>
                  {approval.status}
                </Badge>
              </TableCell>
              <TableCell>{approval.requester}</TableCell>
              <TableCell>{approval.date}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
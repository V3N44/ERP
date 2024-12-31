import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddBankAccountDialog } from "@/components/accounting/AddBankAccountDialog";
import { useQuery } from "@tanstack/react-query";
import { getBanks, type Bank } from "@/services/bankService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

export default function BankAccountsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: banks, isLoading, error } = useQuery({
    queryKey: ['banks'],
    queryFn: getBanks,
  });

  if (error) {
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to fetch bank accounts",
      variant: "destructive",
    });
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-900">Bank Accounts</h1>
        <Button onClick={() => setIsDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Bank Account
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Bank Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-sm text-gray-500">Loading bank accounts...</div>
          ) : banks && banks.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bank Name</TableHead>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banks.map((bank: Bank) => (
                  <TableRow key={bank.id}>
                    <TableCell className="font-medium">{bank.bank_name}</TableCell>
                    <TableCell>{bank.account_name}</TableCell>
                    <TableCell>{bank.account_number}</TableCell>
                    <TableCell>{bank.branch}</TableCell>
                    <TableCell className="text-right">
                      ${bank.balance.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-sm text-gray-500">
              No bank accounts registered yet. Click the button above to add one.
            </div>
          )}
        </CardContent>
      </Card>

      <AddBankAccountDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
        onSuccess={() => {
          setIsDialogOpen(false);
        }}
      />
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddBankAccountDialog } from "@/components/accounting/AddBankAccountDialog";

export default function BankAccountsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
          <div className="text-sm text-gray-500">
            No bank accounts registered yet. Click the button above to add one.
          </div>
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
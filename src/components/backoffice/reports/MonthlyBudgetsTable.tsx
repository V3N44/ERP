import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { fetchAllBudgets } from "@/services/budgetService";
import { useToast } from "@/hooks/use-toast";

export const MonthlyBudgetsTable = () => {
  const { toast } = useToast();

  const { data: allBudgets, isLoading: isLoadingBudgets, error: budgetsError } = useQuery({
    queryKey: ['budgets'],
    queryFn: fetchAllBudgets,
    meta: {
      onError: (error: Error) => {
        console.error('Error fetching budgets:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load budgets. Please try again later.",
        });
      }
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Monthly Budgets</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoadingBudgets ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading budgets...</span>
          </div>
        ) : budgetsError ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load budgets. Please try again later.
            </AlertDescription>
          </Alert>
        ) : allBudgets && allBudgets.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month/Year</TableHead>
                <TableHead>Budget Amount</TableHead>
                <TableHead>Remaining Budget</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allBudgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell>
                    {format(new Date(budget.year, budget.month - 1), "MMMM yyyy")}
                  </TableCell>
                  <TableCell>${budget.budget_amount.toLocaleString()}</TableCell>
                  <TableCell>${budget.remaining_budget.toLocaleString()}</TableCell>
                  <TableCell>{format(new Date(budget.created_at), "PPP")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center p-4">No budgets available</div>
        )}
      </CardContent>
    </Card>
  );
};
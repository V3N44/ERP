import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchCurrentMonthBudget } from "@/services/budgetService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const BudgetManagementPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: budget, isLoading, error } = useQuery({
    queryKey: ['current-month-budget'],
    queryFn: fetchCurrentMonthBudget,
    meta: {
      onError: (err: Error) => {
        console.error('Error fetching current month budget:', err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load current month's budget. Please try again later."
        });
      }
    },
    retry: 1
  });

  const formatMonth = (month: number) => {
    return format(new Date(2024, month - 1), 'MMMM');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Current Month Budget</h1>
        <Button 
          onClick={() => navigate("/backoffice/budget/add")}
          className="bg-primary hover:bg-primary/90"
        >
          Add Monthly Budget
        </Button>
      </div>
      
      <div className="rounded-md border">
        {isLoading ? (
          <div className="p-4 text-center">Loading budget...</div>
        ) : error ? (
          <Alert variant="destructive" className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Error loading budget. Please try again later.
            </AlertDescription>
          </Alert>
        ) : budget ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Budget Amount</TableHead>
                <TableHead>Remaining Budget</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{formatMonth(budget.month)}</TableCell>
                <TableCell>{budget.year}</TableCell>
                <TableCell>{formatCurrency(budget.budget_amount)}</TableCell>
                <TableCell>{formatCurrency(budget.remaining_budget)}</TableCell>
                <TableCell>{format(new Date(budget.created_at), 'PPP')}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ) : (
          <Alert className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Budget Found</AlertTitle>
            <AlertDescription>
              No budget found for the current month. Click the button above to add a new monthly budget.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default BudgetManagementPage;
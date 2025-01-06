import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchAllBudgets } from "@/services/budgetService";
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
import { AlertCircle, Loader2 } from "lucide-react";

const BudgetManagementPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: budgets, isLoading, error } = useQuery({
    queryKey: ['budgets'],
    queryFn: fetchAllBudgets,
    meta: {
      onError: (err: Error) => {
        console.error('Error fetching budgets:', err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load budgets. Please try again later."
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
        <h1 className="text-2xl font-bold">Budget Management</h1>
        <Button 
          onClick={() => navigate("/backoffice/budget/add")}
          className="bg-primary hover:bg-primary/90"
        >
          Add Monthly Budget
        </Button>
      </div>
      
      <div className="rounded-md border">
        {isLoading ? (
          <div className="p-8 flex justify-center items-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading budgets...</span>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Error loading budgets. Please try again later.
            </AlertDescription>
          </Alert>
        ) : budgets?.length ? (
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
              {budgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell>{formatMonth(budget.month)}</TableCell>
                  <TableCell>{budget.year}</TableCell>
                  <TableCell>{formatCurrency(budget.budget_amount)}</TableCell>
                  <TableCell>{formatCurrency(budget.remaining_budget)}</TableCell>
                  <TableCell>{format(new Date(budget.created_at), 'PPP')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Alert className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Budgets Found</AlertTitle>
            <AlertDescription>
              No budgets have been created yet. Click the button above to add a new monthly budget.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default BudgetManagementPage;
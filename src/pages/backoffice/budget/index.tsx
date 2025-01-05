import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchMonthlyBudgets } from "@/services/budgetService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

const BudgetManagementPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: budgets, isLoading, error } = useQuery({
    queryKey: ['monthly-budgets'],
    queryFn: fetchMonthlyBudgets,
    meta: {
      onError: (err: Error) => {
        console.error('Error fetching monthly budgets:', err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load budgets. Please try again later."
        });
      }
    }
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
          <div className="p-4 text-center">Loading budgets...</div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">
            Error loading budgets. Please try again later.
          </div>
        ) : budgets && budgets.length > 0 ? (
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
          <div className="p-4 text-center text-muted-foreground">
            No budgets found. Click the button above to add a new monthly budget.
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetManagementPage;
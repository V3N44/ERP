import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAllBudgets } from "@/services/budgetService";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, Eye } from "lucide-react";

const BudgetManagementPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: budgets, isLoading, error } = useQuery({
    queryKey: ["budgets"],
    queryFn: fetchAllBudgets,
  });

  const handleAddBudget = () => {
    navigate("/backoffice/budget/add");
  };

  const handleViewBudget = (budgetId: number) => {
    navigate(`/backoffice/budget/${budgetId}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Budget Management</h1>
        <Button onClick={handleAddBudget}>Add New Budget</Button>
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
              {error instanceof Error ? error.message : "Failed to load budgets"}
            </AlertDescription>
          </Alert>
        ) : !budgets || budgets.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No budgets found. Click the "Add New Budget" button to create one.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Budget Amount</TableHead>
                <TableHead>Remaining Budget</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell>
                    {format(new Date(budget.year, budget.month - 1), "MMMM")}
                  </TableCell>
                  <TableCell>{budget.year}</TableCell>
                  <TableCell>${budget.budget_amount.toLocaleString()}</TableCell>
                  <TableCell>${budget.remaining_budget.toLocaleString()}</TableCell>
                  <TableCell>
                    {format(new Date(budget.created_at), "PPP")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewBudget(budget.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default BudgetManagementPage;
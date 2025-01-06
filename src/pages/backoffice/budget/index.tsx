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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchAllBudgets, getMonthlyBudgetDetails } from "@/services/budgetService";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, Eye } from "lucide-react";
import { useState } from "react";

const BudgetManagementPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedBudgetId, setSelectedBudgetId] = useState<number | null>(null);
  
  const { data: budgets, isLoading: isLoadingBudgets, error: budgetsError } = useQuery({
    queryKey: ["budgets"],
    queryFn: fetchAllBudgets,
  });

  const { data: selectedBudgetDetails, isLoading: isLoadingDetails, error: detailsError } = useQuery({
    queryKey: ['budget', selectedBudgetId],
    queryFn: () => selectedBudgetId ? getMonthlyBudgetDetails(selectedBudgetId) : null,
    enabled: !!selectedBudgetId,
  });

  const handleAddBudget = () => {
    navigate("/backoffice/budget/add");
  };

  const handleViewBudget = (budgetId: number) => {
    setSelectedBudgetId(budgetId);
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Budget Management</h1>
        <Button onClick={handleAddBudget}>Add New Budget</Button>
      </div>

      <div className="rounded-md border">
        {isLoadingBudgets ? (
          <div className="p-8 flex justify-center items-center">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading budgets...</span>
          </div>
        ) : budgetsError ? (
          <Alert variant="destructive" className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {budgetsError instanceof Error ? budgetsError.message : "Failed to load budgets"}
            </AlertDescription>
          </Alert>
        ) : !budgets || budgets.length === 0 ? (
          <div className="p-4 text-center">
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
                <TableHead>Actions</TableHead>
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

      {/* Monthly Budget Details */}
      {selectedBudgetId && (
        <Card>
          <CardHeader>
            <CardTitle>Monthly Budget Details</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingDetails ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Loading budget details...</span>
              </div>
            ) : detailsError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {detailsError instanceof Error ? detailsError.message : "Failed to load budget details"}
                </AlertDescription>
              </Alert>
            ) : selectedBudgetDetails ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">Month/Year</div>
                    <div className="text-2xl font-bold">
                      {format(new Date(selectedBudgetDetails.year, selectedBudgetDetails.month - 1), "MMMM yyyy")}
                    </div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">Budget Amount</div>
                    <div className="text-2xl font-bold">${selectedBudgetDetails.budget_amount.toLocaleString()}</div>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <div className="text-sm font-medium text-muted-foreground">Remaining Budget</div>
                    <div className="text-2xl font-bold">${selectedBudgetDetails.remaining_budget.toLocaleString()}</div>
                  </div>
                </div>

                {/* Money Orders Table */}
                {selectedBudgetDetails.money_orders && selectedBudgetDetails.money_orders.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Money Orders</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedBudgetDetails.money_orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.reason}</TableCell>
                            <TableCell>${order.amount.toLocaleString()}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>{format(new Date(order.created_at), "PPP")}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-4">No budget details available</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BudgetManagementPage;
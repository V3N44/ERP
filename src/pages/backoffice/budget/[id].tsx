import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMonthlyBudgetDetails } from "@/services/budgetService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";

const BudgetDetailsPage = () => {
  const { id } = useParams();
  const budgetId = parseInt(id || "0");

  const { data: budget, isLoading, error } = useQuery({
    queryKey: ["budget", budgetId],
    queryFn: () => getMonthlyBudgetDetails(budgetId),
    enabled: !!budgetId,
  });

  if (isLoading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading budget details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : "Failed to load budget details"}
        </AlertDescription>
      </Alert>
    );
  }

  if (!budget) {
    return (
      <Alert className="m-4">
        <AlertTitle>Not Found</AlertTitle>
        <AlertDescription>Budget not found</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Budget Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium">Month/Year</h3>
                <p>{format(new Date(budget.year, budget.month - 1), "MMMM yyyy")}</p>
              </div>
              <div>
                <h3 className="font-medium">Created At</h3>
                <p>{format(new Date(budget.created_at), "PPP")}</p>
              </div>
              <div>
                <h3 className="font-medium">Budget Amount</h3>
                <p>${budget.budget_amount.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-medium">Remaining Budget</h3>
                <p>${budget.remaining_budget.toLocaleString()}</p>
              </div>
            </div>

            {budget.money_orders && budget.money_orders.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium mb-4">Money Orders</h3>
                <div className="border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {budget.money_orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap">{order.reason}</td>
                          <td className="px-6 py-4 whitespace-nowrap">${order.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {format(new Date(order.created_at), "PPP")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetDetailsPage;
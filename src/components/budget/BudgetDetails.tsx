import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MonthlyBudget, getMonthlyBudgetDetails } from "@/services/budgetService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

export const BudgetDetails = () => {
  const { budgetId } = useParams();
  const [budget, setBudget] = useState<MonthlyBudget | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBudgetDetails = async () => {
      try {
        if (!budgetId) return;
        const data = await getMonthlyBudgetDetails(parseInt(budgetId));
        setBudget(data);
      } catch (error) {
        console.error('Error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch budget details",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetDetails();
  }, [budgetId, toast]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!budget) {
    return <div>Budget not found</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Budget Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Month/Year</p>
              <p className="text-2xl">{budget.month}/{budget.year}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Budget Amount</p>
              <p className="text-2xl">${budget.budget_amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Remaining Budget</p>
              <p className="text-2xl">${budget.remaining_budget?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Created At</p>
              <p className="text-2xl">{format(new Date(budget.created_at || ''), 'PP')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Money Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reason</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budget.money_orders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.reason}</TableCell>
                  <TableCell>${order.amount.toLocaleString()}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{format(new Date(order.created_at), 'PP')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
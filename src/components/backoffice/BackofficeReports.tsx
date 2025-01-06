import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { getMonthlyBudgetDetails } from "@/services/budgetService";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const mockData = [
  { month: 'Jan', invoices: 65, revenue: 89000 },
  { month: 'Feb', invoices: 75, revenue: 95000 },
  { month: 'Mar', invoices: 85, revenue: 120000 },
  { month: 'Apr', invoices: 70, revenue: 108000 },
  { month: 'May', invoices: 90, revenue: 134000 },
  { month: 'Jun', invoices: 95, revenue: 140000 },
];

export const BackofficeReports = () => {
  const [selectedBudgetId, setSelectedBudgetId] = useState<number>(1); // Start with budget ID 1

  const { data: budgetDetails, isLoading, error } = useQuery({
    queryKey: ['budget', selectedBudgetId],
    queryFn: () => getMonthlyBudgetDetails(selectedBudgetId),
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Invoice Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="invoices" fill="#8884d8" name="Invoices Generated" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#8884d8" 
                    name="Revenue ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">480</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">23 invoices pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Processing Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 days</div>
            <p className="text-xs text-muted-foreground">-0.3 days from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Budget Details */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Budget Details</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Loading budget details...</span>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error instanceof Error ? error.message : "Failed to load budget details"}
              </AlertDescription>
            </Alert>
          ) : budgetDetails ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Month/Year</div>
                  <div className="text-2xl font-bold">
                    {format(new Date(budgetDetails.year, budgetDetails.month - 1), "MMMM yyyy")}
                  </div>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Budget Amount</div>
                  <div className="text-2xl font-bold">${budgetDetails.budget_amount.toLocaleString()}</div>
                </div>
                <div className="p-4 bg-secondary rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground">Remaining Budget</div>
                  <div className="text-2xl font-bold">${budgetDetails.remaining_budget.toLocaleString()}</div>
                </div>
              </div>

              {/* Money Orders Table */}
              {budgetDetails.money_orders && budgetDetails.money_orders.length > 0 && (
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
                      {budgetDetails.money_orders.map((order) => (
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
    </div>
  );
};
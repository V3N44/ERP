import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SummaryCards = () => {
  return (
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
  );
};
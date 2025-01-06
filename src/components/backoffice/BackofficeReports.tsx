import { useState } from "react";
import { InvoiceMetricsCard } from "./reports/InvoiceMetricsCard";
import { RevenueTrendsCard } from "./reports/RevenueTrendsCard";
import { SummaryCards } from "./reports/SummaryCards";
import { MonthlyBudgetsTable } from "./reports/MonthlyBudgetsTable";

const mockData = [
  { month: 'Jan', invoices: 65, revenue: 89000 },
  { month: 'Feb', invoices: 75, revenue: 95000 },
  { month: 'Mar', invoices: 85, revenue: 120000 },
  { month: 'Apr', invoices: 70, revenue: 108000 },
  { month: 'May', invoices: 90, revenue: 134000 },
  { month: 'Jun', invoices: 95, revenue: 140000 },
];

export const BackofficeReports = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InvoiceMetricsCard data={mockData} />
        <RevenueTrendsCard data={mockData} />
      </div>

      <SummaryCards />
      
      <MonthlyBudgetsTable />
    </div>
  );
};
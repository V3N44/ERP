import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Calendar, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MaintenanceRecord {
  id: number;
  vehicleId: string;
  type: string;
  date: string;
  status: "completed" | "scheduled" | "overdue";
  notes: string;
}

interface MaintenanceTableProps {
  records: MaintenanceRecord[];
}

export const MaintenanceTable = ({ records }: MaintenanceTableProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <Check className="text-green-500" />;
      case "scheduled":
        return <Calendar className="text-blue-500" />;
      case "overdue":
        return <AlertCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Records</CardTitle>
        <div className="flex justify-end">
          <Input 
            placeholder="Search records..." 
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.vehicleId}</TableCell>
                <TableCell>{record.type}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    {getStatusIcon(record.status)}
                    {record.status}
                  </span>
                </TableCell>
                <TableCell>{record.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
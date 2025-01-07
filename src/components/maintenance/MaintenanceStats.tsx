import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Calendar, AlertCircle, Clock } from "lucide-react";

interface MaintenanceStatsProps {
  records: {
    status: string;
  }[];
}

export const MaintenanceStats = ({ records }: MaintenanceStatsProps) => {
  // Count records by status
  const getStatusCount = (status: string) => {
    return records.filter(r => r.status.toLowerCase() === status.toLowerCase()).length;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-green-500 flex items-center gap-2">
            <Check />
            Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {getStatusCount("completed")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-blue-500 flex items-center gap-2">
            <Clock />
            In Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {getStatusCount("in progress")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-yellow-500 flex items-center gap-2">
            <Calendar />
            Pending
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {getStatusCount("pending")}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-red-500 flex items-center gap-2">
            <AlertCircle />
            Overdue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {getStatusCount("overdue")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
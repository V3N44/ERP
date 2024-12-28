import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Calendar, AlertCircle } from "lucide-react";

interface MaintenanceStatsProps {
  records: {
    status: string;
  }[];
}

export const MaintenanceStats = ({ records }: MaintenanceStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-green-500 flex items-center gap-2">
            <Check />
            Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {records.filter(r => r.status === "completed").length}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-blue-500 flex items-center gap-2">
            <Calendar />
            Scheduled
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {records.filter(r => r.status === "scheduled").length}
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
            {records.filter(r => r.status === "overdue").length}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
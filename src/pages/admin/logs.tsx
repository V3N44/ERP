import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ErrorLogsTable } from "@/components/admin/logs/ErrorLogsTable";
import { getSystemErrors, getAccessLogs, formatErrorLogs, formatAccessLogs } from "@/utils/logs";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// LogLevelBadge component for access logs
const LogLevelBadge = ({ level }: { level: string }) => {
  const getVariant = (level: string) => {
    switch (level.toLowerCase()) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'warning';
      case 'info':
        return 'secondary';
      case 'success':
        return 'success';
      default:
        return 'default';
    }
  };

  return (
    <Badge variant={getVariant(level)}>{level}</Badge>
  );
};

const systemEvents = [
  { id: 1, timestamp: "2024-01-10 14:30:00", type: "INFO", message: "System backup completed", component: "BackupService" },
  { id: 2, timestamp: "2024-01-10 14:29:00", type: "WARNING", message: "High CPU usage detected", component: "MonitoringService" },
  { id: 3, timestamp: "2024-01-10 14:28:00", type: "INFO", message: "Scheduled maintenance started", component: "MaintenanceService" },
];

export default function SystemLogsPage() {
  const { data: errorLogs = [] } = useQuery({
    queryKey: ['systemErrors'],
    queryFn: getSystemErrors,
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const { data: accessLogs = [] } = useQuery({
    queryKey: ['accessLogs'],
    queryFn: getAccessLogs,
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const formattedErrorLogs = formatErrorLogs(errorLogs);
  const formattedAccessLogs = formatAccessLogs(accessLogs);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">System Logs</h1>
      <Tabs defaultValue="error" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="error" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Error Logs
          </TabsTrigger>
          <TabsTrigger value="access" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Access Logs
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            System Events
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100vh-12rem)]">
          <TabsContent value="error">
            <ErrorLogsTable logs={formattedErrorLogs} />
          </TabsContent>

          <TabsContent value="access">
            <Card>
              <CardHeader>
                <CardTitle>Access Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>IP Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formattedAccessLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono">{log.timestamp}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell><LogLevelBadge level={log.status} /></TableCell>
                        <TableCell className="font-mono">{log.ip}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Events</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Component</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {systemEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-mono">{event.timestamp}</TableCell>
                        <TableCell><LogLevelBadge level={event.type} /></TableCell>
                        <TableCell>{event.message}</TableCell>
                        <TableCell>{event.component}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}

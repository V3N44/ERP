import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Function to fetch system errors from localStorage
const getSystemErrors = () => {
  try {
    const errors = localStorage.getItem('system_errors');
    return errors ? JSON.parse(errors) : [];
  } catch (error) {
    console.error('Error parsing system errors:', error);
    return [];
  }
};

// Mock data for demonstration
const accessLogs = [
  { id: 1, timestamp: "2024-01-10 14:30:00", user: "john.doe", action: "LOGIN", status: "SUCCESS", ip: "192.168.1.100" },
  { id: 2, timestamp: "2024-01-10 14:29:30", user: "jane.smith", action: "LOGOUT", status: "SUCCESS", ip: "192.168.1.101" },
  { id: 3, timestamp: "2024-01-10 14:28:45", user: "admin", action: "PASSWORD_CHANGE", status: "SUCCESS", ip: "192.168.1.102" },
];

const systemEvents = [
  { id: 1, timestamp: "2024-01-10 14:30:00", type: "INFO", message: "System backup completed", component: "BackupService" },
  { id: 2, timestamp: "2024-01-10 14:29:00", type: "WARNING", message: "High CPU usage detected", component: "MonitoringService" },
  { id: 3, timestamp: "2024-01-10 14:28:00", type: "INFO", message: "Scheduled maintenance started", component: "MaintenanceService" },
];

const LogLevelBadge = ({ level }: { level: string }) => {
  const colors: Record<string, string> = {
    ERROR: "bg-red-100 text-red-800",
    CRITICAL: "bg-red-200 text-red-900",
    WARNING: "bg-yellow-100 text-yellow-800",
    INFO: "bg-blue-100 text-blue-800",
    SUCCESS: "bg-green-100 text-green-800",
    "401": "bg-red-100 text-red-800",
    "404": "bg-yellow-100 text-yellow-800",
    "500": "bg-red-200 text-red-900"
  };

  return (
    <Badge className={colors[level] || "bg-gray-100 text-gray-800"}>
      {level}
    </Badge>
  );
};

export default function SystemLogsPage() {
  const { data: errorLogs = [] } = useQuery({
    queryKey: ['systemErrors'],
    queryFn: getSystemErrors,
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  // Format error logs
  const formattedErrorLogs = errorLogs.map((error: any, index: number) => ({
    id: index + 1,
    timestamp: new Date().toISOString(),
    level: error.status ? String(error.status) : "ERROR",
    message: error.message || error.detail || "Unknown error",
    source: new URL(error.url || "").pathname || "SystemService"
  }));

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
            <Card>
              <CardHeader>
                <CardTitle>Error Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formattedErrorLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-mono">{log.timestamp}</TableCell>
                        <TableCell><LogLevelBadge level={log.level} /></TableCell>
                        <TableCell>{log.message}</TableCell>
                        <TableCell>{log.source}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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
                    {accessLogs.map((log) => (
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
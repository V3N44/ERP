import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock } from "lucide-react";

export const FollowUpsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell> Harsha Subasinghe </TableCell>
          <TableCell>Test Drive</TableCell>
          <TableCell>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              2024-03-25
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              14:00
            </div>
          </TableCell>
          <TableCell>
            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
              Scheduled
            </span>
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="sm">Reschedule</Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Ramanayake</TableCell>
          <TableCell>Price Quote</TableCell>
          <TableCell>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              2024-03-26
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              10:30
            </div>
          </TableCell>
          <TableCell>
            <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">
              Pending
            </span>
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="sm">Reschedule</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
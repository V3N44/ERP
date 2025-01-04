import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

interface ShipmentLocation {
  id: number;
  shipment_id: number;
  location: string;
  date: string;
  status: string;
}

interface ShipmentLocationHistoryProps {
  locations: ShipmentLocation[];
}

export const ShipmentLocationHistory = ({ locations }: ShipmentLocationHistoryProps) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">Location History</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location) => (
            <TableRow key={location.id}>
              <TableCell>{format(new Date(location.date), 'PPP')}</TableCell>
              <TableCell>{location.location}</TableCell>
              <TableCell>{location.status}</TableCell>
            </TableRow>
          ))}
          {locations.length === 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                No location history found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
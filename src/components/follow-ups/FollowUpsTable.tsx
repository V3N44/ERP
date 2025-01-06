import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Pencil } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getFollowUps } from "@/services/followUpService";
import { format } from "date-fns";
import { useState } from "react";
import { EditFollowUpDialog } from "./EditFollowUpDialog";

export const FollowUpsTable = () => {
  const [selectedFollowUp, setSelectedFollowUp] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const { data: followUps, isLoading, error } = useQuery({
    queryKey: ['followUps'],
    queryFn: getFollowUps
  });

  const handleEdit = (followUp: any) => {
    setSelectedFollowUp(followUp);
    setEditDialogOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading follow-ups</div>;
  }

  return (
    <>
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
          {followUps?.map((followUp: any) => (
            <TableRow key={followUp.id}>
              <TableCell>{followUp.customer}</TableCell>
              <TableCell>{followUp.type}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {format(new Date(followUp.date), 'yyyy-MM-dd')}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {followUp.time}
                </div>
              </TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                  {followUp.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleEdit(followUp)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">Reschedule</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditFollowUpDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        followUpData={selectedFollowUp}
      />
    </>
  );
};
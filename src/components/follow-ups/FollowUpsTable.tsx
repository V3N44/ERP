import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, AlertCircle, Phone, Mail, MessageCircle, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getFollowUps } from "@/services/followUpService";
import { format } from "date-fns";

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getContactMethodIcon = (method: string) => {
  switch (method.toLowerCase()) {
    case 'phone':
      return <Phone className="h-4 w-4" />;
    case 'email':
      return <Mail className="h-4 w-4" />;
    case 'whatsapp':
      return <MessageCircle className="h-4 w-4" />;
    case 'in-person':
      return <User className="h-4 w-4" />;
    default:
      return null;
  }
};

export const FollowUpsTable = () => {
  const { data: followUps, isLoading, error } = useQuery({
    queryKey: ['followUps'],
    queryFn: getFollowUps
  });

  if (isLoading) {
    return <div className="flex items-center justify-center p-4">Loading follow-ups...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 text-red-500">
        <AlertCircle className="mr-2 h-4 w-4" />
        Error loading follow-ups
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Contact Method</TableHead>
          <TableHead>Date & Time</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {followUps?.map((followUp: any) => (
          <TableRow key={followUp.id}>
            <TableCell className="font-medium">{followUp.customer}</TableCell>
            <TableCell>{followUp.type}</TableCell>
            <TableCell>
              <Badge className={getPriorityColor(followUp.priority)}>
                {followUp.priority}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {getContactMethodIcon(followUp.contact_method)}
                <span className="capitalize">{followUp.contact_method}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  {format(new Date(followUp.date), 'MMM dd, yyyy')}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  {followUp.time}
                </div>
              </div>
            </TableCell>
            <TableCell className="max-w-[200px]">
              <p className="truncate text-sm text-gray-600">
                {followUp.notes || 'No notes'}
              </p>
            </TableCell>
            <TableCell>
              <Badge variant={followUp.status === 'Completed' ? 'default' : 'secondary'}>
                {followUp.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-green-600 hover:text-green-700"
                >
                  Complete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
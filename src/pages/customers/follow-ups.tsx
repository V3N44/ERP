import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";
import { FollowUpForm } from "@/components/follow-ups/FollowUpForm";
import { FollowUpsTable } from "@/components/follow-ups/FollowUpsTable";

const FollowUpsPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Follow-ups</h1>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Scheduled Follow-ups</CardTitle>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <CalendarPlus className="h-4 w-4" />
                Schedule New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Schedule New Follow-up</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[calc(80vh-8rem)] px-1">
                <FollowUpForm onSuccess={() => setOpen(false)} />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <FollowUpsTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default FollowUpsPage;
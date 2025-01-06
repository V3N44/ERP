import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FollowUpsTable } from "@/components/follow-ups/FollowUpsTable";
import { PhoneCall, Mail, Calendar } from "lucide-react";
import { useState } from "react";

const FollowUpsPage = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-purple-900">Follow-ups</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
            <PhoneCall className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Emails</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +5 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +1 from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <Button 
          variant={selectedType === 'call' ? 'default' : 'outline'}
          onClick={() => setSelectedType(selectedType === 'call' ? null : 'call')}
        >
          <PhoneCall className="mr-2 h-4 w-4" />
          Calls
        </Button>
        <Button 
          variant={selectedType === 'email' ? 'default' : 'outline'}
          onClick={() => setSelectedType(selectedType === 'email' ? null : 'email')}
        >
          <Mail className="mr-2 h-4 w-4" />
          Emails
        </Button>
        <Button 
          variant={selectedType === 'meeting' ? 'default' : 'outline'}
          onClick={() => setSelectedType(selectedType === 'meeting' ? null : 'meeting')}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Meetings
        </Button>
      </div>

      <FollowUpsTable selectedType={selectedType} />
    </div>
  );
};

export default FollowUpsPage;
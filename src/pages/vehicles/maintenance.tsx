import { useState } from "react";
import { Wrench } from "lucide-react";
import { MaintenanceStats } from "@/components/maintenance/MaintenanceStats";
import { MaintenanceTable } from "@/components/maintenance/MaintenanceTable";
import { MaintenanceForm } from "@/components/maintenance/MaintenanceForm";

interface MaintenanceRecord {
  id: number;
  vehicleId: string;
  type: string;
  date: string;
  status: "completed" | "scheduled" | "overdue";
  notes: string;
}

const MaintenancePage = () => {
  const [records, setRecords] = useState<MaintenanceRecord[]>([
    {
      id: 1,
      vehicleId: "VH001",
      type: "Oil Change",
      date: "2024-01-15",
      status: "completed",
      notes: "Regular maintenance completed"
    },
    {
      id: 2,
      vehicleId: "VH002",
      type: "Tire Rotation",
      date: "2024-01-20",
      status: "scheduled",
      notes: "Scheduled maintenance"
    },
    {
      id: 3,
      vehicleId: "VH003",
      type: "Brake Inspection",
      date: "2024-01-10",
      status: "overdue",
      notes: "Urgent maintenance required"
    }
  ]);

  const handleAddRecord = (data: Omit<MaintenanceRecord, "id">) => {
    const newRecord = {
      ...data,
      id: records.length + 1,
    } as MaintenanceRecord;
    
    setRecords([...records, newRecord]);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wrench className="h-8 w-8" />
          Vehicle Maintenance
        </h1>
        <MaintenanceForm onSubmit={handleAddRecord} />
      </div>

      <MaintenanceStats records={records} />
      <MaintenanceTable records={records} />
    </div>
  );
};

export default MaintenancePage;
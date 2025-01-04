import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const SystemLogsPage = () => {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "System Logs",
      description: "System logs functionality has been removed.",
    });
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">System Logs</h1>
      <p>System logs display has been disabled.</p>
    </div>
  );
};

export default SystemLogsPage;
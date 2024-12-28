import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Camera } from "lucide-react";

export const DocumentScanner = () => {
  const { toast } = useToast();

  const handleScan = () => {
    toast({
      title: "Scanner activated",
      description: "Please position the document for scanning.",
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Document Scanner</h2>
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <Camera className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-sm text-gray-600">Position your document here</p>
        </div>
        <Button onClick={handleScan} className="w-full">
          Start Scanning
        </Button>
      </div>
    </div>
  );
};
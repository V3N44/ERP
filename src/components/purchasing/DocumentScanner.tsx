import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Camera, FileScan, RotateCw, Upload, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const DocumentScanner = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    toast({
      title: "Scanner activated",
      description: "Please position the document for scanning.",
    });

    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      setPreview("/placeholder.svg"); // Using placeholder image for demo
      toast({
        title: "Scan complete",
        description: "Document has been successfully scanned.",
      });
    }, 2000);
  };

  const handleReset = () => {
    setPreview(null);
    setIsScanning(false);
  };

  const handleUpload = () => {
    if (preview) {
      toast({
        title: "Success",
        description: "Document has been uploaded successfully.",
      });
      handleReset();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileScan className="h-6 w-6" />
          Document Scanner
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8",
            isScanning ? "border-primary" : "border-gray-300"
          )}
        >
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Scanned document"
                className="max-w-full h-auto rounded"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleReset}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <Camera
                className={cn(
                  "mx-auto h-16 w-16",
                  isScanning
                    ? "text-primary animate-pulse"
                    : "text-gray-400"
                )}
              />
              <p className="mt-4 text-sm text-gray-600">
                {isScanning
                  ? "Scanning in progress..."
                  : "Position your document here"}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-end">
          {preview ? (
            <>
              <Button
                variant="outline"
                onClick={handleReset}
                className="gap-2"
              >
                <RotateCw className="h-4 w-4" />
                Rescan
              </Button>
              <Button onClick={handleUpload} className="gap-2">
                <Upload className="h-4 w-4" />
                Upload Document
              </Button>
            </>
          ) : (
            <Button
              onClick={handleScan}
              disabled={isScanning}
              className="gap-2"
            >
              <Camera className="h-4 w-4" />
              {isScanning ? "Scanning..." : "Start Scanning"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
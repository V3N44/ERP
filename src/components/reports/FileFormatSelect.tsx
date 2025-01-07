import { Button } from "@/components/ui/button";
import { FileText, FileDown } from "lucide-react";

interface FileFormatSelectProps {
  onSelectFormat: (format: 'txt' | 'docx' | 'pdf') => void;
  disabled?: boolean;
}

export const FileFormatSelect = ({ onSelectFormat, disabled }: FileFormatSelectProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onSelectFormat('txt')}
        disabled={disabled}
      >
        <FileText className="h-4 w-4" />
        TXT
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onSelectFormat('docx')}
        disabled={disabled}
      >
        <FileDown className="h-4 w-4" />
        DOCX
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onSelectFormat('pdf')}
        disabled={disabled}
      >
        <FileDown className="h-4 w-4" />
        PDF
      </Button>
    </div>
  );
};
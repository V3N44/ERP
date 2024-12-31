import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function GeneralSettings() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Dark Mode</Label>
          <p className="text-sm text-muted-foreground">
            Toggle between light and dark themes
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Sun className="h-5 w-5" />
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(checked) => {
              setTheme(checked ? "dark" : "light");
            }}
          />
          <Moon className="h-5 w-5" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Other Setting 1</Label>
          <p className="text-sm text-muted-foreground">
            Description for other setting 1
          </p>
        </div>
        <Switch />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label className="text-base">Other Setting 2</Label>
          <p className="text-sm text-muted-foreground">
            Description for other setting 2
          </p>
        </div>
        <Switch />
      </div>
    </div>
  );
}

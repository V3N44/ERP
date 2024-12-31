import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

export const GeneralSettings = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  const handleDarkModeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
    toast({
      title: t("settings.toast.success"),
      description: t("settings.toast.themeChanged"),
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>{t("settings.general.darkMode")}</Label>
        <div className="text-sm text-muted-foreground">
          {t("settings.general.darkModeDescription")}
        </div>
      </div>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={handleDarkModeToggle}
      />
    </div>
  );
};
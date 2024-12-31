import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";

export const NotificationSettings = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label>{t("settings.notifications.emailNotifications")}</Label>
        <div className="text-sm text-muted-foreground">
          {t("settings.notifications.emailDescription")}
        </div>
      </div>
      <Switch />
    </div>
  );
};
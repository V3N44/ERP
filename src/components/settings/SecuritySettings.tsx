import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";

export const SecuritySettings = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="font-medium">{t("settings.security.passwordRequirements")}</h3>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch />
          <Label>{t("settings.security.requireUppercase")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch />
          <Label>{t("settings.security.requireNumbers")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch />
          <Label>{t("settings.security.requireSpecial")}</Label>
        </div>
      </div>
    </div>
  );
};
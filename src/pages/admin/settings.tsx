import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { GeneralSettings } from "@/components/settings/GeneralSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { LocalizationSettings } from "@/components/settings/LocalizationSettings";
import { SystemSettings } from "@/components/settings/SystemSettings";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{t("settings.title")}</h1>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">{t("settings.tabs.general")}</TabsTrigger>
          <TabsTrigger value="security">{t("settings.tabs.security")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("settings.tabs.notifications")}</TabsTrigger>
          <TabsTrigger value="localization">{t("settings.tabs.localization")}</TabsTrigger>
          <TabsTrigger value="system">{t("settings.tabs.system")}</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <GeneralSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <SecuritySettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="localization">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <LocalizationSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <SystemSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button>{t("settings.actions.save")}</Button>
      </div>
    </div>
  );
}
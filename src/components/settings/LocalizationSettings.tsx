import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

export const LocalizationSettings = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem("language", value);
    
    toast({
      title: t("settings.toast.success"),
      description: t("settings.toast.description", { lng: value }),
    });
  };

  return (
    <div className="space-y-2">
      <Label>{t("settings.localization.language")}</Label>
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger>
          <SelectValue>
            {language === "en" ? "English" : "日本語"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ja">日本語</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
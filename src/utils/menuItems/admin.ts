import { Settings, Users, FileText, FileCode, BookOpen } from "lucide-react";
import { MenuItem } from "@/types/menu";

export const adminMenuItems: MenuItem[] = [
  {
    name: "Administration",
    icon: Settings,
    path: "/admin",
    roles: ["admin"],
    requirements: [
      { name: "Users", icon: Users, path: "/admin/users", roles: ["admin"] },
      { name: "Settings", icon: Settings, path: "/admin/settings", roles: ["admin"] },
      { name: "Reports", icon: FileText, path: "/admin/reports", roles: ["admin"] },
      { name: "System Logs", icon: FileCode, path: "/admin/logs", roles: ["admin"] },
      { name: "Chart of Accounts", icon: BookOpen, path: "/accounting/chart-of-accounts", roles: ["admin"] }
    ],
  }
];
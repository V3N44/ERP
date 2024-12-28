import { MenuItem } from "@/types/menu";
import { UserRole } from "@/types/auth";
import { adminMenuItems } from "./admin";
import { accountingMenuItems } from "./accounting";
import { baseMenuItems } from "./base";

const allMenuItems = [
  ...baseMenuItems,
  ...adminMenuItems,
  ...accountingMenuItems
];

export const getMenuItemsByRole = (role: UserRole) => {
  return allMenuItems.filter(item => item.roles.includes(role)).map(item => ({
    ...item,
    requirements: item.requirements?.filter(req => req.roles.includes(role))
  }));
};
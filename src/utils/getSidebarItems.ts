import { CRole } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case CRole.SUPER_ADMIN:
    case CRole.ADMIN:
      return [...adminSidebarItems];
    case CRole.USER:
      return [...userSidebarItems];

    default:
      return [];
  }
};

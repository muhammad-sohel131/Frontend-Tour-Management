import type { ISidebarItem } from "@/types";

export const generateRoutes = (sidebarItems: ISidebarItem[]) => {
  return sidebarItems.flatMap((items) =>
    items.items.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};

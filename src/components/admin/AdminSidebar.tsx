import { Home, Database, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/routes/ROUTES";
import { NavLink } from "react-router-dom";

const items = [
  { title: "Dashboard", url: ROUTES.ADMIN.DASHBOARD, icon: Home },
  { title: "Products", url: ROUTES.ADMIN.PRODUCTS, icon: Database },
  //   { title: "Calendar", url: "#", icon: Calendar },
  //   { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
];

export function AdminSidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <h2 className="text-2xl flex font-semibold mb-2">
            <img
              src="/assets/Favicon.png"
              alt="logo"
              className="h-8 w-8 object-cover"
            />
            {isOpen && "Runique"}
          </h2>
          <SidebarGroupContent>
            <SidebarMenu className=" flex flex-col">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    // className={cn(`${item.title === "Settings" && "mt-10"}`)}
                  >
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

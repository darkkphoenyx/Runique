import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  let header: string;

  //to extract pathname from url -> /admin/dashboar => gives Dashboard
  (() => {
    const temp = pathname[pathname.length - 1];
    const url = temp[0].toUpperCase() + temp.slice(1);
    header = url;
  })();

  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full">
        <AdminSidebar isOpen={isOpen} />

        <div className="flex-1 flex flex-col">
          <div className="p-4 flex gap-2 items-center shadow sticky top-0 bg-white z-50 py-5">
            <SidebarTrigger onClick={() => setIsOpen((prev) => !prev)} />
            <h2 className="text-xl font-medium">{header}</h2>
          </div>

          <div className="flex-1 px-6 py-4 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;

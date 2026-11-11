import React from 'react';
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from '../components/DashboardSidebar';
import { Toaster } from '@/components/ui/toast';
 
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0c0c0e]">
      
        <DashboardSidebar />

        <SidebarInset className="flex flex-col flex-1 min-w-0 bg-[#0c0c0e] text-white">
          <main className="flex-1 w-full overflow-y-auto p-4 md:p-8">
            <div className="">
              <SidebarTrigger className="text-white hover:bg-neutral-800" />
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
};

export default DashboardLayout;
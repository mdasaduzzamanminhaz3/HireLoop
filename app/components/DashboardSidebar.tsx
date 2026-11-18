"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutGrid,
  Briefcase,
  Bookmark,
  FileText,
  CreditCard,
  Settings,
  Users,
  Building2,
  LogOut,
  CirclePlus
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession, authClient } from "@/lib/auth-client";

// রোলভিত্তিক মেনু আইটেমসমূহ
const menuItemsByRole = {
  seeker: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/seeker", icon: LayoutGrid },
    { id: "jobs", name: "Jobs", url: "/dashboard/seeker/jobs", icon: Briefcase },
    { id: "saved-jobs", name: "Saved Jobs", url: "/dashboard/seeker/saved-jobs", icon: Bookmark },
    { id: "applications", name: "Applications", url: "/dashboard/seeker/applications", icon: FileText },
    { id: "billing", name: "Billing", url: "/dashboard/seeker/billing", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/dashboard/seeker/settings", icon: Settings },
  ],
  recruiter: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/recruiter", icon: LayoutGrid },
    { id: "manage-jobs", name: "Manage Jobs", url: "/dashboard/recruiter/jobs", icon: Briefcase },
    { id: "create-job", name: "Create Job", url: "/dashboard/recruiter/jobs/create-job", icon: CirclePlus },
    { id: "applications", name: "Applications", url: "/dashboard/recruiter/applications", icon: FileText },
    { id: "settings", name: "Settings", url: "/dashboard/recruiter/settings", icon: Settings },
  ],
  admin: [
    { id: "dashboard", name: "Dashboard", url: "/dashboard/admin", icon: LayoutGrid },
    { id: "users", name: "Users", url: "/dashboard/admin/users", icon: Users },
    { id: "companies", name: "Companies", url: "/dashboard/admin/companies", icon: Building2 },
    { id: "jobs", name: "Jobs", url: "/dashboard/admin/jobs", icon: Briefcase },
    { id: "payments", name: "Payments", url: "/dashboard/admin/payments", icon: CreditCard },
    { id: "settings", name: "Settings", url: "/dashboard/admin/settings", icon: Settings },
  ],
};

export function DashboardSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  
  // সেশন থেকে রোল নেওয়া হচ্ছে। যদি সেশন বা রোল না থাকে, ডিফল্ট seeker ধরবে
  // আপনি চাইলে এখানে কনসোল করে দেখতে পারেন মেইন রোল কী আসছে: console.log(session?.user);
  const rawRole = session?.user?.role;
  const role = (rawRole === "recruiter" || rawRole === "admin" ? rawRole : "seeker") as keyof typeof menuItemsByRole;
  
  const currentMenu = menuItemsByRole[role] || menuItemsByRole.seeker;

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/sign-in";
  };

  return (
    <Sidebar className="border-r border-neutral-800 bg-[#0c0c0e] text-white">
      {/* Sidebar Header: Logo & User Badge */}
      <SidebarHeader className="p-4 space-y-4">
        {/* Brand Logo */}
        <Link href="/" className="inline-flex items-center gap-1 group">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
            hire
          </span>
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-sky-400 border-t-transparent animate-spin [animation-duration:4s]" />
            <div className="absolute inset-1 rounded-full border-2 border-orange-500 border-b-transparent animate-spin [animation-duration:2s]" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
            loop
          </span>
        </Link>

        {/* User Card */}
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#141417] border border-neutral-800/80">
          <Image
            src={session?.user?.image || "https://i.pinimg.com/736x/f5/47/d8/f547d800625af9056d62efe8969aeea0.jpg"}
            alt="User Avatar"
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover border border-neutral-700"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-white truncate">
              {session?.user?.name || (role === "admin" ? "Alex Rivera" : role === "recruiter" ? "Alex Sterling" : "Seeker Portal")}
            </span>
            <span className="text-[10px] text-neutral-400 truncate capitalize">
              {role === "seeker" ? "Professional Tier" : role === "recruiter" ? "Premium account" : "Super Admin"}
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Sidebar Content: Navigation Links */}
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarMenu className="space-y-1">
            {currentMenu.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url;
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                   
                    isActive={isActive}
                    className={`w-full h-auto px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-[#1d1d24] text-white border-l-2 border-indigo-500 shadow-sm"
                        : "text-neutral-400 hover:text-neutral-200 hover:bg-[#151518]"
                    }`}
                  >
                    <Link href={item.url} className="flex items-center gap-3 w-full">
                      <Icon className={`w-4 h-4 ${isActive ? "text-indigo-400" : "text-neutral-400"}`} />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer: CTA Button & Logout */}
      <SidebarFooter className="p-4 space-y-3 border-t border-neutral-800/60">
        {role === "seeker" && (
          <button className="w-full py-2.5 bg-white text-black font-semibold text-xs rounded-xl hover:bg-neutral-200 transition-colors shadow-sm">
            Post Resume
          </button>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-red-400 transition-colors px-2 py-1.5 w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
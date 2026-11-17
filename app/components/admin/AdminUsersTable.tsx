"use client";

import React, { useState } from "react";
import { 
  Search, 
  Shield, 
  UserCheck, 
  Users, 
  AlertCircle 
} from "lucide-react";
import { updateUserRole } from "@/lib/actions/users";

interface User {
  id?: string;
  _id?: string | { $oid: string };
  name?: string;
  email: string;
  role: "seeker" | "recruiter" | "admin";
  emailVerified: boolean;
  status?: "Active" | "Suspended"; 
  createdAt?: string | Date;
}

export default function AdminUsersTable({ initialUsers }: { initialUsers: User[] }) {

  const [usersList, setUsersList] = useState<User[]>(
    (Array.isArray(initialUsers) ? initialUsers : []).map(u => ({
      ...u,
      status: u.status || "Active"
    }))
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const getUserId = (user: User) => {
    if (user.id) return user.id;
    if (typeof user._id === "object" && user._id !== null && "$oid" in user._id) {
      return user._id.$oid;
    }
    return String(user._id || "");
  };

  const handleRoleChange = async(userId: string, newRole: "seeker" | "recruiter") => {
    setUsersList((prev) =>
      prev.map((user) => (getUserId(user) === userId ? { ...user, role: newRole } : user))
    );
    const res = await updateUserRole(userId,newRole)
    console.log("response after update", res);
  };

  const handleStatusToggle = (userId: string) => {
    setUsersList((prev) =>
      prev.map((user) => {
        if (getUserId(user) === userId) {
          const newStatus = user.status === "Suspended" ? "Active" : "Suspended";
          return { ...user, status: newStatus };
        }
        return user;
      })
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsersList((prev) => prev.filter((user) => getUserId(user) !== userId));
  };

  const filteredUsers = usersList.filter((user) => {
    const name = user.name || "";
    const email = user.email || "";
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalUsers = usersList.length;
  const seekersCount = usersList.filter((u) => u.role === "seeker").length;
  const recruitersCount = usersList.filter((u) => u.role === "recruiter").length;
  const suspendedCount = usersList.filter((u) => u.status === "Suspended").length;

  return (
    <div className="space-y-8">
      {/* Top Header & Search */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-neutral-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">User Management</h1>
          <p className="mt-1 text-xs text-neutral-400 md:text-sm">
            Review, filter, and manage platform access for all users.
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search by email or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-neutral-800 bg-[#121216] pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 transition-colors focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2 rounded-2xl border border-neutral-800/80 bg-[#121216] p-5 shadow-lg">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Active Users</span>
            <Users className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-white">{totalUsers}</div>
          <div className="text-[11px] text-emerald-400">Platform database synced</div>
        </div>

        <div className="space-y-2 rounded-2xl border border-neutral-800/80 bg-[#121216] p-5 shadow-lg">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Job Seekers</span>
            <UserCheck className="h-4 w-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-white">{seekersCount}</div>
          <div className="text-[11px] text-neutral-400">Active candidates</div>
        </div>

        <div className="space-y-2 rounded-2xl border border-neutral-800/80 bg-[#121216] p-5 shadow-lg">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Suspended Accounts</span>
            <AlertCircle className="h-4 w-4 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-white">{suspendedCount}</div>
          <div className="text-[11px] text-red-400">Restricted access</div>
        </div>

        <div className="space-y-2 rounded-2xl border border-neutral-800/80 bg-[#121216] p-5 shadow-lg">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Recruiters</span>
            <Shield className="h-4 w-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white">{recruitersCount}</div>
          <div className="text-[11px] text-purple-400">Verified employers</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400">Filter Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-lg border border-neutral-800 bg-[#121216] px-3 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none capitalize cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="seeker">Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>
        <div className="text-xs text-neutral-400">
          Showing <span className="text-white font-medium">{filteredUsers.length}</span> users
        </div>
      </div>

      {/* Users Table Container */}
      <div className="overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#121216] shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-[#141418] text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                <th className="px-6 py-4">User Name</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Join Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const uid = getUserId(user);
                  const name = user.name || "Unnamed User";
                  const joinDate = user.createdAt 
                    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    : "Recently";
                  const isSuspended = user.status === "Suspended";

                  return (
                    <tr key={uid} className="group transition-colors hover:bg-[#16161a]/60">
                      
                      {/* Name & Avatar */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-500/20 bg-indigo-600/10 text-xs font-bold text-indigo-400">
                            {name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-white transition-colors group-hover:text-indigo-400 md:text-sm">
                              {name}
                            </div>
                            <div className="text-[10px] text-neutral-500 font-mono">ID: {uid.slice(-6)}</div>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-xs text-neutral-300">
                        {user.email}
                      </td>

                      {/* Role Badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-medium capitalize ${
                            user.role === "recruiter"
                              ? "border-purple-500/20 bg-purple-500/10 text-purple-400"
                              : "border-sky-500/20 bg-sky-500/10 text-sky-400"
                          }`}
                        >
                          {user.role || "seeker"}
                        </span>
                      </td>

                      {/* Created At / Join Date */}
                      <td className="px-6 py-4 text-xs whitespace-nowrap text-neutral-400">
                        {joinDate}
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                            !isSuspended
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                              : "border-red-500/20 bg-red-500/10 text-red-400"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              !isSuspended ? "bg-emerald-400 animate-pulse" : "bg-red-400"
                            }`}
                          />
                          {isSuspended ? "Suspended" : "Active"}
                        </span>
                      </td>

                      {/* Actions (Make Role + Suspend/Activate + Delete) */}
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {/* Role Switcher Button */}
                          <button
                            onClick={() =>
                              handleRoleChange(
                                uid,
                                user.role === "seeker" ? "recruiter" : "seeker"
                              )
                            }
                            className="cursor-pointer rounded-lg border border-neutral-700/60 bg-neutral-800 px-3 py-1.5 text-[11px] font-medium text-neutral-200 transition-colors hover:bg-neutral-700 hover:text-white"
                          >
                            Make {user.role === "seeker" ? "Recruiter" : "Seeker"}
                          </button>

                          {/* Suspend / Activate Button */}
                          <button
                            onClick={() => handleStatusToggle(uid)}
                            className={`cursor-pointer rounded-lg border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                              isSuspended
                                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                                : "border-amber-500/40 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                            }`}
                          >
                            {isSuspended ? "Activate" : "Suspend"}
                          </button>

                          {/* Delete Button (Only shown if suspended or general admin action) */}
                          <button
                            onClick={() => handleDeleteUser(uid)}
                            className="cursor-pointer rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-[11px] font-medium text-red-400 transition-colors hover:bg-red-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-xs text-neutral-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Count */}
        <div className="border-t border-neutral-800 px-6 py-4 text-xs text-neutral-400">
          Total records displayed: {filteredUsers.length}
        </div>
      </div>
    </div>
  );
}
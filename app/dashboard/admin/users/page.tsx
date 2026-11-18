import React from 'react';
import AdminUsersTable from '@/app/components/admin/AdminUsersTable';
import { getUsers } from '@/lib/api/users';

const AdminUsersPage = async () => {
    const data = await getUsers().catch(() => ({ users: [], total: 0 }));
    const users = Array.isArray(data?.users) ? data.users : [];

    return (
        <div className="w-full flex-1 min-h-screen bg-[#0c0c0e] p-6 text-white md:p-10">
            <div className="mx-auto max-w-7xl">
                <AdminUsersTable initialUsers={users} />
            </div>
        </div>
    );
};

export default AdminUsersPage;
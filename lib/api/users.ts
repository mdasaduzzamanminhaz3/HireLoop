'use server'
import { authFetch } from "../core/server"; 
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const getUsers = async () => {
    try {
        const res = await authFetch(`${BASE_URL}/users`);

        if (!res.ok) {
            return { users: [], total: 0 };
        }

        const data = await res.json();

        if (Array.isArray(data)) {
            return { users: data, total: data.length };
        }

        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return { users: [], total: 0 };
    }
}

export const getUserPRemiumById = async (userId: string) => {
    try {
        const res = await fetch(`${BASE_URL}/users/${userId}/premium`, {
            cache: "no-store",
        });
        return await res.json();
    } catch (error) {
        console.error("Error fetching user premium:", error);
        return null;
    }
};